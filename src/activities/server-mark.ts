import type { FeedbackState } from "./FeedbackPanel";
import type {
  ActivityBlockDocument,
  ActivityDocument,
  ActivityFeedbackCopy,
  ActivityItemResult,
  ActivityResult,
  ActivityScore
} from "./types";

export const SERVER_CHECK_FAILED_MESSAGE = "Your answer could not be checked. Please try again.";
export const SERVER_REVIEW_MESSAGE = "Your response has been recorded for review.";

export type MarkResponseRequest = {
  activityId: string;
  activityVersion: string;
  block: ActivityBlockDocument;
  responses: unknown;
};

export type MarkResponseResult = {
  completed: boolean;
  correct: boolean | null;
  requiresReview?: boolean;
  score?: ActivityScore;
  status?: "correct" | "incorrect" | "review" | "recorded" | "error";
  itemResults?: ActivityItemResult[];
  checkNumber?: number;
  canRetry?: boolean;
  remainingAttempts?: number | null;
};

export type OnMarkResponse = (request: MarkResponseRequest) => Promise<MarkResponseResult>;
export type OnMarkBlockResponse = (responses: unknown) => Promise<MarkResponseResult>;

export function usesServerMark(onMarkResponse?: unknown): boolean {
  return typeof onMarkResponse === "function";
}

export function learnerCheckMessage(error: unknown): string {
  if (error && typeof error === "object" && "learnerMessage" in error) {
    const message = String((error as { learnerMessage?: string }).learnerMessage || "").trim();
    if (message) return message;
  }
  return SERVER_CHECK_FAILED_MESSAGE;
}

export function createFailClosedMarkHandler(): OnMarkResponse {
  return async () => {
    throw Object.assign(new Error(SERVER_CHECK_FAILED_MESSAGE), {
      code: "MARKING_UNAVAILABLE",
      learnerMessage: SERVER_CHECK_FAILED_MESSAGE
    });
  };
}

export function resolveCanRetry(options: {
  checked: boolean;
  localRetry: boolean;
  localMaxAttempts?: number;
  attempts: number;
  serverCanRetry?: boolean;
}): boolean {
  if (!options.checked) return false;
  if (options.serverCanRetry === false) return false;
  if (options.serverCanRetry === true) return true;
  return options.localRetry
    && (typeof options.localMaxAttempts !== "number" || options.attempts < options.localMaxAttempts);
}

export function localScoreEnabled(
  formative: boolean,
  hasExpected: boolean,
  onMarkResponse?: unknown
): boolean {
  return Boolean(formative && hasExpected && !usesServerMark(onMarkResponse));
}

export function displayForMark(
  marked: MarkResponseResult,
  feedback?: ActivityFeedbackCopy,
  recordedMessage = "Your response has been recorded."
): {
  status: FeedbackState;
  message: string;
  correct: boolean | null;
  score?: ActivityScore;
  requiresReview: boolean;
  completed: boolean;
  itemResults?: ActivityItemResult[];
  canRetry?: boolean;
  checkNumber?: number;
  remainingAttempts?: number | null;
} {
  if (marked.requiresReview || marked.status === "review") {
    return {
      status: "informative",
      message: SERVER_REVIEW_MESSAGE,
      correct: null,
      score: undefined,
      requiresReview: true,
      completed: true,
      itemResults: marked.itemResults,
      canRetry: marked.canRetry,
      checkNumber: marked.checkNumber,
      remainingAttempts: marked.remainingAttempts
    };
  }
  if (marked.correct === true) {
    return {
      status: "correct",
      message: feedback?.correct || "That matches the expected option.",
      correct: true,
      score: marked.score,
      requiresReview: false,
      completed: true,
      itemResults: marked.itemResults,
      canRetry: marked.canRetry,
      checkNumber: marked.checkNumber,
      remainingAttempts: marked.remainingAttempts
    };
  }
  if (marked.correct === false) {
    return {
      status: "incorrect",
      message: feedback?.incorrect || "Check the options and try again.",
      correct: false,
      score: marked.score,
      requiresReview: false,
      completed: true,
      itemResults: marked.itemResults,
      canRetry: marked.canRetry,
      checkNumber: marked.checkNumber,
      remainingAttempts: marked.remainingAttempts
    };
  }
  return {
    status: "informative",
    message: recordedMessage,
    correct: null,
    score: undefined,
    requiresReview: false,
    completed: Boolean(marked.completed),
    itemResults: marked.itemResults,
    canRetry: marked.canRetry,
    checkNumber: marked.checkNumber,
    remainingAttempts: marked.remainingAttempts
  };
}

export function activityResultFromMark(
  marked: ReturnType<typeof displayForMark>,
  attempts: number,
  responses: unknown
): ActivityResult {
  return {
    completed: marked.completed,
    correct: marked.correct,
    score: marked.score,
    attempts,
    responses,
    requiresReview: marked.requiresReview,
    status: marked.requiresReview
      ? "review"
      : marked.correct === true
        ? "correct"
        : marked.correct === false
          ? "incorrect"
          : "recorded",
    itemResults: marked.itemResults,
    canRetry: marked.canRetry,
    checkNumber: marked.checkNumber,
    remainingAttempts: marked.remainingAttempts
  };
}

export async function runMarkedCheck(
  onMarkResponse: OnMarkBlockResponse,
  responses: unknown,
  feedback?: ActivityFeedbackCopy,
  recordedMessage = "Your response has been recorded."
): Promise<{ ok: true; marked: ReturnType<typeof displayForMark> } | { ok: false; message: string }> {
  try {
    return {
      ok: true,
      marked: displayForMark(await onMarkResponse(responses), feedback, recordedMessage)
    };
  } catch (error) {
    return { ok: false, message: learnerCheckMessage(error) };
  }
}

const MARKING_FIELD = /^(correctOptionId|correctCategoryId|correctValues|answerKey|markScheme|modelAnswer|correctOptions|correctOrder|spec)$/;

function learnerSafeValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(learnerSafeValue);
  if (!value || typeof value !== "object") return value;
  const next: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (MARKING_FIELD.test(key)) continue;
    if (key === "correct" && nested && typeof nested === "object") continue;
    next[key] = learnerSafeValue(nested);
  }
  return next;
}

export function learnerSafeBlock(block: ActivityBlockDocument): ActivityBlockDocument {
  return learnerSafeValue(block) as ActivityBlockDocument;
}

export function createMarkResponseHandler(
  platform: unknown,
  activity: ActivityDocument
): OnMarkResponse | undefined {
  if (!platform || typeof platform !== "object") return undefined;
  const marking = (platform as { marking?: { markBlock?: unknown } }).marking;
  if (!marking || typeof marking.markBlock !== "function") {
    return createFailClosedMarkHandler();
  }
  const markBlock = marking.markBlock as (input: {
    activityKey: string;
    activityVersion: string;
    block: ActivityBlockDocument;
    responses: unknown;
    sourcePage?: string;
  }) => Promise<MarkResponseResult>;
  return (request) => markBlock({
    activityKey: activity.id,
    activityVersion: request.activityVersion,
    block: learnerSafeBlock(request.block),
    responses: request.responses,
    sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined
  });
}
