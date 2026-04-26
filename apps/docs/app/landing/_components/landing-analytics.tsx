"use client";

import { useEffect } from "react";

import { createLandingAnalyticsDispatcher, type LandingCtaEventName } from "../analytics";

type CtaTrackingRule = {
  selector: string;
  eventName: LandingCtaEventName;
  trigger: "click" | "submit";
};

type LandingAnalyticsProps = {
  rootId: string;
  ctaTrackingRules: CtaTrackingRule[];
};

export function LandingAnalytics({ rootId, ctaTrackingRules }: LandingAnalyticsProps) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) {
      return undefined;
    }

    const dispatch = createLandingAnalyticsDispatcher();

    const clickRules = ctaTrackingRules.filter((rule) => rule.trigger === "click");
    const submitRules = ctaTrackingRules.filter((rule) => rule.trigger === "submit");

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) {
        return;
      }

      for (const rule of clickRules) {
        const matchedElement = target.closest(rule.selector);
        if (matchedElement) {
          dispatch(rule.eventName, {
            href: matchedElement.getAttribute("href") ?? undefined,
            surface: "landing"
          });
          break;
        }
      }
    };

    const handleSubmit = (event: Event) => {
      const target = event.target as HTMLFormElement | null;
      if (!target) {
        return;
      }

      for (const rule of submitRules) {
        if (target.matches(rule.selector)) {
          dispatch(rule.eventName, {
            href: target.getAttribute("action") ?? undefined,
            surface: "landing"
          });
          break;
        }
      }
    };

    root.addEventListener("click", handleClick);
    root.addEventListener("submit", handleSubmit);

    return () => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("submit", handleSubmit);
    };
  }, [ctaTrackingRules, rootId]);

  return null;
}
