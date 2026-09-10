# Changelog

## Unreleased

## 0.1.12

- Catalogue objective banks (option cards, phrase banks, classification items,
  drag-drop items, sequence starts) use a deterministic seeded shuffle by default
  so authored “correct first” ordering is not learner-visible. True/False keeps
  conventional order. Explicit `shuffle: false` / `randomise: false` opts out.
- Shuffle seed derives from activity id, version, question/block id, and optional
  `shuffleSalt` (e.g. learner id). Same seed → same order across rerender, retry,
  and cross-device hydrate. Responses remain option/item IDs, not positions.

## 0.1.11

- Classification, DragDrop, PhraseCompletion, Sequence and TextResponse restore
  Correct / Incorrect / review feedback from learner-safe `initialResult` the same
  way OptionCards already did. Opening a checked activity does not call marking.
- PhraseCompletion accepts persisted gapId→optionId maps on hydrate (inverts to the
  internal option→gap placement map).
- Export `learnerSafeCheckedResult(s)` helpers for hub activity-state persistence.

## 0.1.10

- Restored checked option-cards show Correct/Incorrect and authored learner
  feedback when a previous server verdict is supplied. A live Check is not
  overwritten by a later hydrate that only has `checked: true`. Hydration still
  does not call `markBlock`.

## 0.1.9

- Catalogue activities restore the latest checked response when `initialResponse`
  / `initialChecked` arrive after mount (server hydrate). Retry still unlocks
  only that question. Check remains the persistence boundary for hosts.

## 0.1.8

- Catalogue activities use server-marked formative feedback when `platform.marking.markBlock` is present.
  Missing server marking fails closed. Local scoring remains explicit `markingMode="local"` only.
  Retry follows the server `canRetry` result. Completion is independent of score.
  Requires Core `0.2.4`.

## 0.1.7

- `AuthoredHtml` is the shared React boundary for trusted authored HTML. `WeekView`
  uses it instead of a local refuse-list. `InteractiveActivity` no longer invents
  a `0.1.0` activity version when catalogue metadata omits one. Requires Core `0.2.3`.

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
