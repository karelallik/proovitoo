# Claude Code Prompts

## Prompt 1

```text
Set up the Claude Code harness for this project before implementation.

Create:
- CLAUDE.md
- .claude/agents/planner.md
- .claude/agents/api-researcher.md
- .claude/agents/frontend.md
- .claude/agents/reviewer.md
- .claude/notes/website-api-notes.md

Purpose:
We need to reverse engineer the Kindlustusest motor insurance flow responsibly by inspecting browser Network requests and documenting endpoints, payloads, response shapes, and constraints.

Rules:
- Do not modify application code yet.
- Do not store private cookies, tokens, or secrets.
- Do not call protected APIs from app code unless clearly appropriate.
- First create concise agent/instruction files.
- Explain the purpose of each file before editing.
```

## Prompt 2

```text
Use the api-researcher instructions.

Help me inspect https://uus.kindlustusest.ee/ and the MTPL offer flow.

First check whether Chrome DevTools MCP / browser inspection tooling is connected and available.

If it is connected:
- Use it to inspect the website flow directly.
- Observe relevant Network / Fetch / XHR requests.
- Document findings in .claude/notes/website-api-notes.md.

If it is not connected:
- Stop before doing research.
- Guide me step by step to install and connect the correct Chrome DevTools MCP/browser inspection tool.
- After I confirm it is connected, continue with the inspection yourself.

Goal:
Reverse engineer the traffic flow responsibly.

For each relevant request, document:
- endpoint URL
- HTTP method
- request payload
- response shape
- headers/auth/session requirements at a high level
- what the call appears to do
- whether it seems public, protected, session-based, or unsafe to reuse directly
- whether we should use it in the implementation or only mimic the flow

Rules:
- Do not modify application code.
- Do not store cookies, tokens, session IDs, or personal data.
- Redact secrets from notes.
- If an endpoint is protected or depends on session state, document that instead of trying to bypass it.
```

## Prompt 3

```text
Based on .claude/notes/website-api-notes.md, propose an implementation plan for the MTPL task.

Goal:
Create a Claude-branch solution that uses the research findings responsibly.

Rules:
- Do not modify code yet.
- Do not call protected/session-dependent endpoints.
- Prefer mock/local data unless an endpoint is clearly public and appropriate.
- Explain what should be implemented, what should be mimicked, and what should stay out of scope.
- List files you would change.
```

## Prompt 4

```text
Proceed with implementation, but adjust the plan.

Requirements:

- Keep the existing mock data approach.
- Do not call any protected or session-dependent endpoints.
- Do not redesign the mock data solely to mirror the production API.
- Instead, use the research to improve the UX and architecture.

Update the application so it more closely resembles the real Kindlustusest flow.

Changes:
- User enters a registration number.
- Show a loading state.
- Display the THREE cheapest valid MTPL offers instead of only the cheapest.
- Sort offers by normalized yearly premium.
- Show insurer, payment frequency, original premium, normalized yearly premium.
- Keep the business logic clean and reusable.
- Use the planner and frontend agents during implementation.
- Explain each implementation step before modifying files.
```

## Prompt 5

```text
Use the reviewer and tester role.

Before adding tests, create one reusable Claude Skill:

.claude/skills/mtpl-testing.md

Purpose:
A reusable checklist for testing this MTPL offer app.

It should include:
- business logic test cases
- malformed data cases
- UI/manual test checklist
- commands to run: npm run test, npm run build, npm run lint

Then add automated tests for the MTPL application.

Requirements:
- Prefer testing the business logic in src/offers.ts.
- Add a lightweight test framework if needed (Vitest is preferred).
- Cover:
  - registration normalization
  - malformed API data
  - invalid offers
  - ignoring non-MTPL offers
  - ignoring error/null premium offers
  - yearly normalization
  - sorting of top 3 offers
  - 123ABC expected result
  - 456DEF expected result
  - empty and unknown registrations
- Add only a few UI tests if appropriate.
- Keep tests simple and maintainable.
- Explain the test plan before modifying files.
- After implementation run:
  - npm run test
  - npm run build
  - npm run lint
```

## Prompt 6

```text
Update the README.md to accurately reflect the current state of the project.

Requirements:
- Do not modify any application code.
- Only update README.md.

Include:
- Project overview.
- The original MTPL assignment.
- Tech stack (React, TypeScript, Vite).
- Features implemented:
  - registration number search
  - top 3 cheapest MTPL offers
  - yearly price normalization
  - loading state
  - validation/error handling
- Explain that the application uses mock data rather than live APIs.
- Summarize the reverse-engineering work performed on the Kindlustusest website.
- Mention that API findings are documented in `.claude/notes/website-api-notes.md`.
- Describe the Claude Code workflow:
  - CLAUDE.md
  - agents
  - skills
  - reviewer process
- Mention automated testing (Vitest) and that tests, build, and lint all pass.
- Add instructions for:
  - npm install
  - npm run dev
  - npm run test
  - npm run build
  - npm run lint
- Keep the README concise, professional, and suitable for someone reviewing the repository.
- Show me the proposed structure before editing the file.
```

