# @aps/ui

Production-grade wireframe UI components for the automated payroll system. Blue theme tokens, polished forms, and proposal-stage patterns.

## Usage (wireframe app)

```svelte
<script>
  import { WireframePage, Field, Button, EmptyState } from '@aps/ui';
  import { selectors } from '@aps/contracts';
</script>

<WireframePage title="Login" subtitle="Reference / mock only">
  <Field id="email" label="Email" bind:value={email} testId={selectors.authLoginEmail} />
  <Button type="submit" disabled={!canSubmit} testId={selectors.authLoginSubmit}>Sign in</Button>
</WireframePage>
```

## Conventions

- Pass `testId` on interactive components; values should come from `@aps/contracts` `selectors`.
- Submit buttons default to `disabled={true}`; parent enables when form is valid.
- No payroll business logic in this package.

## Future production app

These primitives can inform the production app in the sibling repo `~/Documents/automated-payroll-system` once requirements exist; copy patterns or extract a shared package later. Keep APIs generic (props/slots), not wireframe-only hacks.

## UI Kit reference in wireframe app

You can browse the integrated specimen catalog at `/ui-kit/tokens` in the wireframe app. It includes token swatches, component specimens, and navigation patterns.
