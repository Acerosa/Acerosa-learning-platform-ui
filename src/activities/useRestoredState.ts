import { useEffect, useRef, useState } from "react";

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
  const [value, setValue] = useState<T>(hasRestoredValue(incoming) ? incoming : fallback);
  const hadRestoredRef = useRef(hasRestoredValue(incoming));

  useEffect(() => {
    if (hasRestoredValue(incoming)) {
      hadRestoredRef.current = true;
      setValue(incoming);
      return;
    }
    if (hadRestoredRef.current) {
      hadRestoredRef.current = false;
      setValue(fallback);
    }
  }, [fallback, incoming]);

  return [value, setValue];
}

export function useRestoredChecked(initialChecked: boolean | undefined, hasResponse: boolean): [boolean, (value: boolean) => void] {
  const [checked, setChecked] = useState(Boolean(initialChecked && hasResponse));

  useEffect(() => {
    if (initialChecked && hasResponse) {
      setChecked(true);
      return;
    }
    if (initialChecked === false || !hasResponse) {
      setChecked(false);
    }
  }, [hasResponse, initialChecked]);

  return [checked, setChecked];
}
