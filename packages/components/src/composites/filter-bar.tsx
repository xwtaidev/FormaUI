"use client";

import { useEffect, useId, useState } from "react";

import { cn } from "../lib/cn";
import { Button } from "../primitives/button";
import { Input } from "../primitives/input";
import { RadioGroup, RadioGroupItem } from "../primitives/radio-group";
import { Separator } from "../primitives/separator";
import { DateRangePicker, type DateRangeValue } from "./date-range-picker";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterBarValue {
  query: string;
  status: string;
  range: DateRangeValue;
}

export interface FilterBarValueInput {
  query?: string;
  status?: string;
  range?: Partial<DateRangeValue>;
}

export interface FilterBarProps {
  value?: FilterBarValueInput;
  defaultValue?: FilterBarValueInput;
  statusOptions?: FilterOption[];
  onChange?: (value: FilterBarValue) => void;
  onReset?: () => void;
  queryPlaceholder?: string;
  className?: string;
}

const DEFAULT_STATUS_OPTIONS: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" }
];

function normalizeFilterValue(value?: FilterBarValueInput): FilterBarValue {
  return {
    query: value?.query ?? "",
    status: value?.status ?? "all",
    range: {
      from: value?.range?.from ?? "",
      to: value?.range?.to ?? ""
    }
  };
}

export function FilterBar({
  value,
  defaultValue,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  onChange,
  onReset,
  queryPlaceholder = "Search by keyword, owner, or ID",
  className
}: FilterBarProps) {
  const [internalValue, setInternalValue] = useState<FilterBarValue>(() =>
    normalizeFilterValue(defaultValue ?? value)
  );
  const optionIdPrefix = useId();
  const queryId = useId();

  useEffect(() => {
    if (value) {
      setInternalValue(normalizeFilterValue(value));
    }
  }, [value]);

  const resolvedValue = value ? normalizeFilterValue(value) : internalValue;

  const commit = (nextValue: FilterBarValue) => {
    if (!value) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const handleReset = () => {
    const nextValue = normalizeFilterValue(defaultValue);
    commit(nextValue);
    onReset?.();
  };

  return (
    <section className={cn("space-y-4 rounded-lg border border-border bg-card p-4", className)}>
      <div className="space-y-2">
        <label htmlFor={queryId} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Search
        </label>
        <Input
          id={queryId}
          value={resolvedValue.query}
          onChange={(event) => commit({ ...resolvedValue, query: event.target.value })}
          placeholder={queryPlaceholder}
          aria-label="Filter query"
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
        <RadioGroup
          value={resolvedValue.status}
          onValueChange={(status) => commit({ ...resolvedValue, status })}
          className="flex flex-wrap gap-3"
        >
          {statusOptions.map((option) => {
            const optionId = `${optionIdPrefix}-${option.value}`;
            return (
              <label key={option.value} htmlFor={optionId} className="inline-flex items-center gap-2 text-sm">
                <RadioGroupItem id={optionId} value={option.value} />
                {option.label}
              </label>
            );
          })}
        </RadioGroup>
      </div>

      <DateRangePicker
        value={resolvedValue.range}
        onChange={(range) => commit({ ...resolvedValue, range })}
      />

      <div className="flex justify-end">
        <Button type="button" variant="ghost" onClick={handleReset} aria-label="Reset filters">
          Reset filters
        </Button>
      </div>
    </section>
  );
}
