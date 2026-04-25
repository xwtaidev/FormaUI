import React from "react";

import type { SectionAnchor } from "../content";

type LandingHeroProps = {
  anchors: SectionAnchor[];
};

export function LandingHero({ anchors }: LandingHeroProps) {
  return (
    <section id="hero" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
      <div className="space-y-6">
        <p className="m-0 w-fit rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600">
          FormaUI v0.4.1 Foundation
        </p>
        <div className="space-y-4">
          <h1 className="m-0 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Source-Owned Design System for Product Teams That Ship Fast
          </h1>
          <p className="m-0 max-w-3xl text-lg leading-8 text-slate-600">
            FormaUI turns components, blocks, templates, and packs into an installable source workflow so your team can
            move from idea to production UI without losing control.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/quick-start"
            className="inline-flex w-fit items-center rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            Start Quick
          </a>
          <a
            href="/introduction"
            className="inline-flex w-fit items-center rounded-md border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900"
          >
            Read Docs
          </a>
        </div>

        <nav aria-label="Landing sections">
          <ul className="m-0 flex flex-wrap gap-2 p-0">
            {anchors.map((anchor) => (
              <li key={anchor.id} className="list-none">
                <a
                  href={`#${anchor.id}`}
                  className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                >
                  {anchor.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
