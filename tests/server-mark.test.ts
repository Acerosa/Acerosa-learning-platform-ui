import { describe, expect, it } from "vitest";
import { resolveCanRetry } from "../src/activities/server-mark";

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
