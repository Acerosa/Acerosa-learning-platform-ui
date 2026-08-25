import { useState, type ReactNode } from "react";
import { Classification } from "./Classification";
import { DragDrop } from "./DragDrop";
import { OptionCards } from "./OptionCards";
import { PhraseCompletion } from "./PhraseCompletion";
import { Sequence } from "./Sequence";
import {
  allowsRetry,
  isCatalogueReactType,
  isFormativeContent,
  normaliseActivityType,
  questionIdFor,
  shouldShuffle,
  type ActivityBlockDocument,
  type ActivityDocument,
  type ActivityResult
} from "./types";

export type ActivityBlockProps = {
  block: ActivityBlockDocument;
  initialResponse?: unknown;
  onResult?: (result: ActivityResult, block: ActivityBlockDocument) => void;
};

export type InteractiveActivityProps = {
  activity: ActivityDocument;
  initialResponses?: Record<string, unknown>;
  renderFallback?: (block: ActivityBlockDocument) => ReactNode;
  onResult?: (result: ActivityResult, block: ActivityBlockDocument) => void;
};

function sharedMechanics(block: ActivityBlockDocument) {
  const content = block.content || {};
  return {
    id: block.id,
    instructions: content.instructions,
    feedback: content.feedback,
    formative: isFormativeContent(content),
    retry: allowsRetry(content),
    shuffle: shouldShuffle(content),
    maxAttempts: content.maxAttempts
  };
}

export function ActivityBlock({ block, initialResponse, onResult }: ActivityBlockProps): ReactNode {
  const type = normaliseActivityType(block.type);
  const content = block.content || {};
  const presentation = normaliseActivityType(content.presentation);
  const mechanics = sharedMechanics(block);
  const emit = (result: ActivityResult) => onResult?.(result, block);

  if (
    type === "single-choice" ||
    type === "option-cards" ||
    presentation === "option-cards" ||
    presentation === "true-false" ||
    presentation === "picture-quiz"
  ) {
    return (
      <OptionCards
        {...mechanics}
        prompt={content.prompt || "Choose an option"}
        options={content.options || []}
        correctOptionId={content.correctOptionId}
        initialSelectedId={typeof initialResponse === "string" ? initialResponse : undefined}
        onResult={emit}
      />
    );
  }

  if (type === "classification") {
    const initialAssignments = initialResponse && typeof initialResponse === "object" && !Array.isArray(initialResponse)
      ? initialResponse as Record<string, string>
      : undefined;
    return (
      <Classification
        {...mechanics}
        prompt={content.prompt || "Classify each item"}
        items={content.items || []}
        categories={content.categories || []}
        initialAssignments={initialAssignments}
        onResult={emit}
      />
    );
  }

  if (type === "drag-drop") {
    return (
      <DragDrop
        {...mechanics}
        prompt={content.prompt || "Place each item"}
        items={content.items || []}
        targets={content.targets || []}
        correct={content.correct}
        onResult={emit}
      />
    );
  }

  if (type === "fill-gap" || type === "phrase-completion") {
    return (
      <PhraseCompletion
        {...mechanics}
        prompt={content.prompt || "Complete the phrase"}
        gaps={content.gaps}
        options={content.options || []}
        correctOptionId={content.correctOptionId}
        onResult={emit}
      />
    );
  }

  if (type === "ordering" || type === "sequence") {
    return (
      <Sequence
        {...mechanics}
        prompt={content.prompt || "Put the items in order"}
        items={content.items || []}
        correctOrder={content.correctOrder}
        onResult={emit}
      />
    );
  }

  return (
    <p className="lp-card__meta" data-lp-block={type}>
      This {type || "unknown"} block is not part of the React activity catalogue yet.
    </p>
  );
}

export function InteractiveActivity({
  activity,
  initialResponses = {},
  renderFallback,
  onResult
}: InteractiveActivityProps): ReactNode {
  const [resetKey, setResetKey] = useState(0);

  return (
    <article
      className="lp-activity panel"
      data-lp-activity={activity.id}
      data-lp-activity-version={activity.version || "0.1.0"}
    >
      {activity.metadata?.title ? <h3>{activity.metadata.title}</h3> : null}
      {activity.metadata?.summary ? <p>{activity.metadata.summary}</p> : null}
      <div className="lp-activity-list" key={resetKey}>
        {(activity.blocks || []).map((block) => {
          if (isCatalogueReactType(block.type)) {
            return (
              <ActivityBlock
                key={block.id}
                block={block}
                initialResponse={initialResponses[questionIdFor(block)]}
                onResult={onResult}
              />
            );
          }
          if (renderFallback) {
            return <div key={block.id}>{renderFallback(block)}</div>;
          }
          return (
            <p key={block.id} className="lp-card__meta" data-lp-block={normaliseActivityType(block.type)}>
              This {normaliseActivityType(block.type) || "unknown"} block is not part of the React activity catalogue yet.
            </p>
          );
        })}
      </div>
      <div className="lp-activity-actions">
        <button
          type="button"
          className="lp-button lp-button--secondary"
          data-lp-reset-activity={activity.id}
          onClick={() => setResetKey((value) => value + 1)}
        >
          Reset activity
        </button>
        <p className="lp-activity-status" data-lp-activity-status role="status" aria-live="polite"></p>
      </div>
    </article>
  );
}
