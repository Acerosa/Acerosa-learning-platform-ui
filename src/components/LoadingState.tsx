import type { ReactNode } from "react";

export type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Loading…" }: LoadingStateProps): ReactNode {
  return (
    <div className="lp-loading" role="status" aria-live="polite">
      <span className="lp-loading__spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
