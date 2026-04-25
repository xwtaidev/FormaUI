/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  AppSidebar,
  DataTable,
  DataTableToolbar,
  DateRangePicker,
  EmptySearchState,
  EmptyState,
  FilterBar,
  FormField,
  Input,
  MetricCard,
  PaginationBar,
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

  it("updates date-range-picker values", () => {
    const onChange = vi.fn();

    render(
      <DateRangePicker
        value={{ from: "2026-04-01", to: "2026-04-07" }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByLabelText("Start date"), {
      target: { value: "2026-04-03" }
    });

    expect(onChange).toHaveBeenLastCalledWith({
      from: "2026-04-03",
      to: "2026-04-07"
    });
  });

  it("updates and resets filters in filter-bar", () => {
    const onChange = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterBar
        statusOptions={[
          { label: "All", value: "all" },
          { label: "Open", value: "open" },
          { label: "Closed", value: "closed" }
        ]}
        onChange={onChange}
        onReset={onReset}
      />
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Filter query" }), {
      target: { value: "release" }
    });
    fireEvent.click(screen.getByRole("radio", { name: "Closed" }));
    const startDateInputs = screen.getAllByLabelText("Start date");
    fireEvent.change(startDateInputs[startDateInputs.length - 1], {
      target: { value: "2026-04-15" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith({
      query: "",
      status: "all",
      range: { from: "", to: "" }
    });
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("updates query and fires toolbar action callbacks", () => {
    const onQueryChange = vi.fn();
    const onRefresh = vi.fn();
    const onAdd = vi.fn();

    render(
      <DataTableToolbar
        defaultValue=""
        resultCount={8}
        onQueryChange={onQueryChange}
        onRefresh={onRefresh}
        onAdd={onAdd}
        addLabel="Add customer"
      />
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Table search query" }), {
      target: { value: "alpha" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Refresh table" }));
    fireEvent.click(screen.getByRole("button", { name: "Add customer" }));

    expect(screen.getByText("8 result(s)")).toBeDefined();
    expect(onQueryChange).toHaveBeenLastCalledWith("alpha");
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("changes page, page size and boundary state in pagination-bar", () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();

    render(
      <PaginationBar
        totalItems={45}
        defaultPage={2}
        defaultPageSize={10}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Rows per page" }), {
      target: { value: "20" }
    });

    expect(screen.getByText("45 items", { exact: false })).toBeDefined();
    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(onPageChange).toHaveBeenLastCalledWith(1);
    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });

  it("renders empty-search-state and invokes action callbacks", () => {
    const onClear = vi.fn();
    const onCreate = vi.fn();

    render(
      <EmptySearchState
        query="missing customer"
        onClear={onClear}
        onCreate={onCreate}
        clearLabel="Clear query"
        createLabel="Create customer"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear query" }));
    fireEvent.click(screen.getByRole("button", { name: "Create customer" }));

    expect(screen.getByText('No items matched "missing customer". Try another keyword.')).toBeDefined();
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});
