interface SuccessMessageProps {
  message: string;
}   
function SuccessMessage({ message }: SuccessMessageProps) {
    return (
      <div className="success-message">
        <h2>Success!</h2>
        <p>{message}</p>
      </div>
    );
}
export default SuccessMessage;