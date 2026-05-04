import React from "react";
import Link from "next/link";

import { heroContent, mobileNavigationItems, primaryNavigationItems } from "./content";

export default function LandingHeader() {
  return (
    <section data-section="LandingHeader" className="landing-shell pt-2">
      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
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
          <Link
            href={heroContent.primaryCta.href}
            className="rounded-full bg-[var(--landing-graphite)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-black"
          >
            {heroContent.primaryCta.label}
          </Link>
        </nav>
        <nav className="flex flex-wrap items-center gap-3 md:hidden">
          {mobileNavigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={heroContent.primaryCta.href}
            className="rounded-full bg-[var(--landing-graphite)] px-4 py-2 text-sm font-bold text-white shadow-sm"
          >
            Start
          </Link>
        </nav>
      </div>
    </section>
  );
}
