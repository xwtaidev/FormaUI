import React from "react";
import Link from "next/link";

import { getLandingContent } from "./content";
import { editorial } from "./editorial-utils";
import type { Locale } from "./i18n";

export default function LandingFinalCta({ locale = "en" }: { locale?: Locale }) {
  const { finalCta } = getLandingContent(locale);

  return (
    <section data-section="LandingFinalCta" className="landing-shell py-16 sm:py-20">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">VIII.</span>
        <span className="landing-page-marker">008</span>
      </div>
      <div className="rounded-3xl bg-[var(--landing-graphite)] px-6 py-14 text-center text-[var(--landing-graphite-text)] sm:px-12 sm:py-20">
        <h2 className="landing-display text-4xl font-black leading-none sm:text-5xl lg:text-6xl">
          {editorial(finalCta.titleHtml)}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 on-g-60 sm:text-lg">
          {finalCta.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={finalCta.primary.href}
            className="rounded-full bg-[var(--landing-mint)] px-6 py-3 text-sm font-bold text-black shadow-sm hover:brightness-110"
          >
            {finalCta.primary.label}
          </Link>
          <Link
            href={finalCta.secondary.href}
            className="rounded-full border on-g-border-20 px-6 py-3 text-sm font-bold text-[var(--landing-graphite-text)] hover:on-g-border-40"
          >
            {finalCta.secondary.label}
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm on-g-40">
          {finalCta.tertiary.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:on-g-80"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
