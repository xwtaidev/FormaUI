export type SectionAnchor = {
  id: string;
  label: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export const sectionAnchors: SectionAnchor[] = [
  { id: "hero", label: "Hero" },
  { id: "core-differentiators", label: "Features" },
  { id: "scenario-showcase", label: "Scenarios" },
  { id: "asset-proof", label: "Proof" },
  { id: "faq", label: "FAQ" },
  { id: "quick-start-path", label: "Quick Start" },
  { id: "landing-footer", label: "Footer" }
];

export const heroCtaContent = {
  eyebrow: "FormaUI v0.4.4",
  title: "Build Growth Pages with Source-Owned UI",
  description:
    "Compose your marketing narrative from installable blocks, keep full source ownership, and iterate without waiting on hosted lock-in.",
  primaryCtaLabel: "Start Quick",
  primaryCtaHref: "/quick-start",
  secondaryCtaLabel: "Read Docs",
  secondaryCtaHref: "/introduction"
};

export const featureGridContent = {
  title: "Core Differentiators",
  description: "A practical growth stack for teams that want product velocity and long-term maintainability.",
  features: [
    {
      title: "Source-Owned by Default",
      description: "Copy code into your repo, version it with your app, and evolve behavior on your own schedule."
    },
    {
      title: "Registry-Native Delivery",
      description: "Install components, blocks, templates, and packs through a consistent discover/info/add workflow."
    },
    {
      title: "Token-Compatible Blocks",
      description: "Marketing sections stay aligned with your design tokens and app-level visual language."
    },
    {
      title: "Scenario-Driven Composition",
      description: "Start from high-level sections, then adapt only what your product context actually needs."
    }
  ]
};

export const logoCloudContent = {
  title: "Scenario Showcase",
  description: "Launch pages and docs surfaces that align with common product narratives.",
  logos: ["SaaS Dashboard", "AI Workspace", "Developer Tools", "Growth Funnel", "Pricing + Billing", "Release Notes"]
};

export const statsStripContent = {
  title: "Asset Proof",
  description: "Current v0.4 inventory baseline that teams can install and compose immediately.",
  stats: [
    { label: "Components", value: "36" },
    { label: "Blocks", value: "14" },
    { label: "Templates", value: "3" },
    { label: "Packs", value: "3" }
  ]
};

export const faqAccordionContent = {
  title: "FAQ",
  description: "Common adoption questions from teams evaluating FormaUI.",
  items: [
    {
      id: "faq-1",
      question: "Is FormaUI hosted or source-owned?",
      answer: "Source-owned. You install assets into your repository and keep full control over updates."
    },
    {
      id: "faq-2",
      question: "Can we start from blocks instead of primitives?",
      answer: "Yes. You can adopt marketing blocks first, then refine internals where product behavior requires it."
    },
    {
      id: "faq-3",
      question: "How does v0.4 improve on v0.3?",
      answer:
        "v0.4 adds an official landing baseline, reusable marketing blocks, and quality gates for conversion-oriented surfaces."
    }
  ]
};

export const finalCtaContent = {
  eyebrow: "Ship with confidence",
  title: "Ready to ship your landing with FormaUI?",
  description: "Use official blocks as baseline, then iterate copy, layout, and behavior directly in your source tree.",
  primaryCtaLabel: "Open Quick Start",
  primaryCtaHref: "/quick-start",
  secondaryCtaLabel: "Browse Introduction",
  secondaryCtaHref: "/introduction"
};

export const footerLinks: FooterLink[] = [
  { label: "Docs", href: "/introduction" },
  { label: "Quick Start", href: "/quick-start" },
  { label: "Examples", href: "https://github.com/xwtaidev/FormaUI/tree/main/examples" },
  { label: "GitHub", href: "https://github.com/xwtaidev/FormaUI" },
  { label: "Release Notes", href: "https://github.com/xwtaidev/FormaUI/tree/main/docs/releases" }
];
