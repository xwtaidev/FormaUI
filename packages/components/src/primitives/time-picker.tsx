import * as React from "react";
import { Clock3 } from "lucide-react";

import { cn } from "../lib/cn";
import { Input } from "./input";

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  format?: "24h" | "12h";
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, value, defaultValue, onValueChange, format = "24h", disabled, step = 60, ...props }, ref) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const currentValue = isControlled ? value ?? "" : internalValue;

    const commit = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    };

    return (
      <div
        className={cn(
          "inline-flex h-10 w-full items-center gap-2 rounded-md border border-border bg-background px-3 text-sm shadow-sm",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <Clock3 className="h-4 w-4 shrink-0 text-muted-foreground" />
        <Input
          ref={ref}
          type="time"
          value={currentValue}
          onChange={(event) => commit(event.target.value)}
          disabled={disabled}
          step={step}
          className={cn(
            "h-auto border-0 bg-transparent p-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            format === "12h" && "[&::-webkit-calendar-picker-indicator]:opacity-100",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";
