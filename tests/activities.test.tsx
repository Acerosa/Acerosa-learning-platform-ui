import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  ActivityBlock,
  Classification,
  CompletionModal,
  DragDrop,
  FeedbackPanel,
  InteractiveActivity,
  LearningTextField,
  OptionCards,
  PhraseCompletion,
  PracticeProgressPanel,
  ProgressSummary,
  Reflection,
  Sequence,
  ShortResponse,
  demoClassification,
  demoDragDrop,
  demoOptionCards,
  demoPhraseCompletion,
  demoReflection,
  demoSequence,
  demoShortResponse
} from "../src/index";

describe("FeedbackPanel", () => {
  it("exposes state as text, not colour alone", () => {
    render(<FeedbackPanel state="correct" message="Expected sensor." />);
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(screen.getByText("Expected sensor.")).toBeInTheDocument();
    expect(document.querySelector("[data-lp-feedback-state='correct']")).toBeTruthy();
  });

  it("marks incorrect feedback as an alert", () => {
    render(<FeedbackPanel state="incorrect" message="Try another option." />);
    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");
  });
});

describe("OptionCards", () => {
  const options = [
    { id: "sensor", label: "Sensor" },
    { id: "router", label: "Router" },
    { id: "monitor", label: "Monitor" }
  ];

  it("renders, checks, retries and completes from keyboard-selectable cards", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(
      <OptionCards
        prompt="Which device collects a measurement?"
        options={options}
        correctOptionId="sensor"
        feedback={{ correct: "A sensor collects the measurement.", incorrect: "Not that device." }}
        onResult={onResult}
      />
    );

    await user.click(screen.getByRole("radio", { name: /Router/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      completed: true,
      correct: false,
      attempts: 1,
      responses: { optionId: "router" }
    }));

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: /Sensor/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(document.querySelector("[data-lp-feedback-state='correct']")).toHaveTextContent("A sensor collects the measurement.");
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      completed: true,
      correct: true,
      score: { correct: 1, total: 1 }
    }));
  });

  it("records a decision without a local mark when no correct option is set", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(
      <OptionCards
        prompt="Which option would you choose for a short-range payment?"
        options={[{ id: "nfc", label: "NFC" }, { id: "rfid", label: "RFID" }]}
        formative={false}
        onResult={onResult}
      />
    );
    await user.click(screen.getByRole("radio", { name: /NFC/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      completed: true,
      correct: null,
      responses: { optionId: "nfc" }
    }));
    expect(screen.getByText("Information")).toBeInTheDocument();
  });
});

describe("DragDrop", () => {
  it("places items with a keyboard/tap path, not drag-only interaction", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(
      <DragDrop
        prompt="Place each technology."
        items={[
          { id: "sensor", label: "Temperature sensor" },
          { id: "vm", label: "Cloud virtual machine" }
        ]}
        targets={[
          { id: "edge", label: "Edge / device" },
          { id: "cloud", label: "Cloud" }
        ]}
        correct={{ sensor: "edge", vm: "cloud" }}
        feedback={{ correct: "Placed correctly.", incorrect: "Wrong layer." }}
        onResult={onResult}
      />
    );

    await user.click(screen.getByRole("button", { name: "Temperature sensor" }));
    await user.click(screen.getByRole("button", { name: "Place on Edge / device" }));
    await user.click(screen.getByRole("button", { name: "Check placement" }));
    expect(screen.getByText("Place every item before checking.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cloud virtual machine" }));
    await user.click(screen.getByRole("button", { name: "Place on Cloud" }));
    await user.click(screen.getByRole("button", { name: "Check placement" }));
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      completed: true,
      correct: true,
      score: { correct: 2, total: 2 }
    }));

    await user.click(screen.getByRole("button", { name: "Try again" }));
    await user.click(screen.getByRole("button", { name: "Temperature sensor" }));
    await user.click(screen.getByRole("button", { name: "Place on Cloud" }));
    await user.click(screen.getByRole("button", { name: "Cloud virtual machine" }));
    await user.click(screen.getByRole("button", { name: "Place on Edge / device" }));
    await user.click(screen.getByRole("button", { name: "Check placement" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");
  });
});

