import * as React from "react";
import { ChevronUp } from "lucide-react";

import { cn } from "../lib/cn";
import { Button } from "./button";

type ScrollTarget = Window | HTMLElement;

function isWindowTarget(target: ScrollTarget): target is Window {
  return "document" in target;
}

export interface BacktopProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  visibilityHeight?: number;
  target?: () => ScrollTarget | null;
  onClick?: () => void;
}

function getScrollTop(target: ScrollTarget) {
  if (isWindowTarget(target)) {
    return target.scrollY || target.document.documentElement.scrollTop || 0;
  }
  return target.scrollTop;
}

function scrollToTop(target: ScrollTarget) {
  if (isWindowTarget(target)) {
    target.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  target.scrollTo({ top: 0, behavior: "smooth" });
}

export const Backtop = React.forwardRef<HTMLButtonElement, BacktopProps>(
  ({ className, visibilityHeight = 400, target, onClick, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      if (typeof window === "undefined") {
        return;
      }
      const container = target?.() ?? window;
      if (!container) {
        return;
      }

      const handleScroll = () => {
        setVisible(getScrollTop(container) > visibilityHeight);
      };

      handleScroll();
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }, [target, visibilityHeight]);

    if (!visible) {
      return null;
    }

    return (
      <Button
        ref={ref}
        type="button"
        size="icon"
        variant="secondary"
        className={cn("fixed bottom-6 right-6 h-10 w-10 rounded-full shadow-lg", className)}
        aria-label="Back to top"
        onClick={() => {
          const container = target?.() ?? (typeof window !== "undefined" ? window : null);
          if (container) {
            scrollToTop(container);
          }
          onClick?.();
        }}
        {...props}
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    );
  }
);

Backtop.displayName = "Backtop";
