import { type ReactNode } from "react";
import type { ActivityFeedbackCopy, ActivityItem, ActivityResult } from "./types";
export type DragDropProps = {
    id?: string;
    title?: string;
    prompt: string;
    instructions?: string;
    items: ActivityItem[];
    targets: ActivityItem[];
    correct?: Record<string, string>;
    feedback?: ActivityFeedbackCopy;
    formative?: boolean;
    retry?: boolean;
    shuffle?: boolean;
    maxAttempts?: number;
    onResult?: (result: ActivityResult) => void;
};
export declare function DragDrop({ id, title, prompt, instructions, items, targets, correct, feedback, formative, retry, shuffle, maxAttempts, onResult }: DragDropProps): ReactNode;
