import React from "react";
import Link from "next/link";

import { sourceOwnershipComparison, webLinks } from "./content";

const flowSteps = ["registry.json", "npx formaui add", "components/date-range-picker.tsx", "your product system"];

export default function LandingSourceOwnership() {
  return (
    <section data-section="LandingSourceOwnership" className="landing-shell py-16 sm:py-20">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">III.</span>
        <span className="landing-page-marker">003</span>
      </div>
      <div className="max-w-2xl">
        <p className="landing-editorial-label">Source ownership &middot; N&ordm; 02</p>
        <h2 className="landing-display mt-3 text-4xl font-black leading-none sm:text-5xl">
          Copy, <em>adapt</em>, keep control.
        </h2>
        <p className="mt-5 text-base leading-7 text-[var(--landing-muted)]">
          Unlike black-box packages or one-time templates, FormaUI installs source code your team owns. Every
          component, block, and template becomes part of your repo.
        </p>
      </div>

      <div className="mt-10 divide-y divide-[var(--landing-line)] rounded-2xl border border-[var(--landing-line)] bg-[var(--landing-surface)]">
        {sourceOwnershipComparison.map((item) => (
          <div key={item.label} className="grid gap-3 px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
            <div>
              <h3 className="text-lg font-black text-[var(--landing-foreground)]">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--landing-muted)]">{item.details}</p>
            </div>
            <span className="whitespace-nowrap rounded-full border border-[var(--landing-line)] px-3 py-1 text-xs font-bold text-[var(--landing-muted)]">
              {item.stance}
            </span>
          </div>
        ))}
      </div>

      <blockquote className="mt-12 max-w-2xl border-l-2 border-[var(--landing-graphite)] pl-6 text-lg leading-8 italic text-[var(--landing-muted)]">
        We believe UI should be owned, not rented. FormaUI installs source code your team controls — every component, block, and template becomes part of your product&apos;s codebase. No abstraction ceiling, no vendor lock-in, no upgrade cliff.
      </blockquote>

      <div className="mt-12">
        <p className="landing-kicker mb-5">Registry to source</p>
        <div className="flex flex-wrap items-center gap-2">
          {flowSteps.map((step, i) => (
            <React.Fragment key={step}>
              <span className="landing-mono rounded-lg bg-[var(--landing-graphite)] px-4 py-2.5 text-xs font-bold text-[var(--landing-graphite-text)]">
                {step}
              </span>
              {i < flowSteps.length - 1 && (
                <span className="text-lg font-bold text-[var(--landing-line)]" aria-hidden="true">
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-5">
          <Link
            href={webLinks.registry}
            className="text-sm font-bold text-[var(--landing-graphite)] underline decoration-[var(--landing-mint)] underline-offset-4 hover:text-[var(--landing-graphite-hover)]"
          >
            Read the registry docs →
          </Link>
        </div>
      </div>
    </section>
  );
}
