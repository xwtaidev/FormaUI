import { Card, CardContent, CardHeader, CardTitle } from "../primitives/card";

export interface MetricCardProps {
  title: string;
  value: string;
  delta?: string;
  description?: string;
}

export function MetricCard({ title, value, delta, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        {delta ? <p className="text-sm text-primary">{delta}</p> : null}
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </CardContent>
    </Card>
  );
}