describe("PhraseCompletion", () => {
  it("fills a blank from phrase cards and supports retry", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(
      <PhraseCompletion
        prompt="An IoT device collects information using a {blank}."
        gaps={[{ id: "blank", label: "missing term", correctOptionId: "sensor" }]}
        options={[
          { id: "sensor", label: "Sensor" },
          { id: "router", label: "Router" },
          { id: "monitor", label: "Monitor" }
        ]}
        onResult={onResult}
      />
    );

    await user.click(screen.getByRole("button", { name: "Router" }));
    await user.click(screen.getByRole("button", { name: /missing term/ }));
    await user.click(screen.getByRole("button", { name: "Check phrase" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");

    await user.click(screen.getByRole("button", { name: "Try again" }));
    await user.click(screen.getByRole("button", { name: "Sensor" }));
    await user.click(screen.getByRole("button", { name: /missing term/ }));
    await user.click(screen.getByRole("button", { name: "Check phrase" }));
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      correct: true,
      responses: { blank: "sensor" }
    }));
  });
});

describe("LearningTextField", () => {
  it("renders without a Save button and reports controlled changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <LearningTextField
        prompt="Host field"
        minChars={20}
        value=""
        onChange={onChange}
      />
    );
    expect(screen.queryByRole("button", { name: /save/i })).not.toBeInTheDocument();
    expect(screen.getByText("0 / 20 characters minimum")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Host field"), "Typed note");
    expect(onChange).toHaveBeenCalled();
    expect(document.querySelector("[data-lp-learning-text-field]")).toBeTruthy();
  });

  it("blocks paste and drop", () => {
    render(<LearningTextField prompt="Own words" minChars={10} />);
    const field = screen.getByLabelText("Own words");
    fireEvent.paste(field, { clipboardData: { getData: () => "pasted" } });
    expect(screen.getByRole("status")).toHaveTextContent("Paste is disabled");
    fireEvent.drop(field, { dataTransfer: { getData: () => "dropped" } });
    expect(screen.getByRole("status")).toHaveTextContent("Dropping text is disabled");
  });
});

