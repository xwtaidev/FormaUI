import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));

function readSource(relativePath: string): string {
  return readFileSync(resolve(testDir, relativePath), "utf8");
}

describe("v0.8.1 docs navigation smoke", () => {
  it("exposes getting-started in root metadata for sidebar tree generation", () => {
    const rootMeta = JSON.parse(readSource("../content/docs/meta.json")) as { pages: string[] };
    const normalized = rootMeta.pages.map((entry) => entry.replace(/^\.\//, ""));
    expect(normalized).toContain("getting-started");
  });

  it("uses DocsLayout page tree wiring for sidebar visibility", () => {
    const layoutSource = readSource("../app/docs/layout.tsx");
    expect(layoutSource).toContain("tree={source.pageTree}");
    expect(layoutSource).toContain("DocsLayout");
  });
});
