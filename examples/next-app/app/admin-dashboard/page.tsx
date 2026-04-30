"use client";

import {
  AgentRunTimeline,
  DashboardShell,
  ModelSelector,
  NotificationPanel,
  TeamMembersTable,
  TokenUsageChart
} from "@formaui/blocks";
import { Button, MetricCard, PageHeader } from "@formaui/components";

export default function AdminDashboardPage() {
  return (
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
  );
}
