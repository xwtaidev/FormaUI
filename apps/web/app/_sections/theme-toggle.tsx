"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const order = ["light", "dark", "system"] as const;

function getNext(current: string): string {
  const idx = order.indexOf(current as typeof order[number]);
  if (idx < 0) return "system";
  return String(order[(idx + 1) % order.length]);
}

function getIcon(theme: string): React.ReactNode {
  switch (theme) {
    case "light":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case "dark":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
  }
}

const labels: Record<string, string> = { light: "Light", dark: "Dark", system: "System" };

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = theme ?? "system";
  const next = getNext(current);

  return (
    <button
      onClick={() => setTheme(next)}
      className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--landing-muted)] transition hover:text-[var(--landing-foreground)]"
      aria-label={`Switch to ${labels[next] ?? next} theme`}
      title={`${labels[next] ?? next} mode`}
    >
      {mounted ? getIcon(current) : getIcon("system")}
    </button>
  );
}
