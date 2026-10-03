import LoadingMessage from "../components/LoadingMessage";
import ErrorMessage from "../components/ErrorMessage";
import { useEffect, useState } from "react";
import MysteryCard from "../components/MysteryCard";
import EmptyState from "../components/EmptyState";
import { getMysteries } from "../api";
import type { Mystery } from "../types";

function MysteriesPage() {
  const [mysteries, setMysteries] = useState<Mystery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError("");

    async function load() {
      try {
        const data = await getMysteries();
        if (!ignore) setMysteries(data);
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : "Could not load mysteries.",
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
  }, [reload]);

  return (
    <main className="mysteries-page">
      <header className="archive-intro">
        <p className="eyebrow">The unexplained is waiting</p>
        <h1>
          Every room holds
          <br />a <em>secret.</em>
        </h1>
        <p>
          Some doors were closed for a reason. Read the evidence,
          <br className="desktop-break" /> trust your instincts, and find out
          what lies behind them.
        </p>
        <span className="archive-decoration" aria-hidden="true">
          ?
        </span>
      </header>
      <div className="section-heading">
        <h2>Choose a mystery</h2>
        <span className="eyebrow">
          {isLoading
            ? "Opening the archive"
            : `${mysteries.length} case${mysteries.length === 1 ? "" : "s"} on file`}
        </span>
      </div>
      {isLoading && <LoadingMessage label="Loading mysteries..." />}
      {!isLoading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => setReload((value) => value + 1)}
          title=""
        />
      )}
      {!isLoading &&
        !error &&
        (mysteries.length === 0 ? (
          <EmptyState message="No mysteries are available yet." />
        ) : (
          <ul className="case-list">
            {mysteries.map((mystery) => (
              <li key={mystery.id}>
                <MysteryCard
                  id={mystery.id}
                  title={mystery.title}
                  description={mystery.intro}
                  stages={mystery.totalStages}
                  solved={mystery.solved}
                />
              </li>
            ))}
          </ul>
        ))}
    </main>
  );
}

export default MysteriesPage;
