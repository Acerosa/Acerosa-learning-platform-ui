import { isWeekAvailable } from "@learning-platform/core/curriculum-runtime";

/** Minimal week record shared by Core runtime and Content week shapes. */
export type WeekAccessRecord = {
  id?: string;
  teachingWeek?: number;
  status?: string | null;
  available?: boolean;
  title?: string;
  metadata?: {
    teachingWeek?: number;
    title?: string;
    status?: string | null;
  };
};

export const WEEK_ACCESS_COPY = {
  plannedHeading: "Week not available yet",
  plannedMessage: "This week has not been made available by your teacher.",
  archivedHeading: "Week not available",
  archivedMessage: "This week is no longer available to learners.",
  inaccessibleHeading: "Week not available",
  inaccessibleMessage: "This week is not available."
} as const;

/** Resolve canonical publication status from a runtime or Content week record. */
export function resolveWeekStatus(week: WeekAccessRecord): string {
  return String(week.status ?? week.metadata?.status ?? "").trim();
}

/** Delegate learner access to Core week visibility semantics. */
export function weekIsAccessible(week: WeekAccessRecord): boolean {
  return isWeekAvailable(resolveWeekStatus(week));
}

export function weekAccessFallbackCopy(status: string): {
  heading: string;
  message: string;
} {
  const normalised = status.toLowerCase();
  if (normalised === "planned") {
    return {
      heading: WEEK_ACCESS_COPY.plannedHeading,
      message: WEEK_ACCESS_COPY.plannedMessage
    };
  }
  if (normalised === "archived") {
    return {
      heading: WEEK_ACCESS_COPY.archivedHeading,
      message: WEEK_ACCESS_COPY.archivedMessage
    };
  }
  return {
    heading: WEEK_ACCESS_COPY.inaccessibleHeading,
    message: WEEK_ACCESS_COPY.inaccessibleMessage
  };
}
