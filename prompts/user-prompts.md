# User Prompts

## Prompt 1

```text
List the files in the current project.
Tell me what you can see before making any changes.
```

## Prompt 2

```text
Before writing any code, inspect public/offers.json and analyze the assignment.

Context:
This is a live-coding case study. The goal is not a polished product, but a clear, pragmatic implementation and reasoning process.

User story:
A user enters a vehicle registration number and sees the cheapest MTPL insurance offer from mock offers.

Requirements:
- Offers must come from public/offers.json.
- Do not hardcode offer data.
- Treat the JSON as messy production-like API data.
- Try registrations 123ABC and 456DEF.
- The UI can be simple.
- Keep the solution small and understandable.

Please do NOT modify files yet.

First, report:
1. What structure public/offers.json has.
2. What fields are available.
3. How registration numbers are represented.
4. How prices are represented.
5. What inconsistencies or edge cases exist.
6. What assumptions we should make.
7. A short implementation plan with proposed files to change.
```

## Prompt 3

```text
Before implementing business logic, briefly inspect https://uus.kindlustusest.ee/ for UX/product-flow inspiration.

Do not copy the site and do not overbuild.

Focus only on:
- how the MTPL flow starts
- what the user enters first
- how the product positions insurance comparison
- what wording or result structure would make sense for our small mock version

Then implement only the data parsing and cheapest-offer business logic.

Requirements:
- Create TypeScript types.
- Create pure helper functions.
- Normalize registration numbers by trimming whitespace, removing spaces/hyphens if needed, and uppercasing.
- Only product === "mtpl" counts.
- Only status === "ok" counts.
- Parse prices safely from numbers or strings.
- Ignore offers with missing/invalid prices.
- Normalize prices to yearly EUR:
  - year = premium
  - month = premium * 12
  - unknown periods are invalid
- Return the cheapest valid offer and count of valid compared offers.
- Preserve original period and premium for display later.
- Do not build the UI yet.
- Do not modify App.tsx yet unless necessary.
- Keep the code simple and readable.

Before editing files, show the plan and list which files you will change.
```

## Prompt 4

```text
The business logic is complete, committed, and validated.

Now build a simple React UI.

Requirements:
- Keep the existing business logic in src/offers.ts unchanged.
- Load offers from /offers.json.
- Input for vehicle registration number.
- Button: "Leia odavaim pakkumine".
- Call findCheapestMtplOffer.
- Show:
  - insurer
  - original premium and period
  - normalized yearly price
  - compared offer count
- Handle:
  - empty input
  - no matching offers
  - no valid MTPL offers
- Keep the UI simple and readable.
- Prefer Estonian UI text.
- Before modifying files, show the implementation plan and list files you will change.
```

## Prompt 5

```text
The app is already running and I tested the UI manually. Do not probe the local URL again.

One visual issue: the heading text "Leia odavaim MTPL pakkumine" is too cramped/overlapping. Please fix the spacing/line-height/responsiveness in CSS only if possible. Do not change business logic.
```

## Prompt 6

```text
Review the entire project as if you were the interviewer for this live-coding case study.

Do not modify any files.
Do not refactor anything.
Only provide a written review.

Context:
The task is to build a small React + TypeScript app where the user enters a vehicle registration number and sees the cheapest valid MTPL insurance offer from public/offers.json.

Please check:
- Does the implementation satisfy the assignment?
- Is the solution simple and maintainable?
- Are React patterns used reasonably?
- Are TypeScript types and narrowing handled well?
- Are messy-data edge cases handled properly?
- Is the separation between UI and business logic clear?
- Are naming and readability good?
- Is there any unnecessary complexity?
- Are obvious bugs or missing edge cases?
- What are the strengths of the solution?
- What would you improve if you had one more hour?

Please structure the answer as:
1. Overall assessment
2. What is good
3. Potential issues
4. Suggested improvements
5. Final interviewer-style verdict
```

## Prompt 7

```text
Good review. Please implement only the malformed-array-entry guard.

Goal:
Make messy API handling safer if offers.json contains array items like null, strings, numbers, or booleans.

Requirements:
- Add a small object guard helper, e.g. isRecord(value): value is Record<string, unknown>.
- Use it before reading properties from unknown array items.
- Fix both:
  - src/offers.ts, so toValidMtplOffer cannot throw on null or non-object values.
  - src/App.tsx hasRegistrationMatch, so it cannot throw on null or non-object values.
- Do not change UI behavior.
- Do not change styling.
- Do not add tests yet.
- Keep the change minimal.
- After changes, run npm run build and npm run lint.
- Before editing files, show the plan and list files to change.
```

## Prompt 8

```text
Please extract all my prompts to an md file a put it in a seperate folder
```
