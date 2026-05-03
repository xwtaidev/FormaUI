"use client";

import { AgentRunTimeline, ModelSelector, TokenUsageChart } from "@formaui/blocks";

export function TokenUsageChartBlockDemo() {
  return (
    <div className="w-full max-w-3xl">
      <TokenUsageChart />
    </div>
  );
}

export function ModelSelectorBlockDemo() {
  return (
    <div className="w-full max-w-4xl">
      <ModelSelector />
    </div>
  );
}

export function AgentRunTimelineBlockDemo() {
  return (
    <div className="w-full max-w-3xl">
      <AgentRunTimeline />
    </div>
  );
}
