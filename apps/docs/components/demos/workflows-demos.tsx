"use client";

import * as React from "react";
import {
  DataTable,
  DataTableToolbar,
  FilterBar,
  MetricCard,
  PaginationBar,
  SearchCommand,
  ThemeSwitcher,
  UserMenu,
} from "@formaui/components";

const TEAM_ROWS = [
  { name: "Avery Lin", role: "Product Lead", score: 98, status: "Active" },
  { name: "Riley Chen", role: "ML Engineer", score: 92, status: "Reviewing" },
  { name: "Jordan Wu", role: "Design Engineer", score: 89, status: "Blocked" },
];

export function DataTableInteractiveDemo() {
  return (
    <DataTable
      caption="Team leaderboard"
      columns={[
        { key: "name", header: "Name", sortable: true },
        { key: "role", header: "Role" },
        { key: "status", header: "Status", align: "center" },
        { key: "score", header: "Score", sortable: true, align: "right" },
      ]}
      rows={TEAM_ROWS}
    />
  );
}

export function DataTableCaseDemo() {
  return (
    <DataTable
      columns={[
        { key: "name", header: "Name", sortable: true },
        { key: "role", header: "Role" },
        { key: "score", header: "Score", sortable: true, align: "right" },
      ]}
      rows={TEAM_ROWS}
    />
  );
}

export function DataTableToolbarInteractiveDemo() {
  const [query, setQuery] = React.useState("");
  const [resultCount, setResultCount] = React.useState(24);

  return (
    <DataTableToolbar
      value={query}
      resultCount={resultCount}
      onQueryChange={(value) => setQuery(value)}
      onRefresh={() => setResultCount((prev) => prev + 1)}
      onAdd={() => setResultCount((prev) => prev + 1)}
      addLabel="Add customer"
    />
  );
}

export function DataTableToolbarCaseDemo() {
  return (
    <DataTableToolbar
      resultCount={24}
      addLabel="Add customer"
      onQueryChange={() => undefined}
      onRefresh={() => undefined}
      onAdd={() => undefined}
    />
  );
}

export function FilterBarInteractiveDemo() {
  const [value, setValue] = React.useState({
    query: "release",
    status: "open",
    range: { from: "2026-05-01", to: "2026-05-31" },
  });

  return (
    <div className="w-full max-w-3xl space-y-2">
      <FilterBar
        value={value}
        statusOptions={[
          { label: "All", value: "all" },
          { label: "Open", value: "open" },
          { label: "Closed", value: "closed" },
        ]}
        onChange={(nextValue) => setValue(nextValue)}
      />
      <p className="text-xs text-fd-muted-foreground">
        当前筛选：{value.status} / {value.query || "no keyword"}
      </p>
    </div>
  );
}

export function FilterBarCaseDemo() {
  return (
    <FilterBar
      statusOptions={[
        { label: "All", value: "all" },
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ]}
      onChange={() => undefined}
    />
  );
}

export function MetricCardInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-3 md:grid-cols-3">
      <MetricCard
        title="Revenue"
        value="$128,430"
        delta="+12.4%"
        description="Compared with last month"
      />
      <MetricCard
        title="Activation"
        value="74%"
        delta="+5.1%"
        description="7-day activation rate"
      />
      <MetricCard
        title="Incidents"
        value="3"
        delta="-2"
        description="Open incidents this week"
      />
    </div>
  );
}

export function MetricCardCaseDemo() {
  return (
    <MetricCard
      title="Monthly Active Users"
      value="18,240"
      delta="+8.7%"
      description="Compared with previous month"
    />
  );
}

export function PaginationBarInteractiveDemo() {
  const [page, setPage] = React.useState(2);
  const [pageSize, setPageSize] = React.useState(20);

  return (
    <PaginationBar
      totalItems={128}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
    />
  );
}

export function PaginationBarCaseDemo() {
  return (
    <PaginationBar
      totalItems={128}
      defaultPage={1}
      defaultPageSize={20}
      onPageChange={() => undefined}
      onPageSizeChange={() => undefined}
    />
  );
}

const COMMAND_ITEMS = [
  {
    id: "deploy",
    label: "Deploy project",
    shortcut: "D",
    description: "Publish latest build",
  },
  {
    id: "rollback",
    label: "Rollback release",
    shortcut: "R",
    description: "Rollback production version",
  },
  {
    id: "invite",
    label: "Invite teammate",
    shortcut: "I",
    description: "Open invite flow",
  },
];

export function SearchCommandInteractiveDemo() {
  const [selected, setSelected] = React.useState<string>("none");

  return (
    <div className="w-full max-w-3xl space-y-2">
      <SearchCommand
        items={COMMAND_ITEMS}
        onSelect={(item) => setSelected(item.id)}
      />
      <p className="text-xs text-fd-muted-foreground">最近执行：{selected}</p>
    </div>
  );
}

export function SearchCommandCaseDemo() {
  return <SearchCommand items={COMMAND_ITEMS} onSelect={() => undefined} />;
}

export function ThemeSwitcherInteractiveDemo() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  return (
    <div className="flex w-full max-w-3xl items-center justify-between rounded-lg border border-fd-border p-4">
      <p className="text-sm text-fd-muted-foreground">Current theme: {theme}</p>
      <ThemeSwitcher
        theme={theme}
        onToggle={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />
    </div>
  );
}

export function ThemeSwitcherCaseDemo() {
  return <ThemeSwitcher theme="light" onToggle={() => undefined} />;
}

export function UserMenuInteractiveDemo() {
  const [lastAction, setLastAction] = React.useState("none");

  return (
    <div className="flex w-full max-w-3xl items-center justify-between rounded-lg border border-fd-border p-4">
      <UserMenu
        name="Jane Doe"
        email="jane.doe@formaui.dev"
        onSignOut={() => setLastAction("sign-out")}
      />
      <p className="text-xs text-fd-muted-foreground">最近动作：{lastAction}</p>
    </div>
  );
}

export function UserMenuCaseDemo() {
  return (
    <UserMenu
      name="Jane Doe"
      email="jane.doe@formaui.dev"
      onSignOut={() => undefined}
    />
  );
}
