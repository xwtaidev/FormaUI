import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import DocsHomePage from "../app/page";
import LandingPage from "../app/landing/page";

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
