# Mystery pages — integration notes

The original four-page contribution is integrated with the full local application.
The current implementation and requirements checklist are documented in
[CODE-WALKTHROUGH.md](CODE-WALKTHROUGH.md); setup is in [README.md](../README.md).

## Page responsibilities

- `MysteriesPage`: load the public collection; render cards or loading/error/empty feedback.
- `MysteryDetailsPage`: load the story and server progress; offer Start, Continue, or Result.
- `GamePage`: own temporary input, mutation status, and API interactions.
- `ResultPage`: independently load completion state; show the server reveal only when solved.

Home and NotFound pages are now implemented. `main.tsx` owns the single BrowserRouter.
`App.tsx` contains the route table and reusable Navbar/Footer layout.

## Integration rules

- Keep backend requests in `api.ts` and public interfaces in `types.ts`.
- Keep answer validation and real progression on the server.
- After a successful answer, fetch current state before advancing the interface.
- Following an uncertain mutation failure, reload progress with GET; do not automatically repeat a POST/PATCH.
- Preserve the busy ref, unmount guards, and ID-keyed game session when refactoring.
- Preserve per-page retry callbacks in ErrorMessage; never force a whole-browser reload.
- Keep semantic inputs, live feedback, visible focus, and Arabic direction/language attributes.
- `hintsRemaining` is supplied by the backend. Do not duplicate the hint-budget calculation in the client.
- `reveal` is null until the backend confirms completion.

Reusable display components live in `components` and `components/game`. Page-local
state is deliberate; Redux and Context are not required by this assignment.

## Verification

Both stories pass independent HTTP tests and browser completion checks. TypeScript,
Vite production build, and ESLint pass. Run the commands in the README after changing
API fields or component props. Historical screenshots or previous test claims are
not a substitute for checking a new change.

## Adham game UI handoff

GamePage now composes Adham's StageHeader, StageProgress, StageQuestion,
AnswerOptions, SubmitAnswerButton, HintButton, HintBox, GameStatus,
SuccessMessage, and WrongAnswerMessage. Shared ProgressBar renders completion.
ResultCard lives in `components/game/` and combines his statistics with the final
server reveal. MysteryCard uses explicit props and working Router links.

Keep these components presentational; the page retains API calls and input state.
Use lowercase `game/` imports on every operating system. Do not reintroduce the
removed AnswerForm/HintPanel wrappers or duplicate ResultCard.
