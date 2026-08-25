import type { ReactNode } from "react";
import { StatusBadge } from "../components/StatusBadge";
import type { ActivityScore } from "./types";

export type ProgressSummaryProps = {
  title?: string;
  badge?: string;
  subtitle?: string;
  score?: ActivityScore;
  /** Fraction from 0 to 1. Derived from score when omitted. */
  progress?: number;
  completed?: boolean;
  attempts?: number;
  message?: string;
  showStatus?: boolean;
  showDisclaimer?: boolean;
  /**
   * When true, show only title, status, score headline and score detail.
   * Badge, bar, %, message and disclaimer stay for the expanded view.
   */
  collapsed?: boolean;
};

export function resolveProgressFraction(score?: ActivityScore, progress?: number): number {
  if (typeof progress === "number" && Number.isFinite(progress)) {
    return Math.min(1, Math.max(0, progress));
  }
  if (score && score.total > 0) {
    return Math.min(1, Math.max(0, score.correct / score.total));
  }
  return 0;
}

export function ProgressSummary({
  title,
  badge,
  subtitle,
  score,
  progress,
  completed = true,
  attempts,
  message,
  showStatus = true,
  showDisclaimer = true,
  collapsed = false
}: ProgressSummaryProps): ReactNode {
  const badgeText = badge || subtitle;
  const fraction = resolveProgressFraction(score, progress);
  const percentage = Math.round(fraction * 100);
  const statusLabel = completed ? "Completed" : "In progress";
  const scoreHeadline = score ? `${score.correct} / ${score.total}` : null;
  const scoreDetail = score ? `${score.correct} of ${score.total} correct` : null;
  const attemptText = typeof attempts === "number"
    ? `${attempts} ${attempts === 1 ? "attempt" : "attempts"}`
    : null;

  return (
    <div
      className="lp-progress-summary"
      data-lp-progress-summary=""
      data-lp-progress-collapsed={collapsed ? "true" : "false"}
    >
      {title ? <p className="lp-progress-summary__title"><strong>{title}</strong></p> : null}
      {showStatus ? (
        <StatusBadge status={completed ? "completed" : "progress"} label={statusLabel} />
      ) : null}
      {scoreHeadline ? (
        <p
          className="lp-progress-summary__score"
          data-lp-progress-score=""
          aria-label={scoreDetail || undefined}
        >
          {scoreHeadline}
        </p>
      ) : null}
      {scoreDetail ? <p className="lp-card__meta">{scoreDetail}</p> : null}
      {!collapsed && badgeText ? (
        <p className="lp-progress-summary__badge" data-lp-progress-badge="">
          <strong>{badgeText}</strong>
        </p>
      ) : null}
      {!collapsed ? (
        <>
          <progress
            className="lp-progress"
            max={100}
            value={percentage}
            aria-label={`${percentage}% complete`}
          />
          <p className="lp-card__meta">{percentage}% complete</p>
          {attemptText ? <p>{attemptText}</p> : null}
          {message ? <p>{message}</p> : null}
          {showDisclaimer ? (
            <p className="lp-card__meta">This summary is practice feedback, not an official mark.</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
