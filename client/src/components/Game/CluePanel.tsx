interface CluePanelProps {
  clue: string;
}
function CluePanel({ clue }: CluePanelProps) {
    return (
      <div className="clue-panel">
        <h2>Clue</h2>
        <p>{clue}</p>
      </div>
    );
}   
export default CluePanel;