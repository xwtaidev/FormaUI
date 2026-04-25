import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildRegistryIndex } from "./build-index.js";
import { blockRegistryItems } from "./items/blocks.js";
import { componentRegistryItems } from "./items/components.js";
import { templateRegistryItems } from "./items/templates.js";
import { themeRegistryItems } from "./items/themes.js";
import type { RegistryItem } from "./schema.js";
import { validateRegistryItems } from "./validate.js";

export interface BuildRegistryOptions {
  repoRoot?: string;
}

const REGISTRY_DEFAULT_VERSION = "0.2.2";

type RegistryBucket = "components" | "blocks" | "templates" | "themes";

function mapItemTypeToBucket(type: RegistryItem["type"]): RegistryBucket {
  if (type === "block") {
    return "blocks";
  }
  if (type === "template") {
    return "templates";
  }
  if (type === "theme") {
    return "themes";
  }
  return "components";
}

function inferFrameworks(type: RegistryItem["type"]) {
  return type === "theme" ? ["css"] : ["react"];
}

function withV2Metadata(item: RegistryItem): RegistryItem {
  const bucket = mapItemTypeToBucket(item.type);
  const metadataBase: RegistryItem = {
    ...item,
    version: item.version ?? REGISTRY_DEFAULT_VERSION,
    description: item.description ?? `${item.type}/${item.name}`,
    tags: item.tags ?? [item.type, item.name],
    frameworks: item.frameworks ?? inferFrameworks(item.type),
    sources: item.sources ?? [`registry/${bucket}/${item.name}.json`]
  };
  const hashed = { ...metadataBase };
  delete hashed.checksum;
  const checksum = createHash("sha256").update(JSON.stringify(hashed)).digest("hex");
  return {
    ...metadataBase,
    checksum
  };
}

async function writeRegistryGroup(options: {
  outputDir: string;
  items: RegistryItem[];
}) {
  await mkdir(options.outputDir, { recursive: true });
  await Promise.all(
    options.items.map(async (item) => {
      const outputPath = resolve(options.outputDir, `${item.name}.json`);
      await writeFile(outputPath, `${JSON.stringify(item, null, 2)}\n`, "utf8");
    })
  );
}

export async function buildRegistry(options: BuildRegistryOptions = {}) {
  const currentFileDir = dirname(fileURLToPath(import.meta.url));
  const repoRoot = options.repoRoot ?? resolve(currentFileDir, "../../..");
  const allItems = [
    ...componentRegistryItems,
    ...themeRegistryItems,
    ...blockRegistryItems,
    ...templateRegistryItems
  ].map(withV2Metadata);

  const componentItems = allItems.filter((item) => mapItemTypeToBucket(item.type) === "components");
  const themeItems = allItems.filter((item) => mapItemTypeToBucket(item.type) === "themes");
  const blockItems = allItems.filter((item) => mapItemTypeToBucket(item.type) === "blocks");
  const templateItems = allItems.filter((item) => mapItemTypeToBucket(item.type) === "templates");

  const validation = validateRegistryItems(allItems, {
    checkFiles: true,
    repoRoot
  });

  if (!validation.valid) {
    const message = validation.issues
      .map((issue) => `- ${issue.field}: ${issue.message}`)
      .join("\n");
    throw new Error(`Registry validation failed:\n${message}`);
  }

  await writeRegistryGroup({
    outputDir: resolve(repoRoot, "registry/components"),
    items: componentItems
  });
  await writeRegistryGroup({
    outputDir: resolve(repoRoot, "registry/themes"),
    items: themeItems
  });
  await writeRegistryGroup({
    outputDir: resolve(repoRoot, "registry/blocks"),
    items: blockItems
  });
  await writeRegistryGroup({
    outputDir: resolve(repoRoot, "registry/templates"),
    items: templateItems
  });

  const index = buildRegistryIndex({
    items: allItems
  });
  await writeFile(resolve(repoRoot, "registry/index.json"), `${JSON.stringify(index, null, 2)}\n`, "utf8");

  return {
    components: componentItems.length,
    themes: themeItems.length,
    blocks: blockItems.length,
    templates: templateItems.length,
    index: index.total
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildRegistry()
    .then((summary) => {
      console.log(
        `Generated ${summary.components} component items, ${summary.themes} theme items, ${summary.blocks} block items, ${summary.templates} template items, and ${summary.index} index entries.`
      );
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
