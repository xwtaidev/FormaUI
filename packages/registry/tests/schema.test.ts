import { describe, expect, it } from "vitest";

import type { RegistryItem } from "../src";
import { validateRegistryItem, validateRegistryItems } from "../src";

describe("registry schema", () => {
  it("accepts a valid registry item", () => {
    const item: RegistryItem = {
      name: "button",
      type: "component",
      dependencies: ["react"],
      devDependencies: ["@types/react"],
      registryDependencies: [],
      files: [{ source: "packages/components/src/primitives/button.tsx", target: "components/primitives/button.tsx" }]
    };

    const result = validateRegistryItem(item, {
      checkFiles: false
    });

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("rejects unsupported item type", () => {
    const result = validateRegistryItem({
      name: "bad-item",
      type: "unknown",
      dependencies: [],
      devDependencies: [],
      registryDependencies: [],
      files: [{ source: "x.ts", target: "y.ts" }]
    });

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.field === "type")).toBe(true);
  });

  it("reports missing source files", () => {
    const result = validateRegistryItem(
      {
        name: "missing",
        type: "component",
        dependencies: [],
        devDependencies: [],
        registryDependencies: [],
        files: [{ source: "packages/components/src/not-found.ts", target: "components/not-found.ts" }]
      },
      {
        checkFiles: true,
        repoRoot: process.cwd()
      }
    );

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.message.includes("does not exist"))).toBe(true);
  });

  it("checks registry dependencies across item list", () => {
    const result = validateRegistryItems([
      {
        name: "theme-switcher",
        type: "component",
        dependencies: [],
        devDependencies: [],
        registryDependencies: ["button"],
        files: [{ source: "packages/components/src/composites/theme-switcher.tsx", target: "components/composites/theme-switcher.tsx" }]
      },
      {
        name: "button",
        type: "component",
        dependencies: [],
        devDependencies: [],
        registryDependencies: [],
        files: [{ source: "packages/components/src/primitives/button.tsx", target: "components/primitives/button.tsx" }]
      }
    ]);

    expect(result.valid).toBe(true);

    const invalid = validateRegistryItems([
      {
        name: "theme-switcher",
        type: "component",
        dependencies: [],
        devDependencies: [],
        registryDependencies: ["missing-lib"],
        files: [{ source: "packages/components/src/composites/theme-switcher.tsx", target: "components/composites/theme-switcher.tsx" }]
      }
    ]);

    expect(invalid.valid).toBe(false);
    expect(invalid.issues.some((issue) => issue.message.includes("Unknown registry dependency"))).toBe(true);
  });
});
