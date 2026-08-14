# T Level migration plan

Do not execute this plan in the React/Vite task. T Level stays on its current stack until Unit 14 is proven.

## What to preserve

- Phase / task information architecture (not a 19-week SoL)
- Programming environment chrome
- Project workflow
- Course sidebar until a hub-owned secondary nav exists

## Blockers from the 0.2.0 audit

- Dual header + sidebar
- Programming editor is hub-specific
- Missing `banner` / `contentinfo` landmarks
- Content model does not use teaching weeks as the primary IA

## Suggested steps later

1. Adopt `HubShell` / `Navigation` for the public chrome and landmarks.
2. Use `ActivityCard` for foundations catalogue cards where they are listing cards.
3. Do **not** force `WeekView` onto the phase/task model.
4. Keep the programming environment and task sidebar in the hub.
5. Move to Vite MPA only for routes that already have stable public URLs.
6. Add a hub-owned secondary navigation component if the sidebar is still required; do not put T Level task names into `@learning-platform/ui`.
