import * as React from "react";

import { cn } from "../lib/cn";

export interface AffixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  offsetTop?: number;
  offsetBottom?: number;
  onChange?: (affixed: boolean) => void;
}

export const Affix = React.forwardRef<HTMLDivElement, AffixProps>(
  ({ className, offsetTop = 0, offsetBottom, onChange, style, children, ...props }, ref) => {
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const [affixed, setAffixed] = React.useState(false);

    const setRefs = (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      if (!ref) {
        return;
      }
      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    };

    React.useEffect(() => {
      if (typeof window === "undefined") {
        return;
      }

      const evaluate = () => {
        const node = wrapperRef.current;
        if (!node) {
          return;
        }
        const rect = node.getBoundingClientRect();
        const topTriggered = rect.top <= offsetTop;
        const bottomTriggered =
          typeof offsetBottom === "number" ? rect.bottom >= window.innerHeight - offsetBottom : false;
        const next = topTriggered || bottomTriggered;
        setAffixed((prev) => {
          if (prev !== next) {
            onChange?.(next);
          }
          return next;
        });
      };

      evaluate();
      window.addEventListener("scroll", evaluate, { passive: true });
      window.addEventListener("resize", evaluate);
      return () => {
        window.removeEventListener("scroll", evaluate);
        window.removeEventListener("resize", evaluate);
      };
    }, [offsetTop, offsetBottom, onChange]);

    return (
      <div
        ref={setRefs}
        className={cn("w-full", affixed && "z-40", className)}
        style={{
          position: "sticky",
          top: offsetTop,
          bottom: offsetBottom,
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Affix.displayName = "Affix";
