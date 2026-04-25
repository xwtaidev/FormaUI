export type SectionAnchor = {
  id: string;
  label: string;
};

export type Differentiator = {
  title: string;
  description: string;
};

export type Scenario = {
  title: string;
  description: string;
  href: string;
};

export type TrustItem = {
  title: string;
  detail: string;
};

export type QuickStartStep = {
  title: string;
  command: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export const sectionAnchors: SectionAnchor[] = [
  { id: "hero", label: "Hero" },
  { id: "core-differentiators", label: "Core Differentiators" },
  { id: "asset-proof", label: "Asset Proof" },
  { id: "scenario-showcase", label: "Scenario Showcase" },
  { id: "quick-start-path", label: "Quick Start" },
  { id: "trust-proof", label: "Trust" },
  { id: "faq", label: "FAQ" },
  { id: "landing-footer", label: "Footer" }
];

export const differentiators: Differentiator[] = [
  {
    title: "Source-Owned UI",
    description: "You copy source files into your codebase and keep full control over behavior, styling, and release pace."
  },
  {
    title: "Scenario Assets",
    description: "Components, blocks, templates, and packs are aligned so teams can move from primitives to product sections quickly."
  },
  {
    title: "CLI Workflow",
    description: "Use `init`, `add`, and `pack add` to discover, validate, and ship assets with predictable registry metadata."
  }
];

export const scenarios: Scenario[] = [
  {
    title: "SaaS Dashboard",
    description: "Compose account navigation, data table flows, and settings surfaces with shared primitives and blocks.",
    href: "/blocks/dashboard-shell"
  },
  {
    title: "AI Workspace",
    description: "Assemble model switching, usage analytics, and notification flows while keeping product-specific source control.",
    href: "/blocks/model-selector"
  },
  {
    title: "Billing & Growth",
    description: "Ship pricing and subscription UX with reusable blocks and extend only where your product needs differentiation.",
    href: "/blocks/pricing-section"
  }
];

export const trustItems: TrustItem[] = [
  {
    title: "v0.1 -> v0.3 shipped",
    detail: "Validated source-owned loop, registry evolution, and pack workflows are already live in docs and examples."
  },
  {
    title: "v0.4.1 now active",
    detail: "Landing information architecture and responsive baseline are the foundation for growth-focused v0.4 milestones."
  },
  {
    title: "Open release cadence",
    detail: "Release notes and migration guides stay in-repo so teams can adopt updates without guessing hidden behaviors."
  }
];

export const quickStartSteps: QuickStartStep[] = [
  { title: "Initialize project", command: "npx formaui init" },
  { title: "Discover by scenario", command: "npx formaui search dashboard --scenario saas" },
  { title: "Install a pack", command: "npx formaui pack add dashboard-foundation" }
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Is FormaUI a hosted component service?",
    answer:
      "No. FormaUI is source-owned. You install and own the code inside your repo so long-term customization stays under your control."
  },
  {
    id: "faq-2",
    question: "Can we start from higher-level assets?",
    answer:
      "Yes. You can adopt blocks and packs first, then drill into component-level edits where product behavior requires custom logic."
  },
  {
    id: "faq-3",
    question: "How does v0.4 differ from v0.3?",
    answer:
      "v0.4 adds growth-focused landing architecture, marketing block workflows, and hard quality gates for SEO, performance, and conversion."
  }
];

export const footerLinks: FooterLink[] = [
  { label: "Docs", href: "/introduction" },
  { label: "Quick Start", href: "/quick-start" },
  { label: "Examples", href: "https://github.com/xwtaidev/FormaUI/tree/main/examples" },
  { label: "GitHub", href: "https://github.com/xwtaidev/FormaUI" },
  { label: "Release Notes", href: "https://github.com/xwtaidev/FormaUI/tree/main/docs/releases" }
];
