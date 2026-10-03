import ResultCard from "../components/game/ResultCard";
import LoadingMessage from "../components/LoadingMessage";
import ErrorMessage from "../components/ErrorMessage";
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
          setError(
            error instanceof Error
              ? error.message
              : "Could not load the result.",
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void load();
    return () => {
      ignore = true;
    };
  }, [id, reload]);

  return (
    <main className="result-page">
      <Link className="back-link" to="/mysteries">
        ← Back to mysteries
      </Link>
      {isLoading && <LoadingMessage label="Loading result..." />}
      {!isLoading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => setReload((value) => value + 1)}
          title="Unable to load the result"
        />
      )}
      {!isLoading &&
        !error &&
        mystery &&
        (mystery.solved ? (
          <ResultCard
            id={mystery.id}
            title={mystery.title}
            reveal={mystery.reveal}
            stagesCompleted={mystery.totalStages}
            totalStages={mystery.totalStages}
            hintsUsed={mystery.hintsUsed}
          />
        ) : (
          <>
            <h1>This mystery is not finished yet</h1>
            <p>Complete the remaining stages to see your result.</p>
            <Link className="button" to={`/mysteries/${mystery.id}/play`}>
              Continue mystery
            </Link>
          </>
        ))}
    </main>
  );
}

function ResultPage() {
  const { id } = useParams();
  return id ? (
    <MysteryResult key={id} id={id} />
  ) : (
    <Link to="/mysteries">Choose a mystery</Link>
  );
}

export default ResultPage;
