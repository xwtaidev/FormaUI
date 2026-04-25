import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  buttonVariants,
  cn
} from "@formaui/components";

const themeSamples = [
  {
    id: "default-light",
    label: "Default / Light",
    className: "",
    description: "Default theme variables in light mode."
  },
  {
    id: "default-dark",
    label: "Default / Dark",
    className: "dark",
    description: "Default theme variables in dark mode."
  },
  {
    id: "avocado-light",
    label: "Avocado / Light",
    className: "",
    theme: "avocado",
    description: "Avocado accent in light mode."
  },
  {
    id: "avocado-dark",
    label: "Avocado / Dark",
    className: "dark",
    theme: "avocado",
    description: "Avocado accent in dark mode."
  }
] as Array<{
  id: string;
  label: string;
  className: string;
  theme?: "avocado";
  description: string;
}>;

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <Badge variant="secondary">Source-owned workflow</Badge>
        <h2 className="text-3xl font-semibold">FormaUI v0.1 Validation Surface</h2>
        <p className="max-w-3xl text-muted-foreground">
          This example verifies components, blocks, template composition, and theme tokens in a real Next.js
          app.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/components" className={cn(buttonVariants({ variant: "default" }))}>
            Open Component Showcase
          </Link>
          <Link href="/blocks" className={cn(buttonVariants({ variant: "outline" }))}>
            Open Block Showcase
          </Link>
          <Link href="/ai-console-lite" className={cn(buttonVariants({ variant: "ghost" }))}>
            Open AI Console Lite
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Theme Preview</h3>
        <p className="text-sm text-muted-foreground">
          Preview both shipped themes (`default`, `avocado`) across light and dark modes.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {themeSamples.map((sample) => (
            <div
              key={sample.id}
              data-theme={sample.theme}
              className={`${sample.className} rounded-xl border border-border bg-background p-5`}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{sample.label}</CardTitle>
                  <CardDescription>{sample.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="outline">
                    Outline
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
