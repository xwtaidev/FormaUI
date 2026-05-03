"use client";

import * as React from "react";
import { Affix, Backtop, Button } from "@formaui/components";

export function AffixInteractiveDemo() {
  return (
    <div className="w-full max-w-4xl rounded-lg border border-fd-border bg-background p-4">
      <Affix offsetTop={12}>
        <div className="rounded-md border border-fd-border bg-fd-muted/30 p-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">筛选工具栏</p>
            <Button size="sm">Quick Action</Button>
          </div>
        </div>
      </Affix>
      <div className="mt-4 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md border border-fd-border p-3 text-sm text-fd-muted-foreground"
          >
            内容区块 {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AffixFilterCaseDemo() {
  const [affixed, setAffixed] = React.useState(false);

  return (
    <div className="w-full max-w-xl space-y-2">
      <Affix offsetTop={8} onChange={setAffixed}>
        <Button size="sm" variant="outline">
          筛选条件
        </Button>
      </Affix>
      <p className="text-xs text-fd-muted-foreground">
        当前状态：{affixed ? "已固定" : "未固定"}
      </p>
    </div>
  );
}

export function BacktopInteractiveDemo() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-fd-border bg-background">
      <div ref={containerRef} className="h-[320px] overflow-y-auto p-4">
        <div className="space-y-3">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md border border-fd-border p-3 text-sm text-fd-muted-foreground"
            >
              长内容段落 {i + 1}
            </div>
          ))}
        </div>
      </div>
      <Backtop
        visibilityHeight={120}
        target={() => containerRef.current}
        className="!absolute !bottom-4 !right-4"
      />
    </div>
  );
}

export function BacktopLongPageCaseDemo() {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative w-full max-w-xl rounded-lg border border-fd-border">
      <div ref={panelRef} className="h-[260px] overflow-y-auto p-4">
        <div className="space-y-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <p key={i} className="text-sm text-fd-muted-foreground">
              第 {i + 1} 段内容：用于模拟长列表滚动区域。
            </p>
          ))}
        </div>
      </div>
      <Backtop
        visibilityHeight={100}
        target={() => panelRef.current}
        className="!absolute !bottom-3 !right-3 h-9 w-9"
      />
    </div>
  );
}
