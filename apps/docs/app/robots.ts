import type { MetadataRoute } from "next";

const siteUrl = "https://formaui.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/landing", "/introduction", "/quick-start"],
        disallow: ["/api/", "/_next/"]
      }
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl
  };
}
