# Integration Testing Rules

**Framework:** Vitest (happy-dom for component wiring tests)

## Core Principle

Integration tests verify that **multiple internal units work together** — stores, registries, navigation components, and module views — with realistic workflows.

## Rules

1. Test realistic user workflows across component boundaries.
2. Use real implementations of internal packages (`@aps/contracts`, `@aps/ui`, wireframe state) where possible.
3. Mock only external systems (none in phase 1 wireframe).
4. Verify state synchronization (e.g. mock login → shell shows authenticated indicator).
5. **If the entire database/API layer is mocked → that is a unit test**, not integration.
6. Label files `*.integration.test.ts` only for true integration scope.

## When to write integration tests

**Do:** module registry + route builder, navigation shell + contracts, wireframe UI state + shell behavior.

**Do not:** single pure functions (use unit tests), full browser journeys (use E2E).

## Organization

```
tests/integration/
  workspace/
  ui/
  wireframe/
```

## Setup

Use `@vitest-environment happy-dom` in files that render Svelte components. Clear mocks in `afterEach`.

## Summary

Integration tests complement unit and E2E tests. They prove internal wiring works before Playwright covers the full browser journey.
