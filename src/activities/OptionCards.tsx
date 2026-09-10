import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
import {
  activityResultFromMark,
  displayForMark,
  learnerCheckMessage,
  localScoreEnabled,
  resolveCanRetry,
  RESTORED_CHECKED_MESSAGE,
  restoredCheckedDisplay,
  usesServerMark,
  type OnMarkBlockResponse
} from "./server-mark";
import { shuffled } from "./shuffle";
import type { ActivityFeedbackCopy, ActivityOption, ActivityResult } from "./types";
import { useRestoredChecked, useRestoredState } from "./useRestoredState";

export type OptionCardsProps = {
  id?: string;
  title?: string;
  prompt: string;
  instructions?: string;
  options: ActivityOption[];
  correctOptionId?: string | null;
  feedback?: ActivityFeedbackCopy;
  formative?: boolean;
  retry?: boolean;
  shuffle?: boolean;
  shuffleSeed?: string;
  maxAttempts?: number;
  initialSelectedId?: string;
  initialChecked?: boolean;
  initialCorrect?: boolean | null;
  initialCanRetry?: boolean;
  onMarkResponse?: OnMarkBlockResponse;
  onResult?: (result: ActivityResult) => void;
};

export function OptionCards({
  id = "option-cards",
  title,
  prompt,
  instructions,
  options,
  correctOptionId,
  feedback,
  formative = true,
  retry = true,
  shuffle = false,
  shuffleSeed,
  maxAttempts,
  initialSelectedId,
  initialChecked = false,
  initialCorrect,
  initialCanRetry,
  onMarkResponse,
  onResult
}: OptionCardsProps): ReactNode {
  const ordered = useMemo(
    () => shuffled(options, shuffle, shuffleSeed || id),
    [options, shuffle, shuffleSeed, id]
  );
  const [selectedId, setSelectedId] = useRestoredState<string | null>(initialSelectedId || null, null);
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useRestoredChecked(initialChecked, Boolean(initialSelectedId));
  const [checking, setChecking] = useState(false);
  const opening = restoredCheckedDisplay({
    checked: Boolean(initialChecked && initialSelectedId),
    hasResponse: Boolean(initialSelectedId),
    correct: initialCorrect,
    feedback,
    recordedMessage: RESTORED_CHECKED_MESSAGE
  });
  const restoreLockRef = useRef<"idle" | "restored" | "live" | "retry">("idle");
  const [status, setStatus] = useState<FeedbackState>(opening?.status || "neutral");
  const [message, setMessage] = useState(opening?.message || "");
  const [serverCorrect, setServerCorrect] = useState<boolean | null>(opening?.serverCorrect ?? null);
  const [serverCanRetry, setServerCanRetry] = useState<boolean | undefined>(initialCanRetry);

  useEffect(() => {
    if (restoreLockRef.current === "live" || restoreLockRef.current === "retry") return;
    if (!initialChecked || !selectedId) return;
    const restored = restoredCheckedDisplay({
      checked: true,
      hasResponse: true,
      correct: initialCorrect,
      feedback,
      recordedMessage: RESTORED_CHECKED_MESSAGE
    });
    if (!restored) return;
    setStatus(restored.status);
    setMessage(restored.message);
    setServerCorrect(restored.serverCorrect);
    if (typeof initialCanRetry === "boolean") setServerCanRetry(initialCanRetry);
    if (restored.status === "correct" || restored.status === "incorrect") {
      restoreLockRef.current = "restored";
    }
  }, [feedback, initialCanRetry, initialChecked, initialCorrect, selectedId]);
  const serverMode = usesServerMark(onMarkResponse);
  const scored = localScoreEnabled(formative, Boolean(correctOptionId), onMarkResponse);
  const name = `lp-option-cards-${id}`;
  const locked = checked || checking;
  const canRetry = resolveCanRetry({
    checked,
    localRetry: retry,
    localMaxAttempts: maxAttempts,
    attempts,
    serverCanRetry
  });

  function emit(result: ActivityResult) {
    onResult?.(result);
  }

  async function check() {
    if (checking) return;
    if (!selectedId) {
      setStatus("informative");
      setMessage("Choose an option before checking.");
      return;
    }
    const nextAttempts = attempts + 1;
    const responses = { optionId: selectedId };

    if (serverMode && onMarkResponse) {
      setChecking(true);
      setStatus("informative");
      setMessage("Checking your answer…");
      try {
        const marked = displayForMark(await onMarkResponse(responses), feedback, "Your choice has been recorded.");
        restoreLockRef.current = "live";
        setAttempts(nextAttempts);
        setChecked(true);
        setServerCorrect(marked.correct);
        setServerCanRetry(marked.canRetry);
        setStatus(marked.status);
        setMessage(marked.message);
        emit(activityResultFromMark(marked, nextAttempts, responses));
      } catch (error) {
        setChecked(false);
        setServerCorrect(null);
        setServerCanRetry(false);
        setStatus("informative");
        setMessage(learnerCheckMessage(error));
        emit({
          completed: false,
          correct: null,
          attempts: nextAttempts,
          responses,
          status: "error"
        });
      } finally {
        setChecking(false);
      }
      return;
    }

    const isCorrect = scored ? selectedId === correctOptionId : null;
    const nextMessage = scored
      ? (isCorrect
        ? feedback?.correct || "That matches the expected option."
        : feedback?.incorrect || "Check the options and try again.")
      : "Your choice has been recorded.";
    setAttempts(nextAttempts);
    setChecked(true);
    restoreLockRef.current = "live";
    setServerCorrect(null);
    setStatus(isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "informative");
    setMessage(nextMessage);
    emit({
      completed: true,
      correct: isCorrect,
      score: scored ? { correct: isCorrect ? 1 : 0, total: 1 } : undefined,
      attempts: nextAttempts,
      responses
    });
  }

  function reset() {
    restoreLockRef.current = "retry";
    setSelectedId(null);
    setChecked(false);
    setChecking(false);
    setServerCorrect(null);
    setServerCanRetry(undefined);
    setStatus("neutral");
    setMessage("");
    emit({
      completed: false,
      correct: null,
      attempts,
      responses: { optionId: null }
    });
  }

  return (
    <section
      className="lp-block lp-block--interactive"
      data-lp-block="option-cards"
      data-lp-block-id={id}
      aria-busy={checking || undefined}
    >
      {title ? <h3>{title}</h3> : null}
      {instructions ? <p className="lp-instructions">{instructions}</p> : null}
      <fieldset className="lp-fieldset" disabled={locked}>
        <legend>{prompt}</legend>
        <div className="lp-card-grid">
          {ordered.map((option) => {
            const checkedCard = selectedId === option.id;
            const localMark = checked && scored && checkedCard;
            const serverMark = checked && serverMode && checkedCard && serverCorrect !== null;
            const showMark = localMark || serverMark;
            const markLabel = showMark
              ? ((serverMode ? serverCorrect === true : option.id === correctOptionId) ? "Correct" : "Incorrect")
              : checkedCard ? "Selected" : "";
            return (
              <label key={option.id} className="lp-card lp-activity-card">
                <input
                  type="radio"
                  name={name}
                  value={option.id}
                  checked={checkedCard}
                  data-lp-response=""
                  onChange={() => setSelectedId(option.id)}
                />
                <span>
                  <strong>{option.label}</strong>
                  {option.description ? <span className="lp-card__meta"> — {option.description}</span> : null}
                </span>
                {option.imageSrc ? (
                  <img src={option.imageSrc} alt={option.imageAlt || option.label} />
                ) : null}
                {markLabel ? <p className="lp-card__meta">{markLabel}</p> : null}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="lp-card__actions">
        <button type="button" className="lp-button" onClick={() => void check()} disabled={locked}>
          {checking ? "Checking…" : "Check answer"}
        </button>
        {canRetry ? (
          <button type="button" className="lp-button lp-button--secondary" onClick={reset}>
            Try again
          </button>
        ) : null}
      </div>
      <FeedbackPanel state={status} message={message} />
    </section>
  );
}
