import type { MetadataRoute } from "next";

import { defaultLocale, getLocalizedPath, localizedRoutePaths, locales } from "./_sections/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    localizedRoutePaths.map((route) => {
      const localizedPath = getLocalizedPath(locale, route);
      return {
        url: `https://formaui.com${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: locale === defaultLocale && route === "/" ? 1 : route === "/" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((item) => [item, `https://formaui.com${getLocalizedPath(item, route)}`]))
        }
      } satisfies MetadataRoute.Sitemap[number];
    })
  );
}
