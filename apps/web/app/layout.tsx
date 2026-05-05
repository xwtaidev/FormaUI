import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { heroContent, mobileNavigationItems, primaryNavigationItems } from "./_sections/content";
import LocaleSwitcher from "./_sections/locale-switcher";
import ThemeToggle from "./_sections/theme-toggle";

export const metadata: Metadata = {
  metadataBase: new URL("https://formaui.com"),
  title: {
    default: "FormaUI - Source-owned UI for SaaS and AI products",
    template: "%s | FormaUI"
  },
  description:
    "FormaUI gives SaaS and AI teams source-owned React components, production blocks, templates, and registry workflows they can copy, adapt, and ship with confidence.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "zh-CN": "/zh-CN"
    }
  },
  openGraph: {
    title: "FormaUI - Source-owned UI for SaaS and AI products",
    description:
      "Source-owned React components, production blocks, templates, and registry workflows for SaaS and AI products.",
    url: "https://formaui.com",
    siteName: "FormaUI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FormaUI - Source-owned UI for SaaS and AI products",
    description:
      "Source-owned React components, production blocks, templates, and registry workflows for SaaS and AI products."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="site-chrome border-b">
            <div className="landing-shell flex items-center justify-between gap-4 py-4 text-sm">
              <Link href="/" className="landing-display text-xl font-black tracking-[-0.05em] text-[var(--landing-foreground)]">
                FormaUI
              </Link>
              <nav className="hidden items-center gap-5 md:flex">
                {primaryNavigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-semibold text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]"
                  >
                    {item.label}
                  </Link>
                ))}
                <LocaleSwitcher />
                <ThemeToggle />
                <Link
                  href={heroContent.primaryCta.href}
                  className="rounded-full bg-[var(--landing-mint)] px-4 py-2 text-sm font-bold text-black shadow-sm hover:brightness-110"
                >
                  {heroContent.primaryCta.label}
                </Link>
              </nav>
              <div className="flex items-center gap-3 md:hidden">
                <nav className="flex flex-wrap items-center gap-3">
                  {mobileNavigationItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-sm font-semibold text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <LocaleSwitcher />
                <ThemeToggle />
                <Link
                  href={heroContent.primaryCta.href}
                  className="rounded-full bg-[var(--landing-mint)] px-4 py-2 text-sm font-bold text-black shadow-sm"
                >
                  Start
                </Link>
              </div>
            </div>
          </header>
          {children}
          <footer className="site-chrome border-t py-5">
            <div className="landing-shell flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--landing-muted)]">
              <p>&copy; 2026 FormaUI.</p>
              <p>Source-owned UI for SaaS and AI products.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
