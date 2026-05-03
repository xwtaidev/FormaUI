"use client";

import {
  ApiKeyManager,
  BillingPanel,
  DashboardShell,
  NotificationPanel,
  SettingsLayout,
  TeamMembersTable
} from "@formaui/blocks";

export function DashboardShellBlockDemo() {
  return (
    <div className="w-full max-w-5xl">
      <DashboardShell />
    </div>
  );
}

export function SettingsLayoutBlockDemo() {
  return (
    <div className="w-full max-w-4xl">
      <SettingsLayout />
    </div>
  );
}

export function ApiKeyManagerBlockDemo() {
  return (
    <div className="w-full max-w-4xl">
      <ApiKeyManager />
    </div>
  );
}

export function BillingPanelBlockDemo() {
  return (
    <div className="w-full max-w-4xl">
      <BillingPanel />
    </div>
  );
}

export function TeamMembersTableBlockDemo() {
  return (
    <div className="w-full max-w-5xl">
      <TeamMembersTable />
    </div>
  );
}

export function NotificationPanelBlockDemo() {
  return (
    <div className="w-full max-w-4xl">
      <NotificationPanel />
    </div>
  );
}
