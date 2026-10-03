type MysteryCardProps = {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  stages: number;
};
function MysteryCard({
  title,
  description,
  difficulty,
  duration,
  stages,
}: MysteryCardProps) {
  return (
    <article className="mystery-card">
      {" "}
      <h2>{title}</h2> <p>{description}</p>{" "}
      <div className="mystery-card-info">
        {" "}
        <span>{difficulty}</span> <span>{duration}</span>{" "}
        <span>{stages} Stages</span>{" "}
      </div>{" "}
      <button type="button">Register</button>{" "}
    </article>
  );
}
export default MysteryCard;
