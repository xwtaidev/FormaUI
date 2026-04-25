import { Badge } from "./primitives/badge";
import { Button } from "./primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";

import { demoAgentRuns } from "./data/demo-data";

function runStatusVariant(status: "success" | "running" | "failed") {
  if (status === "success") {
    return "default" as const;
  }
  if (status === "running") {
    return "secondary" as const;
  }
  return "destructive" as const;
}

export function AgentRunTimeline() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>Agent runs</CardTitle>
            <CardDescription>Recent executions and their current status.</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View all runs
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {demoAgentRuns.map((run) => (
          <div key={run.id} className="rounded-md border border-border p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{run.agent}</p>
                <p className="text-sm text-muted-foreground">{run.task}</p>
                <p className="text-xs text-muted-foreground">Started at {run.startedAt}</p>
              </div>
              <Badge variant={runStatusVariant(run.status)}>{run.status}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
