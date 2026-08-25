import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { StatusBadge } from "../src/index";

const require = createRequire(import.meta.url);
const root = dirname(fileURLToPath(import.meta.url));

describe("theme tokens", () => {
  it("uses Core --lp-* classes rather than a second token system", () => {
    const themePath = require.resolve("@learning-platform/core/theme.css");
    const css = readFileSync(themePath, "utf8");
    expect(css).toMatch(/--lp-primary/);
    expect(css).toMatch(/--lp-text/);
    expect(css).toMatch(/\.lp-status-badge--available/);
    expect(css).toMatch(/prefers-reduced-motion/);
    expect(css).not.toMatch(/--ui-primary/);
    const { container } = render(createElement(StatusBadge, { status: "available" }));
    expect(container.firstChild).toHaveClass("lp-status-badge", "lp-status-badge--available");
    const activitySource = readFileSync(join(root, "../src/activities/OptionCards.tsx"), "utf8")
      + readFileSync(join(root, "../src/activities/FeedbackPanel.tsx"), "utf8")
      + readFileSync(join(root, "../src/activities/CompletionModal.tsx"), "utf8")
      + readFileSync(join(root, "../src/activities/ProgressSummary.tsx"), "utf8")
      + readFileSync(join(root, "../src/activities/PracticeProgressPanel.tsx"), "utf8");
    expect(activitySource).toMatch(/lp-card|lp-dialog|lp-callout|lp-button|lp-progress/);
    expect(activitySource).toMatch(/data-lp-docked/);
    expect(activitySource).not.toMatch(/--ui-primary/);
  });
});
