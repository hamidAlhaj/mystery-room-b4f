interface StageHeaderProps {
  title: string;
  caseId: number;
}

function StageHeader({ title, caseId }: StageHeaderProps) {
  return (
    <div className="stage-header">
      <p className="eyebrow">
        Investigation in progress / File {String(caseId).padStart(3, "0")}
      </p>
      <h1 lang="ar" dir="auto">
        {title}
      </h1>
    </div>
  );
}

export default StageHeader;
