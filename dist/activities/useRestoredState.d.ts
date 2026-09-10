/**
 * Restore persisted draft values into local state.
 * Non-empty incoming values hydrate the control.
 * An explicit empty incoming value after a prior restore clears local state
 * (Try again / draft retry) without fighting an unset initial mount.
 */
export declare function useRestoredState<T>(incoming: T, fallback: T): [T, (value: T | ((current: T) => T)) => void];
export declare function useRestoredChecked(initialChecked: boolean | undefined, hasResponse: boolean): [boolean, (value: boolean) => void];
