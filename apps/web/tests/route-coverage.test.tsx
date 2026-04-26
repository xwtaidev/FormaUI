import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import WebHomePage from "../app/page";

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
});
