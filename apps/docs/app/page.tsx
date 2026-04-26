import React from "react";
import Link from "next/link";

const coverageRows = [
  { kind: "Components", count: 36, href: "/components/accordion" },
  { kind: "Blocks", count: 17, href: "/blocks/dashboard-shell" },
  { kind: "Templates", count: 3, href: "/templates/ai-console-lite" },
  { kind: "CLI Guides", count: 2, href: "/cli" },
  { kind: "Migration Guides", count: 3, href: "/migration-v0.4-to-v0.5" }
];

export default function DocsHomePage() {
  return (
    <div className="space-y-8">
      <h1>FormaUI Documentation</h1>
      <p>
        FormaUI v0.5 documentation is now focused on implementation workflows: installation, components, blocks,
        templates, CLI, registry, and migration guides. Marketing and brand storytelling routes now live in the
        dedicated web app.
      </p>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="m-0 text-xl font-semibold">Coverage Matrix</h2>
        <p className="m-0 text-sm text-slate-600">Built from the current registry index (`registry/index.json`).</p>
        <ul className="m-0 list-disc space-y-2 pl-5">
          {coverageRows.map((row) => (
            <li key={row.kind}>
              <Link href={row.href} className="font-medium">
                {row.kind}
              </Link>
              : {row.count}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="m-0 text-xl font-semibold">Start Here</h2>
        <ul>
          <li>
            <Link href="/installation">Installation</Link>
          </li>
          <li>
            <Link href="/components/accordion">Components</Link>
          </li>
          <li>
            <Link href="/blocks/dashboard-shell">Blocks</Link>
          </li>
          <li>
            <Link href="/templates/ai-console-lite">Templates</Link>
          </li>
          <li>
            <Link href="/cli/commands">CLI commands</Link>
          </li>
          <li>
            <Link href="/registry">Registry reference</Link>
          </li>
          <li>
            <Link href="/migration-v0.4-to-v0.5">Migration v0.4 to v0.5</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
