import type { ReactNode } from "react";
import type { BreadcrumbItem } from "../contracts";
export type BreadcrumbsProps = {
    items?: BreadcrumbItem[];
    resolveHref?: (path: string) => string;
};
export declare function Breadcrumbs({ items, resolveHref }: BreadcrumbsProps): ReactNode;
