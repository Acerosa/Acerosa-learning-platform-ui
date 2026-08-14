import type { ReactNode } from "react";
import { type SessionKind, type WeekUiFeatures } from "../contracts";
import { type ActivityCardProps } from "./ActivityCard";
import { type ContextPanelProps } from "./ContextPanel";
import { type ProgressCardProps } from "./ProgressCard";
import { type WeekNavLink } from "./WeekNavigation";
export type WeekActivity = ({
    html: string;
} & {
    title?: never;
}) | (ActivityCardProps & {
    html?: never;
}) | {
    element?: never;
    html?: never;
    children: ReactNode;
};
export type WeekSession = {
    id?: string;
    title?: string;
    kind?: SessionKind | string;
    summary?: string;
    defaultOpen?: boolean;
    meta?: string;
    activities?: WeekActivity[];
};
export type WeekViewProps = {
    week?: {
        id?: string;
        teachingWeek?: number;
        title?: string;
        subtitle?: string;
        status?: string;
        emptyMessage?: string;
        emptyAction?: {
            label: string;
            href: string;
        };
        headingLevel?: 1 | 2;
    };
    learningOutcomes?: Array<{
        id?: string;
        title?: string;
    }>;
    context?: (ContextPanelProps & {
        type?: string;
    }) | null;
    sessions?: WeekSession[];
    progress?: ProgressCardProps | null;
    previousWeek?: WeekNavLink | null;
    nextWeek?: WeekNavLink | null;
    features?: Partial<WeekUiFeatures>;
    renderActivity?: (activity: WeekActivity, index: number) => ReactNode;
};
export declare function WeekView({ week, learningOutcomes, context, sessions, progress, previousWeek, nextWeek, features, renderActivity }: WeekViewProps): ReactNode;
