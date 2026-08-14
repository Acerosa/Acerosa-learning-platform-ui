import type { ReactNode } from "react";
import type { BreadcrumbItem, NavigationItem, ThemeControl } from "../contracts";
export type HubShellProps = {
    brandTitle: string;
    brandTagline?: string;
    navigation: NavigationItem[];
    currentId?: string;
    currentIds?: string[];
    theme?: ThemeControl | null;
    actions?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    resolveHref?: (path: string) => string;
    pageHeader?: {
        title: string;
        subtitle?: string;
    } | null;
    footer?: {
        lines: string[];
    } | ReactNode;
    learnerHeader?: ReactNode;
    notice?: ReactNode;
    skipLabel?: string;
    mainId?: string;
    children: ReactNode;
};
export declare function HubShell({ brandTitle, brandTagline, navigation, currentId, currentIds, theme, actions, breadcrumbs, resolveHref, pageHeader, footer, learnerHeader, notice, skipLabel, mainId, children }: HubShellProps): ReactNode;
