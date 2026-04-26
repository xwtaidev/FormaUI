import type { MetadataRoute } from "next";

const siteUrl = "https://formaui.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/installation", "/components", "/blocks", "/templates", "/cli", "/registry", "/migration-v0.4-to-v0.5"],
        disallow: ["/api/", "/_next/"]
      }
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl
  };
}
