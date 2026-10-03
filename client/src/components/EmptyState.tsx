interface EmptyStateProps {
  message: string;
}
export default function EmptyState({ message }: EmptyStateProps) {
  return <p className="empty-state">{message}</p>;
}
