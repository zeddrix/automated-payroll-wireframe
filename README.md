# Automated Payroll — Wireframe

This repository is **wireframe / proposal only**: a low-fidelity interactive app and shared UI packages for client demos and flow alignment before real development.

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
- `packages/ui` — reusable low-fi components
- `packages/contracts` — modules, routes, test selectors
- `packages/mock-data` — fixtures for demos and tests

See [docs/architecture.md](docs/architecture.md).

## Demo login (reference screen)

- Email: `admin@wireframe.local`
- Password: `Wireframe1!`
