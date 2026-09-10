import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  InteractiveActivity,
  OptionCards,
  presentationShuffleSeed,
  shouldShuffle,
  stableShuffle
} from "../src/index";

const authoredOptions = [
  { id: "correct", label: "Encryption" },
  { id: "d1", label: "Distractor one" },
  { id: "d2", label: "Distractor two" },
  { id: "d3", label: "Distractor three" }
];

describe("stableShuffle", () => {
  it("keeps all items exactly once and preserves identity", () => {
    const shuffled = stableShuffle(authoredOptions, "activity|q1");
    expect(shuffled.map((option) => option.id).sort()).toEqual(
      authoredOptions.map((option) => option.id).sort()
    );
    expect(new Set(shuffled.map((option) => option.id)).size).toBe(4);
  });

  it("is deterministic for the same seed", () => {
    const a = stableShuffle(authoredOptions, "learner-a|q1").map((option) => option.id);
    const b = stableShuffle(authoredOptions, "learner-a|q1").map((option) => option.id);
    expect(a).toEqual(b);
  });

  it("can differ across seeds", () => {
    const a = stableShuffle(authoredOptions, "learner-a|q1").map((option) => option.id);
    const b = stableShuffle(authoredOptions, "learner-b|q1").map((option) => option.id);
    const c = stableShuffle(authoredOptions, "learner-a|q2").map((option) => option.id);
    expect(a).not.toEqual(b);
    expect(a).not.toEqual(c);
  });

  it("places the authored-first correct option in varying positions across known seeds", () => {
    const positions = new Set<number>();
    for (let index = 0; index < 64; index += 1) {
      const order = stableShuffle(authoredOptions, `seed-${index}`);
      positions.add(order.findIndex((option) => option.id === "correct"));
    }
    expect(positions.size).toBeGreaterThanOrEqual(3);
    expect([...positions]).toEqual(expect.arrayContaining([0, 1, 2]));
  });

  it("does not use Math.random during shuffle", () => {
    const spy = vi.spyOn(Math, "random").mockImplementation(() => {
      throw new Error("Math.random must not drive presentation shuffle");
    });
    expect(() => stableShuffle(authoredOptions, "no-math-random")).not.toThrow();
    spy.mockRestore();
  });
});

describe("presentationShuffleSeed / shouldShuffle", () => {
  it("builds a stable non-secret seed without answer keys", () => {
    const seed = presentationShuffleSeed({
      activityId: "act-1",
      activityVersion: "1.0.0",
      questionId: "q1",
      blockId: "b1",
      shuffleSalt: "learner-9"
    });
    expect(seed).toBe("act-1|1.0.0|q1|b1|learner-9");
    expect(seed).not.toMatch(/correct/i);
  });

  it("defaults shuffle on and keeps true/false ordered", () => {
    expect(shouldShuffle({})).toBe(true);
    expect(shouldShuffle({ shuffle: false })).toBe(false);
    expect(shouldShuffle({ presentation: "true-false" })).toBe(false);
    expect(shouldShuffle({
      options: [
        { id: "true", label: "True" },
        { id: "false", label: "False" }
      ]
    })).toBe(false);
  });
});

