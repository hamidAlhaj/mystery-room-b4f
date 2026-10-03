interface AnswerOptionsProps {
  options: string[];
  selected: string;
  onSelect: (answer: string) => void;
  disabled?: boolean;
}

function AnswerOptions({
  options,
  selected,
  onSelect,
  disabled = false,
}: AnswerOptionsProps) {
  return (
    <div className="answer-options">
      {options.map((option, index) => (
        <label
          className={`answer-option ${
            selected === option ? "is-selected" : ""
          }`}
          key={option}
        >
          <input
            type="radio"
            name="answer"
            value={option}
            checked={selected === option}
            onChange={() => onSelect(option)}
            disabled={disabled}
          />

          <span className="option-letter" aria-hidden="true">
            {String.fromCharCode(65 + index)}
          </span>

          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export default AnswerOptions;
