import Link from "next/link";

export default function DocsHomePage() {
  return (
    <div className="space-y-6">
      <h1>FormaUI Documentation</h1>
      <p>
        FormaUI is a source-owned design system for React teams. The docs below cover installation, quick
        start, design system foundations, components, blocks, templates, CLI commands, and registry schema.
      </p>
      <ul>
        <li>
          <Link href="/introduction">Read introduction</Link>
        </li>
        <li>
          <Link href="/quick-start">Open quick start</Link>
        </li>
        <li>
          <Link href="/cli">Review CLI commands</Link>
        </li>
      </ul>
    </div>
  );
}
