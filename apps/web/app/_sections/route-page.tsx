import React from "react";
import Link from "next/link";

import { getRoutePageContent, type Locale, type RoutePageKey } from "./i18n";
import { webLinks } from "./content";

export default function RoutePage({ locale = "en", route }: { locale?: Locale; route: RoutePageKey }) {
  const content = getRoutePageContent(locale, route);
  const localizedRoute = locale === "zh-CN" ? `/zh-CN${route}` : route;

  return (
    <main data-route={localizedRoute} lang={locale} className="landing-shell py-12">
      <section className="landing-panel rounded-[2rem] p-8">
        <h1>{content.heading}</h1>
        <p className="mt-3 text-[var(--landing-muted)]">{content.description}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-[var(--landing-graphite)]">
          <Link href={webLinks.docs}>{content.backToDocs}</Link>
          <Link href={webLinks.github}>GitHub</Link>
          <Link href={webLinks.releaseNotes}>{content.releaseNotes}</Link>
          {content.readCurrentRelease ? <Link href={webLinks.releaseV9}>{content.readCurrentRelease}</Link> : null}
        </div>
      </section>
    </main>
  );
}
