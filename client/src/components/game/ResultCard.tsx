import { Link } from "react-router-dom";

interface ResultCardProps {
  id: number;
  title: string;
  reveal: string | null;
  stagesCompleted: number;
  totalStages: number;
  hintsUsed: number;
}
export default function ResultCard({
  id,
  title,
  reveal,
  stagesCompleted,
  totalStages,
  hintsUsed,
}: ResultCardProps) {
  return (
    <>
      <div className="solved-seal" aria-hidden="true">
        ✓
      </div>
      <p className="eyebrow">The investigation is complete</p>
      <h1>
        Mystery <em>solved!</em>
      </h1>
      <h2 lang="ar" dir="auto">
        {title}
      </h2>
      <section className="reveal-panel" aria-labelledby="reveal-title">
        <h2 id="reveal-title">The truth behind the mystery</h2>
        <p lang="ar" dir="rtl">
          {reveal}
        </p>
      </section>
      <dl>
        <dt>Stages completed</dt>
        <dd>
          {stagesCompleted} / {totalStages}
        </dd>

        <dt>Hints used</dt>
        <dd>{hintsUsed}</dd>
      </dl>
      <div className="result-actions">
        <Link className="button" to="/mysteries">
          Explore the archive <span aria-hidden="true">↗</span>
        </Link>
        <Link className="text-link" to={`/mysteries/${id}`}>
          View mystery details
        </Link>
      </div>
    </>
  );
}
