"use client";

import React from "react";
import Link from "next/link";
import { FaqAccordion, FinalCta } from "@formaui/blocks";

import type { FooterLink } from "../content";

type LandingCtaProps = {
  faqAccordionContent: {
    title: string;
    description: string;
    items: Array<{ id: string; question: string; answer: string }>;
  };
  finalCtaContent: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  footerLinks: FooterLink[];
};

export function LandingCta({ faqAccordionContent, finalCtaContent, footerLinks }: LandingCtaProps) {
  return (
    <div className="space-y-8">
      <section id="faq" className="space-y-4">
        <FaqAccordion {...faqAccordionContent} />
      </section>

      <section id="quick-start-path" className="space-y-4">
        <FinalCta {...finalCtaContent} />
      </section>

      <section id="landing-footer" className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-slate-100">
        <div className="space-y-4">
          <h2 className="m-0 text-3xl font-semibold">Build your product UI with source ownership</h2>
          <p className="m-0 max-w-3xl text-slate-100">
            Use official marketing blocks as baseline, then evolve copy and layout directly in your repo.
          </p>
          <ul className="m-0 grid gap-2 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {footerLinks.map((link) => {
              const isExternal = link.href.startsWith("http");

              return (
                <li key={link.label} className="list-none">
                  <Link
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="text-sm text-slate-100 underline underline-offset-2 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
