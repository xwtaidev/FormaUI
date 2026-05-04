import { describe, expect, it } from "vitest";

import {
  buildFlowSteps,
  editorialSections,
  finalCta,
  heroContent,
  landingSectionSequence,
  primaryNavigationItems,
  productSurfaces,
  scenarioGallery,
  sourceOwnershipComparison,
  webLinks
} from "../app/_sections/content";

describe("v0.9 landing content contract", () => {
  it("defines the v0.9 homepage section sequence", () => {
    expect(landingSectionSequence).toEqual([
      "LandingHero",
      "LandingProductSurfaces",
      "LandingSourceOwnership",
      "LandingBuildFlow",
      "LandingScenarioGallery",
      "LandingQualitySystem",
      "LandingProof",
      "LandingFinalCta",
      "LandingFooter"
    ]);
  });

  it("keeps the hero source-ownership message and conversion links stable", () => {
    expect(heroContent.title).toBe("Own the interface you ship.");
    expect(heroContent.primaryCta).toEqual({ href: webLinks.docs, label: "Start with Docs" });
    expect(heroContent.secondaryCta).toEqual({ href: webLinks.github, label: "View on GitHub" });
    expect(heroContent.supportingCta).toEqual({ href: "/showcase", label: "Explore Product Surfaces" });
  });

  it("defines enough product surfaces and scenarios for the gallery", () => {
    expect(productSurfaces.map((surface) => surface.name)).toEqual([
      "SaaS Dashboard",
      "AI Console",
      "Admin Workflow",
      "Marketing Launch"
    ]);
    expect(scenarioGallery).toHaveLength(6);
  });

  it("models source ownership and build flow without stale v0.5 links", () => {
    expect(sourceOwnershipComparison.map((item) => item.label)).toEqual([
      "Traditional UI library",
      "Template marketplace",
      "FormaUI"
    ]);
    expect(buildFlowSteps.map((step) => step.command)).toContain("npx formaui pack add dashboard-foundation");
    expect(finalCta.primary.href).toBe(webLinks.docs);
    expect(JSON.stringify({ webLinks, primaryNavigationItems, finalCta })).not.toContain("v0.5");
    expect(JSON.stringify({ webLinks, primaryNavigationItems, finalCta })).not.toContain("migration-v0.4-to-v0.5");
  });

  it("defines editorial section metadata and italic heading markers", () => {
    expect(editorialSections).toHaveLength(9);
    expect(editorialSections[0].roman).toBe("I");
    expect(editorialSections[8].roman).toBe("FIN");
    expect(heroContent.titleHtml).toContain("_ship_");
    expect(finalCta.titleHtml).toContain("_owning_");
  });
});
