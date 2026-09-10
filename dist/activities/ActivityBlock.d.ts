import { type ReactNode } from "react";
import { type OnMarkResponse } from "./server-mark";
import { type ActivityBlockDocument, type ActivityDocument, type ActivityResult } from "./types";
export type RestoredActivityResult = {
    correct?: boolean | null;
    canRetry?: boolean;
    status?: "correct" | "incorrect" | "review" | "recorded" | "error";
};
export type ActivityBlockProps = {
    block: ActivityBlockDocument;
    shuffleSeed?: string;
    initialResponse?: unknown;
    initialChecked?: boolean;
    initialResult?: RestoredActivityResult;
    onMarkResponse?: (responses: unknown) => Promise<import("./server-mark").MarkResponseResult>;
    onResult?: (result: ActivityResult, block: ActivityBlockDocument) => void;
};
export type InteractiveActivityProps = {
    activity: ActivityDocument;
    initialResponses?: Record<string, unknown>;
    initialChecked?: Record<string, boolean>;
    initialResults?: Record<string, RestoredActivityResult>;
    renderFallback?: (block: ActivityBlockDocument) => ReactNode;
    platform?: unknown;
    markingMode?: "server" | "local";
    /** Optional non-secret salt (e.g. learner id) so different learners can get different orders. */
    shuffleSalt?: string;
    onMarkResponse?: OnMarkResponse;
    onResult?: (result: ActivityResult, block: ActivityBlockDocument) => void;
};
export declare function ActivityBlock({ block, shuffleSeed, initialResponse, initialChecked, initialResult, onMarkResponse, onResult }: ActivityBlockProps): ReactNode;
export declare function InteractiveActivity({ activity, initialResponses, initialChecked, initialResults, renderFallback, platform, markingMode, shuffleSalt, onMarkResponse, onResult }: InteractiveActivityProps): ReactNode;
