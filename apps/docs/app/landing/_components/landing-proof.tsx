import React from "react";
import Link from "next/link";

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@formaui/components";

import type { AssetProof, Differentiator, Scenario, TrustItem } from "../content";

type LandingProofProps = {
  differentiators: Differentiator[];
  assetProofItems: AssetProof[];
  scenarios: Scenario[];
  trustItems: TrustItem[];
};

export function LandingProof({ differentiators, assetProofItems, scenarios, trustItems }: LandingProofProps) {
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
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="m-0 text-sm leading-6 text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
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
          {assetProofItems.map((asset) => (
            <Card key={asset.label}>
              <CardHeader className="pb-2">
                <CardDescription>{asset.label}</CardDescription>
                <CardTitle className="text-3xl">{asset.count}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={asset.href} className="text-sm text-sky-700 underline underline-offset-2">
                  View {asset.label.toLowerCase()}
                </Link>
              </CardContent>
            </Card>
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
            <Card key={scenario.title}>
              <CardHeader>
                <CardTitle>{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="m-0 text-sm leading-6 text-slate-600">{scenario.description}</p>
                <Link href={scenario.href} className="text-sm text-sky-700 underline underline-offset-2">
                  Open related block
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="trust-proof" className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="m-0 text-3xl font-semibold text-slate-950">Social Proof & Release Rhythm</h2>
          <Badge variant="secondary">Open Source</Badge>
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
