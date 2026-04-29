import * as React from "react";

import { cn } from "../lib/cn";
import { Input } from "./input";

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const HEX_COLOR_PATTERN = /^#(?:[0-9A-Fa-f]{3}){1,2}$/;

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ className, value, defaultValue = "#1677ff", onValueChange, disabled = false, ...props }, ref) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? value ?? "#000000" : internalValue;

    const commit = (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    };
    const swatchValue = HEX_COLOR_PATTERN.test(currentValue) ? currentValue : defaultValue;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-10 w-full items-center gap-2 rounded-md border border-border bg-background px-2 shadow-sm",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        <input
          type="color"
          aria-label="Pick color"
          value={swatchValue}
          disabled={disabled}
          className="h-7 w-10 cursor-pointer rounded border-0 bg-transparent p-0 disabled:cursor-not-allowed"
          onChange={(event) => commit(event.target.value)}
        />
        <Input
          type="text"
          value={currentValue}
          disabled={disabled}
          className="h-auto border-0 bg-transparent p-0 font-mono text-sm shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(event) => {
            const next = event.target.value;
            if (next === "" || HEX_COLOR_PATTERN.test(next)) {
              commit(next === "" ? defaultValue : next);
            }
          }}
          onBlur={() => {
            if (!HEX_COLOR_PATTERN.test(currentValue)) {
              commit(defaultValue);
            }
          }}
        />
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
