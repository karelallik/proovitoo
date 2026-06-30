### ChatGPT prompts

## Prompt 1

```text
LIVE-CODING CASE STUDY — USER STORY (~3h) > "*Kasutajana tahan sisestada oma sõiduki registrinumbri ja näha liikluskindlustuse pakkumistest (vähemalt 3tk) kõige odavamat, et saaksin kiiresti teada, milline kindlustus mulle kõige vähem maksab.*" **Ülesanne.** Ehita lihtne mini-funktsionaalsus: kasutaja sisestab registrinumbri ja näeb mock-pakkumiste seast kõige odavamat liikluskindlustuse (MTPL) pakkumist. **Tehnoloogiad.** Vali ise, mis sulle sobib. Meile loeb mõtlemine ja tempo, mitte konkreetne _stack_. UI võib olla lihtne, ei pea olema _pixel-perfect_. **Andmed.** Pakkumised tulevad kaasasolevast offers.json failist. Failis on iga pakkumise hind (eurot aastas) ja selts. Ära kirjuta andmeid käsitsi ümber. Tegu on päris-API laadsete andmetega eri seltsidelt, nii et need võivad olla pisut sassis. Käitle neid nagu päris tootmisandmeid. Kui miski tundub valesti, usalda andmeid ja küsi julgelt üle. Proovi näiteks registreid 123ABC ja 456DEF. **Eesmärk ei ole valmis ja viimistletud toode, vaid mõtteviis.** Me ei testi koodi rida-realt. Tahame näha, kuidas sa probleemi lahti võtad, mis tempos liigud ja kuidas AI-d kasutad. AI-kasutamine on lubatud ja oodatud (Claude Code, Cursor, mis iganes). Meid huvitab _kuidas_ sa seda kasutad, mitte kas. **Aeg.** Planeeri umbes 3 tundi. Tähtsam kui valmis saada on see, mida sa selle ajaga valid teha. **Üleandmine.** Tee tööst _git repo_. Lõpus näitad seda ja räägid oma valikutest (umbes 15 min). Küsimusi võib küsida igal hetkel. millega peaksin alustama oma ülesandes, plaanin ülesande ära teha suures osas chat codexiga, kuid algul oleks mõistlik teha vist repo
```

## Prompt 2

```text
DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~ $ cd Desktop/ DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop $ mkdir proovitoo DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop $ cd proovitoo DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo $ git init Initialized empty Git repository in C:/Users/karelallik/Desktop/proovitoo/.git/ DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (master) tegin repo valmis ära, saan nüüd codexis edasi teha oma ülesannet
```

## Prompt 3

```text
> npx > create-vite . --template react-ts | o Use ESLint instead of Oxlint? | No (Oxlint) | o Install with npm and start now? | Yes | o Scaffolding project in C:\Users\karelallik\Desktop\proovitoo... | o Installing dependencies with npm... added 27 packages, and audited 28 packages in 17s 9 packages are looking for funding run npm fund for details found 0 vulnerabilities | o Starting dev server... > proovitoo@0.0.0 dev > vite VITE v8.1.0 ready in 488 ms ➜ Local: http://localhost:5173/ ➜ Network: use --host to expose ➜ press h + enter to show help DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (master) $ npm run dev > proovitoo@0.0.0 dev > vite VITE v8.1.0 ready in 220 ms ➜ Local: http://localhost:5173/ ➜ Network: use --host to expose ➜ press h + enter to show help DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (master) $ DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (master) $ git add . git commit -m "Initial React TypeScript setup" warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of '.oxlintrc.json', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'index.html', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'package-lock.json', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'public/icons.svg', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'src/App.css', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'src/App.tsx', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'src/assets/vite.svg', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'src/index.css', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'src/main.tsx', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'tsconfig.app.json', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'tsconfig.json', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'tsconfig.node.json', LF will be replaced by CRLF the next time Git touches it warning: in the working copy of 'vite.config.ts', LF will be replaced by CRLF the next time Git touches it [master (root-commit) 140c137] Initial React TypeScript setup 19 files changed, 1983 insertions(+) create mode 100644 .gitignore create mode 100644 .oxlintrc.json create mode 100644 README.md create mode 100644 index.html create mode 100644 package-lock.json create mode 100644 package.json create mode 100644 public/favicon.svg create mode 100644 public/icons.svg create mode 100644 src/App.css create mode 100644 src/App.tsx create mode 100644 src/assets/hero.png create mode 100644 src/assets/react.svg create mode 100644 src/assets/vite.svg create mode 100644 src/index.css create mode 100644 src/main.tsx create mode 100644 tsconfig.app.json create mode 100644 tsconfig.json create mode 100644 tsconfig.node.json create mode 100644 vite.config.ts DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (master) see on koik oige praegu?

```

## Prompt 4

```text
Ava projekt Codexis (või VS Code + Codex extension). kuidas codexis avada antud projekt
```

## Prompt 5

```text
kuidas a hetkel projekti saaksin kohe githubi ka Kui sa pole veel GitHubi midagi pannud See pole probleem. Kohalik Git repository on täiesti piisav. Hiljem võid soovi korral teha:
```

## Prompt 6

