import type { ReactNode } from "react";
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
export declare function ActivityCard({ title, description, activityType, duration, status, state, href, actionLabel, badge, badgeStatus, headingLevel, muted }: ActivityCardProps): ReactNode;
