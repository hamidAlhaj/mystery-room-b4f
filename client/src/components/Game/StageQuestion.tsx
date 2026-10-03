interface StageQuestionProps {
  question: string;
}

function StageQuestion({ question }: StageQuestionProps) {
  return <legend dir="auto">{question}</legend>;
}

export default StageQuestion;
