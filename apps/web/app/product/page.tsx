import React from "react";
import Link from "next/link";

import { webLinks } from "../_sections/content";

export default function ProductPage() {
  return (
    <main data-route="/product" className="landing-shell py-12">
      <section className="landing-panel rounded-[2rem] p-8">
        <h1>Product</h1>
        <p className="mt-3 text-[var(--landing-muted)]">
          Product overview for components, blocks, templates, and theme system capabilities of FormaUI.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-[var(--landing-graphite)]">
          <Link href={webLinks.docs}>Back to Docs</Link>
          <Link href={webLinks.github}>GitHub</Link>
          <Link href={webLinks.releaseNotes}>Release Notes</Link>
        </div>
      </section>
    </main>
  );
}