## Prompt 7

```text
Proceed with the proposed structure. Keep the README in English, preserve the original Estonian assignment under an "Original Assignment" section, and keep the Claude Code workflow section concise. Only modify README.md.
```

## Prompt 8

```text
We're stopping here for now.

Please do not modify any more files.

Summarize:
- what was accomplished,
- what remains to be done (if anything),
- the current state of the repository,
- and what the first prompt should be when I continue in a new Claude conversation.

Assume the repository (CLAUDE.md, .claude/, README.md, and notes) will be used as the source of truth for the next session.
```

## Prompt 9

```text
please extract all prompts and put them to a new md file in prompts folder
```

---

## New session

Everything below this line was a separate Claude Code conversation, started
fresh (no memory of the session above — it rebuilt context from `CLAUDE.md`,
`README.md`, `.claude/`, and this repo's git history instead).

## Prompt 10

```text
I'm continuing work on this Claude Code project in a new session.

Before making any changes, please rebuild your understanding of the project.

Read:
- CLAUDE.md
- README.md
- .claude/agents/
- .claude/skills/
- .claude/notes/

Then provide:

1. A concise summary of the project.
2. What has already been implemented.
3. Which Claude Code features are being demonstrated (agents, skills, browser research, testing, etc.).
4. Whether any documentation or harness files are stale or inconsistent.
5. The highest-value next steps, ranked by priority.

Do not modify any files yet. Wait for my approval before making changes.
```

## Prompt 11

```text
Let's start by updating CLAUDE.md so it accurately reflects the current state of the project.

Requirements:
- Only modify CLAUDE.md.
- Do not modify any application code, tests, or other documentation.
- Keep the document concise and maintain its existing structure where possible.

Update it to reflect that:
- The API research phase has been completed.
- The project is now in the implementation and testing phase.
- The application intentionally uses mock data only.
- No calls are made to protected or session-dependent Kindlustusest APIs.
- The reverse-engineering notes remain the source of truth for any future API integration.
- The reviewer process, testing workflow, and implementation are complete.

After updating, briefly explain what changed and why.
```

## Prompt 12

```text
Audit this repository against the Claude Code documentation sections I read:

- Getting started
- Core concepts
- Extend Claude Code
- Explore the .claude directory
- Context window
- Prompt caching
- Instructions and memories
- Permission modes
- Manage sessions
- Common workflows
- Prompt library
- Best practices

Do not modify files.

Check whether this branch already demonstrates:
- CLAUDE.md
- .claude directory
- agents
- skills
- notes/memory
- permissions/safe workflow
- session handoff
- prompt library or reusable prompts
- testing workflow
- reviewer workflow
- MCP/browser research

Tell me:
1. What is already covered.
2. What is missing.
3. What would be valuable to add.
4. What would be overengineering.
5. Rank suggestions by value.
```

## Prompt 13

```text
Create a minimal shared `.claude/settings.json`.

Requirements:
- Do not include any machine-specific configuration.
- Do not include Chrome/MCP-specific local settings.
- Only include safe repository-wide permissions.

Allow:
- npm run test
- npm run build
- npm run lint
- git status
- git diff

Keep the file minimal and explain each permission briefly.

Do not modify any other files.
```

## Prompt 14

```text
Add more automated edge-case tests for the MTPL logic.

Focus only on tests unless a small production-code fix is required.

Cover:
- string prices with comma decimals
- negative premiums
- NaN / Infinity premiums
- unknown periods
- unsupported currencies
- lowercase product/status/currency handling decision
- duplicate yearly prices / tie ordering
- requesting fewer than 3 offers
- requesting more offers than available
- malformed array entries
- non-array offers input
- whitespace/hyphen registration variants

Important:
- Do not change intended product behavior without asking first.
- If a test reveals ambiguous behavior, pause and ask me instead of changing production code immediately.

Before editing, show the test plan and files to change.
After editing, run:
- npm run test
- npm run build
- npm run lint
```

*(Follow-up: asked via a clarifying question whether mismatched-case
`product`/`status`/`currency` values should keep being rejected or be
normalized/accepted — answered "keep rejecting (current behavior)", so no
production code changed, only tests were added documenting that decision.)*

## Prompt 15

```text
Before starting, confirm that this is research-only and that only .claude/notes/website-api-notes.md may be edited.Use the api-researcher role.

Research-only follow-up: investigate the POST /offers quote-creation request using Chrome DevTools Network with Preserve Log.

Rules:
- Do not modify app code.
- Do not store cookies, tokens, CSRF values, session IDs, or personal data.
- Redact secrets.
- Do not attempt to bypass CSRF/session protections.
- Do not automate repeated calls.
- Document only method, endpoint, payload shape, response shape, required headers at a high level, and whether it is safe/appropriate to use.

Update only .claude/notes/website-api-notes.md.
```

## Prompt 16

```text
I received a follow-up task that I needed to finish by today, and I've now completed it. Could you check whether what I have done matches the requirements?

The follow-up task was roughly this:

Read the Claude Code documentation up to the "Platforms and Integrations" section. Then experiment with and implement various `.md` files in a separate branch. Create a solution for the motor insurance task, basically the same original assignment, in another branch as well. When using Claude, make use of AI agents, which I understand are essentially the `.md` files. Also look at the insurance website to understand how their APIs are used and how the data is fetched. There was apparently some tool for inspecting this more effectively. The main idea seems to be to reverse engineer their motor insurance website as closely as possible, using as many of their own APIs as reasonably possible.

Previously, I completed the original task using Codex in VS Code.

Original assignment text in Estonian:

## LIVE-CODING CASE STUDY — USER STORY (~3h)

> "Kasutajana tahan sisestada oma sõiduki registrinumbri ja näha liikluskindlustuse pakkumistest kolme kõige odavamat, et saaksin kiiresti teada, milline kindlustus mulle kõige vähem maksab."

**Ülesanne.** Ehita lihtne mini-funktsionaalsus: kasutaja sisestab registrinumbri ja näeb mock-pakkumiste seast kõige odavamat liikluskindlustuse (MTPL) pakkumist.

**Tehnoloogiad.** Vali ise, mis sulle sobib. Meile loeb mõtlemine ja tempo, mitte konkreetne stack. UI võib olla lihtne, ei pea olema pixel-perfect.

**Andmed.** Pakkumised tulevad kaasasolevast offers.json failist. Failis on iga pakkumise hind eurot aastas ja selts. Ära kirjuta andmeid käsitsi ümber. Tegu on päris-API laadsete andmetega eri seltsidelt, nii et need võivad olla pisut sassis. Käitle neid nagu päris tootmisandmeid. Kui miski tundub valesti, usalda andmeid ja küsi julgelt üle. Proovi näiteks registreid 123ABC ja 456DEF.

**Eesmärk ei ole valmis ja viimistletud toode, vaid mõtteviis.** Me ei testi koodi rida-realt. Tahame näha, kuidas sa probleemi lahti võtad, mis tempos liigud ja kuidas AI-d kasutad. AI-kasutamine on lubatud ja oodatud, näiteks Claude Code, Cursor, Codex, etc. Meid huvitab kuidas sa seda kasutad, mitte ainult kas sa seda kasutad.

**Aeg.** Planeeri umbes 3 tundi. Tähtsam kui valmis saada on see, mida sa selle ajaga valid teha.

**Üleandmine.** Tee tööst git repo. Lõpus näitad seda ja räägid oma valikutest umbes 15 minutit. Küsimusi võib küsida igal hetkel.

I received feedback that my previous solution did not include any "harness files," which I assume refers to Markdown-based Claude Code context/agent files.

Please review my repository/branches and check:

1. Whether the branch structure makes sense.
2. Whether the `.md` files I added are the right kind of Claude Code harness/agent/context files.
3. Whether the motor insurance solution still satisfies the original assignment.
4. Whether I documented or demonstrated Claude Code usage clearly enough.
5. Whether the reverse engineering/API inspection part is represented well enough.
6. Whether staying on the newly created branch was the correct approach, or whether I should split the work into separate branches differently.

Please be critical and tell me what is missing, what looks correct, and what I should fix before submitting.
```

## Prompt 17

```text
I want to perform an experimental, reversible API integration based on my research of the Kindlustusest motor insurance website.
Important: This is an experiment. I may decide to discard these changes entirely, so please keep the implementation as isolated and easy to revert as possible.
Goal
Investigate whether we can safely integrate one of the public API endpoints (for example `GET /v1/offers/{guid}`) into the existing application while preserving the original assignment requirements.
Constraints

* Do not modify the existing business logic unless absolutely necessary.
* Do not replace the existing `offers.json` flow.
* Treat the existing application as the stable implementation.
* Add the API integration as an optional layer that can easily be removed.
Architecture
Prefer something like:

```
OfferSource
├── MockOfferSource (existing offers.json)
└── RealOfferSource (experimental)

```

or

```
offerService.ts
├── loadMockOffers()
├── loadRealOffers()
└── loadOffers() // chooses source

```

The rest of the application should continue working without knowing where the data came from.
Safety requirements

* Never use private cookies.
* Never use authentication.
* Never use CSRF tokens.
* Never use protected endpoints.
* Never send real personal information.
* Only use endpoints that are genuinely public and safe.
If the endpoint cannot be called safely, stop and explain why instead of forcing an implementation.
Implementation requirements

1. First inspect the current project.
2. Identify the smallest change needed.
3. Present a short implementation plan before editing code.
4. Make the smallest possible changes.
5. Keep the feature behind an environment variable or feature flag.
6. If the API call fails for any reason, automatically fall back to `offers.json`.
7. Preserve all existing tests if possible.
Documentation
After implementation, explain:

* which files changed,
* why each change was necessary,
* how to remove the experiment completely,
* whether the experiment actually improves the submission.
Before writing any code
Please first answer these questions:

1. Is integrating this endpoint actually worthwhile?
2. Does it strengthen the assignment?
3. Are there any technical, legal, or ethical concerns?
4. Is there a simpler approach that demonstrates the same understanding?
If, after reviewing the repository and my notes, you believe this experiment is not worthwhile, tell me that instead of implementing it.
```

## Prompt 18

```text
Yes, please build the stub-only version.

Keep it very small and reversible. Do not call the real Kindlustusest API. Add an `OfferSource` or `offerService` abstraction only if it does not overcomplicate the app.

The goal is to demonstrate that I researched the real API and intentionally decided not to integrate it dynamically because quote creation appears to require session/CSRF-protected flow.

Please keep `offers.json` as the actual data source, preserve existing behavior/tests, and add a short README note explaining why real API integration was not implemented.
```

## Prompt 19

```text
I've attached a reference image showing the visual direction I'd like for the offers section.

Please use it as design inspiration, not as a pixel-perfect copy.

Goal

Improve the UI so the different insurance offers are much easier to distinguish and scan at a glance. Right now the offers blend together visually.

Requirements
Keep the existing functionality exactly the same.
Do not change any business logic, tests, or data flow.
Only improve the presentation and component layout.
Keep the existing purple branding and overall visual style.
Design direction

Use the attached image as inspiration:

Display each offer as its own card with rounded corners and a subtle shadow.
Add generous spacing between offer cards.
Make the cheapest offer visually stand out (accent border, badge, or subtle highlight).
Organize information using a clear grid/columns instead of one long vertical block.
Make the insurer name larger and more prominent.
Emphasize the most important values (price, payment frequency, annual price).
Add small icons where appropriate if they improve readability.
Ensure the cards remain responsive on mobile.
Keep the input form and button mostly unchanged.
Preserve accessibility and semantic HTML.
Constraints
Do not introduce unnecessary dependencies.
Reuse existing components where possible.
Keep the implementation simple and maintainable.
The resulting UI should look clean, modern, and easy to scan by eye.

Before making changes, briefly explain your design approach, then implement it.

[Attached: reference image — offer-card UI mockup with numbered rank badges and purple branding]
```

## Prompt 20

```text
Now that the implementation is complete, please review the repository as if you were the interviewer evaluating this take-home assignment.

Ignore the fact that you wrote part of the implementation. Be as objective and critical as possible.

Please evaluate:

Claude Code usage and workflow
Harness files (CLAUDE.md, agents, skills, notes)
Overall architecture
Branch strategy
README and documentation
Code quality
Test quality
Whether offerService is actually worth keeping
Whether anything looks over-engineered or unnecessary
Whether the project still satisfies both the original assignment and the follow-up task

For each issue you find:

Explain why it matters.
Rate it as must fix, nice to have, or leave as is.
Suggest the smallest change that would improve it.

Finally, if you were the interviewer, would this repository leave a positive impression? Why or why not?
```

## Prompt 21

```text
Use the reviewer agent to review the current repository and summarize any issues.

Please specifically check:
- whether the latest committed state matches the follow-up requirements,
- whether the Claude Code harness files are convincing,
- whether the offerService abstraction is worth keeping,
- whether the UI changes are reasonable,
- whether anything is over-engineered,
- whether README claims are accurate,
- and whether there are any must-fix issues before submission.

Do not edit files yet. Just review and summarize.
```

## Prompt 22

```text
please extract all my prompts to  'claude-prompts' file where you specify its a new session and continue from there.
```
 