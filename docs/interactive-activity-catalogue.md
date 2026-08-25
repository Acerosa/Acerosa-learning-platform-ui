# Interactive Activity Catalogue

Reusable educational interactions for Learning Platform hubs.

This is a design target. Tier 1 is the current implementation foundation.
Do not treat every listed type as a shipped schema.

**Activity type** is the interaction (for example `ordering`).
**Mechanics** are optional (`formative`, retry, shuffle, attempts).
**Experience** is composition (`FeedbackPanel`, `CompletionModal`, `ProgressSummary`, `PracticeProgressPanel`).

Do not create a component per combination (`TimedDragDrop`, `ScoredSequence`).

## Ownership

| Package | Owns |
| --- | --- |
| `@learning-platform/content` | Whether a block/activity is valid. Block types, `markBlock`, HTML `renderActivity`. |
| `@learning-platform/ui` | How the learner interacts. React components, keyboard/touch, local UI result. |
| `@learning-platform/core` | Evidence helpers and `submit_attempt`. Not activity interiors. |
| Backend | Authoritative marks, attempts, learner records. |

An activity remains an ordered list of **blocks**. Catalogue names are block types or presentations, not a second activity engine.

React components emit a local **Activity Result** (`completed`, `correct` or `null`, local `score`, `attempts`, `responses`). Hubs map that to Core evidence. The UI does not submit or award official marks.

Classic hubs may still inject Content HTML. New React hubs render `ActivityBlock` from the same block documents.

## Shared mechanics

Optional on block `content`:

- `formative` / `marking.mode: "formative-local"` — local correct/incorrect only
- `feedback.correct` / `feedback.incorrect`
- `retry`, `maxAttempts`
- `shuffle` / `randomise`

Protected (non-formative) blocks can complete without a local `correct` value.

## Accessibility (all types)

Keyboard operation, visible focus (`:focus-visible`), semantic controls, screen-reader names, `prefers-reduced-motion` from Core, text status not colour alone, 44px-class targets (`lp-button`), no drag-only interaction.

---

## Tier 1 — implement first

### option_cards

**Block:** `single-choice` with `content.presentation: "option-cards"` (also used for true/false and picture quizzes).

**Purpose:** Select from visually distinct answer or decision cards.

**Good for:** knowledge checks, technology selection, scenario decisions, comparisons.

**Interaction:** Click/tap/keyboard-select a card (native radio group).

**Content:** `prompt`, `options[]` (`id`, `label`, optional `description`, optional `imageSrc` + `imageAlt`). Optional `correctOptionId` (omit for decision cards with no right answer).

**Mechanics:** scoring, attempts, feedback, randomisation.

**Feedback:** Correct / incorrect / decision-complete via `FeedbackPanel`.

**Accessibility:** Cards are labelled radios. Images need `alt`.

**Mobile:** `lp-card-grid` stacks. Whole card is the hit target.

**Status:** Tier 1. Implemented as `OptionCards`.

### multiple_choice

**Block:** `single-choice` (implemented HTML radios) or registered `multiple-choice` / `multi-select` (not implemented).

**Purpose:** Choose one (or later many) from a list.

**Good for:** retrieval, definitions, exam-style checks.

**Interaction:** Radio (one) or later checkbox (many). React uses `OptionCards` for one-from-many.

**Content:** Same as `single-choice`.

**Mechanics:** scoring, attempts, feedback, randomisation.

**Feedback:** Formative correct/incorrect.

**Accessibility:** `fieldset` / `legend`, labelled inputs.

**Mobile:** stacked options.

**Status:** Tier 1. Reuse `OptionCards` / existing `single-choice`. Do not add a second one-from-many component. Multi-select stays later.

### true_false

**Block:** `single-choice` with two options. Optional `presentation: "true-false"`.

**Purpose:** Binary knowledge or statement check.

**Good for:** misconceptions, quick retrieval.

**Interaction:** Two option cards.

**Content:** `prompt`, two `options`, `correctOptionId`.

**Mechanics:** scoring, attempts, feedback.

**Feedback:** Formative correct/incorrect.

**Accessibility:** Same as option cards.

