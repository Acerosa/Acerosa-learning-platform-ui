import type { ReactNode } from "react";
import type { LinkAction } from "../contracts";
export type EmptyStateProps = {
    heading?: string;
    message?: string;
    action?: LinkAction | null;
};
export declare function EmptyState({ heading, message, action }: EmptyStateProps): ReactNode;
