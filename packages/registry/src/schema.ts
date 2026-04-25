export const REGISTRY_ITEM_TYPES = [
  "component",
  "block",
  "template",
  "theme",
  "pack",
  "hook",
  "lib",
  "style",
  "config"
] as const;

export type RegistryItemType = (typeof REGISTRY_ITEM_TYPES)[number];

export const REGISTRY_ITEM_COMPLEXITIES = ["low", "medium", "high"] as const;

export type RegistryItemComplexity = (typeof REGISTRY_ITEM_COMPLEXITIES)[number];

export const REGISTRY_ITEM_STABILITIES = ["stable", "beta", "experimental", "deprecated"] as const;

export type RegistryItemStability = (typeof REGISTRY_ITEM_STABILITIES)[number];

export interface RegistryFile {
  source: string;
  target: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  version?: string;
  description?: string;
  tags?: string[];
  frameworks?: string[];
  sources?: string[];
  checksum?: string;
  category?: string;
  scenarios?: string[];
  complexity?: RegistryItemComplexity;
  stability?: RegistryItemStability;
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}
