import { describe, expect, it } from "vitest";
import {
  learnerSafeCheckedResult,
  learnerSafeCheckedResults,
  learnerSafeResultFromActivityResult
} from "../src/activities/learner-safe-results";

describe("learnerSafeCheckedResults", () => {
  it("keeps only learner-safe verdict fields", () => {
    expect(learnerSafeCheckedResults({
      q1: {
        correct: true,
        canRetry: false,
        status: "correct",
        score: { correct: 1, total: 1 },
        correctOptionId: "a",
        correctOrder: ["a", "b"]
      },
      q2: { correct: false, status: "incorrect" },
      bad: "nope"
    })).toEqual({
      q1: { correct: true, canRetry: false, status: "correct" },
      q2: { correct: false, status: "incorrect" }
    });
  });

  it("maps activity results including review without inventing correctness", () => {
    expect(learnerSafeResultFromActivityResult({
      correct: null,
      requiresReview: true,
      canRetry: true
    })).toEqual({
      correct: null,
      status: "review",
      canRetry: true
    });
  });

  it("returns null for non-objects", () => {
    expect(learnerSafeCheckedResult(null)).toBeNull();
    expect(learnerSafeCheckedResult([])).toBeNull();
  });
});
