import type { ReactNode } from "react";

import { AppSidebar } from "./composites/app-sidebar";
import { MetricCard } from "./composites/metric-card";
import { PageHeader } from "./composites/page-header";

import { demoMetrics, demoSidebarItems } from "./data/demo-data";

export interface DashboardShellProps {
  children?: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="grid min-h-[32rem] gap-0 border border-border md:grid-cols-[16rem_1fr]">
      <AppSidebar appName="FormaUI Console" items={demoSidebarItems} footer="v0.1" />
      <main className="space-y-6 p-6">
        <PageHeader
          title="Overview"
          description="Track your workspace health, product usage, and key automation signals."
        />
        <section className="grid gap-4 md:grid-cols-3">
          {demoMetrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              delta={metric.delta}
            />
          ))}
        </section>
        {children ? <section className="space-y-4">{children}</section> : null}
      </main>
    </div>
  );
}
