export const CONTEXT_TYPES = ["exam", "assignment", "project"] as const;
export type ContextType = (typeof CONTEXT_TYPES)[number];

export const SESSION_KINDS = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
] as const;
export type SessionKind = (typeof SESSION_KINDS)[number];

export const SESSION_KIND_LABELS: Record<SessionKind, string> = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
};

export const LEARNER_ACTIVITY_STATES = ["not-started", "in-progress", "completed"] as const;
export type LearnerActivityState = (typeof LEARNER_ACTIVITY_STATES)[number];

export const STATUS_TONES = ["available", "planned", "progress", "completed"] as const;
export type StatusTone = (typeof STATUS_TONES)[number];

export type WeekUiFeatures = {
  showTitle: boolean;
  showLearningOutcomes: boolean;
  showAssignmentContext: boolean;
  showExamContext: boolean;
  showProjectContext: boolean;
  showIndependentStudy: boolean;
  showProgress: boolean;
};

export const WEEK_UI_FEATURES: WeekUiFeatures = {
  showTitle: true,
  showLearningOutcomes: true,
  showAssignmentContext: true,
  showExamContext: true,
  showProjectContext: true,
  showIndependentStudy: true,
  showProgress: true
};

export function mergeWeekUiFeatures(features: Partial<WeekUiFeatures> = {}): WeekUiFeatures {
  return { ...WEEK_UI_FEATURES, ...features };
}

export function shouldShowContext(features: WeekUiFeatures, contextType?: string | null): boolean {
  if (!contextType) return false;
  if (contextType === "assignment") return features.showAssignmentContext !== false;
  if (contextType === "exam") return features.showExamContext !== false;
  if (contextType === "project") return features.showProjectContext !== false;
  return true;
}

export function isIndependentKind(kind?: string | null): boolean {
  return kind === "independent-study" || kind === "homework";
}

export function isSessionKind(value: string): value is SessionKind {
  return (SESSION_KINDS as readonly string[]).includes(value);
}

export type NavigationItem = {
  id: string;
  label: string;
  path: string;
  enabled?: boolean;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
  path?: string;
};

export type ThemePreference = "light" | "dark" | "system";

export type ThemeControl = {
  modes: readonly ThemePreference[];
  preference: ThemePreference;
  onChange: (mode: ThemePreference) => void;
};

export type LinkAction = {
  label: string;
  href: string;
};
