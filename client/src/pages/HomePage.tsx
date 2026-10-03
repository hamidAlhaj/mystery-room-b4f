import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="eyebrow">MYSTERY ROOM / CASE ARCHIVE</p>

        <h1>Look closer. Every clue matters.</h1>

        <p className="home-hero-text">
          Enter a collection of fictional investigations, examine the evidence,
          question every detail, and decide what you believe happened.
        </p>

        <div className="home-actions">
          <Link className="button" to="/mysteries">
            Explore the cases
          </Link>

          <Link className="text-link" to="/about">
            How to play
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE FIELD GUIDE</p>
            <h2>How an investigation works</h2>
          </div>

          <p>
            Every case is built around observation, evidence, and your final
            conclusion.
          </p>
        </div>

        <div className="home-highlights">
          <article className="home-highlight">
            <span className="home-highlight-number">01</span>

            <h3>Choose a case</h3>

            <p>
              Open the archive and select a mystery. Read its introduction
              before entering the investigation.
            </p>
          </article>

          <article className="home-highlight">
            <span className="home-highlight-number">02</span>

            <h3>Inspect the evidence</h3>

            <p>
              Read each clue carefully and examine the available information
              before deciding what happened.
            </p>
          </article>

          <article className="home-highlight">
            <span className="home-highlight-number">03</span>

            <h3>Submit your conclusion</h3>

            <p>
              Choose your answer, use a hint when necessary, and move through
              every stage until the case is closed.
            </p>
          </article>
        </div>
      </section>

      <section className="home-featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FEATURED CASE</p>
            <h2>Start an investigation</h2>
          </div>
        </div>

        <article className="case-card home-case-card">
          <div>
            <p className="eyebrow">CASE FILE / 01</p>

            <h2>The Sills Observe</h2>

            <p>
              Doctor Dot Voss vanished. The comet has passed, but her notes are
              still warm. Something in the evidence does not add up.
            </p>
          </div>

          <div className="home-case-meta">
            <span>MEDIUM</span>
            <span>15 MINUTES</span>
            <span>3 STAGES</span>
          </div>

          <Link className="button" to="/mysteries/1">
            Open case
          </Link>
        </article>
      </section>

      <section className="home-closing">
        <p className="eyebrow">THE ARCHIVE IS OPEN</p>

        <h2>Ready to investigate?</h2>

        <p>
          Trust the evidence, question the obvious, and remember that every
          wrong answer can reveal another clue.
        </p>

        <Link className="button" to="/mysteries">
          Enter the mystery archive
        </Link>
      </section>
    </main>
  );
}

export default HomePage;