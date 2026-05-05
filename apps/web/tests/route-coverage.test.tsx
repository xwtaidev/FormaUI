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
      "LandingHero",
      "LandingProductSurfaces",
      "LandingSourceOwnership",
      "LandingBuildFlow",
      "LandingScenarioGallery",
      "LandingQualitySystem",
      "LandingProof",
      "LandingFinalCta",
      "LandingFooter"
    ];

    const positions = expectedSequence.map((sectionName) => html.indexOf(`data-section="${sectionName}"`));
    positions.forEach((position) => {
      expect(position).toBeGreaterThan(-1);
    });
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(html).toContain('href="https://docs.formaui.com"');

    expect(html).toContain("Not just components. Complete product <em>surfaces</em>.");
    expect(html).toContain("SaaS Dashboard");
    expect(html).toContain("AI Console");
    expect(html).toContain("Copy, <em>adapt</em>, keep control.");
    expect(html).toContain("Traditional UI library");
    expect(html).toContain("Template marketplace");
    expect(html).toContain("FormaUI");
    expect(html).toContain("From <em>registry</em> to running UI.");
    expect(html).toContain("npx formaui init");
    expect(html).toContain("npx formaui search dashboard");
    expect(html).toContain("Built for SaaS and AI <em>teams</em>.");
    expect(html).toContain("AI tools");
    expect(html).toContain("User management");
    expect(html).toContain("Launch pages");
    expect(html).toContain("Own the interface you <em>ship</em>.");
    expect(html).toContain("Source-owned UI for SaaS and AI products");
    expect(html).toContain('href="https://github.com/xwtaidev/FormaUI"');
    expect(html).toContain('href="/showcase"');
    expect(html).toContain("Polish with <em>guardrails</em>.");
    expect(html).toContain("A11y");
    expect(html).toContain("Responsive");
    expect(html).toContain("Open source, <em>docs-first</em>, ready to extend.");
    expect(html).toContain("Release notes");
    expect(html).toContain("Start by <em>owning</em> your UI.");
    expect(html).toContain("Read v0.9 notes");
  });

  it("renders a single v0.9 hero h1 with primary conversion links", () => {
    const html = renderToStaticMarkup(<WebHomePage />);

    expect((html.match(/<h1/g) ?? []).length).toBe(1);
    expect(html).toContain("Own the interface you <em>ship</em>.");
    expect(html).toContain("Start with Docs");
    expect(html).toContain("View on GitHub");
    expect(html).toContain("Explore Product Surfaces");
    expect(html).toContain("npx formaui pack add dashboard-foundation");
  });

  it("keeps navigation with docs entry visible in global shell", () => {
    const layoutSource = readFileSync(resolve(testDir, "../app/layout.tsx"), "utf8");

    expect(layoutSource).toContain("primaryNavigationItems");
    expect(layoutSource).toContain("mobileNavigationItems");
    expect(layoutSource).toContain("LocaleSwitcher");
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

  it("keeps changelog-specific release backlinks current", () => {
    const html = renderToStaticMarkup(<ChangelogPage />);

    expect(html).toContain('href="https://github.com/xwtaidev/FormaUI/tree/main/docs/releases"');
    expect(html).toContain('href="https://github.com/xwtaidev/FormaUI/blob/main/docs/releases/v0.9.md"');
    expect(html).not.toContain("migration-v0.4-to-v0.5");
    expect(html).not.toContain("docs/releases/v0.5.md");
  });
});
