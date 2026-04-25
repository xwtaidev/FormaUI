/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  AppSidebar,
  DataTable,
  EmptyState,
  FormField,
  Input,
  MetricCard,
  PageHeader,
  SearchCommand,
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

  it("renders data-table and sorts rows by sortable column", () => {
    render(
      <DataTable
        columns={[
          { key: "name", header: "Name" },
          { key: "score", header: "Score", sortable: true }
        ]}
        rows={[
          { name: "Alpha", score: 20 },
          { name: "Bravo", score: 10 },
          { name: "Charlie", score: 30 }
        ]}
      />
    );

    const headers = screen.getAllByRole("columnheader");
    expect(headers.map((header) => header.textContent)).toContain("Name");
    expect(headers.some((header) => header.textContent?.startsWith("Score"))).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Sort by Score" }));
    const cells = screen.getAllByRole("cell");
    expect(cells[0]?.textContent).toBe("Bravo");
    expect(cells[2]?.textContent).toBe("Alpha");
    expect(cells[5]?.textContent).toBe("30");
  });

  it("filters and selects commands in search-command", () => {
    const onSelect = vi.fn();

    render(
      <SearchCommand
        items={[
          { id: "deploy", label: "Deploy project", keywords: ["ship"] },
          { id: "rollback", label: "Rollback release", keywords: ["undo"] }
        ]}
        onSelect={onSelect}
      />
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Search command" }), {
      target: { value: "undo" }
    });

    expect(screen.queryByText("Deploy project")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Run Rollback release" }));
    expect(onSelect).toHaveBeenCalledWith({
      id: "rollback",
      keywords: ["undo"],
      label: "Rollback release"
    });
  });
});
