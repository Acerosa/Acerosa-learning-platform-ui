import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import {
  InteractiveActivity,
  demoClassification,
  demoDragDrop,
  demoOptionCards,
  demoPhraseCompletion,
  demoSequence,
  demoShortResponse
} from "../src/index";
import type { ActivityDocument } from "../src/activities/types";

type Draft = {
  responses: Record<string, unknown>;
  checked: Record<string, boolean>;
};

function withVersion(activity: ActivityDocument): ActivityDocument {
  return { ...activity, version: "1.0.0" };
}

function createMockStore(initial: Draft = { responses: {}, checked: {} }) {
  let dirty = false;
  let state: Record<string, unknown> = { ...initial };
  const remoteSaves: unknown[] = [];
  const localSaves: unknown[] = [];
  return {
    remoteSaves,
    localSaves,
    isDirty: () => dirty,
    markDirty: () => { dirty = true; },
    load: () => state,
    save: (next: Record<string, unknown>, options?: { remote?: boolean; immediate?: boolean }) => {
      state = { ...state, ...next };
      if (options?.remote === false) {
        dirty = true;
        localSaves.push({ next, options });
        return state;
      }
      dirty = false;
      remoteSaves.push({ next, options });
      return state;
    },
    hydrate: async () => state,
    subscribe: () => () => {}
  };
}

function platformFor(store: ReturnType<typeof createMockStore>) {
  return {
    progress: {
      createStore() {
        return store;
      }
    }
  };
}

function DraftHarness({
  activity,
  store,
  questionId,
  remoteResponse
}: {
  activity: ActivityDocument;
  store: ReturnType<typeof createMockStore>;
  questionId: string;
  remoteResponse: unknown;
}) {
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  return (
    <>
      <button
        type="button"
        onClick={() => setResponses({ [questionId]: remoteResponse })}
      >
        inject-remote
      </button>
      <InteractiveActivity
        activity={withVersion(activity)}
        platform={platformFor(store)}
        initialResponses={responses}
      />
    </>
  );
}

