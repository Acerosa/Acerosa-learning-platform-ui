import type { ReactNode } from "react";

export type LearningOutcomeBadgeProps = {
  id?: string;
  title?: string;
};

export function LearningOutcomeBadge({ id, title }: LearningOutcomeBadgeProps): ReactNode {
  const label = [id, title].filter(Boolean).join(" ") || "Learning outcome";
  return <span className="lp-outcome-badge">{label}</span>;
}
