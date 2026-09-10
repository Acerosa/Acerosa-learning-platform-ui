import { jsxs as d, jsx as n, Fragment as nt } from "react/jsx-runtime";
import { useId as Le, useState as T, useEffect as fe, useRef as we, useMemo as pe, useCallback as $e } from "react";
import { isUnsafeAuthoredHtml as at, resolveActivityVersion as st } from "@learning-platform/core";
import { isWeekAvailable as ct } from "@learning-platform/core/curriculum-runtime";
const lt = ["exam", "assignment", "project"], ot = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], Fe = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, $r = ["not-started", "in-progress", "completed"], xr = ["available", "planned", "progress", "completed"], it = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function dt(e = {}) {
  return { ...it, ...e };
}
function ut(e, t) {
  return t ? t === "assignment" ? e.showAssignmentContext !== !1 : t === "exam" ? e.showExamContext !== !1 : t === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function pt(e) {
  return e === "independent-study" || e === "homework";
}
function mt(e) {
  return ot.includes(e);
}
const ht = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, ft = {
  available: "Available",
  active: "Available",
  planned: "Planned",
  archived: "Archived",
  "coming-soon": "Planned",
  "not-started": "Not started",
  "in-progress": "In progress",
  progress: "In progress",
  completed: "Completed"
};
function gt(e) {
  return ht[e || ""] || "planned";
}
function Ue(e, t = "") {
  return ft[e || ""] || t || String(e || "Planned");
}
function yt(e, t = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : t;
}
function Ae({
  status: e = "planned",
  label: t,
  marker: r = !0
}) {
  const s = gt(e);
  return /* @__PURE__ */ d("span", { className: `lp-status-badge lp-status-badge--${s}`, role: "status", children: [
    r ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: "● " }) : null,
    t || Ue(e)
  ] });
}
function vt({
  title: e = "Untitled activity",
  description: t = "",
  activityType: r = "Activity",
  duration: s = "",
  status: a = "Not started",
  state: l,
  href: c,
  actionLabel: o,
  badge: i = !1,
  badgeStatus: h,
  headingLevel: u = 2,
  muted: f = !1
}) {
  const m = u === 3 ? "h3" : "h2", g = [r, s].filter(Boolean), N = l ? Ue(l, a) : a;
  return /* @__PURE__ */ d("article", { className: f ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": l || void 0, children: [
    i ? /* @__PURE__ */ n(
      Ae,
      {
        status: h || l || "planned",
        label: typeof a == "string" && a !== "Not started" ? a : void 0
      }
    ) : null,
    g.length ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: g.join(" · ") }) : null,
    /* @__PURE__ */ n(m, { children: e }),
    t ? /* @__PURE__ */ n("p", { children: t }) : null,
    /* @__PURE__ */ n("p", { className: "lp-card__meta", children: `Status: ${N}` }),
    c ? /* @__PURE__ */ n("div", { className: "lp-card__actions", children: /* @__PURE__ */ n("a", { className: "lp-button", href: c, children: o || yt(l) }) }) : null
  ] });
}
function bt(e, t) {
  return e.href ? e.href : e.path != null && t ? t(e.path) : e.path || void 0;
}
function Ct({ items: e = [], resolveHref: t }) {
  return e.length ? /* @__PURE__ */ n("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ n("ol", { className: "lp-breadcrumbs__list", children: e.map((r, s) => {
    const a = s === e.length - 1, l = bt(r, t);
    return /* @__PURE__ */ n("li", { children: a || !l ? /* @__PURE__ */ n("span", { "aria-current": "page", children: r.label }) : /* @__PURE__ */ n("a", { href: l, children: r.label }) }, `${r.label}-${s}`);
  }) }) }) : /* @__PURE__ */ n("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const Nt = ["info", "success", "warning", "error"];
function kt({ tone: e = "info", title: t, message: r }) {
  const s = Nt.includes(e) ? e : "info";
  return /* @__PURE__ */ d(
    "aside",
    {
      className: `lp-callout lp-callout--${s}`,
      role: s === "error" ? "alert" : void 0,
      children: [
        t ? /* @__PURE__ */ n("strong", { children: t }) : null,
        r ? /* @__PURE__ */ n("p", { children: r }) : null
      ]
    }
  );
}
function _t({
  contextType: e = "assignment",
  heading: t = "Context",
  items: r = [],
  description: s = "",
  action: a
}) {
  const l = lt.includes(e) ? e : "assignment", c = `lp-context-${l}`;
  return /* @__PURE__ */ d(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${l}`,
      "aria-labelledby": c,
      "data-context-type": l,
      children: [
        /* @__PURE__ */ n("h2", { id: c, children: t }),
        r.length ? /* @__PURE__ */ n("dl", { className: "lp-meta-list", children: r.map((o) => /* @__PURE__ */ d("div", { children: [
          /* @__PURE__ */ n("dt", { children: o.label }),
          /* @__PURE__ */ n("dd", { children: o.value })
        ] }, `${o.label}:${o.value}`)) }) : null,
        s ? /* @__PURE__ */ n("p", { children: s }) : null,
        a != null && a.label && (a != null && a.href) ? /* @__PURE__ */ n("p", { children: /* @__PURE__ */ n("a", { className: "lp-text-link", href: a.href, children: a.label }) }) : null
      ]
    }
  );
}
function Ve({
  heading: e = "Nothing to show yet",
  message: t = "Check again later.",
  action: r
}) {
  return /* @__PURE__ */ d("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ n("h2", { children: e }),
    /* @__PURE__ */ n("p", { children: t }),
    r != null && r.label && (r != null && r.href) ? /* @__PURE__ */ n("a", { className: "lp-button", href: r.href, children: r.label }) : null
  ] });
}
function Lr({
  heading: e = "There is a problem",
  message: t = "Try again."
}) {
  return /* @__PURE__ */ d("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ n("h2", { children: e }),
    /* @__PURE__ */ n("p", { children: t })
  ] });
}
function St({
  items: e,
  currentId: t = "home",
  currentIds: r = [],
  brandTitle: s,
  brandTagline: a,
  homeHref: l,
  theme: c = null,
  actions: o,
  listId: i
}) {
  const h = Le(), u = i || `lp-navigation-list-${h}`, [f, m] = T(!1), g = new Set([t, ...r].filter(Boolean)), N = e.find((y) => y.id === "home" && y.enabled !== !1), A = e.filter((y) => y.enabled !== !1);
  fe(() => {
    function y(E) {
      E.key === "Escape" && m(!1);
    }
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, []);
  function v(y) {
    if (y.key === "Escape") {
      m(!1);
      const E = y.currentTarget.querySelector(".lp-navigation__toggle");
      E == null || E.focus();
    }
  }
  return /* @__PURE__ */ n("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: v, children: /* @__PURE__ */ d("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ d("a", { className: "lp-navigation__brand", href: l || (N == null ? void 0 : N.path) || "./", children: [
      /* @__PURE__ */ n("span", { className: "lp-navigation__brand-title", children: s }),
      a ? /* @__PURE__ */ n("span", { className: "lp-navigation__brand-tagline", children: a }) : null
    ] }),
    /* @__PURE__ */ n(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": f,
        "aria-controls": u,
        "aria-label": f ? "Close main menu" : "Open main menu",
        onClick: () => m((y) => !y),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ n(
      "ul",
      {
        className: "lp-navigation__list",
        id: u,
        "data-open": f ? "true" : "false",
        children: A.map((y) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
          "a",
          {
            className: "lp-navigation__link",
            href: y.path,
            "aria-current": g.has(y.id) ? "page" : void 0,
            onClick: () => m(!1),
            children: y.label
          }
        ) }, y.id))
      }
    ),
    c ? /* @__PURE__ */ d("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ n(
        "select",
        {
          "aria-label": "Theme preference",
          value: c.preference,
          onChange: (y) => c.onChange(y.target.value),
          children: c.modes.map((y) => /* @__PURE__ */ n("option", { value: y, children: y[0].toUpperCase() + y.slice(1) }, y))
        }
      )
    ] }) : null,
    o ? /* @__PURE__ */ n("div", { className: "lp-navigation__actions", children: o }) : null
  ] }) });
}
function Pr({
  brandTitle: e,
  brandTagline: t,
  navigation: r,
  currentId: s = "home",
  currentIds: a = [],
  theme: l = null,
  actions: c,
  breadcrumbs: o,
  resolveHref: i,
  pageHeader: h,
  footer: u,
  learnerHeader: f,
  notice: m,
  skipLabel: g = "Skip to main content",
  mainId: N = "main-content",
  children: A
}) {
  const v = u && typeof u == "object" && "lines" in u ? u.lines.map((y) => /* @__PURE__ */ n("p", { children: y }, y)) : u;
  return /* @__PURE__ */ d("div", { className: "lp-shell", children: [
    /* @__PURE__ */ n("a", { className: "lp-skip-link skip-link", href: `#${N}`, children: g }),
    /* @__PURE__ */ n("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ n(
      St,
      {
        items: r,
        currentId: s,
        currentIds: a,
        brandTitle: e,
        brandTagline: t,
        theme: l,
        actions: c
      }
    ) }),
    /* @__PURE__ */ n("div", { className: "lp-shell__learner", children: f }),
    m,
    o ? /* @__PURE__ */ n(Ct, { items: o, resolveHref: i }) : null,
    h != null && h.title ? /* @__PURE__ */ d("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ n("h1", { children: h.title }),
      h.subtitle ? /* @__PURE__ */ n("p", { className: "lp-page-header__subtitle", children: h.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ n("main", { id: N, className: "lp-shell__main site-main", tabIndex: -1, children: A }),
    /* @__PURE__ */ n("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: v })
  ] });
}
function Rr({
  learner: e,
  hubName: t,
  accountHref: r = "./account/",
  onSignOut: s
}) {
  return e ? /* @__PURE__ */ d("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ d("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Learner" }),
        /* @__PURE__ */ n("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Year group" }),
        /* @__PURE__ */ n("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Email" }),
        /* @__PURE__ */ n("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Current hub" }),
        /* @__PURE__ */ n("dd", { children: t })
      ] })
    ] }),
    /* @__PURE__ */ d("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ n("a", { href: r, children: "Account" }),
      s ? /* @__PURE__ */ n("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        s();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ n("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function wt({ id: e, title: t }) {
  const r = [e, t].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ n("span", { className: "lp-outcome-badge", children: r });
}
function Fr({ message: e = "Loading…" }) {
  return /* @__PURE__ */ d("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ n("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { children: e })
  ] });
}
function At({
  title: e = "Progress",
  completed: t = 0,
  total: r = 0,
  description: s = ""
}) {
  const a = Math.max(0, Number(r) || 0), l = Math.min(a, Math.max(0, Number(t) || 0)), c = a ? Math.round(l / a * 100) : 0;
  return /* @__PURE__ */ d("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ n("h2", { children: e }),
    s ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: s }) : null,
    /* @__PURE__ */ n(
      "progress",
      {
        className: "lp-progress",
        max: a || 1,
        value: l,
        "aria-label": `${c}% complete`
      }
    ),
    /* @__PURE__ */ n("p", { children: `${l} of ${a} complete (${c}%)` })
  ] });
}
function It({
  id: e,
  title: t,
  kind: r = "session",
  summary: s = "",
  defaultOpen: a = !1,
  meta: l,
  children: c
}) {
  const o = mt(r) ? r : "session", i = Fe[o];
  return /* @__PURE__ */ d("details", { className: "lp-session lp-panel", id: e, "data-kind": o, open: a, children: [
    /* @__PURE__ */ n("summary", { className: "lp-session__summary", children: /* @__PURE__ */ d("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ n("h2", { className: "lp-session__heading", children: t || i }),
      /* @__PURE__ */ n("span", { className: "lp-session__meta", children: l || i })
    ] }) }),
    /* @__PURE__ */ d("div", { className: "lp-session__content", children: [
      s ? /* @__PURE__ */ n("p", { className: "lp-panel-note", children: s }) : null,
      /* @__PURE__ */ n("div", { className: "lp-activity-list", children: c })
    ] })
  ] });
}
function Tt({
  teachingWeek: e,
  title: t = "",
  subtitle: r = "",
  status: s,
  learningOutcomes: a = [],
  headingLevel: l = 1,
  showTitle: c = !0
}) {
  const o = e ? `Week ${e}${t ? `: ${t}` : ""}` : t || "Week";
  return /* @__PURE__ */ d("header", { className: "lp-week-header", children: [
    s ? /* @__PURE__ */ n(Ae, { status: s }) : null,
    c ? /* @__PURE__ */ n(l === 2 ? "h2" : "h1", { children: o }) : e ? /* @__PURE__ */ n("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    r ? /* @__PURE__ */ n("p", { className: "lp-week-header__subtitle", children: r }) : null,
    a.length ? /* @__PURE__ */ n("ul", { className: "lp-week-header__outcomes", children: a.map((h) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(wt, { id: h.id, title: h.title }) }, h.id || h.title)) }) : null
  ] });
}
function Et({ previousWeek: e, nextWeek: t }) {
  return !(e != null && e.href) && !(t != null && t.href) ? null : /* @__PURE__ */ n("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ d("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    t != null && t.href ? /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: "lp-text-link", href: t.href, rel: "next", children: t.label || "Next week" }) }) : null
  ] }) });
}
function Mt({ html: e, className: t, ...r }) {
  const s = e == null ? "" : String(e);
  return at(s) ? /* @__PURE__ */ n("div", { className: t, "data-lp-html-rejected": "true", ...r }) : /* @__PURE__ */ n("div", { className: t, dangerouslySetInnerHTML: { __html: s }, ...r });
}
function $t(e) {
  if (e.meta) return e.meta;
  const t = (e.activities || []).length, r = `${t} ${t === 1 ? "activity" : "activities"}`, s = Fe[e.kind || "session"] || Fe.session;
  return e.kind && e.kind !== "session" ? `${s} · ${r}` : r;
}
function xt(e, t) {
  return "html" in e && e.html ? /* @__PURE__ */ n(
    Mt,
    {
      className: "lp-activity-html",
      html: e.html
    },
    t
  ) : "children" in e && e.children ? /* @__PURE__ */ n("div", { children: e.children }, t) : /* @__PURE__ */ n(vt, { ...e }, t);
}
function Or({
  week: e = {},
  learningOutcomes: t = [],
  context: r = null,
  sessions: s = [],
  progress: a = null,
  previousWeek: l,
  nextWeek: c,
  features: o = {},
  renderActivity: i
}) {
  const h = dt(o), u = (r == null ? void 0 : r.type) || (r == null ? void 0 : r.contextType), f = s.filter((g) => !(h.showIndependentStudy === !1 && pt(g.kind))), m = i || xt;
  return /* @__PURE__ */ d("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ n(
      Tt,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: h.showLearningOutcomes ? t : [],
        headingLevel: e.headingLevel || 1,
        showTitle: h.showTitle !== !1
      }
    ),
    r && ut(h, u) ? /* @__PURE__ */ n(
      _t,
      {
        contextType: u,
        heading: r.heading,
        items: r.items,
        description: r.description,
        action: r.action
      }
    ) : null,
    f.length ? f.map((g) => /* @__PURE__ */ n(
      It,
      {
        id: g.id,
        title: g.title,
        kind: g.kind,
        summary: g.summary,
        defaultOpen: g.defaultOpen,
        meta: $t(g),
        children: (g.activities || []).map((N, A) => m(N, A))
      },
      g.id || g.title
    )) : /* @__PURE__ */ n(
      Ve,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    h.showProgress && a ? /* @__PURE__ */ n(At, { ...a }) : null,
    /* @__PURE__ */ n(Et, { previousWeek: l, nextWeek: c })
  ] });
}
const ye = {
  plannedHeading: "Week not available yet",
  plannedMessage: "This week has not been made available by your teacher.",
  archivedHeading: "Week not available",
  archivedMessage: "This week is no longer available to learners.",
  inaccessibleHeading: "Week not available",
  inaccessibleMessage: "This week is not available."
};
function je(e) {
  var t;
  return String(e.status ?? ((t = e.metadata) == null ? void 0 : t.status) ?? "").trim();
}
function Ge(e) {
  return ct(je(e));
}
function Lt(e) {
  const t = e.toLowerCase();
  return t === "planned" ? {
    heading: ye.plannedHeading,
    message: ye.plannedMessage
  } : t === "archived" ? {
    heading: ye.archivedHeading,
    message: ye.archivedMessage
  } : {
    heading: ye.inaccessibleHeading,
    message: ye.inaccessibleMessage
  };
}
function Pt({ href: e, children: t, className: r }) {
  return /* @__PURE__ */ n("a", { className: r, href: e, children: t });
}
function Br({
  week: e,
  href: t,
  children: r,
  className: s = "lp-text-link",
  lockedClassName: a = "lp-week-access-link lp-week-access-link--locked",
  renderLink: l = Pt
}) {
  if (Ge(e))
    return l({ href: t, children: r, className: s });
  const c = je(e);
  return /* @__PURE__ */ d("span", { className: a, "aria-disabled": "true", children: [
    /* @__PURE__ */ n("span", { className: "lp-week-access-link__label", children: r }),
    " ",
    /* @__PURE__ */ n(Ae, { status: c || "planned" })
  ] });
}
function jr({ week: e, children: t, fallback: r }) {
  if (Ge(e))
    return t;
  if (r != null)
    return r;
  const s = je(e), a = Lt(s);
  return /* @__PURE__ */ d("div", { className: "lp-week-access-guard", children: [
    /* @__PURE__ */ n(Ae, { status: s || "planned" }),
    /* @__PURE__ */ n(Ve, { heading: a.heading, message: a.message })
  ] });
}
const Rt = ["neutral", "correct", "incorrect", "informative", "hint"], Ft = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function be({
  state: e = "neutral",
  title: t,
  message: r
}) {
  const s = Rt.includes(e) ? e : "neutral", a = Ft[s];
  return !r && !t ? null : /* @__PURE__ */ n("div", { className: "lp-feedback", "data-lp-feedback-state": s, "data-lp-feedback": !0, children: /* @__PURE__ */ n(kt, { tone: a.tone, title: t || a.label, message: r }) });
}
const Oe = "Your answer could not be checked. Please try again.", Ot = "Your response has been recorded for review.";
function ge(e) {
  return typeof e == "function";
}
function Pe(e) {
  if (e && typeof e == "object" && "learnerMessage" in e) {
    const t = String(e.learnerMessage || "").trim();
    if (t) return t;
  }
  return Oe;
}
function ze() {
  return async () => {
    throw Object.assign(new Error(Oe), {
      code: "MARKING_UNAVAILABLE",
      learnerMessage: Oe
    });
  };
}
function Ce(e) {
  return !e.checked || e.serverCanRetry === !1 ? !1 : e.serverCanRetry === !0 ? !0 : e.localRetry && (typeof e.localMaxAttempts != "number" || e.attempts < e.localMaxAttempts);
}
function Ie(e, t, r) {
  return !!(e && t && !ge(r));
}
function Te(e, t, r = "Your response has been recorded.") {
  return e.requiresReview || e.status === "review" ? {
    status: "informative",
    message: Ot,
    correct: null,
    score: void 0,
    requiresReview: !0,
    completed: !0,
    itemResults: e.itemResults,
    canRetry: e.canRetry,
    checkNumber: e.checkNumber,
    remainingAttempts: e.remainingAttempts
  } : e.correct === !0 ? {
    status: "correct",
    message: (t == null ? void 0 : t.correct) || "That matches the expected option.",
    correct: !0,
    score: e.score,
    requiresReview: !1,
    completed: !0,
    itemResults: e.itemResults,
    canRetry: e.canRetry,
    checkNumber: e.checkNumber,
    remainingAttempts: e.remainingAttempts
  } : e.correct === !1 ? {
    status: "incorrect",
    message: (t == null ? void 0 : t.incorrect) || "Check the options and try again.",
    correct: !1,
    score: e.score,
    requiresReview: !1,
    completed: !0,
    itemResults: e.itemResults,
    canRetry: e.canRetry,
    checkNumber: e.checkNumber,
    remainingAttempts: e.remainingAttempts
  } : {
    status: "informative",
    message: r,
    correct: null,
    score: void 0,
    requiresReview: !1,
    completed: !!e.completed,
    itemResults: e.itemResults,
    canRetry: e.canRetry,
    checkNumber: e.checkNumber,
    remainingAttempts: e.remainingAttempts
  };
}
const Se = "Your answer was recorded.";
function xe(e) {
  if (!e.checked || !e.hasResponse) return null;
  const t = Te(
    { completed: !0, correct: e.correct ?? null },
    e.feedback,
    e.recordedMessage || Se
  );
  return {
    status: t.status,
    message: t.message,
    serverCorrect: t.correct
  };
}
function Ne(e, t, r) {
  return {
    completed: e.completed,
    correct: e.correct,
    score: e.score,
    attempts: t,
    responses: r,
    requiresReview: e.requiresReview,
    status: e.requiresReview ? "review" : e.correct === !0 ? "correct" : e.correct === !1 ? "incorrect" : "recorded",
    itemResults: e.itemResults,
    canRetry: e.canRetry,
    checkNumber: e.checkNumber,
    remainingAttempts: e.remainingAttempts
  };
}
async function De(e, t, r, s = "Your response has been recorded.") {
  try {
    return {
      ok: !0,
      marked: Te(await e(t), r, s)
    };
  } catch (a) {
    return { ok: !1, message: Pe(a) };
  }
}
const Bt = /^(correctOptionId|correctCategoryId|correctValues|answerKey|markScheme|modelAnswer|correctOptions|correctOrder|spec)$/;
function Be(e) {
  if (Array.isArray(e)) return e.map(Be);
  if (!e || typeof e != "object") return e;
  const t = {};
  for (const [r, s] of Object.entries(e))
    Bt.test(r) || r === "correct" && s && typeof s == "object" || (t[r] = Be(s));
  return t;
}
function jt(e) {
  return Be(e);
}
function Dt(e, t) {
  if (!e || typeof e != "object") return;
  const r = e.marking;
  if (!r || typeof r.markBlock != "function")
    return ze();
  const s = r.markBlock;
  return (a) => s({
    activityKey: t.id,
    activityVersion: a.activityVersion,
    block: jt(a.block),
    responses: a.responses,
    sourcePage: typeof window < "u" ? window.location.pathname : void 0
  });
}
function qt(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r += 1)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function Yt(e) {
  let t = qt(e) || 1;
  return () => {
    t |= 0, t = t + 1831565813 | 0;
    let r = Math.imul(t ^ t >>> 15, 1 | t);
    return r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r, ((r ^ r >>> 14) >>> 0) / 4294967296;
  };
}
function Ht(e, t) {
  const r = e.slice();
  if (r.length < 2) return r;
  const s = Yt(t);
  for (let a = r.length - 1; a > 0; a -= 1) {
    const l = Math.floor(s() * (a + 1)), c = r[a];
    r[a] = r[l], r[l] = c;
  }
  return r;
}
function We(e) {
  const t = [
    e.activityId,
    e.activityVersion,
    e.questionId,
    e.blockId,
    e.shuffleSalt
  ].map((r) => r == null ? "" : String(r).trim()).filter(Boolean);
  return t.length ? t.join("|") : "default";
}
function Ee(e, t, r = "default") {
  return !t || e.length < 2 ? e.slice() : Ht(e, r);
}
function Me(e) {
  const t = !!(e.initialChecked && e.hasResponse), r = xe({
    checked: t,
    hasResponse: e.hasResponse,
    correct: e.initialCorrect,
    feedback: e.feedback,
    recordedMessage: Se
  }), s = we("idle"), [a, l] = T((r == null ? void 0 : r.status) || "neutral"), [c, o] = T((r == null ? void 0 : r.message) || ""), [i, h] = T((r == null ? void 0 : r.serverCorrect) ?? null), [u, f] = T(e.initialCanRetry);
  return fe(() => {
    if (s.current === "live" || s.current === "retry" || !e.initialChecked || !e.hasResponse) return;
    const m = xe({
      checked: !0,
      hasResponse: !0,
      correct: e.initialCorrect,
      feedback: e.feedback,
      recordedMessage: Se
    });
    m && (l(m.status), o(m.message), h(m.serverCorrect), typeof e.initialCanRetry == "boolean" && f(e.initialCanRetry), (m.status === "correct" || m.status === "incorrect" || m.status === "informative") && (s.current = "restored"));
  }, [
    e.feedback,
    e.hasResponse,
    e.initialCanRetry,
    e.initialChecked,
    e.initialCorrect
  ]), {
    status: a,
    message: c,
    serverCorrect: i,
    serverCanRetry: u,
    setStatus: l,
    setMessage: o,
    setServerCorrect: h,
    setServerCanRetry: f,
    markLive: () => {
      s.current = "live";
    },
    markRetry: () => {
      s.current = "retry";
    }
  };
}
function Re(e) {
  return e == null ? !1 : typeof e == "string" || Array.isArray(e) ? e.length > 0 : typeof e == "object" ? Object.keys(e).length > 0 : !0;
}
function qe(e, t) {
  const [r, s] = T(Re(e) ? e : t), a = we(Re(e));
  return fe(() => {
    if (Re(e)) {
      a.current = !0, s(e);
      return;
    }
    a.current && (a.current = !1, s(t));
  }, [t, e]), [r, s];
}
function ke(e, t) {
  const [r, s] = T(!!(e && t));
  return fe(() => {
    if (e && t) {
      s(!0);
      return;
    }
    (e === !1 || !t) && s(!1);
  }, [t, e]), [r, s];
}
function _e(e) {
  return e.label || e.text || e.id;
}
function Kt(e, t, r, s, a, l, c, o) {
  if (!r) return "Placed";
  if (l) {
    const i = c == null ? void 0 : c.find((h) => h.itemId === e);
    return (i == null ? void 0 : i.correct) === !0 ? "Correct" : (i == null ? void 0 : i.correct) === !1 ? "Incorrect" : o || i != null && i.requiresReview ? "Recorded" : "Placed";
  }
  return s ? a[e] === t ? "Correct" : "Incorrect" : "Placed";
}
function Ut({
  id: e = "classification",
  title: t,
  prompt: r,
  instructions: s,
  items: a,
  categories: l,
  feedback: c,
  formative: o = !0,
  retry: i = !0,
  shuffle: h = !1,
  shuffleSeed: u,
  maxAttempts: f,
  initialAssignments: m = {},
  initialChecked: g = !1,
  initialCorrect: N,
  initialCanRetry: A,
  onMarkResponse: v,
  onResult: y
}) {
  const E = pe(
    () => Ee(a, h, u || e),
    [a, h, u, e]
  ), [k, $] = qe(m, {}), [O, V] = T(null), [W, G] = T(0), X = a.length > 0 && a.every((p) => m[p.id]), [x, M] = ke(g, X), [z, J] = T(!1), B = a.length > 0 && a.every((p) => k[p.id]), {
    status: ce,
    message: j,
    serverCanRetry: Q,
    setStatus: D,
    setMessage: re,
    setServerCorrect: K,
    setServerCanRetry: q,
    markLive: U,
    markRetry: Y
  } = Me({
    initialChecked: g,
    hasResponse: B,
    initialCorrect: N,
    initialCanRetry: A,
    feedback: c
  }), [H, ne] = T(), [ee, Z] = T(!1), le = Object.fromEntries(
    a.filter((p) => p.correctCategoryId).map((p) => [p.id, p.correctCategoryId])
  ), C = ge(v), F = Ie(o, Object.keys(le).length > 0, v), b = x || z, S = Ce({
    checked: x,
    localRetry: i,
    localMaxAttempts: f,
    attempts: W,
    serverCanRetry: Q
  }), I = E.filter((p) => !k[p.id]), R = E.find((p) => p.id === O);
  function ae(p) {
    y == null || y(p);
  }
  function se(p, P) {
    $((w) => ({ ...w, [p]: P })), V(null);
  }
  function L(p) {
    V((P) => P === p ? null : p);
  }
  function oe(p) {
    O && se(O, p);
  }
  function _(p) {
    $((P) => {
      const w = { ...P };
      return delete w[p], w;
    }), V(null);
  }
  async function ie() {
    if (z) return;
    if (!a.every((de) => k[de.id])) {
      D("informative"), re("Place every item in a category before checking.");
      return;
    }
    const P = W + 1, w = { ...k };
    if (C && v) {
      J(!0), D("informative"), re("Checking your answer…");
      try {
        const de = Te(
          await v(w),
          c,
          "Your categories have been recorded."
        );
        U(), G(P), M(!0), ne(de.itemResults), Z(de.requiresReview), K(de.correct), q(de.canRetry), D(de.status), re(de.message), ae(Ne(de, P, w));
      } catch (de) {
        M(!1), ne(void 0), Z(!1), K(null), q(!1), D("informative"), re(Pe(de)), ae({
          completed: !1,
          correct: null,
          attempts: P,
          responses: w,
          status: "error"
        });
      } finally {
        J(!1);
      }
      return;
    }
    const ue = F ? a.filter((de) => k[de.id] === le[de.id]).length : 0, he = F ? ue === a.length : null;
    U(), G(P), M(!0), ne(void 0), Z(!1), K(null), D(he === !0 ? "correct" : he === !1 ? "incorrect" : "informative"), re(F ? he ? (c == null ? void 0 : c.correct) || "Those items match the expected categories." : (c == null ? void 0 : c.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), ae({
      completed: !0,
      correct: he,
      score: F ? { correct: ue, total: a.length } : void 0,
      attempts: P,
      responses: w
    });
  }
  function te() {
    Y(), $({}), V(null), M(!1), J(!1), ne(void 0), Z(!1), K(null), q(void 0), D("neutral"), re(""), ae({ completed: !1, correct: null, attempts: W, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "classification",
      "data-lp-block-id": e,
      "aria-busy": z || void 0,
      children: [
        t ? /* @__PURE__ */ n("h3", { children: t }) : null,
        s ? /* @__PURE__ */ n("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: R ? `Selected: ${_e(R)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: b, children: [
          /* @__PURE__ */ n("legend", { children: r }),
          /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "Items" }),
          /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
            I.map((p) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": O === p.id,
                onClick: () => L(p.id),
                children: [
                  _e(p),
                  O === p.id ? " (selected)" : ""
                ]
              },
              p.id
            )),
            I.length === 0 ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] }),
          /* @__PURE__ */ n("div", { className: "lp-card-grid", children: l.map((p) => {
            const P = E.filter((w) => k[w.id] === p.id);
            return /* @__PURE__ */ d("div", { className: "lp-card", children: [
              /* @__PURE__ */ n("p", { children: /* @__PURE__ */ n("strong", { children: p.label }) }),
              /* @__PURE__ */ n("ul", { className: "lp-activity-list", children: P.map((w) => {
                const ue = Kt(
                  w.id,
                  p.id,
                  x,
                  F,
                  le,
                  C,
                  H,
                  ee
                );
                return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ d(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    onClick: () => _(w.id),
                    children: [
                      _e(w),
                      " · ",
                      ue,
                      b ? "" : " · Return"
                    ]
                  }
                ) }, w.id);
              }) }),
              P.length === 0 ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "No items yet" }) : null,
              /* @__PURE__ */ d(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  disabled: !O,
                  onClick: () => oe(p.id),
                  children: [
                    "Place in ",
                    _e(p)
                  ]
                }
              )
            ] }, p.id);
          }) }),
          /* @__PURE__ */ d("details", { children: [
            /* @__PURE__ */ n("summary", { children: "Use dropdown lists instead" }),
            E.map((p) => /* @__PURE__ */ d("p", { className: "lp-form__field", children: [
              /* @__PURE__ */ n("label", { htmlFor: `${e}-${p.id}`, children: _e(p) }),
              /* @__PURE__ */ d(
                "select",
                {
                  id: `${e}-${p.id}`,
                  "data-lp-item": p.id,
                  value: k[p.id] || "",
                  disabled: b,
                  onChange: (P) => {
                    const w = P.target.value;
                    $((ue) => {
                      const he = { ...ue };
                      return w ? he[p.id] = w : delete he[p.id], he;
                    }), V(null);
                  },
                  children: [
                    /* @__PURE__ */ n("option", { value: "", children: "Select a category" }),
                    l.map((P) => /* @__PURE__ */ n("option", { value: P.id, children: P.label }, P.id))
                  ]
                }
              )
            ] }, `list-${p.id}`))
          ] })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void ie(), disabled: b, children: z ? "Checking…" : "Check types" }),
          S ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: te, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(be, { state: ce, message: j })
      ]
    }
  );
}
function He(e) {
  return !!(e && Object.keys(e).length);
}
function Xe(e = {}) {
  const [t, r] = T({ ...e }), [s, a] = T(null), l = we(He(e));
  fe(() => {
    if (He(e)) {
      l.current = !0, r({ ...e });
      return;
    }
    l.current && (l.current = !1, r({}), a(null));
  }, [e]);
  const c = $e((u, f = t) => Object.keys(f).find((m) => f[m] === u) || null, [t]), o = $e((u) => {
    a((f) => f === u ? null : u);
  }, []), i = $e((u) => {
    if (!s) {
      const m = c(u);
      m && a(m);
      return;
    }
    const f = s;
    r((m) => {
      const g = { ...m }, N = Object.keys(g).find((A) => g[A] === u);
      return N && delete g[N], g[f] = u, g;
    }), a(null);
  }, [c, s]), h = $e(() => {
    r({}), a(null);
  }, []);
  return { placements: t, selectedItemId: s, selectItem: o, selectTarget: i, occupantOf: c, reset: h };
}
function Vt({
  id: e = "drag-drop",
  title: t,
  prompt: r,
  instructions: s,
  items: a,
  targets: l,
  correct: c = {},
  feedback: o,
  formative: i = !0,
  retry: h = !0,
  shuffle: u = !1,
  shuffleSeed: f,
  maxAttempts: m,
  initialPlacements: g = {},
  initialChecked: N = !1,
  initialCorrect: A,
  initialCanRetry: v,
  onMarkResponse: y,
  onResult: E
}) {
  var se;
  const k = pe(
    () => Ee(a, u, f || e),
    [a, u, f, e]
  ), { placements: $, selectedItemId: O, selectItem: V, selectTarget: W, occupantOf: G, reset: X } = Xe(g), [x, M] = T(0), z = a.length > 0 && a.every((L) => g[L.id]), [J, B] = ke(N, z), [ce, j] = T(!1), Q = a.length > 0 && a.every((L) => $[L.id]), {
    status: D,
    message: re,
    serverCanRetry: K,
    setStatus: q,
    setMessage: U,
    setServerCorrect: Y,
    setServerCanRetry: H,
    markLive: ne,
    markRetry: ee
  } = Me({
    initialChecked: N,
    hasResponse: Q,
    initialCorrect: A,
    initialCanRetry: v,
    feedback: o
  }), Z = ge(y), le = Ie(i, Object.keys(c).length > 0, y), C = J || ce, F = Ce({
    checked: J,
    localRetry: h,
    localMaxAttempts: m,
    attempts: x,
    serverCanRetry: K
  }), b = k.filter((L) => !$[L.id]), S = (se = k.find((L) => L.id === O)) == null ? void 0 : se.label;
  function I(L) {
    E == null || E(L);
  }
  async function R() {
    if (ce) return;
    if (!a.every((p) => $[p.id])) {
      q("informative"), U("Place every item before checking.");
      return;
    }
    const oe = x + 1, _ = { ...$ };
    if (Z && y) {
      j(!0), q("informative"), U("Checking your answer…");
      const p = await De(
        y,
        _,
        o,
        "Your placements have been recorded."
      );
      if (j(!1), !p.ok) {
        B(!1), Y(null), H(!1), q("informative"), U(p.message), I({ completed: !1, correct: null, attempts: oe, responses: _, status: "error" });
        return;
      }
      ne(), M(oe), B(!0), Y(p.marked.correct), H(p.marked.canRetry), q(p.marked.status), U(p.marked.message), I(Ne(p.marked, oe, _));
      return;
    }
    const ie = le ? a.filter((p) => $[p.id] === c[p.id]).length : 0, te = le ? ie === a.length : null;
    ne(), M(oe), B(!0), Y(null), q(te === !0 ? "correct" : te === !1 ? "incorrect" : "informative"), U(le ? te ? (o == null ? void 0 : o.correct) || "Those placements match the expected targets." : (o == null ? void 0 : o.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), I({
      completed: !0,
      correct: te,
      score: le ? { correct: ie, total: a.length } : void 0,
      attempts: oe,
      responses: _
    });
  }
  function ae() {
    ee(), X(), B(!1), j(!1), Y(null), H(void 0), q("neutral"), U(""), I({ completed: !1, correct: null, attempts: x, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "drag-drop",
      "data-lp-block-id": e,
      "aria-busy": ce || void 0,
      children: [
        t ? /* @__PURE__ */ n("h3", { children: t }) : null,
        s ? /* @__PURE__ */ n("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ n("p", { children: r }),
        /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: S ? `Selected: ${S}. Choose a target.` : "Select an item, then select a target to place it." }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: C, children: [
          /* @__PURE__ */ n("legend", { children: "Items" }),
          /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
            b.map((L) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": O === L.id,
                onClick: () => V(L.id),
                children: [
                  L.label,
                  O === L.id ? " (selected)" : ""
                ]
              },
              L.id
            )),
            b.length === 0 ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: C, children: [
          /* @__PURE__ */ n("legend", { children: "Targets" }),
          /* @__PURE__ */ n("div", { className: "lp-card-grid", children: l.map((L) => {
            const oe = G(L.id), _ = a.find((te) => te.id === oe), ie = J && le && oe && !Z ? c[oe] === L.id ? "Correct" : "Incorrect" : _ ? "Placed" : "Empty";
            return /* @__PURE__ */ d("div", { className: "lp-card", children: [
              /* @__PURE__ */ n("p", { children: /* @__PURE__ */ n("strong", { children: L.label }) }),
              /* @__PURE__ */ d("p", { className: "lp-card__meta", children: [
                _ ? _.label : "No item yet",
                " · ",
                ie
              ] }),
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  onClick: () => W(L.id),
                  children: _ ? `Place on ${L.label} (replace ${_.label})` : `Place on ${L.label}`
                }
              )
            ] }, L.id);
          }) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void R(), disabled: C, children: ce ? "Checking…" : "Check placement" }),
          F ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: ae, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(be, { state: D, message: re })
      ]
    }
  );
}
function Gt({
  id: e = "option-cards",
  title: t,
  prompt: r,
  instructions: s,
  options: a,
  correctOptionId: l,
  feedback: c,
  formative: o = !0,
  retry: i = !0,
  shuffle: h = !1,
  shuffleSeed: u,
  maxAttempts: f,
  initialSelectedId: m,
  initialChecked: g = !1,
  initialCorrect: N,
  initialCanRetry: A,
  onMarkResponse: v,
  onResult: y
}) {
  const E = pe(
    () => Ee(a, h, u || e),
    [a, h, u, e]
  ), [k, $] = qe(m || null, null), [O, V] = T(0), [W, G] = ke(g, !!m), [X, x] = T(!1), M = xe({
    checked: !!(g && m),
    hasResponse: !!m,
    correct: N,
    feedback: c,
    recordedMessage: Se
  }), z = we("idle"), [J, B] = T((M == null ? void 0 : M.status) || "neutral"), [ce, j] = T((M == null ? void 0 : M.message) || ""), [Q, D] = T((M == null ? void 0 : M.serverCorrect) ?? null), [re, K] = T(A);
  fe(() => {
    if (z.current === "live" || z.current === "retry" || !g || !k) return;
    const C = xe({
      checked: !0,
      hasResponse: !0,
      correct: N,
      feedback: c,
      recordedMessage: Se
    });
    C && (B(C.status), j(C.message), D(C.serverCorrect), typeof A == "boolean" && K(A), (C.status === "correct" || C.status === "incorrect") && (z.current = "restored"));
  }, [c, A, g, N, k]);
  const q = ge(v), U = Ie(o, !!l, v), Y = `lp-option-cards-${e}`, H = W || X, ne = Ce({
    checked: W,
    localRetry: i,
    localMaxAttempts: f,
    attempts: O,
    serverCanRetry: re
  });
  function ee(C) {
    y == null || y(C);
  }
  async function Z() {
    if (X) return;
    if (!k) {
      B("informative"), j("Choose an option before checking.");
      return;
    }
    const C = O + 1, F = { optionId: k };
    if (q && v) {
      x(!0), B("informative"), j("Checking your answer…");
      try {
        const I = Te(await v(F), c, "Your choice has been recorded.");
        z.current = "live", V(C), G(!0), D(I.correct), K(I.canRetry), B(I.status), j(I.message), ee(Ne(I, C, F));
      } catch (I) {
        G(!1), D(null), K(!1), B("informative"), j(Pe(I)), ee({
          completed: !1,
          correct: null,
          attempts: C,
          responses: F,
          status: "error"
        });
      } finally {
        x(!1);
      }
      return;
    }
    const b = U ? k === l : null, S = U ? b ? (c == null ? void 0 : c.correct) || "That matches the expected option." : (c == null ? void 0 : c.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    V(C), G(!0), z.current = "live", D(null), B(b === !0 ? "correct" : b === !1 ? "incorrect" : "informative"), j(S), ee({
      completed: !0,
      correct: b,
      score: U ? { correct: b ? 1 : 0, total: 1 } : void 0,
      attempts: C,
      responses: F
    });
  }
  function le() {
    z.current = "retry", $(null), G(!1), x(!1), D(null), K(void 0), B("neutral"), j(""), ee({
      completed: !1,
      correct: null,
      attempts: O,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "option-cards",
      "data-lp-block-id": e,
      "aria-busy": X || void 0,
      children: [
        t ? /* @__PURE__ */ n("h3", { children: t }) : null,
        s ? /* @__PURE__ */ n("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: H, children: [
          /* @__PURE__ */ n("legend", { children: r }),
          /* @__PURE__ */ n("div", { className: "lp-card-grid", children: E.map((C) => {
            const F = k === C.id, R = W && U && F || W && q && F && Q !== null ? (q ? Q === !0 : C.id === l) ? "Correct" : "Incorrect" : F ? "Selected" : "";
            return /* @__PURE__ */ d("label", { className: "lp-card lp-activity-card", children: [
              /* @__PURE__ */ n(
                "input",
                {
                  type: "radio",
                  name: Y,
                  value: C.id,
                  checked: F,
                  "data-lp-response": "",
                  onChange: () => $(C.id)
                }
              ),
              /* @__PURE__ */ d("span", { children: [
                /* @__PURE__ */ n("strong", { children: C.label }),
                C.description ? /* @__PURE__ */ d("span", { className: "lp-card__meta", children: [
                  " — ",
                  C.description
                ] }) : null
              ] }),
              C.imageSrc ? /* @__PURE__ */ n("img", { src: C.imageSrc, alt: C.imageAlt || C.label }) : null,
              R ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: R }) : null
            ] }, C.id);
          }) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void Z(), disabled: H, children: X ? "Checking…" : "Check answer" }),
          ne ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: le, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(be, { state: J, message: ce })
      ]
    }
  );
}
function zt(e, t) {
  var o;
  const r = [], s = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let a = 0, l = 0, c;
  for (; (c = s.exec(e)) !== null; ) {
    c.index > a && r.push(e.slice(a, c.index));
    const i = c[1] || ((o = t[l]) == null ? void 0 : o.id) || `gap-${l + 1}`;
    l += 1, r.push({ gapId: i }), a = c.index + c[0].length;
  }
  return a < e.length && r.push(e.slice(a)), !r.some((i) => typeof i != "string") && t[0] && (r.push(" "), r.push({ gapId: t[0].id })), r;
}
function Wt(e, t, r) {
  if (!e || !Object.keys(e).length) return {};
  const s = new Set(t.map((o) => o.id)), a = new Set(r.map((o) => o.id)), l = Object.keys(e), c = Object.values(e).map(String);
  if (l.every((o) => a.has(o)) && c.every((o) => s.has(o)))
    return { ...e };
  if (l.every((o) => s.has(o)) && c.every((o) => a.has(o))) {
    const o = {};
    for (const [i, h] of Object.entries(e))
      o[String(h)] = i;
    return o;
  }
  return { ...e };
}
function Xt({
  id: e = "phrase-completion",
  title: t,
  prompt: r,
  instructions: s,
  gaps: a,
  options: l,
  correctOptionId: c,
  feedback: o,
  formative: i = !0,
  retry: h = !0,
  shuffle: u = !1,
  shuffleSeed: f,
  maxAttempts: m,
  initialPlacements: g = {},
  initialChecked: N = !1,
  initialCorrect: A,
  initialCanRetry: v,
  onMarkResponse: y,
  onResult: E
}) {
  var oe;
  const k = pe(() => a && a.length ? a : [{ id: "gap", label: "missing term", correctOptionId: c || void 0 }], [c, a]), $ = pe(
    () => Ee(l, u, f || e),
    [l, u, f, e]
  ), O = pe(() => zt(r, k), [r, k]), V = pe(
    () => Wt(g, k, l),
    [g, l, k]
  ), { placements: W, selectedItemId: G, selectItem: X, selectTarget: x, occupantOf: M, reset: z } = Xe(V), [J, B] = T(0), [ce, j] = ke(N, Object.keys(V).length > 0), [Q, D] = T(!1), re = k.length > 0 && k.every((_) => !!M(_.id)), {
    status: K,
    message: q,
    serverCanRetry: U,
    setStatus: Y,
    setMessage: H,
    setServerCorrect: ne,
    setServerCanRetry: ee,
    markLive: Z,
    markRetry: le
  } = Me({
    initialChecked: N,
    hasResponse: re,
    initialCorrect: A,
    initialCanRetry: v,
    feedback: o
  }), C = Object.fromEntries(
    k.map((_) => [_.id, _.correctOptionId]).filter((_) => _[1])
  ), F = Ie(i, Object.keys(C).length > 0, y), b = ce || Q, S = Ce({
    checked: ce,
    localRetry: h,
    localMaxAttempts: m,
    attempts: J,
    serverCanRetry: U
  }), I = $.filter((_) => !W[_.id]), R = (oe = l.find((_) => _.id === G)) == null ? void 0 : oe.label;
  function ae(_) {
    E == null || E(_);
  }
  async function se() {
    if (Q) return;
    if (!k.every((w) => M(w.id))) {
      Y("informative"), H("Fill every blank before checking.");
      return;
    }
    const ie = J + 1, te = {};
    if (k.forEach((w) => {
      const ue = M(w.id);
      ue && (te[w.id] = ue);
    }), ge(y) && y) {
      D(!0), Y("informative"), H("Checking your answer…");
      const w = await De(
        y,
        te,
        o,
        "Your phrase has been recorded."
      );
      if (D(!1), !w.ok) {
        j(!1), ne(null), ee(!1), Y("informative"), H(w.message), ae({ completed: !1, correct: null, attempts: ie, responses: te, status: "error" });
        return;
      }
      Z(), B(ie), j(!0), ne(w.marked.correct), ee(w.marked.canRetry), Y(w.marked.status), H(w.marked.message), ae(Ne(w.marked, ie, te));
      return;
    }
    const p = F ? k.filter((w) => te[w.id] === C[w.id]).length : 0, P = F ? p === k.length : null;
    Z(), B(ie), j(!0), ne(null), Y(P === !0 ? "correct" : P === !1 ? "incorrect" : "informative"), H(F ? P ? (o == null ? void 0 : o.correct) || "That completes the phrase." : (o == null ? void 0 : o.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), ae({
      completed: !0,
      correct: P,
      score: F ? { correct: p, total: k.length } : void 0,
      attempts: ie,
      responses: te
    });
  }
  function L() {
    le(), z(), j(!1), D(!1), ne(null), ee(void 0), Y("neutral"), H(""), ae({ completed: !1, correct: null, attempts: J, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "fill-gap",
      "data-lp-block-id": e,
      "aria-busy": Q || void 0,
      children: [
        t ? /* @__PURE__ */ n("h3", { children: t }) : null,
        s ? /* @__PURE__ */ n("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: R ? `Selected: ${R}. Choose a blank.` : "Select a phrase, then select the blank." }),
        /* @__PURE__ */ n("p", { children: O.map((_, ie) => {
          if (typeof _ == "string") return /* @__PURE__ */ n("span", { children: _ }, `text-${ie}`);
          const te = M(_.gapId), p = l.find((ue) => ue.id === te), P = k.find((ue) => ue.id === _.gapId), w = ce && F && te ? C[_.gapId] === te ? "Correct" : "Incorrect" : p ? "Filled" : "Blank";
          return /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              disabled: b,
              "aria-label": `${(P == null ? void 0 : P.label) || "blank"}: ${(p == null ? void 0 : p.label) || "empty"}. ${w}`,
              onClick: () => x(_.gapId),
              children: (p == null ? void 0 : p.label) || "______"
            },
            _.gapId
          );
        }) }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: b, children: [
          /* @__PURE__ */ n("legend", { children: "Available phrases" }),
          /* @__PURE__ */ n("div", { className: "lp-card__actions", children: I.map((_) => /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              className: "lp-button",
              "aria-pressed": G === _.id,
              onClick: () => X(_.id),
              children: [
                _.label,
                G === _.id ? " (selected)" : ""
              ]
            },
            _.id
          )) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void se(), disabled: b, children: Q ? "Checking…" : "Check phrase" }),
          S ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: L, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(be, { state: K, message: q })
      ]
    }
  );
}
function Zt({
  id: e = "sequence",
  title: t,
  prompt: r,
  instructions: s,
  items: a,
  correctOrder: l = [],
  feedback: c,
  formative: o = !0,
  retry: i = !0,
  shuffle: h = !1,
  shuffleSeed: u,
  maxAttempts: f,
  initialOrder: m,
  initialChecked: g = !1,
  initialCorrect: N,
  initialCanRetry: A,
  onMarkResponse: v,
  onResult: y
}) {
  const E = pe(
    () => Ee(a, h, u || e),
    [a, h, u, e]
  ), k = pe(() => {
    if (!Array.isArray(m) || !m.length) return E;
    const b = new Map(a.map((I) => [I.id, I])), S = m.map((I) => b.get(I)).filter(Boolean);
    return S.length === a.length ? S : E;
  }, [E, m, a]), [$, O] = T(k);
  fe(() => {
    !Array.isArray(m) || !m.length || O(k);
  }, [m, k]);
  const [V, W] = T(0), [G, X] = ke(g, !!(m != null && m.length)), [x, M] = T(!1), z = $.length > 0, {
    status: J,
    message: B,
    serverCanRetry: ce,
    setStatus: j,
    setMessage: Q,
    setServerCorrect: D,
    setServerCanRetry: re,
    markLive: K,
    markRetry: q
  } = Me({
    initialChecked: g,
    hasResponse: z,
    initialCorrect: N,
    initialCanRetry: A,
    feedback: c
  }), U = ge(v), Y = Ie(o, l.length > 0, v), H = G || x, ne = Ce({
    checked: G,
    localRetry: i,
    localMaxAttempts: f,
    attempts: V,
    serverCanRetry: ce
  });
  function ee(b) {
    y == null || y(b);
  }
  function Z(b, S) {
    const I = b + S;
    if (I < 0 || I >= $.length) return;
    const R = $.slice(), [ae] = R.splice(b, 1);
    R.splice(I, 0, ae), O(R);
  }
  function le(b, S) {
    H || (b.key === "ArrowUp" && (b.preventDefault(), Z(S, -1)), b.key === "ArrowDown" && (b.preventDefault(), Z(S, 1)));
  }
  async function C() {
    if (x) return;
    const b = V + 1, S = $.map((se) => se.id), I = { itemIds: S };
    if (U && v) {
      M(!0), j("informative"), Q("Checking your answer…");
      const se = await De(
        v,
        I,
        c,
        "Your sequence has been recorded."
      );
      if (M(!1), !se.ok) {
        X(!1), D(null), re(!1), j("informative"), Q(se.message), ee({ completed: !1, correct: null, attempts: b, responses: I, status: "error" });
        return;
      }
      K(), W(b), X(!0), D(se.marked.correct), re(se.marked.canRetry), j(se.marked.status), Q(se.marked.message), ee(Ne(se.marked, b, I));
      return;
    }
    const R = Y ? S.filter((se, L) => se === l[L]).length : 0, ae = Y ? R === l.length && S.length === l.length : null;
    K(), W(b), X(!0), D(null), j(ae === !0 ? "correct" : ae === !1 ? "incorrect" : "informative"), Q(Y ? ae ? (c == null ? void 0 : c.correct) || "That order matches the expected sequence." : (c == null ? void 0 : c.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), ee({
      completed: !0,
      correct: ae,
      score: Y ? { correct: R, total: l.length } : void 0,
      attempts: b,
      responses: I
    });
  }
  function F() {
    q(), O(E), X(!1), M(!1), D(null), re(void 0), j("neutral"), Q(""), ee({
      completed: !1,
      correct: null,
      attempts: V,
      responses: { itemIds: E.map((b) => b.id) }
    });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "ordering",
      "data-lp-block-id": e,
      "aria-busy": x || void 0,
      children: [
        t ? /* @__PURE__ */ n("h3", { children: t }) : null,
        s ? /* @__PURE__ */ n("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ n("p", { children: r }),
        /* @__PURE__ */ n("ol", { className: "lp-activity-list", children: $.map((b, S) => /* @__PURE__ */ d(
          "li",
          {
            className: "lp-card",
            tabIndex: H ? -1 : 0,
            "aria-label": `${b.label}, position ${S + 1} of ${$.length}`,
            onKeyDown: (I) => le(I, S),
            children: [
              /* @__PURE__ */ n("p", { children: /* @__PURE__ */ d("strong", { children: [
                S + 1,
                ". ",
                b.label
              ] }) }),
              /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
                /* @__PURE__ */ d(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: H || S === 0,
                    onClick: () => Z(S, -1),
                    children: [
                      "Move ",
                      b.label,
                      " up"
                    ]
                  }
                ),
                /* @__PURE__ */ d(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: H || S === $.length - 1,
                    onClick: () => Z(S, 1),
                    children: [
                      "Move ",
                      b.label,
                      " down"
                    ]
                  }
                )
              ] })
            ]
          },
          b.id
        )) }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void C(), disabled: H, children: x ? "Checking…" : "Check order" }),
          ne ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: F, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(be, { state: J, message: B })
      ]
    }
  );
}
function me(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Jt(e) {
  var t;
  return (e == null ? void 0 : e.formative) === !0 || ((t = e == null ? void 0 : e.marking) == null ? void 0 : t.mode) === "formative-local";
}
function Qt(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function er(e) {
  if (!e || e.length !== 2) return !1;
  const t = e.map((r) => String(r.label || "").trim().toLowerCase()).sort();
  return t[0] === "false" && t[1] === "true";
}
function tr(e, t) {
  if ((e == null ? void 0 : e.shuffle) === !1 || (e == null ? void 0 : e.randomise) === !1 || me((t == null ? void 0 : t.presentation) ?? (e == null ? void 0 : e.presentation)) === "true-false") return !1;
  const s = (t == null ? void 0 : t.options) ?? (e == null ? void 0 : e.options);
  return !er(s);
}
const rr = [
  "single-choice",
  "option-cards",
  "classification",
  "drag-drop",
  "fill-gap",
  "phrase-completion",
  "ordering",
  "sequence",
  "short-response",
  "reflection"
], Ye = 200, nr = 500;
function Ze(e, t) {
  const r = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return r > 0 ? r : t;
}
function Je(e) {
  return rr.includes(me(e));
}
function ve(e) {
  var t;
  return ((t = e.content) == null ? void 0 : t.questionId) || e.id;
}
function ar({
  id: e,
  prompt: t,
  placeholder: r,
  value: s,
  defaultValue: a = "",
  minChars: l,
  minimumCharacters: c,
  defaultMinChars: o = Ye,
  rows: i = 4,
  disabled: h = !1,
  hidePrompt: u = !1,
  onChange: f
}) {
  const m = Le(), g = e || m, N = Ze({ minChars: l, minimumCharacters: c }, o), A = typeof s == "string", [v, y] = T(String(a || "")), [E, k] = T(""), $ = A ? s : v, O = $.trim().length, V = O >= N;
  function W(x) {
    A || y(x), f == null || f(x);
  }
  function G(x) {
    x.preventDefault(), k("Paste is disabled. Type your answer in your own words.");
  }
  function X(x) {
    x.preventDefault(), k("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ d("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ d("label", { className: "lp-field", htmlFor: g, children: [
      u ? /* @__PURE__ */ n("span", { className: "lp-visually-hidden", children: t }) : /* @__PURE__ */ n("span", { className: "lp-field__label", children: t }),
      /* @__PURE__ */ n(
        "textarea",
        {
          id: g,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(N),
          rows: i,
          value: $,
          placeholder: r,
          minLength: N,
          autoComplete: "off",
          disabled: h,
          "aria-describedby": `${g}-count ${g}-notice`,
          onChange: (x) => W(x.target.value),
          onPaste: G,
          onDrop: X
        }
      )
    ] }),
    /* @__PURE__ */ n(
      "p",
      {
        id: `${g}-count`,
        className: "lp-char-count",
        "data-lp-char-count": "",
        "data-lp-met": V ? "true" : "false",
        "aria-live": "polite",
        children: `${O} / ${N} characters minimum`
      }
    ),
    /* @__PURE__ */ n(
      "p",
      {
        id: `${g}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: E
      }
    )
  ] });
}
function sr(e, t) {
  return t > 0 ? `Write at least ${e} characters. You currently have ${t}.` : `Write at least ${e} characters before saving.`;
}
function Qe({
  id: e = "text-response",
  blockType: t = "short-response",
  title: r,
  prompt: s,
  instructions: a,
  guidance: l,
  placeholder: c,
  minChars: o,
  minimumCharacters: i,
  defaultMinChars: h = Ye,
  rows: u = 4,
  feedback: f,
  retry: m = !0,
  maxAttempts: g,
  initialResponse: N = "",
  initialChecked: A = !1,
  initialCorrect: v,
  initialCanRetry: y,
  saveLabel: E = "Save response",
  onMarkResponse: k,
  onResult: $
}) {
  const O = Ze({ minChars: o, minimumCharacters: i }, h), [V, W] = qe(String(N || ""), ""), [G, X] = T(0), [x, M] = ke(A, !!String(N || "").trim()), [z, J] = T(!1), B = V.trim(), ce = B.length, j = ce >= O, {
    status: Q,
    message: D,
    serverCanRetry: re,
    setStatus: K,
    setMessage: q,
    setServerCorrect: U,
    setServerCanRetry: Y,
    markLive: H,
    markRetry: ne
  } = Me({
    initialChecked: A,
    hasResponse: !!B,
    initialCorrect: v,
    initialCanRetry: y,
    feedback: f
  }), ee = ge(k), Z = x || z, le = Ce({
    checked: x,
    localRetry: m,
    localMaxAttempts: g,
    attempts: G,
    serverCanRetry: re
  });
  function C(S) {
    $ == null || $(S);
  }
  async function F() {
    if (z) return;
    if (!j) {
      K("informative"), q(sr(O, ce));
      return;
    }
    const S = G + 1;
    if (ee && k) {
      J(!0), K("informative"), q("Saving your response…");
      try {
        const R = Te(
          await k(B),
          f,
          l || "Your response has been recorded."
        );
        H(), X(S), M(!0), U(R.correct), Y(R.canRetry), K(R.status), q(R.requiresReview || R.correct !== null ? R.message : l || R.message), C(Ne(R, S, B));
      } catch (R) {
        M(!1), U(null), Y(!1), K("informative"), q(Pe(R)), C({
          completed: !1,
          correct: null,
          attempts: S,
          responses: B,
          status: "error"
        });
      } finally {
        J(!1);
      }
      return;
    }
    const I = l || (f == null ? void 0 : f.correct) || "Saved.";
    H(), X(S), M(!0), U(null), K("informative"), q(I), C({
      completed: !0,
      correct: null,
      attempts: S,
      responses: B
    });
  }
  function b() {
    ne(), W(""), M(!1), J(!1), U(null), Y(void 0), K("neutral"), q(""), C({
      completed: !1,
      correct: null,
      attempts: G,
      responses: ""
    });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive lp-form",
      "data-lp-block": t,
      "data-lp-block-id": e,
      "aria-busy": z || void 0,
      children: [
        r ? /* @__PURE__ */ n("h3", { children: r }) : null,
        a ? /* @__PURE__ */ n("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ n(
          ar,
          {
            id: `${e}-field`,
            prompt: s,
            placeholder: c,
            value: V,
            minChars: o,
            minimumCharacters: i,
            defaultMinChars: h,
            rows: u,
            disabled: Z,
            onChange: W
          }
        ),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void F(), disabled: Z, children: z ? "Saving…" : E }),
          le ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: b, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(be, { state: Q, message: D })
      ]
    }
  );
}
function cr({
  rows: e = 4,
  ...t
}) {
  return /* @__PURE__ */ n(
    Qe,
    {
      ...t,
      blockType: "short-response",
      defaultMinChars: Ye,
      rows: e
    }
  );
}
function lr({
  rows: e = 6,
  ...t
}) {
  return /* @__PURE__ */ n(
    Qe,
    {
      ...t,
      blockType: "reflection",
      defaultMinChars: nr,
      rows: e
    }
  );
}
function or(e, t) {
  const r = e.content || {}, s = me(r.presentation);
  return {
    id: e.id,
    instructions: r.instructions,
    feedback: r.feedback,
    formative: Jt(r),
    retry: Qt(r),
    shuffle: tr(r, { presentation: s, options: r.options }),
    shuffleSeed: t,
    maxAttempts: r.maxAttempts
  };
}
function Ke(e) {
  return typeof e == "string" ? e : void 0;
}
function ir({
  block: e,
  shuffleSeed: t,
  initialResponse: r,
  initialChecked: s,
  initialResult: a,
  onMarkResponse: l,
  onResult: c
}) {
  const o = me(e.type), i = e.content || {}, h = me(i.presentation), u = or(
    e,
    t || We({ questionId: ve(e), blockId: e.id })
  ), f = (m) => c == null ? void 0 : c(m, e);
  if (o === "single-choice" || o === "option-cards" || h === "option-cards" || h === "true-false" || h === "picture-quiz")
    return /* @__PURE__ */ n(
      Gt,
      {
        ...u,
        prompt: i.prompt || "Choose an option",
        options: i.options || [],
        correctOptionId: i.correctOptionId,
        initialSelectedId: typeof r == "string" ? r : void 0,
        initialChecked: s,
        initialCorrect: a == null ? void 0 : a.correct,
        initialCanRetry: a == null ? void 0 : a.canRetry,
        onMarkResponse: l,
        onResult: f
      }
    );
  if (o === "classification") {
    const m = r && typeof r == "object" && !Array.isArray(r) ? r : void 0;
    return /* @__PURE__ */ n(
      Ut,
      {
        ...u,
        prompt: i.prompt || "Classify each item",
        items: i.items || [],
        categories: i.categories || [],
        initialAssignments: m,
        initialChecked: s,
        initialCorrect: a == null ? void 0 : a.correct,
        initialCanRetry: a == null ? void 0 : a.canRetry,
        onMarkResponse: l,
        onResult: f
      }
    );
  }
  return o === "drag-drop" ? /* @__PURE__ */ n(
    Vt,
    {
      ...u,
      prompt: i.prompt || "Place each item",
      items: i.items || [],
      targets: i.targets || [],
      correct: i.correct,
      initialPlacements: r && typeof r == "object" && !Array.isArray(r) ? r : void 0,
      initialChecked: s,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: l,
      onResult: f
    }
  ) : o === "fill-gap" || o === "phrase-completion" ? /* @__PURE__ */ n(
    Xt,
    {
      ...u,
      prompt: i.prompt || "Complete the phrase",
      gaps: i.gaps,
      options: i.options || [],
      correctOptionId: i.correctOptionId,
      initialPlacements: r && typeof r == "object" && !Array.isArray(r) ? r : void 0,
      initialChecked: s,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: l,
      onResult: f
    }
  ) : o === "ordering" || o === "sequence" ? /* @__PURE__ */ n(
    Zt,
    {
      ...u,
      prompt: i.prompt || "Put the items in order",
      items: i.items || [],
      correctOrder: i.correctOrder,
      initialOrder: Array.isArray(r) ? r : void 0,
      initialChecked: s,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: l,
      onResult: f
    }
  ) : o === "short-response" ? /* @__PURE__ */ n(
    cr,
    {
      id: u.id,
      prompt: i.prompt || "Write your response",
      instructions: u.instructions,
      guidance: i.guidance,
      placeholder: i.placeholder,
      minChars: i.minChars,
      minimumCharacters: i.minimumCharacters,
      feedback: u.feedback,
      retry: u.retry,
      maxAttempts: u.maxAttempts,
      initialResponse: Ke(r),
      initialChecked: s,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: l,
      onResult: f
    }
  ) : o === "reflection" ? /* @__PURE__ */ n(
    lr,
    {
      id: u.id,
      prompt: i.prompt || "Write your reflection",
      instructions: u.instructions,
      guidance: i.guidance,
      placeholder: i.placeholder,
      minChars: i.minChars,
      minimumCharacters: i.minimumCharacters,
      feedback: u.feedback,
      retry: u.retry,
      maxAttempts: u.maxAttempts,
      initialResponse: Ke(r),
      initialChecked: s,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: l,
      onResult: f
    }
  ) : /* @__PURE__ */ d("p", { className: "lp-card__meta", "data-lp-block": o, children: [
    "This ",
    o || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function dr(e, t, r, s) {
  if (s === "local") return r;
  const a = r || Dt(e, t);
  return s === "server" && !a ? ze() : a;
}
function Dr({
  activity: e,
  initialResponses: t = {},
  initialChecked: r = {},
  initialResults: s = {},
  renderFallback: a,
  platform: l,
  markingMode: c,
  shuffleSalt: o,
  onMarkResponse: i,
  onResult: h
}) {
  var N, A;
  const [u, f] = T(0), m = st(e) || void 0, g = dr(l, e, i, c);
  return /* @__PURE__ */ d(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": m,
      children: [
        (N = e.metadata) != null && N.title ? /* @__PURE__ */ n("h3", { children: e.metadata.title }) : null,
        (A = e.metadata) != null && A.summary ? /* @__PURE__ */ n("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ n("div", { className: "lp-activity-list", children: (e.blocks || []).map((v) => {
          if (Je(v.type)) {
            const y = We({
              activityId: e.id,
              activityVersion: m,
              questionId: ve(v),
              blockId: v.id,
              shuffleSalt: o
            });
            return /* @__PURE__ */ n(
              ir,
              {
                block: v,
                shuffleSeed: y,
                initialResponse: t[ve(v)],
                initialChecked: !!r[ve(v)],
                initialResult: s[ve(v)],
                onMarkResponse: g ? (E) => g({
                  activityId: e.id,
                  activityVersion: m || "",
                  block: v,
                  responses: E
                }) : void 0,
                onResult: h
              },
              v.id
            );
          }
          return a ? /* @__PURE__ */ n("div", { children: a(v) }, v.id) : /* @__PURE__ */ d("p", { className: "lp-card__meta", "data-lp-block": me(v.type), children: [
            "This ",
            me(v.type) || "unknown",
            " block is not part of the React activity catalogue yet."
          ] }, v.id);
        }) }, u),
        /* @__PURE__ */ d("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => f((v) => v + 1),
              children: "Reset activity"
            }
          ),
          /* @__PURE__ */ n("p", { className: "lp-activity-status", "data-lp-activity-status": !0, role: "status", "aria-live": "polite" })
        ] })
      ]
    }
  );
}
function ur(e, t) {
  return typeof t == "number" && Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function et({
  title: e,
  badge: t,
  subtitle: r,
  score: s,
  progress: a,
  completed: l = !0,
  attempts: c,
  message: o,
  showStatus: i = !0,
  showDisclaimer: h = !0,
  collapsed: u = !1
}) {
  const f = t || r, m = ur(s, a), g = Math.round(m * 100), N = l ? "Completed" : "In progress", A = s ? `${s.correct} / ${s.total}` : null, v = s ? `${s.correct} of ${s.total} correct` : null, y = typeof c == "number" ? `${c} ${c === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ d(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": u ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ n("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ n("strong", { children: e }) }) : null,
        i ? /* @__PURE__ */ n(Ae, { status: l ? "completed" : "progress", label: N }) : null,
        A ? /* @__PURE__ */ n(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": v || void 0,
            children: A
          }
        ) : null,
        v ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: v }) : null,
        !u && f ? /* @__PURE__ */ n("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ n("strong", { children: f }) }) : null,
        u ? null : /* @__PURE__ */ d(nt, { children: [
          /* @__PURE__ */ n(
            "progress",
            {
              className: "lp-progress",
              max: 100,
              value: g,
              "aria-label": `${g}% complete`
            }
          ),
          /* @__PURE__ */ d("p", { className: "lp-card__meta", children: [
            g,
            "% complete"
          ] }),
          y ? /* @__PURE__ */ n("p", { children: y }) : null,
          o ? /* @__PURE__ */ n("p", { children: o }) : null,
          h ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function pr(e, t) {
  if (e)
    try {
      t && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !t && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      t ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function qr({
  open: e = !1,
  title: t = "Activity complete",
  completed: r = !0,
  score: s,
  badge: a,
  subtitle: l,
  progress: c,
  attempts: o,
  message: i,
  onClose: h,
  onReview: u,
  onNext: f,
  nextLabel: m = "Continue",
  reviewLabel: g = "Review"
}) {
  const N = we(null), A = Le();
  return fe(() => {
    pr(N.current, e);
  }, [e]), e ? /* @__PURE__ */ d(
    "dialog",
    {
      ref: N,
      className: "lp-dialog",
      "aria-labelledby": A,
      onCancel: (v) => {
        v.preventDefault(), h == null || h();
      },
      children: [
        /* @__PURE__ */ d("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ n("h2", { id: A, children: t }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${t}`,
              onClick: h,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ n(
            et,
            {
              completed: r,
              score: s,
              badge: a,
              subtitle: l,
              progress: c,
              attempts: o,
              message: i
            }
          ),
          /* @__PURE__ */ d("div", { className: "lp-form__actions", children: [
            u ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: u, children: g }) : null,
            f ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: f, children: m }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const mr = (e) => ({
  position: "fixed",
  zIndex: 40,
  left: "max(0.75rem, env(safe-area-inset-left, 0px))",
  bottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
  width: e ? "min(13.5rem, calc(100vw - 1.5rem))" : "min(18rem, calc(100vw - 1.5rem))",
  maxHeight: "min(70vh, 28rem)",
  overflow: "auto",
  margin: 0,
  padding: "0.75rem 1rem",
  boxSizing: "border-box",
  boxShadow: "var(--lp-shadow)",
  border: "0.0625rem solid var(--lp-border)",
  borderRadius: "var(--lp-radius)",
  background: "var(--lp-surface)",
  color: "var(--lp-text)"
});
function Yr({
  collapsed: e,
  defaultCollapsed: t = !0,
  onCollapsedChange: r,
  expandLabel: s = "Show progress details",
  collapseLabel: a = "Hide progress details",
  ...l
}) {
  const [c, o] = T(t), i = typeof e == "boolean" ? e : c, h = Le(), u = l.title || "Practice progress";
  function f(m) {
    typeof e != "boolean" && o(m), r == null || r(m);
  }
  return /* @__PURE__ */ d(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: mr(i),
      "aria-label": u,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": i ? "true" : "false",
      children: [
        /* @__PURE__ */ n("div", { id: h, children: /* @__PURE__ */ n(et, { ...l, title: u, collapsed: i }) }),
        /* @__PURE__ */ n("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !i,
            "aria-controls": h,
            onClick: () => f(!i),
            children: i ? s : a
          }
        ) })
      ]
    }
  );
}
const hr = {
  id: "demo-option-cards",
  metadata: {
    title: "Cloud service choice",
    summary: "A knowledge check using option cards."
  },
  blocks: [
    {
      id: "cloud-models",
      type: "single-choice",
      content: {
        presentation: "option-cards",
        formative: !0,
        retry: !0,
        prompt: "Which cloud model lets an organisation rent virtual machines and control the operating system?",
        options: [
          { id: "saas", label: "Software as a Service", description: "Ready-made applications" },
          { id: "paas", label: "Platform as a Service", description: "Runtime and tooling" },
          { id: "iaas", label: "Infrastructure as a Service", description: "Compute, storage and networking" }
        ],
        correctOptionId: "iaas",
        feedback: {
          correct: "IaaS provides virtualised infrastructure.",
          incorrect: "Think about who manages the operating system."
        }
      }
    }
  ]
}, fr = {
  id: "demo-true-false",
  metadata: { title: "NFC range check" },
  blocks: [
    {
      id: "nfc-range",
      type: "single-choice",
      content: {
        presentation: "true-false",
        formative: !0,
        retry: !0,
        prompt: "NFC is intended for very short-range communication, typically a few centimetres.",
        options: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctOptionId: "true"
      }
    }
  ]
}, gr = {
  id: "demo-drag-drop",
  metadata: { title: "IoT placement" },
  blocks: [
    {
      id: "iot-layers",
      type: "drag-drop",
      content: {
        formative: !0,
        retry: !0,
        prompt: "Place each technology on the layer where it usually sits.",
        items: [
          { id: "sensor", label: "Temperature sensor" },
          { id: "gateway", label: "IoT gateway" },
          { id: "vm", label: "Cloud virtual machine" }
        ],
        targets: [
          { id: "edge", label: "Edge / device" },
          { id: "network", label: "Network" },
          { id: "cloud", label: "Cloud" }
        ],
        correct: {
          sensor: "edge",
          gateway: "network",
          vm: "cloud"
        },
        feedback: {
          correct: "Those layers match a simple IoT path.",
          incorrect: "Sensors sit at the edge; virtual machines sit in the cloud."
        }
      }
    }
  ]
}, yr = {
  id: "demo-phrase-completion",
  metadata: { title: "IoT sentence" },
  blocks: [
    {
      id: "iot-blank",
      type: "fill-gap",
      content: {
        formative: !0,
        retry: !0,
        prompt: "An IoT device collects information using a {blank}.",
        gaps: [{ id: "blank", label: "missing term", correctOptionId: "sensor" }],
        options: [
          { id: "sensor", label: "Sensor" },
          { id: "router", label: "Router" },
          { id: "monitor", label: "Monitor" }
        ],
        feedback: {
          correct: "A sensor collects the physical measurement.",
          incorrect: "The missing term is the device that collects the measurement."
        }
      }
    }
  ]
}, vr = {
  id: "demo-sequence",
  metadata: { title: "RFID path" },
  blocks: [
    {
      id: "rfid-order",
      type: "ordering",
      content: {
        formative: !0,
        retry: !0,
        prompt: "Arrange the RFID stock path in order.",
        items: [
          { id: "tag", label: "RFID tag" },
          { id: "reader", label: "RFID reader" },
          { id: "network", label: "Network" },
          { id: "database", label: "Database" },
          { id: "stock", label: "Stock system" }
        ],
        correctOrder: ["tag", "reader", "network", "database", "stock"],
        feedback: {
          correct: "The tag is read, then the data moves across the network into stock systems.",
          incorrect: "Start with the tag, then the reader."
        }
      }
    }
  ]
}, br = {
  id: "demo-classification",
  metadata: { title: "RFID and NFC uses" },
  blocks: [
    {
      id: "rfid-nfc-uses",
      type: "classification",
      content: {
        formative: !0,
        retry: !0,
        prompt: "Put each use into the matching technology.",
        categories: [
          { id: "rfid", label: "RFID" },
          { id: "nfc", label: "NFC" }
        ],
        items: [
          { id: "warehouse", label: "Warehouse tracking", correctCategoryId: "rfid" },
          { id: "payments", label: "Contactless payments", correctCategoryId: "nfc" },
          { id: "inventory", label: "Stock inventory", correctCategoryId: "rfid" }
        ],
        feedback: {
          correct: "Warehouse and inventory uses are RFID; payments are NFC.",
          incorrect: "RFID is used at distance in warehouses. NFC is short-range, such as payments."
        }
      }
    }
  ]
}, Cr = {
  id: "demo-short-response",
  metadata: {
    title: "Cloud benefit",
    summary: "A short written response with a minimum length."
  },
  blocks: [
    {
      id: "cloud-benefit",
      type: "short-response",
      content: {
        prompt: "Explain one benefit of cloud computing for a small business.",
        instructions: "Type your answer in your own words. Paste and drop are disabled.",
        guidance: "Saved. Keep this explanation for revision.",
        minChars: 40,
        placeholder: "Start with the benefit, then say why it matters."
      }
    }
  ]
}, Nr = {
  id: "demo-reflection",
  metadata: {
    title: "IoT reflection",
    summary: "A longer reflection with the default minimum length."
  },
  blocks: [
    {
      id: "iot-reflection",
      type: "reflection",
      content: {
        prompt: "Reflect on how sensors, networks and cloud services work together in an IoT system.",
        guidance: "Saved. Use this reflection when you review the topic.",
        placeholder: "Describe the journey from sensor reading to stored data."
      }
    }
  ]
}, Hr = [
  hr,
  fr,
  gr,
  yr,
  vr,
  br,
  Cr,
  Nr
];
function kr(e) {
  const t = me(e.type);
  return t === "single-choice" || t === "option-cards" || t === "classification" || t === "drag-drop" || t === "fill-gap" || t === "phrase-completion" || t === "ordering" || t === "sequence";
}
function _r(e) {
  return Je(e.type);
}
function Sr(e) {
  return ((e == null ? void 0 : e.blocks) || []).filter((t) => _r(t)).map((t) => ve(t));
}
function tt(e, t) {
  const r = Sr(e);
  return !r.length || !t ? !1 : r.every((s) => !!t[s]);
}
function wr(e, t) {
  return tt(e, t);
}
function Kr(e, t) {
  let r = 0;
  for (const s of e)
    tt(s, t) && (r += 1);
  return r;
}
function Ur(e, t) {
  let r = 0;
  for (const s of e)
    s != null && s.id && wr(s, t[s.id]) && (r += 1);
  return r;
}
function Vr(e, t) {
  return `${e} / ${t} ${t === 1 ? "activity" : "activities"} completed`;
}
function Gr(e) {
  if (!kr(e)) return 0;
  const t = me(e.type);
  return t === "classification" ? (e.content && e.content.items || []).length : t === "drag-drop" ? (e.content && e.content.items || []).length : t === "fill-gap" || t === "phrase-completion" ? (e.content && e.content.gaps || []).length || 1 : t === "ordering" || t === "sequence" ? (e.content && e.content.items || []).length : 1;
}
function zr() {
  return { completed: {}, scores: {} };
}
function Wr(e, t, r) {
  const s = { ...e.completed }, a = { ...e.scores };
  return r.completed ? (s[t] = !0, r.score && r.score.total > 0 && !r.requiresReview ? a[t] = r.score : delete a[t], { completed: s, scores: a }) : r.status === "error" ? e : (delete s[t], delete a[t], { completed: s, scores: a });
}
function Xr(e, t) {
  return t.length > 0 && t.every((r) => e.completed[r]);
}
function Zr(e, t) {
  var s;
  if (!e.completed) return !1;
  const r = ((s = e.score) == null ? void 0 : s.total) || 0;
  return t.complete || t.completedCount >= 2 || r >= 2;
}
function Jr(e, t) {
  const r = Object.values(e.completed).filter(Boolean).length, s = Object.values(e.scores).reduce(
    (l, c) => ({
      correct: l.correct + c.correct,
      total: l.total + c.total
    }),
    { correct: 0, total: 0 }
  ), a = Math.max(0, t.requiredBlocks);
  return {
    completedCount: r,
    requiredBlocks: a,
    completion: a > 0 ? Math.min(1, r / a) : 0,
    score: {
      correct: s.correct,
      total: Math.max(t.scorableTotal, s.total, 0)
    },
    complete: a > 0 && r >= a
  };
}
const rt = /* @__PURE__ */ new Set(["correct", "incorrect", "review", "recorded", "error"]);
function Ar(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, r = {
    correct: t.correct === !0 ? !0 : t.correct === !1 ? !1 : null
  };
  return typeof t.canRetry == "boolean" && (r.canRetry = t.canRetry), typeof t.status == "string" && rt.has(t.status) && (r.status = t.status), r;
}
function Qr(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return {};
  const t = {};
  for (const [r, s] of Object.entries(e)) {
    const a = Ar(s);
    a && (t[r] = a);
  }
  return t;
}
function en(e) {
  const t = typeof e.status == "string" && rt.has(e.status) ? e.status : e.requiresReview ? "review" : e.correct === !0 ? "correct" : e.correct === !1 ? "incorrect" : "recorded", r = {
    correct: e.correct === !0 ? !0 : e.correct === !1 ? !1 : null,
    status: t
  };
  return typeof e.canRetry == "boolean" && (r.canRetry = e.canRetry), r;
}
export {
  ir as ActivityBlock,
  vt as ActivityCard,
  Mt as AuthoredHtml,
  Ct as Breadcrumbs,
  lt as CONTEXT_TYPES,
  kt as Callout,
  Ut as Classification,
  qr as CompletionModal,
  _t as ContextPanel,
  Vt as DragDrop,
  Ve as EmptyState,
  Lr as ErrorState,
  Rt as FEEDBACK_STATES,
  be as FeedbackPanel,
  Pr as HubShell,
  Dr as InteractiveActivity,
  $r as LEARNER_ACTIVITY_STATES,
  Rr as LearnerHeader,
  wt as LearningOutcomeBadge,
  ar as LearningTextField,
  Fr as LoadingState,
  St as Navigation,
  Gt as OptionCards,
  Xt as PhraseCompletion,
  Yr as PracticeProgressPanel,
  At as ProgressCard,
  et as ProgressSummary,
  nr as REFLECTION_DEFAULT_MIN_CHARS,
  lr as Reflection,
  Oe as SERVER_CHECK_FAILED_MESSAGE,
  Ot as SERVER_REVIEW_MESSAGE,
  ot as SESSION_KINDS,
  Fe as SESSION_KIND_LABELS,
  Ye as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  xr as STATUS_TONES,
  Zt as Sequence,
  It as SessionSection,
  cr as ShortResponse,
  Ae as StatusBadge,
  Qe as TextResponse,
  ye as WEEK_ACCESS_COPY,
  it as WEEK_UI_FEATURES,
  jr as WeekAccessGuard,
  Br as WeekAccessLink,
  Tt as WeekHeader,
  Et as WeekNavigation,
  Or as WeekView,
  yt as activityActionLabel,
  Vr as activityProgressLabel,
  Jr as aggregatePracticeProgress,
  Wr as applyPracticeResult,
  Gr as catalogueBlockScorableTotal,
  Sr as completableBlockIds,
  Ur as completedActivityCountFromCheckedDrafts,
  Kr as completedActivityCountFromState,
  Dt as createMarkResponseHandler,
  Yt as createSeededRandom,
  Hr as demoCatalogueActivities,
  br as demoClassification,
  gr as demoDragDrop,
  hr as demoOptionCards,
  yr as demoPhraseCompletion,
  Nr as demoReflection,
  vr as demoSequence,
  Cr as demoShortResponse,
  fr as demoTrueFalse,
  zr as emptyPracticeProgress,
  qt as hashSeed,
  wr as isActivityCheckedComplete,
  tt as isActivityPracticeComplete,
  Je as isCatalogueReactType,
  _r as isCompletableReactBlock,
  pt as isIndependentKind,
  Zr as isPracticeCompletionCue,
  kr as isScorableReactBlock,
  mt as isSessionKind,
  jt as learnerSafeBlock,
  Ar as learnerSafeCheckedResult,
  Qr as learnerSafeCheckedResults,
  en as learnerSafeResultFromActivityResult,
  er as looksLikeTrueFalseOptions,
  dt as mergeWeekUiFeatures,
  me as normaliseActivityType,
  We as presentationShuffleSeed,
  ve as questionIdFor,
  Ze as resolveMinChars,
  ur as resolveProgressFraction,
  je as resolveWeekStatus,
  xe as restoredCheckedDisplay,
  Xr as scorableBlocksComplete,
  ut as shouldShowContext,
  tr as shouldShuffle,
  Ee as shuffled,
  Ht as stableShuffle,
  Ue as statusLabel,
  gt as statusTone,
  Me as useRestoredCheckedFeedback,
  Lt as weekAccessFallbackCopy,
  Ge as weekIsAccessible
};
//# sourceMappingURL=index.js.map
