import type { ReactNode } from "react";
import {
  isIndependentKind,
  mergeWeekUiFeatures,
  SESSION_KIND_LABELS,
  shouldShowContext,
  type SessionKind,
  type WeekUiFeatures
} from "../contracts";
import { ActivityCard, type ActivityCardProps } from "./ActivityCard";
import { ContextPanel, type ContextPanelProps } from "./ContextPanel";
import { EmptyState } from "./EmptyState";
import { ProgressCard, type ProgressCardProps } from "./ProgressCard";
import { SessionSection } from "./SessionSection";
import { WeekHeader } from "./WeekHeader";
import { WeekNavigation, type WeekNavLink } from "./WeekNavigation";

export type WeekActivity =
  | ({ html: string } & { title?: never })
  | (ActivityCardProps & { html?: never })
  | { element?: never; html?: never; children: ReactNode };

export type WeekSession = {
  id?: string;
  title?: string;
  kind?: SessionKind | string;
  summary?: string;
  defaultOpen?: boolean;
  meta?: string;
  activities?: WeekActivity[];
};

export type WeekViewProps = {
  week?: {
    id?: string;
    teachingWeek?: number;
    title?: string;
    subtitle?: string;
    status?: string;
    emptyMessage?: string;
    emptyAction?: { label: string; href: string };
    headingLevel?: 1 | 2;
  };
  learningOutcomes?: Array<{ id?: string; title?: string }>;
  context?: (ContextPanelProps & { type?: string }) | null;
  sessions?: WeekSession[];
  progress?: ProgressCardProps | null;
  previousWeek?: WeekNavLink | null;
  nextWeek?: WeekNavLink | null;
  features?: Partial<WeekUiFeatures>;
  renderActivity?: (activity: WeekActivity, index: number) => ReactNode;
};

function sessionMeta(session: WeekSession): string {
  if (session.meta) return session.meta;
  const count = (session.activities || []).length;
  const countLabel = `${count} ${count === 1 ? "activity" : "activities"}`;
  const kindLabel = SESSION_KIND_LABELS[(session.kind as SessionKind) || "session"] || SESSION_KIND_LABELS.session;
  return session.kind && session.kind !== "session" ? `${kindLabel} · ${countLabel}` : countLabel;
}

function isUnsafeActivityHtml(html: string): boolean {
  return (
    /<\s*script\b/i.test(html) ||
    /<\s*iframe\b/i.test(html) ||
    /<\s*object\b/i.test(html) ||
    /<\s*embed\b/i.test(html) ||
    /\bsrcdoc\s*=/i.test(html) ||
    /javascript\s*:/i.test(html) ||
    /data\s*:\s*text\s*\/\s*html/i.test(html) ||
    /\son[a-z]+\s*=/i.test(html)
  );
}

function defaultActivity(activity: WeekActivity, index: number): ReactNode {
  if ("html" in activity && activity.html) {
    if (isUnsafeActivityHtml(activity.html)) {
      return (
        <div
          key={index}
          className="lp-activity-html"
          data-lp-html-rejected="true"
        />
      );
    }
    return (
      <div
        key={index}
        className="lp-activity-html"
        dangerouslySetInnerHTML={{ __html: activity.html }}
      />
    );
  }
  if ("children" in activity && activity.children) {
    return <div key={index}>{activity.children}</div>;
  }
  return <ActivityCard key={index} {...(activity as ActivityCardProps)} />;
}

export function WeekView({
  week = {},
  learningOutcomes = [],
  context = null,
  sessions = [],
  progress = null,
  previousWeek,
  nextWeek,
  features = {},
  renderActivity
}: WeekViewProps): ReactNode {
  const ui = mergeWeekUiFeatures(features);
  const contextType = context?.type || context?.contextType;
  const visibleSessions = sessions.filter((session) => {
    if (ui.showIndependentStudy === false && isIndependentKind(session.kind)) return false;
    return true;
  });
  const render = renderActivity || defaultActivity;

  return (
    <div className="lp-week" data-week={week.id || undefined}>
      <WeekHeader
        teachingWeek={week.teachingWeek}
        title={week.title}
        subtitle={week.subtitle}
        status={week.status}
        learningOutcomes={ui.showLearningOutcomes ? learningOutcomes : []}
        headingLevel={week.headingLevel || 1}
        showTitle={ui.showTitle !== false}
      />
      {context && shouldShowContext(ui, contextType) ? (
        <ContextPanel
          contextType={contextType}
          heading={context.heading}
          items={context.items}
          description={context.description}
          action={context.action}
        />
      ) : null}
      {!visibleSessions.length ? (
        <EmptyState
          heading="Planned teaching week"
          message={week.emptyMessage || "Detailed session activities for this week have not been added yet."}
          action={week.emptyAction}
        />
      ) : (
        visibleSessions.map((session) => (
          <SessionSection
            key={session.id || session.title}
            id={session.id}
            title={session.title}
            kind={session.kind}
            summary={session.summary}
            defaultOpen={session.defaultOpen}
            meta={sessionMeta(session)}
          >
            {(session.activities || []).map((activity, index) => render(activity, index))}
          </SessionSection>
        ))
      )}
      {ui.showProgress && progress ? <ProgressCard {...progress} /> : null}
      <WeekNavigation previousWeek={previousWeek} nextWeek={nextWeek} />
    </div>
  );
}
