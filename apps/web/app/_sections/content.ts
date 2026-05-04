export const webLinks = {
  docs: "https://docs.formaui.com",
  github: "https://github.com/xwtaidev/FormaUI",
  components: "https://docs.formaui.com/docs/components",
  blocks: "https://docs.formaui.com/docs/blocks",
  templates: "https://docs.formaui.com/docs/templates",
  registry: "https://docs.formaui.com/docs/registry",
  quickStart: "https://docs.formaui.com/docs/quick-start",
  releaseNotes: "https://github.com/xwtaidev/FormaUI/tree/main/docs/releases",
  releaseV9: "https://github.com/xwtaidev/FormaUI/blob/main/docs/releases/v0.9.md",
  examples: "https://github.com/xwtaidev/FormaUI/tree/main/examples"
} as const;

export const landingSectionSequence = [
  "LandingHero",
  "LandingProductSurfaces",
  "LandingSourceOwnership",
  "LandingBuildFlow",
  "LandingScenarioGallery",
  "LandingQualitySystem",
  "LandingProof",
  "LandingFinalCta",
  "LandingFooter"
] as const;

export const editorialSections = [
  { roman: "I", label: "Hero", page: "001" },
  { roman: "II", label: "Product Surfaces", page: "002" },
  { roman: "III", label: "Source Ownership", page: "003" },
  { roman: "IV", label: "Developer Workflow", page: "004" },
  { roman: "V", label: "Use Cases", page: "005" },
  { roman: "VI", label: "Quality", page: "006" },
  { roman: "VII", label: "Ecosystem", page: "007" },
  { roman: "VIII", label: "Final", page: "008" },
  { roman: "FIN", label: "Footer", page: "009" }
] as const;

export const primaryNavigationItems = [
  { href: "/product", label: "Product" },
  { href: "#surfaces", label: "Surfaces" },
  { href: webLinks.registry, label: "Registry" },
  { href: "/showcase", label: "Showcase" },
  { href: webLinks.docs, label: "Docs" },
  { href: webLinks.github, label: "GitHub" }
] as const;

export const mobileNavigationItems = [
  { href: webLinks.docs, label: "Docs" },
  { href: webLinks.components, label: "Components" },
  { href: webLinks.blocks, label: "Blocks" },
  { href: webLinks.github, label: "GitHub" },
  { href: "/changelog", label: "Changelog" }
] as const;

export const heroContent = {
  badge: "FormaUI v0.9",
  eyebrow: "Source-owned UI for SaaS and AI products",
  title: "Own the interface you ship.",
  titleHtml: "Own the interface you _ship_.",
  description:
    "FormaUI gives SaaS and AI teams source-owned React components, production blocks, templates, and registry workflows they can copy, adapt, and ship with confidence.",
  primaryCta: { href: webLinks.docs, label: "Start with Docs" },
  secondaryCta: { href: webLinks.github, label: "View on GitHub" },
  supportingCta: { href: "/showcase", label: "Explore Product Surfaces" },
  trustMarks: ["MIT source", "React + Tailwind", "Components, blocks, templates", "Registry workflow"]
} as const;

export const productSurfaces = [
  {
    name: "SaaS Dashboard",
    tagline: "Metrics, tables, filters, and command surfaces for operational products.",
    assets: ["metric-card", "data-table", "filter-bar", "app-sidebar"],
    accent: "mint"
  },
  {
    name: "AI Console",
    tagline: "Model selection, chat states, upload flows, and prompt workspace patterns.",
    assets: ["model-selector", "search-command", "upload", "empty-state"],
    accent: "graphite"
  },
  {
    name: "Admin Workflow",
    tagline: "User management, roles, forms, dialogs, and lifecycle review surfaces.",
    assets: ["form-field", "dialog", "descriptions", "timeline"],
    accent: "amber"
  },
  {
    name: "Marketing Launch",
    tagline: "Pricing, launch pages, proof blocks, and conversion-ready product sections.",
    assets: ["card", "badge", "accordion", "result"],
    accent: "coral"
  }
] as const;

export const sourceOwnershipComparison = [
  {
    label: "Traditional UI library",
    stance: "Fast start, constrained ownership",
    details: "You import a package and inherit its abstraction, styling limits, and upgrade risks."
  },
  {
    label: "Template marketplace",
    stance: "Attractive snapshots, weak system fit",
    details: "You buy a page, then spend time extracting patterns into your product system."
  },
  {
    label: "FormaUI",
    stance: "Source-owned product surfaces",
    details: "You install components, blocks, templates, and metadata as code your team can adapt."
  }
] as const;

export const buildFlowSteps = [
  { title: "Initialize", command: "npx formaui init", note: "Prepare tokens and registry configuration." },
  { title: "Discover", command: "npx formaui search dashboard", note: "Find product-ready components and blocks." },
  { title: "Install a pack", command: "npx formaui pack add dashboard-foundation", note: "Copy a complete surface foundation into your repo." },
  { title: "Add a component", command: "npx formaui add date-range-picker", note: "Extend the surface with focused primitives." }
] as const;

export const scenarioGallery = [
  { title: "AI tools", assets: "Console, upload, command menu", team: "Founders shipping AI workflows" },
  { title: "Admin dashboards", assets: "Sidebar, tables, filters", team: "Teams replacing internal spreadsheets" },
  { title: "Analytics", assets: "Metrics, timelines, status cards", team: "Products that need operational clarity" },
  { title: "Billing", assets: "Cards, descriptions, dialogs", team: "SaaS teams packaging plan flows" },
  { title: "User management", assets: "Forms, roles, menus, empty states", team: "B2B apps with workspace models" },
  { title: "Launch pages", assets: "Proof, pricing, FAQ, CTA blocks", team: "Builders validating product demand" }
] as const;

export const qualitySystem = [
  { label: "A11y", value: "AA", detail: "Keyboard paths, visible focus, semantic structure." },
  { label: "Responsive", value: "375+", detail: "Mobile-first layouts without horizontal overflow." },
  { label: "Typed", value: "TS", detail: "React components with explicit APIs and source ownership." },
  { label: "SEO", value: "95+", detail: "Metadata, sitemap, robots, and page structure checks." },
  { label: "Tests", value: "Vitest", detail: "Route, content, CTA, and SEO smoke coverage." },
  { label: "Registry", value: "v3", detail: "Category, scenario, complexity, and stability metadata." }
] as const;

export const proofLinks = [
  { href: webLinks.github, label: "GitHub", description: "Open-source source code and issue history." },
  { href: webLinks.docs, label: "Docs", description: "Implementation guides, components, blocks, and registry reference." },
  { href: webLinks.releaseNotes, label: "Release notes", description: "Version-by-version delivery history." },
  { href: webLinks.examples, label: "Examples", description: "Next.js and Vite starter surfaces." }
] as const;

export const finalCta = {
  title: "Start by owning your UI.",
  titleHtml: "Start by _owning_ your UI.",
  description: "Install source-owned components and product surfaces, then adapt every line to fit the product you are actually shipping.",
  primary: { href: webLinks.docs, label: "Start with Docs" },
  secondary: { href: webLinks.github, label: "Star on GitHub" },
  tertiary: [
    { href: webLinks.components, label: "View Components" },
    { href: webLinks.blocks, label: "Explore Blocks" },
    { href: webLinks.releaseV9, label: "Read v0.9 notes" }
  ]
} as const;
