import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadRegistryDependency,
  loadRegistryItem,
  type RegistryItem,
  type RegistryKind
} from "../registry/load-item.js";
import { findFileConflicts, writeFiles } from "../project/write-files.js";
import { createLogger, type Logger } from "../utils/logger.js";

interface FormaUIConfig {
  aliases?: {
    components?: string;
    lib?: string;
    styles?: string;
  };
}

export interface AddCommandOptions {
  cwd?: string;
  yes?: boolean;
  dryRun?: boolean;
  name: string;
  kind: RegistryKind;
  logger?: Logger;
  registryRoot?: string;
  confirmOverwrite?: (conflicts: string[]) => Promise<boolean>;
}

function getRepoRoot() {
  const currentFileDir = dirname(fileURLToPath(import.meta.url));
  return resolve(currentFileDir, "../../../..");
}

async function loadFormaUIConfig(cwd: string): Promise<FormaUIConfig> {
  try {
    const content = await readFile(resolve(cwd, "formaui.json"), "utf8");
    return JSON.parse(content) as FormaUIConfig;
  } catch {
    return {};
  }
}

function applyAliases(targetPath: string, config: FormaUIConfig) {
  const componentsAlias = config.aliases?.components ?? "components";
  const libAlias = config.aliases?.lib ?? "lib";
  const stylesAlias = config.aliases?.styles ?? "styles";

  if (targetPath.startsWith("components/")) {
    return targetPath.replace("components", componentsAlias);
  }
  if (targetPath.startsWith("lib/")) {
    return targetPath.replace("lib", libAlias);
  }
  if (targetPath.startsWith("styles/")) {
    return targetPath.replace("styles", stylesAlias);
  }

  return targetPath;
}

async function collectItemGraph(options: {
  rootItem: RegistryItem;
  registryRoot?: string;
}) {
  const orderedItems: RegistryItem[] = [];
  const visited = new Set<string>();

  const visit = async (item: RegistryItem) => {
    if (visited.has(item.name)) {
      return;
    }

    visited.add(item.name);

    for (const dependency of item.registryDependencies) {
      const resolved = await loadRegistryDependency({
        dependency,
        registryRoot: options.registryRoot
      });
      await visit(resolved);
    }

    orderedItems.push(item);
  };

  await visit(options.rootItem);

  return orderedItems;
}

function collectPackageRequirements(items: RegistryItem[]) {
  const dependencies = new Set<string>();
  const devDependencies = new Set<string>();

  for (const item of items) {
    for (const dependency of item.dependencies) {
      dependencies.add(dependency);
    }
    for (const dependency of item.devDependencies) {
      devDependencies.add(dependency);
    }
  }

  return {
    dependencies: Array.from(dependencies).sort(),
    devDependencies: Array.from(devDependencies).sort()
  };
}

export async function runAddCommand(options: AddCommandOptions) {
  const cwd = options.cwd ?? process.cwd();
  const logger = options.logger ?? createLogger();
  const config = await loadFormaUIConfig(cwd);
  const rootItem = await loadRegistryItem({
    kind: options.kind,
    name: options.name,
    registryRoot: options.registryRoot
  });

  const items = await collectItemGraph({
    rootItem,
    registryRoot: options.registryRoot
  });

  const filesToWrite: Array<{ targetPath: string; content: string }> = [];

  for (const item of items) {
    for (const file of item.files) {
      const sourcePath = resolve(getRepoRoot(), file.source);
      const content = await readFile(sourcePath, "utf8");
      filesToWrite.push({
        targetPath: applyAliases(file.target, config),
        content
      });
    }
  }

  if (options.dryRun) {
    const conflicts = await findFileConflicts({
      cwd,
      files: filesToWrite
    });
    const packageRequirements = collectPackageRequirements(items);

    logger.info(`[dry-run] Planned install for ${options.kind} \`${options.name}\`.`);
    logger.info(`Items: ${items.map((item) => item.name).join(", ")}`);
    logger.info(
      `Dependencies: ${
        packageRequirements.dependencies.length > 0
          ? packageRequirements.dependencies.join(", ")
          : "none"
      }`
    );
    logger.info(
      `Dev dependencies: ${
        packageRequirements.devDependencies.length > 0
          ? packageRequirements.devDependencies.join(", ")
          : "none"
      }`
    );
    logger.info("Planned files:");
    for (const file of filesToWrite) {
      logger.info(`- ${file.targetPath}`);
    }
    if (conflicts.length > 0) {
      logger.warn(`Conflicting files: ${conflicts.join(", ")}`);
    }

    return {
      dryRun: true,
      items: items.map((item) => item.name),
      files: filesToWrite.map((file) => file.targetPath),
      dependencies: packageRequirements.dependencies,
      devDependencies: packageRequirements.devDependencies,
      conflicts
    };
  }

  const writtenPaths = await writeFiles({
    cwd,
    files: filesToWrite,
    overwrite: options.yes ?? false,
    confirmOverwrite: options.confirmOverwrite
  });

  logger.success(`Installed ${options.kind} \`${options.name}\`.`);

  return {
    items: items.map((item) => item.name),
    files: writtenPaths
  };
}
