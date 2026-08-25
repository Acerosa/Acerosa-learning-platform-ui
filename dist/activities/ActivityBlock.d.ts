import { type ReactNode } from "react";
import { type ActivityBlockDocument, type ActivityDocument, type ActivityResult } from "./types";
export type ActivityBlockProps = {
    block: ActivityBlockDocument;
    initialResponse?: unknown;
    onResult?: (result: ActivityResult, block: ActivityBlockDocument) => void;
};
export type InteractiveActivityProps = {
    activity: ActivityDocument;
    initialResponses?: Record<string, unknown>;
    renderFallback?: (block: ActivityBlockDocument) => ReactNode;
    onResult?: (result: ActivityResult, block: ActivityBlockDocument) => void;
};
export declare function ActivityBlock({ block, initialResponse, onResult }: ActivityBlockProps): ReactNode;
export declare function InteractiveActivity({ activity, initialResponses, renderFallback, onResult }: InteractiveActivityProps): ReactNode;
