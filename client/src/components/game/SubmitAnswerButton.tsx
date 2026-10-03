interface SubmitAnswerButtonProps {
  disabled: boolean;
  isSubmitting: boolean;
}

function SubmitAnswerButton({
  disabled,
  isSubmitting,
}: SubmitAnswerButtonProps) {
  return (
    <button type="submit" disabled={disabled}>
      {isSubmitting ? "Submitting..." : "Submit answer"}
    </button>
  );
}

export default SubmitAnswerButton;
