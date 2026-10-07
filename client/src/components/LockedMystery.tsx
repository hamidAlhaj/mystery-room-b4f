import { Link } from "react-router-dom";

export default function LockedMystery() {
  return (
    <section aria-labelledby="locked-title">
      <h1 id="locked-title">Locked</h1>
      <p className="case-lock-reason">Complete Phase 1 to unlock.</p>
      <Link className="button" to="/mysteries/1">Back to Phase 1</Link>
    </section>
  );
}
