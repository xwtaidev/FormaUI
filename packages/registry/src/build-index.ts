import type { RegistryItem } from "./schema.js";

export const REGISTRY_INDEX_KINDS = ["component", "block", "template", "theme"] as const;

export type RegistryIndexKind = (typeof REGISTRY_INDEX_KINDS)[number];

const DIRECTORY_BY_KIND: Record<RegistryIndexKind, string> = {
  component: "components",
  block: "blocks",
  template: "templates",
  theme: "themes"
};

function compareVersionsDescending(a: string, b: string) {
  const semverPattern =
    /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/u;

  const aMatch = a.match(semverPattern);
  const bMatch = b.match(semverPattern);

  if (!aMatch || !bMatch) {
    return b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" });
  }

  const toNumbers = (match: RegExpMatchArray) => [Number(match[1]), Number(match[2]), Number(match[3])] as const;
  const [aMajor, aMinor, aPatch] = toNumbers(aMatch);
  const [bMajor, bMinor, bPatch] = toNumbers(bMatch);

  if (aMajor !== bMajor) {
    return bMajor - aMajor;
  }
  if (aMinor !== bMinor) {
    return bMinor - aMinor;
  }
  if (aPatch !== bPatch) {
    return bPatch - aPatch;
  }

  const aPreRelease = aMatch[4];
  const bPreRelease = bMatch[4];
  if (!aPreRelease && bPreRelease) {
    return -1;
  }
  if (aPreRelease && !bPreRelease) {
    return 1;
  }
  if (!aPreRelease && !bPreRelease) {
    return 0;
  }

  return (aPreRelease ?? "").localeCompare(bPreRelease ?? "");
}

function mapItemTypeToKind(type: RegistryItem["type"]): RegistryIndexKind {
  if (type === "block" || type === "template" || type === "theme") {
    return type;
  }
  return "component";
}

export interface RegistryIndexEntry {
  kind: RegistryIndexKind;
  name: string;
  type: RegistryItem["type"];
  version: string;
  path: string;
  description?: string;
  tags?: string[];
  frameworks?: string[];
  sources?: string[];
  checksum?: string;
}

export interface RegistryIndexNameGroup {
  latest: string;
  versions: string[];
  entries: Record<string, RegistryIndexEntry>;
}

export interface RegistryIndexManifest {
  generatedAt: string;
  total: number;
  items: RegistryIndexEntry[];
  byKind: Record<RegistryIndexKind, Record<string, RegistryIndexNameGroup>>;
}

function createEmptyByKind(): RegistryIndexManifest["byKind"] {
  return {
    component: {},
    block: {},
    template: {},
    theme: {}
  };
}

export function buildRegistryIndex(options: {
  items: RegistryItem[];
  generatedAt?: string;
  fallbackVersion?: string;
}): RegistryIndexManifest {
  const fallbackVersion = options.fallbackVersion ?? "0.0.0";
  const entries = options.items.map((item) => {
    const kind = mapItemTypeToKind(item.type);
    return {
      kind,
      name: item.name,
      type: item.type,
      version: item.version ?? fallbackVersion,
      path: `${DIRECTORY_BY_KIND[kind]}/${item.name}.json`,
      description: item.description,
      tags: item.tags,
      frameworks: item.frameworks,
      sources: item.sources,
      checksum: item.checksum
    } satisfies RegistryIndexEntry;
  });

  entries.sort((a, b) => {
    const kindDiff = REGISTRY_INDEX_KINDS.indexOf(a.kind) - REGISTRY_INDEX_KINDS.indexOf(b.kind);
    if (kindDiff !== 0) {
      return kindDiff;
    }

    const nameDiff = a.name.localeCompare(b.name);
    if (nameDiff !== 0) {
      return nameDiff;
    }

    return compareVersionsDescending(a.version, b.version);
  });

  const byKind = createEmptyByKind();

  for (const entry of entries) {
    const kindGroups = byKind[entry.kind];
    const existing = kindGroups[entry.name];
    if (!existing) {
      kindGroups[entry.name] = {
        latest: entry.version,
        versions: [entry.version],
        entries: { [entry.version]: entry }
      };
      continue;
    }

    existing.versions.push(entry.version);
    existing.entries[entry.version] = entry;
    existing.versions.sort(compareVersionsDescending);
    const [latestVersion] = existing.versions;
    existing.latest = latestVersion ?? existing.latest;
  }

  return {
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    total: entries.length,
    items: entries,
    byKind
  };
}
