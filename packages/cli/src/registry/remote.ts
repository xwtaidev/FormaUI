export type RegistryKind = "component" | "block" | "template" | "theme" | "pack";

const DIRECTORY_BY_KIND: Record<RegistryKind, string> = {
  component: "components",
  block: "blocks",
  template: "templates",
  theme: "themes",
  pack: "packs"
};

interface RegistryIndexEntry {
  path: string;
}

interface RegistryIndexGroup {
  latest: string;
  entries: Record<string, RegistryIndexEntry>;
}

interface RegistryIndexManifest {
  byKind?: Partial<Record<RegistryKind, Record<string, RegistryIndexGroup>>>;
}

export function isRemoteRegistryRoot(registryRoot?: string) {
  if (!registryRoot) {
    return false;
  }
  return /^https?:\/\//u.test(registryRoot);
}

function removeTrailingSlashes(value: string) {
  return value.replace(/\/+$/u, "");
}

function buildUrl(base: string, path: string) {
  return `${removeTrailingSlashes(base)}/${path.replace(/^\/+/u, "")}`;
}

async function fetchJson<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        accept: "application/json"
      }
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch ${url}: ${reason}`);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

async function resolveRemoteItemUrl(options: {
  registryRoot: string;
  kind: RegistryKind;
  name: string;
  version?: string;
}) {
  const indexUrl = buildUrl(options.registryRoot, "index.json");
  const fallbackPath = `${DIRECTORY_BY_KIND[options.kind]}/${options.name}.json`;

  try {
    const manifest = await fetchJson<RegistryIndexManifest>(indexUrl);
    const byKind = manifest.byKind?.[options.kind];
    const group = byKind?.[options.name];
    if (!group) {
      return buildUrl(options.registryRoot, fallbackPath);
    }

    const requestedVersion = options.version ?? group.latest;
    if (!requestedVersion) {
      return buildUrl(options.registryRoot, fallbackPath);
    }

    const indexedEntry = group.entries[requestedVersion];
    if (!indexedEntry?.path) {
      return buildUrl(options.registryRoot, fallbackPath);
    }

    if (/^https?:\/\//u.test(indexedEntry.path)) {
      return indexedEntry.path;
    }

    return buildUrl(options.registryRoot, indexedEntry.path);
  } catch {
    return buildUrl(options.registryRoot, fallbackPath);
  }
}

export async function loadRemoteRegistryItem<T>(options: {
  registryRoot: string;
  kind: RegistryKind;
  name: string;
  version?: string;
}) {
  const itemUrl = await resolveRemoteItemUrl(options);
  return fetchJson<T>(itemUrl);
}
