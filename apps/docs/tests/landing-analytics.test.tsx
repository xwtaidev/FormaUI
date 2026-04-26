import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  createLandingAnalyticsDispatcher,
  LANDING_CTA_EVENTS,
  type LandingCtaEventName
} from "../app/landing/analytics";

const testDir = dirname(fileURLToPath(import.meta.url));
const landingPageSource = readFileSync(resolve(testDir, "../app/landing/page.tsx"), "utf8");

const REQUIRED_CTA_EVENTS: LandingCtaEventName[] = [
  "cta_docs_click",
  "cta_quick_start_click",
  "cta_examples_click",
  "cta_github_click"
];

describe("landing analytics cta coverage", () => {
  it("declares all required CTA event names", () => {
    expect(LANDING_CTA_EVENTS).toEqual(REQUIRED_CTA_EVENTS);
  });

  it("wires required CTA events in landing page source", () => {
    REQUIRED_CTA_EVENTS.forEach((eventName) => {
      expect(landingPageSource).toContain(eventName);
    });
  });
});

describe("landing analytics local disable switch", () => {
  it("suppresses dispatch when disabled", () => {
    const emitted: LandingCtaEventName[] = [];
    const dispatch = createLandingAnalyticsDispatcher({
      disabled: true,
      emit: (event) => {
        emitted.push(event);
      }
    });

    REQUIRED_CTA_EVENTS.forEach((eventName) => {
      const result = dispatch(eventName);
      expect(result).toBe(false);
    });
    expect(emitted).toEqual([]);
  });

  it("dispatches all required CTA events when enabled", () => {
    const emitted: LandingCtaEventName[] = [];
    const dispatch = createLandingAnalyticsDispatcher({
      disabled: false,
      emit: (event) => {
        emitted.push(event);
      }
    });

    REQUIRED_CTA_EVENTS.forEach((eventName) => {
      const result = dispatch(eventName);
      expect(result).toBe(true);
    });
    expect(emitted).toEqual(REQUIRED_CTA_EVENTS);
  });
});
