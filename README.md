# MTPL Offer Comparison

A small React + TypeScript + Vite app that compares mock motor insurance
(MTPL) offers. A user enters a vehicle registration number and the app
shows the three cheapest valid MTPL offers, normalized to a yearly price so
they're directly comparable.

The project started as a live-coding assignment and has since grown a
small `.claude/` workflow (agents, skills, and research notes) documenting
how it evolved, including a research pass on a real insurance comparison
site.

---

## Original assignment

The project began from the following (Estonian) user story:

> Kasutajana tahan sisestada oma sõiduki registrinumbri ja näha
> liikluskindlustuse pakkumistest kolme kõige odavamat, et saaksin
> kiiresti teada, milline kindlustus mulle kõige vähem maksab.

In English: *as a user, I want to enter my vehicle's registration number
and see the three cheapest liability (MTPL) insurance offers, so I can
quickly find out which insurer would cost me the least.*

The original brief asked for an app that:

- accepts a vehicle registration number;
- loads offers from a mock `offers.json` file, treated like a real API
  response;
- finds the cheapest valid MTPL offer(s) among them;
- handles malformed or incomplete records without crashing.

---

## Tech stack

- React
- TypeScript
- Vite

---

## Features implemented

- **Registration number search** — free-text input, normalized (spaces,
  dashes, and casing are stripped/uppercased) so different input styles
  match the same record.
- **Top 3 cheapest MTPL offers** — only `product: "mtpl"` offers with
  `status: "ok"` are considered; results are sorted ascending by yearly
  premium and the three cheapest are shown, with the cheapest visually
  highlighted.
- **Yearly price normalization** — monthly premiums are converted to a
  yearly figure so offers billed on different schedules are comparable.
- **Loading state** — a brief "searching" state is shown between
  submitting a registration number and displaying results, independent of
  the initial page-load state.
- **Validation / error handling** — empty input, unknown registration
  numbers, and registrations with no valid MTPL offers each get a distinct,
  clear message; malformed or incomplete offer records are silently
  skipped rather than breaking the comparison.

---

## Mock data, not a live API

`public/offers.json` is static mock data, shaped and treated like a real
API response (including deliberately malformed/error records to exercise
validation). **The app makes no calls to any real insurance API or
provider.** This was a deliberate choice — see the research summary below
for why.

---

## Kindlustusest research summary

To ground the app's UX and data shape in something realistic, the real
Estonian insurance comparison site (`uus.kindlustusest.ee`) was inspected
via live browser network traffic (read-only, no code changes made to the
site or automated scraping). Findings:

- The site is a decoupled SPA backed by a separate API host
  (`shop-api.kindlustusest.ee`).
- One endpoint (`GET /v1/offers/{guid}`) is public and returns a full
  quote — vehicle info and per-insurer pricing across all coverage periods
  and payment frequencies in a single response.
- Quote creation and several other endpoints (`/user`, `/carts/*`, the
  Sanctum CSRF bootstrap) are session/CSRF-protected and were not called.

This research directly shaped this app's UX (showing multiple ranked
offers, a brief loading state, highlighting the cheapest option) without
integrating any live, protected, or session-dependent calls. Full details,
including endpoint-by-endpoint classification (public/protected/unsafe),
are documented in
[`.claude/notes/website-api-notes.md`](.claude/notes/website-api-notes.md).

### Experimental: real API integration (not implemented, on purpose)

[`src/offerService.ts`](src/offerService.ts) adds a small `loadOffers()`
data-source layer in front of the existing mock flow, behind an
off-by-default `VITE_USE_REAL_OFFERS` env flag, with automatic fallback to
`offers.json` on any error. Its `loadRealOffers()` is a stub that always
throws instead of calling the real API.

**Why**: `GET /v1/offers/{guid}` is public, but it only serves a `{guid}`
that already exists. Minting one requires `POST /v1/offers`, which rides
the same Sanctum session/CSRF bootstrap as `GET /sanctum/csrf-cookie` and
`GET /user` — both already documented as protected. There is no safe,
unauthenticated way to obtain a `{guid}` for an arbitrary user-entered
registration number, so this project deliberately stops at documenting
the contract rather than faking a live integration.

**To remove this experiment entirely**: delete `src/offerService.ts` and
`src/offerService.test.ts`, and in `src/App.tsx` replace the `loadOffers()`
call in the load effect with the original inline
`fetch('/offers.json')` logic. Nothing else references this layer.

---

## Claude Code workflow

This repo includes a small `.claude/` setup used while developing it:

- [`CLAUDE.md`](CLAUDE.md) — ground rules for the project (no live/protected
  API calls, no secrets committed, mock-data-first).
- `.claude/agents/` — role-scoped agents: `planner` (breaks down tasks),
  `api-researcher` (browser-based endpoint research), `frontend` (owns
  `src/` changes), and `reviewer` (checks diffs for secrets, scope, and
  protected-endpoint use before a change is considered done).
- `.claude/skills/mtpl-testing.md` — a reusable testing checklist for this
  app (business logic cases, malformed-data cases, manual UI checklist).
- Every implementation change goes through a reviewer pass before being
  considered complete.

---

## Testing & quality

Automated tests (Vitest + React Testing Library) cover the business logic
in `src/offers.ts` — registration normalization, malformed/invalid data,
non-MTPL and error/null-premium filtering, yearly normalization, and
top-3 sorting against the known mock fixtures — plus a couple of
lightweight UI tests. `test`, `build`, and `lint` all currently pass.

---

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Run the test suite:

```bash
npm run test
```

Build for production:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```

---

## Example registration numbers

The app can be tested with:

- `123ABC`
- `456DEF`
