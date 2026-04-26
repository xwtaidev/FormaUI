import type { RegistryItem } from "../schema.js";

const BASE_BLOCK_DEPS = ["react", "react-dom"];

function blockItem(options: {
  name: string;
  source: string;
  dependencies?: string[];
  registryDependencies: string[];
}): RegistryItem {
  return {
    name: options.name,
    type: "block",
    dependencies: [...BASE_BLOCK_DEPS, ...(options.dependencies ?? [])],
    devDependencies: [],
    registryDependencies: options.registryDependencies,
    files: [
      {
        source: options.source,
        target: options.source
          .replace("packages/blocks/src/", "components/")
      }
    ]
  };
}

export const blockRegistryItems: RegistryItem[] = [
  blockItem({
    name: "login-panel",
    source: "packages/blocks/src/login-panel.tsx",
    registryDependencies: ["card", "input", "checkbox", "button"]
  }),
  blockItem({
    name: "pricing-section",
    source: "packages/blocks/src/pricing-section.tsx",
    registryDependencies: ["card", "badge", "button"]
  }),
  blockItem({
    name: "dashboard-shell",
    source: "packages/blocks/src/dashboard-shell.tsx",
    registryDependencies: ["app-sidebar", "page-header", "metric-card"]
  }),
  blockItem({
    name: "settings-layout",
    source: "packages/blocks/src/settings-layout.tsx",
    registryDependencies: ["tabs", "card", "input", "switch"]
  }),
  blockItem({
    name: "billing-panel",
    source: "packages/blocks/src/billing-panel.tsx",
    registryDependencies: ["card", "badge", "button"]
  }),
  blockItem({
    name: "api-key-manager",
    source: "packages/blocks/src/api-key-manager.tsx",
    registryDependencies: ["card", "badge", "button"]
  }),
  blockItem({
    name: "token-usage-chart",
    source: "packages/blocks/src/token-usage-chart.tsx",
    registryDependencies: ["card", "badge"]
  }),
  blockItem({
    name: "agent-run-timeline",
    source: "packages/blocks/src/agent-run-timeline.tsx",
    registryDependencies: ["card", "badge", "button"]
  }),
  blockItem({
    name: "team-members-table",
    source: "packages/blocks/src/team-members-table.tsx",
    registryDependencies: ["card", "badge", "data-table"]
  }),
  blockItem({
    name: "notification-panel",
    source: "packages/blocks/src/notification-panel.tsx",
    registryDependencies: ["card", "badge", "button", "search-command"]
  }),
  blockItem({
    name: "model-selector",
    source: "packages/blocks/src/model-selector.tsx",
    registryDependencies: ["card", "badge", "button", "select"]
  }),
  blockItem({
    name: "hero-cta",
    source: "packages/blocks/src/hero-cta.tsx",
    registryDependencies: ["card", "badge", "button"]
  }),
  blockItem({
    name: "feature-grid",
    source: "packages/blocks/src/feature-grid.tsx",
    registryDependencies: ["card", "badge"]
  }),
  blockItem({
    name: "logo-cloud",
    source: "packages/blocks/src/logo-cloud.tsx",
    registryDependencies: ["card"]
  })
];
