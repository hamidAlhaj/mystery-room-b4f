# Presentation Guide — Adham Albasha

[Full team guide](PRESENTATION_GUIDE.md)

# 1. Project Overview

Mystery Room — The Case Archive is a browser game with two Arabic stories and an
English interface. Players choose a case, read clues, submit answers, and solve
three stages to unlock an ending.

B4F Hub is the bootcamp teaching project for community posts and opportunities.
Mystery Room applies its programming patterns to a different product. It does not
call Hub's services or share its data. Removing Mystery Room would not break Hub.

| Part | Current implementation |
| --- | --- |
| Frontend: the browser interface | React, TypeScript for code checking, React Router for navigation |
| Development tool | Vite serves the client and forwards /api requests to Express |
| Backend: the request-handling program | JavaScript runs in Node.js; Express maps requests to functions |
| API: the communication contract | GET reads data, POST submits answers, PATCH requests hints |
| Data format | JSON: text representing objects, arrays, and simple values |
| Database and ORM | None. An ORM is a database-mapping tool; we do not use one |
| Authentication: identity checking | None. There are no accounts, passwords, tokens, or login sessions |
| Runtime storage | One in-memory server store, shared by connected browsers |
| Persistence | Browser refresh keeps server progress; server restart resets it |

HTTP is the request/response protocol between client and server. A proxy forwards
requests: during development, Vite forwards /api to localhost:3001. Normal npm start
in server does not serve the React production bundle.

```mermaid
flowchart LR
  Hub["B4F Hub: study reference"] -. "patterns only" .-> UI["Mystery Room pages and components"]
  UI --> Helpers["api.ts: request helpers"]
  Helpers --> Proxy["Vite /api proxy"]
  Proxy --> API["Express router and controllers"]
  API <--> Store["store.js: runtime progress"]
  Seed["data/mysteries.js: seed stories and answers"] --> Store
  API -->|"public JSON"| UI
```

## Team responsibilities and evidence

This is a guide to the **current integrated working tree**, including uncommitted
changes. Your latest role list defines presentation responsibilities; it does not
prove who wrote every line. Shared-file authorship is not invented.

| Member | Presentation area | Important limit |
| --- | --- | --- |
| Shiam Ezzo | Pages, routes, and layout | AppRouter, AboutPage, and separate Header files are absent |
| Hassan Alloush | API helpers, public types, and feedback | Current files are flat api.ts/types.ts, not the proposed folders |
| Mulham Al Kasir (Molham) | Existing page-local state and game flow | Earlier page work exists; assigned Context/Redux files are absent |
| Adham Albasha | Game components and results | Supplied components were merged and adapted |
| Hamid Al Haj | First mystery and shared backend overview | First-case ownership is user-confirmed; shared-file split is unclear |
| Ali Mikdad | Second mystery and validation behavior | Second-case ownership is user-confirmed; shared-file split is unclear |

Shiam and Mulham discuss overlapping pages from different angles: navigation versus
state and requests. This is a speaking plan, not an exclusive authorship assignment.
Later integration fixes, tests, and new reveal text are not automatically credited
to the original puzzle authors.

# 2. Team Member Section

## Adham Albasha – Game Components and Result UI

### 2.1 High-Level Summary

This area breaks the game screen into smaller components with clear jobs. Components show the question, answer controls, hints, clues, feedback, progress, and final result. The game page supplies their data and handles requests. The supplied work has been adapted to the current project, so this guide describes the integrated versions.

### 2.2 Files They Worked On

These are the current files for this presentation area. Shared or comparison files
are not proof of individual authorship; missing assignments are noted below.

