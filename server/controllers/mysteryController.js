import { mysteries, findMysteryById } from "../store.js";

function toPublicMystery(mystery) {
  const currentStage = mystery.solved ? null : mystery.stages[mystery.currentStage];

  return {
    id: mystery.id,
    slug: mystery.slug,
    title: mystery.title,
    intro: mystery.intro,
    totalStages: mystery.totalStages,
    currentStage: mystery.currentStage,
    solved: mystery.solved,
    hintsUsed: mystery.hintsUsed,
    hintsRemaining: Math.max(0, 3 - mystery.hintsUsed),
    reveal: mystery.solved ? mystery.reveal : null,
    currentQuestion: currentStage ? currentStage.question : "",
    currentOptions: currentStage ? currentStage.options : [],
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

export function getCluesByMysteryId(req, res) {
  const id = Number(req.params.id);
  const mystery = findMysteryById(id);

  if (!mystery) {
    return res.status(404).json({ error: `No mystery found with id ${id}.` });
  }

  const clues = mystery.stages.map((stage) => ({
    stage: stage.id,
    text: stage.clue,
  }));

  res.json(clues);
}

export function submitAnswer(req, res) {
  const id = Number(req.params.id);
  const mystery = findMysteryById(id);

  if (!mystery) {
    return res.status(404).json({ error: `No mystery found with id ${id}.` });
  }

  if (
    !req.body ||
    typeof req.body.answer !== "string" ||
    req.body.answer.trim() === "" ||
    req.body.answer.length > 200
  ) {
    return res
      .status(400)
      .json({ error: "Answer must be a non-empty string of at most 200 characters." });
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

  if (mystery.solved) {
    return res.status(409).json({ error: "This mystery is already solved." });
  }

  if (mystery.hintsUsed >= 3) {
    return res.status(409).json({ error: "No hints remaining for this mystery." });
  }

  const currentStage = mystery.stages[mystery.currentStage];
  mystery.hintsUsed += 1;

  const hintsRemaining = Math.max(0, 3 - mystery.hintsUsed);

  res.json({
    hint: currentStage.hint,
    hintsRemaining: hintsRemaining,
  });
}
