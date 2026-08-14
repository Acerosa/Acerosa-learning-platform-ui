import type { ReactNode } from "react";
export type StatusBadgeProps = {
    status?: string;
    label?: string;
    marker?: boolean;
};
export declare function StatusBadge({ status, label, marker }: StatusBadgeProps): ReactNode;
