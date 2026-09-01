import { type ReactNode } from "react";
import { type OnMarkBlockResponse } from "./server-mark";
import { type ActivityFeedbackCopy, type ActivityResult } from "./types";
export type TextResponseProps = {
    id?: string;
    blockType?: "short-response" | "reflection";
    title?: string;
    prompt: string;
    instructions?: string;
    guidance?: string;
    placeholder?: string;
    minChars?: number;
    minimumCharacters?: number;
    defaultMinChars?: number;
    rows?: number;
    feedback?: ActivityFeedbackCopy;
    retry?: boolean;
    maxAttempts?: number;
    initialResponse?: string;
    saveLabel?: string;
    onMarkResponse?: OnMarkBlockResponse;
    onResult?: (result: ActivityResult) => void;
};
export declare function TextResponse({ id, blockType, title, prompt, instructions, guidance, placeholder, minChars, minimumCharacters, defaultMinChars, rows, feedback, retry, maxAttempts, initialResponse, saveLabel, onMarkResponse, onResult }: TextResponseProps): ReactNode;
export type ShortResponseProps = Omit<TextResponseProps, "blockType" | "defaultMinChars" | "rows"> & {
    rows?: number;
};
export declare function ShortResponse({ rows, ...props }: ShortResponseProps): ReactNode;
export type ReflectionProps = Omit<TextResponseProps, "blockType" | "defaultMinChars" | "rows"> & {
    rows?: number;
};
export declare function Reflection({ rows, ...props }: ReflectionProps): ReactNode;
export { LearningTextField } from "./LearningTextField";
export type { LearningTextFieldProps } from "./LearningTextField";
