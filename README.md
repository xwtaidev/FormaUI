# FormaUI

A source-owned design system for composing and shipping modern SaaS and AI product interfaces.

FormaUI is not a traditional component library. It gives developers the source code of components, product blocks, templates, themes, and registry metadata so product teams can own and adapt their interfaces.

## Quick Start (v0.5)

```bash
npx formaui init
npx formaui list components --category form
npx formaui search table --scenario dashboard
npx formaui pack add dashboard-foundation
npx formaui pack add marketing-launch
npx formaui add date-range-picker
```

## Capability Snapshot (v0.5)

- 36 installable components (24 base + 12 new in v0.3)
- 17 installable blocks and 3 templates
- 4 official packs: `dashboard-foundation`, `data-entry`, `feedback-loading`, `marketing-launch`
- Registry v3 metadata: `category`, `scenarios`, `complexity`, `stability`
- CLI pack workflow: `pack list`, `pack info`, `pack add`
- Split-site architecture:
  - `apps/web` for brand and growth routes (`/`, `/marketing`, `/product`, `/scenarios`, `/showcase`, `/blog`, `/changelog`)
  - `apps/docs` for implementation documentation (installation, components, blocks, templates, CLI, registry, migration)
- Migration guide for the split: `/migration-v0.4-to-v0.5`

## Site Architecture (v0.5)

- Web app (`apps/web`):
  - Brand and marketing storytelling
  - Product narrative and showcase
  - Blog and changelog promotion pages
  - Canonical routes: `/`, `/marketing`, `/product`, `/scenarios`, `/showcase`, `/blog`, `/changelog`
- Docs app (`apps/docs`):
  - Installation and quick-start
  - Components, blocks, templates
  - CLI, registry, and migration guides
  - Canonical routes: `/installation`, `/components/*`, `/blocks/*`, `/templates/*`, `/cli`, `/registry`, `/migration-v0.4-to-v0.5`

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

- Docs app entry: `apps/docs`
- Web app entry: `apps/web`
- Release notes: `docs/releases/v0.1.md`, `docs/releases/v0.2.md`, `docs/releases/v0.3.md`, `docs/releases/v0.4.md`, `docs/releases/v0.5.md`
- Latest release: `docs/releases/v0.5.md`
- Migration guides:
  - `apps/docs/app/migration-v0.1-to-v0.2/page.mdx`
  - `apps/docs/app/migration-v0.2-to-v0.3/page.mdx`
  - `apps/docs/app/migration-v0.4-to-v0.5/page.mdx`