```text
DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (master) $ git remote add origin https://github.com/karelallik/proovitoo.git DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (master) $ git branch -M main DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ git push -u origin main Enumerating objects: 24, done. Counting objects: 100% (24/24), done. Delta compression using up to 14 threads Compressing objects: 100% (24/24), done. Writing objects: 100% (24/24), 33.86 KiB | 6.77 MiB/s, done. Total 24 (delta 2), reused 0 (delta 0), pack-reused 0 (from 0) remote: Resolving deltas: 100% (2/2), done. To https://github.com/karelallik/proovitoo.git * [new branch] main -> main branch 'main' set up to track 'origin/main'. DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ git remote -v origin https://github.com/karelallik/proovitoo.git (fetch) origin https://github.com/karelallik/proovitoo.git (push) DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) on siin oige nuud koik
```

## Prompt 7

```text
## LIVE-CODING CASE STUDY — USER STORY (~3h) > "*Kasutajana tahan sisestada oma sõiduki registrinumbri ja näha liikluskindlustuse pakkumistest (vähemalt 3tk) kõige odavamat, et saaksin kiiresti teada, milline kindlustus mulle kõige vähem maksab.*" **Ülesanne.** Ehita lihtne mini-funktsionaalsus: kasutaja sisestab registrinumbri ja näeb mock-pakkumiste seast kõige odavamat liikluskindlustuse (MTPL) pakkumist. **Tehnoloogiad.** Vali ise, mis sulle sobib. Meile loeb mõtlemine ja tempo, mitte konkreetne _stack_. UI võib olla lihtne, ei pea olema _pixel-perfect_. **Andmed.** Pakkumised tulevad kaasasolevast offers.json failist. Failis on iga pakkumise hind (eurot aastas) ja selts. Ära kirjuta andmeid käsitsi ümber. Tegu on päris-API laadsete andmetega eri seltsidelt, nii et need võivad olla pisut sassis. Käitle neid nagu päris tootmisandmeid. Kui miski tundub valesti, usalda andmeid ja küsi julgelt üle. Proovi näiteks registreid 123ABC ja 456DEF. **Eesmärk ei ole valmis ja viimistletud toode, vaid mõtteviis.** Me ei testi koodi rida-realt. Tahame näha, kuidas sa probleemi lahti võtad, mis tempos liigud ja kuidas AI-d kasutad. AI-kasutamine on lubatud ja oodatud (Claude Code, Cursor, mis iganes). Meid huvitab _kuidas_ sa seda kasutad, mitte kas. **Aeg.** Planeeri umbes 3 tundi. Tähtsam kui valmis saada on see, mida sa selle ajaga valid teha. **Üleandmine.** Tee tööst _git repo_. Lõpus näitad seda ja räägid oma valikutest (umbes 15 min). Küsimusi võib küsida igal hetkel. mulle anti soovitus vaadata ka antud ülesande jaoks vaadata ka selle ettevõtte (Kindlustusest) kodulehte, see pidi olema vihje.
```

## Prompt 8

```text
väga hea, aga esiteks kuidas saan oma projekti codexis lahti võtta, hetkel ei näe seda
```

## Prompt 9

```text
väga hea sain oige kausta lahti, mis edasi peaksin tegema, ning kuidas lähenema ülesandele
```

## Prompt 10

```text
$ git status On branch main Your branch is up to date with 'origin/main'. Untracked files: (use "git add <file>..." to include in what will be committed) public/offers.json nothing added to commit but untracked files present (use "git add" to track) voin teha commiti?
```

## Prompt 11

```text
DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ git status On branch main Your branch is up to date with 'origin/main'. Untracked files: (use "git add <file>..." to include in what will be committed) public/offers.json nothing added to commit but untracked files present (use "git add" to track) DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ ggit add public/offers.json bash: $'\302\226git': command not found DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ git add public/offers.json warning: in the working copy of 'public/offers.json', LF will be replaced by CRLF the next time Git touches it DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ git commit -m "Add mock offers data" [main 51e56c0] Add mock offers data 1 file changed, 14 insertions(+) create mode 100644 public/offers.json DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ git push Enumerating objects: 6, done. Counting objects: 100% (6/6), done. Delta compression using up to 14 threads Compressing objects: 100% (4/4), done. Writing objects: 100% (4/4), 649 bytes | 649.00 KiB/s, done. Total 4 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0) remote: Resolving deltas: 100% (1/1), completed with 1 local object. To https://github.com/karelallik/proovitoo.git 140c137..51e56c0 main -> main DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) laks koik plaanipareaselt?
```

## Prompt 12

