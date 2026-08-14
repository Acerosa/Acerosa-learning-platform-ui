import type { ReactNode } from "react";

export type ProgressCardProps = {
  title?: string;
  completed?: number;
  total?: number;
  description?: string;
};

export function ProgressCard({
  title = "Progress",
  completed = 0,
  total = 0,
  description = ""
}: ProgressCardProps): ReactNode {
  const safeTotal = Math.max(0, Number(total) || 0);
  const safeCompleted = Math.min(safeTotal, Math.max(0, Number(completed) || 0));
  const percentage = safeTotal ? Math.round((safeCompleted / safeTotal) * 100) : 0;
  return (
    <article className="lp-card lp-progress-card">
      <h2>{title}</h2>
      {description ? <p className="lp-card__meta">{description}</p> : null}
      <progress
        className="lp-progress"
        max={safeTotal || 1}
        value={safeCompleted}
        aria-label={`${percentage}% complete`}
      />
      <p>{`${safeCompleted} of ${safeTotal} complete (${percentage}%)`}</p>
    </article>
  );
}
