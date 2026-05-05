import React from "react";
import Link from "next/link";

import { getLandingContent } from "./content";
import { editorial } from "./editorial-utils";
import type { Locale } from "./i18n";

export default function LandingHero({ locale = "en" }: { locale?: Locale }) {
  const { heroContent } = getLandingContent(locale);

  return (
    <section data-section="LandingHero" className="landing-shell pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">I.</span>
        <span className="landing-page-marker">001</span>
      </div>
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="landing-reveal max-w-3xl space-y-7">
          <p className="landing-kicker">{heroContent.eyebrow}</p>
          <h1 className="landing-display max-w-4xl text-6xl font-black leading-[0.9] text-[var(--landing-foreground)] sm:text-7xl lg:text-8xl">
            {editorial(heroContent.titleHtml)}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--landing-muted)] sm:text-xl">
            {heroContent.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={heroContent.primaryCta.href}
              className="rounded-full bg-[var(--landing-mint)] px-5 py-3 text-sm font-bold text-black shadow-sm hover:brightness-110"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="rounded-full border border-[var(--landing-line)] px-5 py-3 text-sm font-bold text-[var(--landing-foreground)] hover:bg-[var(--landing-surface-strong)]"
            >
              {heroContent.secondaryCta.label}
            </Link>
            <Link
              href={heroContent.supportingCta.href}
              className="rounded-full px-5 py-3 text-sm font-bold text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]"
            >
              {heroContent.supportingCta.label}
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-[var(--landing-muted)]">
            {heroContent.trustMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>
        <figure>
          <div aria-label="FormaUI product surface collage" className="relative min-h-[560px]">
            <div className="landing-float absolute top-0 right-0 w-64 rounded-2xl bg-[var(--landing-graphite)] p-5 text-[var(--landing-graphite-text)] shadow-lg sm:w-72">
              <p className="landing-mono text-[10px] uppercase tracking-[0.2em] on-g-50">Dashboard foundation</p>
              <div className="mt-3 space-y-2">
                <div className="h-3 w-3/4 rounded bg-[var(--landing-mint)]" />
                <div className="h-3 w-1/2 rounded on-g-bg-20" />
                <div className="h-3 w-2/3 rounded on-g-bg-15" />
              </div>
              <div className="mt-4 flex gap-2">
                <div className="h-16 w-16 rounded-lg on-g-bg-10" />
                <div className="h-16 w-16 rounded-lg on-g-bg-8" />
                <div className="h-16 w-16 rounded-lg on-g-bg-6" />
              </div>
            </div>
            <div className="landing-float absolute top-32 left-0 w-56 rounded-2xl bg-[var(--landing-surface)] p-4 shadow-lg sm:w-60" style={{ animationDelay: "1.5s" }}>
              <p className="landing-mono text-[10px] uppercase tracking-[0.2em] text-[var(--landing-muted)]">AI command surface</p>
              <div className="mt-3 space-y-1.5 rounded-xl bg-[var(--landing-graphite)] p-3">
                <div className="h-2.5 w-full rounded on-g-bg-25" />
                <div className="h-2.5 w-4/5 rounded on-g-bg-15" />
                <div className="h-2.5 w-3/5 rounded on-g-bg-10" />
              </div>
            </div>
            <div className="landing-float absolute bottom-16 right-8 w-52 rounded-2xl border border-[var(--landing-line)] bg-[var(--landing-surface)] p-4 shadow-lg sm:w-56" style={{ animationDelay: "3s" }}>
              <p className="landing-mono text-[10px] uppercase tracking-[0.2em] text-[var(--landing-amber)]">Admin workflow</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[var(--landing-amber)]/30" />
                  <div className="flex-1">
                    <div className="h-2 w-3/4 rounded bg-[var(--landing-line)]" />
                    <div className="mt-1 h-2 w-1/2 rounded bg-[var(--landing-line)]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[var(--landing-line)]" />
                  <div className="flex-1">
                    <div className="h-2 w-2/3 rounded bg-[var(--landing-line)]" />
                    <div className="mt-1 h-2 w-1/3 rounded bg-[var(--landing-line)]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-4 w-60 rounded-2xl bg-[var(--landing-graphite)] p-4 text-[var(--landing-graphite-text)] shadow-lg sm:w-64">
              <p className="landing-mono text-[10px] uppercase tracking-[0.2em] text-[var(--landing-mint)]">Registry install</p>
              <pre className="mt-3 text-xs leading-5 on-g-70">
                <span className="text-[var(--landing-mint)]">$</span> npx formaui init
                {"\n"}
                <span className="text-[var(--landing-mint)]">$</span> npx formaui pack add{"\n"}
                {"    "}dashboard-foundation
              </pre>
            </div>
          </div>
          <figcaption className="landing-figure-caption">FIG. 01 / Product surface collage</figcaption>
        </figure>
      </div>
    </section>
  );
}
