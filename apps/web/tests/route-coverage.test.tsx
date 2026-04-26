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
  it("renders homepage hero and docs navigation entry", () => {
    const html = renderToStaticMarkup(<WebHomePage />);

    expect(html).toContain("FormaUI Web");
    expect(html).toContain("Landing Placeholder");
    expect(html).toContain('href="https://docs.formaui.com"');
    expect(html).toContain("Read Docs");
  });
});
