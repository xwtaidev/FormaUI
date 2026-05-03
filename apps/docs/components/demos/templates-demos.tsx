"use client";

import {
  AgentRunTimeline,
  ApiKeyManager,
  DashboardShell,
  ModelSelector,
  NotificationPanel,
  PricingSection,
  SettingsLayout,
  TeamMembersTable,
  TokenUsageChart
} from "@formaui/blocks";
import { MetricCard, PageHeader, Badge, Button } from "@formaui/components";

export function AiConsoleLiteTemplateDemo() {
  return (
    <div className="w-full max-w-6xl">
      <DashboardShell>
        <PageHeader
          title="AI Console Lite"
          description="A lightweight control plane for model operations, usage, and runs."
          actions={<Button size="sm">New run</Button>}
        />
        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard title="Daily tokens" value="412k" delta="+9%" />
          <MetricCard title="Avg latency" value="420ms" delta="-12ms" />
          <MetricCard title="Success rate" value="98.3%" delta="+0.4%" />
        </section>
        <div className="grid gap-4 lg:grid-cols-2">
          <TokenUsageChart />
          <AgentRunTimeline />
        </div>
        <ApiKeyManager />
        <SettingsLayout />
      </DashboardShell>
    </div>
  );
}

export function AdminDashboardTemplateDemo() {
  return (
    <div className="w-full max-w-6xl">
      <DashboardShell>
        <PageHeader
          title="Admin Dashboard"
          description="A control tower for workspace health, incidents, usage, and model routing."
          actions={<Button size="sm">Create report</Button>}
        />
        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard title="Pending approvals" value="12" delta="+2" />
          <MetricCard title="SLA compliance" value="99.1%" delta="+0.3%" />
          <MetricCard title="Escalations" value="4" delta="-1" />
        </section>
        <div className="grid gap-4 lg:grid-cols-2">
          <TokenUsageChart />
          <AgentRunTimeline />
        </div>
        <ModelSelector />
        <div className="grid gap-4 lg:grid-cols-2">
          <TeamMembersTable />
          <NotificationPanel />
        </div>
      </DashboardShell>
    </div>
  );
}

export function SaasStarterTemplateDemo() {
  return (
    <div className="w-full max-w-6xl">
      <main className="space-y-8 p-6">
        <PageHeader
          title="SaaS Starter"
          description="A production-style workspace starter for billing, team operations, and model controls."
          actions={
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Template</Badge>
              <Button size="sm">Invite team</Button>
            </div>
          }
        />

        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard title="Active seats" value="42" delta="+4" />
          <MetricCard title="Monthly growth" value="+18.4%" delta="+2.1%" />
          <MetricCard title="Open incidents" value="3" delta="-1" />
        </section>

        <PricingSection />
        <ModelSelector />
        <div className="grid gap-4 lg:grid-cols-2">
          <TeamMembersTable />
          <NotificationPanel />
        </div>
      </main>
    </div>
  );
}
