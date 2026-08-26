import { useId, useState, type ClipboardEvent, type DragEvent, type ReactNode } from "react";
import { resolveMinChars, SHORT_RESPONSE_DEFAULT_MIN_CHARS } from "./types";

export type LearningTextFieldProps = {
  id?: string;
  prompt: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  minChars?: number;
  minimumCharacters?: number;
  defaultMinChars?: number;
  rows?: number;
  disabled?: boolean;
  hidePrompt?: boolean;
  onChange?: (value: string) => void;
};

/**
 * Controlled (or initially uncontrolled) learning textarea with paste/drop
 * blocked, minChars, and a live counter. No Save button — for host worksheets
 * that keep a single activity Submit, and as the field chrome inside TextResponse.
 */
export function LearningTextField({
  id,
  prompt,
  placeholder,
  value,
  defaultValue = "",
  minChars,
  minimumCharacters,
  defaultMinChars = SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  rows = 4,
  disabled = false,
  hidePrompt = false,
  onChange
}: LearningTextFieldProps): ReactNode {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const min = resolveMinChars({ minChars, minimumCharacters }, defaultMinChars);
  const controlled = typeof value === "string";
  const [internal, setInternal] = useState(String(defaultValue || ""));
  const [notice, setNotice] = useState("");
  const current = controlled ? value : internal;
  const length = current.trim().length;
  const met = length >= min;

  function setValue(next: string) {
    if (!controlled) setInternal(next);
    onChange?.(next);
  }

  function blockPaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    setNotice("Paste is disabled. Type your answer in your own words.");
  }

  function blockDrop(event: DragEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    setNotice("Dropping text is disabled. Type your answer in your own words.");
  }

  return (
    <div className="lp-form lp-learning-text-field" data-lp-learning-text-field="">
      <label className="lp-field" htmlFor={fieldId}>
        {hidePrompt ? (
          <span className="lp-visually-hidden">{prompt}</span>
        ) : (
          <span className="lp-field__label">{prompt}</span>
        )}
        <textarea
          id={fieldId}
          className="lp-textarea"
          data-lp-response=""
          data-lp-min-chars={String(min)}
          rows={rows}
          value={current}
          placeholder={placeholder}
          minLength={min}
          autoComplete="off"
          disabled={disabled}
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
    </div>
  );
}
