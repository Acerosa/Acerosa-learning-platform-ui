# Unit 3 migration plan

Do not execute this plan in the React/Vite task. Unit 3 stays on static HTML until Unit 14 is proven in production.

## Recommended order

1. Unit 14 React/Vite reference (this task)
2. T Level
3. Unit 3
4. Future hubs start on React/Vite by default

## What to preserve

- Exam context (`contextType: "exam"`)
- OCR command-word drills and NCSC / Northbank copy
- Existing week/activity URLs where they are already public
- Subject identity (do not restyle as Unit 14)

## Blockers from the 0.2.0 audit

- Many static week/activity HTML files copied from a header template
- `--color-*` tokens are not mapped onto `--lp-*` / `--hub-primary`
- Account widget is not in the header
- Exam pedagogy UI must remain hub-owned

## Suggested steps later

1. Map colours onto Core tokens.
2. Adopt `@learning-platform/ui` `HubShell` / `Navigation` instead of copied headers.
3. Map week pages onto `WeekView` with exam context supplied as data.
4. Keep OCR drills as hub components. Do not put them in `@learning-platform/ui`.
5. Replace the page generator with the same Vite MPA pattern as Unit 14.
6. Do not force assignment-context copy onto an examination unit.
