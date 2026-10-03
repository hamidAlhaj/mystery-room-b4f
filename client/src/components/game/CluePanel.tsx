import EmptyState from "../EmptyState";
import type { Clue } from "../../types";

interface CluePanelProps {
  clues: Clue[];
  isOpen: boolean;
  onToggle: () => void;
}

function CluePanel({ clues, isOpen, onToggle }: CluePanelProps) {
  return (
    <section className="clue-panel" aria-label="Clues">
      <button
        className="clue-toggle"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="game-clues"
      >
        {isOpen ? "Hide clues" : "Show clues"}
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>

      <div id="game-clues" hidden={!isOpen}>
        {clues.length === 0 ? (
          <EmptyState message="No clues are available." />
        ) : (
          <ul>
            {clues.map((clue) => (
              <li key={clue.stage}>
                <span className="eyebrow">
                  Evidence / Stage {clue.stage + 1}
                </span>
                <p lang="ar" dir="auto">
                  {clue.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default CluePanel;
