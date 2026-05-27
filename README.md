# Automated Payroll — Wireframe

This repository is **wireframe / proposal only**: a production-grade interactive wireframe app and shared UI packages for client demos and flow alignment before real development.

## Companion repo (production app)

The real payroll application lives in a **separate** repository:

- **Path:** `~/Documents/automated-payroll-system`
- **Purpose:** SvelteKit app, API integration, and production features when requirements exist.

Open both together in Cursor via `~/Documents/automated-payroll.code-workspace`.

## Quick start

```bash
pnpm install
pnpm dev          # wireframe app → http://127.0.0.1:4570
pnpm quality:fast
pnpm test:unit
pnpm test:e2e
```

## Structure

- `wireframe/` — runnable prototype viewer
- `packages/ui` — reusable UI components
- `packages/contracts` — modules, routes, test selectors
- `packages/mock-data` — fixtures for demos and tests

See [docs/architecture.md](docs/architecture.md).

## Live demo (GitHub Pages)

After deployment is enabled on `main`, the wireframe is published as a static site at:

`https://<your-github-username>.github.io/automated-payroll-wireframe/`

Example entry point: `.../automated-payroll-wireframe/auth/login`

**GitHub setup (manual):** [docs/github-pages-manual-setup.md](docs/github-pages-manual-setup.md)

**Local Pages-shaped build:**

```bash
pnpm build:pages
pnpm preview:pages
```

## Demo login (reference screen)

- Email: `admin@wireframe.local`
- Password: `Wireframe1!`
