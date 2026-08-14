import type { ReactNode } from "react";
import {
  isSessionKind,
  SESSION_KIND_LABELS,
  type SessionKind
} from "../contracts";

export type SessionSectionProps = {
  id?: string;
  title?: string;
  kind?: SessionKind | string;
  summary?: string;
  defaultOpen?: boolean;
  meta?: string;
  children?: ReactNode;
};

export function SessionSection({
  id,
  title,
  kind = "session",
  summary = "",
  defaultOpen = false,
  meta,
  children
}: SessionSectionProps): ReactNode {
  const resolvedKind: SessionKind = isSessionKind(kind) ? kind : "session";
  const kindLabel = SESSION_KIND_LABELS[resolvedKind];
  return (
    <details className="lp-session lp-panel" id={id} data-kind={resolvedKind} open={defaultOpen}>
      <summary className="lp-session__summary">
        <span className="lp-session__text">
          <h2 className="lp-session__heading">{title || kindLabel}</h2>
          <span className="lp-session__meta">{meta || kindLabel}</span>
        </span>
      </summary>
      <div className="lp-session__content">
        {summary ? <p className="lp-panel-note">{summary}</p> : null}
        <div className="lp-activity-list">{children}</div>
      </div>
    </details>
  );
}
