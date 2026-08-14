import type { ReactNode } from "react";
import type { BreadcrumbItem } from "../contracts";

export type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
  resolveHref?: (path: string) => string;
};

function itemHref(item: BreadcrumbItem, resolveHref?: (path: string) => string): string | undefined {
  if (item.href) return item.href;
  if (item.path != null && resolveHref) return resolveHref(item.path);
  return item.path || undefined;
}

export function Breadcrumbs({ items = [], resolveHref }: BreadcrumbsProps): ReactNode {
  if (!items.length) {
    return <nav className="lp-breadcrumbs" aria-label="Breadcrumb" hidden />;
  }
  return (
    <nav className="lp-breadcrumbs" aria-label="Breadcrumb">
      <ol className="lp-breadcrumbs__list">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          const href = itemHref(item, resolveHref);
          return (
            <li key={`${item.label}-${index}`}>
              {last || !href ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <a href={href}>{item.label}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
