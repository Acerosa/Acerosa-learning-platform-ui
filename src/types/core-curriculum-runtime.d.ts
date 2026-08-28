declare module "@learning-platform/core/curriculum-runtime" {
  export function isWeekAvailable(status?: string | null): boolean;

  export type RuntimeWeekRecord = {
    id: string;
    teachingWeek: number;
    status: string;
    available: boolean;
    title: string;
  };

  export function overlayLiveWeekMetadata<T extends Record<string, unknown>>(
    base: T | null | undefined,
    live: T | null | undefined
  ): T | null | undefined;

  export function weeksFromPublication<T extends Record<string, unknown>>(
    basePackage: T | null | undefined,
    livePackage?: T | null
  ): RuntimeWeekRecord[];
}
