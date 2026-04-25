import Link from "next/link";

const coverageRows = [
  { kind: "Components", count: 36, href: "/components/accordion" },
  { kind: "Blocks", count: 11, href: "/blocks/dashboard-shell" },
  { kind: "Templates", count: 3, href: "/templates/ai-console-lite" },
  { kind: "Themes", count: 2, href: "/theme/default" },
  { kind: "Packs", count: 3, href: "/packs" }
];

export default function DocsHomePage() {
  return (
    <div className="space-y-8">
      <h1>FormaUI Documentation</h1>
      <p>
        FormaUI v0.3.5 completes the source-owned component expansion with pack workflows, migration guidance, and
        validated Next/Vite showcase coverage. This documentation covers installation, migration, CLI workflows,
        registry v3 metadata, and every installable asset.
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
            <Link href="/quick-start">Quick start</Link>
          </li>
          <li>
            <Link href="/cli/commands">CLI commands reference</Link>
          </li>
          <li>
            <Link href="/migration-v0.2-to-v0.3">Migration guide (v0.2 to v0.3)</Link>
          </li>
          <li>
            <Link href="/registry">Registry v3 reference</Link>
          </li>
          <li>
            <Link href="/packs">Pack workflows and scenario bundles</Link>
          </li>
          <li>
            <Link href="/components/data-table-toolbar">New in v0.3.5: Wave C composites</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
