import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  ActivityCard,
  Breadcrumbs,
  Callout,
  ContextPanel,
  EmptyState,
  ErrorState,
  HubShell,
  LearnerHeader,
  LearningOutcomeBadge,
  LoadingState,
  Navigation,
  ProgressCard,
  StatusBadge,
  WeekView
} from "../src/index";

const navigation = [
  { id: "home", label: "Home", path: "./" },
  { id: "learning", label: "Weeks", path: "./weeks/" },
  { id: "assignments", label: "Assignments", path: "./assignments/" },
  { id: "account", label: "Account", path: "./account/" }
];

describe("StatusBadge and Callout", () => {
  it("exposes status as text, not colour alone", () => {
    render(<StatusBadge status="available" />);
    expect(screen.getByRole("status")).toHaveTextContent("Available");
    expect(screen.getByRole("status")).toHaveClass("lp-status-badge--available");
  });

  it("marks error callouts as alerts", () => {
    render(<Callout tone="error" title="Problem" message="Try again." />);
    expect(screen.getByRole("alert")).toHaveTextContent("Problem");
  });
});

describe("cards and states", () => {
  it("uses start, resume and review labels from activity state", () => {
    const { rerender } = render(
      <ActivityCard title="Practice" href="./practice/" state="not-started" badge badgeStatus="available" />
    );
    expect(screen.getByRole("link")).toHaveTextContent("Start activity");
    expect(screen.getByText(/Status: Not started/)).toBeInTheDocument();
    rerender(<ActivityCard title="Practice" href="./practice/" state="in-progress" />);
    expect(screen.getByRole("link")).toHaveTextContent("Resume activity");
    rerender(<ActivityCard title="Practice" href="./practice/" state="completed" />);
    expect(screen.getByRole("link")).toHaveTextContent("Review activity");
  });

  it("exposes numeric progress accessibly", () => {
    render(<ProgressCard title="Course progress" completed={3} total={4} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "75% complete");
    expect(screen.getByText("3 of 4 complete (75%)")).toBeInTheDocument();
  });

  it("renders loading, empty and error states", () => {
    const { rerender } = render(<LoadingState message="Loading weeks" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading weeks");
    rerender(<EmptyState heading="Planned" message="Not yet added." action={{ label: "Back", href: "./weeks/" }} />);
    expect(screen.getByRole("heading", { name: "Planned" })).toBeInTheDocument();
    rerender(<ErrorState message="Try again later." />);
    expect(screen.getByRole("alert")).toHaveTextContent("Try again later.");
  });
});

describe("Navigation", () => {
  it("preserves supplied order and current page, and closes on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Navigation
        items={navigation}
        currentId="learning"
        brandTitle="Unit Hub"
        brandTagline="OCR Level 3 IT"
      />
    );
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual([
      "Unit HubOCR Level 3 IT",
      "Home",
      "Weeks",
      "Assignments",
      "Account"
    ]);
    expect(screen.getByRole("link", { name: "Weeks" })).toHaveAttribute("aria-current", "page");
    const toggle = screen.getByRole("button", { name: "Open main menu" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Open main menu" })).toHaveAttribute("aria-expanded", "false");
  });
});

describe("LearnerHeader", () => {
  it("hides when signed out and signs out when asked", async () => {
    const user = userEvent.setup();
    const onSignOut = vi.fn();
    const { rerender } = render(
      <LearnerHeader learner={null} hubName="Test Hub" onSignOut={onSignOut} />
    );
    expect(screen.getByLabelText("Learner account")).not.toBeVisible();
    rerender(
      <LearnerHeader
        learner={{ fullName: "Ada Lovelace", yearGroup: "Year 1", contactEmail: "ada@example.test" }}
        hubName="Test Hub"
        onSignOut={onSignOut}
      />
    );
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Test Hub")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Sign out" }));
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });
});

describe("WeekView", () => {
  it("composes assignment context, sessions, outcomes and activity HTML", () => {
    render(
      <WeekView
        week={{ id: "week-1", teachingWeek: 1, title: "Variables", status: "available" }}
        learningOutcomes={[{ id: "LO1", title: "Programming" }]}
        context={{
          type: "assignment",
          heading: "What you are learning and why",
          items: [{ label: "Assignment", value: "A1 Technical guide" }]
        }}
        sessions={[
          {
            id: "session-1",
            title: "Session 1",
            kind: "session",
            defaultOpen: true,
            activities: [{ html: '<article data-lp-activity="week-1-baseline">Diagnostic</article>' }]
          },
          {
            id: "study",
            title: "Independent study",
            kind: "independent-study",
            activities: [{ title: "Read", href: "./read/" }]
          }
        ]}
        features={{ showTitle: false, showProgress: false }}
        previousWeek={{ label: "Previous week", href: "./week-0/" }}
        nextWeek={{ label: "Week 2", href: "./week-2/" }}
      />
    );
    expect(screen.getByText("Teaching week 1")).toBeInTheDocument();
    expect(screen.getByText("LO1 Programming")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What you are learning and why" })).toBeInTheDocument();
    expect(screen.getByText("A1 Technical guide")).toBeInTheDocument();
    expect(document.querySelector('[data-lp-activity="week-1-baseline"]')).toHaveTextContent("Diagnostic");
    expect(screen.getByRole("heading", { name: "Independent study" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Week 2" })).toHaveAttribute("rel", "next");
  });

  it("hides independent study when the feature flag is off", () => {
    render(
      <WeekView
        week={{ id: "week-2", teachingWeek: 2, title: "Planned" }}
        sessions={[{ id: "study", title: "Independent study", kind: "independent-study", activities: [] }]}
        features={{ showIndependentStudy: false, showTitle: true }}
      />
    );
    expect(screen.queryByRole("heading", { name: "Independent study" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Planned teaching week" })).toBeInTheDocument();
  });
});

describe("HubShell", () => {
  it("provides landmarks, skip link and breadcrumbs", () => {
    render(
      <HubShell
        brandTitle="Unit 14 Hub"
        brandTagline="OCR Level 3 IT"
        navigation={navigation}
        currentId="learning"
        currentIds={["week-1", "learning"]}
        breadcrumbs={[{ label: "Home", path: "" }, { label: "Weeks", path: "weeks/" }, { label: "Week 1" }]}
        resolveHref={(path) => `./${path}`}
        pageHeader={{ title: "Week 1", subtitle: "Variables" }}
        footer={{ lines: ["Unit 14 Software Engineering for Business Hub"] }}
      >
        <p>Week body</p>
      </HubShell>
    );
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("banner")).toHaveClass("lp-shell__banner");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" }).querySelector("a")).toHaveAttribute("href", "./");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Unit 14");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Week 1" })).toBeInTheDocument();
  });
});

describe("supporting presentation", () => {
  it("renders outcome badges and context panels from data", () => {
    render(
      <>
        <LearningOutcomeBadge id="LO1" title="Programming" />
        <ContextPanel
          contextType="exam"
          heading="Examination focus"
          items={[{ label: "Paper", value: "Paper 1" }]}
        />
        <Breadcrumbs items={[{ label: "Home", href: "./" }, { label: "Help" }]} />
      </>
    );
    expect(screen.getByText("LO1 Programming")).toHaveClass("lp-outcome-badge");
    expect(screen.getByRole("heading", { name: "Examination focus" })).toBeInTheDocument();
    expect(document.querySelector("[data-context-type='exam']")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" }).querySelector("[aria-current='page']")).toHaveTextContent("Help");
  });
});
