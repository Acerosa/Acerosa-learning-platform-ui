import {
  isCatalogueReactType,
  normaliseActivityType,
  questionIdFor,
  type ActivityBlockDocument,
  type ActivityDocument,
  type ActivityResult,
  type ActivityScore
} from "./types";

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
export function isScorableReactBlock(block: ActivityBlockDocument): boolean {
  const type = normaliseActivityType(block.type);
  return type === "single-choice"
    || type === "option-cards"
    || type === "classification"
    || type === "drag-drop"
    || type === "fill-gap"
    || type === "phrase-completion"
    || type === "ordering"
    || type === "sequence";
}

export function isCompletableReactBlock(block: ActivityBlockDocument): boolean {
  return isCatalogueReactType(block.type);
}

export function completableBlockIds(activity: ActivityDocument | null | undefined): string[] {
  return (activity?.blocks || [])
    .filter((block) => isCompletableReactBlock(block))
    .map((block) => questionIdFor(block));
}

export function isActivityPracticeComplete(
  activity: ActivityDocument | null | undefined,
  completedByBlockId: Record<string, boolean> | undefined
): boolean {
  const blockIds = completableBlockIds(activity);
  if (!blockIds.length || !completedByBlockId) return false;
  return blockIds.every((id) => Boolean(completedByBlockId[id]));
}

export function isActivityCheckedComplete(
  activity: ActivityDocument | null | undefined,
  checkedByBlockId: Record<string, boolean> | undefined
): boolean {
  return isActivityPracticeComplete(activity, checkedByBlockId);
}

export function completedActivityCountFromState(
  activities: Array<ActivityDocument | null | undefined>,
  completedByBlockId: Record<string, boolean>
): number {
  let completed = 0;
  for (const activity of activities) {
    if (isActivityPracticeComplete(activity, completedByBlockId)) completed += 1;
  }
  return completed;
}

export function completedActivityCountFromCheckedDrafts(
  activities: Array<ActivityDocument | null | undefined>,
  checkedByActivityId: Record<string, Record<string, boolean> | undefined>
): number {
  let completed = 0;
  for (const activity of activities) {
    if (!activity?.id) continue;
    if (isActivityCheckedComplete(activity, checkedByActivityId[activity.id])) completed += 1;
  }
  return completed;
}

export function activityProgressLabel(completed: number, total: number): string {
  const noun = total === 1 ? "activity" : "activities";
  return `${completed} / ${total} ${noun} completed`;
}

export function blockScorableTotal(block: ActivityBlockDocument): number {
  if (!isScorableReactBlock(block)) return 0;
  const type = normaliseActivityType(block.type);
  if (type === "classification") return ((block.content && block.content.items) || []).length;
  if (type === "drag-drop") return ((block.content && block.content.items) || []).length;
  if (type === "fill-gap" || type === "phrase-completion") {
    const gaps = (block.content && block.content.gaps) || [];
    return gaps.length || 1;
  }
  if (type === "ordering" || type === "sequence") return ((block.content && block.content.items) || []).length;
  return 1;
}

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

export function emptyPracticeProgress(): PracticeProgressState {
  return { completed: {}, scores: {} };
}

export function applyPracticeResult(
  state: PracticeProgressState,
  blockId: string,
  result: ActivityResult
): PracticeProgressState {
  const completed = { ...state.completed };
  const scores = { ...state.scores };
  if (!result.completed) {
    // Failed server save must not wipe a prior successful Check.
    if (result.status === "error") return state;
    // Try again / reset: clear this block only; do not touch other blocks.
    delete completed[blockId];
    delete scores[blockId];
    return { completed, scores };
  }
  completed[blockId] = true;
  if (result.score && result.score.total > 0 && !result.requiresReview) {
    scores[blockId] = result.score;
  } else {
    delete scores[blockId];
  }
  return { completed, scores };
}

export function scorableBlocksComplete(
  state: PracticeProgressState,
  scorableBlockIds: string[]
): boolean {
  return scorableBlockIds.length > 0 && scorableBlockIds.every((id) => state.completed[id]);
}

export function isPracticeCompletionCue(
  result: ActivityResult,
  aggregate: PracticeProgressAggregate
): boolean {
  if (!result.completed) return false;
  const scoredItems = result.score?.total || 0;
  return aggregate.complete || aggregate.completedCount >= 2 || scoredItems >= 2;
}

export function aggregatePracticeProgress(
  state: PracticeProgressState,
  totals: { requiredBlocks: number; scorableTotal: number }
): PracticeProgressAggregate {
  const completedCount = Object.values(state.completed).filter(Boolean).length;
  const score = Object.values(state.scores).reduce(
    (total, item) => ({
      correct: total.correct + item.correct,
      total: total.total + item.total
    }),
    { correct: 0, total: 0 }
  );
  const requiredBlocks = Math.max(0, totals.requiredBlocks);
  return {
    completedCount,
    requiredBlocks,
    completion: requiredBlocks > 0 ? Math.min(1, completedCount / requiredBlocks) : 0,
    score: {
      correct: score.correct,
      total: Math.max(totals.scorableTotal, score.total, 0)
    },
    complete: requiredBlocks > 0 && completedCount >= requiredBlocks
  };
}