describe("ShortResponse and Reflection", () => {
  it("renders prompt, textarea and default minChars counters", () => {
    const { rerender } = render(
      <ShortResponse prompt="Explain RFID briefly." />
    );
    expect(screen.getByLabelText("Explain RFID briefly.")).toBeInTheDocument();
    expect(screen.getByText("0 / 200 characters minimum")).toBeInTheDocument();
    expect(document.querySelector("textarea.lp-textarea")).toHaveAttribute("minlength", "200");

    rerender(<Reflection prompt="Reflect on IoT." />);
    expect(screen.getByLabelText("Reflect on IoT.")).toBeInTheDocument();
    expect(screen.getByText("0 / 500 characters minimum")).toBeInTheDocument();
    expect(document.querySelector("textarea.lp-textarea")).toHaveAttribute("minlength", "500");
  });

  it("updates the live counter while typing and honours content overrides", async () => {
    const user = userEvent.setup();
    render(
      <ShortResponse
        prompt="Cloud benefit"
        minChars={40}
      />
    );
    const field = screen.getByLabelText("Cloud benefit");
    await user.type(field, "Cloud scales storage.");
    expect(screen.getByText("21 / 40 characters minimum")).toBeInTheDocument();
    expect(document.querySelector("[data-lp-char-count]")).toHaveAttribute("data-lp-met", "false");
  });

  it("blocks paste and drop with a status notice", () => {
    render(<ShortResponse prompt="Write in your own words" minChars={10} />);
    const field = screen.getByLabelText("Write in your own words");

    fireEvent.paste(field, { clipboardData: { getData: () => "pasted" } });
    expect(screen.getByRole("status")).toHaveTextContent("Paste is disabled. Type your answer in your own words.");

    fireEvent.drop(field, { dataTransfer: { getData: () => "dropped" } });
    expect(screen.getByRole("status")).toHaveTextContent("Dropping text is disabled. Type your answer in your own words.");
    expect(field).toHaveValue("");
  });

  it("does not complete under minChars and completes unscored at or above minChars", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(
      <ShortResponse
        prompt="Explain one cloud benefit."
        minChars={40}
        guidance="Saved for revision."
        onResult={onResult}
      />
    );

    await user.type(screen.getByLabelText("Explain one cloud benefit."), "Too short.");
    await user.click(screen.getByRole("button", { name: "Save response" }));
    expect(screen.getByText("Write at least 40 characters. You currently have 10.")).toBeInTheDocument();
    expect(onResult).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText("Explain one cloud benefit."));
    await user.type(
      screen.getByLabelText("Explain one cloud benefit."),
      "Cloud computing lets a small business rent storage without buying servers."
    );
    await user.click(screen.getByRole("button", { name: "Save response" }));
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      completed: true,
      correct: null,
      responses: "Cloud computing lets a small business rent storage without buying servers.",
      attempts: 1
    }));
    expect(onResult.mock.calls.at(-1)?.[0].score).toBeUndefined();
    expect(screen.getByText("Saved for revision.")).toBeInTheDocument();
  });

  it("maps ActivityBlock content for both text types and composes unscored progress", async () => {
    const user = userEvent.setup();
    const results: Array<{ completed: boolean; correct: boolean | null }> = [];
    render(
      <InteractiveActivity
        activity={{
          id: "text-set",
          blocks: [
            {
              id: "short",
              type: "short-response",
              content: { prompt: "Short note", minChars: 20, guidance: "Saved." }
            },
            {
              id: "reflect",
              type: "reflection",
              content: { prompt: "Longer note", minimumCharacters: 25, guidance: "Saved." }
            }
          ]
        }}
        onResult={(result) => {
          results.push({ completed: result.completed, correct: result.correct });
        }}
      />
    );

    const shortField = screen.getByLabelText("Short note");
    const reflectionField = screen.getByLabelText("Longer note");
    fireEvent.change(shortField, {
      target: { value: "A short response that clears twenty." }
    });
    await user.click(document.querySelector("[data-lp-block='short-response'] .lp-button") as HTMLElement);
    fireEvent.change(reflectionField, {
      target: { value: "A longer reflection that clears twenty-five chars." }
    });
    await user.click(document.querySelector("[data-lp-block='reflection'] .lp-button") as HTMLElement);

    expect(results).toEqual([
      { completed: true, correct: null },
      { completed: true, correct: null }
    ]);
    expect(results.filter((item) => item.completed).length).toBe(2);
  });

  it("renders demo short-response and reflection fixtures", () => {
    const { rerender } = render(<InteractiveActivity activity={demoShortResponse} />);
    expect(screen.getByText("Cloud benefit")).toBeInTheDocument();
    expect(screen.getByLabelText(/Explain one benefit of cloud computing/)).toBeInTheDocument();

    rerender(<InteractiveActivity activity={demoReflection} />);
    expect(screen.getByText("IoT reflection")).toBeInTheDocument();
    expect(screen.getByText("0 / 500 characters minimum")).toBeInTheDocument();
  });
});

describe("Sequence", () => {
  it("reorders with named move buttons and keyboard arrows", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(
      <Sequence
        prompt="Arrange the RFID path."
        items={[
          { id: "tag", label: "RFID tag" },
          { id: "reader", label: "RFID reader" },
          { id: "network", label: "Network" }
        ]}
        correctOrder={["tag", "reader", "network"]}
        onResult={onResult}
      />
    );

    await user.click(screen.getByRole("button", { name: "Move RFID tag down" }));
    await user.click(screen.getByRole("button", { name: "Check order" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");

    await user.click(screen.getByRole("button", { name: "Try again" }));
    const tagRow = screen.getByRole("listitem", { name: /RFID tag, position 1/ });
    tagRow.focus();
    await user.keyboard("{ArrowDown}");
    await user.click(screen.getByRole("button", { name: "Move RFID tag up" }));
    await user.click(screen.getByRole("button", { name: "Check order" }));
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      correct: true,
      responses: { itemIds: ["tag", "reader", "network"] }
    }));
  });
});

