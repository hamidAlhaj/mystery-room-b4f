interface LoadingMessageProps {
  label: string;
}
export default function LoadingMessage({ label }: LoadingMessageProps) {
  return <p role="status">{label}</p>;
}
