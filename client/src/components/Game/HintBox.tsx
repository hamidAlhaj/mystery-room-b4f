interface HintBoxProps {
  hint: string;
}
function HintBox({ hint }: HintBoxProps) {
    return (
      <div className="hint-box">
        
        <p>{hint}</p>
      </div>
    );
}       
export default HintBox;