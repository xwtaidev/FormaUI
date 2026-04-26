import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import BlogPage from "../app/blog/page";
import ChangelogPage from "../app/changelog/page";
import MarketingPage from "../app/marketing/page";
import WebHomePage from "../app/page";
import ProductPage from "../app/product/page";
import ScenariosPage from "../app/scenarios/page";
import ShowcasePage from "../app/showcase/page";

const testDir = dirname(fileURLToPath(import.meta.url));

describe("web workspace command entry", () => {
  it("exposes required script entries in apps/web package", () => {
    const packageJsonRaw = readFileSync(resolve(testDir, "../package.json"), "utf8");
    const packageJson = JSON.parse(packageJsonRaw) as { name?: string; scripts?: Record<string, string> };

    expect(packageJson.name).toBe("web");

    ["dev", "build", "lint", "test", "typecheck"].forEach((scriptName) => {
      expect(packageJson.scripts?.[scriptName]).toBeTypeOf("string");
    });
  });
});

describe("web homepage smoke", () => {
  it("renders homepage section sequence and docs entry", () => {
    const html = renderToStaticMarkup(<WebHomePage />);
    const expectedSequence = [
      "LandingHeader",
      "LandingHero",
      "LandingStats",
      "LandingFeatures",
      "LandingProof",
      "LandingScenarios",
      "LandingQuickStart",
      "LandingBlocksFlow",
      "LandingQualityGates",
      "LandingFaq",
      "LandingFinalCta",
      "LandingFooter",
      "LandingAnalytics"
    ];

    const positions = expectedSequence.map((sectionName) => html.indexOf(`data-section="${sectionName}"`));
    positions.forEach((position) => {
      expect(position).toBeGreaterThan(-1);
    });
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(html).toContain('href="https://docs.formaui.com"');
  });

  it("keeps web-to-docs cross-site links visible in global shell", () => {
    const layoutSource = readFileSync(resolve(testDir, "../app/layout.tsx"), "utf8");

    expect(layoutSource).toContain("webLinks.docs");
    expect(layoutSource).toContain(">Docs<");
  });
});

describe("web required route coverage", () => {
  it("renders all required route pages with semantic h1 headings", () => {
    const pages = [
      { route: "/marketing", heading: "Marketing", component: <MarketingPage /> },
      { route: "/product", heading: "Product", component: <ProductPage /> },
      { route: "/scenarios", heading: "Scenarios", component: <ScenariosPage /> },
      { route: "/showcase", heading: "Showcase", component: <ShowcasePage /> },
      { route: "/blog", heading: "Blog", component: <BlogPage /> },
      { route: "/changelog", heading: "Changelog", component: <ChangelogPage /> }
    ];

    pages.forEach((page) => {
      const html = renderToStaticMarkup(page.component);
      expect(html).toContain(`<h1>${page.heading}</h1>`);
      expect(html).toContain('href="https://docs.formaui.com"');
      expect(html).toContain('href="https://github.com/xwtaidev/FormaUI"');
      expect(html).toContain('href="https://github.com/xwtaidev/FormaUI/tree/main/docs/releases"');
      expect(html).toContain(`data-route="${page.route}"`);
    });
  });

  it("keeps changelog-specific docs backlinks reachable", () => {
    const html = renderToStaticMarkup(<ChangelogPage />);

    expect(html).toContain('href="https://docs.formaui.com/migration-v0.4-to-v0.5"');
    expect(html).toContain('href="https://github.com/xwtaidev/FormaUI/blob/main/docs/releases/v0.5.md"');
  });
});
