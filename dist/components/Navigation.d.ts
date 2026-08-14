import { type ReactNode } from "react";
import type { NavigationItem, ThemeControl } from "../contracts";
export type NavigationProps = {
    items: NavigationItem[];
    currentId?: string;
    currentIds?: string[];
    brandTitle: string;
    brandTagline?: string;
    homeHref?: string;
    theme?: ThemeControl | null;
    actions?: ReactNode;
    listId?: string;
};
export declare function Navigation({ items, currentId, currentIds, brandTitle, brandTagline, homeHref, theme, actions, listId }: NavigationProps): ReactNode;
