import { describe, expect, it } from "vitest";

import { buildRegistryIndex, type RegistryItem } from "../src";

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
      }
    ];

    const result = buildRegistryIndex({
      items,
      generatedAt: "2026-04-25T00:00:00.000Z"
    });

    expect(result.generatedAt).toBe("2026-04-25T00:00:00.000Z");
    expect(result.total).toBe(3);
    expect(result.byKind.component.button).toBeDefined();
    expect(result.byKind.component.button?.latest).toBe("0.2.0");
    expect(result.byKind.component.button?.versions).toEqual(["0.2.0", "0.1.0"]);
    expect(result.byKind.component.button?.entries["0.2.0"]?.path).toBe("components/button.json");
    expect(result.byKind.block["dashboard-shell"]?.entries["0.2.2"]?.path).toBe("blocks/dashboard-shell.json");
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
});
