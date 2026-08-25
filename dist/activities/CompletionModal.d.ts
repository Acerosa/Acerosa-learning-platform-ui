import { type ReactNode } from "react";
import type { ActivityScore } from "./types";
export type CompletionModalProps = {
    open?: boolean;
    title?: string;
    completed?: boolean;
    score?: ActivityScore;
    /** Hub-supplied label such as a topic badge. Not curriculum hard-coding. */
    badge?: string;
    subtitle?: string;
    /** Fraction from 0 to 1. Derived from score when omitted. */
    progress?: number;
    attempts?: number;
    message?: string;
    onClose?: () => void;
    onReview?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    reviewLabel?: string;
};
export declare function CompletionModal({ open, title, completed, score, badge, subtitle, progress, attempts, message, onClose, onReview, onNext, nextLabel, reviewLabel }: CompletionModalProps): ReactNode;
