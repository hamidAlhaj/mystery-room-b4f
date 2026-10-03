interface StageProgressProps {
  currentStage: number;
  totalStages: number;
}
function StageProgress({ currentStage, totalStages }: StageProgressProps) {
  return (
    <div className="stage-progress">
      <p>
        Stage {currentStage + 1} of {totalStages}
      </p>
    </div>
  );
}
export default StageProgress;
