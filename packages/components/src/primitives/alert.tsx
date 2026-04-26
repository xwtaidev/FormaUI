import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 text-sm [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        success: "border-emerald-300 bg-emerald-50 text-emerald-900",
        warning: "border-amber-300 bg-amber-50 text-amber-900",
        destructive: "border-red-300 bg-red-50 text-red-900"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, description, icon, children, role = "status", ...props }, ref) => (
    <div ref={ref} role={role} className={cn(alertVariants({ variant }), className)} {...props}>
      {icon}
      <div className="grid gap-1">
        {title ? <h5 className="font-medium leading-none tracking-tight">{title}</h5> : null}
        {description ? <p className="text-sm opacity-90">{description}</p> : null}
        {children ? <div>{children}</div> : null}
      </div>
    </div>
  )
);

Alert.displayName = "Alert";
