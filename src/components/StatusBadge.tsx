import type { ReactNode } from "react";
import { statusLabel, statusTone } from "../status";

export type StatusBadgeProps = {
  status?: string;
  label?: string;
  marker?: boolean;
};

export function StatusBadge({
  status = "planned",
  label,
  marker = true
}: StatusBadgeProps): ReactNode {
  const tone = statusTone(status);
  return (
    <span className={`lp-status-badge lp-status-badge--${tone}`} role="status">
      {marker ? <span aria-hidden="true">● </span> : null}
      {label || statusLabel(status)}
    </span>
  );
}
