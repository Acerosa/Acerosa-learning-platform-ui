# Accessibility

Shared learner UI must preserve:

- skip link to `main`
- `banner`, `main` and `contentinfo` landmarks (page titles are not a second banner)
- labelled primary navigation and breadcrumbs
- mobile menu with `aria-expanded` and Escape to close
- visible `:focus-visible` via Core theme
- heading hierarchy supplied by the hub (`HubShell` page `h1`, week title optional)
- status and progress as text, not colour alone
- `prefers-reduced-motion` via Core CSS
- 44px-class control sizing from Core button/theme rules

Tests run axe on `HubShell` + `WeekView` (colour-contrast disabled in jsdom) and keyboard-operate the menu toggle.

Hubs remain responsible for activity-interior labels from Content `renderActivity` or from React `ActivityBlock`. Catalogue components must keep a keyboard/tap path; drag-only interaction is not allowed.

See `docs/interactive-activity-catalogue.md`.
