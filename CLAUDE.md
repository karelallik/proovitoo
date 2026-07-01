# proovitoo — Liikluskindlustuse pakkumiste võrdlus

React + TypeScript + Vite app (see [README.md](README.md)). Today it reads a
static `public/offers.json` and reports the cheapest valid MTPL offer for a
given registration number. Business logic lives in [src/offers.ts](src/offers.ts),
UI in [src/App.tsx](src/App.tsx).

## Current phase: read-only API research

We are investigating whether/how the real Kindlustusest motor-insurance
comparison flow (browser-based) could replace the static `offers.json` mock.
This phase is **research only** — inspecting Network requests in a real
browser session and writing down what we observe. See
[.claude/notes/website-api-notes.md](.claude/notes/website-api-notes.md) for
the living findings doc.

### Hard rules for this phase

1. **No application code changes.** Do not edit `src/`, `public/offers.json`,
   `package.json`, or any build config until the user explicitly asks to move
   from research to implementation.
2. **No secrets in the repo.** Never write cookies, auth/session tokens, API
   keys, CSRF tokens, request headers containing credentials, or any personal
   data (e.g. real registration numbers tied to a person) into notes, commits,
   or agent output. Redact with placeholders like `<SESSION_COOKIE>`.
3. **No calling protected/authenticated endpoints from app code.** If an
   endpoint requires auth, session state, or anti-bot tokens obtained through
   a live browser session, do not wire it into the app — document it as
   "protected" and flag it for the user to decide how to proceed.
4. **Document, don't automate scraping.** The goal is understanding the
   contract (endpoints, payload shapes, response shapes, validation rules,
   rate limits/constraints), not building a scraper or bypassing anti-bot
   protections.
5. **Everything observed goes into
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

- Package manager: npm. Scripts: `npm run dev`, `npm run build`, `npm run lint`.
- Lint: oxlint (`.oxlintrc.json`).
- No test runner configured yet.
