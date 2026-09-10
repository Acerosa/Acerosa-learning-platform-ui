import type { FeedbackState } from "./FeedbackPanel";
import type { ActivityFeedbackCopy } from "./types";
export type RestoredVerdictProps = {
    initialChecked?: boolean;
    hasResponse: boolean;
    initialCorrect?: boolean | null;
    initialCanRetry?: boolean;
    feedback?: ActivityFeedbackCopy;
};
/**
 * Restores Correct / Incorrect / review feedback from learner-safe persisted
 * results (OptionCards baseline). Does not call marking APIs.
 */
export declare function useRestoredCheckedFeedback(options: RestoredVerdictProps): {
    status: FeedbackState;
    message: string;
    serverCorrect: boolean | null;
    serverCanRetry: boolean | undefined;
    setStatus: (value: FeedbackState) => void;
    setMessage: (value: string) => void;
    setServerCorrect: (value: boolean | null) => void;
    setServerCanRetry: (value: boolean | undefined) => void;
    markLive: () => void;
    markRetry: () => void;
};