**Mobile:** two stacked or side-by-side cards.

**Status:** Tier 1. Implemented by `OptionCards`. No separate component.

### drag_drop

**Block:** `drag-drop`.

**Purpose:** Place items onto labelled targets.

**Good for:** architecture layers, device-to-role, source-to-destination.

**Interaction:** Select item, then select target (click/tap/keyboard). Pointer drag is optional later, never required.

**Content:** `prompt`, `items[]`, `targets[]`, `correct` map `{ itemId: targetId }`.

**Mechanics:** scoring, attempts, feedback, randomisation.

**Feedback:** Overall and optional per-item status text.

**Accessibility:** Buttons for items and targets; live region for the selected item. HTML fallback uses a `<select>` per item.

**Mobile:** select-to-place, not drag.

**Status:** Tier 1. Implemented as `DragDrop`. Distinct from `classification` (category selects).

### phrase_completion

**Block:** `fill-gap`.

**Purpose:** Complete a sentence from a bank of phrases.

**Good for:** terminology, definitions, protocol steps in a sentence.

**Interaction:** Select a phrase, then select the gap (same placement model as `drag-drop`).

**Content:** `prompt` with `{gapId}` or `______`, `gaps[]` (`id`, `correctOptionId`), `options[]`.

**Mechanics:** scoring, attempts, feedback, randomisation.

**Feedback:** Formative correct/incorrect.

**Accessibility:** Gaps are buttons named by their label or “blank”. Options are buttons.

**Mobile:** tap to place. Do not require drag.

**Status:** Tier 1. Implemented as `PhraseCompletion`.

### sequence

**Block:** `ordering`.

**Purpose:** Put items in the correct order.

**Good for:** process flows, packet/path steps, lifecycle.

**Interaction:** Move up / move down (click, tap, or keyboard).

**Content:** `prompt`, `items[]`, `correctOrder` (item ids).

**Mechanics:** scoring, attempts, feedback, randomisation.

**Feedback:** Formative correct/incorrect.

**Accessibility:** Each row has named move buttons. Position is announced as text. HTML fallback uses a position `<select>` per item.

**Mobile:** large move controls, not drag-to-reorder.

**Status:** Tier 1. Implemented as `Sequence`.

### flash_cards

**Purpose:** Flip between prompt and reveal for recall.

**Good for:** terms, ports, acronyms.

**Interaction:** Activate card to reveal; optional mark known/unknown.

**Content:** `cards[]` with `front` / `back` (schema later).

**Mechanics:** shuffle, streak (later).

**Feedback:** Optional self-check, not an official mark.

**Accessibility:** Toggle button with `aria-expanded` / pressed state. Do not use hover-only flip.

**Mobile:** full-width card, large tap target.

**Status:** Tier 1 candidate. Not implemented this pass (no existing React or Content type).

### picture_quiz

**Block:** `single-choice` with option images. Optional `presentation: "picture-quiz"`.

**Purpose:** Choose from image options.

**Good for:** device identification, diagram recognition.

**Interaction:** Same as option cards.

**Content:** options with `imageSrc` and `imageAlt`.

**Mechanics:** scoring, attempts, feedback, randomisation.

**Feedback:** Formative correct/incorrect.

**Accessibility:** `alt` required when an image is present. Do not rely on the picture alone.

**Mobile:** stacked image cards.

**Status:** Tier 1. Supported by `OptionCards` image fields. No separate component.

### completion_modal

**Type:** UI chrome, not a Content block.

**Purpose:** Optional end-of-activity or end-of-set summary, including a mission-complete style presentation.

**Good for:** session wrap-up, practice progress check, next-step navigation.

**Interaction:** Dialog with close, optional review, optional next.

**Content:** Driven by Activity Result (`completed`, local score, attempts) plus optional hub props (`badge` / `subtitle`, `progress`). Teaching/badge copy is supplied by the hub — not hard-coded in UI.

**Presentation:** Composes `ProgressSummary` — score as `correct / total`, optional badge, accessible progress bar (text percentage + bar).

**Mechanics:** Shown by the session/activity layer, never mandatory inside every component. Does not submit or award official marks.

