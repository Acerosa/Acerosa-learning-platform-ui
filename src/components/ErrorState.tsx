import type { ReactNode } from "react";

export type ErrorStateProps = {
  heading?: string;
  message?: string;
};

export function ErrorState({
  heading = "There is a problem",
  message = "Try again."
}: ErrorStateProps): ReactNode {
  return (
    <section className="lp-error-banner" role="alert" tabIndex={-1}>
      <h2>{heading}</h2>
      <p>{message}</p>
    </section>
  );
}
