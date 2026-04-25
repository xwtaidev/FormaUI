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
  it("renders required IA section anchors and CTA links", () => {
    const html = renderToStaticMarkup(<LandingPage />);
    const requiredSectionIds = [
      "hero",
      "core-differentiators",
      "asset-proof",
      "scenario-showcase",
      "quick-start-path",
      "trust-proof",
      "faq",
      "landing-footer"
    ];
    const requiredLinks = [
      "/introduction",
      "/quick-start",
      "https://github.com/xwtaidev/FormaUI/tree/main/examples",
      "https://github.com/xwtaidev/FormaUI"
    ];

    requiredSectionIds.forEach((id) => {
      expect(html).toContain(`id="${id}"`);
    });

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
  it("uses formaui button, accordion, and card interactions", () => {
    const heroSource = readSource("../app/landing/_components/landing-hero.tsx");
    const proofSource = readSource("../app/landing/_components/landing-proof.tsx");
    const ctaSource = readSource("../app/landing/_components/landing-cta.tsx");

    expect(heroSource).toContain('from "@formaui/components"');
    expect(proofSource).toContain('from "@formaui/components"');
    expect(ctaSource).toContain('from "@formaui/components"');

    expect(heroSource).toMatch(/\bButton\b/);
    expect(proofSource).toMatch(/\bCard\b/);
    expect(ctaSource).toMatch(/\bAccordion\b/);
  });
});
