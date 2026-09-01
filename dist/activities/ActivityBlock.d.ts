import { type ReactNode } from "react";
import { type OnMarkResponse } from "./server-mark";
import { type ActivityBlockDocument, type ActivityDocument, type ActivityResult } from "./types";
export type ActivityBlockProps = {
    block: ActivityBlockDocument;
    initialResponse?: unknown;
    onMarkResponse?: (responses: unknown) => Promise<import("./server-mark").MarkResponseResult>;
    onResult?: (result: ActivityResult, block: ActivityBlockDocument) => void;
};
export type InteractiveActivityProps = {
    activity: ActivityDocument;
    initialResponses?: Record<string, unknown>;
    renderFallback?: (block: ActivityBlockDocument) => ReactNode;
    platform?: unknown;
    markingMode?: "server" | "local";
    onMarkResponse?: OnMarkResponse;
    onResult?: (result: ActivityResult, block: ActivityBlockDocument) => void;
};
export declare function ActivityBlock({ block, initialResponse, onMarkResponse, onResult }: ActivityBlockProps): ReactNode;
export declare function InteractiveActivity({ activity, initialResponses, renderFallback, platform, markingMode, onMarkResponse, onResult }: InteractiveActivityProps): ReactNode;
