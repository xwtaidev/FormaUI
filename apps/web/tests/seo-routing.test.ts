import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ChangelogPage from "../app/changelog/page";
import { metadata as rootMetadata } from "../app/layout";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

const expectedRoutes = ["/", "/marketing", "/product", "/scenarios", "/showcase", "/blog", "/changelog"];

describe("web seo routing", () => {
  it("defines v0.9 web metadata baseline with canonical and social cards", () => {
    expect(rootMetadata.alternates?.canonical).toBe("/");
    expect(rootMetadata.openGraph?.url).toBe("https://formaui.com");
    expect(rootMetadata.description).toContain("source-owned React components");
    expect(rootMetadata.openGraph?.title).toBe("FormaUI - Source-owned UI for SaaS and AI products");
    const twitter = rootMetadata.twitter as { card?: string; title?: string; description?: string } | undefined;
    expect(twitter?.card).toBe("summary_large_image");
    expect(twitter?.title).toBe("FormaUI - Source-owned UI for SaaS and AI products");
    expect(twitter?.description).toContain("production blocks");
  });

  it("includes all required web routes in sitemap", async () => {
    const siteMapEntries = await sitemap();
    const urls = siteMapEntries.map((entry) => entry.url);

    expectedRoutes.forEach((route) => {
      expect(urls).toContain(`https://formaui.com${route}`);
    });
  });

  it("exposes robots sitemap and allows crawling required routes", () => {
    const robotsConfig = robots();

    expect(robotsConfig.sitemap).toBe("https://formaui.com/sitemap.xml");

    const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules : [robotsConfig.rules];
    rules.forEach((rule) => {
      expect(rule).toBeDefined();
      expect(rule.allow).toContain("/");
      expect(rule.disallow ?? []).not.toContain("/");
    });
  });

  it("links changelog page to current release notes without stale v0.5 migration links", () => {
    const html = renderToStaticMarkup(React.createElement(ChangelogPage));

    expect(html).toContain('href="https://github.com/xwtaidev/FormaUI/tree/main/docs/releases"');
    expect(html).toContain('href="https://github.com/xwtaidev/FormaUI/blob/main/docs/releases/v0.9.md"');
    expect(html).not.toContain("migration-v0.4-to-v0.5");
    expect(html).not.toContain("docs/releases/v0.5.md");
  });
});
