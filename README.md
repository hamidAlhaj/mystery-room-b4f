# Mystery Room — The Case Archive

An interactive mystery game by Team 4, B4F Cohort 8, Salamiyah. Explore two Arabic stories through an English interface, inspect evidence, solve three stages, and uncover a story ending. React displays the experience; Express owns progress and validates every answer.

## Run locally

Use Node.js 22 or newer and npm. Open two terminals from the repository root.

**Backend**

```powershell
cd server
npm install
npm start
```

**Frontend**

```powershell
cd client
npm install
npm run dev
```

Open the URL Vite prints (normally http://localhost:5173). The API listens on port 3001. The client proxies `/api` to that port. No database, credentials, or `.env` file is required. For reproducible installs use `npm ci` in each directory.

If port 3001 is occupied, stop your previous development server in its terminal before starting a new one. Restarting the backend resets all progress. If you intentionally change `PORT`, also update the proxy in `client/vite.config.ts`. Run npm commands inside `client` or `server`, not the repository root.

## Play

1. Start at Home and select **Explore the mysteries**.
2. Open a case, read its story, and select **Start mystery**.
3. Reveal clues and choose or type an answer. Wrong guesses do not consume hints or advance the stage.
4. Request a hint if needed. Each mystery has three hint requests total; requesting the same stage's hint again also consumes a request.
5. Complete all three stages to read the final reveal. Completed cases remain marked solved while the backend is running.

| Case | Story | Input |
| --- | --- | --- |
| The sealed room in Souq Al-Hamidiyah | Discover what Abu Saleh protected behind three locks | Multiple choice |
| Facing the wizard Arcanus | Pass the castle guardian's tests and discover the purpose of the amulet | Arabic free text; several accepted variants |

Stories, hints, clues, and endings are Arabic. Navigation, feedback, and documentation are English. There is no timer, loss counter, login, or individual player account.

## Features and state ownership

- Home, archive, details, game, results, and not-found screens with real Router navigation.
- Server-owned progression, answer validation, three-hint limits, and endings disclosed only after completion.
- Loading, error/retry, empty, wrong-answer, and success states.
- Reusable typed cards, answer form, progress, hints, clues, and feedback components.
- Keyboard controls, focus styles, skip link, Arabic text direction, responsive CSS, and reduced-motion support.
- One API module; no fetch calls in UI components.
- Local component state for forms and request status; URL for the selected case; one in-memory backend store for game state.

**Progress is shared across all browsers connected to the same server process.** Refreshing keeps that server progress; restarting resets it. This is the intentional bootcamp model, not per-player persistence. Simultaneous players should use separate server instances for independent demonstrations.

## Project layout

```text
client/
  src/
    main.tsx                  # StrictMode and the single BrowserRouter
    App.tsx                   # Layout and route table
    api.ts                    # Named API helpers and error handling
    types.ts                  # Public API interfaces (no answers)
    index.css                 # Theme, layouts, responsiveness, focus styles
    components/
      Navbar.tsx, Footer.tsx
      LoadingMessage.tsx, ErrorMessage.tsx, EmptyState.tsx
      MysteryCard.tsx, ProgressBar.tsx
      game/
        StageHeader.tsx, StageQuestion.tsx, StageProgress.tsx
        AnswerOptions.tsx, SubmitAnswerButton.tsx
        HintButton.tsx, HintBox.tsx, CluePanel.tsx
        GameStatus.tsx, SuccessMessage.tsx, WrongAnswerMessage.tsx
        ResultCard.tsx
    pages/
      HomePage.tsx, MysteriesPage.tsx, MysteryDetailsPage.tsx
      GamePage.tsx, ResultPage.tsx, NotFoundPage.tsx
server/
  index.js                    # Environment and listening port
  app.js                      # Express setup, router, basic JSON errors
  routes/mysteries.js          # Endpoint-to-controller mapping
  controllers/mysteryController.js
  data/mysteries.js            # Stories, stages, accepted answers, reveals
  store.js                    # Single mutable runtime state owner
  tests/mysteries.test.js      # Independent HTTP integration tests
  utils.js                    # Unused delay helper retained from the starter
docs/
  CODE-WALKTHROUGH.md          # Team recap, request flow, demo, requirements
  MOLHAM-PAGES.md              # Frontend integration notes
```

The client follows B4F Hub's flat API/types structure, named functions, typed props, relative imports, reusable components, and plain CSS. Redux/Context are not needed for the current ownership model. No new application dependency was added by the cleanup.

## Routes

| URL | Screen |
| --- | --- |
| `/` | Home and instructions |
| `/mysteries` | API-backed case archive |
| `/mysteries/:id` | Story and progress |
| `/mysteries/:id/play` | Current server-owned stage |
| `/result/:id` | Ending if solved; Continue link otherwise |
| Any unknown path | Not-found page |

## API contract

Base: http://localhost:3001. Error responses use `{ "error": "Readable message" }`.

| Method | Path | Behavior |
| --- | --- | --- |
| GET | `/api/mysteries` | Public collection |
| GET | `/api/mysteries/:id` | Public mystery or 404 |
| GET | `/api/mysteries/:id/clues` | All clues for that mystery or 404 |
| POST | `/api/mysteries/:id/answers` | Accepts `{ "answer": "..." }`; wrong guess is 200 with `correct: false` |
| PATCH | `/api/mysteries/:id/hint` | Consumes one hint request; returns hint and remaining count |

Public mysteries include `id`, `slug`, `title`, `intro`, `totalStages`, `currentStage` (zero-based), `solved`, `hintsUsed`, `hintsRemaining`, `currentQuestion`, `currentOptions`, and `reveal` (null until solved). Solved cases expose no current question/options. Private stage definitions and accepted answers never leave the server.

- **400:** missing, blank, wrong-typed, or over-200-character answer; malformed JSON.
- **404:** unknown mystery or API route.
- **409:** answering/requesting hints after completion, or requesting an exhausted hint budget.
- **413:** JSON body exceeds 10 KB.
- A wrong but well-formed guess is normal gameplay, not an HTTP validation error.

## Check the project

```powershell
cd client
npm run build
npm run lint
cd ../server
npm test
```

The Node test runner starts the actual Express app on an isolated temporary port. It checks both complete stories, every accepted free-text alias, reveal privacy, clues, malformed input, 400/404/409 handling, and independent hint budgets. No extra testing dependency is needed.

Independent manual examples (PowerShell):

```powershell
curl.exe http://localhost:3001/api/mysteries
curl.exe http://localhost:3001/api/mysteries/2
curl.exe http://localhost:3001/api/mysteries/2/clues
Invoke-RestMethod http://localhost:3001/api/mysteries/1/answers -Method Post -ContentType 'application/json' -Body '{"answer":"brass"}'
Invoke-RestMethod http://localhost:3001/api/mysteries/2/hint -Method Patch
curl.exe -i http://localhost:3001/api/mysteries/999
Invoke-WebRequest http://localhost:3001/api/mysteries/1/answers -Method Post -ContentType 'application/json' -Body '{}'
```

The final command intentionally returns 400. POST/PATCH examples change runtime progress; restart the server before a fresh demo.

## Verification and remaining team work

Verified on 2026-10-03: clean temporary `npm ci` installs for both packages, TypeScript/Vite build, ESLint, six independent HTTP tests, and browser completion of both mysteries including wrong answers, hint exhaustion, final reveals, and a result refresh. Missing-ID recovery UI also works. Full details and the requirements checklist are in [the walkthrough](docs/CODE-WALKTHROUGH.md).

The code cannot establish team authorship or rehearse a presentation. Before submission, the team must review the story wording for originality, confirm each member's real commits, assign speaking roles, and rehearse the 5–7 minute English demo. Do not manufacture contributions or mark these human requirements complete automatically.

## Team 4

Read the [team presentation guide](docs/PRESENTATION_GUIDE.md) for code walkthroughs,
B4F lesson references, questions and answers, and a rehearsal checklist. It links
to a separate guide for each of the six members and marks unverified ownership or
missing assigned files as `TODO: need confirmation`.

Hamid Al Haj (leader), Shiam Ezzo, Ali Mikdad, Mulham Al Kasir, Adham Albasha, and Hassan Alloush. The team leader coordinates the final work split. See the walkthrough for suggested speaking topics, not claimed authorship.

## Scope

Built for the B4F weekly mini-project. React 18, React Router 7, TypeScript, Vite, Express, and in-memory state. No database, authentication, deployment, async Redux framework, or validation library. Keep development and presentation local, as required by the assignment.

## Adham component integration

Adham's supplied game components are integrated under lowercase
`client/src/components/game/` to keep import casing consistent across operating
systems. `GamePage` composes his header, progress text, question, options, submit,
hint, clue, and feedback components. `ProgressBar` uses native accessible progress.
`ResultPage` uses his result statistics, extended with the server-provided ending.
The card uses explicit props and real case navigation instead of the draft Register
button; unsupported duration/difficulty fields are not invented.

The existing API, backend stories, local mutation guards, error recovery, and theme
remain integrated. The obsolete AnswerForm/HintPanel wrappers and duplicate root
ResultCard were removed. The README and code walkthrough reflect the merged layout.
Build, lint, six API tests, and browser completion of both mysteries passed after
integration. No commits or authorship claims were created by importing these files.
