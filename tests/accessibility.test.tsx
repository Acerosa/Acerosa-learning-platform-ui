import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import {
  ActivityCard,
  Breadcrumbs,
  Callout,
  ErrorState,
  HubShell,
  Navigation,
  ProgressCard,
  StatusBadge,
  WeekView
} from "../src/index";

describe("accessibility", () => {
  it("passes axe on the shared learner chrome and week composition", async () => {
    const { container } = render(
      <HubShell
        brandTitle="Test Hub"
        navigation={[
          { id: "home", label: "Home", path: "./" },
          { id: "learning", label: "Weeks", path: "./weeks/" },
          { id: "account", label: "Account", path: "./account/" }
        ]}
        currentId="home"
        breadcrumbs={[{ label: "Home", href: "./" }, { label: "Week 1" }]}
        pageHeader={{ title: "Week 1", subtitle: "Variables" }}
        footer={{ lines: ["Test Hub"] }}
      >
        <StatusBadge status="available" />
        <Callout tone="info" title="Note" message="Shared callout." />
        <ProgressCard title="Progress" completed={1} total={3} />
        <ActivityCard title="Reflection" description="Describe what you learned." href="./activity/" />
        <ErrorState message="Try again." />
        <WeekView
          week={{ id: "week-1", teachingWeek: 1, title: "Variables", status: "available", headingLevel: 2 }}
          learningOutcomes={[{ id: "LO1", title: "Programming" }]}
          context={{
            type: "assignment",
            heading: "Assignment context",
            items: [{ label: "Assignment", value: "A1" }]
          }}
          sessions={[
            {
              id: "session-1",
              title: "Session 1",
              kind: "session",
              defaultOpen: true,
              activities: [{ title: "Starter", href: "./starter/" }]
            }
          ]}
          features={{ showProgress: false, showTitle: false }}
        />
      </HubShell>
    );
    document.documentElement.lang = "en-GB";
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } }
    });
    expect(results.violations, results.violations.map((item) => item.id).join(", ")).toHaveLength(0);
  });

  it("keeps the menu toggle keyboard operable", async () => {
    const user = userEvent.setup();
    render(
      <Navigation
        items={[{ id: "home", label: "Home", path: "./" }, { id: "help", label: "Help", path: "./help/" }]}
        brandTitle="Hub"
        currentId="home"
      />
    );
    const toggle = document.querySelector(".lp-navigation__toggle") as HTMLButtonElement;
    toggle.focus();
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
