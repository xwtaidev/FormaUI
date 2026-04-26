export const LANDING_CTA_EVENTS = [
  "cta_docs_click",
  "cta_quick_start_click",
  "cta_examples_click",
  "cta_github_click"
] as const;

export type LandingCtaEventName = (typeof LANDING_CTA_EVENTS)[number];

export type LandingEventPayload = {
  href?: string;
  surface?: string;
};

export type LandingAnalyticsEmit = (eventName: LandingCtaEventName, payload: LandingEventPayload) => void;

type CreateLandingAnalyticsDispatcherOptions = {
  disabled?: boolean;
  emit?: LandingAnalyticsEmit;
  env?: Record<string, string | undefined>;
};

type BrowserWindowWithAnalytics = Window &
  Partial<{
    dataLayer: Array<Record<string, unknown>>;
    gtag: (...args: unknown[]) => void;
  }>;

function defaultEmit(eventName: LandingCtaEventName, payload: LandingEventPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const analyticsWindow = window as BrowserWindowWithAnalytics;
  const eventPayload = {
    event: eventName,
    ...payload
  };

  analyticsWindow.dataLayer?.push(eventPayload);
  analyticsWindow.gtag?.("event", eventName, payload);
}

export function isLandingAnalyticsDisabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.NEXT_PUBLIC_DISABLE_LANDING_ANALYTICS === "1";
}

export function createLandingAnalyticsDispatcher({
  disabled,
  emit,
  env
}: CreateLandingAnalyticsDispatcherOptions = {}) {
  const analyticsDisabled = disabled ?? isLandingAnalyticsDisabled(env);
  const analyticsEmit = emit ?? defaultEmit;

  return (eventName: LandingCtaEventName, payload: LandingEventPayload = {}) => {
    if (analyticsDisabled) {
      return false;
    }

    analyticsEmit(eventName, payload);
    return true;
  };
}
