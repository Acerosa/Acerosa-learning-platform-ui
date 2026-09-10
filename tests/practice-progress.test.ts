import { describe, expect, it } from "vitest";
import {
  activityProgressLabel,
  aggregatePracticeProgress,
  applyPracticeResult,
  completedActivityCountFromCheckedDrafts,
  completedActivityCountFromState,
  emptyPracticeProgress,
  isActivityCheckedComplete,
  isPracticeCompletionCue
} from "../src/activities/practice-progress";
import type { ActivityDocument } from "../src/activities/types";

function activity(id: string, blockIds: string[]): ActivityDocument {
  return {
    id,
    blocks: blockIds.map((blockId) => ({ id: blockId, type: "single-choice" }))
  };
}

describe("practice progress", () => {
  it("advances completion for a completed scored block and keeps score from the server result", () => {
    const next = applyPracticeResult(emptyPracticeProgress(), "q1", {
      completed: true,
      correct: true,
      score: { correct: 1, total: 1 },
      attempts: 1,
      responses: { optionId: "a" }
    });
    const aggregate = aggregatePracticeProgress(next, { requiredBlocks: 2, scorableTotal: 2 });
    expect(aggregate.completedCount).toBe(1);
    expect(aggregate.completion).toBe(0.5);
    expect(aggregate.score).toEqual({ correct: 1, total: 2 });
    expect(aggregate.complete).toBe(false);
  });

  it("advances completion for a requires-review block without increasing score", () => {
    const next = applyPracticeResult(emptyPracticeProgress(), "reflect", {
      completed: true,
      correct: null,
      requiresReview: true,
      attempts: 1,
      responses: "A valid reflection."
    });
    const aggregate = aggregatePracticeProgress(next, { requiredBlocks: 1, scorableTotal: 2 });
    expect(aggregate.completedCount).toBe(1);
    expect(aggregate.complete).toBe(true);
    expect(aggregate.score).toEqual({ correct: 0, total: 2 });
  });

  it("opens a practice completion cue after a multi-item classification without waiting for the whole week", () => {
    const next = applyPracticeResult(emptyPracticeProgress(), "classify", {
      completed: true,
      correct: true,
      score: { correct: 8, total: 8 },
      attempts: 1,
      responses: { t1: "Threat" }
    });
    const aggregate = aggregatePracticeProgress(next, { requiredBlocks: 20, scorableTotal: 57 });
    expect(isPracticeCompletionCue({
      completed: true,
      correct: true,
      score: { correct: 8, total: 8 },
      attempts: 1,
      responses: { t1: "Threat" }
    }, aggregate)).toBe(true);
  });

  it("does not treat a failed server save as a completion cue", () => {
    const aggregate = aggregatePracticeProgress(emptyPracticeProgress(), { requiredBlocks: 1, scorableTotal: 1 });
    expect(isPracticeCompletionCue({
      completed: false,
      correct: null,
      attempts: 1,
      responses: { optionId: "a" },
      status: "error"
    }, aggregate)).toBe(false);
  });

  it("does not advance an incomplete or failed server save", () => {
    const incomplete = applyPracticeResult(emptyPracticeProgress(), "q1", {
      completed: false,
      correct: null,
      attempts: 1,
      responses: { optionId: "a" },
      status: "error"
    });
    const aggregate = aggregatePracticeProgress(incomplete, { requiredBlocks: 1, scorableTotal: 1 });
    expect(aggregate.completedCount).toBe(0);
    expect(aggregate.complete).toBe(false);
    expect(aggregate.score).toEqual({ correct: 0, total: 1 });
  });

  it("keeps completion after a failed check and does not double-count a retry", () => {
    const first = applyPracticeResult(emptyPracticeProgress(), "q1", {
      completed: true,
      correct: false,
      score: { correct: 0, total: 1 },
      attempts: 1,
      responses: { optionId: "a" }
    });
    const afterFailure = applyPracticeResult(first, "q1", {
      completed: false,
      correct: null,
      attempts: 2,
      responses: { optionId: "b" },
      status: "error"
    });
    expect(afterFailure.completed.q1).toBe(true);
    const afterRetry = applyPracticeResult(afterFailure, "q1", {
      completed: true,
      correct: true,
      score: { correct: 1, total: 1 },
      attempts: 2,
      responses: { optionId: "b" }
    });
    const aggregate = aggregatePracticeProgress(afterRetry, { requiredBlocks: 1, scorableTotal: 1 });
    expect(aggregate.completedCount).toBe(1);
    expect(aggregate.score).toEqual({ correct: 1, total: 1 });
  });

  it("clears block completion on Try again without removing other completed blocks", () => {
    const first = applyPracticeResult(emptyPracticeProgress(), "q1", {
      completed: true,
      correct: false,
      score: { correct: 0, total: 1 },
      attempts: 1,
      responses: { optionId: "a" }
    });
    const second = applyPracticeResult(first, "q2", {
      completed: true,
      correct: true,
      score: { correct: 1, total: 1 },
      attempts: 1,
      responses: { optionId: "b" }
    });
    const afterRetry = applyPracticeResult(second, "q1", {
      completed: false,
      correct: null,
      attempts: 2,
      responses: {}
    });
    expect(afterRetry.completed.q1).toBeUndefined();
    expect(afterRetry.completed.q2).toBe(true);
    expect(afterRetry.scores.q1).toBeUndefined();
    expect(aggregatePracticeProgress(afterRetry, { requiredBlocks: 2, scorableTotal: 2 }).completedCount).toBe(1);
  });

  it("counts activities from 0 and only once when all required blocks are checked", () => {
    const one = activity("a1", ["a1:q1"]);
    const multi = activity("a2", ["a2:q1", "a2:q2"]);
    const activities = [one, multi];
    expect(completedActivityCountFromState(activities, {})).toBe(0);
    expect(activityProgressLabel(0, 2)).toBe("0 / 2 activities completed");
    expect(completedActivityCountFromState(activities, { "a1:q1": true })).toBe(1);
    expect(isActivityCheckedComplete(multi, { "a2:q1": true })).toBe(false);
    expect(completedActivityCountFromCheckedDrafts(activities, {
      a1: { "a1:q1": true },
      a2: { "a2:q1": true }
    })).toBe(1);
    expect(completedActivityCountFromCheckedDrafts(activities, {
      a1: { "a1:q1": true },
      a2: { "a2:q1": true, "a2:q2": true }
    })).toBe(2);
    expect(activityProgressLabel(2, 2)).toBe("2 / 2 activities completed");
  });

  it("counts incorrect checked answers as practice-complete", () => {
    const one = activity("choice", ["choice:q1"]);
    expect(isActivityCheckedComplete(one, { "choice:q1": true })).toBe(true);
  });
});
