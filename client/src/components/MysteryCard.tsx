interface MysteryCardProps {
  title: string;
  intro: string;
  totalStages: number;
  solved: boolean;
}
function MysteryCard({ title, intro, totalStages, solved }: MysteryCardProps) {
    return (
      <div className={`mystery-card ${solved ? 'solved' : ''}`}>
        <h2>{title}</h2>
        <p>{intro}</p>
        <p>Total Stages: {totalStages}</p>
        {solved && <p className="solved-message">Solved!</p>}
      </div>
    );
}
export default MysteryCard; 