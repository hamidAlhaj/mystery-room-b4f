import SuccessMessage from "./SuccessMessage";
import WrongAnswerMessage from "./WrongAnswerMessage";

interface GameStatusProps {
  status: "idle" | "submitting" | "success" | "error";
}

function GameStatus({ status }: GameStatusProps) {
  if (status === "idle") return null;
  if (status === "submitting")
    return (
      <p className="game-status" role="status">
        Checking your answer...
      </p>
    );
  if (status === "success") return <SuccessMessage message="Correct answer!" />;
  return <WrongAnswerMessage message="Wrong answer. Try again." />;
}

export default GameStatus;
