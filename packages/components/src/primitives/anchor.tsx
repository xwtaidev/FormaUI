import * as React from "react";

import { cn } from "../lib/cn";

export interface AnchorItem {
  key: string;
  href: string;
  title: React.ReactNode;
}

export interface AnchorProps extends React.HTMLAttributes<HTMLElement> {
  items: AnchorItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  offsetTop?: number;
}

export const Anchor = React.forwardRef<HTMLElement, AnchorProps>(
  ({ className, items, value, defaultValue, onValueChange, offsetTop = 0, ...props }, ref) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? items[0]?.key ?? "");
    const active = isControlled ? value ?? "" : internalValue;

    const commit = (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    };

    return (
      <nav ref={ref} className={cn("rounded-lg border border-border bg-card p-3 text-card-foreground", className)} {...props}>
        <ul className="space-y-1">
          {items.map((item) => {
            const selected = item.key === active;
            return (
              <li key={item.key}>
                <a
                  href={item.href}
                  aria-current={selected ? "location" : undefined}
                  className={cn(
                    "block rounded-md px-2.5 py-1.5 text-sm transition-colors hover:bg-muted",
                    selected ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    commit(item.key);
                    if (typeof window === "undefined") {
                      return;
                    }
                    if (!item.href.startsWith("#")) {
                      return;
                    }
                    const target = document.getElementById(item.href.slice(1));
                    if (!target) {
                      return;
                    }
                    const top = target.getBoundingClientRect().top + window.scrollY - offsetTop;
                    window.scrollTo({ top, behavior: "smooth" });
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
);

Anchor.displayName = "Anchor";
