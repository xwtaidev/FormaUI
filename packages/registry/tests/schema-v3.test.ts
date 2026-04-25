import { describe, expect, it } from "vitest";

import { validateRegistryItem } from "../src";

describe("registry schema v3 metadata", () => {
  const baseItem = {
    name: "dashboard-foundation",
    type: "pack" as const,
    dependencies: [],
    devDependencies: [],
    registryDependencies: ["dashboard-shell", "metric-card"],
    files: []
  };

  it("accepts v3 metadata fields on pack items", () => {
    const result = validateRegistryItem({
      ...baseItem,
      category: "dashboard",
      scenarios: ["analytics", "operations"],
      complexity: "high",
      stability: "beta"
    });

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("rejects invalid complexity/stability values", () => {
    const result = validateRegistryItem({
      ...baseItem,
      complexity: "extreme",
      stability: "preview"
    });

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.field === "complexity")).toBe(true);
    expect(result.issues.some((issue) => issue.field === "stability")).toBe(true);
  });
});
