interface HintBoxProps {
  hint: string;
}

function HintBox({ hint }: HintBoxProps) {
  return (
    <p className="hint-text" role="status">
      {hint}
    </p>
  );
}

export default HintBox;
