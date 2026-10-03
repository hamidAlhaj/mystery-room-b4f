import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMysteryById } from "../api";
import type { Mystery } from "../types";

function MysteryDetails({ id }: { id: string }) {
  const [mystery, setMystery] = useState<Mystery | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError("");

    async function load() {
      try {
        const data = await getMysteryById(id);
        if (!ignore) setMystery(data);
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : "Could not load this mystery.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void load();
    return () => { ignore = true; };
  }, [id, reload]);

  return (
    <main className="mystery-details-page">
      <Link className="back-link" to="/mysteries">← Back to mysteries</Link>
      {isLoading && <p role="status">Loading mystery...</p>}
      {!isLoading && error && (
        <div role="alert">
          <h1>Unable to open this mystery</h1>
          <p>{error}</p>
          <button onClick={() => setReload(reload + 1)}>Try again</button>
        </div>
      )}
      {!isLoading && !error && mystery && (
        <>
          <p className="eyebrow">Case file / {String(mystery.id).padStart(3, "0")}</p>
          <h1 dir="auto">{mystery.title}</h1>
          <div className="story-panel"><span className="eyebrow">The story so far</span><p dir="auto">{mystery.intro}</p></div>
          <div className="case-facts"><p><span>Total stages</span><strong>{mystery.totalStages}</strong></p><p><span>Hints used</span><strong>{mystery.hintsUsed}</strong></p><p><span>Case status</span><strong>{mystery.solved ? "Closed" : "Open"}</strong></p></div>
          {mystery.solved ? (
            <Link className="button" to={`/result/${mystery.id}`}>View result <span aria-hidden="true">↗</span></Link>
          ) : (
            <>
              <p className="muted">Current stage: {mystery.currentStage + 1} of {mystery.totalStages}. Your investigation begins with the evidence.</p>
              <Link className="button" to={`/mysteries/${mystery.id}/play`}>
                {mystery.currentStage === 0 ? "Start mystery" : "Continue mystery"}
              </Link>
            </>
          )}
        </>
      )}
    </main>
  );
}

function MysteryDetailsPage() {
  const { id } = useParams();
  return id ? <MysteryDetails key={id} id={id} /> : <Link to="/mysteries">Choose a mystery</Link>;
}

export default MysteryDetailsPage;
