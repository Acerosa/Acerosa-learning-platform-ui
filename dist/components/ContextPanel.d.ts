import type { ReactNode } from "react";
import { type ContextType, type LinkAction } from "../contracts";
export type ContextItem = {
    label: string;
    value: string;
};
export type ContextPanelProps = {
    contextType?: ContextType | string;
    heading?: string;
    items?: ContextItem[];
    description?: string;
    action?: LinkAction | null;
};
export declare function ContextPanel({ contextType, heading, items, description, action }: ContextPanelProps): ReactNode;
