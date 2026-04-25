import { useMemo, useState } from "react";

import {
  ModelSelector,
  TeamMembersTable,
  demoModelOptions,
  demoTeamMembers
} from "@formaui/blocks";
import { Button, Input, SearchCommand } from "@formaui/components";

function queryModels(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return demoModelOptions;
  }

  return demoModelOptions.filter((model) => {
    return model.name.toLowerCase().includes(normalized) || model.provider.toLowerCase().includes(normalized);
  });
}

export default function App() {
  const [query, setQuery] = useState("");
  const models = useMemo(() => queryModels(query), [query]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-6 lg:p-10">
      <header className="space-y-4 rounded-xl border border-border bg-card p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">FormaUI v0.2</p>
        <h1 className="text-3xl font-semibold tracking-tight">Vite Integration Example</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          This workspace demonstrates using FormaUI components and blocks in a Vite + React + TypeScript
          application.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </header>

      <section className="space-y-3 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">SearchCommand + Input</h2>
        <p className="text-sm text-muted-foreground">
          Filter the model selector below. This section uses two installable assets: <code>search-command</code>{" "}
          and <code>input</code>.
        </p>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter models by name/provider..."
          />
          <SearchCommand
            items={models.map((model) => ({
              id: model.id,
              label: `${model.name} (${model.provider})`,
              shortcut: model.stability === "stable" ? "S" : model.stability === "beta" ? "B" : "E"
            }))}
            onSelect={(item) => setQuery(item.label)}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ModelSelector models={models} />
        <TeamMembersTable members={demoTeamMembers} />
      </section>
    </main>
  );
}
