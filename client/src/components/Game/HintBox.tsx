interface HintBoxProps {
  hint: string;
}

function HintBox({ hint }: HintBoxProps) {
  return (
    <p className="hint-text" dir="auto" role="status">
      {hint}
    </p>
  );
}

export default HintBox;
