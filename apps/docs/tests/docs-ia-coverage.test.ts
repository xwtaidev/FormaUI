import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));

const expectedTopLevelSections = [
  "getting-started",
  "foundations",
  "components",
  "blocks",
  "templates",
  "guides",
  "cli",
  "registry",
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
      "monorepo"
    ]);
  });

  it("keeps components/cli/registry meta entries aligned with migrated files", () => {
    const domains = ["components", "cli", "registry"] as const;

    domains.forEach((domain) => {
      const dirPath = resolve(testDir, `../content/docs/${domain}`);
      const files = readdirSync(dirPath)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""))
        .sort();
      const pages = readMetaPages(`../content/docs/${domain}/meta.json`).sort();

      expect(files.length).toBeGreaterThan(0);
      expect(new Set(pages)).toEqual(new Set(files));
    });
  });
});
