interface AnswerOptionsProps {
  options: string[];
  selected: string | null;
  onSelect: (answer: string) => void;
}

function AnswerOptions({ options, selected, onSelect }: AnswerOptionsProps) {
  return (
    <div className="answer-options">
      {options.map((option) => (
        <button
          key={option}
          className={
            selected === option ? "answer-option selected" : "answer-option"
          }
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default AnswerOptions;
