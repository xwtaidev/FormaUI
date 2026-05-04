import React from "react";
import Link from "next/link";

import { buildFlowSteps, webLinks } from "./content";

export default function LandingBuildFlow() {
  return (
    <section data-section="LandingBuildFlow" className="landing-shell py-16 sm:py-20">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">IV.</span>
        <span className="landing-page-marker">004</span>
      </div>
      <div className="mb-10 max-w-2xl">
        <p className="landing-editorial-label">Developer workflow &middot; N&ordm; 03</p>
        <h2 className="landing-display mt-3 text-4xl font-black leading-none sm:text-5xl">
          From <em>registry</em> to running UI.
        </h2>
        <p className="mt-5 text-base leading-7 text-[var(--landing-muted)]">
          FormaUI gives you a CLI and registry to discover, install, and extend product surfaces directly in your
          repo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {buildFlowSteps.map((step, i) => (
            <div key={step.command} className="flex items-start gap-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--landing-graphite)] landing-mono text-xs font-black text-[var(--landing-graphite)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 border-b border-[var(--landing-line)] pb-6">
                <p className="text-base font-bold text-[var(--landing-foreground)]">{step.title}</p>
                <p className="mt-1 text-sm text-[var(--landing-muted)]">{step.note}</p>
              </div>
            </div>
          ))}
        </div>

        <figure>
          <div className="overflow-hidden rounded-2xl bg-[var(--landing-graphite)] p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full on-g-bg-20" />
              <span className="h-3 w-3 rounded-full on-g-bg-15" />
              <span className="h-3 w-3 rounded-full on-g-bg-10" />
              <span className="ml-2 landing-mono text-xs on-g-30">terminal</span>
            </div>
            <pre className="overflow-x-auto text-xs leading-7 on-g-80">
              <code className="landing-mono">
                <span className="text-[var(--landing-mint)]">$</span> npx formaui init{"\n"}
                <span className="on-g-30"># Prepare tokens and registry configuration{"\n\n"}</span>
                <span className="text-[var(--landing-mint)]">$</span> npx formaui search dashboard{"\n"}
                <span className="on-g-30"># Find product-ready components{"\n\n"}</span>
                <span className="text-[var(--landing-mint)]">$</span> npx formaui pack add dashboard-foundation{"\n"}
                <span className="on-g-30"># Copy a complete surface into your repo{"\n\n"}</span>
                <span className="text-[var(--landing-mint)]">$</span> npx formaui add date-range-picker{"\n"}
                <span className="on-g-30"># Extend with focused primitives{"\n"}</span>
              </code>
            </pre>
          </div>
          <figcaption className="landing-figure-caption">FIG. 02 / Registry terminal workflow</figcaption>
        </figure>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href={webLinks.quickStart}
          className="rounded-full bg-[var(--landing-mint)] px-5 py-2.5 text-sm font-bold text-black shadow-sm hover:brightness-110"
        >
          View quick start
        </Link>
        <Link
          href={webLinks.registry}
          className="text-sm font-bold text-[var(--landing-muted)] underline underline-offset-4 decoration-[var(--landing-line)] hover:text-[var(--landing-foreground)]"
        >
          Read registry docs
        </Link>
      </div>
    </section>
  );
}
