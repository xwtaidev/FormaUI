import React from "react";

import { getLandingContent } from "./content";
import type { Locale } from "./i18n";

export default function LandingScenarioGallery({ locale = "en" }: { locale?: Locale }) {
  const { scenarioGallery } = getLandingContent(locale);
  const isZh = locale === "zh-CN";

  return (
    <section data-section="LandingScenarioGallery" className="landing-shell py-16 sm:py-20">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">V.</span>
        <span className="landing-page-marker">005</span>
      </div>
      <div className="mb-10 max-w-2xl">
        <p className="landing-editorial-label">{isZh ? "使用场景" : "Use cases"} &middot; N&ordm; 04</p>
        <h2 className="landing-display mt-3 text-4xl font-black leading-none sm:text-5xl">
          {isZh ? <>为 SaaS 和 AI <em>团队</em>而构建。</> : <>Built for SaaS and AI <em>teams</em>.</>}
        </h2>
      </div>

      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--landing-line)]">
        {scenarioGallery.map((scenario) => (
          <article key={scenario.title} className="border-l-4 border-l-[var(--landing-mint)] px-6 py-6 first:sm:rounded-tl-2xl last:sm:rounded-br-2xl">
            <h3 className="text-lg font-black text-[var(--landing-foreground)]">{scenario.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--landing-muted)]">{scenario.assets}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--landing-graphite)]">{scenario.team}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
