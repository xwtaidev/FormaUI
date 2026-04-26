import React from "react";
import Link from "next/link";

const docsHref = "https://docs.formaui.com";

export default function WebHomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12">
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">FormaUI</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">FormaUI Web</h1>
          <p className="max-w-2xl text-base text-slate-600">
            v0.5.1 workspace split foundation for the dedicated marketing and brand website.
          </p>
        </div>
        <nav>
          <Link
            href={docsHref}
            className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Read Docs
          </Link>
        </nav>
      </header>

      <section id="workspace-split-foundation" className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-950">Landing Placeholder</h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          The section-orchestrated landing page will be delivered in v0.5.2. This placeholder confirms the app shell,
          route wiring, and docs entry are working in v0.5.1.
        </p>
      </section>
    </main>
  );
}
