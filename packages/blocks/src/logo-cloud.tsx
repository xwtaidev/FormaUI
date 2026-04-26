import { Card, CardContent, CardHeader, CardTitle } from "./primitives/card";

const DEFAULT_LOGOS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Vite",
  "Turborepo"
] as const;

export interface LogoCloudProps {
  title?: string;
  description?: string;
  logos?: ReadonlyArray<string>;
}

export function LogoCloud({
  title = "Works with your stack",
  description = "Built for modern React teams shipping docs, apps, and design systems in one workspace.",
  logos = DEFAULT_LOGOS
}: LogoCloudProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {logos.map((logo) => (
            <li
              key={logo}
              className="rounded-md border border-border bg-muted/30 px-3 py-2 text-center text-sm font-medium text-foreground"
            >
              {logo}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
