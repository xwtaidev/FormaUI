import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "FormaUI Docs",
  description: "FormaUI v0.2 documentation"
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
      { href: "/theme", label: "Theme Overview" },
      { href: "/migration-v0.1-to-v0.2", label: "Migration v0.1 to v0.2" }
    ]
  },
  {
    title: "CLI & Registry",
    links: [
      { href: "/cli", label: "CLI Overview" },
      { href: "/cli/commands", label: "CLI Commands" },
      { href: "/registry", label: "Registry v2" }
    ]
  },
  {
    title: "Components",
    links: [
      { href: "/components/app-sidebar", label: "app-sidebar" },
      { href: "/components/avatar", label: "avatar" },
      { href: "/components/badge", label: "badge" },
      { href: "/components/button", label: "button" },
      { href: "/components/card", label: "card" },
      { href: "/components/checkbox", label: "checkbox" },
      { href: "/components/data-table", label: "data-table" },
      { href: "/components/dialog", label: "dialog" },
      { href: "/components/dropdown-menu", label: "dropdown-menu" },
      { href: "/components/empty-state", label: "empty-state" },
      { href: "/components/form-field", label: "form-field" },
      { href: "/components/input", label: "input" },
      { href: "/components/lib-cn", label: "lib-cn" },
      { href: "/components/metric-card", label: "metric-card" },
      { href: "/components/page-header", label: "page-header" },
      { href: "/components/search-command", label: "search-command" },
      { href: "/components/select", label: "select" },
      { href: "/components/status-badge", label: "status-badge" },
      { href: "/components/switch", label: "switch" },
      { href: "/components/tabs", label: "tabs" },
      { href: "/components/textarea", label: "textarea" },
      { href: "/components/theme-switcher", label: "theme-switcher" },
      { href: "/components/tooltip", label: "tooltip" },
      { href: "/components/user-menu", label: "user-menu" }
    ]
  },
  {
    title: "Blocks",
    links: [
      { href: "/blocks/agent-run-timeline", label: "agent-run-timeline" },
      { href: "/blocks/api-key-manager", label: "api-key-manager" },
      { href: "/blocks/billing-panel", label: "billing-panel" },
      { href: "/blocks/dashboard-shell", label: "dashboard-shell" },
      { href: "/blocks/login-panel", label: "login-panel" },
      { href: "/blocks/model-selector", label: "model-selector" },
      { href: "/blocks/notification-panel", label: "notification-panel" },
      { href: "/blocks/pricing-section", label: "pricing-section" },
      { href: "/blocks/settings-layout", label: "settings-layout" },
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
              <h1 className="text-2xl font-semibold">v0.2 Docs</h1>
            </Link>
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
