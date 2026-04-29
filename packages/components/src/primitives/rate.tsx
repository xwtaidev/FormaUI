import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "../lib/cn";

export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  count?: number;
  allowHalf?: boolean;
  disabled?: boolean;
}

export const Rate = React.forwardRef<HTMLDivElement, RateProps>(
  ({ className, value, defaultValue = 0, onValueChange, count = 5, allowHalf = false, disabled = false, ...props }, ref) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const currentValue = isControlled ? value ?? 0 : internalValue;
    const activeValue = hoverValue ?? currentValue;

    const commit = (next: number) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    };

    const normalize = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
      if (!allowHalf) {
        return index;
      }
      const rect = event.currentTarget.getBoundingClientRect();
      return event.clientX - rect.left <= rect.width / 2 ? index - 0.5 : index;
    };

    return (
      <div ref={ref} className={cn("inline-flex items-center gap-1", className)} role="radiogroup" {...props}>
        {Array.from({ length: count }, (_, i) => {
          const index = i + 1;
          const filled = activeValue >= index;
          const halfFilled = allowHalf && activeValue === index - 0.5;
          return (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={currentValue === index || (allowHalf && currentValue === index - 0.5)}
              aria-label={`Rate ${index}`}
              disabled={disabled}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
              )}
              onMouseMove={(event) => setHoverValue(normalize(index, event))}
              onMouseLeave={() => setHoverValue(null)}
              onClick={(event) => {
                const nextValue = normalize(index, event);
                commit(nextValue === currentValue ? 0 : nextValue);
              }}
            >
              <Star
                className={cn(
                  "h-5 w-5",
                  filled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                  halfFilled && "fill-yellow-400/50 text-yellow-400"
                )}
              />
            </button>
          );
        })}
      </div>
    );
  }
);

Rate.displayName = "Rate";
