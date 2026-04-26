import { describe, expect, it } from "vitest";

import { metadata as rootMetadata } from "../app/layout";
import { metadata as landingMetadata } from "../app/landing/page";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

describe("landing seo baseline", () => {
  it("defines root metadata with canonical + social cards", () => {
    expect(rootMetadata.metadataBase).toBeInstanceOf(URL);
    expect(rootMetadata.alternates?.canonical).toBe("/");
    expect(rootMetadata.openGraph?.title).toBeTypeOf("string");
    expect(rootMetadata.openGraph?.description).toBeTypeOf("string");
    expect(rootMetadata.twitter?.card).toBe("summary_large_image");
  });

  it("defines landing metadata override", () => {
    expect(landingMetadata.title).toBeTypeOf("string");
    expect(landingMetadata.description).toBeTypeOf("string");
    expect(landingMetadata.alternates?.canonical).toBe("/landing");
  });
});

describe("sitemap + robots availability", () => {
  it("exports landing route in sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://formaui.com/landing");
    expect(entries.length).toBeGreaterThanOrEqual(3);
  });

  it("exports crawler rules and sitemap in robots", () => {
    const rules = robots();
    const robotsRules = Array.isArray(rules.rules) ? rules.rules : [rules.rules];
    const allowRules = robotsRules.flatMap((entry) =>
      entry ? (Array.isArray(entry.allow) ? entry.allow : [entry.allow]) : []
    );

    expect(allowRules).toContain("/landing");
    expect(rules.sitemap).toContain("https://formaui.com/sitemap.xml");
  });
});
