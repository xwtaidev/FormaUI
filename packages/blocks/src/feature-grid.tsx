import { Badge } from "./primitives/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./primitives/card";

const DEFAULT_FEATURES = [
  {
    title: "Composable building blocks",
    description: "Mix and match installable blocks without rewriting primitive interactions."
  },
  {
    title: "Registry-native workflows",
    description: "Ship ready-to-install assets through a single registry source of truth."
  },
  {
    title: "Token-aware defaults",
    description: "Keep visual consistency across docs, templates, and production surfaces."
  },
  {
    title: "CLI-first delivery",
    description: "Bootstrap and compose UI rapidly with predictable, scriptable commands."
  }
] as const;

export interface FeatureGridProps {
  title?: string;
  description?: string;
  features?: ReadonlyArray<{ title: string; description: string }>;
}

export function FeatureGrid({
  title = "Everything teams need to ship",
  description = "Launch-ready workflows for component libraries, docs, and product surfaces.",
  features = DEFAULT_FEATURES
}: FeatureGridProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="space-y-3">
              <Badge variant="secondary" className="w-fit">
                Included
              </Badge>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
