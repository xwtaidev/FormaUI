/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  AppSidebar,
  EmptyState,
  FormField,
  Input,
  MetricCard,
  PageHeader,
  StatusBadge,
  ThemeSwitcher,
  UserMenu
} from "../src";

describe("composites", () => {
  it("renders all composite labels", () => {
    const onSignOut = vi.fn();

    render(
      <div>
        <PageHeader title="Dashboard" description="Overview" />
        <MetricCard title="Revenue" value="$42k" delta="+12%" description="vs last week" />
        <EmptyState title="No projects" description="Create your first project" actionLabel="Create" />
        <AppSidebar
          appName="FormaUI"
          items={[
            { label: "Home", active: true },
            { label: "Settings" }
          ]}
          footer="v0.1"
        />
        <UserMenu
          name="Alex Doe"
          email="alex@example.com"
          onSignOut={onSignOut}
          defaultOpen
        />
        <StatusBadge status="warning" />
        <FormField label="Email" htmlFor="email" description="We will send updates.">
          <Input id="email" value="alex@example.com" onChange={() => {}} />
        </FormField>
      </div>
    );

    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(screen.getByText("Revenue")).toBeDefined();
    expect(screen.getByText("No projects")).toBeDefined();
    expect(screen.getByText("FormaUI")).toBeDefined();
    expect(screen.getByText("Warning")).toBeDefined();
    expect(screen.getByText("Email")).toBeDefined();

    fireEvent.click(screen.getByText("Sign out"));
    expect(onSignOut).toHaveBeenCalled();
  });

  it("calls ThemeSwitcher callback on click", () => {
    const onToggle = vi.fn();

    render(<ThemeSwitcher theme="light" onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button", { name: "toggle theme" }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
