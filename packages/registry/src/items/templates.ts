import type { RegistryItem } from "../schema.js";

export const templateRegistryItems: RegistryItem[] = [
  {
    name: "ai-console-lite",
    type: "template",
    dependencies: ["react", "react-dom"],
    devDependencies: [],
    registryDependencies: [
      "dashboard-shell",
      "token-usage-chart",
      "agent-run-timeline",
      "api-key-manager",
      "settings-layout",
      "page-header",
      "metric-card",
      "button"
    ],
    files: [
      {
        source: "templates/ai-console-lite/page.tsx",
        target: "app/ai-console-lite/page.tsx"
      },
      {
        source: "templates/ai-console-lite/registry.json",
        target: "templates/ai-console-lite/registry.json"
      }
    ]
  },
  {
    name: "saas-starter",
    type: "template",
    dependencies: ["react", "react-dom"],
    devDependencies: [],
    registryDependencies: [
      "pricing-section",
      "team-members-table",
      "notification-panel",
      "model-selector",
      "page-header",
      "metric-card",
      "button",
      "badge"
    ],
    files: [
      {
        source: "templates/saas-starter/page.tsx",
        target: "app/saas-starter/page.tsx"
      },
      {
        source: "templates/saas-starter/registry.json",
        target: "templates/saas-starter/registry.json"
      }
    ]
  },
  {
    name: "admin-dashboard",
    type: "template",
    dependencies: ["react", "react-dom"],
    devDependencies: [],
    registryDependencies: [
      "dashboard-shell",
      "token-usage-chart",
      "agent-run-timeline",
      "team-members-table",
      "notification-panel",
      "model-selector",
      "page-header",
      "metric-card",
      "button"
    ],
    files: [
      {
        source: "templates/admin-dashboard/page.tsx",
        target: "app/admin-dashboard/page.tsx"
      },
      {
        source: "templates/admin-dashboard/registry.json",
        target: "templates/admin-dashboard/registry.json"
      }
    ]
  }
];
