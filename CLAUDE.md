# Claude Code Context

## Project Overview

This repository is **wireframe-only**: low-fidelity interactive flows for an automated payroll system (HR, timekeeping, payroll, approvals). It is for **local development**, **client demos** before build, and **reference** while implementing the real app in the sibling repo `~/Documents/automated-payroll-system`.

Wireframe screens are designed externally (e.g. Corsair U during proposal). This repo provides the shell, reusable low-fi components, and reference screens — not in-app AI wireframe generation.

**Do not add a production payroll app to this repo.** Production code belongs in `automated-payroll-system`.

## Tech Stack

- **Frontend**: Svelte 5, SvelteKit 2, Tailwind CSS 4, TypeScript
- **Layout**: pnpm workspaces (`wireframe/`, `packages/*`)
- **Package manager**: pnpm

## Repository Layout

| Path                 | Purpose                                            |
| -------------------- | -------------------------------------------------- |
| `wireframe/`         | Runnable low-fi prototype / wireframe viewer       |
| `packages/ui`        | Shared low-fi Svelte components                    |
| `packages/contracts` | Module registry, routes, `data-testid` selectors   |
| `packages/mock-data` | Deterministic fixtures for wireframe and tests     |
| `tests/e2e`          | Playwright acceptance tests (`*.e2e.test.ts`)      |
| `tests/unit`         | Vitest unit tests (`*.unit.test.ts`)               |
| `tests/integration`  | Vitest integration tests (`*.integration.test.ts`) |

## Quality Standards

Run `pnpm quality` before the **green phase** of TDD (not required during red/failing tests). Run once in the foreground and wait for completion.

- `pnpm quality` — Prettier, then `svelte-kit sync`, then parallel `svelte-check` + ESLint
- `pnpm quality:fast` — sync + typecheck + lint only (no Prettier)

**All errors and warnings must be resolved properly:**

- No `any` type
- No `@ts-ignore` / `@ts-expect-error`
- No inline eslint-disable comments
- No `<!-- svelte-ignore -->` — fix the underlying issue

### UX Guardrail (forms)

Submit/save buttons should be **disabled** when there is no valid, actionable input (see reference Auth login screen).

Hi-fi auth validation lives in `@aps/mock-data` (Zod schemas). Sign-up enforces standard password policy (8+ chars, letter, number, special). Inline errors appear only after **blur** or **submit** — not on first paint. Sign-up shows a live password requirements checklist while typing; confirm password shows a match hint.

## Testing

Follow:

- [docs/e2e-testing-rules.md](docs/e2e-testing-rules.md)
- [docs/unit-testing-rules.md](docs/unit-testing-rules.md)
- [docs/integration-testing-rules.md](docs/integration-testing-rules.md)

### Naming

- Unit: `*.unit.test.ts`
- Integration: `*.integration.test.ts`
- E2E: `*.e2e.test.ts`
- Mocking the entire data layer → unit test, not integration

### Zero tolerance

- Full `vitest run` and E2E suite must pass with zero failures before work is complete.
- Fix unrelated failures encountered in the same session.
- No silent `test.skip()` unless the environment truly cannot run the test.

### E2E execution

- Default: one file at a time — `pnpm test:e2e:one -- tests/e2e/wireframe/foo.e2e.test.ts`
- Put Playwright CLI flags **before** the file path
- Use `[data-testid="..."]` from `packages/contracts` — avoid brittle text selectors
- Every E2E `test()` needs ≥2 user actions and a meaningful outcome

### E2E server

Wireframe dev server runs on port **4570** (see `playwright.config.ts`). Optional: `PW_DISABLE_REUSE_SERVER=1` for a fresh server per run.

## Reference Codebase

Testing and quality conventions are adapted from the **queue** project (`Documents/queue`). Do not copy queue-specific domain logic (Supabase, Lemon Squeezy, PWA, etc.) into this repo.
