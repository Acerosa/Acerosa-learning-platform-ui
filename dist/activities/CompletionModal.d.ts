import { type ReactNode } from "react";
import type { ActivityScore } from "./types";
export type CompletionModalProps = {
    open?: boolean;
    title?: string;
    completed?: boolean;
    score?: ActivityScore;
    attempts?: number;
    message?: string;
    onClose?: () => void;
    onReview?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    reviewLabel?: string;
};
export declare function CompletionModal({ open, title, completed, score, attempts, message, onClose, onReview, onNext, nextLabel, reviewLabel }: CompletionModalProps): ReactNode;