```text
kas voiksin seda videot kasutada raamistikuna, kuidas codexit turvaliselt kasutada: https://www.youtube.com/watch?v=tUeSxXHmE9w&list=LL&index=24 ning n this solo episode I walk through Codex Sites end to end, building a real internal tool live so you can copy the exact workflow. I open by comparing Codex Sites with one-prompt tools like Replit and Lovable, then construct a Startup Ideas OS board in six prompts. Along the way I cover memory and persistent storage, safe actions, Codex skills, save-gates, and proving the loop so the app updates autonomously. The core promise: by the end you know how to ship a Codex Site that an agent keeps operating for you. This one suits builders who already live in Codex and want self-updating products. Timestamps 00:00 – Intro and Episode Agenda 01:17 – Codex Sites vs Replit and Lovable 04:33 – The Build Plan: Startup Ideas OS 05:08 – Prompt 1: Build the Shell with Sites 07:02 – Plugins Worth Using and Game Studio 08:54 – First Board Review 09:21 – Prompt 2: Add Memory and Show the Data Model 10:56 – Prompt 3: Create Safe Actions 13:25 – Prompt 4: Create the Startup Ideas Admin Skill 14:51 – Prompt 5: Save-Gate and Checkpoints 16:29 – Prompt 6: Prove the Loop from a New Chat 18:10 – Publish, Auth, and Live Updates 20:28 – TLDR: Memory, Safe Actions, Skills 22:40 – The Real Unlock and Closing Thoughts Key Points Codex Sites rewards builders who already live in Codex by updating apps autonomously after launch. Replit, Lovable, and Bolt stay the simpler one-prompt choice; Codex Sites trades that for autonomy and self-updating products. Out of the box you prompt in auth, databases, payments, email, analytics, and a secrets vault yourself. I build a Startup Ideas OS board in six prompts: shell, memory, safe actions, a skill, a save-gate, and a proof loop. Safe actions let an agent call approved buttons and named mutations, so edits flow from any chat. The real payoff is autonomous products that Codex keeps operating and improving on a live URL. Numbered Section Summaries 1. Why Codex Sites Earns a Look — I saw Codex launch Sites and first wondered whether it was a thinner Replit or Lovable. Digging in, I found it rewards builders who already live in Codex, because it updates an app autonomously. The agenda for the episode: build a shell, add memory, add safe actions, create skills, save-gate, and prove the loop. 2. Codex Sites vs the One-Prompt Tools — Replit, Lovable, and Bolt shine when you want one prompt to spin up an editor, database, server, hosting, and even a domain. Codex Sites suits people who keep all their context in Codex and want autonomous, self-updating products. 3. The Pieces You Add Yourself — Codex Sites expects you to prompt in auth, databases, payments, email sending, analytics, and a secrets vault. Today these run as internal apps you share with your team, with custom domains and public deploys arriving soon. For a fully bundled experience, Replit or Lovable stays the simpler pick; for autonomy, Codex Sites rewards a little extra technical comfort. 4. Building the Startup Ideas OS — I build a live board with columns for inbox, researching, validating, building, and killed, where each card carries an idea, buyer, pain, proof, next step, and score. I aim to finish in six prompts, invoking sites as a plugin, asking for realistic sample data, and saving for review so the build holds for a deploy later. 5. Memory, Safe Actions, and the Data Model — To turn a demo into real software, I prompt for persistent storage and ask Codex to show the data model first; it proposes Cloudflare D1 with an "ideas" record and a clear list of actions. Safe actions then wrap those actions in named mutations, so an agent calls approved buttons and stays inside that boundary. Asking Codex which safe actions the app needs hands you the list directly. 6. Skills and Save-Gates — A Codex skill acts as a reusable instruction manual, so future chats know how to read the board, add ideas, move and score cards, and archive them, complete with five example commands. Because Codex saves on command, I treat each milestone like a video-game checkpoint: "save as V1 review," then confirm build status, storage choice, and access setting before a live URL. 7. Proving the Loop and the Real Unlock — After publishing, auth ships in, the live board shows every column, and a weekly automation can keep adding ideas on its own. The real unlock is products Codex keeps operating for you autonomously
```

## Prompt 13

```text
okei selge, mis prompti peaksin codexile järgmiseks,saatma et ta käsitleks ülesannet võimalikult hästi ja täpselt
```

## Prompt 14

```text
I’ll inspect the data and nearby project shape only, then report back before touching anything. I’ll keep this in analysis mode as requested. Ran 3 commandsRan Get-ChildItem -Force Ran Get-ChildItem -Recurse -Depth 2 | Select-Object FullName Ran Get-Content -Raw -LiteralPath 'public/offers.json' The workspace itself looks almost empty from the filesystem side: I only see .git, and public/offers.json is not present at that path. I’m going to check the Git index/history next to see whether the file exists on another branch or was expected but not checked out. Running git rev-parse --show-toplevelRunning git rev-parse --show-toplevelRan git status --short Running commandRunning command for 12s Ran git branch --all Running commandRunning command for 12s Do you want to run this command? git rev-parse --show-toplevel 1Yes2Yes, and don't ask again for commands that start withgit rev-parse --show-toplevel No, and tell Codex what to do differently. SIdenote: kas lasen seda teha?
```


## Prompt 15

