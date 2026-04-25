import { SearchCommand } from "./composites/search-command";
import { demoNotifications, type DemoNotification } from "./data/demo-data";
import { Badge } from "./primitives/badge";
import { Button } from "./primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";

export interface NotificationPanelProps {
  notifications?: DemoNotification[];
  title?: string;
  description?: string;
}

function notificationVariant(level: DemoNotification["level"]) {
  if (level === "critical") {
    return "destructive" as const;
  }
  if (level === "success") {
    return "default" as const;
  }
  return "secondary" as const;
}

export function NotificationPanel({
  notifications = demoNotifications,
  title = "Notifications",
  description = "Critical updates and workspace events from the last 24 hours."
}: NotificationPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SearchCommand
          title="Quick actions"
          items={[
            { id: "mute", label: "Mute non-critical alerts", shortcut: "M" },
            { id: "digest", label: "Send daily digest", shortcut: "D" },
            { id: "assign", label: "Assign incident owner", shortcut: "A" }
          ]}
        />

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col gap-3 rounded-md border border-border p-3 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.summary}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={notificationVariant(notification.level)}>{notification.level}</Badge>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
