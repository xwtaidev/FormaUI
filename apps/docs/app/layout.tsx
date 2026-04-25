import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "FormaUI Docs",
  description: "FormaUI v0.1 documentation"
};

const links = [
  { href: "/introduction", label: "Introduction" },
  { href: "/installation", label: "Installation" },
  { href: "/quick-start", label: "Quick Start" },
  { href: "/design-system", label: "Design System" },
  { href: "/design-tokens", label: "Design Tokens" },
  { href: "/theme", label: "Theme" },
  { href: "/components/button", label: "Button" },
  { href: "/components/input", label: "Input" },
  { href: "/components/card", label: "Card" },
  { href: "/components/dialog", label: "Dialog" },
  { href: "/blocks/dashboard-shell", label: "DashboardShell" },
  { href: "/blocks/token-usage-chart", label: "TokenUsageChart" },
  { href: "/blocks/agent-run-timeline", label: "AgentRunTimeline" },
  { href: "/templates/ai-console-lite", label: "ai-console-lite" },
  { href: "/cli", label: "CLI" },
  { href: "/registry", label: "Registry" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[18rem_1fr]">
          <aside className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r">
            <Link href="/" className="block">
              <p className="text-sm uppercase tracking-wide text-slate-500">FormaUI</p>
              <h1 className="text-2xl font-semibold">v0.1 Docs</h1>
            </Link>
            <nav className="mt-6 space-y-2">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  {item.label}
                </Link>
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
