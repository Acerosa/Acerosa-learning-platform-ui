import { useMemo, useState, type ReactNode } from "react";
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
import type { ActivityFeedbackCopy, ActivityItem, ActivityOption, ActivityResult } from "./types";
import { usePlacement } from "./usePlacement";

export type PhraseGap = ActivityItem & { correctOptionId?: string };

export type PhraseCompletionProps = {
  id?: string;
  title?: string;
  prompt: string;
  instructions?: string;
  gaps?: PhraseGap[];
  options: ActivityOption[];
  correctOptionId?: string | null;
  feedback?: ActivityFeedbackCopy;
  formative?: boolean;
  retry?: boolean;
  shuffle?: boolean;
  maxAttempts?: number;
  onMarkResponse?: OnMarkBlockResponse;
  onResult?: (result: ActivityResult) => void;
};

function parsePrompt(prompt: string, gaps: PhraseGap[]): Array<string | { gapId: string }> {
  const parts: Array<string | { gapId: string }> = [];
  const regex = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let cursor = 0;
  let blankIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(prompt)) !== null) {
    if (match.index > cursor) parts.push(prompt.slice(cursor, match.index));
    const gapId = match[1] || gaps[blankIndex]?.id || `gap-${blankIndex + 1}`;
    blankIndex += 1;
    parts.push({ gapId });
    cursor = match.index + match[0].length;
  }
  if (cursor < prompt.length) parts.push(prompt.slice(cursor));
  if (!parts.some((part) => typeof part !== "string") && gaps[0]) {
    parts.push(" ");
    parts.push({ gapId: gaps[0].id });
  }
  return parts;
}

export function PhraseCompletion({
  id = "phrase-completion",
  title,
  prompt,
  instructions,
  gaps,
  options,
  correctOptionId,
  feedback,
  formative = true,
  retry = true,
  shuffle = false,
  maxAttempts,
  onMarkResponse,
  onResult
}: PhraseCompletionProps): ReactNode {
  const resolvedGaps = useMemo<PhraseGap[]>(() => {
    if (gaps && gaps.length) return gaps;
    return [{ id: "gap", label: "missing term", correctOptionId: correctOptionId || undefined }];
  }, [correctOptionId, gaps]);
  const orderedOptions = useMemo(() => shuffled(options, shuffle), [options, shuffle]);
  const promptParts = useMemo(() => parsePrompt(prompt, resolvedGaps), [prompt, resolvedGaps]);
  const { placements, selectedItemId, selectItem, selectTarget, occupantOf, reset: resetPlacement } = usePlacement();
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const [serverCanRetry, setServerCanRetry] = useState<boolean | undefined>();
  const expected = Object.fromEntries(
    resolvedGaps.map((gap) => [gap.id, gap.correctOptionId]).filter((entry) => entry[1])
  ) as Record<string, string>;
  const scored = localScoreEnabled(formative, Object.keys(expected).length > 0, onMarkResponse);
  const locked = checked || checking;
  const canRetry = resolveCanRetry({
    checked,
    localRetry: retry,
    localMaxAttempts: maxAttempts,
    attempts,
    serverCanRetry
  });
  const bank = orderedOptions.filter((option) => !placements[option.id]);
  const selectedLabel = options.find((option) => option.id === selectedItemId)?.label;

  function emit(result: ActivityResult) {
    onResult?.(result);
  }

  async function check() {
    if (checking) return;
    const complete = resolvedGaps.every((gap) => occupantOf(gap.id));
    if (!complete) {
      setStatus("informative");
      setMessage("Fill every blank before checking.");
      return;
    }
    const nextAttempts = attempts + 1;
    const responses: Record<string, string> = {};
    resolvedGaps.forEach((gap) => {
      const optionId = occupantOf(gap.id);
      if (optionId) responses[gap.id] = optionId;
    });
    if (usesServerMark(onMarkResponse) && onMarkResponse) {
      setChecking(true);
      setStatus("informative");
      setMessage("Checking your answer…");
      const outcome = await runMarkedCheck(
        onMarkResponse,
        responses,
        feedback,
        "Your phrase has been recorded."
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
    const correctCount = scored
      ? resolvedGaps.filter((gap) => responses[gap.id] === expected[gap.id]).length
      : 0;
    const isCorrect = scored ? correctCount === resolvedGaps.length : null;
    setAttempts(nextAttempts);
    setChecked(true);
    setStatus(isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : "informative");
    setMessage(scored
      ? (isCorrect
        ? feedback?.correct || "That completes the phrase."
        : feedback?.incorrect || "Check the missing words and try again.")
      : "Your phrase has been recorded.");
    emit({
      completed: true,
      correct: isCorrect,
      score: scored ? { correct: correctCount, total: resolvedGaps.length } : undefined,
      attempts: nextAttempts,
      responses
    });
  }

  function reset() {
    resetPlacement();
    setChecked(false);
    setChecking(false);
    setServerCanRetry(undefined);
    setStatus("neutral");
    setMessage("");
    emit({ completed: false, correct: null, attempts, responses: {} });
  }

  return (
    <section
      className="lp-block lp-block--interactive"
      data-lp-block="fill-gap"
      data-lp-block-id={id}
      aria-busy={checking || undefined}
    >
      {title ? <h3>{title}</h3> : null}
      {instructions ? <p className="lp-instructions">{instructions}</p> : null}
      <p role="status" aria-live="polite" className="lp-card__meta">
        {selectedLabel ? `Selected: ${selectedLabel}. Choose a blank.` : "Select a phrase, then select the blank."}
      </p>
      <p>
        {promptParts.map((part, index) => {
          if (typeof part === "string") return <span key={`text-${index}`}>{part}</span>;
          const optionId = occupantOf(part.gapId);
          const option = options.find((item) => item.id === optionId);
          const gap = resolvedGaps.find((item) => item.id === part.gapId);
          const mark = checked && scored && optionId
            ? (expected[part.gapId] === optionId ? "Correct" : "Incorrect")
            : option ? "Filled" : "Blank";
          return (
            <button
              key={part.gapId}
              type="button"
              className="lp-button lp-button--secondary"
              disabled={locked}
              aria-label={`${gap?.label || "blank"}: ${option?.label || "empty"}. ${mark}`}
              onClick={() => selectTarget(part.gapId)}
            >
              {option?.label || "______"}
            </button>
          );
        })}
      </p>
      <fieldset className="lp-fieldset" disabled={locked}>
        <legend>Available phrases</legend>
        <div className="lp-card__actions">
          {bank.map((option) => (
            <button
              key={option.id}
              type="button"
              className="lp-button"
              aria-pressed={selectedItemId === option.id}
              onClick={() => selectItem(option.id)}
            >
              {option.label}
              {selectedItemId === option.id ? " (selected)" : ""}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="lp-card__actions">
        <button type="button" className="lp-button" onClick={() => void check()} disabled={locked}>
          {checking ? "Checking…" : "Check phrase"}
        </button>
        {canRetry ? (
          <button type="button" className="lp-button lp-button--secondary" onClick={reset}>Try again</button>
        ) : null}
      </div>
      <FeedbackPanel state={status} message={message} />
    </section>
  );
}
