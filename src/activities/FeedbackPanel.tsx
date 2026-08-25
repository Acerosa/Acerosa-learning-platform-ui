import type { ReactNode } from "react";
import { Callout, type CalloutTone } from "../components/Callout";

export const FEEDBACK_STATES = ["neutral", "correct", "incorrect", "informative", "hint"] as const;
export type FeedbackState = (typeof FEEDBACK_STATES)[number];

export type FeedbackPanelProps = {
  state?: FeedbackState | string;
  title?: string;
  message?: string;
};

const STATE_COPY: Record<FeedbackState, { tone: CalloutTone; label: string }> = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};

export function FeedbackPanel({
  state = "neutral",
  title,
  message
}: FeedbackPanelProps): ReactNode {
  const resolved = FEEDBACK_STATES.includes(state as FeedbackState) ? (state as FeedbackState) : "neutral";
  const copy = STATE_COPY[resolved];
  if (!message && !title) return null;
  return (
    <div className="lp-feedback" data-lp-feedback-state={resolved} data-lp-feedback>
      <Callout tone={copy.tone} title={title || copy.label} message={message} />
    </div>
  );
}
