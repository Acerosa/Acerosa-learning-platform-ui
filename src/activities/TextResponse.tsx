import { useState, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
import { LearningTextField } from "./LearningTextField";
import {
  activityResultFromMark,
  displayForMark,
  learnerCheckMessage,
  resolveCanRetry,
  usesServerMark,
  type OnMarkBlockResponse
} from "./server-mark";
import {
  REFLECTION_DEFAULT_MIN_CHARS,
  SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  resolveMinChars,
  type ActivityFeedbackCopy,
  type ActivityResult
} from "./types";

export type TextResponseProps = {
  id?: string;
  blockType?: "short-response" | "reflection";
  title?: string;
  prompt: string;
  instructions?: string;
  guidance?: string;
  placeholder?: string;
  minChars?: number;
  minimumCharacters?: number;
  defaultMinChars?: number;
  rows?: number;
  feedback?: ActivityFeedbackCopy;
  retry?: boolean;
  maxAttempts?: number;
  initialResponse?: string;
  saveLabel?: string;
  onMarkResponse?: OnMarkBlockResponse;
  onResult?: (result: ActivityResult) => void;
};

function underMinMessage(min: number, length: number): string {
  if (length > 0) {
    return `Write at least ${min} characters. You currently have ${length}.`;
  }
  return `Write at least ${min} characters before saving.`;
}

export function TextResponse({
  id = "text-response",
  blockType = "short-response",
  title,
  prompt,
  instructions,
  guidance,
  placeholder,
  minChars,
  minimumCharacters,
  defaultMinChars = SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  rows = 4,
  feedback,
  retry = true,
  maxAttempts,
  initialResponse = "",
  saveLabel = "Save response",
  onMarkResponse,
  onResult
}: TextResponseProps): ReactNode {
  const min = resolveMinChars({ minChars, minimumCharacters }, defaultMinChars);
  const [value, setValue] = useState(String(initialResponse || ""));
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const [serverCanRetry, setServerCanRetry] = useState<boolean | undefined>();
  const trimmed = value.trim();
  const length = trimmed.length;
  const met = length >= min;
  const serverMode = usesServerMark(onMarkResponse);
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

  async function save() {
    if (checking) return;
    if (!met) {
      setStatus("informative");
      setMessage(underMinMessage(min, length));
      return;
    }
    const nextAttempts = attempts + 1;
    if (serverMode && onMarkResponse) {
      setChecking(true);
      setStatus("informative");
      setMessage("Saving your response…");
      try {
        const marked = displayForMark(
          await onMarkResponse(trimmed),
          feedback,
          guidance || "Your response has been recorded."
        );
        setAttempts(nextAttempts);
        setChecked(true);
        setServerCanRetry(marked.canRetry);
        setStatus(marked.status);
        setMessage(marked.requiresReview || marked.correct !== null ? marked.message : (guidance || marked.message));
        emit(activityResultFromMark(marked, nextAttempts, trimmed));
      } catch (error) {
        setChecked(false);
        setServerCanRetry(false);
        setStatus("informative");
        setMessage(learnerCheckMessage(error));
        emit({
          completed: false,
          correct: null,
          attempts: nextAttempts,
          responses: trimmed,
          status: "error"
        });
      } finally {
        setChecking(false);
      }
      return;
    }
    const nextMessage = guidance || feedback?.correct || "Saved.";
    setAttempts(nextAttempts);
    setChecked(true);
    setStatus("informative");
    setMessage(nextMessage);
    emit({
      completed: true,
      correct: null,
      attempts: nextAttempts,
      responses: trimmed
    });
  }

  function reset() {
    setValue("");
    setChecked(false);
    setChecking(false);
    setServerCanRetry(undefined);
    setStatus("neutral");
    setMessage("");
    emit({
      completed: false,
      correct: null,
      attempts,
      responses: ""
    });
  }

  return (
    <section
      className="lp-block lp-block--interactive lp-form"
      data-lp-block={blockType}
      data-lp-block-id={id}
      aria-busy={checking || undefined}
    >
      {title ? <h3>{title}</h3> : null}
      {instructions ? <p className="lp-instructions">{instructions}</p> : null}
      <LearningTextField
        id={`${id}-field`}
        prompt={prompt}
        placeholder={placeholder}
        value={value}
        minChars={minChars}
        minimumCharacters={minimumCharacters}
        defaultMinChars={defaultMinChars}
        rows={rows}
        disabled={locked}
        onChange={setValue}
      />
      <div className="lp-card__actions">
        <button type="button" className="lp-button" onClick={() => void save()} disabled={locked}>
          {checking ? "Saving…" : saveLabel}
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

export type ShortResponseProps = Omit<TextResponseProps, "blockType" | "defaultMinChars" | "rows"> & {
  rows?: number;
};

export function ShortResponse({
  rows = 4,
  ...props
}: ShortResponseProps): ReactNode {
  return (
    <TextResponse
      {...props}
      blockType="short-response"
      defaultMinChars={SHORT_RESPONSE_DEFAULT_MIN_CHARS}
      rows={rows}
    />
  );
}

export type ReflectionProps = Omit<TextResponseProps, "blockType" | "defaultMinChars" | "rows"> & {
  rows?: number;
};

export function Reflection({
  rows = 6,
  ...props
}: ReflectionProps): ReactNode {
  return (
    <TextResponse
      {...props}
      blockType="reflection"
      defaultMinChars={REFLECTION_DEFAULT_MIN_CHARS}
      rows={rows}
    />
  );
}

export { LearningTextField } from "./LearningTextField";
export type { LearningTextFieldProps } from "./LearningTextField";
