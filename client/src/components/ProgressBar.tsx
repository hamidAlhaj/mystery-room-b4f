interface ProgressBarProps {
  current: number;
  total: number;
}
function ProgressBar({ current, total }: ProgressBarProps) {
    const progressPercentage = (current / total) * 100;
    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    );
}
export default ProgressBar; 