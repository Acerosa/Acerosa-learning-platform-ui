# Ownership

## `@learning-platform/core`

Framework-neutral platform behaviour:

- `createPlatform`, Auth, learner context, enrolment, progress, submissions
- theme service and `--lp-*` / `--hub-primary` tokens
- DOM factories (`createHubShell`, `createWeekView`, …) for non-React hubs
- evidence helpers and conformance

Core must not import React. Core must not know OCR, Unit 14, P1/M1/D1, Cyber Security or T Level task names.

## `@learning-platform/content`

Curriculum semantics:

- `lp.content.*` schemas and validation
- importers
- `resolveWeek`, `renderActivity`, `renderBlock`
- draft persistence keys, stable block/question IDs
- publication state comparison copy

Content must not own React chrome. React receives canonical documents and HTML/activity payloads from Content.

## `@learning-platform/ui`

React learner presentation:

- `HubShell`, `Navigation`, `LearnerHeader`, `Breadcrumbs`
- `WeekView`, `WeekHeader`, `WeekNavigation`, `SessionSection`
- `ActivityCard`, `ContextPanel`, `LearningOutcomeBadge`
- `OptionCards`, `DragDrop`, `PhraseCompletion`, `Sequence`
- `FeedbackPanel`, `CompletionModal`, `ActivityBlock`
- `ProgressCard`, `StatusBadge`, `Callout`
- `EmptyState`, `LoadingState`, `ErrorState`

UI consumes Core contracts and CSS classes. It does not talk to Supabase. It does not validate curriculum.

## Hub

- primary/accent branding
- navigation config and information architecture
- curriculum package under `content/<hub>/`
- subject pedagogy (exam drills, P/M/D disclaimers, project journey, programming environment)
- GitHub Pages route table and hub-specific CSS for interactive blocks
