import React from "react";
import { reusableBlocks } from "./content";

export default function LandingBlocksFlow() {
  return (
    <section data-section="LandingBlocksFlow" className="landing-shell pt-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950">Reusable blocks, built not from scratch</h2>
        <p className="mt-2 text-center text-slate-600">Get a head start with production-ready blocks.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-9">
          {reusableBlocks.map((block) => (
            <span
              key={block}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-medium text-slate-700"
            >
              {block}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
