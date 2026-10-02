interface HintButtonProps {
  onClick: () => void;
}

function HintButton({ onClick }: HintButtonProps) {
    return (
      <button className="hint-button"  onClick={onClick}>
        Use Hint
      </button>
    );
}

export default HintButton;
