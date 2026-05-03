"use client";

import {
  FaqAccordion,
  FeatureGrid,
  FinalCta,
  HeroCta,
  LogoCloud,
  PricingSection,
  StatsStrip
} from "@formaui/blocks";

export function HeroCtaBlockDemo() {
  return (
    <div className="w-full max-w-5xl">
      <HeroCta />
    </div>
  );
}

export function FeatureGridBlockDemo() {
  return (
    <div className="w-full max-w-5xl">
      <FeatureGrid />
    </div>
  );
}

export function LogoCloudBlockDemo() {
  return (
    <div className="w-full max-w-5xl">
      <LogoCloud />
    </div>
  );
}

export function StatsStripBlockDemo() {
  return (
    <div className="w-full max-w-5xl">
      <StatsStrip />
    </div>
  );
}

export function PricingSectionBlockDemo() {
  return (
    <div className="w-full max-w-6xl">
      <PricingSection />
    </div>
  );
}

export function FaqAccordionBlockDemo() {
  return (
    <div className="w-full max-w-4xl">
      <FaqAccordion />
    </div>
  );
}

export function FinalCtaBlockDemo() {
  return (
    <div className="w-full max-w-5xl">
      <FinalCta />
    </div>
  );
}
