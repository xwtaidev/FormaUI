import * as React from "react";

import { cn } from "../lib/cn";

function clamp(value: number, min?: number, max?: number) {
  let next = value;
  if (typeof min === "number") {
    next = Math.max(min, next);
  }
  if (typeof max === "number") {
    next = Math.min(max, next);
  }
  return next;
}

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      value,
      defaultValue,
      min,
      max,
      step = 1,
      disabled,
      onValueChange,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const isControlled = typeof value === "number";
    const [internalValue, setInternalValue] = React.useState(() =>
      clamp(
        typeof defaultValue === "number" ? defaultValue : typeof min === "number" ? min : 0,
        min,
        max
      )
    );

    const currentValue = isControlled ? clamp(value, min, max) : internalValue;

    const commitValue = React.useCallback(
      (nextValue: number) => {
        const normalized = clamp(nextValue, min, max);
        if (!isControlled) {
          setInternalValue(normalized);
        }
        onValueChange?.(normalized);
      },
      [isControlled, max, min, onValueChange]
    );

    const increment = () => commitValue(currentValue + step);
    const decrement = () => commitValue(currentValue - step);

    return (
      <div
        className={cn(
          "inline-flex h-10 w-full items-stretch overflow-hidden rounded-md border border-border bg-background shadow-sm",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <button
          type="button"
          aria-label="Decrement value"
          onClick={decrement}
          disabled={disabled}
          className="inline-flex w-10 items-center justify-center border-r border-border text-sm text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none"
        >
          -
        </button>
        <input
          ref={ref}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(currentValue) ? currentValue : ""}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            "h-full w-full border-0 bg-transparent px-3 text-center text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
            className
          )}
          onChange={(event) => {
            const raw = Number(event.target.value);
            if (!Number.isNaN(raw)) {
              commitValue(raw);
            }
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) {
              return;
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              increment();
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              decrement();
            }
          }}
          {...props}
        />
        <button
          type="button"
          aria-label="Increment value"
          onClick={increment}
          disabled={disabled}
          className="inline-flex w-10 items-center justify-center border-l border-border text-sm text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none"
        >
          +
        </button>
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";
