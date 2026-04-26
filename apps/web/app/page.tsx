import React from "react";
import LandingAnalytics from "./_sections/landing-analytics";
import LandingBlocksFlow from "./_sections/landing-blocks-flow";
import LandingFaq from "./_sections/landing-faq";
import LandingFeatures from "./_sections/landing-features";
import LandingFinalCta from "./_sections/landing-final-cta";
import LandingFooter from "./_sections/landing-footer";
import LandingHeader from "./_sections/landing-header";
import LandingHero from "./_sections/landing-hero";
import LandingProof from "./_sections/landing-proof";
import LandingQualityGates from "./_sections/landing-quality-gates";
import LandingQuickStart from "./_sections/landing-quick-start";
import LandingScenarios from "./_sections/landing-scenarios";
import LandingStats from "./_sections/landing-stats";

export default function LandingPage() {
  return (
    <main>
      <LandingHeader />
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingProof />
      <LandingScenarios />
      <LandingQuickStart />
      <LandingBlocksFlow />
      <LandingQualityGates />
      <LandingFaq />
      <LandingFinalCta />
      <LandingFooter />
      <LandingAnalytics />
    </main>
  );
}
