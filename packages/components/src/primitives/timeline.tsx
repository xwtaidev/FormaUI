import * as React from "react";

import { cn } from "../lib/cn";

export interface TimelineItem {
  key: string;
  label?: React.ReactNode;
  children: React.ReactNode;
  color?: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
  mode?: "left" | "right";
  pending?: React.ReactNode;
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, items, mode = "left", pending, ...props }, ref) => {
    const allItems = pending
      ? [...items, { key: "__pending__", label: "Pending", children: pending, color: "var(--muted-foreground)" }]
      : items;

    return (
      <ol ref={ref} className={cn("space-y-4", className)} {...props}>
        {allItems.map((item, index) => (
          <li key={item.key} className="relative grid grid-cols-[1.25rem_1fr] gap-3">
            <div className="relative flex justify-center">
              <span
                className="mt-1 block h-2.5 w-2.5 rounded-full border border-background"
                style={{ backgroundColor: item.color ?? "currentColor" }}
              />
              {index < allItems.length - 1 ? <span className="absolute top-4 h-[calc(100%+0.5rem)] w-px bg-border" /> : null}
            </div>
            <div
              className={cn(
                "rounded-md border border-border bg-card px-3 py-2 text-card-foreground shadow-sm",
                mode === "right" && "text-right"
              )}
            >
              {item.label ? <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</p> : null}
              <p className="mt-1 text-sm">{item.children}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
);

Timeline.displayName = "Timeline";
