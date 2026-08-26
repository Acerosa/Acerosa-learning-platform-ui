export type ActivityScore = {
    correct: number;
    total: number;
};
export type ActivityResult = {
    completed: boolean;
    correct: boolean | null;
    score?: ActivityScore;
    attempts: number;
    responses: unknown;
};
export type ActivityFeedbackCopy = {
    correct?: string;
    incorrect?: string;
};
export type ActivityOption = {
    id: string;
    label: string;
    description?: string;
    imageSrc?: string;
    imageAlt?: string;
};
export type ActivityItem = {
    id: string;
    label: string;
    text?: string;
    correctCategoryId?: string;
};
export type ActivityBlockContent = {
    presentation?: string;
    prompt?: string;
    instructions?: string;
    formative?: boolean;
    retry?: boolean;
    shuffle?: boolean;
    randomise?: boolean;
    maxAttempts?: number;
    feedback?: ActivityFeedbackCopy;
    marking?: {
        mode?: string;
    };
    options?: ActivityOption[];
    correctOptionId?: string | null;
    items?: ActivityItem[];
    categories?: ActivityItem[];
    targets?: ActivityItem[];
    correct?: Record<string, string>;
    correctOrder?: string[];
    gaps?: Array<ActivityItem & {
        correctOptionId?: string;
    }>;
    gapId?: string;
    questionId?: string;
    minChars?: number;
    minimumCharacters?: number;
    guidance?: string;
    placeholder?: string;
};
export type ActivityBlockDocument = {
    id: string;
    type: string;
    content?: ActivityBlockContent;
};
export type ActivityDocument = {
    id: string;
    version?: string;
    metadata?: {
        title?: string;
        summary?: string;
        status?: string;
    };
    blocks?: ActivityBlockDocument[];
};
export declare function normaliseActivityType(value: string | undefined): string;
export declare function isFormativeContent(content?: ActivityBlockContent): boolean;
export declare function allowsRetry(content?: ActivityBlockContent): boolean;
export declare function shouldShuffle(content?: ActivityBlockContent): boolean;
export declare const CATALOGUE_REACT_TYPES: readonly ["single-choice", "option-cards", "classification", "drag-drop", "fill-gap", "phrase-completion", "ordering", "sequence", "short-response", "reflection"];
export declare const SHORT_RESPONSE_DEFAULT_MIN_CHARS = 200;
export declare const REFLECTION_DEFAULT_MIN_CHARS = 500;
export declare function resolveMinChars(content: Pick<ActivityBlockContent, "minChars" | "minimumCharacters"> | undefined, fallback: number): number;
export declare function isCatalogueReactType(value: string | undefined): boolean;
export declare function questionIdFor(block: ActivityBlockDocument): string;
