import { Badge } from "./primitives/badge";
import { Button } from "./primitives/button";
import { Card, CardContent, CardHeader, CardTitle } from "./primitives/card";

export interface FinalCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
}

export function FinalCta({
  eyebrow = "Ready when you are",
  title = "Ready to launch your next page with FormaUI?",
  description = "Install reusable assets, keep source ownership, and ship updates without waiting on hosted lock-in.",
  primaryCtaLabel = "Open Quick Start",
  secondaryCtaLabel = "Browse Docs",
  primaryCtaHref,
  secondaryCtaHref
}: FinalCtaProps) {
  const PrimaryButton = <Button>{primaryCtaLabel}</Button>;
  const SecondaryButton = <Button variant="outline">{secondaryCtaLabel}</Button>;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="space-y-3">
        <Badge variant="secondary" className="w-fit">
          {eyebrow}
        </Badge>
        <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {primaryCtaHref ? <form action={primaryCtaHref}>{PrimaryButton}</form> : PrimaryButton}
        {secondaryCtaHref ? <form action={secondaryCtaHref}>{SecondaryButton}</form> : SecondaryButton}
      </CardContent>
    </Card>
  );
}
