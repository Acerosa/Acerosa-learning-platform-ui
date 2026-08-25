import { useMemo, useState, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
import { shuffled } from "./shuffle";
import type { ActivityFeedbackCopy, ActivityItem, ActivityResult } from "./types";

export type ClassificationProps = {
  id?: string;
  title?: string;
  prompt: string;
  instructions?: string;
  items: ActivityItem[];
  categories: ActivityItem[];
  feedback?: ActivityFeedbackCopy;
  formative?: boolean;
  retry?: boolean;
  shuffle?: boolean;
  maxAttempts?: number;
  initialAssignments?: Record<string, string>;
  onResult?: (result: ActivityResult) => void;
};

function itemLabel(item: ActivityItem): string {
  return item.label || item.text || item.id;
}

export function Classification({
  id = "classification",
  title,
  prompt,
  instructions,
  items,
  categories,
  feedback,
  formative = true,
  retry = true,
  shuffle = false,
  maxAttempts,
  initialAssignments = {},
  onResult
}: ClassificationProps): ReactNode {
  const orderedItems = useMemo(() => shuffled(items, shuffle), [items, shuffle]);
  const [assignments, setAssignments] = useState<Record<string, string>>({ ...initialAssignments });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const expected = Object.fromEntries(
    items.filter((item) => item.correctCategoryId).map((item) => [item.id, item.correctCategoryId as string])
  );
  const scored = Boolean(formative && Object.keys(expected).length);
  const locked = checked;
  const canRetry = checked && retry && (typeof maxAttempts !== "number" || attempts < maxAttempts);
  const pool = orderedItems.filter((item) => !assignments[item.id]);
  const selectedLabel = orderedItems.find((item) => item.id === selectedItemId);

  function emit(result: ActivityResult) {
    onResult?.(result);
  }

  function place(itemId: string, categoryId: string) {
    setAssignments((current) => ({ ...current, [itemId]: categoryId }));
    setSelectedItemId(null);
  }

  function selectItem(itemId: string) {
    setSelectedItemId((current) => (current === itemId ? null : itemId));
  }

  function selectCategory(categoryId: string) {
    if (!selectedItemId) return;
    place(selectedItemId, categoryId);
  }

  function returnItem(itemId: string) {
    setAssignments((current) => {
      const next = { ...current };
      delete next[itemId];
      return next;
    });
    setSelectedItemId(null);
  }

  function check() {
    const complete = items.every((item) => assignments[item.id]);
    if (!complete) {
      setStatus("informative");
      setMessage("Place every item in a category before checking.");
      return;
    }
    const nextAttempts = attempts + 1;
    const correctCount = scored
      ? items.filter((item) => assignments[item.id] === expected[item.id]).length
      : 0;
    const isCorrect = scored ? correctCount === items.length : null;
    setAttempts(nextAttempts);
    setChecked(true);
    setStatus(isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "informative");
    setMessage(scored
      ? (isCorrect
        ? feedback?.correct || "Those items match the expected categories."
        : feedback?.incorrect || "Check the categories and try again.")
      : "Your categories have been recorded.");
    emit({
      completed: true,
      correct: isCorrect,
      score: scored ? { correct: correctCount, total: items.length } : undefined,
      attempts: nextAttempts,
      responses: { ...assignments }
    });
  }

  function reset() {
    setAssignments({});
    setSelectedItemId(null);
    setChecked(false);
    setStatus("neutral");
    setMessage("");
    emit({ completed: false, correct: null, attempts, responses: {} });
  }

  return (
    <section className="lp-block lp-block--interactive" data-lp-block="classification" data-lp-block-id={id}>
      {title ? <h3>{title}</h3> : null}
      {instructions ? <p className="lp-instructions">{instructions}</p> : null}
      <p role="status" aria-live="polite" className="lp-card__meta">
        {selectedLabel
          ? `Selected: ${itemLabel(selectedLabel)}. Choose a category.`
          : "Select an item, then select a category. More than one item can share a category."}
      </p>
      <fieldset className="lp-fieldset" disabled={locked}>
        <legend>{prompt}</legend>
        <p className="lp-card__meta">Items</p>
        <div className="lp-card__actions">
          {pool.map((item) => (
            <button
              key={item.id}
              type="button"
              className="lp-button lp-button--secondary"
              aria-pressed={selectedItemId === item.id}
              onClick={() => selectItem(item.id)}
            >
              {itemLabel(item)}
              {selectedItemId === item.id ? " (selected)" : ""}
            </button>
          ))}
          {pool.length === 0 ? <p className="lp-card__meta">All items placed.</p> : null}
        </div>
        <div className="lp-card-grid">
          {categories.map((category) => {
            const placed = orderedItems.filter((item) => assignments[item.id] === category.id);
            return (
              <div key={category.id} className="lp-card">
                <p><strong>{category.label}</strong></p>
                <ul className="lp-activity-list">
                  {placed.map((item) => {
                    const mark = checked && scored
                      ? (expected[item.id] === category.id ? "Correct" : "Incorrect")
                      : "Placed";
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="lp-button lp-button--secondary"
                          onClick={() => returnItem(item.id)}
                        >
                          {itemLabel(item)}
                          {" · "}
                          {mark}
                          {locked ? "" : " · Return"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {placed.length === 0 ? <p className="lp-card__meta">No items yet</p> : null}
                <button
                  type="button"
                  className="lp-button"
                  disabled={!selectedItemId}
                  onClick={() => selectCategory(category.id)}
                >
                  Place in {itemLabel(category)}
                </button>
              </div>
            );
          })}
        </div>
        <details>
          <summary>Use dropdown lists instead</summary>
          {orderedItems.map((item) => (
            <p key={`list-${item.id}`} className="lp-form__field">
              <label htmlFor={`${id}-${item.id}`}>{itemLabel(item)}</label>
              <select
                id={`${id}-${item.id}`}
                data-lp-item={item.id}
                value={assignments[item.id] || ""}
                disabled={locked}
                onChange={(event) => {
                  const value = event.target.value;
                  setAssignments((current) => {
                    const next = { ...current };
                    if (value) next[item.id] = value;
                    else delete next[item.id];
                    return next;
                  });
                  setSelectedItemId(null);
                }}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </p>
          ))}
        </details>
      </fieldset>
      <div className="lp-card__actions">
        <button type="button" className="lp-button" onClick={check} disabled={locked}>Check types</button>
        {canRetry ? (
          <button type="button" className="lp-button lp-button--secondary" onClick={reset}>Try again</button>
        ) : null}
      </div>
      <FeedbackPanel state={status} message={message} />
    </section>
  );
}
