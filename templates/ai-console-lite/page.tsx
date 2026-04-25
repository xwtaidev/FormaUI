import { DashboardShell } from "../../components/dashboard-shell";
import { ApiKeyManager } from "../../components/api-key-manager";
import { AgentRunTimeline } from "../../components/agent-run-timeline";
import { SettingsLayout } from "../../components/settings-layout";
import { TokenUsageChart } from "../../components/token-usage-chart";
import { Button } from "../../components/primitives/button";
import { MetricCard } from "../../components/composites/metric-card";
import { PageHeader } from "../../components/composites/page-header";

export default function AiConsoleLitePage() {
  return (
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
  );
}
