import type { ReactNode } from "react";
import { type WeekAccessRecord } from "../week-access";
export type WeekAccessGuardProps = {
    week: WeekAccessRecord;
    children: ReactNode;
    fallback?: ReactNode;
};
export declare function WeekAccessGuard({ week, children, fallback }: WeekAccessGuardProps): ReactNode;
