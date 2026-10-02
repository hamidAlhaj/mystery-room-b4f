interface SubmitAnswerButtonProps {
  onClick: () => void;
  disabled: boolean;
}
function SubmitAnswerButton({ onClick, disabled }: SubmitAnswerButtonProps) {
  return (
    <button
      className="submit-answer-button"
      onClick={onClick}
      disabled={disabled}
    >
      Submit Answer
    </button>
  );
}
export default SubmitAnswerButton;
