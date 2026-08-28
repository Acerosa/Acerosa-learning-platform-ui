# Week access

Learner week visibility is controlled by published curriculum metadata, not by
hub-local rules or week numbering.

```text
Admin publication
        ↓
published week.metadata.status
        ↓
Core isWeekAvailable()
        ↓
UI WeekAccessLink / WeekAccessGuard
        ↓
learner navigation and direct routes
```

Only `week.metadata.status === "available"` makes a week learner-accessible.
Planned, archived, missing and unknown values are inaccessible.

## Dependency

`WeekAccessLink` and `WeekAccessGuard` import `isWeekAvailable` from
`@learning-platform/core/curriculum-runtime`. Pin Core to a release that
includes the shared week visibility runtime (Core PR #4 or later).

## WeekAccessLink

Use in navigation lists, sidebars and home cards. Available weeks render a
normal learner link. Inaccessible weeks render a locked presentation with
`StatusBadge` text and no navigable anchor.

```tsx
import { WeekAccessLink } from "@learning-platform/ui";

<WeekAccessLink
  week={week}
  href={`/week/${week.teachingWeek}/`}
>
  {week.title}
</WeekAccessLink>
```

Routing libraries stay outside the package. Pass `renderLink` when the hub uses
a client router:

```tsx
<WeekAccessLink
  week={week}
  href={`/week/${week.teachingWeek}/`}
  renderLink={({ href, children, className }) => (
    <Link to={href} className={className}>{children}</Link>
  )}
>
  {week.title}
</WeekAccessLink>
```

The default renderer uses a plain `<a href>` suitable for static multi-page hubs.

## WeekAccessGuard

Wrap week page content so direct URL entry cannot bypass navigation locks:

```tsx
import { WeekAccessGuard } from "@learning-platform/ui";

<WeekAccessGuard week={week}>
  <WeekPage />
</WeekAccessGuard>
```

Override presentation when needed:

```tsx
<WeekAccessGuard week={week} fallback={<CustomLockedWeek />}>
  <WeekPage />
</WeekAccessGuard>
```

## Week record

Pass Core `weeksFromPublication()` records or Content week objects. Status is
read from `week.status` or `week.metadata.status`.

Weeks are evaluated independently. Non-sequential availability is valid, for
example week 1 and week 3 available while week 2 is planned.

## Accessibility

Locked weeks are not links. `WeekAccessLink` sets `aria-disabled="true"` on the
locked presentation and exposes status through `StatusBadge` text.
`WeekAccessGuard` renders an understandable heading and message for blocked
direct navigation.
