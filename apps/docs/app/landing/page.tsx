import React from "react";
import type { Metadata } from "next";

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

export default function LandingPage() {
  return (
    <div className="space-y-10 pb-6">
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
