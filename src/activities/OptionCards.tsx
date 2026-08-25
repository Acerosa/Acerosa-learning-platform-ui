import { useMemo, useState, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
import { shuffled } from "./shuffle";
import type { ActivityFeedbackCopy, ActivityOption, ActivityResult } from "./types";

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
  maxAttempts?: number;
  initialSelectedId?: string;
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
  maxAttempts,
  initialSelectedId,
  onResult
}: OptionCardsProps): ReactNode {
  const ordered = useMemo(() => shuffled(options, shuffle), [options, shuffle]);
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId || null);
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const scored = Boolean(formative && correctOptionId);
  const name = `lp-option-cards-${id}`;
  const locked = checked;
  const canRetry = checked && retry && (typeof maxAttempts !== "number" || attempts < maxAttempts);

  function emit(result: ActivityResult) {
    onResult?.(result);
  }

  function check() {
    if (!selectedId) {
      setStatus("informative");
      setMessage("Choose an option before checking.");
      return;
    }
    const nextAttempts = attempts + 1;
    const isCorrect = scored ? selectedId === correctOptionId : null;
    const nextMessage = scored
      ? (isCorrect
        ? feedback?.correct || "That matches the expected option."
        : feedback?.incorrect || "Check the options and try again.")
      : "Your choice has been recorded.";
    setAttempts(nextAttempts);
    setChecked(true);
    setStatus(isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "informative");
    setMessage(nextMessage);
    emit({
      completed: true,
      correct: isCorrect,
      score: scored ? { correct: isCorrect ? 1 : 0, total: 1 } : undefined,
      attempts: nextAttempts,
      responses: { optionId: selectedId }
    });
  }

  function reset() {
    setSelectedId(null);
    setChecked(false);
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
    <section className="lp-block lp-block--interactive" data-lp-block="option-cards" data-lp-block-id={id}>
      {title ? <h3>{title}</h3> : null}
      {instructions ? <p className="lp-instructions">{instructions}</p> : null}
      <fieldset className="lp-fieldset" disabled={locked}>
        <legend>{prompt}</legend>
        <div className="lp-card-grid">
          {ordered.map((option) => {
            const checkedCard = selectedId === option.id;
            const showMark = checked && scored && checkedCard;
            const markLabel = showMark ? (option.id === correctOptionId ? "Correct" : "Incorrect") : checkedCard ? "Selected" : "";
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
        <button type="button" className="lp-button" onClick={check} disabled={locked}>
          Check answer
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
