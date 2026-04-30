import * as React from "react";

import { cn } from "../lib/cn";

export interface DescriptionsItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

export interface DescriptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DescriptionsItem[];
  column?: number;
  size?: "sm" | "md";
  bordered?: boolean;
  labelWidth?: number | string;
}

const sizeStyles: Record<NonNullable<DescriptionsProps["size"]>, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm"
};

export const Descriptions = React.forwardRef<HTMLDivElement, DescriptionsProps>(
  ({ className, items, column = 3, size = "md", bordered = false, labelWidth, ...props }, ref) => {
    return (
      <dl
        ref={ref}
        className={cn(
          "grid w-full gap-0 rounded-lg bg-card text-card-foreground",
          bordered ? "border border-border" : "border border-transparent",
          className
        )}
        style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}
        {...props}
      >
        {items.map((item) => (
          <div
            key={item.key}
            className={cn(
              "flex min-w-0 flex-col gap-1 border-border",
              bordered && "border-r border-b last:border-r-0",
              sizeStyles[size]
            )}
            style={item.span ? { gridColumn: `span ${item.span} / span ${item.span}` } : undefined}
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={labelWidth ? { width: labelWidth } : undefined}>
              {item.label}
            </dt>
            <dd className="min-w-0 text-sm text-foreground">{item.children}</dd>
          </div>
        ))}
      </dl>
    );
  }
);

Descriptions.displayName = "Descriptions";
