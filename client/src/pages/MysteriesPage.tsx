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
      <header className="archive-intro">
        <p className="eyebrow">The unexplained is waiting</p>
        <h1>Every room holds<br />a <em>secret.</em></h1>
        <p>Some doors were closed for a reason. Read the evidence,<br className="desktop-break" /> trust your instincts, and find out what lies behind them.</p>
        <span className="archive-decoration" aria-hidden="true">?</span>
      </header>
      <div className="section-heading">
        <h2>Choose a mystery</h2>
        <span className="eyebrow">{isLoading ? "Opening the archive" : `${mysteries.length} case${mysteries.length === 1 ? "" : "s"} on file`}</span>
      </div>
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
          <ul className="case-list">
            {mysteries.map((mystery) => (
              <li className="case-card" key={mystery.id}>
                <div className="case-art" aria-hidden="true">
                  <span className="case-number">FILE / {String(mystery.id).padStart(3, "0")}</span>
                  <div className="door-illustration"><span className="keyhole" /></div>
                  <span className="case-art-caption">THE TRUTH IS ON THE OTHER SIDE</span>
                </div>
                <div className="case-content">
                  <div className="case-meta"><span className="eyebrow">An investigation</span><span className={`status-badge ${mystery.solved ? "is-solved" : ""}`}>{mystery.solved ? "✓ Solved" : "Open case"}</span></div>
                  <h2 dir="auto"><Link to={`/mysteries/${mystery.id}`}>{mystery.title}</Link></h2>
                  <p className="case-description" dir="auto">{mystery.intro}</p>
                  <div className="case-actions"><span>{mystery.totalStages} stages to uncover</span><Link className="button" to={`/mysteries/${mystery.id}`}>Open case <span aria-hidden="true">↗</span></Link></div>
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </main>
  );
}

export default MysteriesPage;
