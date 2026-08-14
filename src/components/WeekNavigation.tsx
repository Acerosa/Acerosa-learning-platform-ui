import type { ReactNode } from "react";

export type WeekNavLink = {
  label?: string;
  href: string;
};

export type WeekNavigationProps = {
  previousWeek?: WeekNavLink | null;
  nextWeek?: WeekNavLink | null;
};

export function WeekNavigation({ previousWeek, nextWeek }: WeekNavigationProps): ReactNode {
  if (!previousWeek?.href && !nextWeek?.href) return null;
  return (
    <nav className="lp-week-nav" aria-label="Week">
      <ul className="lp-week-nav__list">
        {previousWeek?.href ? (
          <li>
            <a className="lp-text-link" href={previousWeek.href} rel="prev">
              {previousWeek.label || "Previous week"}
            </a>
          </li>
        ) : null}
        {nextWeek?.href ? (
          <li>
            <a className="lp-text-link" href={nextWeek.href} rel="next">
              {nextWeek.label || "Next week"}
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
