/** Learner-safe formative result fields for activity_states persistence. */
export type LearnerSafeCheckedResult = {
    correct: boolean | null;
    canRetry?: boolean;
    status?: "correct" | "incorrect" | "review" | "recorded" | "error";
};
export declare function learnerSafeCheckedResult(value: unknown): LearnerSafeCheckedResult | null;
export declare function learnerSafeCheckedResults(value: unknown): Record<string, LearnerSafeCheckedResult>;
export declare function learnerSafeResultFromActivityResult(result: {
    correct?: boolean | null;
    canRetry?: boolean;
    status?: string;
    requiresReview?: boolean;
}): LearnerSafeCheckedResult;
