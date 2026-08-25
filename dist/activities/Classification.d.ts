import { type ReactNode } from "react";
import type { ActivityFeedbackCopy, ActivityItem, ActivityResult } from "./types";
export type ClassificationProps = {
    id?: string;
    title?: string;
    prompt: string;
    instructions?: string;
    items: ActivityItem[];
    categories: ActivityItem[];
    feedback?: ActivityFeedbackCopy;
    formative?: boolean;
    retry?: boolean;
    shuffle?: boolean;
    maxAttempts?: number;
    initialAssignments?: Record<string, string>;
    onResult?: (result: ActivityResult) => void;
};
export declare function Classification({ id, title, prompt, instructions, items, categories, feedback, formative, retry, shuffle, maxAttempts, initialAssignments, onResult }: ClassificationProps): ReactNode;
