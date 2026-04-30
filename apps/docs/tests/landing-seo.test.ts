import { describe, expect, it } from "vitest";

import { rootMetadata } from "../app/metadata";
import { metadata as landingMetadata } from "../app/landing/page";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

describe("docs seo baseline", () => {
  it("defines root metadata with canonical + social cards", () => {
    expect(rootMetadata.metadataBase).toBeInstanceOf(URL);
    expect(rootMetadata.alternates?.canonical).toBe("/");
    expect(rootMetadata.openGraph?.title).toBeTypeOf("string");
    expect(rootMetadata.openGraph?.description).toBeTypeOf("string");
    const twitter = rootMetadata.twitter as { card?: string } | undefined;
    expect(twitter?.card).toBe("summary_large_image");
    expect(rootMetadata.description).toContain("Fumadocs");
  });

  it("keeps landing page metadata available as a secondary route", () => {
    expect(landingMetadata.title).toBeTypeOf("string");
    expect(landingMetadata.description).toBeTypeOf("string");
    expect(landingMetadata.alternates?.canonical).toBe("/landing");
  });
});

describe("sitemap + robots availability", () => {
  it("exports documentation-critical routes in sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://formaui.com/docs");
    expect(urls).toContain("https://formaui.com/docs/getting-started/introduction");
    expect(urls).toContain("https://formaui.com/docs/getting-started/installation");
    expect(urls).toContain("https://formaui.com/docs/getting-started/quick-start");
    expect(entries.length).toBeGreaterThanOrEqual(3);
  });

  it("exports crawler rules for docs-critical routes and sitemap in robots", () => {
    const rules = robots();
    const robotsRules = Array.isArray(rules.rules) ? rules.rules : [rules.rules];
    const allowRules = robotsRules.flatMap((entry) =>
      entry ? (Array.isArray(entry.allow) ? entry.allow : [entry.allow]) : []
    );

    expect(allowRules).toContain("/docs");
    expect(allowRules).toContain("/docs/getting-started");
    expect(rules.sitemap).toContain("https://formaui.com/sitemap.xml");
  });
});