describe("CompletionModal", () => {
  it("shows local completion summary and actions when the session layer opens it", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onNext = vi.fn();
    const onReview = vi.fn();
    render(
      <CompletionModal
        open
        completed
        title="Mission complete"
        score={{ correct: 92, total: 100 }}
        badge="RFID Specialist"
        attempts={2}
        onClose={onClose}
        onNext={onNext}
        onReview={onReview}
      />
    );
    expect(screen.getByRole("heading", { name: "Mission complete" })).toBeInTheDocument();
    expect(screen.getByText("92 / 100")).toBeInTheDocument();
    expect(screen.getByText("92 of 100 correct")).toBeInTheDocument();
    expect(screen.getByText("RFID Specialist")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "92% complete" })).toBeInTheDocument();
    expect(screen.getByText("2 attempts")).toBeInTheDocument();
    expect(screen.getByText(/not an official mark/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Review" }));
    expect(onReview).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onNext).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Close Mission complete" }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe("ProgressSummary", () => {
  it("renders score, badge and progress bar, deriving progress from score", () => {
    render(
      <ProgressSummary
        title="Mission complete"
        score={{ correct: 92, total: 100 }}
        badge="RFID Specialist"
      />
    );
    expect(screen.getByText("Mission complete")).toBeInTheDocument();
    expect(screen.getByText("92 / 100")).toBeInTheDocument();
    expect(screen.getByText("RFID Specialist")).toBeInTheDocument();
    const bar = screen.getByRole("progressbar", { name: "92% complete" });
    expect(bar).toHaveAttribute("value", "92");
    expect(bar).toHaveAttribute("max", "100");
  });

  it("uses an explicit progress fraction when provided", () => {
    render(
      <ProgressSummary
        score={{ correct: 1, total: 4 }}
        progress={0.5}
      />
    );
    expect(screen.getByRole("progressbar", { name: "50% complete" })).toHaveAttribute("value", "50");
    expect(screen.getByText("1 / 4")).toBeInTheDocument();
  });

  it("hides badge, bar and disclaimer when collapsed", () => {
    render(
      <ProgressSummary
        title="Practice progress"
        score={{ correct: 0, total: 57 }}
        badge="Week 1: Introduction"
        message="Check scored activities to update."
        completed={false}
        collapsed
      />
    );
    expect(screen.getByText("Practice progress")).toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();
    expect(screen.getByText("0 / 57")).toBeInTheDocument();
    expect(screen.getByText("0 of 57 correct")).toBeInTheDocument();
    expect(screen.queryByText("Week 1: Introduction")).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText(/not an official mark/)).not.toBeInTheDocument();
  });
});

describe("PracticeProgressPanel", () => {
  it("docks on the left and toggles collapsed details", async () => {
    const user = userEvent.setup();
    render(
      <PracticeProgressPanel
        title="Practice progress"
        score={{ correct: 0, total: 57 }}
        badge="Week 1: Introduction to New and Emerging Digital Technologies"
        message="Check scored activities to update. Formative practice only."
        completed={false}
        defaultCollapsed
      />
    );

    const panel = screen.getByRole("complementary", { name: "Practice progress" });
    expect(panel).toHaveAttribute("data-lp-docked", "left");
    expect(panel).toHaveAttribute("data-lp-collapsed", "true");
    expect(screen.getByText("0 / 57")).toBeInTheDocument();
    expect(screen.getByText("0 of 57 correct")).toBeInTheDocument();
    expect(screen.queryByText(/Week 1:/)).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: "Show progress details" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);

    expect(panel).toHaveAttribute("data-lp-collapsed", "false");
    expect(screen.getByRole("button", { name: "Hide progress details" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Week 1:/)).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "0% complete" })).toBeInTheDocument();
    expect(screen.getByText(/not an official mark/)).toBeInTheDocument();
  });
});

