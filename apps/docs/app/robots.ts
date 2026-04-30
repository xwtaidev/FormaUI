import type { MetadataRoute } from "next";

const siteUrl = "https://formaui.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/docs",
          "/docs/getting-started",
          "/docs/foundations",
          "/docs/components",
          "/docs/blocks",
          "/docs/templates",
          "/docs/guides",
          "/docs/cli",
          "/docs/registry",
          "/docs/migration",
          "/docs/release-notes",
          "/docs/resources"
        ],
        disallow: ["/api/", "/_next/"]
      }
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl
  };
}
