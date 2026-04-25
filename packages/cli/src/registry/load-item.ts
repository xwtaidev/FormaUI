import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  isRemoteRegistryRoot,
  loadRemoteRegistryItem,
  type RegistryKind as RemoteRegistryKind
} from "./remote.js";

export type RegistryKind = "component" | "block" | "template" | "theme";

export interface RegistryFile {
  source: string;
  target: string;
}

export interface RegistryItem {
  name: string;
  type: "component" | "block" | "template" | "theme" | "hook" | "lib" | "style" | "config";
  version?: string;
  description?: string;
  tags?: string[];
  frameworks?: string[];
  sources?: string[];
  checksum?: string;
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export interface LoadRegistryItemOptions {
  kind: RegistryKind;
  name: string;
  registryRoot?: string;
  version?: string;
  fallbackRegistryRoot?: string;
}

export const DIRECTORY_BY_KIND: Record<RegistryKind, string> = {
  component: "components",
  block: "blocks",
  template: "templates",
  theme: "themes"
};

export function getDefaultRegistryRoot() {
  const currentFileDir = dirname(fileURLToPath(import.meta.url));
  return resolve(currentFileDir, "../../../../registry");
}

async function loadLocalRegistryItem(options: {
  kind: RegistryKind;
  name: string;
  registryRoot: string;
}) {
  const directory = DIRECTORY_BY_KIND[options.kind];
  const itemPath = resolve(options.registryRoot, directory, `${options.name}.json`);

  const content = await readFile(itemPath, "utf8");
  return JSON.parse(content) as RegistryItem;
}

export async function loadRegistryItem(options: LoadRegistryItemOptions): Promise<RegistryItem> {
  const root = options.registryRoot ?? getDefaultRegistryRoot();
  const fallbackRoot = options.fallbackRegistryRoot ?? getDefaultRegistryRoot();

  const loadFromFallback = async () => {
    if (isRemoteRegistryRoot(fallbackRoot)) {
      return undefined;
    }

    try {
      return await loadLocalRegistryItem({
        kind: options.kind,
        name: options.name,
        registryRoot: fallbackRoot
      });
    } catch {
      return undefined;
    }
  };

  if (isRemoteRegistryRoot(root)) {
    try {
      return await loadRemoteRegistryItem<RegistryItem>({
        registryRoot: root,
        kind: options.kind as RemoteRegistryKind,
        name: options.name,
        version: options.version
      });
    } catch (remoteError) {
      const fallbackItem = await loadFromFallback();
      if (fallbackItem) {
        return fallbackItem;
      }
      const reason = remoteError instanceof Error ? remoteError.message : String(remoteError);
      throw new Error(`Registry item not found: ${options.kind}/${options.name} (${reason})`);
    }
  }

  try {
    return await loadLocalRegistryItem({
      kind: options.kind,
      name: options.name,
      registryRoot: root
    });
  } catch {
    throw new Error(`Registry item not found: ${options.kind}/${options.name}`);
  }
}

export async function loadRegistryDependency(options: {
  dependency: string;
  registryRoot?: string;
  version?: string;
  fallbackRegistryRoot?: string;
}) {
  const priorities: RegistryKind[] = ["component", "theme", "block", "template"];

  for (const kind of priorities) {
    try {
      return await loadRegistryItem({
        kind,
        name: options.dependency,
        registryRoot: options.registryRoot,
        version: options.version,
        fallbackRegistryRoot: options.fallbackRegistryRoot
      });
    } catch {
      // Continue searching other buckets.
    }
  }

  throw new Error(`Registry dependency not found: ${options.dependency}`);
}
