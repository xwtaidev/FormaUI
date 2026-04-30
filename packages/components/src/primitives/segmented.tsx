import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "../lib/cn";

export interface SegmentedOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

const itemSizes: Record<NonNullable<SegmentedProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-3.5 text-sm"
};

export const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  ({ className, options, value, defaultValue, onValueChange, disabled = false, size = "md", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("inline-flex", className)} {...props}>
        <ToggleGroupPrimitive.Root
          type="single"
          value={value}
          defaultValue={defaultValue}
          onValueChange={(next) => {
            if (next) {
              onValueChange?.(next);
            }
          }}
          disabled={disabled}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-muted p-1"
          aria-label="Segmented control"
        >
          {options.map((option) => (
            <ToggleGroupPrimitive.Item
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                "inline-flex min-w-12 items-center justify-center rounded-md font-medium text-muted-foreground transition-colors data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                itemSizes[size]
              )}
            >
              {option.label}
            </ToggleGroupPrimitive.Item>
          ))}
        </ToggleGroupPrimitive.Root>
      </div>
    );
  }
);

Segmented.displayName = "Segmented";
