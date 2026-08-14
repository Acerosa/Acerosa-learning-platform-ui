export declare const CONTEXT_TYPES: readonly ["exam", "assignment", "project"];
export type ContextType = (typeof CONTEXT_TYPES)[number];
export declare const SESSION_KINDS: readonly ["session", "independent-study", "homework", "revision", "retrieval"];
export type SessionKind = (typeof SESSION_KINDS)[number];
export declare const SESSION_KIND_LABELS: Record<SessionKind, string>;
export declare const LEARNER_ACTIVITY_STATES: readonly ["not-started", "in-progress", "completed"];
export type LearnerActivityState = (typeof LEARNER_ACTIVITY_STATES)[number];
export declare const STATUS_TONES: readonly ["available", "planned", "progress", "completed"];
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
export declare const WEEK_UI_FEATURES: WeekUiFeatures;
export declare function mergeWeekUiFeatures(features?: Partial<WeekUiFeatures>): WeekUiFeatures;
export declare function shouldShowContext(features: WeekUiFeatures, contextType?: string | null): boolean;
export declare function isIndependentKind(kind?: string | null): boolean;
export declare function isSessionKind(value: string): value is SessionKind;
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
