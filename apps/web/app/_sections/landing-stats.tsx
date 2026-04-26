import React from "react";
import { stats } from "./content";

export default function LandingStats() {
  return (
    <section data-section="LandingStats" className="landing-shell pt-8">
      <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-5">
        {stats.map((item) => (
          <article key={item.label} className="rounded-xl border border-slate-100 p-4 text-center">
            <p className="text-3xl font-semibold text-emerald-600">{item.value}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
