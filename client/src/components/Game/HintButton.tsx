interface HintButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

function HintButton({
  onClick,
  disabled = false,
  isLoading = false,
}: HintButtonProps) {
  return (
    <button
      type="button"
      className="button-secondary"
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? "Loading hint..." : "Request hint"}
    </button>
  );
}

export default HintButton;
