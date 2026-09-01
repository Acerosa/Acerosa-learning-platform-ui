import type { FeedbackState } from "./FeedbackPanel";
import type { ActivityBlockDocument, ActivityDocument, ActivityFeedbackCopy, ActivityItemResult, ActivityResult, ActivityScore } from "./types";
export declare const SERVER_CHECK_FAILED_MESSAGE = "Your answer could not be checked. Please try again.";
export declare const SERVER_REVIEW_MESSAGE = "Your response has been recorded for review.";
export type MarkResponseRequest = {
    activityId: string;
    activityVersion: string;
    block: ActivityBlockDocument;
    responses: unknown;
};
export type MarkResponseResult = {
    completed: boolean;
    correct: boolean | null;
    requiresReview?: boolean;
    score?: ActivityScore;
    status?: "correct" | "incorrect" | "review" | "recorded" | "error";
    itemResults?: ActivityItemResult[];
    checkNumber?: number;
    canRetry?: boolean;
    remainingAttempts?: number | null;
};
export type OnMarkResponse = (request: MarkResponseRequest) => Promise<MarkResponseResult>;
export type OnMarkBlockResponse = (responses: unknown) => Promise<MarkResponseResult>;
export declare function usesServerMark(onMarkResponse?: unknown): boolean;
export declare function learnerCheckMessage(error: unknown): string;
export declare function createFailClosedMarkHandler(): OnMarkResponse;
export declare function resolveCanRetry(options: {
    checked: boolean;
    localRetry: boolean;
    localMaxAttempts?: number;
    attempts: number;
    serverCanRetry?: boolean;
}): boolean;
export declare function localScoreEnabled(formative: boolean, hasExpected: boolean, onMarkResponse?: unknown): boolean;
export declare function displayForMark(marked: MarkResponseResult, feedback?: ActivityFeedbackCopy, recordedMessage?: string): {
    status: FeedbackState;
    message: string;
    correct: boolean | null;
    score?: ActivityScore;
    requiresReview: boolean;
    completed: boolean;
    itemResults?: ActivityItemResult[];
    canRetry?: boolean;
    checkNumber?: number;
    remainingAttempts?: number | null;
};
export declare function activityResultFromMark(marked: ReturnType<typeof displayForMark>, attempts: number, responses: unknown): ActivityResult;
export declare function runMarkedCheck(onMarkResponse: OnMarkBlockResponse, responses: unknown, feedback?: ActivityFeedbackCopy, recordedMessage?: string): Promise<{
    ok: true;
    marked: ReturnType<typeof displayForMark>;
} | {
    ok: false;
    message: string;
}>;
export declare function learnerSafeBlock(block: ActivityBlockDocument): ActivityBlockDocument;
export declare function createMarkResponseHandler(platform: unknown, activity: ActivityDocument): OnMarkResponse | undefined;
