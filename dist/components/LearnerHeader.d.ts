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
export declare function LearnerHeader({ learner, hubName, accountHref, onSignOut }: LearnerHeaderProps): ReactNode;
