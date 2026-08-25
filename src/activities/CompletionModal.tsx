import { useEffect, useId, useRef, type ReactNode } from "react";
import { StatusBadge } from "../components/StatusBadge";
import type { ActivityScore } from "./types";

export type CompletionModalProps = {
  open?: boolean;
  title?: string;
  completed?: boolean;
  score?: ActivityScore;
  attempts?: number;
  message?: string;
  onClose?: () => void;
  onReview?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  reviewLabel?: string;
};

function syncDialog(dialog: HTMLDialogElement | null, open: boolean) {
  if (!dialog) return;
  try {
    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
    if (!open && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  } catch {
    if (open) dialog.setAttribute("open", "");
    else dialog.removeAttribute("open");
  }
}

export function CompletionModal({
  open = false,
  title = "Activity complete",
  completed = true,
  score,
  attempts,
  message,
  onClose,
  onReview,
  onNext,
  nextLabel = "Continue",
  reviewLabel = "Review"
}: CompletionModalProps): ReactNode {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    syncDialog(dialogRef.current, open);
  }, [open]);

  if (!open) return null;

  const statusLabel = completed ? "Completed" : "In progress";
  const scoreText = score ? `${score.correct} of ${score.total} correct` : null;
  const attemptText = typeof attempts === "number" ? `${attempts} ${attempts === 1 ? "attempt" : "attempts"}` : null;

  return (
    <dialog
      ref={dialogRef}
      className="lp-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose?.();
      }}
    >
      <header className="lp-dialog__header">
        <h2 id={titleId}>{title}</h2>
        <button
          type="button"
          className="lp-dialog__close"
          aria-label={`Close ${title}`}
          onClick={onClose}
        >
          Close
        </button>
      </header>
      <div className="lp-dialog__body">
        <StatusBadge status={completed ? "completed" : "progress"} label={statusLabel} />
        {scoreText ? <p>{scoreText}</p> : null}
        {attemptText ? <p>{attemptText}</p> : null}
        {message ? <p>{message}</p> : null}
        <p className="lp-card__meta">This summary is practice feedback, not an official mark.</p>
        <div className="lp-form__actions">
          {onReview ? (
            <button type="button" className="lp-button lp-button--secondary" onClick={onReview}>
              {reviewLabel}
            </button>
          ) : null}
          {onNext ? (
            <button type="button" className="lp-button" onClick={onNext}>
              {nextLabel}
            </button>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
