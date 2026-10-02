# Molham — Mystery Pages

## Context and scope

The owner's updated assignment supersedes the Context/Redux assignment in the
frontend division PDF and the old README. Molham owns four pages, with English UI
labels. The subsequent styling request authorizes presentation changes to these
pages and the shared app shell. Backend files remain unchanged.

## Files and routes

| File | Route | Responsibility |
| --- | --- | --- |
| `client/src/pages/MysteriesPage.tsx` | `/mysteries` | Load the list; show loading, retry, empty, and solved/unsolved states |
| `client/src/pages/MysteryDetailsPage.tsx` | `/mysteries/:id` | Load details; link to play or the existing result |
| `client/src/pages/GamePage.tsx` | `/mysteries/:id/play` | Questions, answers, clues, hints, feedback, and server progression |
| `client/src/pages/ResultPage.tsx` | `/result/:id` | Independently verify completion and display available statistics |

Minimal integration fills the previously empty `client/src/api.ts` and
`client/src/types.ts`, and wires routes in the previously empty `App.tsx`.
The root temporarily displays the list; unknown routes offer a return link.
The routing owner can move these routes into AppRouter and replace the root page.
Keep exactly one BrowserRouter when doing so.

## Working style

Follow B4F Hub: named function components, default page exports, typed interfaces,
relative imports, named API helpers, async/await, local useState/useEffect, and
React Router links. No Redux, Context, persistence, database, or authentication
is added. The shared component files are still empty, so pages currently render
semantic HTML and plain controls. Teammates can replace those sections with
reusable components while retaining the page's state and event handlers.

Root class names are `mysteries-page`, `mystery-details-page`, `game-page`, and
`result-page`. Ordinary CSS in `client/src/index.css` follows the B4F Hub approach:
descriptive classes, shared variables, responsive layouts, and no styling library
or inline styles. The original case-archive theme uses dark teal, brass accents,
serif headings, a CSS door illustration, and semantic answer/evidence controls.
The shared header provides an accessible How to play disclosure. Keyboard focus,
a skip link, reduced-motion preferences, and mobile layouts are supported.

## API contract

| Helper | Request | Response |
| --- | --- | --- |
| `getMysteries()` | GET `/api/mysteries` | `Mystery[]` |
| `getMysteryById(id)` | GET `/api/mysteries/:id` | `Mystery` |
| `getClues(id)` | GET `/api/mysteries/:id/clues` | `{ stage, text }[]` |
| `submitAnswer(id, answer)` | POST `/api/mysteries/:id/answers`, JSON `{ answer }` | `{ correct, message, nextStage? }` |
| `requestHint(id)` | PATCH `/api/mysteries/:id/hint` | `{ hint, hintsRemaining }` |

The API uses relative URLs and the existing Vite proxy. Non-2xx responses throw
the backend's error string, with a fallback for non-JSON errors. Pages catch
errors and offer recovery. A wrong answer is a successful HTTP request with
`correct: false`; malformed input is a 400; an unknown mystery is a 404.

## State and game behavior

- The URL owns the mystery ID. Local state owns selection, visibility, feedback,
  and request status. No frontend code computes whether an answer is correct.
- Data from an obsolete load is ignored. ID-keyed page contents reset temporary
  state when navigating to another mystery. Late mutation results after leaving
  the game do not update the new page or navigate it elsewhere.
- Answer and hint mutations cannot overlap. Blank answers cannot be submitted.
- After a correct answer, GET reloads the actual mystery and clues. Selection
  and the old hint are cleared. Only a server-confirmed solved mystery navigates
  to the result. Opening an already solved game also goes to the result.
- A mutation failure requires reloading progress before another mutation; a lost
  response may have followed a successful server update. The reload uses GET,
  never an automatic repeat of POST or PATCH.
- Initial hints remaining is `max(0, 3 - hintsUsed)`, matching the documented
  budget. PATCH responses provide subsequent counts. The UI disables requests
  at zero; the backend currently does not enforce that limit itself.
- Clues can be shown/hidden. All clues returned by the API are displayed; no
  additional stage-based unlock rule is invented.
- Options render as labelled radio inputs. An empty options array uses a text
  answer field, allowing the same page to support the documented free-text case.
- ResultPage fetches independently, so refresh/direct URLs work. An unfinished
  mystery offers a Continue link rather than a false completion screen.

## Dependencies and assumptions

1. English labels are implemented. The backend still supplies Arabic puzzle
   content. The content/backend owner must supply English titles, introductions,
   questions, hints, and clues for an entirely English experience.
2. No final story reveal field exists. ResultPage displays truthful generic
   completion and server statistics, without fabricating a story ending.
3. No reset endpoint exists. There is no pretend replay/reset button. Restarting
   the backend resets its in-memory game state for development.
4. Progress is shared in the server process, not isolated per player.
5. Mystery 2 is not yet present. Pages use dynamic IDs and have no ID-1-only logic.
6. The API/types and route wiring are minimal integration prerequisites; ownership
   of those shared layers remains with the respective teammates.

## Run

In one terminal:

```powershell
cd server
npm install
npm start
```

In another terminal:

```powershell
cd client
npm install
npm run dev
```

Open the Vite address and visit `/mysteries`.

## Test it

Run `npm run build` and `npm run lint` inside `client`.
There is no existing automated test framework or test suite in this project.

1. Open the list, select a mystery, and start the game.
2. Submit a wrong answer: feedback appears and the stage stays unchanged.
3. Submit a correct answer: the server advances, the next question loads, and
   the selection/hint reset. Rapid clicks must not send duplicate mutations.
4. Show/hide clues. Request hints and check the remaining count and zero limit.
5. Finish the last stage: the result displays all stages completed and hints used.
6. Refresh the result and open the solved play URL: completion remains correct.
7. Restart the backend; open `/result/1`: it should offer Continue, not success.
8. Open an unknown ID: a clear backend error and recovery links should appear.
9. Stop the backend: list/detail/game/result loads must show recoverable errors.
10. Switch mystery IDs while requests are pending: old responses must not replace
    the new page. Repeat the full journey for Mystery 2 once content is supplied.

## Definition of done

The four routes compile and provide real API-driven behavior with recovery paths.
No new dependencies or backend modifications are included. Styling is included
under the subsequent explicit styling request.
The full English story and final reveal are pending the content/backend handoff.

## Verification performed

- `npm run build`: passed (TypeScript and Vite production bundle).
- `npm run lint`: passed.
- Headless Edge smoke checks used the production bundle and actual Express
  router in a separate process with isolated in-memory state. No new testing
  dependency or framework was added to the project.
- Passed: list/details/play navigation, wrong answer, show clues, three hints and
  disabled zero-budget button, answer selection reset, all three correct answers,
  completion, result refresh, already-solved redirect, unfinished-result guard,
  unknown ID, list error/retry, and empty list.
- Simulated an accepted answer whose response was lost: the recovery GET loaded
  the next stage without sending the answer twice.
- No browser page errors were reported during those checks.
- Styled screens were visually inspected on desktop and mobile. Layout checks at
  390px and 320px found no horizontal overflow in the list, details, results, and
  missing-ID views. The help disclosure stays within the viewport. The complete
  game flow still passes with the styled controls.
- Multi-mystery content and final narrative reveal remain unverified because
  those deliverables are not present in this checkout.
