import type { ReactNode } from "react";
export declare const FEEDBACK_STATES: readonly ["neutral", "correct", "incorrect", "informative", "hint"];
export type FeedbackState = (typeof FEEDBACK_STATES)[number];
export type FeedbackPanelProps = {
    state?: FeedbackState | string;
    title?: string;
    message?: string;
};
export declare function FeedbackPanel({ state, title, message }: FeedbackPanelProps): ReactNode;
