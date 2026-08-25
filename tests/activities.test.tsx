import { render, screen } from "@testing-library/react";
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
  OptionCards,
  PhraseCompletion,
  ProgressSummary,
  Sequence,
  demoClassification,
  demoDragDrop,
  demoOptionCards,
  demoPhraseCompletion,
  demoSequence
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
            { id: "note", type: "short-response", content: { prompt: "Explain" } }
          ]
        }}
        renderFallback={(block) => <p data-testid="html-fallback">{block.type}</p>}
      />
    );
    expect(screen.getByRole("radio", { name: /Alpha/ })).toBeInTheDocument();
    expect(screen.getByTestId("html-fallback")).toHaveTextContent("short-response");
  });
});
