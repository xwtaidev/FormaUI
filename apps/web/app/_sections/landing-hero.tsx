import React from "react";
import Link from "next/link";

import { heroContent } from "./content";

export default function LandingHero() {
  return (
    <section data-section="LandingHero" className="landing-shell pt-8">
      <div className="grid gap-8 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-8 shadow-sm ring-1 ring-slate-200 lg:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {heroContent.badge}
          </span>
          <h1 className="text-balance text-5xl font-bold tracking-tight text-slate-950">{heroContent.title}</h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">{heroContent.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={heroContent.primaryCta.href}
              className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            {heroContent.trustMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Overview</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">128.4K</p>
            <p className="text-sm text-emerald-600">Total users</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">MRR</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">$45.6K</p>
            <p className="text-sm text-emerald-600">+13% MoM</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-slate-300">Terminal</p>
            <pre className="mt-3 overflow-x-auto text-xs text-emerald-300">{`import { Button } from "formaui"\n\nexport default function Dashboard() {\n  return <Button>Ship faster</Button>;\n}`}</pre>
          </article>
        </div>
      </div>
    </section>
  );
}
