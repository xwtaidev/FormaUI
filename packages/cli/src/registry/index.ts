import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

import {
  DIRECTORY_BY_KIND,
  getDefaultRegistryRoot,
  loadRegistryItem,
  type RegistryItem,
  type RegistryKind
} from "./load-item.js";

export interface RegistryCatalogEntry {
  kind: RegistryKind;
  item: RegistryItem;
}

const REGISTRY_KINDS: RegistryKind[] = ["component", "block", "template", "theme", "pack"];

interface RegistryMetadataFilters {
  category?: string;
  scenario?: string;
}

function normalizeRegistryRoot(registryRoot?: string) {
  return registryRoot ?? getDefaultRegistryRoot();
}

function sortCatalog(entries: RegistryCatalogEntry[]) {
  const kindOrder: Record<RegistryKind, number> = {
    component: 0,
    block: 1,
    template: 2,
    theme: 3,
    pack: 4
  };

  return entries.sort((a, b) => {
    const kindDiff = kindOrder[a.kind] - kindOrder[b.kind];
    if (kindDiff !== 0) {
      return kindDiff;
    }
    return a.item.name.localeCompare(b.item.name);
  });
}

async function listKindItemNames(kind: RegistryKind, registryRoot: string) {
  const directoryPath = resolve(registryRoot, DIRECTORY_BY_KIND[kind]);
  try {
    const files = await readdir(directoryPath);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/u, ""));
  } catch {
    return [];
  }
}

function normalizeFilterValue(value?: string) {
  return value?.trim().toLowerCase();
}

function matchesMetadataFilters(entry: RegistryCatalogEntry, filters: RegistryMetadataFilters) {
  const category = normalizeFilterValue(filters.category);
  if (category && entry.item.category?.trim().toLowerCase() !== category) {
    return false;
  }

  const scenario = normalizeFilterValue(filters.scenario);
  if (scenario) {
    const scenarios = (entry.item.scenarios ?? []).map((itemScenario) => itemScenario.trim().toLowerCase());
    if (!scenarios.includes(scenario)) {
      return false;
    }
  }

  return true;
}

export async function listRegistryItems(options: {
  registryRoot?: string;
  kind?: RegistryKind;
  category?: string;
  scenario?: string;
} = {}) {
  const registryRoot = normalizeRegistryRoot(options.registryRoot);
  const kinds = options.kind ? [options.kind] : REGISTRY_KINDS;
  const entries: RegistryCatalogEntry[] = [];

  for (const kind of kinds) {
    const names = await listKindItemNames(kind, registryRoot);
    for (const name of names) {
      const item = await loadRegistryItem({
        kind,
        name,
        registryRoot
      });
      entries.push({ kind, item });
    }
  }

  return sortCatalog(entries).filter((entry) =>
    matchesMetadataFilters(entry, {
      category: options.category,
      scenario: options.scenario
    })
  );
}

function buildSearchText(entry: RegistryCatalogEntry) {
  const segments = [
    entry.kind,
    entry.item.name,
    entry.item.type,
    ...entry.item.dependencies,
    ...entry.item.devDependencies,
    ...entry.item.registryDependencies,
    ...entry.item.files.map((file) => `${file.source} ${file.target}`),
    entry.item.category ?? "",
    ...(entry.item.scenarios ?? []),
    entry.item.complexity ?? "",
    entry.item.stability ?? ""
  ];
  return segments.join(" ").toLowerCase();
}

export async function searchRegistryItems(options: {
  query: string;
  registryRoot?: string;
  kind?: RegistryKind;
  category?: string;
  scenario?: string;
}) {
  const normalizedQuery = options.query.trim().toLowerCase();
  const entries = await listRegistryItems({
    registryRoot: options.registryRoot,
    kind: options.kind,
    category: options.category,
    scenario: options.scenario
  });

  if (normalizedQuery.length === 0) {
    return entries;
  }

  return entries.filter((entry) => buildSearchText(entry).includes(normalizedQuery));
}

export async function getRegistryItemInfo(options: {
  name: string;
  registryRoot?: string;
  kind?: RegistryKind;
  category?: string;
  scenario?: string;
}) {
  if (options.kind) {
    const item = await loadRegistryItem({
      kind: options.kind,
      name: options.name,
      registryRoot: options.registryRoot
    });
    return { kind: options.kind, item };
  }

  const matches = (
    await listRegistryItems({
      registryRoot: options.registryRoot,
      category: options.category,
      scenario: options.scenario
    })
  ).filter((entry) => entry.item.name === options.name);

  if (matches.length === 0) {
    throw new Error(`Registry item not found: ${options.name}`);
  }

  if (matches.length > 1) {
    const kinds = matches.map((entry) => entry.kind).join(", ");
    throw new Error(`Multiple registry items named \`${options.name}\` found in: ${kinds}. Use --kind.`);
  }

  const [match] = matches;
  if (!match) {
    throw new Error(`Registry item not found: ${options.name}`);
  }
  return match;
}

function formatPackageList(packages: string[]) {
  return packages.length > 0 ? packages.join(", ") : "none";
}

export function formatRegistryListLine(entry: RegistryCatalogEntry) {
  return `${entry.kind}/${entry.item.name}`;
}

export function formatRegistryInfoLines(entry: RegistryCatalogEntry) {
  const lines = [
    `Name: ${entry.item.name}`,
    `Kind: ${entry.kind}`,
    `Type: ${entry.item.type}`,
    `Category: ${entry.item.category ?? "none"}`,
    `Scenarios: ${formatPackageList(entry.item.scenarios ?? [])}`,
    `Complexity: ${entry.item.complexity ?? "none"}`,
    `Stability: ${entry.item.stability ?? "none"}`,
    `Dependencies: ${formatPackageList(entry.item.dependencies)}`,
    `Dev dependencies: ${formatPackageList(entry.item.devDependencies)}`,
    `Registry dependencies: ${formatPackageList(entry.item.registryDependencies)}`,
    "Files:"
  ];

  if (entry.item.files.length === 0) {
    lines.push("  - none");
    return lines;
  }

  for (const file of entry.item.files) {
    lines.push(`  - ${file.target} <- ${file.source}`);
  }
  return lines;
}
