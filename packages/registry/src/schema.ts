export const REGISTRY_ITEM_TYPES = [
  "component",
  "block",
  "template",
  "theme",
  "hook",
  "lib",
  "style",
  "config"
] as const;

export type RegistryItemType = (typeof REGISTRY_ITEM_TYPES)[number];

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
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}
