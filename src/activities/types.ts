export type ActivityScore = {
  correct: number;
  total: number;
};

export type ActivityResult = {
  completed: boolean;
  correct: boolean | null;
  score?: ActivityScore;
  attempts: number;
  responses: unknown;
};

export type ActivityFeedbackCopy = {
  correct?: string;
  incorrect?: string;
};

export type ActivityOption = {
  id: string;
  label: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type ActivityItem = {
  id: string;
  label: string;
  text?: string;
  correctCategoryId?: string;
};

export type ActivityBlockContent = {
  presentation?: string;
  prompt?: string;
  instructions?: string;
  formative?: boolean;
  retry?: boolean;
  shuffle?: boolean;
  randomise?: boolean;
  maxAttempts?: number;
  feedback?: ActivityFeedbackCopy;
  marking?: { mode?: string };
  options?: ActivityOption[];
  correctOptionId?: string | null;
  items?: ActivityItem[];
  categories?: ActivityItem[];
  targets?: ActivityItem[];
  correct?: Record<string, string>;
  correctOrder?: string[];
  gaps?: Array<ActivityItem & { correctOptionId?: string }>;
  gapId?: string;
  questionId?: string;
};

export type ActivityBlockDocument = {
  id: string;
  type: string;
  content?: ActivityBlockContent;
};

export type ActivityDocument = {
  id: string;
  version?: string;
  metadata?: { title?: string; summary?: string; status?: string };
  blocks?: ActivityBlockDocument[];
};

export function normaliseActivityType(value: string | undefined): string {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}

export function isFormativeContent(content?: ActivityBlockContent): boolean {
  return content?.formative === true || content?.marking?.mode === "formative-local";
}

export function allowsRetry(content?: ActivityBlockContent): boolean {
  return content?.retry !== false;
}

export function shouldShuffle(content?: ActivityBlockContent): boolean {
  return content?.shuffle === true || content?.randomise === true;
}

export const CATALOGUE_REACT_TYPES = [
  "single-choice",
  "option-cards",
  "classification",
  "drag-drop",
  "fill-gap",
  "phrase-completion",
  "ordering",
  "sequence"
] as const;

export function isCatalogueReactType(value: string | undefined): boolean {
  return (CATALOGUE_REACT_TYPES as readonly string[]).includes(normaliseActivityType(value));
}

export function questionIdFor(block: ActivityBlockDocument): string {
  return block.content?.questionId || block.id;
}
