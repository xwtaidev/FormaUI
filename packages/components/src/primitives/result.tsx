import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import { cn } from "../lib/cn";

type ResultStatus = "success" | "info" | "warning" | "error";

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  status?: ResultStatus;
  title: React.ReactNode;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
}

const statusStyles: Record<ResultStatus, string> = {
  success: "text-emerald-600",
  info: "text-blue-600",
  warning: "text-amber-600",
  error: "text-red-600"
};

function getDefaultIcon(status: ResultStatus) {
  const className = cn("h-10 w-10", statusStyles[status]);
  if (status === "success") {
    return <CheckCircle2 className={className} aria-hidden="true" />;
  }
  if (status === "warning") {
    return <AlertTriangle className={className} aria-hidden="true" />;
  }
  if (status === "error") {
    return <XCircle className={className} aria-hidden="true" />;
  }
  return <Info className={className} aria-hidden="true" />;
}

export const Result = React.forwardRef<HTMLDivElement, ResultProps>(
  ({ className, status = "info", title, description, extra, icon, ...props }, ref) => {
    return (
      <section
        ref={ref}
        role="status"
        className={cn(
          "flex w-full flex-col items-center gap-3 rounded-lg border border-border bg-card px-6 py-8 text-center text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        <div>{icon ?? getDefaultIcon(status)}</div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        {description ? <p className="max-w-xl text-sm text-muted-foreground">{description}</p> : null}
        {extra ? <div className="mt-1 inline-flex items-center gap-2">{extra}</div> : null}
      </section>
    );
  }
);

Result.displayName = "Result";
