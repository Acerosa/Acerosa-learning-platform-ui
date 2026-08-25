export {
  CONTEXT_TYPES,
  LEARNER_ACTIVITY_STATES,
  SESSION_KIND_LABELS,
  SESSION_KINDS,
  STATUS_TONES,
  WEEK_UI_FEATURES,
  isIndependentKind,
  isSessionKind,
  mergeWeekUiFeatures,
  shouldShowContext
} from "./contracts";
export type {
  BreadcrumbItem,
  ContextType,
  LearnerActivityState,
  LinkAction,
  NavigationItem,
  SessionKind,
  StatusTone,
  ThemeControl,
  ThemePreference,
  WeekUiFeatures
} from "./contracts";

export { activityActionLabel, statusLabel, statusTone } from "./status";

export { ActivityCard } from "./components/ActivityCard";
export type { ActivityCardProps } from "./components/ActivityCard";
export { Breadcrumbs } from "./components/Breadcrumbs";
export type { BreadcrumbsProps } from "./components/Breadcrumbs";
export { Callout } from "./components/Callout";
export type { CalloutProps, CalloutTone } from "./components/Callout";
export { ContextPanel } from "./components/ContextPanel";
export type { ContextItem, ContextPanelProps } from "./components/ContextPanel";
export { EmptyState } from "./components/EmptyState";
export type { EmptyStateProps } from "./components/EmptyState";
export { ErrorState } from "./components/ErrorState";
export type { ErrorStateProps } from "./components/ErrorState";
export { HubShell } from "./components/HubShell";
export type { HubShellProps } from "./components/HubShell";
export { LearnerHeader } from "./components/LearnerHeader";
export type { LearnerHeaderProps, LearnerSummary } from "./components/LearnerHeader";
export { LearningOutcomeBadge } from "./components/LearningOutcomeBadge";
export type { LearningOutcomeBadgeProps } from "./components/LearningOutcomeBadge";
export { LoadingState } from "./components/LoadingState";
export type { LoadingStateProps } from "./components/LoadingState";
export { Navigation } from "./components/Navigation";
export type { NavigationProps } from "./components/Navigation";
export { ProgressCard } from "./components/ProgressCard";
export type { ProgressCardProps } from "./components/ProgressCard";
export { SessionSection } from "./components/SessionSection";
export type { SessionSectionProps } from "./components/SessionSection";
export { StatusBadge } from "./components/StatusBadge";
export type { StatusBadgeProps } from "./components/StatusBadge";
export { WeekHeader } from "./components/WeekHeader";
export type { WeekHeaderProps } from "./components/WeekHeader";
export { WeekNavigation } from "./components/WeekNavigation";
export type { WeekNavigationProps, WeekNavLink } from "./components/WeekNavigation";
export { WeekView } from "./components/WeekView";
export type { WeekActivity, WeekSession, WeekViewProps } from "./components/WeekView";

export { ActivityBlock, InteractiveActivity } from "./activities/ActivityBlock";
export type { ActivityBlockProps, InteractiveActivityProps } from "./activities/ActivityBlock";
export { CompletionModal } from "./activities/CompletionModal";
export type { CompletionModalProps } from "./activities/CompletionModal";
export { ProgressSummary, resolveProgressFraction } from "./activities/ProgressSummary";
export type { ProgressSummaryProps } from "./activities/ProgressSummary";
export { PracticeProgressPanel } from "./activities/PracticeProgressPanel";
export type { PracticeProgressPanelProps } from "./activities/PracticeProgressPanel";
export {
  demoCatalogueActivities,
  demoClassification,
  demoDragDrop,
  demoOptionCards,
  demoPhraseCompletion,
  demoSequence,
  demoTrueFalse
} from "./activities/demo-content";
export { Classification } from "./activities/Classification";
export type { ClassificationProps } from "./activities/Classification";
export { DragDrop } from "./activities/DragDrop";
export type { DragDropProps } from "./activities/DragDrop";
export { FEEDBACK_STATES, FeedbackPanel } from "./activities/FeedbackPanel";
export type { FeedbackPanelProps, FeedbackState } from "./activities/FeedbackPanel";
export { OptionCards } from "./activities/OptionCards";
export type { OptionCardsProps } from "./activities/OptionCards";
export { PhraseCompletion } from "./activities/PhraseCompletion";
export type { PhraseCompletionProps, PhraseGap } from "./activities/PhraseCompletion";
export { Sequence } from "./activities/Sequence";
export type { SequenceProps } from "./activities/Sequence";
export type {
  ActivityBlockContent,
  ActivityBlockDocument,
  ActivityDocument,
  ActivityFeedbackCopy,
  ActivityItem,
  ActivityOption,
  ActivityResult,
  ActivityScore
} from "./activities/types";
export { isCatalogueReactType, normaliseActivityType, questionIdFor } from "./activities/types";
