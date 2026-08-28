import type { ReactNode } from "react";
import { type WeekAccessRecord } from "../week-access";
export type WeekAccessLinkRenderProps = {
    href: string;
    children: ReactNode;
    className?: string;
};
export type WeekAccessLinkProps = {
    week: WeekAccessRecord;
    href: string;
    children: ReactNode;
    className?: string;
    lockedClassName?: string;
    renderLink?: (props: WeekAccessLinkRenderProps) => ReactNode;
};
export declare function WeekAccessLink({ week, href, children, className, lockedClassName, renderLink }: WeekAccessLinkProps): ReactNode;
