import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));

function readSource(relativePath: string): string {
  return readFileSync(resolve(testDir, relativePath), "utf8");
}

describe("v0.8.1 docs routing baseline", () => {
  it("wires Fumadocs loader and layout under /docs", () => {
    const docsLayoutSource = readSource("../app/docs/layout.tsx");
    const sourceLoaderSource = readSource("../lib/source.ts");

    expect(docsLayoutSource).toContain('from "fumadocs-ui/layouts/docs"');
    expect(docsLayoutSource).toContain("source.pageTree");
    expect(sourceLoaderSource).toContain('baseUrl: "/docs"');
    expect(sourceLoaderSource).toContain("docs.toFumadocsSource()");
  });

  it("implements dynamic docs page pipeline with static params", () => {
    const routeSource = readSource("../app/docs/[...slug]/page.tsx");

    expect(routeSource).toContain("source.getPage");
    expect(routeSource).toContain("generateStaticParams");
    expect(routeSource).toContain(".getPages()");
    const docsIndexSource = readSource("../app/docs/page.tsx");
    expect(docsIndexSource).toContain('redirect("/docs/getting-started/introduction")');
  });

  it("redirects root route to /docs entry", () => {
    const rootSource = readSource("../app/page.tsx");

    expect(rootSource).toContain('redirect("/docs")');
  });

  it("keeps landing redirects in next config while enabling Fumadocs MDX plugin", () => {
    const nextConfigSource = readSource("../next.config.mjs");

    expect(nextConfigSource).toContain('from "fumadocs-mdx/next"');
    expect(nextConfigSource).toContain('source: "/landing"');
    expect(nextConfigSource).toContain('source: "/landing/:path*"');
  });
});
