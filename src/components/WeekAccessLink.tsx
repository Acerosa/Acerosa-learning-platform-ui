import type { ReactNode } from "react";
import { resolveWeekStatus, weekIsAccessible, type WeekAccessRecord } from "../week-access";
import { StatusBadge } from "./StatusBadge";

export type WeekAccessLinkRenderProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export type WeekAccessLinkProps = {
  week: WeekAccessRecord;
  href: string;
  children: ReactNode;
  className?: string;
  lockedClassName?: string;
  renderLink?: (props: WeekAccessLinkRenderProps) => ReactNode;
};

function defaultRenderLink({ href, children, className }: WeekAccessLinkRenderProps): ReactNode {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

export function WeekAccessLink({
  week,
  href,
  children,
  className = "lp-text-link",
  lockedClassName = "lp-week-access-link lp-week-access-link--locked",
  renderLink = defaultRenderLink
}: WeekAccessLinkProps): ReactNode {
  if (weekIsAccessible(week)) {
    return renderLink({ href, children, className });
  }

  const status = resolveWeekStatus(week);
  return (
    <span className={lockedClassName} aria-disabled="true">
      <span className="lp-week-access-link__label">{children}</span>{" "}
      <StatusBadge status={status || "planned"} />
    </span>
  );
}
