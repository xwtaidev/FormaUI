import React from "react";
import { HeroCta } from "@formaui/blocks";

import type { SectionAnchor } from "../content";

type LandingHeroProps = {
  anchors: SectionAnchor[];
  heroContent: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
};

export function LandingHero({ anchors, heroContent }: LandingHeroProps) {
  return (
    <section id="hero" className="space-y-4">
      <HeroCta {...heroContent} />
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
    </section>
  );
}
