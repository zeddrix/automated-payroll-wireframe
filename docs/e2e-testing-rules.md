# E2E Testing Rules

This project follows ATDD — E2E acceptance tests are written before production code to define expected behavior.

**Note:** These standards were inherited from the queue production app and adapted for this wireframe-only repository. There is no Supabase, Lemon Squeezy, webhooks, or production database in scope here.

## Wireframe repository scope

- **App**: Runnable payroll wireframe in `wireframe/` (SvelteKit), shared UI in `packages/ui`, stable selectors in `packages/contracts` (`@aps/contracts`).
- **State**: Mock session and wireframe preferences live in `sessionStorage` (e.g. `wireframe-demo-look`, `wireframe-viewport-preview`) — not a real backend.
- **E2E server**: Port **4570** (see [`playwright.config.ts`](../playwright.config.ts)).
- **Helpers**: [`tests/e2e/fixtures/test-helpers.ts`](../tests/e2e/fixtures/test-helpers.ts) — `gotoModuleTab`, `waitForPageLoad`, `resetWireframeSession`, navigation helpers.
- **Future**: When shared comboboxes are added to the wireframe, require ≥2-action helpers in `test-helpers.ts` (open control → select option → assert outcome); do not add visibility-only dropdown smoke tests.

## Core Philosophy

**Test REAL user journeys, not element existence.** Every E2E test must simulate what a user actually does — clicking, typing, navigating, submitting — and verify meaningful outcomes. If a test only checks that an element is visible without any user action, it belongs in a unit test or shouldn't exist at all.

## Mandatory Rules

### 1. Every test must have multiple user actions AND verify an outcome

A test that only asserts visibility proves nothing. Every test must include at least 2 user actions (click, type, navigate, submit) and verify that something meaningful happened (data saved, state changed, page navigated, error displayed).

### 2. No external checkout or payment flows

**Not applicable in this repo.** The wireframe has no Lemon Squeezy, Stripe, or subscription checkout. Do not add route mocks that fake payment success and then assert on the mock.

### 3. No simulated backend webhooks

**Not applicable in this repo.** There is no webhook handler or external billing events to simulate in E2E.

### 4. Complete UI state verification

When checking a multi-element screen or toggle state, verify **all** relevant elements — not just one. A test that checks `[data-testid="reference-mock-banner"]` is visible but ignores demo hints, subtitles, or navigation chrome is incomplete.

**Examples for wireframe:**

- **Demo look on:** `reference-mock-banner` visible, demo-only hints visible (e.g. `auth-login-demo-hint`), proposal copy in subtitles.
- **Demo look off:** banner and demo hints **hidden**, neutral subtitles (e.g. “Sign in to your account”).
- **Device preview:** `data-device-mode` on the frame, frame screen visible, sidebar vs bottom nav visibility for mobile/desktop/system.
- **Auth forms:** submit disabled/enabled gating, error panel, success panel — not only a single field.

### 5. UI outcome and client persistence after mutations

After any mutation (form submit, toggle, tab change, device preview change), verify the **UI outcome** and, when the feature persists client state, that **`sessionStorage` reflects the change** (via user-visible behavior after reload — not by reading storage in the test; see Banned Patterns).

Example: demo look unchecked → banner hidden → reload → still hidden → check again → banner returns.

There is no database to verify in this repo; use integration tests for pure state modules in `wireframe/src/lib/state/*.svelte.ts`.

### 6. Consolidated test files by feature domain

Group tests by feature domain, not by individual scenario. Canonical wireframe E2E files:

| Domain                       | File                                                             |
| ---------------------------- | ---------------------------------------------------------------- |
| Shell, bootstrap, navigation | `tests/e2e/wireframe/wireframe-shell-and-navigation.e2e.test.ts` |
| Auth hi-fi flows             | `tests/e2e/wireframe/wireframe-auth.e2e.test.ts`                 |
| Admin reference              | `tests/e2e/wireframe/wireframe-admin.e2e.test.ts`                |
| Device preview               | `tests/e2e/wireframe/wireframe-device-preview.e2e.test.ts`       |
| Demo look toggle             | `tests/e2e/wireframe/wireframe-demo-look.e2e.test.ts`            |

Do NOT create one file per scenario (e.g. separate files for “footer link”, “tab click”, “banner visible”).

### 7. No duplicate coverage across files

If File A tests “mobile bottom nav to payroll approval”, File B must NOT repeat the same journey. Each behavior has a single canonical home.

### 8. State isolation with beforeEach resets

Every test file that modifies shared client state (demo look, viewport preview, mock sign-in) MUST reset in `beforeEach` — not just `afterAll`. The default Playwright worker count is **1** (see `playwright.config.ts`; override with `PW_WORKERS`).

