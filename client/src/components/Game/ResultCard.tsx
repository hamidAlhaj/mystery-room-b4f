interface ResultCardProps {
  title: string;
  message: string;
  stagesCompleted: number;
  hintsUsed: number;
}
function ResultCard({ title, message, stagesCompleted, hintsUsed }: ResultCardProps) {
    return (
      <div className="result-card">
        <h2>{title}</h2>
        <p>{message}</p>
        <p>Stages Completed: {stagesCompleted}</p>
        <p>Hints Used: {hintsUsed}</p>
      </div>
    );
}
export default ResultCard;