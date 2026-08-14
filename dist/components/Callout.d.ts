import type { ReactNode } from "react";
declare const TONES: readonly ["info", "success", "warning", "error"];
export type CalloutTone = (typeof TONES)[number];
export type CalloutProps = {
    tone?: CalloutTone | string;
    title?: string;
    message?: string;
};
export declare function Callout({ tone, title, message }: CalloutProps): ReactNode;
export {};
