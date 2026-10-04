# Mystery Room: team code recap

Read this once to understand the whole project, then open the files beside it.
This describes the implemented code, not a proposed architecture.

## 1. Explain the product in thirty seconds

“Mystery Room is a browser game with two story cases. Players read the situation,
read questions, and solve three stages. React shows the interface, but Express
checks every answer and owns progress. Completing a case unlocks its ending.”

The first case uses multiple-choice answers. The second uses typed Arabic answers.
English labels help the English presentation; the stories remain Arabic.

## 2. Start with the state owners

| Information | Owner | Why |
| --- | --- | --- |
| Which case is open | Router URL | Direct links and refreshes work |
| Current input, visible hint, pending request | React page state | Only this screen needs them |
| Actual stage, solved flag, hint count | `server/store.js` | Client cannot award itself progress |
| Story, accepted answers, reveal | `server/data/mysteries.js` | Content and answers stay server-side |

The server deep-copies seed data once. Controllers all read and update that same
runtime store. `resetMysteries()` exists for isolated tests, not as a public route.
The app does not need Redux, Context, localStorage, authentication, or a database.
Different browsers share this server's progress. Restarting the process resets it.

## 3. Follow an answer end to end

1. `GamePage` renders a form using `StageQuestion`, `AnswerOptions` (or a text
   input), and `SubmitAnswerButton`. It passes values and callbacks through typed props.
2. The input callback updates `GamePage` local state. Nothing is validated as
   correct in the browser.
3. Submit invokes `handleSubmit`. Blank input and overlapping actions are blocked.
   The synchronous `busy` ref prevents a second action before React has rendered.
4. `api.ts` sends POST `/api/mysteries/:id/answers` with JSON `{ answer }`.
5. `routes/mysteries.js` forwards the request to `submitAnswer` in the controller.
6. The controller finds the case, validates the input, checks completion, then
   compares the trimmed lowercase input against one answer or accepted aliases.
7. Wrong guesses return `correct: false` without changing progress. Correct guesses
   advance a stage; the final answer sets `solved: true`.
8. The page reloads the public state with GET. It clears the old selection/hint,
   shows the next question, or navigates to the result when the server says solved.
9. `ResultPage` fetches independently. `ResultCard` renders the ending and totals.

A TypeScript interface describes the expected JSON; it is not runtime validation.
Validation of submitted answers is performed with plain JavaScript checks on the server.

## 4. Client file tour

| File | What to explain |
| --- | --- |
| `main.tsx` | Mounts React in StrictMode and wraps the application in one BrowserRouter |
| `App.tsx` | Shared shell and six route definitions; no gameplay calculations |
| `api.ts` | One fetch wrapper, named helpers, JSON request headers, readable HTTP errors |
| `types.ts` | Mystery, AnswerResponse, HintResponse interfaces |
| `pages/HomePage.tsx` | Product introduction, instructions, and archive link |
| `pages/MysteriesPage.tsx` | Collection request, retry, empty state, and card mapping |
| `pages/MysteryDetailsPage.tsx` | Story and Start/Continue/Result decision |
| `pages/GamePage.tsx` | Game orchestration and asynchronous state guards |
| `pages/ResultPage.tsx` | Checks actual completion; unfinished cases get a Continue link |
| `pages/NotFoundPage.tsx` | Unknown client URL recovery |
| `components/Navbar.tsx` | Home/archive navigation and native How to play disclosure |
| `components/Footer.tsx` | Shared project identity |
| `components/MysteryCard.tsx` | Case summary and solved status, supplied by props |
| `components/game/ResultCard.tsx` | Ending, completed stage count, and hints used |
| `components/LoadingMessage.tsx` | Reusable label announced with `role="status"` |
| `components/ErrorMessage.tsx` | Message, optional title/help content, and caller-owned retry |
| `components/EmptyState.tsx` | No-content feedback |
| `components/game/StageHeader.tsx` | Case title and file number |
| `components/game/StageQuestion.tsx` | Arabic question as the fieldset legend |
| `components/game/AnswerOptions.tsx` | Controlled radio selection via props |
| `components/game/SubmitAnswerButton.tsx` | Submit button and pending label |
| `components/ProgressBar.tsx` | Native accessible progress with bounded current/total values |
| `components/game/StageProgress.tsx` | Current stage label |
| `components/game/HintButton.tsx` | Disabled/pending hint request button |
| `components/game/HintBox.tsx` | Arabic hint text announced as status |
| `components/game/GameStatus.tsx` | Pending answer announcement |
| `components/game/SuccessMessage.tsx` | Backend success message |
| `components/game/WrongAnswerMessage.tsx` | Backend wrong-answer message |
| `index.css` | Theme tokens, layout, cards, forms, feedback, mobile and reduced-motion styles |
| `vite.config.ts` | Proxies relative `/api` requests to localhost:3001 during development |

