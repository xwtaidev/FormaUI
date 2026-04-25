import React from "react";
import Link from "next/link";

import type { FaqItem, FooterLink, QuickStartStep } from "../content";

type LandingCtaProps = {
  quickStartSteps: QuickStartStep[];
  faqItems: FaqItem[];
  footerLinks: FooterLink[];
};

export function LandingCta({ quickStartSteps, faqItems, footerLinks }: LandingCtaProps) {
  return (
    <div className="space-y-10">
      <section id="quick-start-path" className="space-y-4">
        <h2 className="m-0 text-3xl font-semibold text-slate-950">Install & Quick Start Path</h2>
        <article className="space-y-6 rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="m-0 text-xl font-semibold text-slate-900">From zero to productive in three CLI steps</h3>
          <ol className="m-0 space-y-3 pl-5">
            {quickStartSteps.map((step) => (
              <li key={step.title} className="text-slate-700">
                <p className="m-0 font-medium text-slate-900">{step.title}</p>
                <code>{step.command}</code>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/quick-start" className="inline-flex w-fit rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
              Open Quick Start
            </a>
            <a
              href="/installation"
              className="inline-flex w-fit rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-900"
            >
              Installation Guide
            </a>
          </div>
        </article>
      </section>

      <section id="faq" className="space-y-4">
        <h2 className="m-0 text-3xl font-semibold text-slate-950">FAQ</h2>
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white px-6 py-2">
          {faqItems.map((item) => (
            <details key={item.id} className="border-b border-slate-200 py-3 last:border-b-0">
              <summary className="cursor-pointer text-sm font-medium text-slate-900">{item.question}</summary>
              <p className="mb-0 mt-2 text-sm text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="landing-footer" className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-slate-100">
        <div className="space-y-4">
          <h2 className="m-0 text-3xl font-semibold">Build your product UI with source ownership</h2>
          <p className="m-0 max-w-3xl text-slate-300">
            Use the landing as your team baseline, then evolve blocks and components directly in your repo.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/introduction" className="inline-flex w-fit rounded-md bg-white px-4 py-2 text-sm text-slate-950">
              Open Docs
            </a>
            <a href="/quick-start" className="inline-flex w-fit rounded-md border border-slate-500 px-4 py-2 text-sm">
              Start Quick
            </a>
          </div>
          <ul className="m-0 grid gap-2 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {footerLinks.map((link) => {
              const isExternal = link.href.startsWith("http");

              return (
                <li key={link.label} className="list-none">
                  <Link
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="text-sm text-slate-200 underline underline-offset-2 hover:text-white"
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
