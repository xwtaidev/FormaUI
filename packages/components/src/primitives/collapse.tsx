import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { cn } from "../lib/cn";

export const Collapse = CollapsiblePrimitive.Root;

export const CollapseTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(
      "group inline-flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
      className
    )}
    {...props}
  >
    <span>{children}</span>
    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
  </CollapsiblePrimitive.Trigger>
));

CollapseTrigger.displayName = CollapsiblePrimitive.Trigger.displayName;

export const CollapseContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm data-[state=closed]:animate-out data-[state=open]:animate-in",
      className
    )}
    {...props}
  >
    <div className="rounded-md border border-border bg-card p-3 text-card-foreground">{children}</div>
  </CollapsiblePrimitive.Content>
));

CollapseContent.displayName = CollapsiblePrimitive.Content.displayName;
