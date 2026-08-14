import type { ReactNode } from "react";
export type ErrorStateProps = {
    heading?: string;
    message?: string;
};
export declare function ErrorState({ heading, message }: ErrorStateProps): ReactNode;