```text
Codexi poolne vastus No files modified. Structure public/offers.json is a top-level JSON array. Each item is one offer object, not grouped by registration or insurer. Available Fields Observed fields: reg: vehicle registration number insurer: insurer name product: insurance product type, e.g. mtpl, casco premium: price amount, number or null period: price period, e.g. year, month currency: e.g. EUR status: e.g. ok, error error: optional error detail, seen on failed offer Registration Representation Registrations are represented as uppercase strings in the reg field:123ABC 456DEF Input should probably be normalized with trim().toUpperCase() before matching. Price Representation Prices are in premium, paired with period and currency. Examples: 245, period: "year", currency: "EUR" 18, period: "month", currency: "EUR" null for failed/unavailable offer Inconsistencies / Edge CasesNot all offers are MTPL: 123ABC has a casco offer that must be excluded. Some offers fail: Gjensidige has status: "error", premium: null, and error: "timeout". Prices use different periods: yearly and monthly premiums appear together. There is a tie for 123ABC if comparing yearly MTPL premiums directly: Ergo and LHV are both 199 EUR/year. If comparing raw numeric premium, Salva’s 18 EUR/month looks cheapest, but that is not equivalent to annual prices. No guarantee from the assignment that future data will always have valid fields, known periods, valid currencies, or matching registrations. AssumptionsOnly product === "mtpl" counts. Only status === "ok" offers with numeric premium count. Prices should be compared on an equivalent basis. I’d normalize month to annual cost by multiplying by 12, because otherwise 18/month and 199/year are not comparable. Unknown periods should be ignored or treated as invalid. If multiple offers tie, return the first cheapest after filtering, or optionally show that there is a tie. For 123ABC, normalized cheapest MTPL is Ergo / LHV at 199 EUR/year; Salva is 18 EUR/month, equivalent to 216 EUR/year. For 456DEF, cheapest MTPL is Ergo at 265 EUR/year. Short Implementation Plan Proposed files to change later:[src/App.tsx](C:/Users/karelallik/Desktop/proovitoo/src/App.tsx): replace starter UI with registration input, fetch /offers.json, filter/normalize offers, display cheapest result and basic empty/error states. [src/App.css](C:/Users/karelallik/Desktop/proovitoo/src/App.css): simplify styling for the small form/result UI. Possibly [src/index.css](C:/Users/karelallik/Desktop/proovitoo/src/index.css): only if the existing global starter styles fight the simple UI. Nüüd, enne seda prompti, Good. Now implement only the data parsing and cheapest-offer business logic. Requirements: - Create TypeScript types. - Create pure helper functions. - Normalize registration numbers by trimming whitespace, removing spaces/hyphens if needed, and uppercasing. - Parse prices safely from numbers or strings. - Ignore offers with missing/invalid prices. - Return the cheapest valid offer and count of valid compared offers. - Do not build the UI yet. - Add a few lightweight tests or examples if appropriate. - Keep the code simple and readable., tahana et ta vaataks üle ka kindlustest lehe: kuidas seal loogika töätab: https://uus.kindlustusest.ee/
```

## Prompt 16

```text
I’ll take a brief look at the live flow for product cues, then I’ll pause with a concrete file plan before touching anything. Searched the webhttps://uus.kindlustusest.ee/ The site starts MTPL from a first-screen “Liikluskindlustus” card: the first user action is entering a registration like 123ABC, then pressing “Edasi”. It positions the product as comparing multiple insurers in one place to save time and money, so our later mock UI can sensibly say something like “Cheapest MTPL offer” and show insurer, original premium/period, yearly normalized price, and compared-offer count. Plan before editing: Add a small pure business-logic module: [src/offers.ts](C:/Users/karelallik/Desktop/proovitoo/src/offers.ts). Define TypeScript types for raw offers, valid normalized offers, and cheapest-result shape. Implement helpers for registration normalization, safe premium parsing, yearly price normalization, raw-offer parsing, valid MTPL filtering, and cheapest selection. Leave [src/App.tsx](C:/Users/karelallik/Desktop/proovitoo/src/App.tsx) untouched for now, as requested. Ran Get-Content -Raw tsconfig.app.json I checked the TypeScript settings too: unused exported helpers are fine, so this can stay as a standalone module until the UI is wired in. I’m going to add just that one file now. Do you want to make these changes? offers.ts+131-0 1Yes2Yes, and don't ask again this session. Luban selle läbi?
```

## Prompt 17

```text
The helper module is in place. I’ll run the project checks now so we catch type or lint issues before calling it done. Running npm run lintRunning npm run lintRunning commandRunning command for 11s Running commandRunning command for 11s Do you want to run this command? npm run build 1Yes2Yes, and don't ask again for commands that start withnpm run build No, and tell Codex what to do differently. Selle luban ka läbi eks?
```

## Prompt 18

```text
Selline asi tuli vahele: Build caught one useful TypeScript narrowing issue around period; the runtime logic was fine, but the type checker needs an explicit guard. I’m tightening that now without broadening the module. Do you want to make these changes? offers.ts+8-0 1Yes2Yes, and don't ask again this session No, and tell Codex what to do differently
```

## Prompt 19

