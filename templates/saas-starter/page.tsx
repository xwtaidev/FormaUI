import { ModelSelector } from "../../components/model-selector";
import { NotificationPanel } from "../../components/notification-panel";
import { PricingSection } from "../../components/pricing-section";
import { TeamMembersTable } from "../../components/team-members-table";
import { MetricCard } from "../../components/composites/metric-card";
import { PageHeader } from "../../components/composites/page-header";
import { Badge } from "../../components/primitives/badge";
import { Button } from "../../components/primitives/button";

export default function SaasStarterPage() {
  return (
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
  );
}
