# Components

All components consume Core `--lp-*` classes. Hubs must load `@learning-platform/core/theme.css` (or a vendored copy). Do not add a second token system.

| Component | Role |
| --- | --- |
| `HubShell` | Skip link, banner, navigation, optional learner header, breadcrumbs, page title, main, footer, optional notice |
| `Navigation` | Primary nav, mobile menu, optional theme control |
| `LearnerHeader` | Signed-in learner summary. Receives learner data; does not call Auth |
| `Breadcrumbs` | Ordered trail. Empty `path` resolves through `resolveHref` |
| `WeekView` | Composed week presentation from a presentation object, not a Content envelope |
| `WeekHeader` | Teaching week title, status, outcome badges |
| `WeekNavigation` | Previous/next week links |
| `SessionSection` | One session for all canonical kinds via `data-kind` |
| `ActivityCard` | Listing card with start/resume/review labels |
| `OptionCards` | Single-choice / decision / picture cards from Content `single-choice` |
| `DragDrop` | Place items on targets with a select-to-place keyboard/tap path |
| `PhraseCompletion` | Fill-gap phrase using the same placement model |
| `Sequence` | Reorder items with move buttons and arrow keys |
| `FeedbackPanel` | Shared activity feedback (`neutral` / `correct` / `incorrect` / `informative` / `hint`) |
| `CompletionModal` | Optional completion dialog using Core `.lp-dialog`; composes `ProgressSummary` |
| `ProgressSummary` | Practice score / badge / progress bar (inline or in completion dialog) |
| `InteractiveActivity` / `ActivityBlock` | Content-driven renderer for catalogue blocks |
| `ContextPanel` | Exam / assignment / project context from data |
| `LearningOutcomeBadge` | Compact outcome chip |
| `ProgressCard` | Numeric progress with accessible percentage |
| `StatusBadge` | Status with text, not colour alone |
| `Callout` | Info/success/warning/error aside |
| `EmptyState` | Planned/empty region |
| `LoadingState` | Pending region (`role="status"`) |
| `ErrorState` | Error banner (`role="alert"`). Maps to Core `createErrorBanner` |

Not in this package: account dialog (Core DOM factory), resource lists, P/M/D judgement, OCR drills, T Level sidebar, programming-environment chrome.

Interactive interiors: see `docs/interactive-activity-catalogue.md`. Catalogue components consume Content block documents. They emit a local Activity Result and do not submit marks.

## Configuration, not hub branches

Pass presentation data and `WEEK_UI_FEATURES` overrides. Do not write `if (hub === "unit14")`.

Canonical session kinds: `session`, `independent-study`, `homework`, `revision`, `retrieval`.

Canonical context types: `exam`, `assignment`, `project`.
