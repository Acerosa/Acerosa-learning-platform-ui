import type { ReactNode } from "react";
export type WeekNavLink = {
    label?: string;
    href: string;
};
export type WeekNavigationProps = {
    previousWeek?: WeekNavLink | null;
    nextWeek?: WeekNavLink | null;
};
export declare function WeekNavigation({ previousWeek, nextWeek }: WeekNavigationProps): ReactNode;