```typescript
// GOOD: Reset before EACH test
test.beforeEach(async ({ page }) => {
  await resetWireframeSession(page);
  await gotoModuleTab(page, 'auth', 'login');
});

// BAD: Only reset after all tests (later tests see dirty sessionStorage)
test.afterAll(async ({ page }) => {
  await resetWireframeSession(page);
});
```

Use `resetWireframeSession` from [`tests/e2e/fixtures/test-helpers.ts`](../tests/e2e/fixtures/test-helpers.ts) to clear `sessionStorage` / `localStorage` when needed.

### 9. Feature gating tests must verify the full gate-to-access cycle

When a wireframe screen gates an action (e.g. submit disabled until form valid), verify the full cycle: invalid input → submit disabled → valid input → submit enabled → submit → success or error outcome. Do not stop at “button is visible.”

### 10. Use data-testid selectors, avoid strict mode violations

Always use `[data-testid="..."]` selectors from `@aps/contracts` for key elements. Avoid `getByText()` or CSS selectors that match multiple elements — Playwright's strict mode will reject them. When `getByText()` is necessary, scope it to a specific container or use `.first()` only when semantically correct.

```typescript
// GOOD
page.locator('[data-testid="auth-login-panel"]');
page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`);

// BAD — matches multiple elements, strict mode violation
page.getByText('Sign in');
page.locator('button:has-text("Submit")');
```

## Banned Patterns

These patterns indicate shallow tests that waste CI time and give false confidence.

### "Page title contains X"

```typescript
// BAD — unit test territory
test('login has correct title', async ({ page }) => {
  await page.goto('/auth/login');
  await expect(page).toHaveTitle(/Login/);
});
```

### "Button is visible" with no action

```typescript
// BAD — proves nothing about functionality
test('sign-in button is visible', async ({ page }) => {
  await page.goto('/auth/login');
  await expect(page.locator('[data-testid="auth-login-submit"]')).toBeVisible();
});
```

### "Element has text X" with no preceding user action

```typescript
// BAD — static HTML check, not a user journey
test('shows mock banner', async ({ page }) => {
  await page.goto('/auth/login');
  await expect(page.locator('[data-testid="reference-mock-banner"]')).toBeVisible();
});
```

### Route interception that returns fake data then "verifies" it

```typescript
// BAD — tests your mock, not your app
test('fake API success', async ({ page }) => {
  await page.route('**/api/payroll/**', (route) =>
    route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
  );
  await page.locator('[data-testid="run-payroll"]').click();
  await expect(page.getByText('Payroll complete')).toBeVisible();
});
```

### Testing CSS classes or computed styles

```typescript
// BAD — visual regression tools exist for this
test('button has correct color', async ({ page }) => {
  const btn = page.locator('[data-testid="auth-login-submit"]');
  await expect(btn).toHaveCSS('background-color', 'rgb(37, 99, 235)');
});
```

### Testing localStorage/sessionStorage values

```typescript
// BAD — implementation detail
test('stores demo look in sessionStorage', async ({ page }) => {
  await page.evaluate(() => sessionStorage.getItem('wireframe-demo-look'));
});
```

Prefer reload + visible UI assertions to prove persistence.

## Required Patterns

These patterns produce meaningful, reliable E2E tests.

### Multi-step journey: action → result → consequence

```typescript
test('demo look off hides banner and persists after reload', async ({ page }) => {
  await gotoModuleTab(page, 'auth', 'login');

  await page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`).uncheck();
  await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeHidden();

  await page.reload();
  await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeHidden();

  await page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`).check();
  await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();
});
```

### Form gating: invalid → disabled → valid → submit → outcome

```typescript
test('sign-up submit disabled until valid then success', async ({ page }) => {
  await gotoModuleTab(page, 'auth', 'sign-up');
  await expect(page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`)).toBeDisabled();

  await page.locator(`[data-testid="${selectors.authSignUpName}"]`).fill('Jane Doe');
  // ... fill remaining fields, check terms ...
  await page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`).click();
  await expect(page.locator(`[data-testid="${selectors.authSignUpSuccess}"]`)).toBeVisible();
});
```

### Navigation journey: shell chrome → route → panel

```typescript
test('sidebar employees opens directory panel', async ({ page }) => {
  await gotoModuleTab(page, 'auth', 'login');
  await clickSidebar(page, 'employees');
  await expect(page).toHaveURL(/\/employees\/directory/);
  await expect(page.locator(`[data-testid="${selectors.employeesDirectoryPanel}"]`)).toBeVisible();
});
```

## Prevention Rules

### 11. Pre-commit checklist for every new test

Before any E2E test is considered done, it must pass ALL of these gates:

- Does every `test()` block have ≥2 user actions (click/type/submit/navigate)?
- Does every `test()` verify an **outcome** (data saved, state changed, page navigated, error displayed) — not just element visibility?
- Could this test be a unit test instead? (If it only checks static HTML/CSS/meta tags → delete it, write a unit test if needed)
- Is there already a test in the same file that navigates to the same page? If yes → add assertions to that existing test instead of creating a new `test()` block.
- If the test drives a combobox (when added to wireframe), does it use a helper with ≥2 actions and a meaningful outcome?

### 12. Consolidation-first — no new files without justification

Before creating a new `.e2e.test.ts` file:

1. Search for existing files in the same feature domain (e.g. `tests/e2e/wireframe/`)
2. If one exists, add your tests to it under a new `test.describe()` block
3. New files are only justified when: (a) no existing file covers this domain, or (b) the existing file would exceed ~50 tests and splitting by sub-domain makes sense
4. Never create a file with fewer than 3 tests — those tests belong in an existing file

### 13. Merge same-page checks into consolidated tests

When 3+ assertions all require navigating to the same page:

- Use ONE `test()` that navigates once and asserts multiple things
- Use `test.describe()` with `test.beforeEach()` for shared navigation when tests need different user actions on the same page
- Never create separate `test()` blocks that each navigate to the same URL just to check one element

```typescript
// GOOD: One navigation, multiple assertions
test('auth login shell shows panel, tabs, and demo banner when enabled', async ({ page }) => {
  await gotoModuleTab(page, 'auth', 'login');
  await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
  await expect(page.locator(`[data-testid="${selectors.moduleTabs}"]`)).toBeVisible();
  await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();
  await page.locator(`[data-testid="${selectors.moduleTab('sign-up')}"]`).click();
  await expect(page).toHaveURL(/\/auth\/sign-up/);
});

