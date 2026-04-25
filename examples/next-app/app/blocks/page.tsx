import {
  AgentRunTimeline,
  DashboardShell,
  NotificationPanel,
  PricingSection,
  TeamMembersTable,
  TokenUsageChart
} from "@formaui/blocks";

export default function BlocksPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold">Block Showcase</h2>
        <p className="text-sm text-muted-foreground">
          v0.3.5 blocks: DashboardShell, PricingSection, TokenUsageChart, AgentRunTimeline,
          TeamMembersTable, NotificationPanel.
        </p>
      </section>

      <section className="space-y-2 rounded-lg border border-border bg-card p-4">
        <h3 className="text-lg font-semibold">Pack Pairing Suggestions</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            `dashboard-foundation` + `dashboard-shell` for KPI/table pages with search, pagination, and empty-query
            recovery.
          </li>
          <li>`feedback-loading` + `notification-panel` for async states and operator guidance.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">DashboardShell</h3>
        <DashboardShell>
          <div className="grid gap-4 lg:grid-cols-2">
            <TokenUsageChart />
            <AgentRunTimeline />
          </div>
        </DashboardShell>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">PricingSection</h3>
        <PricingSection />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">TeamMembersTable</h3>
        <TeamMembersTable />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">NotificationPanel</h3>
        <NotificationPanel />
      </section>
    </div>
  );
}
