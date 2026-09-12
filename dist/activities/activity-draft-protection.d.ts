import { type ReactNode } from "react";
export type ActivityStateStoreLike = {
    save?: (state: Record<string, unknown>, options?: {
        remote?: boolean;
        immediate?: boolean;
    }) => unknown;
    load?: () => Record<string, unknown> | null;
    isDirty?: () => boolean;
    markDirty?: () => void;
};
export type ActivityDraftProtection = {
    isDirty: () => boolean;
    markDirty: () => void;
    recordResponse: (response: unknown) => void;
};
export declare function ActivityStateStoreProvider({ store, children }: {
    store: ActivityStateStoreLike | null;
    children: ReactNode;
}): ReactNode;
export declare function BlockDraftProtectionProvider({ questionId, children }: {
    questionId: string;
    children: ReactNode;
}): ReactNode;
export declare function useActivityDraftProtection(): ActivityDraftProtection;
export declare function resolveActivityStateStore(platform: unknown, activityKey: string, activityVersion?: string): ActivityStateStoreLike | null;
export declare function protectedActivityDraft(store: ActivityStateStoreLike | null, initialResponses?: Record<string, unknown>, initialChecked?: Record<string, boolean>, initialResults?: Record<string, unknown>): {
    responses: Record<string, unknown>;
    checked: Record<string, boolean>;
    results: Record<string, unknown>;
};
