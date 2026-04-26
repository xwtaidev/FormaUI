import React from "react";
import { qualityChecks, qualityGateScores } from "./content";

export default function LandingQualityGates() {
  return (
    <section data-section="LandingQualityGates" className="landing-shell pt-8">
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950">Production-ready quality gates</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {qualityGateScores.map((item) => (
            <article key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-sm uppercase tracking-wide text-slate-500">{item.label}</p>
              <p className="mt-1 text-4xl font-bold text-emerald-600">{item.score}</p>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {qualityChecks.map((item) => (
            <span key={item} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase text-slate-600">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
