// Component props interface
interface Props {
  message: string;
}

// Error UI component with reload option to recover from failures
export default function ErrorMessage({ message }: Props) {
  return (
    <div className="error">
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}
