import { type ReactNode } from "react";
import type { ActivityFeedbackCopy, ActivityItem, ActivityOption, ActivityResult } from "./types";
export type PhraseGap = ActivityItem & {
    correctOptionId?: string;
};
export type PhraseCompletionProps = {
    id?: string;
    title?: string;
    prompt: string;
    instructions?: string;
    gaps?: PhraseGap[];
    options: ActivityOption[];
    correctOptionId?: string | null;
    feedback?: ActivityFeedbackCopy;
    formative?: boolean;
    retry?: boolean;
    shuffle?: boolean;
    maxAttempts?: number;
    onResult?: (result: ActivityResult) => void;
};
export declare function PhraseCompletion({ id, title, prompt, instructions, gaps, options, correctOptionId, feedback, formative, retry, shuffle, maxAttempts, onResult }: PhraseCompletionProps): ReactNode;
