import type { ReactNode } from "react";

export type LearnerSummary = {
  fullName?: string;
  displayName?: string;
  yearGroup?: string;
  academicYear?: string;
  contactEmail?: string;
};

export type LearnerHeaderProps = {
  learner?: LearnerSummary | null;
  hubName: string;
  accountHref?: string;
  onSignOut?: () => void | Promise<void>;
};

export function LearnerHeader({
  learner,
  hubName,
  accountHref = "./account/",
  onSignOut
}: LearnerHeaderProps): ReactNode {
  if (!learner) {
    return <section className="lp-learner-header" aria-label="Learner account" hidden />;
  }
  return (
    <section className="lp-learner-header" aria-label="Learner account">
      <dl className="lp-learner-header__details">
        <div>
          <dt>Learner</dt>
          <dd>{learner.fullName || learner.displayName || "Learner"}</dd>
        </div>
        <div>
          <dt>Year group</dt>
          <dd>{learner.yearGroup || learner.academicYear || "Not set"}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{learner.contactEmail || "Not set"}</dd>
        </div>
        <div>
          <dt>Current hub</dt>
          <dd>{hubName}</dd>
        </div>
      </dl>
      <div className="lp-learner-header__actions">
        <a href={accountHref}>Account</a>
        {onSignOut ? (
          <button className="lp-button lp-button--secondary" type="button" onClick={() => { void onSignOut(); }}>
            Sign out
          </button>
        ) : null}
      </div>
    </section>
  );
}
