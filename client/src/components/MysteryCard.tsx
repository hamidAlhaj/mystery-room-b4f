import { Link } from "react-router-dom";

type MysteryCardProps = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  stages: number;
};

function MysteryCard({
  id,
  title,
  description,
  difficulty,
  duration,
  stages,
}: MysteryCardProps) {
  return (
    <article className="mystery-card">
      <h2>{title}</h2>

      <p>{description}</p>

      <div className="mystery-card-info">
        <span>{difficulty}</span>
        <span>{duration}</span>
        <span>{stages} Stages</span>
      </div>

      <Link className="button" to={`/mysteries/${id}`}>
        Register
      </Link>
    </article>
  );
}

export default MysteryCard;