| File Path | Purpose | Key Functions/Classes/Components |
| --- | --- | --- |
| [client/src/components/MysteryCard.tsx](<../client/src/components/MysteryCard.tsx>) | Shows an archive case and its link | MysteryCard |
| [client/src/components/ProgressBar.tsx](<../client/src/components/ProgressBar.tsx>) | Displays bounded completed-stage progress | ProgressBar |
| [client/src/components/game/StageHeader.tsx](<../client/src/components/game/StageHeader.tsx>) | Displays case heading | StageHeader |
| [client/src/components/game/StageQuestion.tsx](<../client/src/components/game/StageQuestion.tsx>) | Labels the question inside a fieldset | StageQuestion |
| [client/src/components/game/AnswerOptions.tsx](<../client/src/components/game/AnswerOptions.tsx>) | Displays controlled radio choices | AnswerOptions |
| [client/src/components/game/SubmitAnswerButton.tsx](<../client/src/components/game/SubmitAnswerButton.tsx>) | Displays submission state | SubmitAnswerButton |
| [client/src/components/game/HintButton.tsx](<../client/src/components/game/HintButton.tsx>) | Triggers the supplied hint callback | HintButton |
| [client/src/components/game/HintBox.tsx](<../client/src/components/game/HintBox.tsx>) | Displays returned hint text | HintBox |
| [client/src/components/game/CluePanel.tsx](<../client/src/components/game/CluePanel.tsx>) | Toggles the clue region | CluePanel |
| [client/src/components/game/StageProgress.tsx](<../client/src/components/game/StageProgress.tsx>) | Displays the human-readable stage number | StageProgress |
| [client/src/components/game/GameStatus.tsx](<../client/src/components/game/GameStatus.tsx>) | Displays a game status message | GameStatus |
| [client/src/components/game/SuccessMessage.tsx](<../client/src/components/game/SuccessMessage.tsx>) | Announces positive feedback | SuccessMessage |
| [client/src/components/game/WrongAnswerMessage.tsx](<../client/src/components/game/WrongAnswerMessage.tsx>) | Announces wrong-answer feedback | WrongAnswerMessage |
| [client/src/components/game/ResultCard.tsx](<../client/src/components/game/ResultCard.tsx>) | Shows ending and completion statistics | ResultCard |

### 2.3 Code Walkthrough

1. `MysteriesPage` passes each case's explicit ID, title, description, stages, and solved flag to `MysteryCard`.
2. `GamePage` passes the current title and question to the heading components. `StageQuestion` renders a `legend`, the label for a group of form controls.
3. When options exist, `AnswerOptions` displays radio inputs. Its selected value comes from the page and its callback reports a new selection. For case 2, the text input lives directly in `GamePage`.
4. Buttons receive disabled/loading values. Their callbacks invoke page handlers; the display components do not check the secret answers.
5. Hint and clue components display server data. `CluePanel` receives its open state and toggle callback; all returned clues can be shown, not only completed-stage clues.
6. `StageProgress` adds one to the zero-based stage index for display. `ProgressBar` clamps its current value to a safe range and uses a native progress element.
7. The page uses `GameStatus` for idle/submitting status and the separate success/wrong components for actual server feedback. Do not claim every supported GameStatus branch is exercised by the page.
8. `ResultPage` supplies the solved reveal and statistics to `ResultCard`. The integrated card includes ending text and navigation, beyond the original statistics-only draft.

### 2.4 Key Concepts to Learn

**Props.** Props are values and functions a parent passes to a child component. They let the same visual component display different cases without owning the game rules.

**Controlled input.** A controlled input receives its value from React state. On change, it calls a handler so the parent can update that value.

**Composition.** Composition means building a screen by combining smaller components. The page coordinates behavior while each child has a focused display responsibility.

**Accessible semantics.** Semantic HTML describes what an element does, such as a button or a group of answers. Status roles and expanded-state attributes help assistive tools announce changes.

### 2.5 Connection to B4F Hub

Compare Hub’s [OpportunityCard](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/client/src/components/OpportunityCard.tsx>) and its shared feedback components. Both projects use typed component boundaries, though Hub’s card also uses shared-state hooks. Removing our game components would break their importing pages; it would not affect Hub.

### 2.6 Connection to b4f-cohort8 Docs

- [Session 1 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-01/SESSION_GUIDE-EN.pdf>): Section 5 distinguishes page-level screens from smaller components.
- [Session 2 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-02/SESSION_GUIDE-EN.pdf>): Sections 7 and 9 support keeping local concerns local and using props when enough.
- [Session 3 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-03/SESSION_GUIDE-EN.pdf>): Section 10 helps explain why reusable UI does not automatically require Redux.

### 2.7 Presentation Talking Points

