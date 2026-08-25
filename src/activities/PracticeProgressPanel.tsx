import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { ProgressSummary, type ProgressSummaryProps } from "./ProgressSummary";

export type PracticeProgressPanelProps = ProgressSummaryProps & {
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Uncontrolled initial collapsed state. Defaults to true for docked panels. */
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  expandLabel?: string;
  collapseLabel?: string;
};

const dockStyle = (collapsed: boolean): CSSProperties => ({
  position: "fixed",
  zIndex: 40,
  left: "max(0.75rem, env(safe-area-inset-left, 0px))",
  bottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
  width: collapsed ? "min(13.5rem, calc(100vw - 1.5rem))" : "min(18rem, calc(100vw - 1.5rem))",
  maxHeight: "min(70vh, 28rem)",
  overflow: "auto",
  margin: 0,
  padding: "0.75rem 1rem",
  boxSizing: "border-box",
  boxShadow: "var(--lp-shadow)",
  border: "0.0625rem solid var(--lp-border)",
  borderRadius: "var(--lp-radius)",
  background: "var(--lp-surface)",
  color: "var(--lp-text)"
});

export function PracticeProgressPanel({
  collapsed: collapsedProp,
  defaultCollapsed = true,
  onCollapsedChange,
  expandLabel = "Show progress details",
  collapseLabel = "Hide progress details",
  ...summaryProps
}: PracticeProgressPanelProps): ReactNode {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
  const collapsed = typeof collapsedProp === "boolean" ? collapsedProp : uncontrolledCollapsed;
  const panelId = useId();
  const title = summaryProps.title || "Practice progress";

  function setCollapsed(next: boolean) {
    if (typeof collapsedProp !== "boolean") setUncontrolledCollapsed(next);
    onCollapsedChange?.(next);
  }

  return (
    <aside
      className="lp-card lp-practice-progress-panel"
      style={dockStyle(collapsed)}
      aria-label={title}
      data-lp-practice-progress-panel=""
      data-lp-docked="left"
      data-lp-collapsed={collapsed ? "true" : "false"}
    >
      <div id={panelId}>
        <ProgressSummary {...summaryProps} title={title} collapsed={collapsed} />
      </div>
      <div className="lp-card__actions" style={{ marginTop: "0.5rem" }}>
        <button
          type="button"
          className="lp-button lp-button--secondary"
          aria-expanded={!collapsed}
          aria-controls={panelId}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? expandLabel : collapseLabel}
        </button>
      </div>
    </aside>
  );
}
