"use client";

import { useEffect, useMemo, useState } from "react";

import { demoModelOptions, type DemoModelOption } from "./data/demo-data";
import { Badge } from "./primitives/badge";
import { Button } from "./primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./primitives/select";

const MODEL_OPTION_BASE_CLASS =
  "rounded-lg border border-[hsl(var(--semantic-model-chip-border))] bg-[hsl(var(--semantic-model-chip-bg))] p-3 text-left text-[hsl(var(--semantic-model-chip-foreground))] transition-colors";

const MODEL_OPTION_ACTIVE_CLASS =
  "border-[hsl(var(--semantic-model-chip-selected-border))] bg-[hsl(var(--semantic-model-chip-selected-bg))] text-[hsl(var(--semantic-model-chip-selected-foreground))]";

export interface ModelSelectorProps {
  models?: DemoModelOption[];
  title?: string;
  description?: string;
}

function stabilityVariant(stability: DemoModelOption["stability"]) {
  if (stability === "stable") {
    return "default" as const;
  }
  if (stability === "beta") {
    return "secondary" as const;
  }
  return "outline" as const;
}

function uniqueProviders(models: DemoModelOption[]) {
  return Array.from(new Set(models.map((model) => model.provider)));
}

export function ModelSelector({
  models = demoModelOptions,
  title = "Model selector",
  description = "Pick the best-fit model by speed, cost, and context limits."
}: ModelSelectorProps) {
  const providers = useMemo(() => ["all", ...uniqueProviders(models)], [models]);
  const [activeProvider, setActiveProvider] = useState("all");
  const [activeModelId, setActiveModelId] = useState(models[0]?.id ?? "");

  const filteredModels = useMemo(
    () => models.filter((model) => activeProvider === "all" || model.provider === activeProvider),
    [activeProvider, models]
  );

  useEffect(() => {
    if (filteredModels.length === 0) {
      return;
    }

    const hasActive = filteredModels.some((model) => model.id === activeModelId);
    if (!hasActive) {
      setActiveModelId(filteredModels[0]?.id ?? "");
    }
  }, [activeModelId, filteredModels]);

  const activeModel = filteredModels.find((model) => model.id === activeModelId) ?? filteredModels[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-[14rem_1fr]">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--semantic-text-secondary))]">
              Provider
            </p>
            <Select value={activeProvider} onValueChange={setActiveProvider}>
              <SelectTrigger>
                <SelectValue placeholder="All providers" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider === "all" ? "All providers" : provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--semantic-text-secondary))]">
              Available models
            </p>
            <div className="grid gap-2">
              {filteredModels.map((model) => {
                const isActive = model.id === activeModelId;
                return (
                  <button
                    key={model.id}
                    type="button"
                    className={`${MODEL_OPTION_BASE_CLASS} ${isActive ? MODEL_OPTION_ACTIVE_CLASS : ""}`}
                    onClick={() => setActiveModelId(model.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{model.name}</p>
                        <p className="text-xs opacity-80">{model.provider}</p>
                      </div>
                      <Badge variant={stabilityVariant(model.stability)}>{model.stability}</Badge>
                    </div>
                    <dl className="mt-3 grid grid-cols-3 gap-2 text-xs opacity-90">
                      <div>
                        <dt>Latency</dt>
                        <dd className="font-medium">{model.latencyMs}ms</dd>
                      </div>
                      <div>
                        <dt>Cost / 1M</dt>
                        <dd className="font-medium">{model.costPerMillion}</dd>
                      </div>
                      <div>
                        <dt>Context</dt>
                        <dd className="font-medium">{model.contextWindow}</dd>
                      </div>
                    </dl>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {activeModel ? (
          <div className="rounded-lg border border-[hsl(var(--semantic-border-default))] bg-[hsl(var(--semantic-surface-muted))] p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[hsl(var(--semantic-text-primary))]">
                Selected: <span className="font-semibold">{activeModel.name}</span>
              </p>
              <Button size="sm">Use model</Button>
            </div>
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-[hsl(var(--semantic-border-default))] px-3 py-4 text-sm text-[hsl(var(--semantic-text-secondary))]">
            No models match this provider filter.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
