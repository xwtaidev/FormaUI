export const webLinks = {
  docs: "https://docs.formaui.com",
  github: "https://github.com/xwtaidev/FormaUI",
  releaseNotes: "https://github.com/xwtaidev/FormaUI/tree/main/docs/releases",
  releaseV5: "https://github.com/xwtaidev/FormaUI/blob/main/docs/releases/v0.5.md",
  migrationV4ToV5: "https://docs.formaui.com/migration-v0.4-to-v0.5"
} as const;

export const globalNavItems = [
  { href: "/", label: "Playground" },
  { href: webLinks.docs, label: "Docs" },
  { href: "/product", label: "Product" },
  { href: "/showcase", label: "Showcase" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" }
] as const;

export const heroContent = {
  badge: "Open Source",
  title: "Source-owned UI for modern SaaS and AI products",
  description:
    "FormaUI is an open-source React component library built with Tailwind CSS and shadcn/ui. Build SaaS dashboards, AI tools, and internal platforms with reusable primitives and production-ready blocks.",
  primaryCta: { href: webLinks.docs, label: "Get Started" },
  secondaryCta: { href: webLinks.github, label: "Star on GitHub" },
  trustMarks: ["Open Source", "Used in 2k+ apps", "MIT License"]
} as const;

export const stats = [
  { value: "36+", label: "UI Components" },
  { value: "17", label: "Blocks" },
  { value: "5", label: "Themes" },
  { value: "4", label: "Axes" },
  { value: "2", label: "Formats" }
] as const;

export const featureCards = [
  {
    title: "Source-Owned",
    description: "Fully open-source under MIT. Copy and own every line of UI code in your product."
  },
  {
    title: "Styling System",
    description: "Built with Tailwind CSS and tokenized themes for consistent brand expression."
  },
  {
    title: "Performance",
    description: "Composable, tree-shakable components and blocks with low integration overhead."
  },
  {
    title: "Production-Ready",
    description: "Accessibility-first semantics and quality gates that match shipping workflows."
  },
  {
    title: "Developer-First",
    description: "Clean APIs, clear docs, and practical templates for real product teams."
  }
] as const;

export const scenarioTags = [
  "SaaS Dashboards",
  "AI Tools",
  "Admin Panels",
  "Analytics",
  "Internal Tools"
] as const;

export const scenarioShowcase = [
  {
    name: "Analytics Dashboard",
    description: "Track KPIs, growth, and operational trends with responsive widgets."
  },
  {
    name: "AI Chat Interface",
    description: "Ship chat experiences with file upload, model picker, and message states."
  },
  {
    name: "User Management",
    description: "Manage roles, invites, and lifecycle operations with reusable admin patterns."
  },
  {
    name: "Billing Overview",
    description: "Monitor invoices, subscriptions, and usage signals in one clear panel."
  }
] as const;

export const quickStartSteps = [
  {
    title: "Install package",
    command: "pnpm install formaui"
  },
  {
    title: "Import components",
    command: 'import { Button } from "formaui"'
  },
  {
    title: "Use in products",
    command: "Compose with components and production blocks"
  },
  {
    title: "Customize with Tailwind CSS",
    command: "Adapt tokens and themes to your brand"
  },
  {
    title: "Ship faster",
    command: "Deliver polished interfaces with confidence"
  }
] as const;

export const reusableBlocks = [
  "Navbars",
  "Sidebars",
  "Dashboards",
  "Tables",
  "Forms",
  "Modals",
  "Stats Cards",
  "Pricing",
  "Footers"
] as const;

export const qualityGateScores = [
  { label: "Lighthouse", score: 100 },
  { label: "A11y", score: 96 },
  { label: "Best Practices", score: 96 },
  { label: "Performance", score: 100 }
] as const;

export const qualityChecks = [
  "WCAG 2.1 AA Compliant",
  "Fully Responsive",
  "TypeScript First",
  "Cross Browser Support"
] as const;

export const faqItems = [
  "Is FormaUI really open source?",
  "Can I use FormaUI on commercial projects?",
  "What technology does FormaUI use?",
  "How do I customize FormaUI to match my brand?",
  "Where can I get help or contribute?"
] as const;
