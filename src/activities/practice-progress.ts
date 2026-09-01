import { isCatalogueReactType, normaliseActivityType, type ActivityBlockDocument, type ActivityResult, type ActivityScore } from "./types";

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
    return state;
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
