"use client";

import { useMemo, useState } from "react";

import { cn } from "../lib/cn";
import { Badge } from "../primitives/badge";
import { Button } from "../primitives/button";
import { Input } from "../primitives/input";

export interface SearchCommandItem {
  id: string;
  label: string;
  description?: string;
  keywords?: string[];
  shortcut?: string;
}

export interface SearchCommandProps {
  items: SearchCommandItem[];
  onSelect?: (item: SearchCommandItem) => void;
  title?: string;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

function matchesQuery(item: SearchCommandItem, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [item.label, item.description ?? "", ...(item.keywords ?? [])].join(" ").toLowerCase();
  return haystack.includes(query);
}

export function SearchCommand({
  items,
  onSelect,
  title = "Command menu",
  placeholder = "Search command",
  emptyMessage = "No matching commands.",
  className
}: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(
    () => items.filter((item) => matchesQuery(item, normalizedQuery)),
    [items, normalizedQuery]
  );

  return (
    <section className={cn("rounded-lg border border-border bg-card p-4", className)}>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">Run project actions quickly with keyboard-like search.</p>
      </div>
      <div className="mt-3 space-y-2">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          aria-label="Search command"
        />
        <div className="max-h-64 space-y-1 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Button
                key={item.id}
                type="button"
                variant="ghost"
                size="md"
                className="h-auto w-full justify-between gap-3 rounded-md px-3 py-2 text-left"
                aria-label={`Run ${item.label}`}
                onClick={() => onSelect?.(item)}
              >
                <span className="space-y-0.5">
                  <span className="block text-sm font-medium text-foreground">{item.label}</span>
                  {item.description ? (
                    <span className="block text-xs text-muted-foreground">{item.description}</span>
                  ) : null}
                </span>
                {item.shortcut ? <Badge variant="outline">{item.shortcut}</Badge> : null}
              </Button>
            ))
          ) : (
            <p className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
