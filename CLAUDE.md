# proovitoo — Liikluskindlustuse pakkumiste võrdlus

React + TypeScript + Vite app (see [README.md](README.md)). Today it reads a
static `public/offers.json` and reports the cheapest valid MTPL offer for a
given registration number. Business logic lives in [src/offers.ts](src/offers.ts),
UI in [src/App.tsx](src/App.tsx).

## Current phase: implementation and testing

The read-only API research phase is complete. Findings live in
[.claude/notes/website-api-notes.md](.claude/notes/website-api-notes.md),
which remains the source of truth for any future integration with the real
Kindlustusest API. The app intentionally continues to use static mock data
(`public/offers.json`) rather than calling that API — no protected or
session-dependent Kindlustusest endpoints are called, and none should be
wired into app code without a fresh, explicit user decision. Implementation
of the app (business logic, UI) and its test suite are done; the reviewer
process has signed off against the rules below.

### Hard rules

1. **No secrets in the repo.** Never write cookies, auth/session tokens, API
   keys, CSRF tokens, request headers containing credentials, or any personal
   data (e.g. real registration numbers tied to a person) into notes, commits,
   or agent output. Redact with placeholders like `<SESSION_COOKIE>`.
2. **No calling protected/authenticated endpoints from app code.** If an
   endpoint requires auth, session state, or anti-bot tokens obtained through
   a live browser session, do not wire it into the app — it stays documented
   as "protected" in the notes, flagged for the user to decide how to
   proceed.
3. **Document, don't automate scraping.** Any further reverse-engineering
   work should understand the contract (endpoints, payload shapes, response
   shapes, validation rules, rate limits/constraints), not build a scraper or
   bypass anti-bot protections.
4. **Everything observed goes into
   [.claude/notes/website-api-notes.md](.claude/notes/website-api-notes.md)**,
   not scattered across chat only — it must survive the session.

## Agents

- [.claude/agents/planner.md](.claude/agents/planner.md) — breaks the research
  goal into concrete inspection steps and delegates to `api-researcher`.
- [.claude/agents/api-researcher.md](.claude/agents/api-researcher.md) —
  inspects live Network traffic and writes findings to the notes file.
- [.claude/agents/frontend.md](.claude/agents/frontend.md) — owns this repo's
  React/TS code; only acts once the user approves moving to implementation.
- [.claude/agents/reviewer.md](.claude/agents/reviewer.md) — checks findings
  and any proposed diffs against the rules above before anything is acted on.

## Stack notes

- Package manager: npm. Scripts: `npm run dev`, `npm run build`, `npm run lint`,
  `npm run test`.
- Lint: oxlint (`.oxlintrc.json`).
- Tests: Vitest + React Testing Library ([src/offers.test.ts](src/offers.test.ts),
  [src/App.test.tsx](src/App.test.tsx)).
