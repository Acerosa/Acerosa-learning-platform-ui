import { useMemo, useState, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
import {
  activityResultFromMark,
  displayForMark,
  learnerCheckMessage,
  localScoreEnabled,
  resolveCanRetry,
  usesServerMark,
  type OnMarkBlockResponse
} from "./server-mark";
import { shuffled } from "./shuffle";
import type { ActivityFeedbackCopy, ActivityItem, ActivityItemResult, ActivityResult } from "./types";

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
  onMarkResponse?: OnMarkBlockResponse;
  onResult?: (result: ActivityResult) => void;
};

function itemLabel(item: ActivityItem): string {
  return item.label || item.text || item.id;
}

function itemMarkLabel(
  itemId: string,
  categoryId: string,
  checked: boolean,
  scored: boolean,
  expected: Record<string, string>,
  serverMode: boolean,
  itemResults?: ActivityItemResult[],
  requiresReview?: boolean
): string {
  if (!checked) return "Placed";
  if (serverMode) {
    const row = itemResults?.find((item) => item.itemId === itemId);
    if (row?.correct === true) return "Correct";
    if (row?.correct === false) return "Incorrect";
    if (requiresReview || row?.requiresReview) return "Recorded";
    return "Placed";
  }
  if (scored) return expected[itemId] === categoryId ? "Correct" : "Incorrect";
  return "Placed";
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
  onMarkResponse,
  onResult
}: ClassificationProps): ReactNode {
  const orderedItems = useMemo(() => shuffled(items, shuffle), [items, shuffle]);
  const [assignments, setAssignments] = useState<Record<string, string>>({ ...initialAssignments });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const [itemResults, setItemResults] = useState<ActivityItemResult[] | undefined>();
  const [requiresReview, setRequiresReview] = useState(false);
  const [serverCanRetry, setServerCanRetry] = useState<boolean | undefined>();
  const expected = Object.fromEntries(
    items.filter((item) => item.correctCategoryId).map((item) => [item.id, item.correctCategoryId as string])
  );
  const serverMode = usesServerMark(onMarkResponse);
  const scored = localScoreEnabled(formative, Object.keys(expected).length > 0, onMarkResponse);
  const locked = checked || checking;
  const canRetry = resolveCanRetry({
    checked,
    localRetry: retry,
    localMaxAttempts: maxAttempts,
    attempts,
    serverCanRetry
  });
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

  async function check() {
    if (checking) return;
    const complete = items.every((item) => assignments[item.id]);
    if (!complete) {
      setStatus("informative");
      setMessage("Place every item in a category before checking.");
      return;
    }
    const nextAttempts = attempts + 1;
    const responses = { ...assignments };

    if (serverMode && onMarkResponse) {
      setChecking(true);
      setStatus("informative");
      setMessage("Checking your answer…");
      try {
        const marked = displayForMark(
          await onMarkResponse(responses),
          feedback,
          "Your categories have been recorded."
        );
        setAttempts(nextAttempts);
        setChecked(true);
        setItemResults(marked.itemResults);
        setRequiresReview(marked.requiresReview);
        setServerCanRetry(marked.canRetry);
        setStatus(marked.status);
        setMessage(marked.message);
        emit(activityResultFromMark(marked, nextAttempts, responses));
      } catch (error) {
        setChecked(false);
        setItemResults(undefined);
        setRequiresReview(false);
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

    const correctCount = scored
      ? items.filter((item) => assignments[item.id] === expected[item.id]).length
      : 0;
    const isCorrect = scored ? correctCount === items.length : null;
    setAttempts(nextAttempts);
    setChecked(true);
    setItemResults(undefined);
    setRequiresReview(false);
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
      responses
    });
  }

  function reset() {
    setAssignments({});
    setSelectedItemId(null);
    setChecked(false);
    setChecking(false);
    setItemResults(undefined);
    setRequiresReview(false);
    setServerCanRetry(undefined);
    setStatus("neutral");
    setMessage("");
    emit({ completed: false, correct: null, attempts, responses: {} });
  }

  return (
    <section
      className="lp-block lp-block--interactive"
      data-lp-block="classification"
      data-lp-block-id={id}
      aria-busy={checking || undefined}
    >
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
                    const mark = itemMarkLabel(
                      item.id,
                      category.id,
                      checked,
                      scored,
                      expected,
                      serverMode,
                      itemResults,
                      requiresReview
                    );
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
        <button type="button" className="lp-button" onClick={() => void check()} disabled={locked}>
          {checking ? "Checking…" : "Check types"}
        </button>
        {canRetry ? (
          <button type="button" className="lp-button lp-button--secondary" onClick={reset}>Try again</button>
        ) : null}
      </div>
      <FeedbackPanel state={status} message={message} />
    </section>
  );
}
