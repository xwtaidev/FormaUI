import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));

function readSource(relativePath: string): string {
  return readFileSync(resolve(testDir, relativePath), "utf8");
}

describe("docs split routing and navigation", () => {
  it("converges docs navigation to documentation scope", () => {
    const layoutSource = readSource("../app/layout.tsx");

    expect(layoutSource).toContain('href: "/installation"');
    expect(layoutSource).toContain('href: "/components/accordion"');
    expect(layoutSource).toContain('href: "/blocks/dashboard-shell"');
    expect(layoutSource).toContain('href: "/templates/ai-console-lite"');
    expect(layoutSource).toContain('href: "/cli"');
    expect(layoutSource).toContain('href: "/registry"');
    expect(layoutSource).toContain('href: "/migration-v0.4-to-v0.5"');
    expect(layoutSource).not.toContain('title: "Landing"');
  });

  it("links migration v0.4 to v0.5 route in docs navigation", () => {
    const layoutSource = readSource("../app/layout.tsx");

    expect(layoutSource).toContain('href: "/migration-v0.4-to-v0.5"');
  });

  it("has a v0.4 to v0.5 migration route document", () => {
    const migrationPath = resolve(testDir, "../app/migration-v0.4-to-v0.5/page.mdx");

    expect(existsSync(migrationPath)).toBe(true);

    const migrationSource = readFileSync(migrationPath, "utf8");
    expect(migrationSource).toContain("v0.4 -> v0.5");
    expect(migrationSource).toContain("/landing");
    expect(migrationSource).toContain("/product");
  });
});
