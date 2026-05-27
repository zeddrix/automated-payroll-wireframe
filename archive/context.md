# External Project System Brief

This document summarizes the full discussion from the chat about a separate project/system, so it can be copied into another workspace.

## 1. Project Context

- The project is a business/internal system with the following visible scope from the screenshot:
  - **Backend**
    - Azure
    - No Django
  - **Frontend**
    - Bubble.io
    - Wireframing
    - Workflows
  - **Systems**
    - Time Keeping (with fingerprinting)
    - HR
    - Payroll
  - **Workflow**
    - Per Milestone
    - Tito Emil Intermediary
- Additional note visible in the screenshot:
  - Every one/two weeks, the team plans to go to the client to demo and test what has been built. If there are bugs, they will explain how to specifically fix them.

## 2. Delivery Constraints and Team Setup

- The backend will be handled primarily by the user's uncle, who is a senior backend developer/database engineer.
- The user will partner with him and mainly handle the frontend/UI side.
- Planned cadence:
  - roughly **one milestone per week**
  - user availability is about **2.5 days per week**
  - target is to **launch in 3 months**
- Uncle mentioned that:
  - backend/business logic would likely be handled by him
  - payroll computations may be handled through **database functions**
  - the team would need to discuss that logic heavily together
  - if things become too complicated, they can later shift to custom full development instead of low/no-code
- Uncle also said:
  - UI is low priority
  - main focus is overall functionality, especially the payroll system
  - Bubble.io may be used for faster delivery

## 3. Main Recommendation

### Short version

**Do not make Bubble.io the main long-term implementation path for this system.**

### Why

- This is not a lightweight brochure app. It includes:
  - time keeping
  - HR flows
  - payroll
  - likely approval/workflow paths
- Payroll-heavy systems are high risk:
  - correctness matters
  - auditability matters
  - testability matters
  - bugs have real business consequences
- The user is strongest in:
  - agentic development
  - working in source-controlled code
  - E2E-heavy validation
- The user is **new to Bubble.io**, so Bubble is not automatically the faster path in practice.
- Bubble reduces some of the user's strongest advantages:
  - harder to reason about than source code
  - harder to diff/review precisely
  - less natural for AI-agent-assisted coding workflows
  - more awkward for deep automated testing strategies

## 4. When Bubble.io Is Acceptable

Bubble is only defensible if it is used as a **thin, temporary, UI shell** over a strong backend.

That means:

- all critical business logic stays outside Bubble
- Bubble is used mainly for:
  - screens
  - forms
  - simple workflow presentation
  - basic CRUD shell behavior
- Bubble does **not** become the place where payroll logic, approvals, validation rules, or core system behavior live

### Bubble is acceptable only if all of these are true

- backend/database/API are the real system of record
- payroll rules live in backend code and/or database functions
- Bubble workflows are thin
- Bubble is treated as either:
  - a temporary shell, or
  - a very thin internal UI layer

### Bubble is not a good fit if any of these become true

- critical logic starts living in Bubble workflows
- the frontend becomes a long-term strategic product surface
- the team wants strong AI-assisted iteration in code
- the team wants robust automated E2E coverage of complex paths
- payroll, approval, and exception flows become increasingly complex

## 5. Better Frontend Recommendation

The stronger recommendation is:

**Use `SvelteKit` + `TailwindCSS` for the frontend.**

This works well with a backend stack centered on:

- Azure
- SQL
- custom backend/API layer

### Why `SvelteKit` + `TailwindCSS` fits well

- faster to build than many heavier frontend stacks
- simple to keep ugly-but-clear for internal/admin UIs
- much better aligned with the user's real strength:
  - agentic development
  - code ownership
  - E2E testing
- easier to evolve if the system gets more complex
- better long-term maintainability than Bubble for a payroll-centric system

### Important architecture rule

The frontend should talk to the **backend API**, not directly to SQL.

Recommended structure:

- `SvelteKit + TailwindCSS` -> frontend
- `Azure backend/API` -> business logic, auth, validation, orchestration
- `SQL` -> database behind the backend

