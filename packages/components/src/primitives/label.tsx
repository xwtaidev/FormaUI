import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "../lib/cn";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
  disabled?: boolean;
}

export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, required = false, disabled = false, children, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      aria-disabled={disabled || undefined}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        disabled && "cursor-not-allowed opacity-70",
        className
      )}
      {...props}
    >
      {children}
      {required ? (
        <>
          <span aria-hidden="true" className="ml-0.5 text-red-600">
            *
          </span>
          <span className="sr-only"> required</span>
        </>
      ) : null}
    </LabelPrimitive.Root>
  )
);

Label.displayName = LabelPrimitive.Root.displayName;
