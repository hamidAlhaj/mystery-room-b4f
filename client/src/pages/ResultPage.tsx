import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMysteryById } from "../api";
import type { Mystery } from "../types";

function MysteryResult({ id }: { id: string }) {
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
          setError(error instanceof Error ? error.message : "Could not load the result.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void load();
    return () => { ignore = true; };
  }, [id, reload]);

  return (
    <main className="result-page">
      <Link to="/mysteries">Back to mysteries</Link>
      {isLoading && <p role="status">Loading result...</p>}
      {!isLoading && error && (
        <div role="alert">
          <h1>Unable to load the result</h1>
          <p>{error}</p>
          <button onClick={() => setReload(reload + 1)}>Try again</button>
        </div>
      )}
      {!isLoading && !error && mystery && (
        mystery.solved ? (
          <>
            <h1>Mystery solved!</h1>
            <h2>{mystery.title}</h2>
            <p>You opened the final lock and completed every stage.</p>
            <dl>
              <dt>Stages completed</dt>
              <dd>{mystery.totalStages} / {mystery.totalStages}</dd>
              <dt>Hints used</dt>
              <dd>{mystery.hintsUsed}</dd>
            </dl>
            <Link to={`/mysteries/${mystery.id}`}>View mystery details</Link>
          </>
        ) : (
          <>
            <h1>This mystery is not finished yet</h1>
            <p>Complete the remaining stages to see your result.</p>
            <Link to={`/mysteries/${mystery.id}/play`}>Continue mystery</Link>
          </>
        )
      )}
    </main>
  );
}

function ResultPage() {
  const { id } = useParams();
  return id ? <MysteryResult key={id} id={id} /> : <Link to="/mysteries">Choose a mystery</Link>;
}

export default ResultPage;
