import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import DocsHomePage from "../app/page";
import LandingPage from "../app/landing/page";

const testDir = dirname(fileURLToPath(import.meta.url));

function readSource(relativePath: string): string {
  return readFileSync(resolve(testDir, relativePath), "utf8");
}

describe("landing route foundation", () => {
  it("renders required IA section order and CTA links", () => {
    const html = renderToStaticMarkup(<LandingPage />);
    const orderedSectionIds = [
      "hero",
      "core-differentiators",
      "asset-proof",
      "scenario-showcase",
      "faq",
      "quick-start-path",
      "landing-footer"
    ];
    const requiredLinks = [
      "/introduction",
      "/quick-start",
      "https://github.com/xwtaidev/FormaUI/tree/main/examples",
      "https://github.com/xwtaidev/FormaUI"
    ];

    orderedSectionIds.forEach((id) => {
      expect(html).toContain(`id="${id}"`);
    });

    const indices = orderedSectionIds.map((id) => html.indexOf(`id="${id}"`));
    const sortedIndices = [...indices].sort((a, b) => a - b);
    expect(indices).toEqual(sortedIndices);

    requiredLinks.forEach((href) => {
      expect(html).toContain(`href="${href}"`);
    });
  });

  it("adds landing entry from docs home", () => {
    const html = renderToStaticMarkup(<DocsHomePage />);
    expect(html).toContain('href="/landing"');
  });
});

describe("landing formaui composition", () => {
  it("composes landing sections from formaui blocks", () => {
    const heroSource = readSource("../app/landing/_components/landing-hero.tsx");
    const proofSource = readSource("../app/landing/_components/landing-proof.tsx");
    const ctaSource = readSource("../app/landing/_components/landing-cta.tsx");

    expect(heroSource).toContain('from "@formaui/blocks"');
    expect(proofSource).toContain('from "@formaui/blocks"');
    expect(ctaSource).toContain('from "@formaui/blocks"');

    expect(heroSource).toMatch(/\bHeroCta\b/);
    expect(proofSource).toMatch(/\bFeatureGrid\b/);
    expect(proofSource).toMatch(/\bLogoCloud\b/);
    expect(proofSource).toMatch(/\bStatsStrip\b/);
    expect(ctaSource).toMatch(/\bFaqAccordion\b/);
    expect(ctaSource).toMatch(/\bFinalCta\b/);
  });
});