- Start: “I split the playing screen into components that each do one clear job.”
- Show the game folder, then follow props into `AnswerOptions`.
- Demo a radio selection, clue toggle, hint, and result reveal.
- Mention the text-input branch is in the page and answer validation is on the server.
- Avoid showing the old draft as if its props still match the integrated application.

### 2.8 Expected Questions & Answers

| Question | Simple Answer |
| --- | --- |
| Where do these components fetch data? | They receive data from the pages; game request coordination is in GamePage. |
| Why is the first stage displayed as 1? | The server index starts at 0, so the display adds one. |
| Does ProgressBar decide completion? | No. It only displays supplied values. |
| Why split feedback components? | They keep message styling and accessibility consistent. |

### 2.9 Glossary for This Member

| Term | Meaning |
| --- | --- |
| Prop | An input passed into a component. |
| Radio input | A control that selects one option in a group. |
| Legend | A label describing a fieldset. |
| Composition | Combining smaller components into a screen. |
| aria-expanded | An attribute describing whether controlled content is open. |

**Scope and attribution:** The supplied Adham code was merged and adapted. Current card props, navigation, feedback integration, and reveal support must be explained from these files; later integration edits are not proof of original authorship.

# 3. Cross-Team Integration

Shiam explains the screens and addresses. Mulham explains temporary page state.
Adham explains the display components. Hassan explains the API helpers and types.
Hamid and Ali explain the shared server and their respective stories.

```mermaid
sequenceDiagram
  participant Player
  participant Page as Pages and local state
  participant UI as Game components
  participant Helper as api.ts
  participant Server as Express controller
  participant Store as Runtime store
  Player->>Page: Open a mystery by ID
  Page->>Helper: getMysteryById and getClues
  Helper->>Server: GET requests
  Server->>Store: Read current case
  Server-->>Page: Public JSON through helper
  Page->>UI: Question, options, callbacks
  Player->>UI: Choose or type an answer
  UI->>Page: Input or submit event
  Page->>Helper: submitAnswer
  Helper->>Server: POST answer
  Server->>Store: Validate, update if correct
  Server-->>Page: correct and message through helper
  Page->>Helper: GET latest state after success
  Page->>UI: Next stage or final ResultCard
```

B4F Hub is **outside** this runtime sequence. There are no shared imports, API
endpoints, database tables, or cross-project events. It provides the study examples.

| Boundary | Agreement |
| --- | --- |
| Page to component | Props: values/functions passed from parent to child |
| Component to page | Callbacks: functions called when the player acts |
| Page to API helper | Named functions, not fetch calls scattered through components |
| API to backend | JSON bodies and deliberate HTTP status codes |
| Backend to page | Zero-based currentStage, hintsRemaining, reveal:null until solved |
| Seed to runtime | One mutable store; accepted answers stay private |

Important differences from Hub: our missing-mystery helper throws rather than
returning null; seeds are deep-copied; Express setup is in app.js; basic JSON-parser
error handling was added during integration. Session 6 discusses error middleware
conceptually, but its Hub example did not implement that handler. Do not describe
our additions as exact code taught in that session.

# 4. Presentation Day Checklist

## Before the talk

- Open this guide, the project, and two terminals in server and client.
- Run npm install (or npm ci) separately in both directories before presentation day.
- Start server with npm start and client with npm run dev. Use Vite's printed URL.
- Do not start a second backend on an occupied port. The default API port is 3001.
- Restart the dedicated demo backend before a fresh demonstration; this clears progress.
- Check client npm run build, client npm run lint, and server npm test beforehand.
- Confirm each speaker's role and review story wording as a team.

## Suggested six-minute order

| Speaker | Time | Have open | Show |
| --- | --- | --- | --- |
| Hamid | 45 sec | Home and first-case data | Team, product, player goal |
| Shiam | 45 sec | App.tsx and browser | Home to archive to details; ID in URL |
| Mulham | 60 sec | GamePage.tsx | Input state, wrong attempt, server progression |
| Adham | 75 sec | AnswerOptions and ResultCard | Clue/hint controls; final reveal |
| Hassan | 60 sec | api.ts, types.ts, ErrorMessage | Request flow and recovery |
| Ali | 75 sec | Second-case data and tests | Free text, validation, challenge and improvement |

This is a proposed speaking order, not a claim of code authorship. The assignment
asks for a 5–7 minute English product presentation, not a reading of every file.

