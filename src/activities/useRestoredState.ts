import { useCallback, useEffect, useRef, useState } from "react";
import { useActivityDraftProtection } from "./activity-draft-protection";

function hasRestoredValue(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === "string") return value.length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

/**
 * Restore persisted draft values into local state.
 * Non-empty incoming values hydrate the control.
 * An explicit empty incoming value after a prior restore clears local state
 * (Try again / draft retry) without fighting an unset initial mount.
 */
export function useRestoredState<T>(incoming: T, fallback: T): [T, (value: T | ((current: T) => T)) => void] {
  const protection = useActivityDraftProtection();
  const [value, setValue] = useState<T>(hasRestoredValue(incoming) ? incoming : fallback);
  const hadRestoredRef = useRef(hasRestoredValue(incoming));
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (protection.isDirty()) return;
    if (hasRestoredValue(incoming)) {
      hadRestoredRef.current = true;
      setValue(incoming);
      return;
    }
    if (hadRestoredRef.current) {
      hadRestoredRef.current = false;
      setValue(fallback);
    }
  }, [fallback, incoming, protection]);

  const setProtected = useCallback((update: T | ((current: T) => T)) => {
    const current = valueRef.current;
    const next = typeof update === "function" ? (update as (current: T) => T)(current) : update;
    protection.recordResponse(next);
    valueRef.current = next;
    setValue(next);
  }, [protection]);

  return [value, setProtected];
}

export function useRestoredChecked(initialChecked: boolean | undefined, hasResponse: boolean): [boolean, (value: boolean) => void] {
  const protection = useActivityDraftProtection();
  const [checked, setChecked] = useState(Boolean(initialChecked && hasResponse));

  useEffect(() => {
    if (protection.isDirty()) return;
    if (initialChecked && hasResponse) {
      setChecked(true);
      return;
    }
    if (initialChecked === false || !hasResponse) {
      setChecked(false);
    }
  }, [hasResponse, initialChecked, protection]);

  return [checked, setChecked];
}
