import type { ReactNode } from "react";
import { activityActionLabel, statusLabel } from "../status";
import { StatusBadge } from "./StatusBadge";

export type ActivityCardProps = {
  title?: string;
  description?: string;
  activityType?: string;
  duration?: string;
  status?: string;
  state?: string;
  href?: string;
  actionLabel?: string;
  badge?: boolean;
  badgeStatus?: string;
  headingLevel?: 2 | 3;
  muted?: boolean;
};

export function ActivityCard({
  title = "Untitled activity",
  description = "",
  activityType = "Activity",
  duration = "",
  status = "Not started",
  state,
  href,
  actionLabel,
  badge = false,
  badgeStatus,
  headingLevel = 2,
  muted = false
}: ActivityCardProps): ReactNode {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const metaParts = [activityType, duration].filter(Boolean);
  const readableStatus = state ? statusLabel(state, status) : status;
  const className = muted ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card";
  return (
    <article className={className} data-state={state || undefined}>
      {badge ? (
        <StatusBadge
          status={badgeStatus || state || "planned"}
          label={typeof status === "string" && status !== "Not started" ? status : undefined}
        />
      ) : null}
      {metaParts.length ? <p className="lp-card__meta">{metaParts.join(" · ")}</p> : null}
      <Heading>{title}</Heading>
      {description ? <p>{description}</p> : null}
      <p className="lp-card__meta">{`Status: ${readableStatus}`}</p>
      {href ? (
        <div className="lp-card__actions">
          <a className="lp-button" href={href}>{actionLabel || activityActionLabel(state)}</a>
        </div>
      ) : null}
    </article>
  );
}
