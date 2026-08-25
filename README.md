# @learning-platform/ui

React + TypeScript learner presentation for Learning Platform hubs.

Canonical git remote: [Acerosa/Acerosa-learning-platform-ui](https://github.com/Acerosa/Acerosa-learning-platform-ui). The npm package name remains `@learning-platform/ui`. Check the repository out locally as `learning-platform-ui` so sibling `file:` installs resolve.

This package reimplements the **Core 0.2.0 presentation contracts** as React components. It does not wrap Core DOM factories, and it does not replace them.

Hubs must load `@learning-platform/core/theme.css` (or the vendored equivalent) so components pick up `--lp-*` tokens. Do not introduce a second design-token system.

```tsx
import { HubShell, WeekView } from "@learning-platform/ui";
import "@learning-platform/core/theme.css";
```

Core remains the owner of auth, learner context, API services, theme application and framework-neutral DOM factories. Content remains the owner of curriculum schemas and block rendering. This package owns reusable learner chrome and week/session/activity presentation.

See `docs/architecture.md` for the stack decision and ownership boundaries. Component list: `docs/components.md`. Hub integration: `docs/integration.md`. Interactive catalogue: `docs/interactive-activity-catalogue.md`.
