# @aps/ui

Low-fidelity wireframe components for the automated payroll system. Grayscale, dashed borders, proposal-stage styling.

## Usage (wireframe app)

```svelte
<script>
  import { WireframePage, LowFiField, LowFiButton, EmptyState } from '@aps/ui';
  import { selectors } from '@aps/contracts';
</script>

<WireframePage title="Login" subtitle="Reference / mock only">
  <LowFiField id="email" label="Email" bind:value={email} testId={selectors.authLoginEmail} />
  <LowFiButton type="submit" disabled={!canSubmit} testId={selectors.authLoginSubmit}>
    Sign in
  </LowFiButton>
</WireframePage>
```

## Conventions

- Pass `testId` on interactive components; values should come from `@aps/contracts` `selectors`.
- Submit buttons default to `disabled={true}`; parent enables when form is valid.
- No payroll business logic in this package.

## Future production app

These primitives can inform the production app in the sibling repo `~/Documents/automated-payroll-system` once requirements exist; copy patterns or extract a shared package later. Keep APIs generic (props/slots), not wireframe-only hacks.

## UI Kit reference in wireframe app

You can browse the integrated specimen catalog at `/ui-kit/tokens` in the wireframe app. It includes token swatches, low-fi and hi-fi component examples, and navigation patterns.
