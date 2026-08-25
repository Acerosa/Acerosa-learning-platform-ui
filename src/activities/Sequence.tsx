import { useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
import { shuffled } from "./shuffle";
import type { ActivityFeedbackCopy, ActivityItem, ActivityResult } from "./types";

export type SequenceProps = {
  id?: string;
  title?: string;
  prompt: string;
  instructions?: string;
  items: ActivityItem[];
  correctOrder?: string[];
  feedback?: ActivityFeedbackCopy;
  formative?: boolean;
  retry?: boolean;
  shuffle?: boolean;
  maxAttempts?: number;
  onResult?: (result: ActivityResult) => void;
};

export function Sequence({
  id = "sequence",
  title,
  prompt,
  instructions,
  items,
  correctOrder = [],
  feedback,
  formative = true,
  retry = true,
  shuffle = false,
  maxAttempts,
  onResult
}: SequenceProps): ReactNode {
  const initial = useMemo(() => shuffled(items, shuffle), [items, shuffle]);
  const [order, setOrder] = useState<ActivityItem[]>(initial);
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const scored = Boolean(formative && correctOrder.length);
  const locked = checked;
  const canRetry = checked && retry && (typeof maxAttempts !== "number" || attempts < maxAttempts);

  function emit(result: ActivityResult) {
    onResult?.(result);
  }

  function move(index: number, offset: number) {
    const nextIndex = index + offset;
    if (nextIndex < 0 || nextIndex >= order.length) return;
    const next = order.slice();
    const [removed] = next.splice(index, 1);
    next.splice(nextIndex, 0, removed as ActivityItem);
    setOrder(next);
  }

  function onItemKeyDown(event: KeyboardEvent<HTMLLIElement>, index: number) {
    if (locked) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      move(index, -1);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(index, 1);
    }
  }

  function check() {
    const nextAttempts = attempts + 1;
    const ids = order.map((item) => item.id);
    const correctCount = scored ? ids.filter((itemId, index) => itemId === correctOrder[index]).length : 0;
    const isCorrect = scored ? correctCount === correctOrder.length && ids.length === correctOrder.length : null;
    setAttempts(nextAttempts);
    setChecked(true);
    setStatus(isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "informative");
    setMessage(scored
      ? (isCorrect
        ? feedback?.correct || "That order matches the expected sequence."
        : feedback?.incorrect || "Check the sequence and try again.")
      : "Your sequence has been recorded.");
    emit({
      completed: true,
      correct: isCorrect,
      score: scored ? { correct: correctCount, total: correctOrder.length } : undefined,
      attempts: nextAttempts,
      responses: { itemIds: ids }
    });
  }

  function reset() {
    setOrder(initial);
    setChecked(false);
    setStatus("neutral");
    setMessage("");
    emit({
      completed: false,
      correct: null,
      attempts,
      responses: { itemIds: initial.map((item) => item.id) }
    });
  }

  return (
    <section className="lp-block lp-block--interactive" data-lp-block="ordering" data-lp-block-id={id}>
      {title ? <h3>{title}</h3> : null}
      {instructions ? <p className="lp-instructions">{instructions}</p> : null}
      <p>{prompt}</p>
      <ol className="lp-activity-list">
        {order.map((item, index) => (
          <li
            key={item.id}
            className="lp-card"
            tabIndex={locked ? -1 : 0}
            aria-label={`${item.label}, position ${index + 1} of ${order.length}`}
            onKeyDown={(event) => onItemKeyDown(event, index)}
          >
            <p><strong>{index + 1}. {item.label}</strong></p>
            <div className="lp-card__actions">
              <button
                type="button"
                className="lp-button lp-button--secondary"
                disabled={locked || index === 0}
                onClick={() => move(index, -1)}
              >
                Move {item.label} up
              </button>
              <button
                type="button"
                className="lp-button lp-button--secondary"
                disabled={locked || index === order.length - 1}
                onClick={() => move(index, 1)}
              >
                Move {item.label} down
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="lp-card__actions">
        <button type="button" className="lp-button" onClick={check} disabled={locked}>Check order</button>
        {canRetry ? (
          <button type="button" className="lp-button lp-button--secondary" onClick={reset}>Try again</button>
        ) : null}
      </div>
      <FeedbackPanel state={status} message={message} />
    </section>
  );
}
