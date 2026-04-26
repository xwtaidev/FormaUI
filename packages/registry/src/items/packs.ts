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
    description: "Dashboard starter with table controls, filters and empty-result handling.",
    category: "dashboard",
    scenarios: ["analytics", "operations"],
    registryDependencies: [
      "dashboard-shell",
      "page-header",
      "metric-card",
      "data-table",
      "data-table-toolbar",
      "filter-bar",
      "pagination-bar",
      "empty-search-state"
    ]
  }),
  packItem({
    name: "data-entry",
    description: "Form starter pack for onboarding/settings with date and status filtering flows.",
    category: "forms",
    scenarios: ["settings", "onboarding"],
    registryDependencies: [
      "form-field",
      "input",
      "select",
      "radio-group",
      "checkbox",
      "date-range-picker",
      "filter-bar",
      "button",
      "card"
    ]
  }),
  packItem({
    name: "feedback-loading",
    description: "Loading and feedback pack for skeletons, progress, status and empty-result recovery.",
    category: "feedback",
    scenarios: ["loading", "empty-state", "notifications"],
    registryDependencies: [
      "skeleton",
      "progress",
      "status-badge",
      "empty-state",
      "empty-search-state",
      "dialog",
      "tooltip",
      "badge",
      "button"
    ]
  }),
  packItem({
    name: "marketing-launch",
    description: "Landing-ready marketing pack with hero, proof, FAQ and closing CTA sections.",
    category: "marketing",
    scenarios: ["landing", "growth", "conversion"],
    registryDependencies: ["hero-cta", "feature-grid", "logo-cloud", "stats-strip", "faq-accordion", "final-cta"]
  })
];
