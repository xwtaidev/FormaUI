import React from "react";

import { LandingCta } from "./_components/landing-cta";
import { LandingHero } from "./_components/landing-hero";
import { LandingProof } from "./_components/landing-proof";
import {
  differentiators,
  faqItems,
  footerLinks,
  quickStartSteps,
  scenarios,
  sectionAnchors,
  trustItems
} from "./content";

export default function LandingPage() {
  return (
    <div className="space-y-10 pb-6">
      <LandingHero anchors={sectionAnchors} />
      <LandingProof differentiators={differentiators} scenarios={scenarios} trustItems={trustItems} />
      <LandingCta quickStartSteps={quickStartSteps} faqItems={faqItems} footerLinks={footerLinks} />
    </div>
  );
}
