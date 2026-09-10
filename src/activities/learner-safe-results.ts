/** Learner-safe formative result fields for activity_states persistence. */
export type LearnerSafeCheckedResult = {
  correct: boolean | null;
  canRetry?: boolean;
  status?: "correct" | "incorrect" | "review" | "recorded" | "error";
};

const RESULT_STATUS = new Set(["correct", "incorrect", "review", "recorded", "error"]);

export function learnerSafeCheckedResult(value: unknown): LearnerSafeCheckedResult | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const src = value as Record<string, unknown>;
  const result: LearnerSafeCheckedResult = {
    correct: src.correct === true ? true : src.correct === false ? false : null
  };
  if (typeof src.canRetry === "boolean") result.canRetry = src.canRetry;
  if (typeof src.status === "string" && RESULT_STATUS.has(src.status)) {
    result.status = src.status as LearnerSafeCheckedResult["status"];
  }
  // Deliberately omit score / answer keys — sanitize strips score and keys must not persist.
  return result;
}

export function learnerSafeCheckedResults(value: unknown): Record<string, LearnerSafeCheckedResult> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const next: Record<string, LearnerSafeCheckedResult> = {};
  for (const [questionId, item] of Object.entries(value as Record<string, unknown>)) {
    const safe = learnerSafeCheckedResult(item);
    if (safe) next[questionId] = safe;
  }
  return next;
}

export function learnerSafeResultFromActivityResult(result: {
  correct?: boolean | null;
  canRetry?: boolean;
  status?: string;
  requiresReview?: boolean;
}): LearnerSafeCheckedResult {
  const status = typeof result.status === "string" && RESULT_STATUS.has(result.status)
    ? result.status as LearnerSafeCheckedResult["status"]
    : result.requiresReview
      ? "review"
      : result.correct === true
        ? "correct"
        : result.correct === false
          ? "incorrect"
          : "recorded";
  const out: LearnerSafeCheckedResult = {
    correct: result.correct === true ? true : result.correct === false ? false : null,
    status
  };
  if (typeof result.canRetry === "boolean") out.canRetry = result.canRetry;
  return out;
}
