import { useEffect, useRef, useState } from "react";
import type { FeedbackState } from "./FeedbackPanel";
import {
  RESTORED_CHECKED_MESSAGE,
  restoredCheckedDisplay
} from "./server-mark";
import type { ActivityFeedbackCopy } from "./types";

export type RestoredVerdictProps = {
  initialChecked?: boolean;
  hasResponse: boolean;
  initialCorrect?: boolean | null;
  initialCanRetry?: boolean;
  feedback?: ActivityFeedbackCopy;
};

/**
 * Restores Correct / Incorrect / review feedback from learner-safe persisted
 * results (OptionCards baseline). Does not call marking APIs.
 */
export function useRestoredCheckedFeedback(options: RestoredVerdictProps): {
  status: FeedbackState;
  message: string;
  serverCorrect: boolean | null;
  serverCanRetry: boolean | undefined;
  setStatus: (value: FeedbackState) => void;
  setMessage: (value: string) => void;
  setServerCorrect: (value: boolean | null) => void;
  setServerCanRetry: (value: boolean | undefined) => void;
  markLive: () => void;
  markRetry: () => void;
} {
  const checked = Boolean(options.initialChecked && options.hasResponse);
  const opening = restoredCheckedDisplay({
    checked,
    hasResponse: options.hasResponse,
    correct: options.initialCorrect,
    feedback: options.feedback,
    recordedMessage: RESTORED_CHECKED_MESSAGE
  });
  const restoreLockRef = useRef<"idle" | "restored" | "live" | "retry">("idle");
  const [status, setStatus] = useState<FeedbackState>(opening?.status || "neutral");
  const [message, setMessage] = useState(opening?.message || "");
  const [serverCorrect, setServerCorrect] = useState<boolean | null>(opening?.serverCorrect ?? null);
  const [serverCanRetry, setServerCanRetry] = useState<boolean | undefined>(options.initialCanRetry);

  useEffect(() => {
    if (restoreLockRef.current === "live" || restoreLockRef.current === "retry") return;
    if (!options.initialChecked || !options.hasResponse) return;
    const restored = restoredCheckedDisplay({
      checked: true,
      hasResponse: true,
      correct: options.initialCorrect,
      feedback: options.feedback,
      recordedMessage: RESTORED_CHECKED_MESSAGE
    });
    if (!restored) return;
    setStatus(restored.status);
    setMessage(restored.message);
    setServerCorrect(restored.serverCorrect);
    if (typeof options.initialCanRetry === "boolean") setServerCanRetry(options.initialCanRetry);
    if (restored.status === "correct" || restored.status === "incorrect" || restored.status === "informative") {
      restoreLockRef.current = "restored";
    }
  }, [
    options.feedback,
    options.hasResponse,
    options.initialCanRetry,
    options.initialChecked,
    options.initialCorrect
  ]);

  return {
    status,
    message,
    serverCorrect,
    serverCanRetry,
    setStatus,
    setMessage,
    setServerCorrect,
    setServerCanRetry,
    markLive: () => {
      restoreLockRef.current = "live";
    },
    markRetry: () => {
      restoreLockRef.current = "retry";
    }
  };
}
