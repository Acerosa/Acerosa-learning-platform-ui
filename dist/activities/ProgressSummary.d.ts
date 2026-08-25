import type { ReactNode } from "react";
import type { ActivityScore } from "./types";
export type ProgressSummaryProps = {
    title?: string;
    badge?: string;
    subtitle?: string;
    score?: ActivityScore;
    /** Fraction from 0 to 1. Derived from score when omitted. */
    progress?: number;
    completed?: boolean;
    attempts?: number;
    message?: string;
    showStatus?: boolean;
    showDisclaimer?: boolean;
    /**
     * When true, show only title, status, score headline and score detail.
     * Badge, bar, %, message and disclaimer stay for the expanded view.
     */
    collapsed?: boolean;
};
export declare function resolveProgressFraction(score?: ActivityScore, progress?: number): number;
export declare function ProgressSummary({ title, badge, subtitle, score, progress, completed, attempts, message, showStatus, showDisclaimer, collapsed }: ProgressSummaryProps): ReactNode;
