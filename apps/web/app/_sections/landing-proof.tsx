import React from "react";
import { scenarioTags } from "./content";

export default function LandingProof() {
  return (
    <section data-section="LandingProof" className="landing-shell pt-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Built for real product scenarios</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {scenarioTags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
