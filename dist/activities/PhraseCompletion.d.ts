import { type ReactNode } from "react";
import { type OnMarkBlockResponse } from "./server-mark";
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
    initialPlacements?: Record<string, string>;
    initialChecked?: boolean;
    onMarkResponse?: OnMarkBlockResponse;
    onResult?: (result: ActivityResult) => void;
};
export declare function PhraseCompletion({ id, title, prompt, instructions, gaps, options, correctOptionId, feedback, formative, retry, shuffle, maxAttempts, initialPlacements, initialChecked, onMarkResponse, onResult }: PhraseCompletionProps): ReactNode;
