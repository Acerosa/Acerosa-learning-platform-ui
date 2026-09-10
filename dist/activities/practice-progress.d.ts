import { type ActivityBlockDocument, type ActivityDocument, type ActivityResult, type ActivityScore } from "./types";
/**
 * In-hub practice completion (docked Practice progress panel):
 * an activity counts as completed when every completable React block has been
 * Checked (`result.completed === true`), including incorrect formative answers
 * and recorded short/reflection responses. Retry (`completed: false` without
 * `status: "error"`) clears that block. Failed server saves (`status: "error"`)
 * do not clear prior completion.
 *
 * Authoritative learning-record / Reports completion remains separate:
 * `api.my_hub_activity_progress` counts completed `learning.attempts` only.
 */
export declare function isScorableReactBlock(block: ActivityBlockDocument): boolean;
export declare function isCompletableReactBlock(block: ActivityBlockDocument): boolean;
export declare function completableBlockIds(activity: ActivityDocument | null | undefined): string[];
export declare function isActivityPracticeComplete(activity: ActivityDocument | null | undefined, completedByBlockId: Record<string, boolean> | undefined): boolean;
export declare function isActivityCheckedComplete(activity: ActivityDocument | null | undefined, checkedByBlockId: Record<string, boolean> | undefined): boolean;
export declare function completedActivityCountFromState(activities: Array<ActivityDocument | null | undefined>, completedByBlockId: Record<string, boolean>): number;
export declare function completedActivityCountFromCheckedDrafts(activities: Array<ActivityDocument | null | undefined>, checkedByActivityId: Record<string, Record<string, boolean> | undefined>): number;
export declare function activityProgressLabel(completed: number, total: number): string;
export declare function blockScorableTotal(block: ActivityBlockDocument): number;
export type PracticeProgressState = {
    completed: Record<string, boolean>;
    scores: Record<string, ActivityScore>;
};
export type PracticeProgressAggregate = {
    completedCount: number;
    requiredBlocks: number;
    completion: number;
    score: ActivityScore;
    complete: boolean;
};
export declare function emptyPracticeProgress(): PracticeProgressState;
export declare function applyPracticeResult(state: PracticeProgressState, blockId: string, result: ActivityResult): PracticeProgressState;
export declare function scorableBlocksComplete(state: PracticeProgressState, scorableBlockIds: string[]): boolean;
export declare function isPracticeCompletionCue(result: ActivityResult, aggregate: PracticeProgressAggregate): boolean;
export declare function aggregatePracticeProgress(state: PracticeProgressState, totals: {
    requiredBlocks: number;
    scorableTotal: number;
}): PracticeProgressAggregate;
