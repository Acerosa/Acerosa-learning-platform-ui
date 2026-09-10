import { useMemo, useState, type ReactNode } from "react";
import { FeedbackPanel } from "./FeedbackPanel";
import {
  activityResultFromMark,
  localScoreEnabled,
  resolveCanRetry,
  runMarkedCheck,
  usesServerMark,
  type OnMarkBlockResponse
} from "./server-mark";
import { shuffled } from "./shuffle";
import type { ActivityFeedbackCopy, ActivityItem, ActivityResult } from "./types";
import { usePlacement } from "./usePlacement";
import { useRestoredCheckedFeedback } from "./useRestoredCheckedFeedback";
import { useRestoredChecked } from "./useRestoredState";

export type DragDropProps = {
  id?: string;
  title?: string;
  prompt: string;
  instructions?: string;
  items: ActivityItem[];
  targets: ActivityItem[];
  correct?: Record<string, string>;
  feedback?: ActivityFeedbackCopy;
  formative?: boolean;
  retry?: boolean;
  shuffle?: boolean;
  shuffleSeed?: string;
  maxAttempts?: number;
  initialPlacements?: Record<string, string>;
  initialChecked?: boolean;
  initialCorrect?: boolean | null;
  initialCanRetry?: boolean;
  onMarkResponse?: OnMarkBlockResponse;
  onResult?: (result: ActivityResult) => void;
};

