import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getClues, getMysteryById, requestHint, submitAnswer } from "../api";
import type { Clue, Mystery } from "../types";

function GameSession({ id }: { id: string }) {
  const navigate = useNavigate();
  const [mystery, setMystery] = useState<Mystery | null>(null);
  const [clues, setClues] = useState<Clue[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [hintsRemaining, setHintsRemaining] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [message, setMessage] = useState("");
  const [feedbackTone, setFeedbackTone] = useState<"success" | "wrong">("success");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pending, setPending] = useState<"answer" | "hint" | null>(null);
  const [reload, setReload] = useState(0);
  const active = useRef(false);
  const busy = useRef(false);

  useEffect(() => {
    active.current = true;
    return () => { active.current = false; };
  }, []);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError("");
    setSelectedAnswer("");
    setHint("");
    setShowClues(false);

    async function load() {
      try {
        const data = await getMysteryById(id);
        if (ignore) return;
        if (data.solved) {
          navigate(`/result/${data.id}`, { replace: true });
          return;
        }
        const clueData = await getClues(id);
        if (ignore) return;
        setMystery(data);
        setClues(clueData);
        setHintsRemaining(Math.max(0, 3 - data.hintsUsed));
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : "Could not load the game.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void load();
    return () => { ignore = true; };
  }, [id, reload, navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedAnswer.trim() || busy.current || isLoading || error || !mystery) return;
    busy.current = true;
    setPending("answer");
    setMessage("");

    try {
      const response = await submitAnswer(id, selectedAnswer.trim());
      if (!active.current) return;
      setMessage(response.message);
      setFeedbackTone(response.correct ? "success" : "wrong");
      if (response.correct) {
        // Fetch server state again; the answer response is not a complete mystery.
        setIsLoading(true);
        setReload((value) => value + 1);
      }
    } catch (error) {
      if (active.current) {
        setError(error instanceof Error ? error.message : "Could not submit the answer.");
      }
    } finally {
      busy.current = false;
      if (active.current) setPending(null);
    }
  }

  async function handleHint() {
    if (busy.current || isLoading || error || hintsRemaining === 0 || !mystery) return;
    busy.current = true;
    setPending("hint");
    setMessage("");

    try {
      const response = await requestHint(id);
      if (!active.current) return;
      setHint(response.hint);
      setHintsRemaining(response.hintsRemaining);
    } catch (error) {
      if (active.current) {
        setError(error instanceof Error ? error.message : "Could not request a hint.");
      }
    } finally {
      busy.current = false;
      if (active.current) setPending(null);
    }
  }

  function reloadGame() {
    setMessage("");
    setReload((value) => value + 1);
  }

  return (
    <main className="game-page">
      <Link className="back-link" to={`/mysteries/${encodeURIComponent(id)}`}>← Back to mystery details</Link>
      {isLoading && <p role="status">Loading game...</p>}
      {message && <p className={`game-feedback feedback-${feedbackTone}`} role="status">{message}</p>}
      {!isLoading && error && (
        <div role="alert">
          <h1>Unable to continue</h1>
          <p>{error}</p>
          <p>Reload the current progress before trying another action.</p>
          <button onClick={reloadGame}>Reload game</button>
          <Link to="/mysteries">Back to mysteries</Link>
        </div>
      )}
      {!isLoading && !error && mystery && (
        <>
          <p className="eyebrow">Investigation in progress / File {String(mystery.id).padStart(3, "0")}</p>
          <h1 dir="auto">{mystery.title}</h1>
          <div className="stage-heading"><p>Stage {mystery.currentStage + 1} of {mystery.totalStages}</p><span className="muted">Follow the evidence</span></div>
          <progress
            aria-label="Completed stages"
            value={mystery.currentStage}
            max={mystery.totalStages}
          />
          <form className="answer-form" onSubmit={handleSubmit}>
            <fieldset disabled={pending !== null}>
              <legend dir="auto">{mystery.currentQuestion}</legend>
              <div className="answer-options">
              {mystery.currentOptions.length > 0 ? (
                mystery.currentOptions.map((option, index) => (
                  <label className={`answer-option ${selectedAnswer === option ? "is-selected" : ""}`} key={option}>
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)}
                    />
                    <span className="option-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                    <span>{option}</span>
                  </label>
                ))
              ) : (
                <label className="text-answer">
                  Your answer
                  <input
                    value={selectedAnswer}
                    onChange={(event) => setSelectedAnswer(event.target.value)}
                    required
                  />
                </label>
              )}
              </div>
              <button type="submit" disabled={!selectedAnswer.trim()}>
                {pending === "answer" ? "Submitting..." : "Submit answer"}
              </button>
            </fieldset>
          </form>
          <section className="hint-panel" aria-label="Hints">
            <div><p className="eyebrow">A different perspective</p><p>Hints remaining: {hintsRemaining}</p></div>
            <button className="button-secondary" onClick={handleHint} disabled={pending !== null || hintsRemaining === 0}>
              {pending === "hint" ? "Loading hint..." : "Request hint"}
            </button>
            {hint && <p className="hint-text" dir="auto" role="status">{hint}</p>}
          </section>
          <section className="clue-panel" aria-label="Clues">
            <button className="clue-toggle" onClick={() => setShowClues(!showClues)} aria-expanded={showClues} aria-controls="game-clues">
              {showClues ? "Hide clues" : "Show clues"}
              <span aria-hidden="true">{showClues ? "−" : "+"}</span>
            </button>
            <div id="game-clues" hidden={!showClues}>
              {clues.length === 0 ? <p>No clues are available.</p> : (
                <ul>
                  {clues.map((clue) => <li key={clue.stage}><span className="eyebrow">Evidence / Stage {clue.stage + 1}</span><p dir="auto">{clue.text}</p></li>)}
                </ul>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function GamePage() {
  const { id } = useParams();
  return id ? <GameSession key={id} id={id} /> : <Link to="/mysteries">Choose a mystery</Link>;
}

export default GamePage;
