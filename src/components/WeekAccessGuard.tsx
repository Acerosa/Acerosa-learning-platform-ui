import type { ReactNode } from "react";
import {
  resolveWeekStatus,
  weekAccessFallbackCopy,
  weekIsAccessible,
  type WeekAccessRecord
} from "../week-access";
import { EmptyState } from "./EmptyState";
import { StatusBadge } from "./StatusBadge";

export type WeekAccessGuardProps = {
  week: WeekAccessRecord;
  children: ReactNode;
  fallback?: ReactNode;
};

export function WeekAccessGuard({ week, children, fallback }: WeekAccessGuardProps): ReactNode {
  if (weekIsAccessible(week)) {
    return children;
  }

  if (fallback != null) {
    return fallback;
  }

  const status = resolveWeekStatus(week);
  const copy = weekAccessFallbackCopy(status);
  return (
    <div className="lp-week-access-guard">
      <StatusBadge status={status || "planned"} />
      <EmptyState heading={copy.heading} message={copy.message} />
    </div>
  );
}
