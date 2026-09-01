import { type ReactNode } from "react";
import { type OnMarkBlockResponse } from "./server-mark";
import type { ActivityFeedbackCopy, ActivityItem, ActivityResult } from "./types";
export type SequenceProps = {
    id?: string;
    title?: string;
    prompt: string;
    instructions?: string;
    items: ActivityItem[];
    correctOrder?: string[];
    feedback?: ActivityFeedbackCopy;
    formative?: boolean;
    retry?: boolean;
    shuffle?: boolean;
    maxAttempts?: number;
    onMarkResponse?: OnMarkBlockResponse;
    onResult?: (result: ActivityResult) => void;
};
export declare function Sequence({ id, title, prompt, instructions, items, correctOrder, feedback, formative, retry, shuffle, maxAttempts, onMarkResponse, onResult }: SequenceProps): ReactNode;
