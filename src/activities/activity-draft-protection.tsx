import { createContext, useContext, useMemo, type ReactNode } from "react";

export type ActivityStateStoreLike = {
  save?: (state: Record<string, unknown>, options?: { remote?: boolean; immediate?: boolean }) => unknown;
  load?: () => Record<string, unknown> | null;
  isDirty?: () => boolean;
  markDirty?: () => void;
};

export type ActivityDraftProtection = {
  isDirty: () => boolean;
  markDirty: () => void;
  recordResponse: (response: unknown) => void;
};

const ActivityStateStoreContext = createContext<ActivityStateStoreLike | null>(null);
const ActivityDraftProtectionContext = createContext<ActivityDraftProtection | null>(null);

const NOOP_PROTECTION: ActivityDraftProtection = {
  isDirty: () => false,
  markDirty: () => {},
  recordResponse: () => {}
};

export function ActivityStateStoreProvider({
  store,
  children
}: {
  store: ActivityStateStoreLike | null;
  children: ReactNode;
}): ReactNode {
  return (
    <ActivityStateStoreContext.Provider value={store}>
      {children}
    </ActivityStateStoreContext.Provider>
  );
}

export function BlockDraftProtectionProvider({
  questionId,
  children
}: {
  questionId: string;
  children: ReactNode;
}): ReactNode {
  const store = useContext(ActivityStateStoreContext);
  const value = useMemo<ActivityDraftProtection>(() => ({
    isDirty: () => Boolean(store?.isDirty?.()),
    markDirty: () => {
      store?.markDirty?.();
    },
    recordResponse: (response: unknown) => {
      store?.markDirty?.();
      if (typeof store?.save !== "function") return;
      const current = (typeof store.load === "function" ? store.load() : null) || {};
      const responses = {
        ...(current.responses && typeof current.responses === "object" && !Array.isArray(current.responses)
          ? current.responses as Record<string, unknown>
          : {})
      };
      const checked = {
        ...(current.checked && typeof current.checked === "object" && !Array.isArray(current.checked)
          ? current.checked as Record<string, unknown>
          : {})
      };
      responses[questionId] = response;
      checked[questionId] = false;
      store.save({ ...current, responses, checked }, { remote: false });
    }
  }), [questionId, store]);

  return (
    <ActivityDraftProtectionContext.Provider value={value}>
      {children}
    </ActivityDraftProtectionContext.Provider>
  );
}

export function useActivityDraftProtection(): ActivityDraftProtection {
  return useContext(ActivityDraftProtectionContext) || NOOP_PROTECTION;
}

export function resolveActivityStateStore(
  platform: unknown,
  activityKey: string,
  activityVersion?: string
): ActivityStateStoreLike | null {
  const createStore = (platform as {
    progress?: {
      createStore?: (options: {
        activityKey: string;
        activityVersion?: string;
        storage?: Storage;
      }) => ActivityStateStoreLike;
    };
  })?.progress?.createStore;
  if (typeof createStore !== "function" || !activityKey || !activityVersion) return null;
  try {
    return createStore({
      activityKey,
      activityVersion,
      storage: typeof globalThis.window !== "undefined" ? globalThis.window.localStorage : undefined
    });
  } catch {
    return null;
  }
}

export function protectedActivityDraft(
  store: ActivityStateStoreLike | null,
  initialResponses: Record<string, unknown> = {},
  initialChecked: Record<string, boolean> = {},
  initialResults: Record<string, unknown> = {}
): {
  responses: Record<string, unknown>;
  checked: Record<string, boolean>;
  results: Record<string, unknown>;
} {
  if (!store?.isDirty?.()) {
    return { responses: initialResponses, checked: initialChecked, results: initialResults };
  }
  const local = store.load?.() || {};
  const responses = local.responses && typeof local.responses === "object" && !Array.isArray(local.responses)
    ? { ...initialResponses, ...(local.responses as Record<string, unknown>) }
    : initialResponses;
  const checked = local.checked && typeof local.checked === "object" && !Array.isArray(local.checked)
    ? { ...initialChecked, ...(local.checked as Record<string, boolean>) }
    : initialChecked;
  const results = local.results && typeof local.results === "object" && !Array.isArray(local.results)
    ? { ...initialResults, ...(local.results as Record<string, unknown>) }
    : initialResults;
  return { responses, checked, results };
}
