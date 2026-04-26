import React from "react";
import Link from "next/link";

import { webLinks } from "./content";

export default function LandingFooter() {
  return (
    <section data-section="LandingFooter" className="landing-shell py-8">
      <footer className="rounded-2xl bg-slate-950 px-6 py-8 text-slate-200">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">FormaUI</p>
            <p className="mt-2 text-sm text-slate-400">Open-source UI components built with React, Tailwind CSS, and shadcn/ui.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Product</p>
            <div className="mt-2 space-y-1 text-sm">
              <Link href="/product">Product</Link>
              <Link href="/showcase">Showcase</Link>
              <Link href="/changelog">Changelog</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Resources</p>
            <div className="mt-2 space-y-1 text-sm">
              <Link href={webLinks.docs}>Docs</Link>
              <Link href={webLinks.github}>GitHub</Link>
              <Link href={webLinks.releaseNotes}>Release Notes</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Company</p>
            <div className="mt-2 space-y-1 text-sm">
              <p>License (MIT)</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