Named components, interfaces, relative imports, API helpers, simple effects, and
plain CSS follow B4F Hub. App-level state libraries are intentionally absent because
there is no genuinely shared client-owned state here.

## 5. Safe asynchronous behavior

Each loading effect has an `ignore` cleanup flag. A late GET response cannot update
an obsolete screen. ID-keyed detail/game/result content resets temporary state when
the URL switches to another case. `GamePage` also tracks whether it is mounted before
using mutation results.

Answer and hint requests cannot overlap in the same game screen. After a mutation
error, the player must reload server progress before trying another mutation. A
network failure might occur after the server accepted the answer: GET recovery
avoids accidentally replaying it. The UI never assumes a local stage increment is
proof of success.

These guards are local UI protections, not multi-user sessions. Another browser can
still change the shared server state; that limitation is stated on Home and in the README.

## 6. Backend file tour

| File | Responsibility |
| --- | --- |
| `index.js` | Loads optional environment settings and starts listening |
| `app.js` | Creates Express, parses JSON, mounts the router, handles API 404 and JSON parsing errors |
| `routes/mysteries.js` | Maps the five endpoint kinds to controller functions |
| `controllers/mysteryController.js` | Public serialization, input checks, answer progression, hints |
| `data/mysteries.js` | Two seed cases, three stages each, hints/clues, answer aliases, final reveals |
| `store.js` | Deep-copied runtime data, find-by-ID helper, reset helper for tests |
| `tests/mysteries.test.js` | Real HTTP requests against an isolated instance of the actual app |
| `utils.js` | Unused delay helper retained from the starter; not imported by the app |

`toPublicMystery()` intentionally excludes private stages/answers. `reveal` is null
until solved; after solving, question/options are empty. `hintsRemaining` comes from
the backend so the client does not hardcode a separate budget.

The clues button and panel have been removed from the client. The backend clues
endpoint remains available, but the game page no longer requests it.

## 7. Status codes and validation

| Situation | Status | Meaning |
| --- | --- | --- |
| Successful list/detail/clues/hint/answer request | 200 | Request processed |
| Well-formed but incorrect answer | 200 + `correct: false` | Valid gameplay attempt |
| Missing, wrong-type, blank, or too-long answer | 400 | Invalid input |
| Malformed JSON | 400 | Body cannot be parsed |
| Unknown case or route | 404 | Resource does not exist |
| Mutation after completion or exhausted hint budget | 409 | Request conflicts with current state |
| JSON body larger than 10 KB | 413 | Payload exceeds configured bound |

Every error has a clear message for the client. `api.ts` reads the error string;
non-JSON failures receive a generic fallback. The existing public routes need no
login or browser cookie. Private answers belong only in backend source.

## 8. How to add a case without breaking the contract

1. Add a unique numeric ID and slug to `initialMysteries`.
2. Write a story and an ending that resolves it. Include title, intro, and reveal.
3. Add ordered stages with IDs starting at zero. Set `totalStages` to their count.
4. Each stage needs a question, answer string or array of accepted strings, options,
   hint, and clue. Use `options: []` for a text-answer stage.
5. Initialize `currentStage: 0`, `hintsUsed: 0`, `solved: false`.
6. Expand HTTP test fixtures and complete the case in the browser.
7. Review Arabic wording and aliases with the team; the code does not normalize
   every Arabic spelling/diacritic variant automatically.

Avoid embedding correct answers in React components. Avoid adding Redux merely to
mirror the server. Keep the educational architecture small.

## 9. Requirement coverage

Based on PROJECT-SPEC-EN.pdf and Weekly_Mini_Project_01_Teams.pdf supplied by the user.
The PDFs describe the assignment; they do not authorize publishing or Git actions.

