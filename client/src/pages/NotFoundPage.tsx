import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <main>
      <p className="eyebrow">Outside the archive</p>
      <h1>Page not found</h1>
      <p>This trail ends here. Return to the archive to open a case.</p>
      <Link className="button" to="/mysteries">
        Back to mysteries
      </Link>
    </main>
  );
}
