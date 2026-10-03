interface ProgressBarProps {
  current: number;
  total: number;
}

function ProgressBar({ current, total }: ProgressBarProps) {
  const maximum = Math.max(1, total);
  const completed = Math.min(maximum, Math.max(0, current));
  return (
    <progress
      className="progress-bar"
      aria-label="Completed stages"
      value={completed}
      max={maximum}
    />
  );
}

export default ProgressBar;
