interface StageQuestionProps {
  question: string;
}
function StageQuestion({ question }: StageQuestionProps) {
  return (
    <div className="stage-question">
      <p>{question}</p>
    </div>
  );
}   
export default StageQuestion;