import { type ReactNode } from "react";
import type { ActivityFeedbackCopy, ActivityOption, ActivityResult } from "./types";
export type OptionCardsProps = {
    id?: string;
    title?: string;
    prompt: string;
    instructions?: string;
    options: ActivityOption[];
    correctOptionId?: string | null;
    feedback?: ActivityFeedbackCopy;
    formative?: boolean;
    retry?: boolean;
    shuffle?: boolean;
    maxAttempts?: number;
    initialSelectedId?: string;
    onResult?: (result: ActivityResult) => void;
};
export declare function OptionCards({ id, title, prompt, instructions, options, correctOptionId, feedback, formative, retry, shuffle, maxAttempts, initialSelectedId, onResult }: OptionCardsProps): ReactNode;
