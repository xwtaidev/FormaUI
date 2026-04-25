import type { RegistryItem } from "../schema.js";

const BASE_COMPONENT_DEPS = ["react", "react-dom"];

function componentItem(options: {
  name: string;
  source: string;
  dependencies?: string[];
  registryDependencies?: string[];
  type?: RegistryItem["type"];
}): RegistryItem {
  return {
    name: options.name,
    type: options.type ?? "component",
    dependencies: [...BASE_COMPONENT_DEPS, ...(options.dependencies ?? [])],
    devDependencies: [],
    registryDependencies: options.registryDependencies ?? [],
    files: [
      {
        source: options.source,
        target: options.source
          .replace("packages/components/src/", "components/")
          .replace("/lib/", "/lib/")
      }
    ]
  };
}

export const componentRegistryItems: RegistryItem[] = [
  {
    name: "lib-cn",
    type: "lib",
    dependencies: ["clsx", "tailwind-merge"],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        source: "packages/components/src/lib/cn.ts",
        target: "components/lib/cn.ts"
      }
    ]
  },
  componentItem({
    name: "accordion",
    source: "packages/components/src/primitives/accordion.tsx",
    dependencies: ["@radix-ui/react-accordion", "lucide-react"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "avatar",
    source: "packages/components/src/primitives/avatar.tsx",
    dependencies: ["@radix-ui/react-avatar"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "badge",
    source: "packages/components/src/primitives/badge.tsx",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "button",
    source: "packages/components/src/primitives/button.tsx",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "card",
    source: "packages/components/src/primitives/card.tsx",
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "checkbox",
    source: "packages/components/src/primitives/checkbox.tsx",
    dependencies: ["@radix-ui/react-checkbox", "lucide-react"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "dialog",
    source: "packages/components/src/primitives/dialog.tsx",
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "dropdown-menu",
    source: "packages/components/src/primitives/dropdown-menu.tsx",
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "hover-card",
    source: "packages/components/src/primitives/hover-card.tsx",
    dependencies: ["@radix-ui/react-hover-card"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "input",
    source: "packages/components/src/primitives/input.tsx",
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "popover",
    source: "packages/components/src/primitives/popover.tsx",
    dependencies: ["@radix-ui/react-popover"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "progress",
    source: "packages/components/src/primitives/progress.tsx",
    dependencies: ["@radix-ui/react-progress"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "radio-group",
    source: "packages/components/src/primitives/radio-group.tsx",
    dependencies: ["@radix-ui/react-radio-group"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "select",
    source: "packages/components/src/primitives/select.tsx",
    dependencies: ["@radix-ui/react-select", "lucide-react"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "separator",
    source: "packages/components/src/primitives/separator.tsx",
    dependencies: ["@radix-ui/react-separator"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "skeleton",
    source: "packages/components/src/primitives/skeleton.tsx",
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "switch",
    source: "packages/components/src/primitives/switch.tsx",
    dependencies: ["@radix-ui/react-switch"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "tabs",
    source: "packages/components/src/primitives/tabs.tsx",
    dependencies: ["@radix-ui/react-tabs"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "textarea",
    source: "packages/components/src/primitives/textarea.tsx",
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "tooltip",
    source: "packages/components/src/primitives/tooltip.tsx",
    dependencies: ["@radix-ui/react-tooltip"],
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "app-sidebar",
    source: "packages/components/src/composites/app-sidebar.tsx"
  }),
  componentItem({
    name: "data-table",
    source: "packages/components/src/composites/data-table.tsx",
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "date-range-picker",
    source: "packages/components/src/composites/date-range-picker.tsx",
    registryDependencies: ["lib-cn", "input", "separator"]
  }),
  componentItem({
    name: "empty-state",
    source: "packages/components/src/composites/empty-state.tsx",
    registryDependencies: ["button"]
  }),
  componentItem({
    name: "filter-bar",
    source: "packages/components/src/composites/filter-bar.tsx",
    registryDependencies: ["lib-cn", "button", "input", "radio-group", "separator", "date-range-picker"]
  }),
  componentItem({
    name: "form-field",
    source: "packages/components/src/composites/form-field.tsx",
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "metric-card",
    source: "packages/components/src/composites/metric-card.tsx",
    registryDependencies: ["card"]
  }),
  componentItem({
    name: "page-header",
    source: "packages/components/src/composites/page-header.tsx",
    registryDependencies: ["lib-cn"]
  }),
  componentItem({
    name: "search-command",
    source: "packages/components/src/composites/search-command.tsx",
    registryDependencies: ["lib-cn", "badge", "button", "input"]
  }),
  componentItem({
    name: "status-badge",
    source: "packages/components/src/composites/status-badge.tsx",
    registryDependencies: ["badge"]
  }),
  componentItem({
    name: "theme-switcher",
    source: "packages/components/src/composites/theme-switcher.tsx",
    registryDependencies: ["button"]
  }),
  componentItem({
    name: "user-menu",
    source: "packages/components/src/composites/user-menu.tsx",
    registryDependencies: ["avatar", "dropdown-menu"]
  })
];
