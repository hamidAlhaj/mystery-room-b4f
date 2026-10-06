import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
interface MysteryCardProps {
  id: number;
  title: string;
  description: string;
  stages: number;
  solved: boolean;
  locked: boolean;
}
export default function MysteryCard({
  id,
  title,
  description,
  stages,
  solved,
  locked,
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
          <span className={`status-badge ${!locked && solved ? "is-solved" : ""}`}>
            {locked ? "Locked" : solved ? "✓ Solved" : "Open case"}
          </span>
        </div>
        <h2 dir="auto">
          {locked ? title : <Link to={`/mysteries/${id}`}>{title}</Link>}
        </h2>
        <p className="case-description">{description}</p>
        {locked && <p className="case-lock-reason" id={`lock-reason-${id}`}>Complete Phase 1 to unlock.</p>}
        <div className="case-actions">
          <span>{stages} stages to uncover</span>
          {locked ? (
            <button className="case-locked-button" type="button" disabled aria-describedby={`lock-reason-${id}`}>
              <Lock size={16} aria-hidden="true" /> Locked
            </button>
          ) : <Link className="button" to={`/mysteries/${id}`}>
            Open case <span aria-hidden="true">↗</span>
          </Link>}
        </div>
      </div>
    </article>
  );
}
