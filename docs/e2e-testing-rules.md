# E2E Testing Rules

This project follows ATDD — E2E acceptance tests define expected behavior before (or alongside) implementation.

## Core Philosophy

**Test real user journeys, not element existence.** Every E2E test must include user actions (click, type, navigate, submit) and verify meaningful outcomes (state changed, navigated, error shown, data visible).

## Mandatory Rules

### 1. Multiple user actions and an outcome

At least **2 user actions** per `test()` and verification that something meaningful happened — not visibility-only checks.

### 2. Stable selectors

Use `[data-testid="..."]` from `packages/contracts/src/selectors.ts`. Avoid unscoped `getByText()` that triggers strict-mode violations.

### 3. Consolidated files by domain

Group tests by feature (`wireframe-shell`, `auth-login-reference`, `navigation-contract`). Prefer adding to an existing file over creating a one-scenario file. New files need **≥3 tests** unless the domain is unique.

### 4. Merge same-page checks

One navigation per URL when asserting multiple static elements; use `test.describe` + `beforeEach` when steps differ.

### 5. State isolation

Reset mock auth and UI state in `beforeEach` with idempotent helpers. Tests must not depend on order across files.

### 6. No shallow patterns

Banned: title-only checks, single visibility asserts with no action, CSS color tests, localStorage-only asserts.

### 7. Pre-commit checklist

- ≥2 actions + outcome per test?
- Could this be a unit test instead?
- Duplicate navigation to the same URL elsewhere in the file?
- Selectors from the shared contract?

## File naming

`*.e2e.test.ts` only.

## Running tests

```bash
pnpm test:e2e:one -- tests/e2e/wireframe/wireframe-shell.e2e.test.ts
```

Flags before the path: `pnpm test:e2e:one -- --workers=1 tests/e2e/...`

Wireframe app base URL: `http://127.0.0.1:4570` (Playwright starts dev server automatically unless reused).

## Phase 1 scope

No real backend, payments, or external webhooks. Use mock fixtures from `@aps/mock-data`. Cross-system DB verification applies only when a real API exists in later phases.
