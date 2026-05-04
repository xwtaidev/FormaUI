import React from "react";
import Link from "next/link";

import { webLinks } from "../_sections/content";

export default function ChangelogPage() {
  return (
    <main data-route="/changelog" className="landing-shell py-12">
      <section className="landing-panel rounded-[2rem] p-8">
        <h1>Changelog</h1>
        <p className="mt-3 text-[var(--landing-muted)]">
          Release highlights and change communication for distribution, with canonical technical notes in docs/releases.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={webLinks.docs}
            className="rounded-full bg-[var(--landing-mint)] px-4 py-2 text-sm font-bold text-[var(--landing-foreground)] shadow-sm"
          >
            Back to Docs
          </Link>
          <Link
            href={webLinks.github}
            className="rounded-full border border-[var(--landing-line)] px-4 py-2 text-sm font-bold text-[var(--landing-foreground)]"
          >
            GitHub
          </Link>
          <Link
            href={webLinks.releaseNotes}
            className="text-sm font-semibold text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]"
          >
            Release Notes
          </Link>
          <Link
            href={webLinks.releaseV9}
            className="text-sm font-semibold text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]"
          >
            Read v0.9 release notes
          </Link>
        </div>
      </section>
    </main>
  );
}
