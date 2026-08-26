import { useId, useState, type ClipboardEvent, type DragEvent, type ReactNode } from "react";
import { FeedbackPanel, type FeedbackState } from "./FeedbackPanel";
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
  onResult
}: TextResponseProps): ReactNode {
  const fieldId = useId();
  const min = resolveMinChars({ minChars, minimumCharacters }, defaultMinChars);
  const [value, setValue] = useState(String(initialResponse || ""));
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState<FeedbackState>("neutral");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const trimmed = value.trim();
  const length = trimmed.length;
  const met = length >= min;
  const locked = checked;
  const canRetry = checked && retry && (typeof maxAttempts !== "number" || attempts < maxAttempts);

  function emit(result: ActivityResult) {
    onResult?.(result);
  }

  function blockPaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    setNotice("Paste is disabled. Type your answer in your own words.");
  }

  function blockDrop(event: DragEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    setNotice("Dropping text is disabled. Type your answer in your own words.");
  }

  function save() {
    if (!met) {
      setStatus("informative");
      setMessage(underMinMessage(min, length));
      return;
    }
    const nextAttempts = attempts + 1;
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
    setStatus("neutral");
    setMessage("");
    setNotice("");
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
    >
      {title ? <h3>{title}</h3> : null}
      {instructions ? <p className="lp-instructions">{instructions}</p> : null}
      <label className="lp-field" htmlFor={fieldId}>
        <span className="lp-field__label">{prompt}</span>
        <textarea
          id={fieldId}
          className="lp-textarea"
          data-lp-response=""
          data-lp-min-chars={String(min)}
          rows={rows}
          value={value}
          placeholder={placeholder}
          minLength={min}
          autoComplete="off"
          disabled={locked}
          aria-describedby={`${fieldId}-count ${fieldId}-notice`}
          onChange={(event) => setValue(event.target.value)}
          onPaste={blockPaste}
          onDrop={blockDrop}
        />
      </label>
      <p
        id={`${fieldId}-count`}
        className="lp-char-count"
        data-lp-char-count=""
        data-lp-met={met ? "true" : "false"}
        aria-live="polite"
      >
        {`${length} / ${min} characters minimum`}
      </p>
      <p
        id={`${fieldId}-notice`}
        className="lp-paste-notice"
        data-lp-paste-notice=""
        role="status"
      >
        {notice}
      </p>
      <div className="lp-card__actions">
        <button type="button" className="lp-button" onClick={save} disabled={locked}>
          {saveLabel}
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
