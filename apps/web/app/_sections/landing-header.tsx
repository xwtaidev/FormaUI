import React from "react";
import Link from "next/link";

import { globalNavItems, webLinks } from "./content";

export default function LandingHeader() {
  return (
    <section data-section="LandingHeader" className="landing-shell pt-6">
      <div className="landing-panel flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
          FormaUI
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
          {globalNavItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-slate-900">
              {item.label}
            </Link>
          ))}
          <Link href={webLinks.docs} className="rounded-full bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600">
            Get Started
          </Link>
        </nav>
      </div>
    </section>
  );
}
