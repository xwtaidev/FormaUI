import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../lib/cn";

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const monthLabelFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const dayLabelFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfWeek(date: Date) {
  const next = new Date(date);
  next.setDate(date.getDate() - date.getDay());
  return next;
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + amount);
  return next;
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getMonthDays(month: Date) {
  const monthStart = startOfMonth(month);
  const gridStart = startOfWeek(monthStart);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect" | "value" | "defaultValue"> {
  value?: Date;
  defaultValue?: Date;
  onSelect?: (date: Date) => void;
}

export function Calendar({ className, value, defaultValue, onSelect, ...props }: CalendarProps) {
  const isControlled = value instanceof Date;
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue);
  const selectedDate = isControlled ? value : internalValue;
  const [visibleMonth, setVisibleMonth] = React.useState(() =>
    startOfMonth(value ?? defaultValue ?? new Date())
  );

  React.useEffect(() => {
    if (value instanceof Date) {
      setVisibleMonth(startOfMonth(value));
    }
  }, [value]);

  const days = getMonthDays(visibleMonth);

  const selectDate = (date: Date) => {
    if (!isControlled) {
      setInternalValue(date);
    }
    onSelect?.(date);
  };

  return (
    <div className={cn("w-full rounded-lg border border-border bg-card p-3", className)} {...props}>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted"
          onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold text-foreground">{monthLabelFormatter.format(visibleMonth)}</p>
        <button
          type="button"
          aria-label="Next month"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted"
          onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {weekdayLabels.map((label) => (
          <span key={label} className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const outsideMonth = day.getMonth() !== visibleMonth.getMonth();
          const selected = selectedDate ? isSameDay(day, selectedDate) : false;
          return (
            <button
              key={day.toISOString()}
              type="button"
              aria-label={dayLabelFormatter.format(day)}
              data-outside-month={outsideMonth ? "true" : undefined}
              data-selected={selected ? "true" : undefined}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-md text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                outsideMonth && "text-muted-foreground/70",
                selected && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => {
                setVisibleMonth(startOfMonth(day));
                selectDate(day);
              }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