describe("OptionCards presentation shuffle", () => {
  it("does not systematically show the correct option first", () => {
    render(
      <OptionCards
        id="q-encrypt"
        prompt="Pick the control"
        options={authoredOptions}
        correctOptionId="correct"
        shuffle
        shuffleSeed="stable-seed-a"
        formative
      />
    );
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(4);
    expect(radios[0]).not.toHaveAccessibleName(/Encryption/);
    expect(radios.map((radio) => radio.getAttribute("value")).sort()).toEqual(
      ["correct", "d1", "d2", "d3"].sort()
    );
  });

  it("keeps the same order across rerender and retry", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <OptionCards
        id="q-encrypt"
        prompt="Pick the control"
        options={authoredOptions}
        correctOptionId="correct"
        shuffle
        shuffleSeed="stable-seed-b"
        formative
        retry
      />
    );
    const before = screen.getAllByRole("radio").map((radio) => radio.getAttribute("value"));
    rerender(
      <OptionCards
        id="q-encrypt"
        prompt="Pick the control"
        options={[...authoredOptions]}
        correctOptionId="correct"
        shuffle
        shuffleSeed="stable-seed-b"
        formative
        retry
      />
    );
    expect(screen.getAllByRole("radio").map((radio) => radio.getAttribute("value"))).toEqual(before);

    await user.click(screen.getByRole("radio", { name: /Distractor one/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getAllByRole("radio").map((radio) => radio.getAttribute("value"))).toEqual(before);
  });

  it("saves and restores by option id, not position", async () => {
    const user = userEvent.setup();
    const onMarkResponse = vi.fn(async () => ({
      completed: true,
      correct: true,
      canRetry: false
    }));
    const seed = "cross-device-seed";
    const { unmount } = render(
      <OptionCards
        id="q-encrypt"
        prompt="Pick the control"
        options={authoredOptions}
        shuffle
        shuffleSeed={seed}
        formative
        onMarkResponse={onMarkResponse}
      />
    );
    await user.click(screen.getByRole("radio", { name: /Encryption/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(onMarkResponse).toHaveBeenCalledTimes(1);
    expect(onMarkResponse).toHaveBeenCalledWith({ optionId: "correct" });
    unmount();

    render(
      <OptionCards
        id="q-encrypt"
        prompt="Pick the control"
        options={authoredOptions}
        shuffle
        shuffleSeed={seed}
        formative
        initialSelectedId="correct"
        initialChecked
        initialCorrect
        onMarkResponse={vi.fn()}
      />
    );
    expect(screen.getByRole("radio", { name: /Encryption/ })).toBeChecked();
    expect(document.querySelector('[data-lp-feedback-state="correct"]')).toBeTruthy();
  });
});

describe("InteractiveActivity default shuffle", () => {
  it("shuffles single-choice by default and marks by option id", async () => {
    const user = userEvent.setup();
    const markBlock = vi.fn(async () => ({ correct: false }));
    render(
      <InteractiveActivity
        activity={{
          id: "act-shuffle",
          version: "1.0.0",
          blocks: [{
            id: "q1",
            type: "single-choice",
            content: {
              prompt: "Choose",
              options: authoredOptions,
              correctOptionId: "correct",
              formative: true,
              feedback: { incorrect: "Not that one." }
            }
          }]
        }}
        platform={{ marking: { markBlock } }}
      />
    );
    const values = screen.getAllByRole("radio").map((radio) => radio.getAttribute("value"));
    expect(values).not.toEqual(["correct", "d1", "d2", "d3"]);
    expect(values.sort()).toEqual(["correct", "d1", "d2", "d3"].sort());

    await user.click(screen.getByRole("radio", { name: /Distractor two/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(markBlock).toHaveBeenCalledTimes(1);
    const payload = markBlock.mock.calls.at(0)?.at(0) as { responses?: unknown } | undefined;
    expect(payload?.responses).toEqual({ optionId: "d2" });
    expect(JSON.stringify(payload)).not.toMatch(/correctOptionId/);
    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");
  });

  it("keeps True/False in authored conventional order", () => {
    render(
      <InteractiveActivity
        activity={{
          id: "act-tf",
          version: "1.0.0",
          blocks: [{
            id: "tf1",
            type: "single-choice",
            content: {
              presentation: "true-false",
              prompt: "Is this true?",
              options: [
                { id: "true", label: "True" },
                { id: "false", label: "False" }
              ],
              correctOptionId: "true"
            }
          }]
        }}
        markingMode="local"
      />
    );
    expect(screen.getAllByRole("radio").map((radio) => radio.getAttribute("value"))).toEqual([
      "true",
      "false"
    ]);
  });

  it("shuffles phrase banks while restoring gap→optionId maps", async () => {
    const user = userEvent.setup();
    const markBlock = vi.fn(async () => ({ correct: true }));
    const activity = {
      id: "act-phrase",
      version: "1.0.0",
      blocks: [{
        id: "gap1",
        type: "fill-gap" as const,
        content: {
          prompt: "Cyber security is {gap}.",
          gaps: [{ id: "gap", label: "definition" }],
          options: [
            { id: "right", label: "the protection of systems and data" },
            { id: "wrong-a", label: "only antivirus software" },
            { id: "wrong-b", label: "a type of malware" }
          ],
          formative: true
        }
      }]
    };

    const { rerender } = render(
      <InteractiveActivity
        activity={activity}
        platform={{ marking: { markBlock } }}
        shuffleSalt="s0"
      />
    );
    const bankButtons = screen.getAllByRole("button").filter((button) =>
      /protection|antivirus|malware/i.test(button.textContent || "")
    );
    expect(bankButtons[0]?.textContent).not.toMatch(/protection of systems/);

    await user.click(screen.getByRole("button", { name: /protection of systems/i }));
    await user.click(screen.getByRole("button", { name: /definition/i }));
    await user.click(screen.getByRole("button", { name: "Check phrase" }));
    expect(markBlock).toHaveBeenCalledTimes(1);
    const phrasePayload = markBlock.mock.calls.at(0)?.at(0) as { responses?: unknown } | undefined;
    expect(phrasePayload?.responses).toEqual({ gap: "right" });

    rerender(
      <InteractiveActivity
        activity={activity}
        platform={{ marking: { markBlock } }}
        shuffleSalt="s0"
        initialResponses={{ gap1: { gap: "right" } }}
        initialChecked={{ gap1: true }}
        initialResults={{ gap1: { correct: true } }}
      />
    );
    expect(document.querySelector('[data-lp-feedback-state="correct"]')).toBeTruthy();
    expect(markBlock).toHaveBeenCalledTimes(1);
  });
});
