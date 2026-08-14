import type { ReactNode } from "react";
import { CONTEXT_TYPES, type ContextType, type LinkAction } from "../contracts";

export type ContextItem = {
  label: string;
  value: string;
};

export type ContextPanelProps = {
  contextType?: ContextType | string;
  heading?: string;
  items?: ContextItem[];
  description?: string;
  action?: LinkAction | null;
};

export function ContextPanel({
  contextType = "assignment",
  heading = "Context",
  items = [],
  description = "",
  action
}: ContextPanelProps): ReactNode {
  const type = CONTEXT_TYPES.includes(contextType as ContextType)
    ? (contextType as ContextType)
    : "assignment";
  const headingId = `lp-context-${type}`;
  return (
    <section
      className={`lp-context-panel lp-panel lp-context-panel--${type}`}
      aria-labelledby={headingId}
      data-context-type={type}
    >
      <h2 id={headingId}>{heading}</h2>
      {items.length ? (
        <dl className="lp-meta-list">
          {items.map((item) => (
            <div key={`${item.label}:${item.value}`}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {description ? <p>{description}</p> : null}
      {action?.label && action?.href ? (
        <p><a className="lp-text-link" href={action.href}>{action.label}</a></p>
      ) : null}
    </section>
  );
}
