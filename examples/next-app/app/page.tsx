"use client";

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

const packSamples = [
  {
    name: "dashboard-foundation",
    command: "npx formaui pack add dashboard-foundation",
    summary: "Search + table + pagination + empty-result handling."
  },
  {
    name: "data-entry",
    command: "npx formaui pack add data-entry",
    summary: "Input, selection, date range and filter-first form flow."
  },
  {
    name: "feedback-loading",
    command: "npx formaui pack add feedback-loading",
    summary: "Skeleton, progress, status, and retry-oriented empty states."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <Badge variant="secondary">Source-owned workflow</Badge>
        <h2 className="text-3xl font-semibold">FormaUI v0.3.5 Validation Surface</h2>
        <p className="max-w-3xl text-muted-foreground">
          This example verifies components, packs, blocks, template composition, and semantic theme tokens in a real
          Next.js app.
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
          <Link href="/saas-starter" className={cn(buttonVariants({ variant: "outline" }))}>
            Open SaaS Starter
          </Link>
          <Link href="/admin-dashboard" className={cn(buttonVariants({ variant: "outline" }))}>
            Open Admin Dashboard
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Pack Scenarios</h3>
        <p className="text-sm text-muted-foreground">
          v0.3.5 introduces scenario-first installation with official packs.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {packSamples.map((pack) => (
            <Card key={pack.name}>
              <CardHeader>
                <CardTitle>{pack.name}</CardTitle>
                <CardDescription>{pack.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <code className="block rounded-md bg-muted px-3 py-2 text-xs">{pack.command}</code>
              </CardContent>
            </Card>
          ))}
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