**Feedback:** Completion text plus optional local score. Not an official grade.

**Accessibility:** Native `dialog`, labelled title, Escape/close, focus return. Progress is text and bar, not colour alone. Uses Core `.lp-dialog` / `.lp-progress`.

**Mobile:** `min(94vw, 38rem)` from Core dialog rules.

**Status:** Tier 1. Implemented as `CompletionModal` + `ProgressSummary`.

### progress_summary

**Type:** UI chrome, not a Content block.

**Purpose:** Reusable practice progress card (inline, in `CompletionModal`, or inside `PracticeProgressPanel`).

**Good for:** “Mission complete” style summaries, topic badges, local score bars.

**Interaction:** Read-only summary; actions stay on the modal/session layer.

**Content:** `title`, `score`, `badge`/`subtitle`, optional `progress` (0–1; derived from score when omitted), `attempts`, `message`, optional `collapsed`.

**Collapsed:** title, status, `correct / total`, `correct of total correct` only.

**Status:** Tier 1. Implemented as `ProgressSummary`.

### practice_progress_panel

**Type:** UI chrome, not a Content block.

**Purpose:** Persistent docked practice progress that does not cover the exercise column.

**Good for:** week pages where learners check formative score while working.

**Interaction:** Fixed to the **left** (bottom-left). Expand/collapse toggle with `aria-expanded`. Defaults collapsed.

**Collapsed:** same compact fields as `ProgressSummary` collapsed.

**Expanded:** badge, progress bar, %, message, practice-feedback disclaimer.

**Content:** Same props as `ProgressSummary`, plus `collapsed` / `defaultCollapsed` / `onCollapsedChange`.

**Mechanics:** Hub mounts once and feeds aggregated local Activity Results. Does not submit marks.

**Accessibility:** `aside` landmark, labelled toggle, text score not colour alone.

**Mobile:** compact left dock; expand in place without a centred overlay.

**Status:** Tier 1. Implemented as `PracticeProgressPanel`.

`CompletionModal` remains the dialog for explicit completion moments.

### feedback_panel

**Type:** UI chrome, not a Content block.

**Purpose:** Shared feedback presentation.

**Good for:** every interactive block.

**Interaction:** Read-only live status.

**Content:** `message`, optional `title`, `state`.

**States:** `neutral`, `correct`, `incorrect`, `informative`, `hint`.

**Accessibility:** Text label for the state. Incorrect uses `alert`. Colour is extra, not the only signal. Composes `Callout`.

**Mobile:** full width, wrapping text.

**Status:** Tier 1. Implemented as `FeedbackPanel`.

---

## Tier 2 — design now, implement later

### match_pairs

**Block (later):** registered `matching`.

**Purpose:** Pair related items.

**Good for:** term/definition, protocol/port.

**Interaction:** Select left, then select right (same as drag-drop). No drag-only.

**Content:** `left[]`, `right[]`, `pairs`.

**Mechanics:** scoring, attempts, feedback, randomisation.

**Feedback:** Pair-level and overall.

**Accessibility:** Two labelled lists of buttons.

**Mobile:** stacked columns.

**Status:** Tier 2.

### categorise

**Block:** `classification` (existing Content contract; do not invent a second type).

**Purpose:** Assign items to categories. Many items can share a category.

**Good for:** data types, threat types, cloud service models, RFID vs NFC uses.

**Interaction:** Select an item, then select a category. Dropdown lists remain as a fallback. Not matching (1:1 pairs) and not drag-only.

**Content:** `items[]` with `correctCategoryId`, `categories[]`.

**Mechanics:** scoring, attempts, feedback.

**Feedback:** Per-item and overall via `FeedbackPanel`.

**Accessibility:** Labelled buttons plus `<select>` fallback. Keyboard and touch. Text status, not colour alone.

**Mobile:** stacked item pool and category cards.

**Status:** Tier 1. Implemented as `Classification`.

### sorting

**Purpose:** Group or rank with looser rules than `sequence`.

**Good for:** priority, severity, “belongs together”.

**Interaction:** Same placement or ordering controls as Tier 1.

**Content:** items + ordered groups or ranks.

