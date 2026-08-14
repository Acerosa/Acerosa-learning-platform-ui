import type { ReactNode } from "react";
import type { LinkAction } from "../contracts";

export type EmptyStateProps = {
  heading?: string;
  message?: string;
  action?: LinkAction | null;
};

export function EmptyState({
  heading = "Nothing to show yet",
  message = "Check again later.",
  action
}: EmptyStateProps): ReactNode {
  return (
    <section className="lp-empty-state">
      <h2>{heading}</h2>
      <p>{message}</p>
      {action?.label && action?.href ? (
        <a className="lp-button" href={action.href}>{action.label}</a>
      ) : null}
    </section>
  );
}
