export declare function useRestoredState<T>(incoming: T, fallback: T): [T, (value: T | ((current: T) => T)) => void];
export declare function useRestoredChecked(initialChecked: boolean | undefined, hasResponse: boolean): [boolean, (value: boolean) => void];
