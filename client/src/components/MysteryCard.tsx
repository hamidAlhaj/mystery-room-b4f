import { Link } from "react-router-dom";
interface MysteryCardProps {
  id: number;
  title: string;
  description: string;
  stages: number;
  solved: boolean;
}
export default function MysteryCard({
  id,
  title,
  description,
  stages,
  solved,
}: MysteryCardProps) {
  return (
    <article className="case-card mystery-card">
      <div className="case-art" aria-hidden="true">
        <span className="case-number">
          FILE / {String(id).padStart(3, "0")}
        </span>
        <div className="door-illustration">
          <span className="keyhole" />
        </div>
        <span className="case-art-caption">THE TRUTH IS ON THE OTHER SIDE</span>
      </div>
      <div className="case-content">
        <div className="case-meta">
          <span className="eyebrow">An investigation</span>
          <span className={`status-badge ${solved ? "is-solved" : ""}`}>
            {solved ? "✓ Solved" : "Open case"}
          </span>
        </div>
        <h2 dir="auto">
          <Link to={`/mysteries/${id}`}>{title}</Link>
        </h2>
        <p className="case-description">{description}</p>
        <div className="case-actions">
          <span>{stages} stages to uncover</span>
          <Link className="button" to={`/mysteries/${id}`}>
            Open case <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
