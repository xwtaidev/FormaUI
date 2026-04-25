import { describe, expect, it } from "vitest";

import { validateRegistryItem } from "../src";

describe("registry schema v2 metadata", () => {
  const baseItem = {
    name: "button",
    type: "component" as const,
    dependencies: ["react"],
    devDependencies: [],
    registryDependencies: [],
    files: [{ source: "packages/components/src/primitives/button.tsx", target: "components/primitives/button.tsx" }]
  };

  it("accepts legacy items without v2 metadata fields", () => {
    const result = validateRegistryItem(baseItem);
    expect(result.valid).toBe(true);
  });

  it("accepts valid v2 metadata fields", () => {
    const result = validateRegistryItem({
      ...baseItem,
      version: "0.2.2",
      description: "Primary action button.",
      tags: ["button", "form"],
      frameworks: ["react", "nextjs"],
      sources: ["https://registry.formaui.com/components/button.json"],
      checksum: "dcb57e18f6d31f93f95f5f0672f2c5fda91f95ca7b1ec36f652dbf1238825842"
    });

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("rejects invalid version/checksum and malformed metadata arrays", () => {
    const result = validateRegistryItem({
      ...baseItem,
      version: "v0.2",
      tags: [""],
      frameworks: ["react", ""],
      sources: [""],
      checksum: "not-a-sha256"
    });

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.field === "version")).toBe(true);
    expect(result.issues.some((issue) => issue.field === "tags")).toBe(true);
    expect(result.issues.some((issue) => issue.field === "frameworks")).toBe(true);
    expect(result.issues.some((issue) => issue.field === "sources")).toBe(true);
    expect(result.issues.some((issue) => issue.field === "checksum")).toBe(true);
  });
});
