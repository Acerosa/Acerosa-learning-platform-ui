import type { ReactNode } from "react";
export type ProgressCardProps = {
    title?: string;
    completed?: number;
    total?: number;
    description?: string;
};
export declare function ProgressCard({ title, completed, total, description }: ProgressCardProps): ReactNode;