export function DragDrop({
  id = "drag-drop",
  title,
  prompt,
  instructions,
  items,
  targets,
  correct = {},
  feedback,
  formative = true,
  retry = true,
  shuffle = false,
  shuffleSeed,
  maxAttempts,
  initialPlacements = {},
  initialChecked = false,
  initialCorrect,
  initialCanRetry,
  onMarkResponse,
  onResult
}: DragDropProps): ReactNode {
  const orderedItems = useMemo(
    () => shuffled(items, shuffle, shuffleSeed || id),
    [items, shuffle, shuffleSeed, id]
  );
  const { placements, selectedItemId, selectItem, selectTarget, occupantOf, reset: resetPlacement } = usePlacement(initialPlacements);
  const [attempts, setAttempts] = useState(0);
  const restoredComplete = items.length > 0 && items.every((item) => initialPlacements[item.id]);
  const [checked, setChecked] = useRestoredChecked(initialChecked, restoredComplete);
  const [checking, setChecking] = useState(false);
  const hasResponse = items.length > 0 && items.every((item) => placements[item.id]);
  const {
    status,
    message,
    serverCanRetry,
    setStatus,
    setMessage,
    setServerCorrect,
    setServerCanRetry,
    markLive,
    markRetry
  } = useRestoredCheckedFeedback({
    initialChecked,
    hasResponse,
    initialCorrect,
    initialCanRetry,
    feedback
  });
  const serverMode = usesServerMark(onMarkResponse);
  const scored = localScoreEnabled(formative, Object.keys(correct).length > 0, onMarkResponse);
  const locked = checked || checking;
  const canRetry = resolveCanRetry({
    checked,
    localRetry: retry,
    localMaxAttempts: maxAttempts,
    attempts,
    serverCanRetry
  });
  const bank = orderedItems.filter((item) => !placements[item.id]);
  const selectedLabel = orderedItems.find((item) => item.id === selectedItemId)?.label;

  function emit(result: ActivityResult) {
    onResult?.(result);
  }

  async function check() {
    if (checking) return;
    const complete = items.every((item) => placements[item.id]);
    if (!complete) {
      setStatus("informative");
      setMessage("Place every item before checking.");
      return;
    }
    const nextAttempts = attempts + 1;
    const responses = { ...placements };
    if (serverMode && onMarkResponse) {
      setChecking(true);
      setStatus("informative");
      setMessage("Checking your answer…");
      const outcome = await runMarkedCheck(
        onMarkResponse,
        responses,
        feedback,
        "Your placements have been recorded."
      );
      setChecking(false);
      if (!outcome.ok) {
        setChecked(false);
        setServerCorrect(null);
        setServerCanRetry(false);
        setStatus("informative");
        setMessage(outcome.message);
        emit({ completed: false, correct: null, attempts: nextAttempts, responses, status: "error" });
        return;
      }
      markLive();
      setAttempts(nextAttempts);
      setChecked(true);
      setServerCorrect(outcome.marked.correct);
      setServerCanRetry(outcome.marked.canRetry);
      setStatus(outcome.marked.status);
      setMessage(outcome.marked.message);
      emit(activityResultFromMark(outcome.marked, nextAttempts, responses));
      return;
    }
    const correctCount = scored
      ? items.filter((item) => placements[item.id] === correct[item.id]).length
      : 0;
    const isCorrect = scored ? correctCount === items.length : null;
    markLive();
    setAttempts(nextAttempts);
    setChecked(true);
    setServerCorrect(null);
    setStatus(isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "informative");
    setMessage(scored
      ? (isCorrect
        ? feedback?.correct || "Those placements match the expected targets."
        : feedback?.incorrect || "Check the targets and try again.")
      : "Your placements have been recorded.");
    emit({
      completed: true,
      correct: isCorrect,
      score: scored ? { correct: correctCount, total: items.length } : undefined,
      attempts: nextAttempts,
      responses
    });
  }

  function reset() {
    markRetry();
    resetPlacement();
    setChecked(false);
    setChecking(false);
    setServerCorrect(null);
    setServerCanRetry(undefined);
    setStatus("neutral");
    setMessage("");
    emit({ completed: false, correct: null, attempts, responses: {} });
  }

  return (
    <section
      className="lp-block lp-block--interactive"
      data-lp-block="drag-drop"
      data-lp-block-id={id}
      aria-busy={checking || undefined}
    >
      {title ? <h3>{title}</h3> : null}
      {instructions ? <p className="lp-instructions">{instructions}</p> : null}
      <p>{prompt}</p>
      <p role="status" aria-live="polite" className="lp-card__meta">
        {selectedLabel ? `Selected: ${selectedLabel}. Choose a target.` : "Select an item, then select a target to place it."}
      </p>
      <fieldset className="lp-fieldset" disabled={locked}>
        <legend>Items</legend>
        <div className="lp-card__actions">
          {bank.map((item) => (
            <button
              key={item.id}
              type="button"
              className="lp-button lp-button--secondary"
              aria-pressed={selectedItemId === item.id}
              onClick={() => selectItem(item.id)}
            >
              {item.label}
              {selectedItemId === item.id ? " (selected)" : ""}
            </button>
          ))}
          {bank.length === 0 ? <p className="lp-card__meta">All items placed.</p> : null}
        </div>
      </fieldset>
      <fieldset className="lp-fieldset" disabled={locked}>
        <legend>Targets</legend>
        <div className="lp-card-grid">
          {targets.map((target) => {
            const occupantId = occupantOf(target.id);
            const occupant = items.find((item) => item.id === occupantId);
            const mark = checked && scored && occupantId && !serverMode
              ? (correct[occupantId] === target.id ? "Correct" : "Incorrect")
              : occupant ? "Placed" : "Empty";
            return (
              <div key={target.id} className="lp-card">
                <p><strong>{target.label}</strong></p>
                <p className="lp-card__meta">{occupant ? occupant.label : "No item yet"} · {mark}</p>
                <button
                  type="button"
                  className="lp-button"
                  onClick={() => selectTarget(target.id)}
                >
                  {occupant ? `Place on ${target.label} (replace ${occupant.label})` : `Place on ${target.label}`}
                </button>
              </div>
            );
          })}
        </div>
      </fieldset>
      <div className="lp-card__actions">
        <button type="button" className="lp-button" onClick={() => void check()} disabled={locked}>
          {checking ? "Checking…" : "Check placement"}
        </button>
        {canRetry ? (
          <button type="button" className="lp-button lp-button--secondary" onClick={reset}>Try again</button>
        ) : null}
      </div>
      <FeedbackPanel state={status} message={message} />
    </section>
  );
}
