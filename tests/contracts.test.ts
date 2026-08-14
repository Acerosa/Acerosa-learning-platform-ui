import { describe, expect, it } from "vitest";
import {
  CONTEXT_TYPES,
  LEARNER_ACTIVITY_STATES,
  SESSION_KINDS,
  WEEK_UI_FEATURES,
  mergeWeekUiFeatures,
  shouldShowContext
} from "../src/index";

describe("TypeScript contracts", () => {
  it("mirrors Core 0.2.0 presentation enumerations", () => {
    expect(CONTEXT_TYPES).toEqual(["exam", "assignment", "project"]);
    expect(SESSION_KINDS).toEqual([
      "session",
      "independent-study",
      "homework",
      "revision",
      "retrieval"
    ]);
    expect(LEARNER_ACTIVITY_STATES).toEqual(["not-started", "in-progress", "completed"]);
    expect(WEEK_UI_FEATURES.showIndependentStudy).toBe(true);
  });

  it("applies week feature flags without hub-identity branches", () => {
    const features = mergeWeekUiFeatures({
      showTitle: false,
      showExamContext: false,
      showProjectContext: false,
      showProgress: false
    });
    expect(shouldShowContext(features, "assignment")).toBe(true);
    expect(shouldShowContext(features, "exam")).toBe(false);
    expect(shouldShowContext(features, "project")).toBe(false);
    expect(JSON.stringify(features)).not.toMatch(/unit-14|unit-3|tlevel/i);
  });
});
