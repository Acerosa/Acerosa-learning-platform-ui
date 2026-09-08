import { useEffect, useState } from "react";

function hasRestoredValue(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === "string") return value.length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

export function useRestoredState<T>(incoming: T, fallback: T): [T, (value: T | ((current: T) => T)) => void] {
  const [value, setValue] = useState<T>(hasRestoredValue(incoming) ? incoming : fallback);

  useEffect(() => {
    if (!hasRestoredValue(incoming)) return;
    setValue(incoming);
  }, [incoming]);

  return [value, setValue];
}

export function useRestoredChecked(initialChecked: boolean | undefined, hasResponse: boolean): [boolean, (value: boolean) => void] {
  const [checked, setChecked] = useState(Boolean(initialChecked && hasResponse));

  useEffect(() => {
    if (initialChecked && hasResponse) setChecked(true);
  }, [hasResponse, initialChecked]);

  return [checked, setChecked];
}
