declare module "@learning-platform/core" {
  export function isUnsafeAuthoredHtml(html?: string | null): boolean;
  export function setAuthoredHtml(element: Element | null | undefined, html?: string | null): boolean;
  export function resolveActivityVersion(activity?: { version?: string; activityVersion?: string } | null): string;
  export function canonicalActivityVersion(value?: string | null): string;
}
