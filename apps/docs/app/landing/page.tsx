import React from "react";
import type { Metadata } from "next";

import { type LandingCtaEventName } from "./analytics";
import { LandingAnalytics } from "./_components/landing-analytics";
import { LandingCta } from "./_components/landing-cta";
import { LandingHero } from "./_components/landing-hero";
import { LandingProof } from "./_components/landing-proof";
import {
  faqAccordionContent,
  featureGridContent,
  finalCtaContent,
  footerLinks,
  heroCtaContent,
  logoCloudContent,
  sectionAnchors,
  statsStripContent
} from "./content";

export const metadata: Metadata = {
  title: "Landing",
  description:
    "Official FormaUI landing baseline with source-owned marketing blocks, SEO guardrails, and conversion CTA paths.",
  alternates: {
    canonical: "/landing"
  },
  openGraph: {
    title: "FormaUI Landing",
    description:
      "Official FormaUI landing baseline with source-owned marketing blocks, SEO guardrails, and conversion CTA paths.",
    url: "https://formaui.com/landing"
  },
  twitter: {
    card: "summary_large_image",
    title: "FormaUI Landing",
    description:
      "Official FormaUI landing baseline with source-owned marketing blocks, SEO guardrails, and conversion CTA paths."
  }
};

const ctaTrackingRules: Array<{ selector: string; eventName: LandingCtaEventName; trigger: "click" | "submit" }> = [
  { selector: 'a[href="/introduction"]', eventName: "cta_docs_click", trigger: "click" },
  { selector: 'a[href="/quick-start"]', eventName: "cta_quick_start_click", trigger: "click" },
  {
    selector: 'a[href="https://github.com/xwtaidev/FormaUI/tree/main/examples"]',
    eventName: "cta_examples_click",
    trigger: "click"
  },
  {
    selector: 'a[href="https://github.com/xwtaidev/FormaUI"]',
    eventName: "cta_github_click",
    trigger: "click"
  },
  { selector: 'form[action="/introduction"]', eventName: "cta_docs_click", trigger: "submit" },
  { selector: 'form[action="/quick-start"]', eventName: "cta_quick_start_click", trigger: "submit" }
];

export default function LandingPage() {
  return (
    <div id="landing-root" className="space-y-10 pb-6">
      <LandingAnalytics rootId="landing-root" ctaTrackingRules={ctaTrackingRules} />
      <h2 className="sr-only">Landing Overview</h2>
      <LandingHero anchors={sectionAnchors} heroContent={heroCtaContent} />
      <LandingProof
        featureGridContent={featureGridContent}
        logoCloudContent={logoCloudContent}
        statsStripContent={statsStripContent}
      />
      <LandingCta
        faqAccordionContent={faqAccordionContent}
        finalCtaContent={finalCtaContent}
        footerLinks={footerLinks}
      />
    </div>
  );
}
