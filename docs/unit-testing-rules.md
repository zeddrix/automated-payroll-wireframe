# Rules for Effective Unit Testing

## Core Philosophy

**Test behavior, not implementation.** Tests should stay valid when internal implementation changes.

## Rules (summary)

1. Test observable inputs and outputs; do not test private methods directly.
2. Prefer TDD: red → green → refactor for new behavior.
3. Minimize mocking; mock only external systems you do not control.
4. Do not mock third-party libraries directly — use adapters.
5. Test doubles must follow the same contract as real implementations.
6. Use fixtures for controlled environments.
7. **Mocking the entire data layer → unit test**, not integration.
8. Tests must be independent and deterministic.
9. Write a failing test before fixing bugs.
10. Test failure paths and edge cases.
11. Use descriptive names and AAA (Arrange, Act, Assert).
12. Keep tests maintainable; clarity over DRY when they conflict.
13. Measure quality, not just coverage.
14. Assert end state, not only that methods were called.
15. Tests should read as documentation of expected behavior.

## Naming

`*.unit.test.ts` for unit tests.

## This repo

Unit-test pure logic in `packages/contracts`, state modules (`.svelte.ts`), and helpers. Do not unit-test purely presentational wrappers unless they contain branching or validation rules.
