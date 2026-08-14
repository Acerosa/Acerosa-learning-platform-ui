import type { ReactNode } from "react";
import { type SessionKind } from "../contracts";
export type SessionSectionProps = {
    id?: string;
    title?: string;
    kind?: SessionKind | string;
    summary?: string;
    defaultOpen?: boolean;
    meta?: string;
    children?: ReactNode;
};
export declare function SessionSection({ id, title, kind, summary, defaultOpen, meta, children }: SessionSectionProps): ReactNode;
