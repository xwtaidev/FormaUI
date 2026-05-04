import React from "react";
import Link from "next/link";

import { webLinks } from "./content";

export default function LandingFooter() {
  return (
    <section data-section="LandingFooter" className="landing-shell pb-8 pt-16">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">FIN.</span>
        <span className="landing-page-marker">009</span>
      </div>
      <footer className="border-t border-[var(--landing-line)] pt-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="landing-display text-lg font-black text-[var(--landing-foreground)]">FormaUI</p>
            <p className="mt-2 text-sm leading-6 text-[var(--landing-muted)]">Source-owned UI for SaaS and AI products.</p>
          </div>
          <div>
            <p className="landing-kicker">Product</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href="/product" className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Product</Link>
              <Link href="/showcase" className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Showcase</Link>
              <Link href="/scenarios" className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Scenarios</Link>
            </div>
          </div>
          <div>
            <p className="landing-kicker">Build</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href={webLinks.components} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Components</Link>
              <Link href={webLinks.blocks} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Blocks</Link>
              <Link href={webLinks.templates} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Templates</Link>
              <Link href={webLinks.registry} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Registry</Link>
            </div>
          </div>
          <div>
            <p className="landing-kicker">Resources</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href={webLinks.docs} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Docs</Link>
              <Link href={webLinks.github} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">GitHub</Link>
              <Link href={webLinks.releaseNotes} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Release notes</Link>
              <Link href={webLinks.examples} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Examples</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 text-xs text-[var(--landing-muted)]">
        </div>
      </footer>
    </section>
  );
}