```text
Node here can run TypeScript with type stripping, so I’ll use the actual helper module against public/offers.json instead of mentally simulating it. Running node --experimental-strip-types -e "import fs from 'node:fs/promises'; import { findCheapestMtplOffer } from './src/offers.ts'; const offers = JSON.parse(await fs.readFile('./public/offers.json', 'utf8')); console.log(JSON.stringify({ '123ABC': findCheapestMtplOffer(offers, '123ABC'), '456DEF': findCheapestMtplOffer(offers, '456DEF') }, null, 2));"Running node --experimental-strip-types -e "import fs from 'node:fs/promises'; import { findCheapestMtplOffer } from './src/offers.ts'; const offers = JSON.parse(await fs.readFile('./public/offers.json', 'utf8')); console.log(JSON.stringify({ '123ABC': findCheapestMtplOffer(offers, '123ABC'), '456DEF': findCheapestMtplOffer(offers, '456DEF') }, null, 2));"Running commandRunning command for 11s Do you want to run this command? node --experimental-strip-types -e "import fs from 'node:fs/promises'; import { findCheapestMtplOffer } from './src/offers.ts'; const offers = JSON.parse(await fs.readFile('./public/offers.json', 'utf8')); console.log(JSON.stringify({ '123ABC': findCheapestMtplOffer(offers, '123ABC'), '456DEF': findCheapestMtplOffer(offers, '456DEF') }, null, 2));" Expand 1Yes2Yes, and don't ask again for commands that start withnode --experimental-strip-types -e "import fs from 'node:fs/promises'; import { findCheapestMtplOffer } from './src/offers.ts'; const offers = JSON.parse(await fs.readFile('./public/offers.json', 'utf8')); console.log(JSON.stringify({ '123ABC': findCheapestMtplOffer(offers, '123ABC'), '456DEF': findCheapestMtplOffer(offers, '456DEF') }, null, 2));" No, and tell Codex what to do differently selle luban ka?
```

## Prompt 20

```text
Implemented only the business logic in [src/offers.ts](C:/Users/karelallik/Desktop/proovitoo/src/offers.ts). [src/App.tsx](C:/Users/karelallik/Desktop/proovitoo/src/App.tsx) was not modified. What’s included: TypeScript types for raw offers, valid MTPL offers, and cheapest-result output. Pure helpers for registration normalization, safe premium parsing, yearly EUR normalization, valid MTPL parsing, and cheapest-offer selection. Rules implemented: product === "mtpl", status === "ok", valid numeric/string prices only, year and month periods only, preserve original premium and period. I also briefly inspected kindlustusest.ee for flow inspiration: the MTPL journey starts with a registration number input and positions the product as comparing insurers in one place. Verification passed: npm run build npm run lint Sanity check with public/offers.json:123ABC → Ergo, 199 EUR/year, comparedCount: 6 456DEF → Ergo, 265 EUR/year, comparedCount: 3 Edited offers.ts+139-0Review changesUndoReview Sources. nii see vastus tuli, kas saaksin ise ka testida seda ning siis pushiksin üles.
```

## Prompt 21

```text
DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ git status On branch main Your branch is up to date with 'origin/main'. Untracked files: (use "git add <file>..." to include in what will be committed) src/offers.ts nothing added to commit but untracked files present (use "git add" to track) DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ npm run build > proovitoo@0.0.0 build > tsc -b && vite build vite v8.1.0 building client environment for production... ✓ 20 modules transformed. computing gzip size... dist/index.html 0.45 kB │ gzip: 0.29 kB dist/assets/react-CHdo91hT.svg 4.12 kB │ gzip: 2.06 kB dist/assets/vite-BF8QNONU.svg 8.70 kB │ gzip: 1.60 kB dist/assets/hero-CLDdwZDr.png 13.05 kB dist/assets/index-D64VDMd1.css 4.10 kB │ gzip: 1.47 kB dist/assets/index-DfKp6xNp.js 193.35 kB │ gzip: 60.67 kB ✓ built in 123ms DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ npm run dev > proovitoo@0.0.0 dev > vite VITE v8.1.0 ready in 231 ms ➜ Local: http://localhost:5173/ ➜ Network: use --host to expose ➜ press h + enter to show help DOMENIS+karelallik@DESKTOP-6R02F76 MINGW64 ~/Desktop/proovitoo (main) $ nii, see on hetkel korras siis, loen ka offers.ts läbi.
```

## Prompt 22

```text
export type RawOffer = { reg?: unknown insurer?: unknown product?: unknown premium?: unknown period?: unknown currency?: unknown status?: unknown error?: unknown } export type OfferPeriod = 'year' | 'month' export type ValidMtplOffer = { reg: string insurer: string product: 'mtpl' premium: number period: OfferPeriod currency: 'EUR' status: 'ok' yearlyPremiumEur: number } export type CheapestOfferResult = { offer: ValidMtplOffer | null comparedCount: number } const EUR = 'EUR' const MTPL = 'mtpl' const OK = 'ok' function isOfferPeriod(period: unknown): period is OfferPeriod { return period === 'year' || period === 'month' } export function normalizeRegistration(registration: string): string { return registration.trim().replace(/[\s-]+/g, '').toUpperCase() } export function parsePremium(value: unknown): number | null { if (typeof value === 'number') { return Number.isFinite(value) && value >= 0 ? value : null } if (typeof value === 'string') { const parsed = Number(value.trim().replace(',', '.')) return Number.isFinite(parsed) && parsed >= 0 ? parsed : null } return null } export function normalizeToYearlyEur( premium: number, period: unknown, ): number | null { if (period === 'year') { return premium } if (period === 'month') { return premium * 12 } return null } export function toValidMtplOffer(rawOffer: RawOffer): ValidMtplOffer | null { if ( typeof rawOffer.reg !== 'string' || typeof rawOffer.insurer !== 'string' || rawOffer.product !== MTPL || rawOffer.status !== OK || rawOffer.currency !== EUR ) { return null } if (!isOfferPeriod(rawOffer.period)) { return null } const premium = parsePremium(rawOffer.premium) if (premium === null) { return null } const yearlyPremiumEur = normalizeToYearlyEur(premium, rawOffer.period) if (yearlyPremiumEur === null) { return null } return { reg: normalizeRegistration(rawOffer.reg), insurer: rawOffer.insurer, product: MTPL, premium, period: rawOffer.period, currency: EUR, status: OK, yearlyPremiumEur, } } export function findCheapestMtplOffer( offers: unknown, registration: string, ): CheapestOfferResult { if (!Array.isArray(offers)) { return { offer: null, comparedCount: 0 } } const normalizedRegistration = normalizeRegistration(registration) const validOffers = offers .map((offer) => toValidMtplOffer(offer as RawOffer)) .filter((offer): offer is ValidMtplOffer => { return offer !== null && offer.reg === normalizedRegistration }) const cheapestOffer = validOffers.reduce<ValidMtplOffer | null>( (cheapest, offer) => { if (cheapest === null || offer.yearlyPremiumEur < cheapest.yearlyPremiumEur) { return offer } return cheapest }, null, ) return { offer: cheapestOffer, comparedCount: validOffers.length, } } tee mulle selgeks kuidas antud kood töötab.
```

