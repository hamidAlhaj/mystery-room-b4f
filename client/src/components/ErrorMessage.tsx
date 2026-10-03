import type { ReactNode } from "react";
interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  title?: string;
  retryLabel?: string;
  children?: ReactNode;
}
export default function ErrorMessage({
  message,
  onRetry,
  title,
  retryLabel = "Try again",
  children,
}: ErrorMessageProps) {
  return (
    <div role="alert">
      {title && <h1>{title}</h1>}
      <p>{message}</p>
      {children}
      <button type="button" onClick={onRetry}>
        {retryLabel}
      </button>
    </div>
  );
}