## Demo sequence

1. Start at Home and explain the player goal in one sentence.
2. Open case 1. Choose iron to demonstrate a wrong guess without progression.
3. Show clues and request one hint. Explain the three-request budget per case.
4. Solve the case, show the actual ending and statistics, and refresh the result.
5. Open case 2 to show the text-input branch if time allows.
6. Explain a real challenge: a server can accept an answer before its response is lost.
7. Explain the recovery: GET current progress before making another change.

<details>
<summary>Presenter answer key — spoilers</summary>

- Case 1: brass → 42 → 12.
- Case 2: قاف → يلعب الشطرنج → ١٠ (or 10).
- These are preparation notes, not answers embedded in the client.

</details>

## Backup plan

- If the interface or API fails, inspect the relevant terminal and show the recovery state honestly.
- If already solved, restart only the dedicated demo backend, not an unrelated process.
- Use previously captured screenshots or test output as backup, clearly labelled prior evidence.
- Run npm test in server to show independent API behavior. Its isolated process does not reset the live demo server.
- Avoid package upgrades or new installs during the talk.

Independent failure examples in PowerShell:

```powershell
Invoke-WebRequest http://localhost:3001/api/mysteries/1/answers -Method Post -ContentType 'application/json' -Body '{}'
curl.exe -i http://localhost:3001/api/mysteries/999
```

The first intentionally returns 400; the second returns 404. Neither solves a stage.

# 5. Final Notes

## Facts and limits

- The current source and supplied B4F reference files are the evidence for this guide.
- The project specification permits local state and does not require Redux or Context.
- Hamid's first-case and Ali's second-case ownership comes from the user's confirmation.
- A source folder named molham does not prove Molham authored every file inside it.
- Tests and browser checks recorded in CODE-WALKTHROUGH.md are previous verification evidence. This documentation-only task does not claim a fresh application test run.
- Contributions must be supported by actual work and history, not generated attribution.

## Open questions retained without blocking this draft

- **TODO: need confirmation** — will Shiam's AppRouter, Header, and About files arrive later, or are the current equivalents final?
- **TODO: need confirmation** — does Hassan have another api/types implementation, or are the flat modules the agreed version?
- **TODO: need confirmation** — is existing local-state/page work Mulham's final speaking topic, or will he supply Context/Redux files?
- **TODO: need confirmation** — how do Hamid and Ali divide the shared server files?
- **TODO: need confirmation** — who should receive credit for later reveal wording, integration fixes, and tests?
- **TODO: need confirmation** — confirm the speaking order, real Git contributions, and story originality as a team.
- **TODO: need confirmation** — PROJECT-SPEC-EN.pdf refers to PRESENTATION-GUIDE-EN.md, but that separate document was not found in the supplied docs. Timing here follows the specification's own sections 18–21.

No missing feature is presented as implemented. No database, authentication, theme
switch, language switch, game slice, or live Hub integration is claimed.

## Source index

- [Mystery Room setup](<../README.md>)
- [Current code recap and verification](<CODE-WALKTHROUGH.md>)
- [B4F Hub README](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/README.md>)
- [Session 1 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-01/SESSION_GUIDE-EN.pdf>)
- [Session 2 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-02/SESSION_GUIDE-EN.pdf>)
- [Session 3 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-03/SESSION_GUIDE-EN.pdf>)
- [Session 4 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-04/SESSION_GUIDE-EN.pdf>)
- [Session 5 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-05/SESSION_GUIDE-EN.pdf>)
- [Session 6 study guide](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Sessions/session-06/SESSION_GUIDE-EN.pdf>)
- [Project specification: sections 7–10, 13–17, 18–21](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Weekly Mini Projects/weekly-mini-project-01/PROJECT-SPEC-EN.pdf>)
- [Team division: Team 4 and teamwork rules](<../../../B4F-BootCamp/b4f-cohort8-salamiyah-react-node-bootcamp-2026/docs/Weekly Mini Projects/weekly-mini-project-01/Weekly_Mini_Project_01_Teams.pdf>)

Repository links are relative. Hub/PDF links target the supplied sibling bootcamp
folder; teammates with a different folder layout should update that reference path.
Section numbers in the explanations also let you locate PDF material manually.
