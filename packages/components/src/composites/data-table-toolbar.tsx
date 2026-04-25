"use client";

import { useEffect, useId, useState } from "react";

import { cn } from "../lib/cn";
import { Button } from "../primitives/button";
import { Input } from "../primitives/input";

export interface DataTableToolbarProps {
  value?: string;
  defaultValue?: string;
  resultCount?: number;
  onQueryChange?: (value: string) => void;
  onRefresh?: () => void;
  onAdd?: () => void;
  queryPlaceholder?: string;
  addLabel?: string;
  className?: string;
}

export function DataTableToolbar({
  value,
  defaultValue,
  resultCount,
  onQueryChange,
  onRefresh,
  onAdd,
  queryPlaceholder = "Search rows...",
  addLabel = "Add row",
  className
}: DataTableToolbarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? value ?? "");
  const queryId = useId();

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const resolvedValue = value ?? internalValue;

  const handleQueryChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onQueryChange?.(nextValue);
  };

  return (
    <section
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <label htmlFor={queryId} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Table search
        </label>
        <Input
          id={queryId}
          value={resolvedValue}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder={queryPlaceholder}
          aria-label="Table search query"
        />
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {typeof resultCount === "number" ? `${resultCount} result(s)` : "Results ready"}
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={onRefresh} aria-label="Refresh table">
          Refresh
        </Button>
        <Button type="button" size="sm" onClick={onAdd} aria-label={addLabel}>
          {addLabel}
        </Button>
      </div>
    </section>
  );
}
