import type { MetadataRoute } from "next";

const siteUrl = "https://formaui.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/docs", "/docs/getting-started"],
        disallow: ["/api/", "/_next/"]
      }
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl
  };
}
