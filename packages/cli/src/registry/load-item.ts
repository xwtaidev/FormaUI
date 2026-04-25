import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type RegistryKind = "component" | "block" | "template" | "theme";

export interface RegistryFile {
  source: string;
  target: string;
}

export interface RegistryItem {
  name: string;
  type: "component" | "block" | "template" | "theme" | "hook" | "lib" | "style" | "config";
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export interface LoadRegistryItemOptions {
  kind: RegistryKind;
  name: string;
  registryRoot?: string;
}

const DIRECTORY_BY_KIND: Record<RegistryKind, string> = {
  component: "components",
  block: "blocks",
  template: "templates",
  theme: "themes"
};

function getDefaultRegistryRoot() {
  const currentFileDir = dirname(fileURLToPath(import.meta.url));
  return resolve(currentFileDir, "../../../../registry");
}

export async function loadRegistryItem(options: LoadRegistryItemOptions): Promise<RegistryItem> {
  const root = options.registryRoot ?? getDefaultRegistryRoot();
  const directory = DIRECTORY_BY_KIND[options.kind];
  const itemPath = resolve(root, directory, `${options.name}.json`);

  try {
    const content = await readFile(itemPath, "utf8");
    return JSON.parse(content) as RegistryItem;
  } catch {
    throw new Error(`Registry item not found: ${options.kind}/${options.name}`);
  }
}

export async function loadRegistryDependency(options: {
  dependency: string;
  registryRoot?: string;
}) {
  const priorities: RegistryKind[] = ["component", "theme", "block", "template"];

  for (const kind of priorities) {
    try {
      return await loadRegistryItem({
        kind,
        name: options.dependency,
        registryRoot: options.registryRoot
      });
    } catch {
      // Continue searching other buckets.
    }
  }

  throw new Error(`Registry dependency not found: ${options.dependency}`);
}
