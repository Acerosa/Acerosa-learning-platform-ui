# Architecture

## Decision

Adopt **React + TypeScript + Vite** as the standard learner-hub frontend stack for GitHub Pages.

Keep **`@learning-platform/core` framework-neutral**. Create **`@learning-platform/ui`** for React learner presentation.

Do not migrate existing vanilla hubs until a reference implementation is proven. Unit 14 is that reference. Unit 3 and T Level stay on their current stacks in this task.

## Why React + TypeScript + Vite is accepted

1. **Proven on this platform.** Admin already ships React + TypeScript + Vite to GitHub Pages as a static site. The learner stack can reuse that tooling without taking Admin's authoring UX, hash router, or `xlsx`.
2. **Contracts already exist.** Core 0.2.0 proved a hub-neutral presentation grammar (`HubShell`, `WeekView`, session kinds, status badges, `--lp-*` tokens). React should consume those contracts, not invent a second visual language.
3. **Current hub cost is presentation, not curriculum.** Unit 14 still generated HTML shells, duplicated chrome, and assembled pages with string HTML. Curriculum, drafts and submissions already live in Content and Core. A typed component layer removes that duplication for future hubs.
4. **GitHub Pages stays static.** Vite emits HTML + JS + CSS. There is no Express, Next.js server, SSR, filesystem API or runtime npm install. Supabase remains the backend.
5. **Testing and accessibility get cheaper.** Testing Library covers keyboard, landmarks and variants that string-HTML tests only approximated.

Vanilla DOM factories stay in Core for non-React consumers and transitional hubs. React is the default for **new** learner hubs and for Unit 14 as the reference migration.

## `@learning-platform/ui` is justified

A separate package is required because:

- Putting React inside Core would break the 0.2.0 framework-neutral contract and force React onto Unit 3 / T Level.
- Putting learner chrome in Content would mix curriculum semantics with presentation.
- Putting learner chrome in Admin would couple authoring UX to learner UX.
- Future hubs need one installable presentation layer, not copied HTML.

The package exists for **ownership and reuse**, not because React is available.

## Core 0.2.0 factories vs React components

**Option chosen: reimplement presentation from shared contracts (b).**

| Option | Verdict |
| --- | --- |
| (a) Wrap Core DOM factories in refs | Rejected. Dual trees, awkward lifecycle, poor TypeScript. |
| (b) React reimplements the same contracts, class names and tokens | Accepted. Additive. Visual parity via Core `theme.css`. |
| (c) Replace Core factories now | Rejected. Breaks proven 0.2.0 consumers. |

Core factories remain the non-React implementation of the same grammar. React components use the same `lp-*` classes and enumerations (`CONTEXT_TYPES`, `SESSION_KINDS`, `WEEK_UI_FEATURES`). They must not contain `if (hub === "unit14")` branches.

## What stays where

| Package | Owns |
| --- | --- |
| `@learning-platform/core` | Auth, learner context, API, platform state, theme application, `--lp-*` tokens, framework-neutral DOM factories |
| `@learning-platform/content` | Curriculum schemas, validation, importers, block/question IDs, `renderActivity` / `bindInteractive` semantics, publication comparison |
| `@learning-platform/ui` | React `HubShell`, header/navigation, week/session/activity presentation, status/progress/empty/loading/error, shared a11y patterns |
| Hub | Branding colours, navigation labels/order, curriculum package, P/M/D copy, project journey, exam/OCR/NCSC workflows, GitHub Pages route list |

Not extracted into UI: Resource lists, assignment milestone/P/M/D judgement, OCR exam drills, T Level task/sidebar, programming-environment chrome.

## Routing (learner hubs)

Do **not** copy Admin hash routing.

Admin uses hash routes because it is one SPA with many tools and no public teaching URLs to preserve. Learner hubs already have useful directory URLs (`/weeks/week-1/`, `/assignments/assignment-1/`).

**Chosen model: Vite multi-page (MPA) with one shared React bundle and a real `index.html` at each existing route. `base: './'` so assets stay relative.**

That combination:

- preserves direct links and refresh on GitHub Pages (Pages serves `directory/index.html`);
- avoids hash URLs;
- avoids a `404.html` SPA fallback;
- avoids hard-coding the repository name in every link;
- keeps Node as build/test tooling only.

A single-root SPA with hash routing or a server fallback would either break current URLs or add runtime assumptions GitHub Pages does not provide.

## Deployment

```
GitHub Actions → npm ci → tests → vite build → static dist → GitHub Pages
```

Forbidden at runtime: Express, Next.js server, SSR, filesystem APIs, API routes, Server Actions, runtime `npm install`.
