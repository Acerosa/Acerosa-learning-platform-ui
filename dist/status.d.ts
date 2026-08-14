import type { StatusTone } from "./contracts";
export declare function statusTone(status?: string | null): StatusTone;
export declare function statusLabel(status?: string | null, fallback?: string): string;
export declare function activityActionLabel(state?: string | null, fallback?: string): string;
