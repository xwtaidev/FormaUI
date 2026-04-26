import { Card, CardContent } from "./primitives/card";

const DEFAULT_STATS = [
  { label: "Components", value: "36+" },
  { label: "Blocks", value: "14+" },
  { label: "Templates", value: "3" },
  { label: "Packs", value: "3+" }
] as const;

export interface StatsStripProps {
  title?: string;
  description?: string;
  stats?: ReadonlyArray<{ label: string; value: string }>;
}

export function StatsStrip({
  title = "Trusted by source-owned product teams",
  description = "FormaUI gives engineering teams a practical baseline for docs, product surfaces, and growth pages.",
  stats = DEFAULT_STATS
}: StatsStripProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="space-y-1 py-6">
              <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
