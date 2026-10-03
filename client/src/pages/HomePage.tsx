import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <main className="home-page">
      <p className="eyebrow">Mystery Room / The Case Archive</p>
      <h1>
        Some secrets
        <br />
        deserve to be <em>found.</em>
      </h1>
      <p className="home-intro">
        A sealed room in Damascus. A castle hidden in fog. Two unfinished
        stories waiting for someone who notices the details.
      </p>
      <Link className="button" to="/mysteries">
        Explore the mysteries <span aria-hidden="true">↗</span>
      </Link>
      <section className="home-guide" aria-labelledby="guide-title">
        <h2 id="guide-title">Your first investigation</h2>
        <ol>
          <li>
            <strong>Open a case.</strong> Read its story and inspect the
            evidence.
          </li>
          <li>
            <strong>Follow the clues.</strong> Choose an answer or type your
            discovery. Wrong answers cost nothing.
          </li>
          <li>
            <strong>Ask for a new perspective.</strong> Each case has three
            hints in total.
          </li>
          <li>
            <strong>Find the truth.</strong> Solve three stages to uncover the
            ending.
          </li>
        </ol>
      </section>
      <p className="muted">
        Stories and puzzles are in Arabic; navigation is in English. Progress is
        shared by everyone connected to this running server and resets when the
        server restarts.
      </p>
    </main>
  );
}
