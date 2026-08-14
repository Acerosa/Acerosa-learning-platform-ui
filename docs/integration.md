# Integration

## Consumer

A React + TypeScript + Vite learner hub:

```tsx
import { HubShell, WeekView } from "@learning-platform/ui";
import { createPlatform, createAccountDialog } from "@learning-platform/core";
import "@learning-platform/core/theme.css";
```

Install at build time. GitHub Pages must receive the bundled static output. There is no runtime npm install.

## Sibling checkout (CI)

`package.json` uses `file:` siblings. CI must reproduce:

```text
workspace/
├── <hub>
├── learning-platform-core
├── learning-platform-content
└── learning-platform-ui
```

The UI git repository is `Acerosa/Acerosa-learning-platform-ui`. Check it out to the local folder `learning-platform-ui` so `file:../learning-platform-ui` resolves.

Pin Core, Content and UI to reviewed tags. Do not follow dependency `main`.

## Theme

```tsx
createPlatform({ theme: { primary: "#1e3a5f", accent: "#2a7a62" }, ... });
```

Core applies `--hub-primary` / `--hub-accent`. Components use `--lp-*` from Core `theme.css`.

## Content

React receives canonical week/session/activity data. Activity interiors may be Content HTML:

```tsx
<WeekView
  sessions={[{ activities: [{ html: engine.renderActivity(activity) }] }]}
/>
```

Then call Content `bindInteractive` on the mount node. Stable block/question IDs, drafts and evidence-only submit stay in Content/Core.

## Routing

Learner hubs should use Vite multi-page static HTML at existing directory URLs (`base: './'`). Do not copy Admin hash routing.

## What this package must not import

Auth, Supabase, learner context services, curriculum schemas, draft stores, submission clients, publication RPC.
