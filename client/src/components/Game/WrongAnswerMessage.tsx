interface WrongAnswerMessageProps {
  message: string;
}
function WrongAnswerMessage({ message }: WrongAnswerMessageProps) {
    return (
      <div className="wrong-answer-message">
        <h2>Wrong Answer!</h2>
        <p>{message}</p>
      </div>
    );
}
export default WrongAnswerMessage;