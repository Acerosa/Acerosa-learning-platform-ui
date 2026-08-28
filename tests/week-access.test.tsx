import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WeekAccessGuard, WeekAccessLink } from "../src/index";

const availableWeek = {
  id: "week-1",
  teachingWeek: 1,
  status: "available",
  title: "Week 1"
};

const plannedWeek = {
  id: "week-2",
  teachingWeek: 2,
  status: "planned",
  title: "Week 2"
};

const archivedWeek = {
  id: "week-4",
  teachingWeek: 4,
  status: "archived",
  title: "Week 4"
};

describe("WeekAccessLink", () => {
  it("renders a navigable link when the week is available", () => {
    render(
      <WeekAccessLink week={availableWeek} href="/week/1">
        Week 1
      </WeekAccessLink>
    );
    const link = screen.getByRole("link", { name: "Week 1" });
    expect(link).toHaveAttribute("href", "/week/1");
  });

  it("does not render learner navigation for planned weeks", () => {
    render(
      <WeekAccessLink week={plannedWeek} href="/week/2">
        Week 2
      </WeekAccessLink>
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Week 2")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Planned");
    expect(screen.getByText("Week 2").closest("[aria-disabled='true']")).not.toBeNull();
  });

  it("does not render learner navigation for archived weeks", () => {
    render(
      <WeekAccessLink week={archivedWeek} href="/week/4">
        Week 4
      </WeekAccessLink>
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("Archived");
  });

  it("does not render learner navigation for unknown statuses", () => {
    render(
      <WeekAccessLink week={{ id: "week-x", teachingWeek: 9, status: "draft" }} href="/week/9">
        Week 9
      </WeekAccessLink>
    );
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("supports routing-library injection through renderLink", () => {
    const renderLink = vi.fn(({ href, children, className }) => (
      <a href={href} className={className} data-router="custom">
        {children}
      </a>
    ));
    render(
      <WeekAccessLink week={availableWeek} href="/week/1" renderLink={renderLink}>
        Week 1
      </WeekAccessLink>
    );
    expect(renderLink).toHaveBeenCalledWith({
      href: "/week/1",
      children: "Week 1",
      className: "lp-text-link"
    });
    expect(screen.getByRole("link")).toHaveAttribute("data-router", "custom");
  });

  it("evaluates independent weeks without enforcing sequential release", () => {
    render(
      <ul>
        <li>
          <WeekAccessLink week={{ teachingWeek: 1, status: "available" }} href="/week/1">
            Week 1
          </WeekAccessLink>
        </li>
        <li>
          <WeekAccessLink week={{ teachingWeek: 2, status: "planned" }} href="/week/2">
            Week 2
          </WeekAccessLink>
        </li>
        <li>
          <WeekAccessLink week={{ teachingWeek: 3, status: "available" }} href="/week/3">
            Week 3
          </WeekAccessLink>
        </li>
      </ul>
    );
    expect(screen.getAllByRole("link").map((link) => link.textContent)).toEqual(["Week 1", "Week 3"]);
    expect(screen.getByText("Week 2").closest("[aria-disabled='true']")).not.toBeNull();
  });

  it("reads status from Content week metadata", () => {
    render(
      <WeekAccessLink
        week={{ id: "week-1", metadata: { teachingWeek: 1, status: "available", title: "Intro" } }}
        href="/week/1"
      >
        Intro
      </WeekAccessLink>
    );
    expect(screen.getByRole("link", { name: "Intro" })).toBeInTheDocument();
  });
});

describe("WeekAccessGuard", () => {
  it("renders children when the week is available", () => {
    render(
      <WeekAccessGuard week={availableWeek}>
        <main>Week page</main>
      </WeekAccessGuard>
    );
    expect(screen.getByText("Week page")).toBeInTheDocument();
  });

  it("renders the locked fallback for planned weeks", () => {
    render(
      <WeekAccessGuard week={plannedWeek}>
        <main>Week page</main>
      </WeekAccessGuard>
    );
    expect(screen.queryByText("Week page")).toBeNull();
    expect(screen.getByRole("heading", { name: "Week not available yet" })).toBeInTheDocument();
    expect(screen.getByText("This week has not been made available by your teacher.")).toBeInTheDocument();
  });

  it("stops rendering children when an available week becomes planned", () => {
    const { rerender } = render(
      <WeekAccessGuard week={availableWeek}>
        <main>Week page</main>
      </WeekAccessGuard>
    );
    expect(screen.getByText("Week page")).toBeInTheDocument();
    rerender(
      <WeekAccessGuard week={{ ...availableWeek, status: "planned" }}>
        <main>Week page</main>
      </WeekAccessGuard>
    );
    expect(screen.queryByText("Week page")).toBeNull();
    expect(screen.getByRole("heading", { name: "Week not available yet" })).toBeInTheDocument();
  });

  it("accepts a custom fallback presentation", () => {
    render(
      <WeekAccessGuard week={plannedWeek} fallback={<p>Custom locked week</p>}>
        <main>Week page</main>
      </WeekAccessGuard>
    );
    expect(screen.getByText("Custom locked week")).toBeInTheDocument();
  });
});
