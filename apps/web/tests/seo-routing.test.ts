import { describe, expect, it } from "vitest";

import robots from "../app/robots";
import sitemap from "../app/sitemap";

const expectedRoutes = ["/", "/marketing", "/product", "/scenarios", "/showcase", "/blog", "/changelog"];

describe("web seo routing", () => {
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
});