// BAD: 3 separate tests, 3 separate navigations to same page
test('shows login panel', async ({ page }) => { ... });
test('shows tabs', async ({ page }) => { ... });
test('shows banner', async ({ page }) => { ... });
```

## Test Organization

### File naming

- E2E tests: `*.e2e.test.ts`
- Group by feature domain: `wireframe-auth.e2e.test.ts`, not `auth-footer-link.e2e.test.ts`

### When to use serial vs parallel

- **`test.describe.serial`**: When tests mutate shared state and depend on execution order within one file
- **Default (parallel)**: When tests are independent — each resets its own state in `beforeEach`

### Worker count

Pass **Playwright CLI options before** the test path or filter. Options placed after the path are treated as **grep filters**, not flags — for example `playwright test tests/e2e/wireframe/foo.e2e.test.ts --workers=3` often leaves worker count at the config default.

- **One file:** `pnpm test:e2e:one -- tests/e2e/wireframe/wireframe-auth.e2e.test.ts`
- **With workers:** `pnpm test:e2e:one -- --workers=2 tests/e2e/wireframe/wireframe-auth.e2e.test.ts` (note the `--` then **options** then path)

Default `PW_WORKERS` is **1** in [`playwright.config.ts`](../playwright.config.ts). If a directory run fails intermittently, retry with `--workers=1` before the path.

### Playwright dev server reuse (port 4570)

Locally, `playwright.config.ts` may **reuse** an existing dev server on port **4570** (`reuseExistingServer` when not in CI and `PW_DISABLE_REUSE_SERVER` is unset). Prefer a single dev server, or set `PW_DISABLE_REUSE_SERVER=1` to force Playwright to spawn `pnpm -C wireframe dev --port 4570` itself.

**Optional env overrides:** `PW_RETRIES` (default `0`), `PW_WORKERS` (default `1` when unset).

Wait for shell hydration via `waitForPageLoad` — it asserts `[data-testid="app-shell"][data-client-ready="true"]`.

### Helper functions over inline setup

Extract repeated setup into [`tests/e2e/fixtures/test-helpers.ts`](../tests/e2e/fixtures/test-helpers.ts):

```typescript
// GOOD — reusable, named
await resetWireframeSession(page);
await gotoModuleTab(page, 'auth', 'login');
await clickSidebar(page, 'employees');

// BAD — duplicated goto/wait logic in every test
await page.goto('/auth/login');
await page.waitForLoadState('domcontentloaded');
```

### Demo look on future modules

As new low-fi screens are added, gate proposal/demo copy with `DemoCopy` or `demoLook.enabled` the same way as auth and admin overview. Document new selectors in `packages/contracts`.
