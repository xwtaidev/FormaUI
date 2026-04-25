# FormaUI

A source-owned design system for composing and shipping modern SaaS and AI product interfaces.

FormaUI is not a traditional component library. It gives developers the source code of components, product blocks, templates, themes, and registry metadata so product teams can own and adapt their interfaces.

## Quick Start (v0.2)

```bash
npx formaui init
npx formaui add button
npx formaui block add dashboard-shell
npx formaui template add ai-console-lite
```

## CLI Discoverability

```bash
npx formaui list
npx formaui search dashboard
npx formaui info model-selector
npx formaui doctor
```

## Common Flags

- `--cwd <path>`
- `--yes`
- `--registry <url|path>`
- `--dry-run`

## Official Examples

- `examples/next-app`
- `examples/vite-app`

## Docs

- Docs app: `apps/docs`
- Release notes: `docs/releases/v0.2.md`
- Migration guide: `apps/docs/app/migration-v0.1-to-v0.2/page.mdx`
