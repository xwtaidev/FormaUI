import React from "react";
import LandingBuildFlow from "./_sections/landing-build-flow";
import LandingFinalCta from "./_sections/landing-final-cta";
import LandingFooter from "./_sections/landing-footer";
import LandingHero from "./_sections/landing-hero";
import LandingProductSurfaces from "./_sections/landing-product-surfaces";
import LandingProof from "./_sections/landing-proof";
import LandingQualitySystem from "./_sections/landing-quality-system";
import LandingScenarioGallery from "./_sections/landing-scenario-gallery";
import LandingSourceOwnership from "./_sections/landing-source-ownership";

export default function LandingPage() {
  return (
    <main>
      <LandingHero />
      <hr className="landing-editorial-divider mx-auto w-full max-w-7xl" />
      <LandingProductSurfaces />
      <LandingSourceOwnership />
      <hr className="landing-editorial-divider mx-auto w-full max-w-7xl" />
      <LandingBuildFlow />
      <LandingScenarioGallery />
      <hr className="landing-editorial-divider mx-auto w-full max-w-7xl" />
      <LandingQualitySystem />
      <LandingProof />
      <hr className="landing-editorial-divider mx-auto w-full max-w-7xl" />
      <LandingFinalCta />
      <LandingFooter />
    </main>
  );
}
