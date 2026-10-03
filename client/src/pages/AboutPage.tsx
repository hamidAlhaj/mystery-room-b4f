function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="eyebrow">MYSTERY ROOM / FIELD BRIEFING</p>

        <h1>Every case begins with a question.</h1>

        <p>
          Mystery Room is a fictional case archive built around observation,
          evidence, and deduction. Each investigation invites you to slow down,
          inspect the details, and form your own conclusion.
        </p>
      </section>

      <section className="about-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE MISSION</p>
            <h2>Look beyond the obvious.</h2>
          </div>
        </div>

        <div className="about-grid">
          <article className="about-card">
            <span className="about-card-label">01 / OBSERVE</span>

            <h3>Read the evidence</h3>

            <p>
              Cases are presented through stories, questions, clues, and
              possible answers. Small details may become important later.
            </p>
          </article>

          <article className="about-card">
            <span className="about-card-label">02 / INVESTIGATE</span>

            <h3>Follow the clues</h3>

            <p>
              Each investigation is divided into stages. Move through the case
              one decision at a time and use hints when you need another
              perspective.
            </p>
          </article>

          <article className="about-card">
            <span className="about-card-label">03 / CONCLUDE</span>

            <h3>Close the case</h3>

            <p>
              Your answers determine how the investigation progresses. Reach
              the final stage and discover whether your conclusion matches the
              case.
            </p>
          </article>
        </div>
      </section>

      <section className="about-guide">
        <div>
          <p className="eyebrow">A FIELD GUIDE</p>

          <h2>Follow your curiosity.</h2>
        </div>

        <div className="about-guide-content">
          <ol>
            <li>Open a case and read its story.</li>
            <li>Inspect the available clues.</li>
            <li>Choose the answer you believe is correct.</li>
            <li>Use a hint when you need a new perspective.</li>
            <li>Complete every stage to close the case.</li>
          </ol>

          <p>
            There is no need to rush. Wrong answers are part of the
            investigation. Pay attention to what the evidence is telling you.
          </p>
        </div>
      </section>

      <section className="team-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CASE ARCHIVE / TEAM 04</p>
            <h2>The people behind the room.</h2>
          </div>
        </div>

        <div className="team-note">
          <p className="team-note-label">FIELD NOTE</p>

          <p>
            Mystery Room was developed by Team 04 as an interactive case
            archive combining storytelling, investigation mechanics, and a
            structured digital experience.
          </p>

          <p>
            The project brings together frontend, backend, game-flow, and
            interface work to create a complete investigation from the first
            clue to the final result.
          </p>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;