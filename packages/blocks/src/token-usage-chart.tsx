import { Badge } from "./primitives/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";

import { demoTokenUsage } from "./data/demo-data";

export function TokenUsageChart() {
  const maxValue = Math.max(...demoTokenUsage.map((point) => point.value));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>Token usage</CardTitle>
            <CardDescription>Last 7 days consumption across all agents.</CardDescription>
          </div>
          <Badge variant="outline">7D</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {demoTokenUsage.map((point) => (
            <div key={point.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{point.label}</span>
                <span>{point.value}k</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${(point.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
