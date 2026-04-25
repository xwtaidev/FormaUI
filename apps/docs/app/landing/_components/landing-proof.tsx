import React from "react";
import Link from "next/link";

import type { Differentiator, Scenario, TrustItem } from "../content";

type LandingProofProps = {
  differentiators: Differentiator[];
  scenarios: Scenario[];
  trustItems: TrustItem[];
};

const foundationAssetRows: Array<{ label: string; href: string }> = [
  { label: "Components", href: "/components/accordion" },
  { label: "Blocks", href: "/blocks/dashboard-shell" },
  { label: "Templates", href: "/templates/ai-console-lite" },
  { label: "Packs", href: "/packs" },
  { label: "Themes", href: "/theme/default" }
];

export function LandingProof({ differentiators, scenarios, trustItems }: LandingProofProps) {
  return (
    <div className="space-y-10">
      <section id="core-differentiators" className="space-y-4">
        <div className="space-y-2">
          <h2 className="m-0 text-3xl font-semibold text-slate-950">Core Differentiators</h2>
          <p className="m-0 text-slate-600">
            v0.4 starts with a clear growth narrative that still keeps engineering ownership as the default.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {differentiators.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="m-0 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mb-0 mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="asset-proof" className="space-y-4">
        <div className="space-y-2">
          <h2 className="m-0 text-3xl font-semibold text-slate-950">Asset Proof</h2>
          <p className="m-0 text-slate-600">
            Static baseline aligned to current registry inventory (snapshot date: 2026-04-25).
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {foundationAssetRows.map((asset) => (
            <article key={asset.label} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="m-0 text-sm text-slate-600">{asset.label}</p>
              <p className="mb-0 mt-2 text-base font-medium text-slate-900">Included in v0.4 landing IA</p>
              <Link href={asset.href} className="mt-2 inline-block text-sm text-sky-700 underline underline-offset-2">
                View {asset.label.toLowerCase()}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="scenario-showcase" className="space-y-4">
        <div className="space-y-2">
          <h2 className="m-0 text-3xl font-semibold text-slate-950">Scenario Showcase</h2>
          <p className="m-0 text-slate-600">
            Start from scenario-level assets, then tune local source for your own product constraints.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <article key={scenario.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="m-0 text-xl font-semibold text-slate-900">{scenario.title}</h3>
              <div className="mt-3 space-y-3">
                <p className="m-0 text-sm leading-6 text-slate-600">{scenario.description}</p>
                <Link href={scenario.href} className="text-sm text-sky-700 underline underline-offset-2">
                  Open related block
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="trust-proof" className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-wrap items-center gap-2 text-slate-900">
          <h2 className="m-0 text-3xl font-semibold text-slate-950">Social Proof & Release Rhythm</h2>
          <span className="rounded-full border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700">
            Open Source
          </span>
        </div>
        <ul className="m-0 space-y-2 p-0">
          {trustItems.map((item) => (
            <li key={item.title} className="list-none">
              <p className="m-0 font-medium text-slate-900">{item.title}</p>
              <p className="m-0 text-sm text-slate-600">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
