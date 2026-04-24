import { Badge } from "../primitives/badge";

export interface StatusBadgeProps {
  status: "online" | "offline" | "warning" | "error";
}

const LABELS: Record<StatusBadgeProps["status"], string> = {
  online: "Online",
  offline: "Offline",
  warning: "Warning",
  error: "Error"
};

const VARIANTS: Record<StatusBadgeProps["status"], "default" | "secondary" | "outline" | "destructive"> = {
  online: "default",
  offline: "secondary",
  warning: "outline",
  error: "destructive"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={VARIANTS[status]}>{LABELS[status]}</Badge>;
}