**Mechanics:** scoring, attempts, feedback.

**Feedback:** Formative.

**Accessibility:** Keyboard move/place.

**Mobile:** no drag-only.

**Status:** Tier 2. Prefer `ordering` or `drag-drop` until a distinct contract is needed.

### image_hotspots

**Purpose:** Select regions on an image.

**Good for:** labelled diagrams, hardware ports.

**Interaction:** Buttons or list alternative for each hotspot, not image-click only.

**Content:** image asset + hotspot ids/labels/correct ids.

**Mechanics:** scoring, attempts, feedback.

**Feedback:** Formative.

**Accessibility:** Text list equivalent required.

**Mobile:** large hit areas; zoom/pan later.

**Status:** Tier 2.

### interactive_diagram

**Purpose:** Explore a diagram with reveals, not necessarily a scored quiz.

**Good for:** network topologies, system context.

**Interaction:** Activate parts to reveal notes.

**Content:** diagram asset + regions/notes.

**Mechanics:** optional completion when all parts viewed.

**Feedback:** Informative / hint.

**Accessibility:** Keyboard list of parts.

**Mobile:** stacked list + diagram.

**Status:** Tier 2.

### timed_challenge

**Purpose:** Optional timer mechanic on any Tier 1 type.

**Good for:** retrieval practice, not high-stakes assessment.

**Interaction:** Existing activity plus visible timer.

**Content:** `timeLimitSeconds` on mechanics, not a new engine.

**Mechanics:** timer only. Do not create `TimedOptionCards`.

**Feedback:** Time remaining as text.

**Accessibility:** Pause control; honour reduced motion; do not rely on colour for remaining time.

**Mobile:** timer visible without covering controls.

**Status:** Tier 2 mechanic.

### competition_cards

**Purpose:** Lightweight compare/compete framing on option cards.

**Good for:** revision games. Not official ranking.

**Interaction:** Option cards plus optional streak mechanic.

**Content:** same as option cards.

**Mechanics:** streak. Scores stay local.

**Feedback:** Informative, not a league table with marks.

**Accessibility:** Same as option cards.

**Mobile:** same grid.

**Status:** Tier 2 experience on `OptionCards`.

### scenario

**Purpose:** Short situated decision with one response.

**Good for:** workplace choices, incident first steps.

**Interaction:** Option cards without a required correct answer, or with formative guidance.

**Content:** scene text + options + feedback per option (later).

**Mechanics:** feedback, optional scoring.

**Feedback:** Informative per choice.

**Accessibility:** Scene as prose, options as radios.

**Mobile:** stacked.

**Status:** Tier 2. Can start as `OptionCards` without `correctOptionId`.

### branching_scenario

**Purpose:** Multi-step choices with paths.

**Good for:** incident response, user journeys.

**Interaction:** Repeated option-card steps.

**Content:** nodes, choices, next ids (schema later).

**Mechanics:** completion at terminal node. Local path record, not a second markbook.

**Feedback:** Per step and ending.

**Accessibility:** History as a list; each step a radio group.

**Mobile:** one step on screen.

**Status:** Tier 2.

---

## Tier 3 — future

Keep as names and intent only. No schemas in this pass.

### mission

Longer goal with several activities. Session/week composition, not a new engine. Present progress with `ProgressSummary` / `CompletionModal` when the hub aggregates local Activity Results.

### escape_challenge

Locked steps that open on formative success. Compose `Sequence` / `PhraseCompletion` with session logic.

### simulation

Stateful model (network, device, queue). Needs a later contract. Not a quiz skin.

### adaptive_challenge

Difficulty/support already exists on activity metadata (`foundation` / `standard` / `challenge`, reserved `support`). Adaptation is a delivery concern.

### multi_stage_scenario

Branching scenario plus stages. Wait for `branching_scenario`.

---

## Author notes

Use kebab-case block `type` values (`single-choice`, `drag-drop`, `fill-gap`, `ordering`).

Put teaching copy in the hub curriculum package, not in `@learning-platform/ui`.

Do not submit Activity Result as a mark. Map responses with Core evidence helpers (`singleChoice`, `ordering`, `classification`, and later matching).
