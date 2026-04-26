import React from "react";
import { scenarioShowcase } from "./content";

export default function LandingScenarios() {
  return (
    <section data-section="LandingScenarios" className="landing-shell pt-8">
      <div className="space-y-5">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950">Gorgeous interfaces for every scenario</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {scenarioShowcase.map((item) => (
            <article key={item.name} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
