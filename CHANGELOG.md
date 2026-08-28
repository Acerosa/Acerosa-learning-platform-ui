# Changelog

## Unreleased

## 0.1.6

- `WeekAccessLink` and `WeekAccessGuard` for reusable learner week visibility UI.
  Components delegate access checks to Core `isWeekAvailable()` from
  `@learning-platform/core/curriculum-runtime`. Requires Core `0.2.1` or later.
  See `docs/week-access.md`.

## 0.1.5

- `LearningTextField`: controlled learning textarea (paste/drop blocked, minChars counter, no Save) for host worksheets; `TextResponse` now uses it internally.

## 0.1.4

- Catalogue React text responses: `ShortResponse` / `Reflection` (shared `TextResponse`) for Content `short-response` and `reflection`, with L2E paste/drop block, minChars counter, and unscored `correct: null` results.

## 0.1.3

- Docked expandable `PracticeProgressPanel` (left, collapsed by default) and collapsed mode on `ProgressSummary`. UI chrome only — not a Content `mission` block.

## 0.1.2

- Progress / mission-complete experience: `ProgressSummary` plus `CompletionModal` support for badge and progress bar. UI chrome only — not a Content `mission` block.

## 0.1.1

- Interactive activity catalogue: `OptionCards`, `Classification`, `DragDrop`, `PhraseCompletion`, `Sequence`, `FeedbackPanel`, `CompletionModal`, and Content-driven `ActivityBlock` / `InteractiveActivity`. See `docs/interactive-activity-catalogue.md`.

## 0.1.0

- Initial React + TypeScript learner UI package.
- Presentation components aligned with Core 0.2.0 contracts and `--lp-*` classes.
- Canonical git remote is `Acerosa/Acerosa-learning-platform-ui` (renamed from `Acerosa/-learning-platform-ui`).
- Core DOM factories are not wrapped or removed.