## Prompt 23

```text
Saadan nüüd codexile selle prompti: The business logic is complete and validated. Now build a simple React UI. Requirements: - Keep the existing business logic unchanged. - Load offers from /offers.json. - Input for vehicle registration number. - Button: "Leia odavaim pakkumine". - Call the helper function. - Show: - insurer - original premium and period - normalized yearly price - compared offer count - Handle: - empty input - no matching offers - no valid MTPL offers - Keep the UI simple and readable. - Show the implementation plan before modifying files.
```

## Prompt 24

```text
The first probe could not connect, so the hidden process likely did not launch through npm on Windows. I’ll retry with npm.cmd, which is the usual executable wrapper here. Running Start-Process -WindowStyle Hidden -FilePath npm.cmd -ArgumentList @('run','dev','--','--host','127.0.0.1','--port','5173')Running Start-Process -WindowStyle Hidden -FilePath npm.cmd -ArgumentList @('run','dev','--','--host','127.0.0.1','--port','5173')Running commandRunning command for 11s Do you want to run this command? Start-Process -WindowStyle Hidden -FilePath npm.cmd -ArgumentList @('run','dev','--','--host','127.0.0.1','--port','5173') 1Yes2Yes, and don't ask again for commands that start with. Selline tuli veel.
```

## Prompt 25

```text
leht töötab, proovisin need läbi: Kui UI avaneb Testi kindlasti: ✅ 123ABC ✅ 456DEF ✅ 123 abc ✅ 123-ABC ✅ tühi sisend ✅ 999ZZZ kõik töötab hästi. Kuid tekstid Leia odavaim MTPL pakkumine on liiga koos. lisaks pole veel sellele vastanud: hat launch returned cleanly too; I’ll give it a moment and probe the URL again. Running Start-Sleep -Seconds 2; Invoke-WebRequest -UseBasicParsing http://127.0.0.1:5173/Running Start-Sleep -Seconds 2; Invoke-WebRequest -UseBasicParsing http://127.0.0.1:5173/Running commandRunning command for 2m 56s Do you want to run this command? Start-Sleep -Seconds 2; Invoke-WebRequest -UseBasicParsing http://127.0.0.1:5173/ 1Yes2Yes, and don't ask again for commands that start withStart-Sleep -Seconds 2 No, and tell Codex what to do differently
```

## Prompt 26

```text
Understood, no more local URL probes. I’ll fix this in CSS only, focusing on the heading’s line-height, margins, and responsive sizing while leaving business logic untouched. Ran Get-Content -Raw src/App.css The issue is coming from the global h1 style in index.css: it has a large size plus tight default line-height and negative letter spacing. I’ll override just this app’s heading inside App.css so the global file can stay untouched. Do you want to make these changes? App.css+13-0 1Yes2Yes, and don't ask again this session
```

## Prompt 27

