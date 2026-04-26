import type { MetadataRoute } from "next";

const webRoutes = ["/", "/marketing", "/product", "/scenarios", "/showcase", "/blog", "/changelog"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return webRoutes.map((route) => ({
    url: `https://formaui.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8
  }));
}
