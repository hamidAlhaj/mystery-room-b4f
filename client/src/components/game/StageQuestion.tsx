interface StageQuestionProps {
  question: string;
}

function StageQuestion({ question }: StageQuestionProps) {
  return <legend>{question}</legend>;
}

export default StageQuestion;
