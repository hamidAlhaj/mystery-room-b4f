interface ResultCardProps {
  stagesCompleted: number;
  totalStages: number;
  hintsUsed: number;
}

function ResultCard({
  stagesCompleted,
  totalStages,
  hintsUsed,
}: ResultCardProps) {
  return (
    <dl>
      <dt>Stages completed</dt>
      <dd>
        {stagesCompleted} / {totalStages}
      </dd>

      <dt>Hints used</dt>
      <dd>{hintsUsed}</dd>
    </dl>
  );
}

export default ResultCard;
