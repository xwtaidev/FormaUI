import React from "react";
import Link from "next/link";

import { getLandingContent } from "./content";
import type { Locale } from "./i18n";

export default function LandingProof({ locale = "en" }: { locale?: Locale }) {
  const { proofLinks } = getLandingContent(locale);
  const isZh = locale === "zh-CN";

  return (
    <section data-section="LandingProof" className="landing-shell py-16 sm:py-20">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">VII.</span>
        <span className="landing-page-marker">007</span>
      </div>
      <div className="mb-10 max-w-2xl">
        <p className="landing-editorial-label">{isZh ? "生态" : "Ecosystem"} &middot; N&ordm; 06</p>
        <h2 className="landing-display mt-3 text-4xl font-black leading-none sm:text-5xl">
          {isZh ? <>开源、<em>文档优先</em>，并且易于扩展。</> : <>Open source, <em>docs-first</em>, ready to extend.</>}
        </h2>
      </div>

      <div className="grid gap-8 border-t border-[var(--landing-line)] pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {proofLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group"
          >
            <h3 className="text-lg font-black text-[var(--landing-foreground)] transition group-hover:text-[var(--landing-graphite)]">
              {link.label}
              <span className="ml-2 inline-block text-[var(--landing-line)] transition-transform group-hover:translate-x-1">→</span>
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--landing-muted)]">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
