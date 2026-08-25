import { useMemo, useState, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
import { shuffled } from "./shuffle";
import type { ActivityFeedbackCopy, ActivityItem, ActivityResult } from "./types";
import { usePlacement } from "./usePlacement";

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
  maxAttempts?: number;
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
  maxAttempts,
  onResult
}: DragDropProps): ReactNode {
  const orderedItems = useMemo(() => shuffled(items, shuffle), [items, shuffle]);
  const { placements, selectedItemId, selectItem, selectTarget, occupantOf, reset: resetPlacement } = usePlacement();
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const scored = Boolean(formative && Object.keys(correct).length);
  const locked = checked;
  const canRetry = checked && retry && (typeof maxAttempts !== "number" || attempts < maxAttempts);
  const bank = orderedItems.filter((item) => !placements[item.id]);
  const selectedLabel = orderedItems.find((item) => item.id === selectedItemId)?.label;

  function emit(result: ActivityResult) {
    onResult?.(result);
  }

  function check() {
    const complete = items.every((item) => placements[item.id]);
    if (!complete) {
      setStatus("informative");
      setMessage("Place every item before checking.");
      return;
    }
    const nextAttempts = attempts + 1;
    const correctCount = scored
      ? items.filter((item) => placements[item.id] === correct[item.id]).length
      : 0;
    const isCorrect = scored ? correctCount === items.length : null;
    setAttempts(nextAttempts);
    setChecked(true);
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
      responses: { ...placements }
    });
  }

  function reset() {
    resetPlacement();
    setChecked(false);
    setStatus("neutral");
    setMessage("");
    emit({ completed: false, correct: null, attempts, responses: {} });
  }

  return (
    <section className="lp-block lp-block--interactive" data-lp-block="drag-drop" data-lp-block-id={id}>
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
            const mark = checked && scored && occupantId
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
        <button type="button" className="lp-button" onClick={check} disabled={locked}>Check placement</button>
        {canRetry ? (
          <button type="button" className="lp-button lp-button--secondary" onClick={reset}>Try again</button>
        ) : null}
      </div>
      <FeedbackPanel state={status} message={message} />
    </section>
  );
}
