import type { ReactNode } from "react";
export type WeekHeaderProps = {
    teachingWeek?: number;
    title?: string;
    subtitle?: string;
    status?: string;
    learningOutcomes?: Array<{
        id?: string;
        title?: string;
    }>;
    headingLevel?: 1 | 2;
    showTitle?: boolean;
};
export declare function WeekHeader({ teachingWeek, title, subtitle, status, learningOutcomes, headingLevel, showTitle }: WeekHeaderProps): ReactNode;