| Requirement | Evidence / status |
| --- | --- |
| React + Express working together | Both stories completed through the browser and actual API |
| Three meaningful routes and a dynamic route | Home, archive, details/play by ID, results, fallback |
| Real navigation and backend-driven screen | Router links; list/details/game/results request API data |
| Central API/helper layer | All client fetch calls in `api.ts` |
| Loading, errors, recovery | Shared feedback components; page retry and game GET recovery |
| Interactive input and final story resolution | Radio/text forms and server-gated Arabic reveals |
| Router/controller organization | Express router plus exported controllers |
| Shared in-memory state owner | `store.js` |
| GET collection, GET by ID, POST, PATCH | Five meaningful mystery endpoints |
| Input validation, real 400/404 | Independent HTTP tests, including malformed JSON |
| Independent backend testing | `npm test`; manual curl/PowerShell examples in README |
| Intentional visual identity | Case Archive colors, typography, door art, evidence panels |
| Local fresh install/start | Clean temporary npm ci installs; build/lint/tests pass; Vite starts |
| Scope restrictions | No database/auth/deployment/async Redux/validation-library dependencies |
| Team-owned original content | Team must review/approve supplied puzzles and newly drafted endings |
| Visible contribution from all six members | Team must verify real Git history; no authorship fabricated |
| Everyone understands the system | Use this recap and rehearse questions together |
| English presentation, real speaking roles | Team must assign and rehearse the plan below |

The remaining human requirements cannot be proven by a build or by generated code.

## 10. Demo and discussion plan (suggested, not assigned authorship)

Aim for 5–7 minutes. The leader confirms assignments with the team.

| Speaker | Suggested focus |
| --- | --- |
| Hamid Al Haj | Introduce the team, project goal, and two stories |
| Shiam Ezzo | Show Home, navigation, and how a player chooses a case |
| Mulham Al Kasir | Demonstrate a wrong answer, hint, and progression |
| Adham Albasha | Finish the case and explain the final reveal and reusable game UI |
| Hassan Alloush | Explain API helpers, typed props, and error/retry behavior |
| Ali Mikdad | Explain server validation, independent tests, and one challenge/next improvement |

Suggested architecture sentence: “The URL identifies the case, local state handles
the interface, and the server owns real progress. The client asks the server after
each answer instead of deciding whether the player won.”

A useful challenge: recovering when a POST succeeds but its response is lost.
A realistic future improvement: independent player progress, if a later assignment
allows the additional persistence/session architecture. Do not implement it here.

## 11. Demo preparation and spoiler key

Restart the backend before a fresh demonstration. Confirm client port and API port,
then walk from Home through one whole case. Keep the second case as a free-text
example. Test an incorrect guess first. Show the final reveal, not just the badge.

<details>
<summary>Presenter answer key — spoilers</summary>

- Case 1: `brass`, `42`, `12`.
- Case 2: `قاف`, `يلعب الشطرنج`, `١٠` (or `10`).
- Three hint requests are shared across stages of each case.

</details>

Questions everyone should answer:

- Why does a wrong guess use 200, while a missing answer uses 400?
- Where do correct answers live, and why are they not in the public response?
- Why is Redux unnecessary here?
- What survives a browser refresh? What disappears after a server restart?
- Why do we reload progress after a failed mutation rather than resubmit it?
- Which component renders the text answer, and which function validates it?

## 12. Verification log — 2026-10-03

- Clean temporary client/server installs with `npm ci` using cached packages passed.
- Client TypeScript/Vite production build and ESLint passed.
- Six Node HTTP integration tests passed, covering all five mystery endpoint kinds.
- Browser: Home → archive → details → game → result completed for both stories.
- Browser: incorrect guesses, Arabic aliases, input reset, clues, three-hint limit,
  final reveals, result refresh, missing-ID retry, server recovery, unfinished-result
  protection, and unknown-page recovery checked.
- Browser error/warning log was empty during the completed gameplay checks.
- Responsive CSS and narrow-screen result layout inspected; viewport override did
  not reliably apply in the browser tool, so exact device-size coverage is not claimed.

Before submitting: approve the endings, verify real team contributions, rehearse in
English, and confirm the final local version on the presentation machine.

## 13. Adham merge recap

The supplied feature folder contributes the game UI components and page composition.
The integrated imports consistently use lowercase `game/`, avoiding a Windows-only
`Game`/`game` mismatch. All fourteen requested component files are used in the app.

- `GamePage` retains server-derived hint counts, request guards, GET recovery,
  Arabic input direction, and the 200-character input limit.
- `GameStatus` announces submission; separate success/wrong components display
  the actual backend message without duplicating feedback.
- `ResultCard` keeps Adham's `stagesCompleted`, `totalStages`, and `hintsUsed` props,
  and adds the title, ID, and reveal needed by our finished story screen.
- `MysteryCard` follows his explicit-props/article approach while preserving our
  case-archive theme and navigation. There is no unsupported registration action.
- The source's empty game stylesheet is not imported; existing styles are reused.
- Superseded AnswerForm, HintPanel, and root ResultCard files were removed.

Post-merge verification: build, lint, six API tests, wrong-answer feedback, clues,
hint exhaustion, both complete stories, result refresh, and no browser warnings/errors.
