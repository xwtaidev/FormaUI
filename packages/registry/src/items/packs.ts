import type { RegistryItem } from "../schema.js";

function packItem(options: {
  name: string;
  description: string;
  category: string;
  scenarios: string[];
  registryDependencies: string[];
}): RegistryItem {
  return {
    name: options.name,
    type: "pack",
    description: options.description,
    category: options.category,
    scenarios: options.scenarios,
    complexity: "medium",
    stability: "beta",
    dependencies: [],
    devDependencies: [],
    registryDependencies: options.registryDependencies,
    files: []
  };
}

export const packRegistryItems: RegistryItem[] = [
  packItem({
    name: "dashboard-foundation",
    description: "Dashboard layout starter with shell, metrics and table components.",
    category: "dashboard",
    scenarios: ["analytics", "operations"],
    registryDependencies: ["dashboard-shell", "page-header", "metric-card", "data-table", "search-command"]
  }),
  packItem({
    name: "data-entry",
    description: "Form-oriented starter pack for account/settings data entry flows.",
    category: "forms",
    scenarios: ["settings", "onboarding"],
    registryDependencies: ["form-field", "input", "select", "checkbox", "button", "card"]
  }),
  packItem({
    name: "feedback-loading",
    description: "Status, dialog and empty-state building blocks for user feedback loops.",
    category: "feedback",
    scenarios: ["loading", "empty-state", "notifications"],
    registryDependencies: ["status-badge", "empty-state", "dialog", "tooltip", "badge", "button"]
  })
];
