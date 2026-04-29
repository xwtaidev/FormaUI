import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));

const v06ComponentNames = [
  "alert",
  "breadcrumb",
  "label",
  "typography",
  "steps",
  "collapse",
  "navigation-menu",
  "menubar",
  "context-menu",
  "drawer",
  "input-number",
  "slider",
  "toggle",
  "toggle-group",
  "input-otp",
  "upload",
  "calendar",
  "date-picker",
  "combobox",
  "toast"
] as const;

describe("v0.6 docs component routing coverage", () => {
  it("keeps all 20 v0.6 component routes linked from sidebar navigation", () => {
    const layoutSource = readFileSync(resolve(testDir, "../app/layout.tsx"), "utf8");

    for (const componentName of v06ComponentNames) {
      expect(layoutSource).toContain(`href: "/components/${componentName}"`);
    }
  });

  it("has docs pages for all 20 v0.6 components", () => {
    for (const componentName of v06ComponentNames) {
      const pagePath = resolve(testDir, `../app/components/${componentName}/page.mdx`);
      expect(existsSync(pagePath)).toBe(true);
      const pageSource = readFileSync(pagePath, "utf8");
      expect(pageSource.length).toBeGreaterThan(0);
    }
  });
});
