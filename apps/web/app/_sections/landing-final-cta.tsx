import React from "react";
import Link from "next/link";

import { webLinks } from "./content";

export default function LandingFinalCta() {
  return (
    <section data-section="LandingFinalCta" className="landing-shell pt-8">
      <div className="rounded-2xl bg-gradient-to-r from-slate-100 via-white to-emerald-50 p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Ready to ship better, faster with FormaUI?</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Join teams building modern products with source-owned UI components, blocks, and templates.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={webLinks.docs} className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white">
            Get Started
          </Link>
          <Link href={webLinks.github} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
            Star on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
