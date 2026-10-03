interface StageHeaderProps {
  title: string;
}

function StageHeader({ title }: StageHeaderProps) {
  return (
    <div className="stage-header">
      <p className="eyebrow">Investigation in progress</p>
      <h1 dir="auto">{title}</h1>
    </div>
  );
}

export default StageHeader;
