import React from "react";
import Link from "next/link";

import { webLinks } from "../_sections/content";

export default function ScenariosPage() {
  return (
    <main data-route="/scenarios" className="landing-shell py-12">
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1>Scenarios</h1>
        <p className="mt-3 text-slate-600">
          Scenario-focused storytelling for SaaS dashboards, AI tools, admin systems, and internal operations.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-emerald-700">
          <Link href={webLinks.docs}>Back to Docs</Link>
          <Link href={webLinks.github}>GitHub</Link>
          <Link href={webLinks.releaseNotes}>Release Notes</Link>
        </div>
      </section>
    </main>
  );
}
