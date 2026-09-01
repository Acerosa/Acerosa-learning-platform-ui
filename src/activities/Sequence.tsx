import { useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
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
  onMarkResponse?: OnMarkBlockResponse;
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
  onMarkResponse,
  onResult
}: SequenceProps): ReactNode {
  const initial = useMemo(() => shuffled(items, shuffle), [items, shuffle]);
  const [order, setOrder] = useState<ActivityItem[]>(initial);
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const [serverCanRetry, setServerCanRetry] = useState<boolean | undefined>();
  const serverMode = usesServerMark(onMarkResponse);
  const scored = localScoreEnabled(formative, correctOrder.length > 0, onMarkResponse);
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

  async function check() {
    if (checking) return;
    const nextAttempts = attempts + 1;
    const ids = order.map((item) => item.id);
    const responses = { itemIds: ids };
    if (serverMode && onMarkResponse) {
      setChecking(true);
      setStatus("informative");
      setMessage("Checking your answer…");
      const outcome = await runMarkedCheck(
        onMarkResponse,
        responses,
        feedback,
        "Your sequence has been recorded."
      );
      setChecking(false);
      if (!outcome.ok) {
        setChecked(false);
        setServerCanRetry(false);
        setStatus("informative");
        setMessage(outcome.message);
        emit({ completed: false, correct: null, attempts: nextAttempts, responses, status: "error" });
        return;
      }
      setAttempts(nextAttempts);
      setChecked(true);
      setServerCanRetry(outcome.marked.canRetry);
      setStatus(outcome.marked.status);
      setMessage(outcome.marked.message);
      emit(activityResultFromMark(outcome.marked, nextAttempts, responses));
      return;
    }
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
      responses
    });
  }

  function reset() {
    setOrder(initial);
    setChecked(false);
    setChecking(false);
    setServerCanRetry(undefined);
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
    <section
      className="lp-block lp-block--interactive"
      data-lp-block="ordering"
      data-lp-block-id={id}
      aria-busy={checking || undefined}
    >
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
        <button type="button" className="lp-button" onClick={() => void check()} disabled={locked}>
          {checking ? "Checking…" : "Check order"}
        </button>
        {canRetry ? (
          <button type="button" className="lp-button lp-button--secondary" onClick={reset}>Try again</button>
        ) : null}
      </div>
      <FeedbackPanel state={status} message={message} />
    </section>
  );
}