## 6. Recommended Responsibility Split

If the uncle owns backend/database, a healthy split is likely:

### Uncle owns

- database design
- payroll rules/computations
- DB functions/stored procedures if chosen
- APIs
- validation and data integrity
- auth/permissions if backend-driven

### User owns

- screens/forms
- workflow UX
- API integration
- user-facing validation/messages
- E2E coverage of real business flows
- milestone demos and frontend iteration

### Important clarification

The user should **not** simply wait until all backend work is done.

The better setup is:

- agree on workflows first
- agree on API contracts first
- define request/response shapes early
- develop against mocks/sample payloads if needed
- integrate per milestone

## 7. Database Functions for Payroll

Using database functions for payroll computations is **not inherently wrong**.

It can make sense because:

- calculations are close to the data
- consistency can be enforced centrally
- performance and transactional integrity can be stronger

But the real risk is not "DB functions" by itself.
The real risk is:

- unclear ownership
- undocumented rules
- logic living only in one person's head
- no stable contract between backend and frontend

So if DB functions are used, they should still be paired with:

- written rules
- documented payload/response behavior
- versioned API contracts
- clear acceptance behavior

## 8. Best Practical Recommendation

If this were the actual build recommendation:

1. Put all critical business logic in the backend/database layer.
2. Keep the frontend thin.
3. Use an ugly-but-clear admin-style UI first.
4. Focus on functionality, not polish.
5. Build milestone-by-milestone vertical slices.
6. Cover the important end-to-end flows with tests.

### Critical flows that should be covered early

- attendance ingestion / time keeping
- missing or incorrect punch handling
- payroll preview
- adjustments / deductions / exceptions
- approval workflow
- final payroll generation

## 9. What Bubble Likely Means in the Uncle's Mind

The most likely reason the uncle was comfortable suggesting Bubble:

- he may be viewing Bubble as only a **thin UI layer**
- he may expect to own all meaningful business logic himself
- he may be optimizing for delivery speed on the frontend shell

If that assumption is true, Bubble is more understandable.
But even then:

**Bubble should remain thin.**

If the intention is for Bubble to become the long-term production frontend of a payroll-heavy system, the recommendation remains:

**prefer `SvelteKit` instead.**

## 10. Scope Confusion: What the User Likely Needs to Understand

The user's confusion is reasonable.

When working solo, the user can build everything end-to-end.
In this partnership, the setup changes:

- backend and data design are not solely the user's responsibility
- frontend depends on backend contracts
- both sides must align closely on workflow and behavior

This does **not** mean the user has no work until APIs are finished.

Instead, the user should work in parallel through:

- workflow definition
- wireframes/prototypes
- form definitions
- state planning
- mock integration
- E2E plan and acceptance-flow thinking

## 11. What Must Be Clarified Early With the Uncle

Before locking into Bubble or SvelteKit, these questions should be answered:

1. Who owns auth and permissions?
2. What exact modules are in milestone 1, 2, 3, etc.?
3. Which logic lives in DB functions vs API code?
4. What exact endpoints will exist per milestone?
5. What are the request/response/error payload shapes?
6. Can frontend work against mocks before backend is fully done?
7. Is Bubble temporary or intended for production?
8. How will approvals/workflows be modeled?
9. What parts of payroll need auditability and traceability?
10. How often will backend and frontend sync on contracts?

## 12. Wireframing Guidance

If asked to make a **wireframe**, the clean recommendation is:

**Use Figma for true wireframes.**

### Why

- a wireframe is mainly for fast alignment
- it should be cheap to change
- it should focus discussion on:
  - flow
  - layout
  - information structure
- it should avoid dragging the conversation into:
  - polish
  - colors
  - spacing details
  - "can we just ship this"

### Practical split

- `Figma` -> wireframes
- agentic coded UI -> prototype / actual build

## 13. AI-Generated Wireframes / Low-Fi Prototypes

Because the user dislikes manual drag-and-drop and wants speed:

