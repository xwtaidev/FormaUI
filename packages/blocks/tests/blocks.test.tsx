/* @vitest-environment jsdom */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AgentRunTimeline,
  ApiKeyManager,
  BillingPanel,
  DashboardShell,
  FeatureGrid,
  HeroCta,
  LoginPanel,
  LogoCloud,
  ModelSelector,
  NotificationPanel,
  PricingSection,
  SettingsLayout,
  TeamMembersTable,
  TokenUsageChart
} from "../src";

describe("blocks", () => {
  it("renders all required v0.2.5 block labels", () => {
    render(
      <div>
        <LoginPanel />
        <PricingSection />
        <DashboardShell />
        <SettingsLayout />
        <BillingPanel />
        <ApiKeyManager />
        <TokenUsageChart />
        <AgentRunTimeline />
        <TeamMembersTable />
        <NotificationPanel />
        <ModelSelector />
        <HeroCta />
        <FeatureGrid />
        <LogoCloud />
      </div>
    );

    expect(screen.getAllByText("Welcome back").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pro").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Overview").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Settings").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Current plan").length).toBeGreaterThan(0);
    expect(screen.getAllByText("API keys").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Token usage").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Agent runs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Team members").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Notifications").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Model selector").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ship FormaUI faster").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Book a live demo").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Everything teams need to ship").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Works with your stack").length).toBeGreaterThan(0);
  });
});
