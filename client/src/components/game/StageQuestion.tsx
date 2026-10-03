interface StageQuestionProps {
  question: string;
}

function StageQuestion({ question }: StageQuestionProps) {
  return (
    <legend lang="ar" dir="auto">
      {question}
    </legend>
  );
}

export default StageQuestion;
