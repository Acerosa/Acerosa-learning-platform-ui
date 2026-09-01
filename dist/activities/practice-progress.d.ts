import { type ActivityBlockDocument, type ActivityResult, type ActivityScore } from "./types";
export declare function isScorableReactBlock(block: ActivityBlockDocument): boolean;
export declare function isCompletableReactBlock(block: ActivityBlockDocument): boolean;
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
