import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          setError(error instanceof Error ? error.message : "Could not load mysteries.");
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void load();
    return () => { ignore = true; };
  }, [reload]);

  return (
    <main className="mysteries-page">
      <h1>Choose a mystery</h1>
      <p>Explore the clues, solve each stage, and uncover the mystery.</p>
      {isLoading && <p role="status">Loading mysteries...</p>}
      {!isLoading && error && (
        <div role="alert">
          <p>{error}</p>
          <button onClick={() => setReload(reload + 1)}>Try again</button>
        </div>
      )}
      {!isLoading && !error && (
        mysteries.length === 0 ? (
          <p>No mysteries are available yet.</p>
        ) : (
          <ul>
            {mysteries.map((mystery) => (
              <li key={mystery.id}>
                <h2><Link to={`/mysteries/${mystery.id}`}>{mystery.title}</Link></h2>
                <p>{mystery.intro}</p>
                <p>{mystery.totalStages} stages · {mystery.solved ? "Solved" : "Unsolved"}</p>
              </li>
            ))}
          </ul>
        )
      )}
    </main>
  );
}

export default MysteriesPage;
