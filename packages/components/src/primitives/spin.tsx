import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "../lib/cn";

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  spinning?: boolean;
  tip?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

const sizeClasses: Record<NonNullable<SpinProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6"
};

export const Spin = React.forwardRef<HTMLDivElement, SpinProps>(
  ({ className, spinning = true, tip, size = "md", delay = 0, children, ...props }, ref) => {
    const [show, setShow] = React.useState(spinning && delay === 0);

    React.useEffect(() => {
      if (!spinning) {
        setShow(false);
        return;
      }
      if (!delay) {
        setShow(true);
        return;
      }
      const timer = window.setTimeout(() => setShow(true), delay);
      return () => window.clearTimeout(timer);
    }, [spinning, delay]);

    return (
      <div ref={ref} className={cn("relative", className)} aria-busy={show} {...props}>
        {children ? <div className={cn(show && "opacity-70")}>{children}</div> : null}
        {show ? (
          <div className={cn("inline-flex items-center gap-2", children && "absolute inset-0 justify-center bg-background/50")}>
            <Loader2 className={cn("animate-spin text-muted-foreground", sizeClasses[size])} />
            {tip ? <span className="text-sm text-muted-foreground">{tip}</span> : null}
          </div>
        ) : null}
      </div>
    );
  }
);

Spin.displayName = "Spin";
