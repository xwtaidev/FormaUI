import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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

  it("redirects legacy landing routes to web targets", async () => {
    const configUrl = pathToFileURL(resolve(testDir, "../next.config.mjs")).href;
    const module = (await import(configUrl)) as {
      default: {
        redirects?: () => Promise<Array<{ source: string; destination: string; permanent: boolean }>>;
      };
    };
    const nextConfig = module.default;

    expect(typeof nextConfig.redirects).toBe("function");

    const redirects = await nextConfig.redirects!();
    const expectedRedirects = [
      { source: "/landing", destination: "https://formaui.com/" },
      { source: "/landing/architecture", destination: "https://formaui.com/product" },
      { source: "/landing/reuse-blocks", destination: "https://formaui.com/showcase" }
    ];

    expectedRedirects.forEach((expectedRedirect) => {
      const matched = redirects.find((redirect) => redirect.source === expectedRedirect.source);
      expect(matched?.destination).toBe(expectedRedirect.destination);
      expect(matched?.permanent).toBe(true);
    });
  });

  it("does not redirect core documentation routes", async () => {
    const configUrl = pathToFileURL(resolve(testDir, "../next.config.mjs")).href;
    const module = (await import(configUrl)) as {
      default: {
        redirects?: () => Promise<Array<{ source: string; destination: string; permanent: boolean }>>;
      };
    };
    const nextConfig = module.default;
    const redirects = typeof nextConfig.redirects === "function" ? await nextConfig.redirects() : [];

    const redirectSources = new Set(redirects.map((redirect) => redirect.source));
    ["/installation", "/components/:path*", "/cli", "/registry", "/migration-v0.4-to-v0.5"].forEach((source) => {
      expect(redirectSources.has(source)).toBe(false);
    });
  });
});
