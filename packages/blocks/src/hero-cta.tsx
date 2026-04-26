import { Badge } from "./primitives/badge";
import { Button } from "./primitives/button";
import { Card, CardContent, CardHeader, CardTitle } from "./primitives/card";

export interface HeroCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

export function HeroCta({
  eyebrow = "Marketing blocks",
  title = "Ship FormaUI faster",
  description = "Compose polished launch pages with installable blocks, shared tokens, and production-ready defaults.",
  primaryCtaLabel = "Start building",
  secondaryCtaLabel = "Book a live demo"
}: HeroCtaProps) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <Badge className="w-fit">{eyebrow}</Badge>
        <CardTitle className="text-3xl leading-tight md:text-4xl">{title}</CardTitle>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button>{primaryCtaLabel}</Button>
        <Button variant="outline">{secondaryCtaLabel}</Button>
      </CardContent>
    </Card>
  );
}
