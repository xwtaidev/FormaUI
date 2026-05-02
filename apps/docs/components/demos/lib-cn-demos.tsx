"use client";

import { cn } from "@formaui/components";

const statusClass = cn(
  "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
  true && "bg-emerald-100 text-emerald-800",
  false && "bg-red-100 text-red-800"
);

const mergedButtonClass = cn(
  "rounded-md bg-zinc-900 px-4 py-2 text-white",
  "bg-zinc-800",
  "px-3",
  "bg-primary text-primary-foreground"
);

const cardClass = cn(
  "rounded-lg border p-3 text-sm",
  "border-zinc-200",
  "border-fd-border",
  "bg-zinc-50",
  "bg-background"
);

export function LibCnInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className={cardClass}>
          <p className="mb-2 font-medium">条件类名</p>
          <span className={statusClass}>状态：Success</span>
        </div>

        <div className={cardClass}>
          <p className="mb-2 font-medium">冲突覆盖</p>
          <button type="button" className={mergedButtonClass}>
            主按钮
          </button>
        </div>

        <div className={cardClass}>
          <p className="mb-2 font-medium">输出稳定</p>
          <code className="text-xs text-muted-foreground">twMerge(clsx(...))</code>
        </div>
      </div>
    </div>
  );
}

export function StatusPillDemo() {
  const className = cn(
    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
    "bg-amber-100 text-amber-800",
    true && "bg-emerald-100 text-emerald-800"
  );

  return <span className={className}>已上线</span>;
}

export function OverrideButtonDemo() {
  const className = cn(
    "rounded-md bg-zinc-800 px-2 py-2 text-white",
    "px-5",
    "bg-primary text-primary-foreground"
  );

  return (
    <button type="button" className={className}>
      立即体验
    </button>
  );
}

export function ListRowDemo() {
  const rowClass = cn(
    "flex items-center justify-between rounded-md border px-3 py-2 text-sm",
    "border-fd-border",
    "bg-background"
  );

  return (
    <div className="w-full max-w-md space-y-2">
      <div className={rowClass}>
        <span>工单 #1048</span>
        <span className="text-muted-foreground">处理中</span>
      </div>
      <div className={rowClass}>
        <span>工单 #1049</span>
        <span className="text-muted-foreground">已完成</span>
      </div>
    </div>
  );
}
