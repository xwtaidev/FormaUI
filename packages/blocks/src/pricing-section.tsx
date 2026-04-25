import { Badge } from "./primitives/badge";
import { Button } from "./primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";

import { demoPlans } from "./data/demo-data";

export function PricingSection() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Pricing that scales with your product</h2>
        <p className="text-sm text-muted-foreground">
          Start simple, then unlock advanced automation and controls as your team grows.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {demoPlans.map((plan) => (
          <Card key={plan.name} className={plan.featured ? "border-primary shadow-md" : undefined}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{plan.name}</CardTitle>
                {plan.name === "Pro" ? <Badge>Pro</Badge> : null}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-semibold text-foreground">{plan.price}</p>
              <Button variant={plan.featured ? "default" : "outline"} className="w-full">
                {plan.ctaLabel}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
