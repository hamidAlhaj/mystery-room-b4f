interface WrongAnswerMessageProps {
  message: string;
}

function WrongAnswerMessage({ message }: WrongAnswerMessageProps) {
  return (
    <p className="game-feedback feedback-wrong" role="status">
      {message}
    </p>
  );
}

export default WrongAnswerMessage;
