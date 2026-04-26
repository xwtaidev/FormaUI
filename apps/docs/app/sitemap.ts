import type { MetadataRoute } from "next";

const siteUrl = "https://formaui.com";
const lastModified = new Date("2026-04-26T00:00:00.000Z");

const routeConfig: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/installation", changeFrequency: "weekly", priority: 0.95 },
  { path: "/quick-start", changeFrequency: "weekly", priority: 0.9 },
  { path: "/introduction", changeFrequency: "monthly", priority: 0.85 },
  { path: "/cli", changeFrequency: "monthly", priority: 0.8 },
  { path: "/registry", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blocks", changeFrequency: "monthly", priority: 0.75 },
  { path: "/components", changeFrequency: "monthly", priority: 0.75 },
  { path: "/templates", changeFrequency: "monthly", priority: 0.75 },
  { path: "/migration-v0.4-to-v0.5", changeFrequency: "monthly", priority: 0.7 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routeConfig.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