function DemoHarness() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 1 });
  return (
    <>
      <InteractiveActivity
        activity={demoOptionCards}
        onResult={(result) => {
          if (result.completed) {
            setScore(result.score || { correct: result.correct ? 1 : 0, total: 1 });
            setOpen(true);
          }
        }}
      />
      <CompletionModal open={open} score={score} attempts={1} onClose={() => setOpen(false)} />
    </>
  );
}

describe("content-driven catalogue demo", () => {
  it("renders demo blocks through ActivityBlock and can compose a completion modal", async () => {
    const user = userEvent.setup();
    render(<DemoHarness />);
    expect(screen.getByText("Cloud service choice")).toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: /Infrastructure as a Service/ }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(screen.getByRole("heading", { name: "Activity complete" })).toBeInTheDocument();
    expect(screen.getByText("1 / 1")).toBeInTheDocument();
    expect(screen.getByText("1 of 1 correct")).toBeInTheDocument();
  });

  it("maps drag-drop, phrase and sequence demo content to the matching components", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<InteractiveActivity activity={demoDragDrop} />);
    expect(screen.getByText("IoT placement")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Temperature sensor" }));
    expect(screen.getByText(/Selected: Temperature sensor/)).toBeInTheDocument();

    rerender(<InteractiveActivity activity={demoPhraseCompletion} />);
    expect(screen.getByText("IoT sentence")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sensor" })).toBeInTheDocument();

    rerender(<InteractiveActivity activity={demoSequence} />);
    expect(screen.getByRole("listitem", { name: /RFID tag, position 1/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Move RFID tag down" })).toBeInTheDocument();

    rerender(<InteractiveActivity activity={demoClassification} />);
    expect(screen.getByText("RFID and NFC uses")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Warehouse tracking" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Place in RFID" })).toBeInTheDocument();
  });
});

describe("Classification", () => {
  const items = [
    { id: "warehouse", label: "Warehouse tracking", correctCategoryId: "rfid" },
    { id: "payments", label: "Contactless payments", correctCategoryId: "nfc" },
    { id: "inventory", label: "Stock inventory", correctCategoryId: "rfid" }
  ];
  const categories = [
    { id: "rfid", label: "RFID" },
    { id: "nfc", label: "NFC" }
  ];

  it("places items, scores locally, shows feedback and retries", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(
      <Classification
        prompt="Put each use into the matching technology."
        items={items}
        categories={categories}
        feedback={{
          correct: "Warehouse and inventory uses are RFID; payments are NFC.",
          incorrect: "RFID is used at distance in warehouses."
        }}
        onResult={onResult}
      />
    );

    expect(screen.getByRole("button", { name: "Warehouse tracking" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Place in RFID" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Place in NFC" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Warehouse tracking" }));
    expect(screen.getByText(/Selected: Warehouse tracking/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Place in NFC" }));
    await user.click(screen.getByRole("button", { name: "Contactless payments" }));
    await user.click(screen.getByRole("button", { name: "Place in NFC" }));
    await user.click(screen.getByRole("button", { name: "Stock inventory" }));
    await user.click(screen.getByRole("button", { name: "Place in RFID" }));
    await user.click(screen.getByRole("button", { name: "Check types" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      completed: true,
      correct: false,
      score: { correct: 2, total: 3 },
      responses: {
        warehouse: "nfc",
        payments: "nfc",
        inventory: "rfid"
      }
    }));

    await user.click(screen.getByRole("button", { name: "Try again" }));
    await user.click(screen.getByRole("button", { name: "Warehouse tracking" }));
    await user.click(screen.getByRole("button", { name: "Place in RFID" }));
    await user.click(screen.getByRole("button", { name: "Contactless payments" }));
    await user.click(screen.getByRole("button", { name: "Place in NFC" }));
    await user.click(screen.getByRole("button", { name: "Stock inventory" }));
    await user.click(screen.getByRole("button", { name: "Place in RFID" }));
    await user.click(screen.getByRole("button", { name: "Check types" }));

    expect(document.querySelector("[data-lp-feedback-state='correct']")).toHaveTextContent(
      "Warehouse and inventory uses are RFID; payments are NFC."
    );
    expect(onResult).toHaveBeenLastCalledWith(expect.objectContaining({
      completed: true,
      correct: true,
      score: { correct: 3, total: 3 }
    }));
  });

  it("supports keyboard select-and-place", async () => {
    const user = userEvent.setup();
    render(
      <Classification
        prompt="Classify"
        items={[{ id: "warehouse", label: "Warehouse tracking", correctCategoryId: "rfid" }]}
        categories={[{ id: "rfid", label: "RFID" }]}
      />
    );
    const item = screen.getByRole("button", { name: "Warehouse tracking" });
    item.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText(/Selected: Warehouse tracking/)).toBeInTheDocument();
    const target = screen.getByRole("button", { name: "Place in RFID" });
    target.focus();
    expect(target).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: /Warehouse tracking · Placed/ })).toBeInTheDocument();
  });
});

