# FormaUI

A source-owned design system for composing and shipping modern SaaS and AI product interfaces.

FormaUI is not a traditional component library. It gives developers the source code of components, product blocks, templates, themes, and registry metadata so product teams can own and adapt their interfaces.

## Quick Start (v0.4)

```bash
npx formaui init
npx formaui list components --category form
npx formaui search table --scenario dashboard
npx formaui pack add dashboard-foundation
npx formaui pack add marketing-launch
npx formaui add date-range-picker
```

## Capability Snapshot (v0.4)

- 36 installable components (24 base + 12 new in v0.3)
- 17 installable blocks and 3 templates
- 4 official packs: `dashboard-foundation`, `data-entry`, `feedback-loading`, `marketing-launch`
- Registry v3 metadata: `category`, `scenarios`, `complexity`, `stability`
- CLI pack workflow: `pack list`, `pack info`, `pack add`
- Official landing route with reusable marketing composition: `/landing` in docs app
- Landing authoring docs: `/landing/architecture` and `/landing/reuse-blocks`

## CLI Discoverability

```bash
npx formaui list
npx formaui search dashboard
npx formaui info model-selector
npx formaui pack list
npx formaui pack info data-entry
npx formaui doctor
```

## Common Flags

- `--cwd <path>`
- `--yes`
- `--registry <url|path>`
- `--dry-run`
- `--category <name>`
- `--scenario <name>`

## Official Examples

- `examples/next-app`
- `examples/vite-app`

## Docs

- Docs app: `apps/docs`
- Landing docs routes:
  - `apps/docs/app/landing/page.tsx`
  - `apps/docs/app/landing/architecture/page.mdx`
  - `apps/docs/app/landing/reuse-blocks/page.mdx`
- Release notes: `docs/releases/v0.1.md`, `docs/releases/v0.2.md`, `docs/releases/v0.3.md`
- Migration guides:
  - `apps/docs/app/migration-v0.1-to-v0.2/page.mdx`
  - `apps/docs/app/migration-v0.2-to-v0.3/page.mdx`
