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
export declare const WEEK_ACCESS_COPY: {
    readonly plannedHeading: "Week not available yet";
    readonly plannedMessage: "This week has not been made available by your teacher.";
    readonly archivedHeading: "Week not available";
    readonly archivedMessage: "This week is no longer available to learners.";
    readonly inaccessibleHeading: "Week not available";
    readonly inaccessibleMessage: "This week is not available.";
};
/** Resolve canonical publication status from a runtime or Content week record. */
export declare function resolveWeekStatus(week: WeekAccessRecord): string;
/** Delegate learner access to Core week visibility semantics. */
export declare function weekIsAccessible(week: WeekAccessRecord): boolean;
export declare function weekAccessFallbackCopy(status: string): {
    heading: string;
    message: string;
};