```text
import { useEffect, useState } from 'react' import './App.css' import { findCheapestMtplOffer, normalizeRegistration, type CheapestOfferResult, type RawOffer, } from './offers' type SearchState = | { status: 'idle' } | { status: 'empty' } | { status: 'no-match' } | { status: 'no-valid-offers' } | { status: 'success'; result: CheapestOfferResult } function formatMoney(amount: number): string { return new Intl.NumberFormat('et-EE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2, }).format(amount) } function formatPeriod(period: string): string { if (period === 'year') { return 'aasta' } if (period === 'month') { return 'kuu' } return period } function hasRegistrationMatch(offers: unknown, registration: string): boolean { if (!Array.isArray(offers)) { return false } const normalizedRegistration = normalizeRegistration(registration) return offers.some((offer: RawOffer) => { return ( typeof offer.reg === 'string' && normalizeRegistration(offer.reg) === normalizedRegistration ) }) } function App() { const [offers, setOffers] = useState<unknown>([]) const [registration, setRegistration] = useState('') const [isLoading, setIsLoading] = useState(true) const [loadError, setLoadError] = useState<string | null>(null) const [searchState, setSearchState] = useState<SearchState>({ status: 'idle' }) useEffect(() => { async function loadOffers() { try { const response = await fetch('/offers.json') if (!response.ok) { throw new Error('Pakkumiste laadimine ebaonnestus.') } setOffers(await response.json()) } catch { setLoadError('Pakkumiste laadimine ebaonnestus. Proovi hiljem uuesti.') } finally { setIsLoading(false) } } loadOffers() }, []) function handleSubmit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault() if (registration.trim() === '') { setSearchState({ status: 'empty' }) return } if (!hasRegistrationMatch(offers, registration)) { setSearchState({ status: 'no-match' }) return } const result = findCheapestMtplOffer(offers, registration) if (result.offer === null) { setSearchState({ status: 'no-valid-offers' }) return } setSearchState({ status: 'success', result }) } const cheapestOffer = searchState.status === 'success' ? searchState.result.offer : null return ( <main className="page"> <section className="calculator" aria-labelledby="page-title"> <div className="intro"> <p className="eyebrow">Liikluskindlustuse vordlus</p> <h1 id="page-title">Leia odavaim MTPL pakkumine</h1> <p> Sisesta registrinumber ja vaatame mock-andmetest odavaima sobiva pakkumise. </p> </div> <form className="search-form" onSubmit={handleSubmit}> <label htmlFor="registration">Soiduki registrinumber</label> <div className="search-row"> <input id="registration" name="registration" type="text" value={registration} onChange={(event) => setRegistration(event.target.value)} placeholder="Naiteks 123ABC" autoComplete="off" /> <button type="submit" disabled={isLoading}> Leia odavaim pakkumine </button> </div> </form> <section className="result" aria-live="polite"> {isLoading && <p>Laen pakkumisi...</p>} {loadError !== null && <p className="message error">{loadError}</p>} {!isLoading && loadError === null && searchState.status === 'idle' && ( <p className="message">Proovi registrinumbreid 123ABC voi 456DEF.</p> )} {searchState.status === 'empty' && ( <p className="message error">Palun sisesta registrinumber.</p> )} {searchState.status === 'no-match' && ( <p className="message error"> Selle registrinumbriga pakkumisi ei leitud. </p> )} {searchState.status === 'no-valid-offers' && ( <p className="message error"> Sellele soidukile ei ole kehtivaid MTPL pakkumisi. </p> )} {cheapestOffer !== null && searchState.status === 'success' && ( <div className="offer"> <div> <p className="label">Kindlustaja</p> <p className="value">{cheapestOffer.insurer}</p> </div> <div> <p className="label">Algne hind</p> <p className="value"> {formatMoney(cheapestOffer.premium)} /{' '} {formatPeriod(cheapestOffer.period)} </p> </div> <div> <p className="label">Aastahind</p> <p className="value"> {formatMoney(cheapestOffer.yearlyPremiumEur)} </p> </div> <div> <p className="label">Vorreldud pakkumisi</p> <p className="value">{searchState.result.comparedCount}</p> </div> </div> )} </section> </section> </main> ) } export default App käime selle app.tsx koodi läbi samm sammu haaval ning aita mul mõista, koodi
```

## Prompt 28

```text
Kuidas need promptid panna codex-isse veel kokku üheks: PROMPT: Review the entire solution as if you were the interviewer. Check for: - unnecessary complexity - React best practices - TypeScript issues - edge cases - readability - naming - anything that could be simplified Do not change any files yet. Just provide a review. PROMPT KONTROLLIMISEKS Review the project as if you were the interviewer. Do not modify any files. Tell me: - Does the implementation satisfy the assignment? - Is the code simple and maintainable? - What are the strengths of this solution? - What would you improve if you had one more hour? - Are there any obvious bugs or edge cases left?
```

## Prompt 29

```text
I have enough context now. I’ll include concrete file references for the few things I’d flag, while keeping the verdict focused on the case-study intent. Running $i=1; Get-Content src/offers.ts | ForEach-Object { '{0,4}: {1}' -f $i, $_; $i++ }Running $i=1; Get-Content src/offers.ts | ForEach-Object { '{0,4}: {1}' -f $i, $_; $i++ }Running commandRunning command for 15s Running commandRunning command for 15s Running commandRunning command for 15s Do you want to run this command? $i=1; Get-Content src/offers.ts | ForEach-Object { '{0,4}: {1}' -f $i, $_; $i++ } 1Yes2Yes, and don't ask again for commands that start with kas luban?
```

## Prompt 30

