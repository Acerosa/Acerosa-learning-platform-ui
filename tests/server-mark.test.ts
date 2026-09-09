import { describe, expect, it } from "vitest";
import { resolveCanRetry, restoredCheckedDisplay } from "../src/activities/server-mark";

describe("resolveCanRetry", () => {
  it("uses local authored retry when the server does not send canRetry", () => {
    expect(resolveCanRetry({
      checked: true,
      localRetry: true,
      localMaxAttempts: 3,
      attempts: 1
    })).toBe(true);
    expect(resolveCanRetry({
      checked: true,
      localRetry: true,
      localMaxAttempts: 1,
      attempts: 1
    })).toBe(false);
    expect(resolveCanRetry({
      checked: true,
      localRetry: false,
      attempts: 1
    })).toBe(false);
  });

  it("follows the server canRetry flag when present", () => {
    expect(resolveCanRetry({
      checked: true,
      localRetry: true,
      localMaxAttempts: 5,
      attempts: 1,
      serverCanRetry: false
    })).toBe(false);
    expect(resolveCanRetry({
      checked: true,
      localRetry: false,
      attempts: 1,
      serverCanRetry: true
    })).toBe(true);
  });
});

describe("restoredCheckedDisplay", () => {
  const feedback = {
    correct: "A sensor collects the measurement.",
    incorrect: "Not that device."
  };

  it("maps a restored incorrect verdict to authored incorrect feedback", () => {
    expect(restoredCheckedDisplay({
      checked: true,
      hasResponse: true,
      correct: false,
      feedback
    })).toEqual({
      status: "incorrect",
      message: "Not that device.",
      serverCorrect: false
    });
  });

  it("maps a restored correct verdict to authored correct feedback", () => {
    expect(restoredCheckedDisplay({
      checked: true,
      hasResponse: true,
      correct: true,
      feedback
    })).toEqual({
      status: "correct",
      message: "A sensor collects the measurement.",
      serverCorrect: true
    });
  });

  it("keeps the generic recorded copy when checked without a verdict", () => {
    expect(restoredCheckedDisplay({
      checked: true,
      hasResponse: true,
      feedback
    })).toEqual({
      status: "informative",
      message: "Your answer was recorded.",
      serverCorrect: null
    });
  });

  it("does not invent a mark for an unchecked draft", () => {
    expect(restoredCheckedDisplay({
      checked: false,
      hasResponse: true,
      correct: false,
      feedback
    })).toBeNull();
  });
});
