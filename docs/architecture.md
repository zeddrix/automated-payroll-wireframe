# Architecture — Wireframe Repository

## Purpose

This repo exists only for **proposal-stage wireframes** for an automated payroll system (auth, admin, employees, attendance, payroll).

| Piece                | Role                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------- |
| `wireframe/`         | Runnable wireframe app to preview flows and assemble external designs (e.g. Corsair U) |
| `packages/ui`        | Reusable Svelte UI components                                                          |
| `packages/contracts` | Module/tab registry and stable `data-testid` selectors                                 |
| `packages/mock-data` | Deterministic fixtures, Zod auth schemas — not business truth                          |

There is **no** production backend, real auth, or payroll business logic here.

## Production application (separate repository)

The real product is developed in **`~/Documents/automated-payroll-system`** (sibling folder). That repo:

- Owns API clients, adapters, and real user flows
- Keeps payroll calculations in the backend — not in the UI
- May copy UI patterns from this wireframe repo manually until a shared design system is justified

## Wireframe vs production

|         | This repo (wireframe)                     | `automated-payroll-system` |
| ------- | ----------------------------------------- | -------------------------- |
| Purpose | Flow alignment, demos, component patterns | Real users, real data      |
| Data    | `@aps/mock-data`                          | Backend API / DB           |
| Auth    | Mock toggle in `wireframe-ui-state`       | Real auth service          |
| Logic   | Presentation only                         | Business rules in backend  |

## Package reuse rules (within this repo)

- **Do** keep generic UI primitives in `packages/ui` (including `PasswordRequirements` driven by `@aps/mock-data` policy).
- **Do not** put wireframe-only labels or mock banners inside `packages/ui` — keep those in `wireframe/`.
- **Auth validation:** rules and schemas in `@aps/mock-data`; touched/blur/submit UX in wireframe auth views.

## Layout and viewports

| Layer                       | What responds                           | Breakpoints / widths                                     |
| --------------------------- | --------------------------------------- | -------------------------------------------------------- |
| Shell (`WireframeShell`)    | Sidebar vs bottom nav                   | Browser `@media (min-width: 768px)`                      |
| Device preview frame        | Bezel width                             | 390 / 768 / 1280 px (`devicePreviewWidths`)              |
| Module content inside frame | Auth card, UI kit grids, form density   | `@container wireframe-screen` in `responsive-layout.css` |
| Auth card max width         | Intentional cap, not full-bleed desktop | `28rem` narrow, `32rem` at container ≥768px              |

Device-preview tabbar state is stored in `sessionStorage` (`wireframe-viewport-preview`) for demos only. It does not replace production responsive behavior in the sibling app repo.

## Testing layout

- E2E: Playwright against `wireframe/` (port 4570).
- Unit / integration: Vitest at repo root under `tests/`.

Conventions are adapted from the **queue** codebase; see [CLAUDE.md](../CLAUDE.md) and [docs/e2e-testing-rules.md](e2e-testing-rules.md).
