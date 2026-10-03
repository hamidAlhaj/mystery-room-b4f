import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <p className="eyebrow">CASE FILE / 404</p>

        <span className="not-found-code">404</span>

        <h1>Case not found.</h1>

        <p>
          The requested case file could not be located in the archive. The
          evidence may have been moved, removed, or the case reference may be
          incorrect.
        </p>

        <div className="not-found-actions">
          <Link className="button" to="/mysteries">
            Return to the archive
          </Link>

          <Link className="text-link" to="/">
            Back to the briefing
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;