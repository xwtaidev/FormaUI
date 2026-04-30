import { existsSync, readFileSync } from "node:fs";
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

describe("v0.8.1 docs information architecture seed", () => {
  it("defines benchmark-aligned top-level sections in content/docs/meta.json", () => {
    const rootMetaSource = readFileSync(resolve(testDir, "../content/docs/meta.json"), "utf8");
    const rootMeta = JSON.parse(rootMetaSource) as { pages: string[] };

    expect(rootMeta.pages.map(normalizeEntry)).toEqual(expectedTopLevelSections);
  });

  it("defines getting-started page order and required pages", () => {
    const metaSource = readFileSync(resolve(testDir, "../content/docs/getting-started/meta.json"), "utf8");
    const meta = JSON.parse(metaSource) as { pages: string[] };

    expect(meta.pages.map(normalizeEntry)).toEqual(["introduction", "installation", "quick-start"]);

    ["introduction", "installation", "quick-start"].forEach((slug) => {
      const filePath = resolve(testDir, `../content/docs/getting-started/${slug}.mdx`);
      expect(existsSync(filePath)).toBe(true);
      expect(readFileSync(filePath, "utf8")).toContain("title:");
    });
  });
});
