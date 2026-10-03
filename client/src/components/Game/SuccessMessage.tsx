interface SuccessMessageProps {
  message: string;
}

function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <p className="game-feedback feedback-success" role="status">
      {message}
    </p>
  );
}

export default SuccessMessage;
