import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));

const waveAComponentNames = ["cascader", "tree-select", "transfer", "time-picker", "color-picker", "rate"] as const;
const waveBComponentNames = ["descriptions", "result", "timeline", "segmented", "spin", "image"] as const;
const waveCComponentNames = ["affix", "anchor", "backtop", "tree"] as const;
const v07ComponentNames = [...waveAComponentNames, ...waveBComponentNames, ...waveCComponentNames] as const;

describe("v0.7 docs routing coverage", () => {
  it("tracks exactly 16 v0.7 components in routing coverage", () => {
    expect(v07ComponentNames).toHaveLength(16);
    expect(new Set(v07ComponentNames).size).toBe(16);
  });

  it("keeps all v0.7 wave-a, wave-b, and wave-c component routes linked from sidebar navigation", () => {
    const layoutSource = readFileSync(resolve(testDir, "../app/layout.tsx"), "utf8");

    for (const componentName of v07ComponentNames) {
      expect(layoutSource).toContain(`href: "/components/${componentName}"`);
    }
  });

  it("has docs pages for all v0.7 wave-a, wave-b, and wave-c components", () => {
    for (const componentName of v07ComponentNames) {
      const pagePath = resolve(testDir, `../app/components/${componentName}/page.mdx`);
      expect(existsSync(pagePath)).toBe(true);
      const pageSource = readFileSync(pagePath, "utf8");
      expect(pageSource.length).toBeGreaterThan(0);
    }
  });
});
