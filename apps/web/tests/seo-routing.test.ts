import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ChangelogPage from "../app/changelog/page";
import { metadata as rootMetadata } from "../app/layout";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

const expectedRoutes = ["/", "/marketing", "/product", "/scenarios", "/showcase", "/blog", "/changelog"];

describe("web seo routing", () => {
  it("defines web metadata baseline with canonical and social cards", () => {
    expect(rootMetadata.alternates?.canonical).toBe("/");
    expect(rootMetadata.openGraph?.url).toBe("https://formaui.com");
    const twitter = rootMetadata.twitter as { card?: string } | undefined;
    expect(twitter?.card).toBe("summary_large_image");
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

  it("links changelog page to release notes and migration guide in docs", () => {
    const html = renderToStaticMarkup(React.createElement(ChangelogPage));

    expect(html).toContain('href="https://github.com/xwtaidev/FormaUI/tree/main/docs/releases"');
    expect(html).toContain('href="https://github.com/xwtaidev/FormaUI/blob/main/docs/releases/v0.5.md"');
    expect(html).toContain('href="https://docs.formaui.com/migration-v0.4-to-v0.5"');
  });
});
