import type { HTMLAttributes, ReactNode } from "react";
export type AuthoredHtmlProps = Omit<HTMLAttributes<HTMLDivElement>, "dangerouslySetInnerHTML" | "children"> & {
    html?: string | null;
};
export declare function AuthoredHtml({ html, className, ...props }: AuthoredHtmlProps): ReactNode;
