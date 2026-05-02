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
  { path: "/docs/foundations/design-tokens", changeFrequency: "weekly", priority: 0.9 },
  { path: "/docs/components/overview", changeFrequency: "weekly", priority: 0.9 },
  { path: "/docs/blocks/overview", changeFrequency: "weekly", priority: 0.88 },
  { path: "/docs/templates/overview", changeFrequency: "weekly", priority: 0.88 },
  { path: "/docs/guides/integrations-nextjs", changeFrequency: "weekly", priority: 0.87 },
  { path: "/docs/cli/overview", changeFrequency: "weekly", priority: 0.86 },
  { path: "/docs/registry/overview", changeFrequency: "weekly", priority: 0.86 },
  { path: "/docs/migration/v0.8", changeFrequency: "monthly", priority: 0.82 },
  { path: "/docs/release-notes/v0.8", changeFrequency: "monthly", priority: 0.8 },
  { path: "/docs/resources/examples", changeFrequency: "monthly", priority: 0.78 },
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
