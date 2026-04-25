import { describe, expect, it } from "vitest";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  blockRegistryItems,
  componentRegistryItems,
  templateRegistryItems,
  themeRegistryItems,
  validateRegistryItems
} from "../src";

const REQUIRED_BLOCKS = [
  "login-panel",
  "pricing-section",
  "dashboard-shell",
  "settings-layout",
  "billing-panel",
  "api-key-manager",
  "token-usage-chart",
  "agent-run-timeline",
  "team-members-table",
  "notification-panel"
] as const;

const REQUIRED_COMPONENTS = [
  "data-table",
  "search-command"
] as const;

const testFileDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(testFileDir, "../../..");

describe("registry coverage: blocks and templates", () => {
  it("contains all required v0.2.4 component registry items", () => {
    const names = new Set(componentRegistryItems.map((item) => item.name));

    for (const required of REQUIRED_COMPONENTS) {
      expect(names.has(required)).toBe(true);
    }
  });

  it("contains all required block registry items", () => {
    const names = new Set(blockRegistryItems.map((item) => item.name));

    for (const required of REQUIRED_BLOCKS) {
      expect(names.has(required)).toBe(true);
    }

    expect(blockRegistryItems).toHaveLength(REQUIRED_BLOCKS.length);
    expect(blockRegistryItems.every((item) => item.type === "block")).toBe(true);
  });

  it("declares block dependencies for new wave-1 blocks", () => {
    const teamMembersTable = blockRegistryItems.find((item) => item.name === "team-members-table");
    const notificationPanel = blockRegistryItems.find((item) => item.name === "notification-panel");

    expect(teamMembersTable).toBeDefined();
    expect(notificationPanel).toBeDefined();

    if (!teamMembersTable || !notificationPanel) {
      return;
    }

    expect(new Set(teamMembersTable.registryDependencies).has("data-table")).toBe(true);
    expect(new Set(notificationPanel.registryDependencies).has("search-command")).toBe(true);
  });

  it("declares ai-console-lite with required dashboard and ai dependencies", () => {
    const template = templateRegistryItems.find((item) => item.name === "ai-console-lite");
    expect(template).toBeDefined();

    if (!template) {
      return;
    }

    expect(template.type).toBe("template");

    const dependencySet = new Set(template.registryDependencies);
    expect(dependencySet.has("dashboard-shell")).toBe(true);
    expect(dependencySet.has("token-usage-chart")).toBe(true);
    expect(dependencySet.has("agent-run-timeline")).toBe(true);
    expect(dependencySet.has("api-key-manager")).toBe(true);
  });

  it("keeps full registry dependency graph valid", () => {
    const validation = validateRegistryItems(
      [
        ...componentRegistryItems,
        ...themeRegistryItems,
        ...blockRegistryItems,
        ...templateRegistryItems
      ],
      {
        checkFiles: true,
        repoRoot
      }
    );

    expect(validation.valid).toBe(true);
    expect(validation.issues).toHaveLength(0);
  });
});
