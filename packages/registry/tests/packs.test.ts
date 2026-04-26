import { describe, expect, it } from "vitest";

import {
  blockRegistryItems,
  componentRegistryItems,
  packRegistryItems,
  templateRegistryItems,
  themeRegistryItems,
  validateRegistryItems
} from "../src";

describe("registry packs", () => {
  it("contains required initial packs", () => {
    const names = new Set(packRegistryItems.map((item) => item.name));

    expect(names.has("dashboard-foundation")).toBe(true);
    expect(names.has("data-entry")).toBe(true);
    expect(names.has("feedback-loading")).toBe(true);
    expect(names.has("marketing-launch")).toBe(true);
  });

  it("declares pack item type and metadata", () => {
    for (const item of packRegistryItems) {
      expect(item.type).toBe("pack");
      expect(item.category).toBeTruthy();
      expect(item.scenarios?.length).toBeGreaterThan(0);
      expect(item.files).toEqual([]);
    }
  });

  it("keeps dependency graph valid with packs included", () => {
    const validation = validateRegistryItems([
      ...componentRegistryItems,
      ...themeRegistryItems,
      ...blockRegistryItems,
      ...templateRegistryItems,
      ...packRegistryItems
    ]);

    expect(validation.valid).toBe(true);
    expect(validation.issues).toHaveLength(0);
  });
});