```text
Potential issues[src/App.tsx (line 44)](C:/Users/karelallik/Desktop/proovitoo/src/App.tsx:44): offers.some((offer: RawOffer) => ...) treats every array item as RawOffer. This is acceptable here, but with truly messy API data an array item could be null, a number, or a string. Accessing offer.reg on null would throw. The business logic is more robust than this UI helper. [src/offers.ts (line 119)](C:/Users/karelallik/Desktop/proovitoo/src/offers.ts:119): offer as RawOffer has the same theoretical issue if the array contains null; toValidMtplOffer expects an object-like value. With the current mock JSON it is fine, but “messy production-like API data” could include non-object entries. [src/App.tsx (line 68)](C:/Users/karelallik/Desktop/proovitoo/src/App.tsx:68): response.json() is not validated before storing. This is mitigated because findCheapestMtplOffer handles non-arrays, but hasRegistrationMatch only handles array/non-array, not malformed array contents. [src/App.tsx (line 109)](C:/Users/karelallik/Desktop/proovitoo/src/App.tsx:109): Estonian text is ASCII-only (vordlus, Soiduki, Naiteks). That is understandable given file style, but for user-facing polish it reads less natural than proper Estonian characters. [src/index.css (line 48)](C:/Users/karelallik/Desktop/proovitoo/src/index.css:48): leftover starter selector #social .button-icon remains even though the starter UI is gone. Harmless, but a bit of template residue. There are no unit tests for the pure helpers. For live coding this is not fatal, but the business logic is exactly the part that would benefit from a few small table-driven tests. Suggested improvementsAdd an object guard before reading reg in both hasRegistrationMatch and toValidMtplOffer, so malformed array entries cannot throw. Add focused tests for normalizeRegistration, parsePremium, monthly/yearly normalization, invalid offers, and the two sample registrations. Consider returning a richer result from business logic, e.g. “raw registration match count” plus “valid compared count”, so the UI does not need its own registration-matching helper. Use proper Estonian UI text if encoding/style constraints allow it. Remove leftover starter CSS from index.css to make the project feel cleaner. If spending one more hour, I would prioritize tests and the malformed-array-entry guard over UI polish. Final interviewer-style verdict Strong pass for a live-coding case study. The candidate made good product and engineering choices: small scope, clear business/UI separation, defensive parsing, and readable React. The main gap is that the “messy API data” handling is almost complete but not fully hardened against malformed array items like null. That is a good discussion point, not a dealbreaker. Sain tagasiside antud promptile. Ise saan aru et messi API data handlingut võiks muuta,
```

## Prompt 31

```text
ehk mida ma põhiliselt siin korda teen, lihtsalt öeldes
```

## Prompt 32

```text
Implemented the minimal malformed-entry guard. Changed: [src/offers.ts](C:/Users/karelallik/Desktop/proovitoo/src/offers.ts): added isRecord(value): value is Record<string, unknown>, made toValidMtplOffer accept unknown, and guard before property access. [src/App.tsx](C:/Users/karelallik/Desktop/proovitoo/src/App.tsx): reused isRecord in hasRegistrationMatch before reading offer.reg. No UI behavior, styling, tests, or business rules changed. Verification passed: npm run build npm run lint Edited 2 files+13-4Review changesUndoReview src/App.tsxsrc/App.tsx+3-2 src/offers.tssrc/offers.ts+10-2
```

## Prompt 33

```text
nii ma tahaks read.me ka korda teha viimaks kuna see on hetkel selline # React + TypeScript + Vite This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules. Currently, two official plugins are available: - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs) - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) ## React Compiler The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation). ## Expanding the Oxlint configuration If you are developing a production application, we recommend enabling type-aware lint rules by installing oxlint-tsgolint and editing .oxlintrc.json:
json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
```

## Prompt 34

```text
## LIVE-CODING CASE STUDY — USER STORY (~3h) > "*Kasutajana tahan sisestada oma sõiduki registrinumbri ja näha liikluskindlustuse pakkumistest (vähemalt 3tk) kõige odavamat, et saaksin kiiresti teada, milline kindlustus mulle kõige vähem maksab.*" **Ülesanne.** Ehita lihtne mini-funktsionaalsus: kasutaja sisestab registrinumbri ja näeb mock-pakkumiste seast kõige odavamat liikluskindlustuse (MTPL) pakkumist. **Tehnoloogiad.** Vali ise, mis sulle sobib. Meile loeb mõtlemine ja tempo, mitte konkreetne _stack_. UI võib olla lihtne, ei pea olema _pixel-perfect_. **Andmed.** Pakkumised tulevad kaasasolevast offers.json failist. Failis on iga pakkumise hind (eurot aastas) ja selts. Ära kirjuta andmeid käsitsi ümber. Tegu on päris-API laadsete andmetega eri seltsidelt, nii et need võivad olla pisut sassis. Käitle neid nagu päris tootmisandmeid. Kui miski tundub valesti, usalda andmeid ja küsi julgelt üle. Proovi näiteks registreid 123ABC ja 456DEF. **Eesmärk ei ole valmis ja viimistletud toode, vaid mõtteviis.** Me ei testi koodi rida-realt. Tahame näha, kuidas sa probleemi lahti võtad, mis tempos liigud ja kuidas AI-d kasutad. AI-kasutamine on lubatud ja oodatud (Claude Code, Cursor, mis iganes). Meid huvitab _kuidas_ sa seda kasutad, mitte kas. **Aeg.** Planeeri umbes 3 tundi. Tähtsam kui valmis saada on see, mida sa selle ajaga valid teha. **Üleandmine.** Tee tööst _git repo_. Lõpus näitad seda ja räägid oma valikutest (umbes 15 min). Küsimusi võib küsida igal hetkel. -- aga kui eesti keeles ja võimaliukt selle lähedane
```
