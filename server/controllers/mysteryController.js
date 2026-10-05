import { mysteries, findMysteryById } from "../store.js";

function isMysteryLocked(mystery) {
  if (mystery.id === 1) return false;
  const previousMystery = findMysteryById(mystery.id - 1);
  return previousMystery ? !previousMystery.solved : false;
}

function toPublicMystery(mystery) {
  const locked = isMysteryLocked(mystery);
  const currentStage =
    mystery.solved || locked ? null : mystery.stages[mystery.currentStage];

  const stageHintsTotal = currentStage?.hints ? currentStage.hints.length : 3;
  const stageHintsUsed = currentStage?.hintsUsed || 0;

  return {
    id: mystery.id,
    slug: mystery.slug,
    title: mystery.title,
    intro: mystery.intro,
    totalStages: mystery.totalStages,
    currentStage: mystery.currentStage,
    solved: mystery.solved,
    locked: locked,
    hintsUsed: mystery.hintsUsed,
    hintsRemaining: currentStage
      ? Math.max(0, stageHintsTotal - stageHintsUsed)
      : 0,
    reveal: mystery.solved ? mystery.reveal : null,
    currentQuestion: currentStage ? currentStage.question : "",
    currentOptions: currentStage ? currentStage.options : [],
   currentHint:
      currentStage && stageHintsUsed > 0
        ? currentStage.hints[stageHintsUsed - 1]
        : "",
  };
}

export function getAllMysteries(req, res) {
  res.json(mysteries.map(toPublicMystery));
}

export function getMysteryById(req, res) {
  const id = Number(req.params.id);
  const mystery = findMysteryById(id);

  if (!mystery) {
    return res.status(404).json({ error: `No mystery found with id ${id}.` });
  }

  res.json(toPublicMystery(mystery));
}

export function submitAnswer(req, res) {
  const id = Number(req.params.id);
  const mystery = findMysteryById(id);

  if (!mystery) {
    return res.status(404).json({ error: `No mystery found with id ${id}.` });
  }

  if (isMysteryLocked(mystery)) {
    return res
      .status(403)
      .json({ error: "You must solve the previous mystery first!" });
  }

  if (
    !req.body ||
    typeof req.body.answer !== "string" ||
    req.body.answer.trim() === "" ||
    req.body.answer.length > 200
  ) {
    return res.status(400).json({
      error: "Answer must be a non-empty string of at most 200 characters.",
    });
  }

  if (mystery.solved) {
    return res.status(409).json({ error: "This mystery is already solved." });
  }

  const currentStage = mystery.stages[mystery.currentStage];
  const submitted = req.body.answer.trim().toLowerCase();
  const acceptedAnswers = Array.isArray(currentStage.answer)
    ? currentStage.answer
    : [currentStage.answer];
  const isCorrect = acceptedAnswers.some(
    (answer) => answer.trim().toLowerCase() === submitted,
  );

  if (!isCorrect) {
    return res.json({
      correct: false,
      message: "That does not match the evidence. Try again.",
    });
  }

  const nextStage = mystery.currentStage + 1;

  if (nextStage >= mystery.totalStages) {
    mystery.solved = true;
    return res.json({
      correct: true,
      message: "The final lock clicks open. The mystery is solved!",
      nextStage: null,
    });
  }

  mystery.currentStage = nextStage;
  res.json({
    correct: true,
    message: "The lock clicks open. You may continue.",
    nextStage: nextStage,
  });
}

export function requestHint(req, res) {
  const id = Number(req.params.id);
  const mystery = findMysteryById(id);

  if (!mystery) {
    return res.status(404).json({ error: `No mystery found with id ${id}.` });
  }

  if (isMysteryLocked(mystery)) {
    return res
      .status(403)
      .json({ error: "You must solve the previous mystery first!" });
  }

  if (mystery.solved) {
    return res.status(409).json({ error: "This mystery is already solved." });
  }

  const currentStage = mystery.stages[mystery.currentStage];
  const stageHints = currentStage.hints || [];
  const usedInStage = currentStage.hintsUsed || 0;

  if (usedInStage >= stageHints.length) {
    return res
      .status(409)
      .json({ error: "No hints remaining for this stage." });
  }

  const nextHint = stageHints[usedInStage];
  currentStage.hintsUsed = usedInStage + 1;
  mystery.hintsUsed += 1;

  const hintsRemaining = Math.max(0, stageHints.length - currentStage.hintsUsed);

  res.json({
    hint: nextHint,
    hintsRemaining: hintsRemaining,
    alreadyRevealed: false,
  });
}