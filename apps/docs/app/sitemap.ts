import type { MetadataRoute } from "next";

const siteUrl = "https://formaui.com";
const lastModified = new Date("2026-04-26T00:00:00.000Z");

const routeConfig: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/docs", changeFrequency: "weekly", priority: 0.95 },
  { path: "/docs/getting-started/introduction", changeFrequency: "weekly", priority: 0.9 },
  { path: "/docs/getting-started/installation", changeFrequency: "weekly", priority: 0.88 },
  { path: "/docs/getting-started/quick-start", changeFrequency: "weekly", priority: 0.86 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routeConfig.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
