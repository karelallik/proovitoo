---
name: mtpl-testing
description: Reusable checklist for testing the proovitoo MTPL offer comparison app — business logic cases, malformed-data cases, and a manual UI checklist. Use before writing or reviewing tests for src/offers.ts or src/App.tsx, or before signing off on a change to either.
---

# MTPL offer app — testing checklist

Scope: [src/offers.ts](../../src/offers.ts) (business logic) and
[src/App.tsx](../../src/App.tsx) (UI), backed by mock data in
[public/offers.json](../../public/offers.json).

## Business logic test cases (src/offers.ts)

- **Registration normalization** — spaces, dashes, and mixed case all
  normalize to the same uppercase, no-separator form (e.g. `" 123-abc "` →
  `"123ABC"`).
- **Malformed API data** — non-array top-level input (`null`, `undefined`,
  an object, a string) is handled without throwing and yields no offers.
- **Invalid offer records** — records missing required fields, or with
  wrong types (e.g. `insurer` not a string, `premium` as an object,
  unrecognized `period`), are rejected rather than crashing or silently
  coercing.
- **Non-MTPL offers ignored** — `product` values other than `"mtpl"` (e.g.
  `"casco"`) never appear in results, even if otherwise well-formed.
- **Error / null-premium offers ignored** — `status !== "ok"` or an
  unparseable/`null` premium excludes the record.
- **Yearly normalization** — `period: "month"` premiums are multiplied by
  12; `period: "year"` premiums pass through unchanged; anything else
  yields no yearly value (and thus no valid offer).
- **Top-3 sorting** — results are sorted ascending by normalized yearly
  premium, and truncated to the requested count (default 3); with fewer
  than 3 valid offers, all of them are returned.
- **Known fixtures** — `123ABC` and `456DEF` in `public/offers.json` each
  produce a specific, checkable top-3 result and `comparedCount`. Treat
  these as regression anchors: if a future edit to the fixture changes the
  expected numbers, update the test's expectations deliberately, not
  incidentally.
- **Empty / unknown registration** — an empty string or a registration with
  no matching records returns zero offers, not an error.

## Manual UI checklist (run through in a browser after logic changes)

1. Load the app — initial "Laen pakkumisi..." loading state appears, then
   clears.
2. Submit with an empty registration field — shows the "sisesta
   registrinumber" validation message, no crash.
3. Submit an unknown registration (e.g. `999ZZZ`) — shows the "ei leitud"
   (no match) message.
4. Submit `123ABC` — see a brief "Otsin pakkumisi..." search-loading state,
   then up to 3 offers, sorted cheapest-first, with the first one visually
   marked as cheapest ("Soodsaim").
5. Submit `456DEF` — same, with its own distinct top 3.
6. Confirm each offer card shows: insurer, payment frequency, original
   premium (with its period), and normalized yearly premium.
7. Confirm the "compared offers" count matches the number of valid MTPL
   offers for that registration, not just the 3 shown.
8. Resubmit a different registration after a search — old results are
   replaced cleanly, no stale data left on screen.

## Commands to run

```bash
npm run test    # vitest — business logic + light UI tests
npm run build   # tsc -b && vite build — type-checks tests too
npm run lint    # oxlint
```

Run all three before considering a change to `offers.ts` or `App.tsx`
complete.
