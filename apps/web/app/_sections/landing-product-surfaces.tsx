import React from "react";

import { productSurfaces } from "./content";
import { editorial } from "./editorial-utils";

const accentMap: Record<string, string> = {
  mint: "border-l-[var(--landing-mint)]",
  graphite: "border-l-[var(--landing-graphite)]",
  amber: "border-l-[var(--landing-amber)]",
  coral: "border-l-[var(--landing-coral)]"
};

export default function LandingProductSurfaces() {
  return (
    <section id="surfaces" data-section="LandingProductSurfaces" className="landing-shell py-16 sm:py-20">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">II.</span>
        <span className="landing-page-marker">002</span>
      </div>
      <div className="mb-10 max-w-2xl">
        <p className="landing-editorial-label">Product surfaces &middot; N&ordm; 01</p>
        <h2 className="landing-display mt-3 text-4xl font-black leading-none sm:text-5xl">
          Not just components. Complete product <em>surfaces</em>.
        </h2>
        <p className="mt-5 text-base leading-7 text-[var(--landing-muted)]">
          FormaUI packages primitives, blocks, templates, and metadata around real product jobs: dashboards, AI
          tools, admin workflows, and launch pages.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {productSurfaces.map((surface, index) => (
          <article
            key={surface.name}
            className={`relative overflow-hidden rounded-2xl bg-[var(--landing-graphite)] p-6 text-[var(--landing-graphite-text)] ${accentMap[surface.accent] ?? ""} border-l-4`}
          >
            <span className="landing-section-number absolute -right-2 -top-3">{String(index + 1).padStart(2, "0")}</span>
            <p className="landing-mono text-xs uppercase tracking-[0.2em] on-g-40">{surface.accent} surface</p>
            <h3 className="mt-3 text-2xl font-black">{surface.name}</h3>
            <p className="mt-2 text-sm leading-6 on-g-60">{surface.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {surface.assets.map((asset) => (
                <span
                  key={asset}
                  className="rounded-full on-g-bg-10 px-3 py-1 text-xs font-medium on-g-70"
                >
                  {asset}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
