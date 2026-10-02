interface StageHeaderProps {
  title: string;
}
function StageHeader({ title }: StageHeaderProps) {
    return (
      <div className="stage-header">
        <h1>{title}</h1>
      </div>
    );
}
export default StageHeader;