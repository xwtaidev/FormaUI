import type { MetadataRoute } from "next";

const siteUrl = "https://formaui.com";
const lastModified = new Date("2026-04-26T00:00:00.000Z");

const routeConfig: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/landing", changeFrequency: "weekly", priority: 0.95 },
  { path: "/quick-start", changeFrequency: "weekly", priority: 0.85 },
  { path: "/introduction", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blocks", changeFrequency: "monthly", priority: 0.75 },
  { path: "/components", changeFrequency: "monthly", priority: 0.75 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routeConfig.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
