import { Badge } from "./primitives/badge";
import { Button } from "./primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";

import { demoApiKeys } from "./data/demo-data";

export function ApiKeyManager() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>API keys</CardTitle>
            <CardDescription>Issue, rotate, and revoke workspace keys.</CardDescription>
          </div>
          <Button size="sm">Create key</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {demoApiKeys.map((keyItem) => (
          <div
            key={keyItem.name}
            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{keyItem.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{keyItem.keyPreview}</p>
              <p className="text-xs text-muted-foreground">
                Created {keyItem.createdAt} · Last used {keyItem.lastUsed}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={keyItem.status === "active" ? "default" : "outline"}>
                {keyItem.status}
              </Badge>
              <Button variant="outline" size="sm">
                Rotate
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