describe("ActivityBlock", () => {
  it("keeps single-choice on OptionCards and classification on Classification", () => {
    const { rerender } = render(
      <ActivityBlock
        block={{
          id: "q1",
          type: "single-choice",
          content: {
            prompt: "Choose one",
            options: [{ id: "a", label: "Alpha" }]
          }
        }}
      />
    );
    expect(screen.getByRole("radio", { name: /Alpha/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Check answer" })).toBeInTheDocument();

    rerender(
      <ActivityBlock
        block={{
          id: "q2",
          type: "classification",
          content: {
            prompt: "Classify these",
            items: [{ id: "one", label: "One", correctCategoryId: "a" }],
            categories: [{ id: "a", label: "Group A" }]
          }
        }}
      />
    );
    expect(screen.getByRole("button", { name: "One" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Place in Group A" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Check types" })).toBeInTheDocument();
  });

  it("leaves unknown blocks to the HTML fallback when provided", () => {
    render(
      <InteractiveActivity
        activity={{
          id: "mixed",
          blocks: [
            {
              id: "q1",
              type: "single-choice",
              content: { prompt: "Choose", options: [{ id: "a", label: "Alpha" }] }
            },
            { id: "note", type: "matching", content: { prompt: "Match pairs" } }
          ]
        }}
        renderFallback={(block) => <p data-testid="html-fallback">{block.type}</p>}
      />
    );
    expect(screen.getByRole("radio", { name: /Alpha/ })).toBeInTheDocument();
    expect(screen.getByTestId("html-fallback")).toHaveTextContent("matching");
  });

  it("renders short-response and reflection as React catalogue blocks", () => {
    const { rerender } = render(
      <InteractiveActivity
        activity={{
          id: "short",
          blocks: [{ id: "note", type: "short-response", content: { prompt: "Explain RFID" } }]
        }}
        renderFallback={() => <p data-testid="html-fallback">fallback</p>}
      />
    );
    expect(screen.getByLabelText("Explain RFID")).toBeInTheDocument();
    expect(screen.queryByTestId("html-fallback")).not.toBeInTheDocument();
    expect(document.querySelector("[data-lp-block='short-response']")).toBeTruthy();

    rerender(
      <InteractiveActivity
        activity={{
          id: "reflect",
          blocks: [{ id: "journal", type: "reflection", content: { prompt: "Reflect on IoT" } }]
        }}
        renderFallback={() => <p data-testid="html-fallback">fallback</p>}
      />
    );
    expect(screen.getByLabelText("Reflect on IoT")).toBeInTheDocument();
    expect(screen.queryByTestId("html-fallback")).not.toBeInTheDocument();
    expect(document.querySelector("[data-lp-block='reflection']")).toBeTruthy();
  });
});