**Yes, AI agents can be used to generate the wireframe/prototype shell.**

This is a valid approach, especially for this user's working style.

### Suggested approach

Generate a whole-system low-fidelity shell with:

- sidebar or tabs for each module
- one screen per major flow/path
- grayscale / intentionally low-fidelity styling
- tables
- forms
- filters
- action buttons

### Suggested module structure

- Dashboard
- Employees
- Attendance
- Time Keeping
- HR
- Payroll
- Workflow
- Approvals

### Important distinction

- **Wireframe** = low-fidelity layout/flow artifact
- **Prototype** = clickable, interactive, may include realistic validation/behavior

If the generated UI already includes:

- form validation
- realistic interactions
- empty/loading/error states
- mocked behavior

then it is moving beyond "wireframe" into **prototype**.

That is not bad. It just needs to be labeled correctly.

## 14. Should the User Still Use Agentic Dev for This?

Yes, absolutely.

Agentic development remains the user's strongest advantage.

The most sensible workflow is:

1. align on flows quickly
2. generate low-fidelity screen shells fast
3. show them for feedback
4. turn approved flows into coded prototypes
5. connect those to real APIs as backend becomes available

## 15. Can the User Build More Than Static UI Right Away?

Yes.

Because of the user's speed with AI-assisted development, it is reasonable to build:

- real forms
- client-side validation
- realistic navigation
- empty/loading/error states
- mocked API behavior

very early.

That can be a major advantage for milestone demos.

However, once that happens, it is better described as:

- a **prototype**
- or a **thin working slice**

not just a wireframe.

## 16. Best Presentation Strategy for Client Milestones

If the goal is client alignment and quick iteration:

- show a **low-fidelity clickable prototype**
- avoid polished styling too early
- emphasize flow clarity
- emphasize business process clarity
- avoid getting stuck in visual debates

For a large business system, a **left sidebar** is probably better than top tabs for the main navigation.

## 17. Example AI Prompt for Low-Fi System Shell

Use something close to this:

```text
Create a low-fidelity internal business system wireframe/prototype.
Use a left sidebar with modules: Dashboard, Employees, Attendance, Time Keeping, HR, Payroll, Workflow, Approvals.
Each module should have a simple admin-style screen with tables, forms, filters, and action buttons.
Keep it grayscale and intentionally low-fidelity.
Focus on workflow clarity, not visual polish.
Include basic form validation states and empty/loading/error states where relevant.
```

### Important execution note

Do **not** ask AI to generate the whole final production system at once.

Instead:

- generate the shell first
- generate the key screens first
- expand per milestone
- keep the artifacts aligned to the backend/API plan

## 18. Final Conclusion

### Strongest long-term recommendation

For a system centered on:

- time keeping
- HR
- payroll
- workflows/approvals
- backend-led architecture

the best long-term frontend choice is:

**`SvelteKit` + `TailwindCSS` over a proper backend/API.**

### Bubble decision

Bubble is only acceptable if:

- it is a thin frontend shell
- it contains no critical business logic
- it is treated as temporary or very shallow

If Bubble is expected to become the full long-term frontend for this system, especially around payroll-heavy workflows:

**do not choose Bubble as the main path.**

### Wireframing/prototyping decision

If the uncle asks for a wireframe first:

- ideal true-wireframe tool: **Figma**
- speed-first alternative: **AI-generated low-fi prototype/wireframe shell**

For this user specifically, the speed-first approach is highly compatible with their working style, as long as:

- it stays low fidelity at first
- it is clearly positioned as wireframe/prototype
- backend/API contracts are discussed early

## 19. Immediate Next Conversation With the Uncle

The next useful discussion should settle:

- whether Bubble is temporary or production
- whether the frontend will be Bubble or SvelteKit
- which modules belong to milestone 1
- what the first API contract looks like
- what payroll logic will live in DB functions
- how frontend and backend will coordinate weekly
- whether the first client demo is:
  - wireframe only
  - clickable prototype
  - or partially integrated working slice
