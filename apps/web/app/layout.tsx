import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import { webLinks } from "./_sections/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://formaui.com"),
  title: {
    default: "FormaUI Web",
    template: "%s | FormaUI"
  },
  description: "FormaUI official website for brand, product, and growth content.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "FormaUI Web",
    description: "FormaUI official website for brand, product, and growth content.",
    url: "https://formaui.com",
    siteName: "FormaUI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FormaUI Web",
    description: "FormaUI official website for brand, product, and growth content."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-chrome border-b border-slate-200">
          <div className="landing-shell flex items-center justify-between gap-3 py-3 text-sm">
            <p className="font-medium text-slate-700">FormaUI Web</p>
            <nav className="flex items-center gap-4 text-slate-600">
              <Link href="/">Home</Link>
              <Link href={webLinks.docs}>Docs</Link>
              <Link href={webLinks.github}>GitHub</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-chrome border-t border-slate-200 py-5">
          <div className="landing-shell flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <p>© 2026 FormaUI.</p>
            <p>Brand website and docs are now split in v0.5.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
