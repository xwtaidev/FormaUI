import React from "react";
import { FeatureGrid, LogoCloud, StatsStrip } from "@formaui/blocks";

type LandingProofProps = {
  featureGridContent: {
    title: string;
    description: string;
    features: Array<{ title: string; description: string }>;
  };
  logoCloudContent: {
    title: string;
    description: string;
    logos: string[];
  };
  statsStripContent: {
    title: string;
    description: string;
    stats: Array<{ label: string; value: string }>;
  };
};

export function LandingProof({ featureGridContent, logoCloudContent, statsStripContent }: LandingProofProps) {
  return (
    <div className="space-y-8">
      <section id="core-differentiators" className="space-y-4">
        <FeatureGrid {...featureGridContent} />
      </section>

      <section id="asset-proof" className="space-y-4">
        <StatsStrip {...statsStripContent} />
      </section>

      <section id="scenario-showcase" className="space-y-4">
        <LogoCloud {...logoCloudContent} />
      </section>
    </div>
  );
}
