import React from "react";

import { qualitySystem } from "./content";

export default function LandingQualitySystem() {
  return (
    <section data-section="LandingQualitySystem" className="landing-shell py-16 sm:py-20">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">VI.</span>
        <span className="landing-page-marker">006</span>
      </div>
      <div className="mb-10 max-w-2xl">
        <p className="landing-editorial-label">Quality system &middot; N&ordm; 05</p>
        <h2 className="landing-display mt-3 text-4xl font-black leading-none sm:text-5xl">
          Polish with <em>guardrails</em>.
        </h2>
        <p className="mt-5 text-base leading-7 text-[var(--landing-muted)]">
          Every surface ships with accessibility checks, responsive layouts, TypeScript types, and registry metadata.
        </p>
      </div>

      <div className="grid gap-px rounded-2xl bg-[var(--landing-line)] sm:grid-cols-2 lg:grid-cols-3">
        {qualitySystem.map((item) => (
          <article key={item.label} className="bg-[var(--landing-surface)] px-6 py-6">
            <div className="flex items-baseline gap-3">
              <span className="landing-display text-3xl font-black text-[var(--landing-graphite)]">{item.value}</span>
              <span className="text-sm font-bold text-[var(--landing-muted)]">{item.label}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--landing-muted)]">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
