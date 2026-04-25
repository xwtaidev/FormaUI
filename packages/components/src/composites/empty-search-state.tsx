"use client";

import { cn } from "../lib/cn";
import { Button } from "../primitives/button";

export interface EmptySearchStateProps {
  query?: string;
  title?: string;
  description?: string;
  clearLabel?: string;
  createLabel?: string;
  onClear?: () => void;
  onCreate?: () => void;
  className?: string;
}

export function EmptySearchState({
  query,
  title,
  description,
  clearLabel = "Clear search",
  createLabel = "Create item",
  onClear,
  onCreate,
  className
}: EmptySearchStateProps) {
  const hasQuery = typeof query === "string" && query.trim().length > 0;
  const resolvedTitle = title ?? "No matching results";
  const resolvedDescription =
    description ?? (hasQuery ? `No items matched "${query}". Try another keyword.` : "No items available yet.");

  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-card px-6 py-10 text-center",
        className
      )}
      aria-live="polite"
    >
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">{resolvedTitle}</h3>
        <p className="text-sm text-muted-foreground">{resolvedDescription}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button type="button" variant="ghost" onClick={onClear} aria-label={clearLabel}>
          {clearLabel}
        </Button>
        <Button type="button" onClick={onCreate} aria-label={createLabel}>
          {createLabel}
        </Button>
      </div>
    </section>
  );
}
