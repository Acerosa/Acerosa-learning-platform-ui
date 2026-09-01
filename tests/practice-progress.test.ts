import { describe, expect, it } from "vitest";
import {
  aggregatePracticeProgress,
  applyPracticeResult,
  emptyPracticeProgress,
  isPracticeCompletionCue
} from "../src/activities/practice-progress";

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
});
