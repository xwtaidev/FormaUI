import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://formaui.com"),
  title: {
    default: "FormaUI Docs",
    template: "%s | FormaUI"
  },
  description:
    "Official FormaUI documentation with installation, components, blocks, templates, CLI, registry, and migration guides.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "FormaUI Docs",
    description:
      "Official FormaUI documentation with installation, components, blocks, templates, CLI, registry, and migration guides.",
    url: "https://formaui.com",
    siteName: "FormaUI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FormaUI Docs",
    description:
      "Official FormaUI documentation with installation, components, blocks, templates, CLI, registry, and migration guides."
  }
};

const navSections: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Getting Started",
    links: [
      { href: "/introduction", label: "Introduction" },
      { href: "/installation", label: "Installation" },
      { href: "/quick-start", label: "Quick Start" },
      { href: "/design-system", label: "Design System" },
      { href: "/design-tokens", label: "Design Tokens" },
      { href: "/theme", label: "Theme Overview" }
    ]
  },
  {
    title: "CLI & Registry",
    links: [
      { href: "/cli", label: "CLI Overview" },
      { href: "/cli/commands", label: "CLI Commands" },
      { href: "/registry", label: "Registry v3" },
      { href: "/packs", label: "Pack Workflows" }
    ]
  },
  {
    title: "Components",
    links: [
      { href: "/components/alert", label: "alert" },
      { href: "/components/accordion", label: "accordion" },
      { href: "/components/app-sidebar", label: "app-sidebar" },
      { href: "/components/avatar", label: "avatar" },
      { href: "/components/badge", label: "badge" },
      { href: "/components/breadcrumb", label: "breadcrumb" },
      { href: "/components/button", label: "button" },
      { href: "/components/calendar", label: "calendar" },
      { href: "/components/card", label: "card" },
      { href: "/components/checkbox", label: "checkbox" },
      { href: "/components/collapse", label: "collapse" },
      { href: "/components/combobox", label: "combobox" },
      { href: "/components/context-menu", label: "context-menu" },
      { href: "/components/data-table", label: "data-table" },
      { href: "/components/data-table-toolbar", label: "data-table-toolbar" },
      { href: "/components/date-picker", label: "date-picker" },
      { href: "/components/dialog", label: "dialog" },
      { href: "/components/drawer", label: "drawer" },
      { href: "/components/dropdown-menu", label: "dropdown-menu" },
      { href: "/components/empty-search-state", label: "empty-search-state" },
      { href: "/components/empty-state", label: "empty-state" },
      { href: "/components/form-field", label: "form-field" },
      { href: "/components/hover-card", label: "hover-card" },
      { href: "/components/input", label: "input" },
      { href: "/components/input-number", label: "input-number" },
      { href: "/components/input-otp", label: "input-otp" },
      { href: "/components/label", label: "label" },
      { href: "/components/lib-cn", label: "lib-cn" },
      { href: "/components/metric-card", label: "metric-card" },
      { href: "/components/menubar", label: "menubar" },
      { href: "/components/navigation-menu", label: "navigation-menu" },
      { href: "/components/pagination-bar", label: "pagination-bar" },
      { href: "/components/page-header", label: "page-header" },
      { href: "/components/popover", label: "popover" },
      { href: "/components/progress", label: "progress" },
      { href: "/components/radio-group", label: "radio-group" },
      { href: "/components/search-command", label: "search-command" },
      { href: "/components/select", label: "select" },
      { href: "/components/separator", label: "separator" },
      { href: "/components/skeleton", label: "skeleton" },
      { href: "/components/slider", label: "slider" },
      { href: "/components/steps", label: "steps" },
      { href: "/components/status-badge", label: "status-badge" },
      { href: "/components/switch", label: "switch" },
      { href: "/components/tabs", label: "tabs" },
      { href: "/components/textarea", label: "textarea" },
      { href: "/components/toast", label: "toast" },
      { href: "/components/theme-switcher", label: "theme-switcher" },
      { href: "/components/toggle", label: "toggle" },
      { href: "/components/toggle-group", label: "toggle-group" },
      { href: "/components/tooltip", label: "tooltip" },
      { href: "/components/typography", label: "typography" },
      { href: "/components/upload", label: "upload" },
      { href: "/components/user-menu", label: "user-menu" },
      { href: "/components/date-range-picker", label: "date-range-picker" },
      { href: "/components/filter-bar", label: "filter-bar" }
    ]
  },
  {
    title: "Packs",
    links: [
      { href: "/packs", label: "Overview" },
      { href: "/packs/dashboard-foundation", label: "dashboard-foundation" },
      { href: "/packs/data-entry", label: "data-entry" },
      { href: "/packs/feedback-loading", label: "feedback-loading" },
      { href: "/packs/marketing-launch", label: "marketing-launch" }
    ]
  },
  {
    title: "Blocks",
    links: [
      { href: "/blocks/agent-run-timeline", label: "agent-run-timeline" },
      { href: "/blocks/api-key-manager", label: "api-key-manager" },
      { href: "/blocks/billing-panel", label: "billing-panel" },
      { href: "/blocks/dashboard-shell", label: "dashboard-shell" },
      { href: "/blocks/faq-accordion", label: "faq-accordion" },
      { href: "/blocks/feature-grid", label: "feature-grid" },
      { href: "/blocks/final-cta", label: "final-cta" },
      { href: "/blocks/hero-cta", label: "hero-cta" },
      { href: "/blocks/login-panel", label: "login-panel" },
      { href: "/blocks/logo-cloud", label: "logo-cloud" },
      { href: "/blocks/model-selector", label: "model-selector" },
      { href: "/blocks/notification-panel", label: "notification-panel" },
      { href: "/blocks/pricing-section", label: "pricing-section" },
      { href: "/blocks/settings-layout", label: "settings-layout" },
      { href: "/blocks/stats-strip", label: "stats-strip" },
      { href: "/blocks/team-members-table", label: "team-members-table" },
      { href: "/blocks/token-usage-chart", label: "token-usage-chart" }
    ]
  },
  {
    title: "Templates",
    links: [
      { href: "/templates/ai-console-lite", label: "ai-console-lite" },
      { href: "/templates/saas-starter", label: "saas-starter" },
      { href: "/templates/admin-dashboard", label: "admin-dashboard" }
    ]
  },
  {
    title: "Themes",
    links: [
      { href: "/theme/default", label: "default" },
      { href: "/theme/avocado", label: "avocado" }
    ]
  },
  {
    title: "Migration",
    links: [
      { href: "/migration-v0.1-to-v0.2", label: "v0.1 to v0.2" },
      { href: "/migration-v0.2-to-v0.3", label: "v0.2 to v0.3" },
      { href: "/migration-v0.4-to-v0.5", label: "v0.4 to v0.5 (Site Split)" }
    ]
  }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[18rem_1fr]">
          <aside className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r">
            <Link href="/" className="block">
              <p className="text-sm uppercase tracking-wide text-slate-500">FormaUI</p>
              <h1 className="text-2xl font-semibold">v0.6 Docs</h1>
            </Link>
            <div className="mt-4">
              <Link
                href="https://formaui.com"
                className="inline-flex rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-100"
              >
                Open Web Site
              </Link>
            </div>
            <nav className="mt-6 space-y-6">
              {navSections.map((section) => (
                <div key={section.title}>
                  <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{section.title}</p>
                  <div className="mt-2 space-y-1">
                    {section.links.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>
          <main className="p-6 lg:p-10">
            <article className="docs-prose max-w-4xl">{children}</article>
          </main>
        </div>
      </body>
    </html>
  );
}
