import type { HTMLAttributes, ReactNode } from "react";
import { isUnsafeAuthoredHtml } from "@learning-platform/core";

export type AuthoredHtmlProps = Omit<HTMLAttributes<HTMLDivElement>, "dangerouslySetInnerHTML" | "children"> & {
  html?: string | null;
};

export function AuthoredHtml({ html, className, ...props }: AuthoredHtmlProps): ReactNode {
  const value = html == null ? "" : String(html);
  if (isUnsafeAuthoredHtml(value)) {
    return <div className={className} data-lp-html-rejected="true" {...props} />;
  }
  return <div className={className} dangerouslySetInnerHTML={{ __html: value }} {...props} />;
}
