import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));

const waveAComponentNames = ["cascader", "tree-select", "transfer", "time-picker", "color-picker", "rate"] as const;

describe("v0.7 docs Wave A routing coverage", () => {
  it("keeps all v0.7 wave-a component routes linked from sidebar navigation", () => {
    const layoutSource = readFileSync(resolve(testDir, "../app/layout.tsx"), "utf8");

    for (const componentName of waveAComponentNames) {
      expect(layoutSource).toContain(`href: "/components/${componentName}"`);
    }
  });

  it("has docs pages for all v0.7 wave-a components", () => {
    for (const componentName of waveAComponentNames) {
      const pagePath = resolve(testDir, `../app/components/${componentName}/page.mdx`);
      expect(existsSync(pagePath)).toBe(true);
      const pageSource = readFileSync(pagePath, "utf8");
      expect(pageSource.length).toBeGreaterThan(0);
    }
  });
});
