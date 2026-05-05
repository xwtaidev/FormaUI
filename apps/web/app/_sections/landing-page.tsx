import React from "react";
import Link from "next/link";

import LandingBuildFlow from "./landing-build-flow";
import LandingFinalCta from "./landing-final-cta";
import LandingFooter from "./landing-footer";
import LandingHero from "./landing-hero";
import LandingProductSurfaces from "./landing-product-surfaces";
import LandingProof from "./landing-proof";
import LandingQualitySystem from "./landing-quality-system";
import LandingScenarioGallery from "./landing-scenario-gallery";
import LandingSourceOwnership from "./landing-source-ownership";
import { getAlternateLocalePath, type Locale } from "./i18n";

export default function LandingPageContent({ locale = "en", currentPath = "/" }: { locale?: Locale; currentPath?: string }) {
  const alternatePath = getAlternateLocalePath(locale, currentPath);
  const isZh = locale === "zh-CN";

  return (
    <main lang={locale}>
      <LandingHero locale={locale} />
      <hr className="landing-editorial-divider mx-auto w-full max-w-7xl" />
      <LandingProductSurfaces locale={locale} />
      <LandingSourceOwnership locale={locale} />
      <hr className="landing-editorial-divider mx-auto w-full max-w-7xl" />
      <LandingBuildFlow locale={locale} />
      <LandingScenarioGallery locale={locale} />
      <hr className="landing-editorial-divider mx-auto w-full max-w-7xl" />
      <LandingQualitySystem locale={locale} />
      <LandingProof locale={locale} />
      <hr className="landing-editorial-divider mx-auto w-full max-w-7xl" />
      <LandingFinalCta locale={locale} />
      <LandingFooter locale={locale} />
    </main>
  );
}
