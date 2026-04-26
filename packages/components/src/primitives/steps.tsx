import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const stepsVariants = cva("w-full", {
  variants: {
    direction: {
      horizontal: "flex flex-wrap items-start gap-4",
      vertical: "flex flex-col gap-3"
    }
  },
  defaultVariants: {
    direction: "horizontal"
  }
});

const stepsItemVariants = cva(
  "rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
  {
    variants: {
      status: {
        pending: "border-border bg-background text-muted-foreground",
        active: "border-primary bg-primary/5 text-foreground",
        completed: "border-emerald-300 bg-emerald-50 text-emerald-900"
      },
      direction: {
        horizontal: "min-w-[9rem] flex-1",
        vertical: "w-full"
      }
    },
    defaultVariants: {
      status: "pending",
      direction: "horizontal"
    }
  }
);

interface StepsContextValue {
  current?: number;
  direction: "horizontal" | "vertical";
}

const StepsContext = React.createContext<StepsContextValue>({
  current: undefined,
  direction: "horizontal"
});

export interface StepsProps extends React.OlHTMLAttributes<HTMLOListElement>, VariantProps<typeof stepsVariants> {
  current?: number;
}

const STEP_KEYS = new Set(["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"]);

export const Steps = React.forwardRef<HTMLOListElement, StepsProps>(
  ({ className, direction = "horizontal", current, onKeyDown, ...props }, ref) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLOListElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !STEP_KEYS.has(event.key)) {
        return;
      }

      const items = Array.from(
        event.currentTarget.querySelectorAll<HTMLElement>("[data-formaui-step-item='true']:not([data-disabled='true'])")
      );
      if (items.length === 0) {
        return;
      }

      const activeIndex = items.findIndex((item) => item === document.activeElement);
      let nextIndex = activeIndex === -1 ? items.findIndex((item) => item.tabIndex === 0) : activeIndex;
      if (nextIndex < 0) {
        nextIndex = 0;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = items.length - 1;
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (nextIndex + 1) % items.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (nextIndex - 1 + items.length) % items.length;
      }

      event.preventDefault();
      items[nextIndex]?.focus();
    };

    return (
      <StepsContext.Provider value={{ current, direction }}>
        <ol ref={ref} className={cn(stepsVariants({ direction }), className)} onKeyDown={handleKeyDown} {...props} />
      </StepsContext.Provider>
    );
  }
);

Steps.displayName = "Steps";

export interface StepsItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof stepsItemVariants> {
  index?: number;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export const StepsItem = React.forwardRef<HTMLLIElement, StepsItemProps>(
  ({ className, status, index, heading, description, disabled = false, children, ...props }, ref) => {
    const { current, direction } = React.useContext(StepsContext);
    const computedStatus =
      status ??
      (typeof index === "number" && typeof current === "number"
        ? index < current
          ? "completed"
          : index === current
            ? "active"
            : "pending"
        : "pending");

    const isCurrent = computedStatus === "active";
    const stepNumber = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

    return (
      <li
        ref={ref}
        data-formaui-step-item="true"
        data-disabled={disabled || undefined}
        data-status={computedStatus}
        aria-current={isCurrent ? "step" : undefined}
        tabIndex={disabled ? -1 : isCurrent ? 0 : -1}
        className={cn(stepsItemVariants({ status: computedStatus, direction }), className)}
        {...props}
      >
        {children ?? (
          <div className="flex items-start gap-2">
            <span className="mt-0.5 rounded border border-current/20 px-1.5 text-[11px] font-semibold tracking-wide">
              {stepNumber ?? "•"}
            </span>
            <div className="min-w-0">
              {heading ? <p className="font-medium text-foreground">{heading}</p> : null}
              {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
            </div>
          </div>
        )}
      </li>
    );
  }
);

StepsItem.displayName = "StepsItem";
