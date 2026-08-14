import type { ReactNode } from "react";
import { LearningOutcomeBadge } from "./LearningOutcomeBadge";
import { StatusBadge } from "./StatusBadge";

export type WeekHeaderProps = {
  teachingWeek?: number;
  title?: string;
  subtitle?: string;
  status?: string;
  learningOutcomes?: Array<{ id?: string; title?: string }>;
  headingLevel?: 1 | 2;
  showTitle?: boolean;
};

export function WeekHeader({
  teachingWeek,
  title = "",
  subtitle = "",
  status,
  learningOutcomes = [],
  headingLevel = 1,
  showTitle = true
}: WeekHeaderProps): ReactNode {
  const headingText = teachingWeek
    ? `Week ${teachingWeek}${title ? `: ${title}` : ""}`
    : (title || "Week");
  const Heading = headingLevel === 2 ? "h2" : "h1";
  return (
    <header className="lp-week-header">
      {status ? <StatusBadge status={status} /> : null}
      {showTitle ? (
        <Heading>{headingText}</Heading>
      ) : teachingWeek ? (
        <p className="lp-week-header__kicker">{`Teaching week ${teachingWeek}`}</p>
      ) : null}
      {subtitle ? <p className="lp-week-header__subtitle">{subtitle}</p> : null}
      {learningOutcomes.length ? (
        <ul className="lp-week-header__outcomes">
          {learningOutcomes.map((outcome) => (
            <li key={outcome.id || outcome.title}>
              <LearningOutcomeBadge id={outcome.id} title={outcome.title} />
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
