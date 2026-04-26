import React from "react";
import { featureCards } from "./content";

export default function LandingFeatures() {
  return (
    <section data-section="LandingFeatures" className="landing-shell pt-8">
      <div className="space-y-4">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950">Why FormaUI?</h2>
        <p className="text-center text-slate-600">Everything you need to build production-ready products faster.</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {featureCards.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
