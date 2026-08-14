import type { ReactNode } from "react";

const TONES = ["info", "success", "warning", "error"] as const;
export type CalloutTone = (typeof TONES)[number];

export type CalloutProps = {
  tone?: CalloutTone | string;
  title?: string;
  message?: string;
};

export function Callout({ tone = "info", title, message }: CalloutProps): ReactNode {
  const resolved = TONES.includes(tone as CalloutTone) ? (tone as CalloutTone) : "info";
  return (
    <aside
      className={`lp-callout lp-callout--${resolved}`}
      role={resolved === "error" ? "alert" : undefined}
    >
      {title ? <strong>{title}</strong> : null}
      {message ? <p>{message}</p> : null}
    </aside>
  );
}
