import { describe, expect, it } from "vitest";

import { buildRegistryIndex, type RegistryItem } from "../src";
import { componentRegistryItems } from "../src/items/components";

describe("registry index builder", () => {
  it("builds grouped index entries by kind/name/version", () => {
    const items: RegistryItem[] = [
      {
        name: "button",
        type: "component",
        version: "0.1.0",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [{ source: "packages/components/src/primitives/button.tsx", target: "components/primitives/button.tsx" }]
      },
      {
        name: "button",
        type: "component",
        version: "0.2.0",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [{ source: "packages/components/src/primitives/button.tsx", target: "components/primitives/button.tsx" }]
      },
      {
        name: "dashboard-shell",
        type: "block",
        version: "0.2.2",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: ["button"],
        files: [{ source: "packages/blocks/src/dashboard-shell.tsx", target: "components/dashboard-shell.tsx" }]
      },
      {
        name: "dashboard-foundation",
        type: "pack",
        version: "0.3.1",
        category: "dashboard",
        scenarios: ["analytics"],
        complexity: "high",
        stability: "beta",
        dependencies: [],
        devDependencies: [],
        registryDependencies: ["dashboard-shell", "button"],
        files: []
      }
    ];

    const result = buildRegistryIndex({
      items,
      generatedAt: "2026-04-25T00:00:00.000Z"
    });

    expect(result.generatedAt).toBe("2026-04-25T00:00:00.000Z");
    expect(result.total).toBe(4);
    expect(result.byKind.component.button).toBeDefined();
    expect(result.byKind.component.button?.latest).toBe("0.2.0");
    expect(result.byKind.component.button?.versions).toEqual(["0.2.0", "0.1.0"]);
    expect(result.byKind.component.button?.entries["0.2.0"]?.path).toBe("components/button.json");
    expect(result.byKind.block["dashboard-shell"]?.entries["0.2.2"]?.path).toBe("blocks/dashboard-shell.json");
    expect(result.byKind.pack["dashboard-foundation"]?.entries["0.3.1"]?.path).toBe("packs/dashboard-foundation.json");
    expect(result.byKind.pack["dashboard-foundation"]?.entries["0.3.1"]?.category).toBe("dashboard");
    expect(result.byKind.pack["dashboard-foundation"]?.entries["0.3.1"]?.scenarios).toEqual(["analytics"]);
  });

  it("applies fallback version when item version is missing", () => {
    const result = buildRegistryIndex({
      items: [
        {
          name: "default",
          type: "theme",
          dependencies: [],
          devDependencies: [],
          registryDependencies: [],
          files: [{ source: "packages/themes/src/default.css", target: "styles/formaui/default.css" }]
        }
      ],
      fallbackVersion: "0.2.2"
    });

    expect(result.byKind.theme.default?.latest).toBe("0.2.2");
    expect(result.byKind.theme.default?.entries["0.2.2"]?.path).toBe("themes/default.json");
  });

  it("includes v0.6 component wave entries in registry index output", () => {
    const result = buildRegistryIndex({
      items: componentRegistryItems,
      generatedAt: "2026-04-28T00:00:00.000Z",
      fallbackVersion: "0.6.0"
    });

    const v06ComponentNames = [
      "alert",
      "breadcrumb",
      "label",
      "typography",
      "steps",
      "collapse",
      "navigation-menu",
      "menubar",
      "context-menu",
      "drawer",
      "input-number",
      "slider",
      "toggle",
      "toggle-group",
      "input-otp",
      "upload",
      "calendar",
      "date-picker",
      "combobox",
      "toast"
    ] as const;

    for (const componentName of v06ComponentNames) {
      expect(result.byKind.component[componentName]?.entries["0.6.0"]?.path).toBe(
        `components/${componentName}.json`
      );
    }
  });
});
