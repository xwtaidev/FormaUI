import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));

const expectedTopLevelSections = [
  "getting-started",
  "---Core System---",
  "foundations",
  "components",
  "blocks",
  "templates",
  "---Build & Ship---",
  "guides",
  "cli",
  "registry",
  "---Lifecycle---",
  "migration",
  "release-notes",
  "resources"
] as const;

function normalizeEntry(value: string): string {
  return value.replace(/^\.\//, "");
}

function readMetaPages(relativePath: string): string[] {
  const source = readFileSync(resolve(testDir, relativePath), "utf8");
  const meta = JSON.parse(source) as { pages: string[] };
  return meta.pages.map(normalizeEntry);
}

function filterPageEntries(entries: string[]): string[] {
  return entries.filter((entry) => !/^---.*---$/.test(entry));
}

function stripGroupFolder(pathname: string): string {
  return pathname
    .split("/")
    .filter((segment) => !/^\(.*\)$/.test(segment))
    .join("/");
}

describe("v0.8.2 docs information architecture migration", () => {
  it("defines benchmark-aligned top-level sections in content/docs/meta.json", () => {
    expect(readMetaPages("../content/docs/meta.json")).toEqual(expectedTopLevelSections);
  });

  it("defines getting-started page order and required pages", () => {
    expect(readMetaPages("../content/docs/getting-started/meta.json")).toEqual([
      "introduction",
      "installation",
      "quick-start"
    ]);

    ["introduction", "installation", "quick-start"].forEach((slug) => {
      const filePath = resolve(testDir, `../content/docs/getting-started/${slug}.mdx`);
      expect(existsSync(filePath)).toBe(true);
      expect(readFileSync(filePath, "utf8")).toContain("title:");
    });
  });

  it("defines foundations and guides domains in PRD-aligned order", () => {
    expect(readMetaPages("../content/docs/foundations/meta.json")).toEqual([
      "design-tokens",
      "theme",
      "accessibility"
    ]);
    expect(readMetaPages("../content/docs/guides/meta.json")).toEqual([
      "integrations-nextjs",
      "integrations-vite",
      "monorepo",
      "contributing-docs",
      "content-style-guide"
    ]);
  });

  it("keeps cli/registry meta entries aligned with migrated files", () => {
    const domains = ["cli", "registry"] as const;

    domains.forEach((domain) => {
      const dirPath = resolve(testDir, `../content/docs/${domain}`);
      const files = readdirSync(dirPath)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""))
        .sort();
      const pages = filterPageEntries(readMetaPages(`../content/docs/${domain}/meta.json`)).sort();

      expect(files.length).toBeGreaterThan(0);
      expect(new Set(pages)).toEqual(new Set(files));
    });
  });

  it("keeps components grouped by folders and aligned with all component docs", () => {
    const componentsDir = resolve(testDir, "../content/docs/components");
    const groupedFolders = [
      "(basics)",
      "(forms-inputs)",
      "(navigation)",
      "(feedback-overlay)",
      "(data-display)",
      "(workflows)"
    ] as const;

    const rootPages = readMetaPages("../content/docs/components/meta.json");
    expect(rootPages).toEqual([
      "overview",
      "(basics)",
      "(forms-inputs)",
      "(navigation)",
      "(feedback-overlay)",
      "(data-display)",
      "(workflows)"
    ]);

    const componentFileSlugs = readdirSync(componentsDir, { recursive: true })
      .filter((entry) => typeof entry === "string" && entry.endsWith(".mdx"))
      .map((entry) => entry.replace(/\.mdx$/, ""))
      .map((entry) => stripGroupFolder(entry))
      .sort();

    const metaSlugs = ["overview"];
    groupedFolders.forEach((folder) => {
      const folderPages = readMetaPages(`../content/docs/components/${folder}/meta.json`)
        .map((entry) => stripGroupFolder(`${folder}/${entry}`));
      metaSlugs.push(...folderPages);
    });

    expect(new Set(metaSlugs)).toEqual(new Set(componentFileSlugs));
  });

  it("migrates blocks/templates/resources/migration/release-notes domains", () => {
    const domains = ["blocks", "templates", "resources", "migration", "release-notes"] as const;

    domains.forEach((domain) => {
      const dirPath = resolve(testDir, `../content/docs/${domain}`);
      const files = readdirSync(dirPath)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
      const pages = filterPageEntries(readMetaPages(`../content/docs/${domain}/meta.json`));

      expect(files.length).toBeGreaterThan(0);
      expect(pages.length).toBeGreaterThan(0);
      expect(new Set(pages)).toEqual(new Set(files));
    });
  });

  it("exposes v0.8 migration and release notes entry pages", () => {
    const migrationPages = readMetaPages("../content/docs/migration/meta.json");
    const releasePages = readMetaPages("../content/docs/release-notes/meta.json");

    expect(migrationPages).toContain("v0.8");
    expect(releasePages).toContain("v0.8");
    expect(existsSync(resolve(testDir, "../content/docs/migration/v0.8.mdx"))).toBe(true);
    expect(existsSync(resolve(testDir, "../content/docs/release-notes/v0.8.mdx"))).toBe(true);
  });
});
