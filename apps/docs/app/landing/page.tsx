import React from "react";

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
