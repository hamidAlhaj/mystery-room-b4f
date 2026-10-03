interface GameStatusProps {
  status: "idle" | "submitting" | "success" | "error";
}
function GameStatus({ status }: GameStatusProps) {
  if (status === "idle") {
    return null;
    }
 if (status === "submitting") {
   return (
     <div className="game-status">
       <p>Checking your answer...</p>
     </div>
   );
    } 
    if (status === "success") {
      return (
        <div className="game-status">
          <p>Correct answer!</p>
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="game-status">
          <p>Wrong answer. Try again.</p>
        </div>
      );
    }

  return (
    <div className="game-status">
      <p>{status}</p>
    </div>
  );
}
export default GameStatus;