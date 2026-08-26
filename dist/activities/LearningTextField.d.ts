import { type ReactNode } from "react";
export type LearningTextFieldProps = {
    id?: string;
    prompt: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    minChars?: number;
    minimumCharacters?: number;
    defaultMinChars?: number;
    rows?: number;
    disabled?: boolean;
    hidePrompt?: boolean;
    onChange?: (value: string) => void;
};
/**
 * Controlled (or initially uncontrolled) learning textarea with paste/drop
 * blocked, minChars, and a live counter. No Save button — for host worksheets
 * that keep a single activity Submit, and as the field chrome inside TextResponse.
 */
export declare function LearningTextField({ id, prompt, placeholder, value, defaultValue, minChars, minimumCharacters, defaultMinChars, rows, disabled, hidePrompt, onChange }: LearningTextFieldProps): ReactNode;
