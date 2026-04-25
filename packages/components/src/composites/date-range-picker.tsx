"use client";

import { useEffect, useId, useState } from "react";

import { cn } from "../lib/cn";
import { Input } from "../primitives/input";
import { Separator } from "../primitives/separator";

export interface DateRangeValue {
  from: string;
  to: string;
}

export interface DateRangePickerProps {
  value?: Partial<DateRangeValue>;
  defaultValue?: Partial<DateRangeValue>;
  onChange?: (value: DateRangeValue) => void;
  fromLabel?: string;
  toLabel?: string;
  className?: string;
}

function normalizeRange(range?: Partial<DateRangeValue>): DateRangeValue {
  return {
    from: range?.from ?? "",
    to: range?.to ?? ""
  };
}

export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  fromLabel = "Start date",
  toLabel = "End date",
  className
}: DateRangePickerProps) {
  const [internalRange, setInternalRange] = useState<DateRangeValue>(() =>
    normalizeRange(defaultValue ?? value)
  );

  useEffect(() => {
    if (value) {
      setInternalRange(normalizeRange(value));
    }
  }, [value]);

  const resolvedRange = value ? normalizeRange(value) : internalRange;
  const fromId = useId();
  const toId = useId();

  const updateRange = (patch: Partial<DateRangeValue>) => {
    const nextRange = normalizeRange({ ...resolvedRange, ...patch });
    if (!value) {
      setInternalRange(nextRange);
    }
    onChange?.(nextRange);
  };

  return (
    <div className={cn("space-y-3 rounded-md border border-border bg-background p-3", className)}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Date range</p>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="space-y-1">
          <label htmlFor={fromId} className="text-xs font-medium text-foreground">
            {fromLabel}
          </label>
          <Input
            id={fromId}
            type="date"
            value={resolvedRange.from}
            onChange={(event) => updateRange({ from: event.target.value })}
          />
        </div>
        <Separator orientation="vertical" className="hidden h-8 justify-self-center sm:block" />
        <div className="space-y-1">
          <label htmlFor={toId} className="text-xs font-medium text-foreground">
            {toLabel}
          </label>
          <Input
            id={toId}
            type="date"
            value={resolvedRange.to}
            min={resolvedRange.from || undefined}
            onChange={(event) => updateRange({ to: event.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
