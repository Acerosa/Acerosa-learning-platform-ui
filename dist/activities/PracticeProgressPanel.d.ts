import { type ReactNode } from "react";
import { type ProgressSummaryProps } from "./ProgressSummary";
export type PracticeProgressPanelProps = ProgressSummaryProps & {
    /** Controlled collapsed state. */
    collapsed?: boolean;
    /** Uncontrolled initial collapsed state. Defaults to true for docked panels. */
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    expandLabel?: string;
    collapseLabel?: string;
};
export declare function PracticeProgressPanel({ collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, expandLabel, collapseLabel, ...summaryProps }: PracticeProgressPanelProps): ReactNode;