describe("unsaved local state protection", () => {
  it("Classification: unsaved item-1 mapping is not overwritten by a newer remote restore", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <DraftHarness
        activity={demoClassification}
        store={store}
        questionId="rfid-nfc-uses"
        remoteResponse={{ warehouse: "rfid" }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Warehouse tracking" }));
    await user.click(screen.getByRole("button", { name: "Place in NFC" }));
    expect(store.isDirty()).toBe(true);
    expect(store.remoteSaves).toEqual([]);
    expect(screen.getByRole("button", { name: /Warehouse tracking · Placed · Return/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "inject-remote" }));
    expect(screen.getByRole("button", { name: /Warehouse tracking · Placed · Return/ })).toBeInTheDocument();
    const nfcCard = screen.getByRole("button", { name: "Place in NFC" }).closest(".lp-card");
    expect(nfcCard?.textContent).toContain("Warehouse tracking");
    const rfidCard = screen.getByRole("button", { name: "Place in RFID" }).closest(".lp-card");
    expect(rfidCard?.textContent).not.toContain("Warehouse tracking");
  });

  it("Classification: a clean activity still applies a remote restore", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <DraftHarness
        activity={demoClassification}
        store={store}
        questionId="rfid-nfc-uses"
        remoteResponse={{ warehouse: "rfid", payments: "nfc", inventory: "rfid" }}
      />
    );
    expect(store.isDirty()).toBe(false);
    expect(screen.getByRole("button", { name: "Warehouse tracking" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "inject-remote" }));
    expect(screen.queryByRole("button", { name: "Warehouse tracking" })).not.toBeInTheDocument();
    expect(screen.getByText("All items placed.")).toBeInTheDocument();
  });

  it("OptionCards: unsaved selection survives a newer remote restore", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <DraftHarness
        activity={demoOptionCards}
        store={store}
        questionId="cloud-models"
        remoteResponse="iaas"
      />
    );
    await user.click(screen.getByRole("radio", { name: /Software as a Service/ }));
    expect(store.isDirty()).toBe(true);
    expect(store.remoteSaves).toEqual([]);
    expect(screen.getByRole("radio", { name: /Software as a Service/ })).toBeChecked();
    await user.click(screen.getByRole("button", { name: "inject-remote" }));
    expect(screen.getByRole("radio", { name: /Software as a Service/ })).toBeChecked();
    expect(screen.getByRole("radio", { name: /Infrastructure as a Service/ })).not.toBeChecked();
  });

  it("OptionCards: a clean activity still applies a remote restore", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <DraftHarness
        activity={demoOptionCards}
        store={store}
        questionId="cloud-models"
        remoteResponse="iaas"
      />
    );
    await user.click(screen.getByRole("button", { name: "inject-remote" }));
    expect(screen.getByRole("radio", { name: /Infrastructure as a Service/ })).toBeChecked();
  });

  it("DragDrop: unsaved placement survives a newer remote restore", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <DraftHarness
        activity={demoDragDrop}
        store={store}
        questionId="iot-layers"
        remoteResponse={{ sensor: "cloud" }}
      />
    );
    await user.click(screen.getByRole("button", { name: "Temperature sensor" }));
    await user.click(screen.getByRole("button", { name: "Place on Edge / device" }));
    expect(store.isDirty()).toBe(true);
    expect(store.remoteSaves).toEqual([]);
    expect(screen.getByText(/Temperature sensor · Placed/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "inject-remote" }));
    expect(screen.getByText(/Temperature sensor · Placed/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Place on Edge \/ device \(replace Temperature sensor\)/ })).toBeInTheDocument();
  });

  it("PhraseCompletion: unsaved phrase survives a newer remote restore", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <DraftHarness
        activity={demoPhraseCompletion}
        store={store}
        questionId="iot-blank"
        remoteResponse={{ blank: "router" }}
      />
    );
    await user.click(screen.getByRole("button", { name: "Sensor" }));
    await user.click(screen.getByRole("button", { name: /missing term: empty/ }));
    expect(store.isDirty()).toBe(true);
    expect(store.remoteSaves).toEqual([]);
    expect(screen.getByRole("button", { name: /missing term: Sensor/ })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "inject-remote" }));
    expect(screen.getByRole("button", { name: /missing term: Sensor/ })).toBeInTheDocument();
  });

  it("Sequence: unsaved order survives a newer remote restore", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <DraftHarness
        activity={demoSequence}
        store={store}
        questionId="rfid-order"
        remoteResponse={["stock", "tag", "reader", "network", "database"]}
      />
    );
    const before = screen.getAllByRole("listitem").map((item) => item.textContent);
    await user.click(screen.getByRole("button", { name: "Move RFID tag down" }));
    expect(store.isDirty()).toBe(true);
    expect(store.remoteSaves).toEqual([]);
    const afterMove = screen.getAllByRole("listitem").map((item) => item.textContent);
    expect(afterMove).not.toEqual(before);
    await user.click(screen.getByRole("button", { name: "inject-remote" }));
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual(afterMove);
  });

  it("ShortResponse: unsaved typing survives a newer remote restore", async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <DraftHarness
        activity={demoShortResponse}
        store={store}
        questionId={demoShortResponse.blocks[0]?.id || "short"}
        remoteResponse="remote saved answer"
      />
    );
    const field = screen.getByRole("textbox");
    fireEvent.change(field, { target: { value: "local unsaved draft" } });
    expect(store.isDirty()).toBe(true);
    expect(store.remoteSaves).toEqual([]);
    expect(field).toHaveValue("local unsaved draft");
    await user.click(screen.getByRole("button", { name: "inject-remote" }));
    expect(screen.getByRole("textbox")).toHaveValue("local unsaved draft");
  });

  it("OptionCards: a clean remote Try Again clears checked feedback", async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      responses: { "cloud-models": "iaas" },
      checked: { "cloud-models": true }
    });
    function ResetHarness() {
      const [responses, setResponses] = useState<Record<string, unknown>>({ "cloud-models": "iaas" });
      const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({ "cloud-models": true });
      const [results, setResults] = useState<Record<string, { correct: boolean; canRetry: boolean }>>({
        "cloud-models": { correct: true, canRetry: true }
      });
      return (
        <>
          <button
            type="button"
            onClick={() => {
              setResponses({});
              setCheckedMap({});
              setResults({});
            }}
          >
            inject-reset
          </button>
          <InteractiveActivity
            activity={withVersion(demoOptionCards)}
            platform={platformFor(store)}
            initialResponses={responses}
            initialChecked={checkedMap}
            initialResults={results}
          />
        </>
      );
    }
    render(<ResetHarness />);
    expect(document.querySelector("[data-lp-feedback-state='correct']")).not.toBeNull();
    await user.click(screen.getByRole("button", { name: "inject-reset" }));
    expect(document.querySelector("[data-lp-feedback-state='correct']")).toBeNull();
    expect(screen.getByRole("radio", { name: /Infrastructure as a Service/ })).not.toBeChecked();
  });
});
