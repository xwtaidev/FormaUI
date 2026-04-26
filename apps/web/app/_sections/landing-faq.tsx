import React from "react";
import { faqItems } from "./content";

export default function LandingFaq() {
  return (
    <section data-section="LandingFaq" className="landing-shell pt-8">
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        {faqItems.map((question) => (
          <details key={question} className="border-b border-slate-100 px-4 py-3 last:border-b-0">
            <summary className="cursor-pointer list-none text-sm font-medium text-slate-800">{question}</summary>
          </details>
        ))}
      </div>
    </section>
  );
}
