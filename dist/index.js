import { jsxs as d, jsx as n, Fragment as tt } from "react/jsx-runtime";
import { useId as $e, useState as T, useEffect as fe, useRef as Fe, useMemo as pe, useCallback as Me } from "react";
import { isUnsafeAuthoredHtml as rt, resolveActivityVersion as nt } from "@learning-platform/core";
import { isWeekAvailable as at } from "@learning-platform/core/curriculum-runtime";
const st = ["exam", "assignment", "project"], ct = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], Pe = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, Ir = ["not-started", "in-progress", "completed"], Tr = ["available", "planned", "progress", "completed"], lt = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function ot(e = {}) {
  return { ...lt, ...e };
}
function it(e, t) {
  return t ? t === "assignment" ? e.showAssignmentContext !== !1 : t === "exam" ? e.showExamContext !== !1 : t === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function dt(e) {
  return e === "independent-study" || e === "homework";
}
function ut(e) {
  return ct.includes(e);
}
const pt = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, mt = {
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
function ht(e) {
  return pt[e || ""] || "planned";
}
function Ke(e, t = "") {
  return mt[e || ""] || t || String(e || "Planned");
}
function ft(e, t = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : t;
}
function we({
  status: e = "planned",
  label: t,
  marker: r = !0
}) {
  const s = ht(e);
  return /* @__PURE__ */ d("span", { className: `lp-status-badge lp-status-badge--${s}`, role: "status", children: [
    r ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: "● " }) : null,
    t || Ke(e)
  ] });
}
function gt({
  title: e = "Untitled activity",
  description: t = "",
  activityType: r = "Activity",
  duration: s = "",
  status: a = "Not started",
  state: l,
  href: c,
  actionLabel: o,
  badge: i = !1,
  badgeStatus: u,
  headingLevel: m = 2,
  muted: f = !1
}) {
  const h = m === 3 ? "h3" : "h2", y = [r, s].filter(Boolean), C = l ? Ke(l, a) : a;
  return /* @__PURE__ */ d("article", { className: f ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": l || void 0, children: [
    i ? /* @__PURE__ */ n(
      we,
      {
        status: u || l || "planned",
        label: typeof a == "string" && a !== "Not started" ? a : void 0
      }
    ) : null,
    y.length ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: y.join(" · ") }) : null,
    /* @__PURE__ */ n(h, { children: e }),
    t ? /* @__PURE__ */ n("p", { children: t }) : null,
    /* @__PURE__ */ n("p", { className: "lp-card__meta", children: `Status: ${C}` }),
    c ? /* @__PURE__ */ n("div", { className: "lp-card__actions", children: /* @__PURE__ */ n("a", { className: "lp-button", href: c, children: o || ft(l) }) }) : null
  ] });
}
function yt(e, t) {
  return e.href ? e.href : e.path != null && t ? t(e.path) : e.path || void 0;
}
function vt({ items: e = [], resolveHref: t }) {
  return e.length ? /* @__PURE__ */ n("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ n("ol", { className: "lp-breadcrumbs__list", children: e.map((r, s) => {
    const a = s === e.length - 1, l = yt(r, t);
    return /* @__PURE__ */ n("li", { children: a || !l ? /* @__PURE__ */ n("span", { "aria-current": "page", children: r.label }) : /* @__PURE__ */ n("a", { href: l, children: r.label }) }, `${r.label}-${s}`);
  }) }) }) : /* @__PURE__ */ n("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const bt = ["info", "success", "warning", "error"];
function Nt({ tone: e = "info", title: t, message: r }) {
  const s = bt.includes(e) ? e : "info";
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
function Ct({
  contextType: e = "assignment",
  heading: t = "Context",
  items: r = [],
  description: s = "",
  action: a
}) {
  const l = st.includes(e) ? e : "assignment", c = `lp-context-${l}`;
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
function Ue({
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
function Er({
  heading: e = "There is a problem",
  message: t = "Try again."
}) {
  return /* @__PURE__ */ d("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ n("h2", { children: e }),
    /* @__PURE__ */ n("p", { children: t })
  ] });
}
function kt({
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
  const u = $e(), m = i || `lp-navigation-list-${u}`, [f, h] = T(!1), y = new Set([t, ...r].filter(Boolean)), C = e.find((g) => g.id === "home" && g.enabled !== !1), I = e.filter((g) => g.enabled !== !1);
  fe(() => {
    function g(E) {
      E.key === "Escape" && h(!1);
    }
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, []);
  function v(g) {
    if (g.key === "Escape") {
      h(!1);
      const E = g.currentTarget.querySelector(".lp-navigation__toggle");
      E == null || E.focus();
    }
  }
  return /* @__PURE__ */ n("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: v, children: /* @__PURE__ */ d("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ d("a", { className: "lp-navigation__brand", href: l || (C == null ? void 0 : C.path) || "./", children: [
      /* @__PURE__ */ n("span", { className: "lp-navigation__brand-title", children: s }),
      a ? /* @__PURE__ */ n("span", { className: "lp-navigation__brand-tagline", children: a }) : null
    ] }),
    /* @__PURE__ */ n(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": f,
        "aria-controls": m,
        "aria-label": f ? "Close main menu" : "Open main menu",
        onClick: () => h((g) => !g),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ n(
      "ul",
      {
        className: "lp-navigation__list",
        id: m,
        "data-open": f ? "true" : "false",
        children: I.map((g) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
          "a",
          {
            className: "lp-navigation__link",
            href: g.path,
            "aria-current": y.has(g.id) ? "page" : void 0,
            onClick: () => h(!1),
            children: g.label
          }
        ) }, g.id))
      }
    ),
    c ? /* @__PURE__ */ d("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ n(
        "select",
        {
          "aria-label": "Theme preference",
          value: c.preference,
          onChange: (g) => c.onChange(g.target.value),
          children: c.modes.map((g) => /* @__PURE__ */ n("option", { value: g, children: g[0].toUpperCase() + g.slice(1) }, g))
        }
      )
    ] }) : null,
    o ? /* @__PURE__ */ n("div", { className: "lp-navigation__actions", children: o }) : null
  ] }) });
}
function Mr({
  brandTitle: e,
  brandTagline: t,
  navigation: r,
  currentId: s = "home",
  currentIds: a = [],
  theme: l = null,
  actions: c,
  breadcrumbs: o,
  resolveHref: i,
  pageHeader: u,
  footer: m,
  learnerHeader: f,
  notice: h,
  skipLabel: y = "Skip to main content",
  mainId: C = "main-content",
  children: I
}) {
  const v = m && typeof m == "object" && "lines" in m ? m.lines.map((g) => /* @__PURE__ */ n("p", { children: g }, g)) : m;
  return /* @__PURE__ */ d("div", { className: "lp-shell", children: [
    /* @__PURE__ */ n("a", { className: "lp-skip-link skip-link", href: `#${C}`, children: y }),
    /* @__PURE__ */ n("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ n(
      kt,
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
    h,
    o ? /* @__PURE__ */ n(vt, { items: o, resolveHref: i }) : null,
    u != null && u.title ? /* @__PURE__ */ d("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ n("h1", { children: u.title }),
      u.subtitle ? /* @__PURE__ */ n("p", { className: "lp-page-header__subtitle", children: u.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ n("main", { id: C, className: "lp-shell__main site-main", tabIndex: -1, children: I }),
    /* @__PURE__ */ n("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: v })
  ] });
}
function xr({
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
function _t({ id: e, title: t }) {
  const r = [e, t].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ n("span", { className: "lp-outcome-badge", children: r });
}
function $r({ message: e = "Loading…" }) {
  return /* @__PURE__ */ d("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ n("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { children: e })
  ] });
}
function St({
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
function wt({
  id: e,
  title: t,
  kind: r = "session",
  summary: s = "",
  defaultOpen: a = !1,
  meta: l,
  children: c
}) {
  const o = ut(r) ? r : "session", i = Pe[o];
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
function At({
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
    s ? /* @__PURE__ */ n(we, { status: s }) : null,
    c ? /* @__PURE__ */ n(l === 2 ? "h2" : "h1", { children: o }) : e ? /* @__PURE__ */ n("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    r ? /* @__PURE__ */ n("p", { className: "lp-week-header__subtitle", children: r }) : null,
    a.length ? /* @__PURE__ */ n("ul", { className: "lp-week-header__outcomes", children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(_t, { id: u.id, title: u.title }) }, u.id || u.title)) }) : null
  ] });
}
function It({ previousWeek: e, nextWeek: t }) {
  return !(e != null && e.href) && !(t != null && t.href) ? null : /* @__PURE__ */ n("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ d("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    t != null && t.href ? /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: "lp-text-link", href: t.href, rel: "next", children: t.label || "Next week" }) }) : null
  ] }) });
}
function Tt({ html: e, className: t, ...r }) {
  const s = e == null ? "" : String(e);
  return rt(s) ? /* @__PURE__ */ n("div", { className: t, "data-lp-html-rejected": "true", ...r }) : /* @__PURE__ */ n("div", { className: t, dangerouslySetInnerHTML: { __html: s }, ...r });
}
function Et(e) {
  if (e.meta) return e.meta;
  const t = (e.activities || []).length, r = `${t} ${t === 1 ? "activity" : "activities"}`, s = Pe[e.kind || "session"] || Pe.session;
  return e.kind && e.kind !== "session" ? `${s} · ${r}` : r;
}
function Mt(e, t) {
  return "html" in e && e.html ? /* @__PURE__ */ n(
    Tt,
    {
      className: "lp-activity-html",
      html: e.html
    },
    t
  ) : "children" in e && e.children ? /* @__PURE__ */ n("div", { children: e.children }, t) : /* @__PURE__ */ n(gt, { ...e }, t);
}
function Lr({
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
  const u = ot(o), m = (r == null ? void 0 : r.type) || (r == null ? void 0 : r.contextType), f = s.filter((y) => !(u.showIndependentStudy === !1 && dt(y.kind))), h = i || Mt;
  return /* @__PURE__ */ d("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ n(
      At,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: u.showLearningOutcomes ? t : [],
        headingLevel: e.headingLevel || 1,
        showTitle: u.showTitle !== !1
      }
    ),
    r && it(u, m) ? /* @__PURE__ */ n(
      Ct,
      {
        contextType: m,
        heading: r.heading,
        items: r.items,
        description: r.description,
        action: r.action
      }
    ) : null,
    f.length ? f.map((y) => /* @__PURE__ */ n(
      wt,
      {
        id: y.id,
        title: y.title,
        kind: y.kind,
        summary: y.summary,
        defaultOpen: y.defaultOpen,
        meta: Et(y),
        children: (y.activities || []).map((C, I) => h(C, I))
      },
      y.id || y.title
    )) : /* @__PURE__ */ n(
      Ue,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    u.showProgress && a ? /* @__PURE__ */ n(St, { ...a }) : null,
    /* @__PURE__ */ n(It, { previousWeek: l, nextWeek: c })
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
function Be(e) {
  var t;
  return String(e.status ?? ((t = e.metadata) == null ? void 0 : t.status) ?? "").trim();
}
function Ve(e) {
  return at(Be(e));
}
function xt(e) {
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
function $t({ href: e, children: t, className: r }) {
  return /* @__PURE__ */ n("a", { className: r, href: e, children: t });
}
function Pr({
  week: e,
  href: t,
  children: r,
  className: s = "lp-text-link",
  lockedClassName: a = "lp-week-access-link lp-week-access-link--locked",
  renderLink: l = $t
}) {
  if (Ve(e))
    return l({ href: t, children: r, className: s });
  const c = Be(e);
  return /* @__PURE__ */ d("span", { className: a, "aria-disabled": "true", children: [
    /* @__PURE__ */ n("span", { className: "lp-week-access-link__label", children: r }),
    " ",
    /* @__PURE__ */ n(we, { status: c || "planned" })
  ] });
}
function Rr({ week: e, children: t, fallback: r }) {
  if (Ve(e))
    return t;
  if (r != null)
    return r;
  const s = Be(e), a = xt(s);
  return /* @__PURE__ */ d("div", { className: "lp-week-access-guard", children: [
    /* @__PURE__ */ n(we, { status: s || "planned" }),
    /* @__PURE__ */ n(Ue, { heading: a.heading, message: a.message })
  ] });
}
const Lt = ["neutral", "correct", "incorrect", "informative", "hint"], Pt = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function ve({
  state: e = "neutral",
  title: t,
  message: r
}) {
  const s = Lt.includes(e) ? e : "neutral", a = Pt[s];
  return !r && !t ? null : /* @__PURE__ */ n("div", { className: "lp-feedback", "data-lp-feedback-state": s, "data-lp-feedback": !0, children: /* @__PURE__ */ n(Nt, { tone: a.tone, title: t || a.label, message: r }) });
}
const Re = "Your answer could not be checked. Please try again.", Rt = "Your response has been recorded for review.";
function ge(e) {
  return typeof e == "function";
}
function Le(e) {
  if (e && typeof e == "object" && "learnerMessage" in e) {
    const t = String(e.learnerMessage || "").trim();
    if (t) return t;
  }
  return Re;
}
function Ge() {
  return async () => {
    throw Object.assign(new Error(Re), {
      code: "MARKING_UNAVAILABLE",
      learnerMessage: Re
    });
  };
}
function be(e) {
  return !e.checked || e.serverCanRetry === !1 ? !1 : e.serverCanRetry === !0 ? !0 : e.localRetry && (typeof e.localMaxAttempts != "number" || e.attempts < e.localMaxAttempts);
}
function Ae(e, t, r) {
  return !!(e && t && !ge(r));
}
function Ie(e, t, r = "Your response has been recorded.") {
  return e.requiresReview || e.status === "review" ? {
    status: "informative",
    message: Rt,
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
  const t = Ie(
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
async function je(e, t, r, s = "Your response has been recorded.") {
  try {
    return {
      ok: !0,
      marked: Ie(await e(t), r, s)
    };
  } catch (a) {
    return { ok: !1, message: Le(a) };
  }
}
const Ot = /^(correctOptionId|correctCategoryId|correctValues|answerKey|markScheme|modelAnswer|correctOptions|correctOrder|spec)$/;
function Oe(e) {
  if (Array.isArray(e)) return e.map(Oe);
  if (!e || typeof e != "object") return e;
  const t = {};
  for (const [r, s] of Object.entries(e))
    Ot.test(r) || r === "correct" && s && typeof s == "object" || (t[r] = Oe(s));
  return t;
}
function Ft(e) {
  return Oe(e);
}
function Bt(e, t) {
  if (!e || typeof e != "object") return;
  const r = e.marking;
  if (!r || typeof r.markBlock != "function")
    return Ge();
  const s = r.markBlock;
  return (a) => s({
    activityKey: t.id,
    activityVersion: a.activityVersion,
    block: Ft(a.block),
    responses: a.responses,
    sourcePage: typeof window < "u" ? window.location.pathname : void 0
  });
}
function jt(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r += 1)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function Dt(e) {
  let t = jt(e) || 1;
  return () => {
    t |= 0, t = t + 1831565813 | 0;
    let r = Math.imul(t ^ t >>> 15, 1 | t);
    return r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r, ((r ^ r >>> 14) >>> 0) / 4294967296;
  };
}
function qt(e, t) {
  const r = e.slice();
  if (r.length < 2) return r;
  const s = Dt(t);
  for (let a = r.length - 1; a > 0; a -= 1) {
    const l = Math.floor(s() * (a + 1)), c = r[a];
    r[a] = r[l], r[l] = c;
  }
  return r;
}
function ze(e) {
  const t = [
    e.activityId,
    e.activityVersion,
    e.questionId,
    e.blockId,
    e.shuffleSalt
  ].map((r) => r == null ? "" : String(r).trim()).filter(Boolean);
  return t.length ? t.join("|") : "default";
}
function Te(e, t, r = "default") {
  return !t || e.length < 2 ? e.slice() : qt(e, r);
}
function Ee(e) {
  const t = !!(e.initialChecked && e.hasResponse), r = xe({
    checked: t,
    hasResponse: e.hasResponse,
    correct: e.initialCorrect,
    feedback: e.feedback,
    recordedMessage: Se
  }), s = Fe("idle"), [a, l] = T((r == null ? void 0 : r.status) || "neutral"), [c, o] = T((r == null ? void 0 : r.message) || ""), [i, u] = T((r == null ? void 0 : r.serverCorrect) ?? null), [m, f] = T(e.initialCanRetry);
  return fe(() => {
    if (s.current === "live" || s.current === "retry" || !e.initialChecked || !e.hasResponse) return;
    const h = xe({
      checked: !0,
      hasResponse: !0,
      correct: e.initialCorrect,
      feedback: e.feedback,
      recordedMessage: Se
    });
    h && (l(h.status), o(h.message), u(h.serverCorrect), typeof e.initialCanRetry == "boolean" && f(e.initialCanRetry), (h.status === "correct" || h.status === "incorrect" || h.status === "informative") && (s.current = "restored"));
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
    serverCanRetry: m,
    setStatus: l,
    setMessage: o,
    setServerCorrect: u,
    setServerCanRetry: f,
    markLive: () => {
      s.current = "live";
    },
    markRetry: () => {
      s.current = "retry";
    }
  };
}
function Ye(e) {
  return e == null ? !1 : typeof e == "string" || Array.isArray(e) ? e.length > 0 : typeof e == "object" ? Object.keys(e).length > 0 : !0;
}
function De(e, t) {
  const [r, s] = T(Ye(e) ? e : t);
  return fe(() => {
    Ye(e) && s(e);
  }, [e]), [r, s];
}
function Ce(e, t) {
  const [r, s] = T(!!(e && t));
  return fe(() => {
    e && t && s(!0);
  }, [t, e]), [r, s];
}
function ke(e) {
  return e.label || e.text || e.id;
}
function Yt(e, t, r, s, a, l, c, o) {
  if (!r) return "Placed";
  if (l) {
    const i = c == null ? void 0 : c.find((u) => u.itemId === e);
    return (i == null ? void 0 : i.correct) === !0 ? "Correct" : (i == null ? void 0 : i.correct) === !1 ? "Incorrect" : o || i != null && i.requiresReview ? "Recorded" : "Placed";
  }
  return s ? a[e] === t ? "Correct" : "Incorrect" : "Placed";
}
function Ht({
  id: e = "classification",
  title: t,
  prompt: r,
  instructions: s,
  items: a,
  categories: l,
  feedback: c,
  formative: o = !0,
  retry: i = !0,
  shuffle: u = !1,
  shuffleSeed: m,
  maxAttempts: f,
  initialAssignments: h = {},
  initialChecked: y = !1,
  initialCorrect: C,
  initialCanRetry: I,
  onMarkResponse: v,
  onResult: g
}) {
  const E = pe(
    () => Te(a, u, m || e),
    [a, u, m, e]
  ), [k, x] = De(h, {}), [F, V] = T(null), [W, G] = T(0), X = a.length > 0 && a.every((p) => h[p.id]), [$, M] = Ce(y, X), [z, J] = T(!1), B = a.length > 0 && a.every((p) => k[p.id]), {
    status: ce,
    message: j,
    serverCanRetry: Q,
    setStatus: D,
    setMessage: re,
    setServerCorrect: K,
    setServerCanRetry: q,
    markLive: U,
    markRetry: Y
  } = Ee({
    initialChecked: y,
    hasResponse: B,
    initialCorrect: C,
    initialCanRetry: I,
    feedback: c
  }), [H, ne] = T(), [ee, Z] = T(!1), le = Object.fromEntries(
    a.filter((p) => p.correctCategoryId).map((p) => [p.id, p.correctCategoryId])
  ), N = ge(v), O = Ae(o, Object.keys(le).length > 0, v), b = $ || z, S = be({
    checked: $,
    localRetry: i,
    localMaxAttempts: f,
    attempts: W,
    serverCanRetry: Q
  }), A = E.filter((p) => !k[p.id]), R = E.find((p) => p.id === F);
  function ae(p) {
    g == null || g(p);
  }
  function se(p, P) {
    x((w) => ({ ...w, [p]: P })), V(null);
  }
  function L(p) {
    V((P) => P === p ? null : p);
  }
  function oe(p) {
    F && se(F, p);
  }
  function _(p) {
    x((P) => {
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
    if (N && v) {
      J(!0), D("informative"), re("Checking your answer…");
      try {
        const de = Ie(
          await v(w),
          c,
          "Your categories have been recorded."
        );
        U(), G(P), M(!0), ne(de.itemResults), Z(de.requiresReview), K(de.correct), q(de.canRetry), D(de.status), re(de.message), ae(Ne(de, P, w));
      } catch (de) {
        M(!1), ne(void 0), Z(!1), K(null), q(!1), D("informative"), re(Le(de)), ae({
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
    const ue = O ? a.filter((de) => k[de.id] === le[de.id]).length : 0, he = O ? ue === a.length : null;
    U(), G(P), M(!0), ne(void 0), Z(!1), K(null), D(he === !0 ? "correct" : he === !1 ? "incorrect" : "informative"), re(O ? he ? (c == null ? void 0 : c.correct) || "Those items match the expected categories." : (c == null ? void 0 : c.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), ae({
      completed: !0,
      correct: he,
      score: O ? { correct: ue, total: a.length } : void 0,
      attempts: P,
      responses: w
    });
  }
  function te() {
    Y(), x({}), V(null), M(!1), J(!1), ne(void 0), Z(!1), K(null), q(void 0), D("neutral"), re(""), ae({ completed: !1, correct: null, attempts: W, responses: {} });
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
        /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: R ? `Selected: ${ke(R)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: b, children: [
          /* @__PURE__ */ n("legend", { children: r }),
          /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "Items" }),
          /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
            A.map((p) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": F === p.id,
                onClick: () => L(p.id),
                children: [
                  ke(p),
                  F === p.id ? " (selected)" : ""
                ]
              },
              p.id
            )),
            A.length === 0 ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] }),
          /* @__PURE__ */ n("div", { className: "lp-card-grid", children: l.map((p) => {
            const P = E.filter((w) => k[w.id] === p.id);
            return /* @__PURE__ */ d("div", { className: "lp-card", children: [
              /* @__PURE__ */ n("p", { children: /* @__PURE__ */ n("strong", { children: p.label }) }),
              /* @__PURE__ */ n("ul", { className: "lp-activity-list", children: P.map((w) => {
                const ue = Yt(
                  w.id,
                  p.id,
                  $,
                  O,
                  le,
                  N,
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
                      ke(w),
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
                  disabled: !F,
                  onClick: () => oe(p.id),
                  children: [
                    "Place in ",
                    ke(p)
                  ]
                }
              )
            ] }, p.id);
          }) }),
          /* @__PURE__ */ d("details", { children: [
            /* @__PURE__ */ n("summary", { children: "Use dropdown lists instead" }),
            E.map((p) => /* @__PURE__ */ d("p", { className: "lp-form__field", children: [
              /* @__PURE__ */ n("label", { htmlFor: `${e}-${p.id}`, children: ke(p) }),
              /* @__PURE__ */ d(
                "select",
                {
                  id: `${e}-${p.id}`,
                  "data-lp-item": p.id,
                  value: k[p.id] || "",
                  disabled: b,
                  onChange: (P) => {
                    const w = P.target.value;
                    x((ue) => {
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
        /* @__PURE__ */ n(ve, { state: ce, message: j })
      ]
    }
  );
}
function Kt(e) {
  return !!(e && Object.keys(e).length);
}
function We(e = {}) {
  const [t, r] = T({ ...e }), [s, a] = T(null);
  fe(() => {
    Kt(e) && r({ ...e });
  }, [e]);
  const l = Me((u, m = t) => Object.keys(m).find((f) => m[f] === u) || null, [t]), c = Me((u) => {
    a((m) => m === u ? null : u);
  }, []), o = Me((u) => {
    if (!s) {
      const f = l(u);
      f && a(f);
      return;
    }
    const m = s;
    r((f) => {
      const h = { ...f }, y = Object.keys(h).find((C) => h[C] === u);
      return y && delete h[y], h[m] = u, h;
    }), a(null);
  }, [l, s]), i = Me(() => {
    r({}), a(null);
  }, []);
  return { placements: t, selectedItemId: s, selectItem: c, selectTarget: o, occupantOf: l, reset: i };
}
function Ut({
  id: e = "drag-drop",
  title: t,
  prompt: r,
  instructions: s,
  items: a,
  targets: l,
  correct: c = {},
  feedback: o,
  formative: i = !0,
  retry: u = !0,
  shuffle: m = !1,
  shuffleSeed: f,
  maxAttempts: h,
  initialPlacements: y = {},
  initialChecked: C = !1,
  initialCorrect: I,
  initialCanRetry: v,
  onMarkResponse: g,
  onResult: E
}) {
  var se;
  const k = pe(
    () => Te(a, m, f || e),
    [a, m, f, e]
  ), { placements: x, selectedItemId: F, selectItem: V, selectTarget: W, occupantOf: G, reset: X } = We(y), [$, M] = T(0), z = a.length > 0 && a.every((L) => y[L.id]), [J, B] = Ce(C, z), [ce, j] = T(!1), Q = a.length > 0 && a.every((L) => x[L.id]), {
    status: D,
    message: re,
    serverCanRetry: K,
    setStatus: q,
    setMessage: U,
    setServerCorrect: Y,
    setServerCanRetry: H,
    markLive: ne,
    markRetry: ee
  } = Ee({
    initialChecked: C,
    hasResponse: Q,
    initialCorrect: I,
    initialCanRetry: v,
    feedback: o
  }), Z = ge(g), le = Ae(i, Object.keys(c).length > 0, g), N = J || ce, O = be({
    checked: J,
    localRetry: u,
    localMaxAttempts: h,
    attempts: $,
    serverCanRetry: K
  }), b = k.filter((L) => !x[L.id]), S = (se = k.find((L) => L.id === F)) == null ? void 0 : se.label;
  function A(L) {
    E == null || E(L);
  }
  async function R() {
    if (ce) return;
    if (!a.every((p) => x[p.id])) {
      q("informative"), U("Place every item before checking.");
      return;
    }
    const oe = $ + 1, _ = { ...x };
    if (Z && g) {
      j(!0), q("informative"), U("Checking your answer…");
      const p = await je(
        g,
        _,
        o,
        "Your placements have been recorded."
      );
      if (j(!1), !p.ok) {
        B(!1), Y(null), H(!1), q("informative"), U(p.message), A({ completed: !1, correct: null, attempts: oe, responses: _, status: "error" });
        return;
      }
      ne(), M(oe), B(!0), Y(p.marked.correct), H(p.marked.canRetry), q(p.marked.status), U(p.marked.message), A(Ne(p.marked, oe, _));
      return;
    }
    const ie = le ? a.filter((p) => x[p.id] === c[p.id]).length : 0, te = le ? ie === a.length : null;
    ne(), M(oe), B(!0), Y(null), q(te === !0 ? "correct" : te === !1 ? "incorrect" : "informative"), U(le ? te ? (o == null ? void 0 : o.correct) || "Those placements match the expected targets." : (o == null ? void 0 : o.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), A({
      completed: !0,
      correct: te,
      score: le ? { correct: ie, total: a.length } : void 0,
      attempts: oe,
      responses: _
    });
  }
  function ae() {
    ee(), X(), B(!1), j(!1), Y(null), H(void 0), q("neutral"), U(""), A({ completed: !1, correct: null, attempts: $, responses: {} });
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
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: N, children: [
          /* @__PURE__ */ n("legend", { children: "Items" }),
          /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
            b.map((L) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": F === L.id,
                onClick: () => V(L.id),
                children: [
                  L.label,
                  F === L.id ? " (selected)" : ""
                ]
              },
              L.id
            )),
            b.length === 0 ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: N, children: [
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
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void R(), disabled: N, children: ce ? "Checking…" : "Check placement" }),
          O ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: ae, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(ve, { state: D, message: re })
      ]
    }
  );
}
function Vt({
  id: e = "option-cards",
  title: t,
  prompt: r,
  instructions: s,
  options: a,
  correctOptionId: l,
  feedback: c,
  formative: o = !0,
  retry: i = !0,
  shuffle: u = !1,
  shuffleSeed: m,
  maxAttempts: f,
  initialSelectedId: h,
  initialChecked: y = !1,
  initialCorrect: C,
  initialCanRetry: I,
  onMarkResponse: v,
  onResult: g
}) {
  const E = pe(
    () => Te(a, u, m || e),
    [a, u, m, e]
  ), [k, x] = De(h || null, null), [F, V] = T(0), [W, G] = Ce(y, !!h), [X, $] = T(!1), M = xe({
    checked: !!(y && h),
    hasResponse: !!h,
    correct: C,
    feedback: c,
    recordedMessage: Se
  }), z = Fe("idle"), [J, B] = T((M == null ? void 0 : M.status) || "neutral"), [ce, j] = T((M == null ? void 0 : M.message) || ""), [Q, D] = T((M == null ? void 0 : M.serverCorrect) ?? null), [re, K] = T(I);
  fe(() => {
    if (z.current === "live" || z.current === "retry" || !y || !k) return;
    const N = xe({
      checked: !0,
      hasResponse: !0,
      correct: C,
      feedback: c,
      recordedMessage: Se
    });
    N && (B(N.status), j(N.message), D(N.serverCorrect), typeof I == "boolean" && K(I), (N.status === "correct" || N.status === "incorrect") && (z.current = "restored"));
  }, [c, I, y, C, k]);
  const q = ge(v), U = Ae(o, !!l, v), Y = `lp-option-cards-${e}`, H = W || X, ne = be({
    checked: W,
    localRetry: i,
    localMaxAttempts: f,
    attempts: F,
    serverCanRetry: re
  });
  function ee(N) {
    g == null || g(N);
  }
  async function Z() {
    if (X) return;
    if (!k) {
      B("informative"), j("Choose an option before checking.");
      return;
    }
    const N = F + 1, O = { optionId: k };
    if (q && v) {
      $(!0), B("informative"), j("Checking your answer…");
      try {
        const A = Ie(await v(O), c, "Your choice has been recorded.");
        z.current = "live", V(N), G(!0), D(A.correct), K(A.canRetry), B(A.status), j(A.message), ee(Ne(A, N, O));
      } catch (A) {
        G(!1), D(null), K(!1), B("informative"), j(Le(A)), ee({
          completed: !1,
          correct: null,
          attempts: N,
          responses: O,
          status: "error"
        });
      } finally {
        $(!1);
      }
      return;
    }
    const b = U ? k === l : null, S = U ? b ? (c == null ? void 0 : c.correct) || "That matches the expected option." : (c == null ? void 0 : c.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    V(N), G(!0), z.current = "live", D(null), B(b === !0 ? "correct" : b === !1 ? "incorrect" : "informative"), j(S), ee({
      completed: !0,
      correct: b,
      score: U ? { correct: b ? 1 : 0, total: 1 } : void 0,
      attempts: N,
      responses: O
    });
  }
  function le() {
    z.current = "retry", x(null), G(!1), $(!1), D(null), K(void 0), B("neutral"), j(""), ee({
      completed: !1,
      correct: null,
      attempts: F,
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
          /* @__PURE__ */ n("div", { className: "lp-card-grid", children: E.map((N) => {
            const O = k === N.id, R = W && U && O || W && q && O && Q !== null ? (q ? Q === !0 : N.id === l) ? "Correct" : "Incorrect" : O ? "Selected" : "";
            return /* @__PURE__ */ d("label", { className: "lp-card lp-activity-card", children: [
              /* @__PURE__ */ n(
                "input",
                {
                  type: "radio",
                  name: Y,
                  value: N.id,
                  checked: O,
                  "data-lp-response": "",
                  onChange: () => x(N.id)
                }
              ),
              /* @__PURE__ */ d("span", { children: [
                /* @__PURE__ */ n("strong", { children: N.label }),
                N.description ? /* @__PURE__ */ d("span", { className: "lp-card__meta", children: [
                  " — ",
                  N.description
                ] }) : null
              ] }),
              N.imageSrc ? /* @__PURE__ */ n("img", { src: N.imageSrc, alt: N.imageAlt || N.label }) : null,
              R ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: R }) : null
            ] }, N.id);
          }) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void Z(), disabled: H, children: X ? "Checking…" : "Check answer" }),
          ne ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: le, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(ve, { state: J, message: ce })
      ]
    }
  );
}
function Gt(e, t) {
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
function zt(e, t, r) {
  if (!e || !Object.keys(e).length) return {};
  const s = new Set(t.map((o) => o.id)), a = new Set(r.map((o) => o.id)), l = Object.keys(e), c = Object.values(e).map(String);
  if (l.every((o) => a.has(o)) && c.every((o) => s.has(o)))
    return { ...e };
  if (l.every((o) => s.has(o)) && c.every((o) => a.has(o))) {
    const o = {};
    for (const [i, u] of Object.entries(e))
      o[String(u)] = i;
    return o;
  }
  return { ...e };
}
function Wt({
  id: e = "phrase-completion",
  title: t,
  prompt: r,
  instructions: s,
  gaps: a,
  options: l,
  correctOptionId: c,
  feedback: o,
  formative: i = !0,
  retry: u = !0,
  shuffle: m = !1,
  shuffleSeed: f,
  maxAttempts: h,
  initialPlacements: y = {},
  initialChecked: C = !1,
  initialCorrect: I,
  initialCanRetry: v,
  onMarkResponse: g,
  onResult: E
}) {
  var oe;
  const k = pe(() => a && a.length ? a : [{ id: "gap", label: "missing term", correctOptionId: c || void 0 }], [c, a]), x = pe(
    () => Te(l, m, f || e),
    [l, m, f, e]
  ), F = pe(() => Gt(r, k), [r, k]), V = pe(
    () => zt(y, k, l),
    [y, l, k]
  ), { placements: W, selectedItemId: G, selectItem: X, selectTarget: $, occupantOf: M, reset: z } = We(V), [J, B] = T(0), [ce, j] = Ce(C, Object.keys(V).length > 0), [Q, D] = T(!1), re = k.length > 0 && k.every((_) => !!M(_.id)), {
    status: K,
    message: q,
    serverCanRetry: U,
    setStatus: Y,
    setMessage: H,
    setServerCorrect: ne,
    setServerCanRetry: ee,
    markLive: Z,
    markRetry: le
  } = Ee({
    initialChecked: C,
    hasResponse: re,
    initialCorrect: I,
    initialCanRetry: v,
    feedback: o
  }), N = Object.fromEntries(
    k.map((_) => [_.id, _.correctOptionId]).filter((_) => _[1])
  ), O = Ae(i, Object.keys(N).length > 0, g), b = ce || Q, S = be({
    checked: ce,
    localRetry: u,
    localMaxAttempts: h,
    attempts: J,
    serverCanRetry: U
  }), A = x.filter((_) => !W[_.id]), R = (oe = l.find((_) => _.id === G)) == null ? void 0 : oe.label;
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
    }), ge(g) && g) {
      D(!0), Y("informative"), H("Checking your answer…");
      const w = await je(
        g,
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
    const p = O ? k.filter((w) => te[w.id] === N[w.id]).length : 0, P = O ? p === k.length : null;
    Z(), B(ie), j(!0), ne(null), Y(P === !0 ? "correct" : P === !1 ? "incorrect" : "informative"), H(O ? P ? (o == null ? void 0 : o.correct) || "That completes the phrase." : (o == null ? void 0 : o.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), ae({
      completed: !0,
      correct: P,
      score: O ? { correct: p, total: k.length } : void 0,
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
        /* @__PURE__ */ n("p", { children: F.map((_, ie) => {
          if (typeof _ == "string") return /* @__PURE__ */ n("span", { children: _ }, `text-${ie}`);
          const te = M(_.gapId), p = l.find((ue) => ue.id === te), P = k.find((ue) => ue.id === _.gapId), w = ce && O && te ? N[_.gapId] === te ? "Correct" : "Incorrect" : p ? "Filled" : "Blank";
          return /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              disabled: b,
              "aria-label": `${(P == null ? void 0 : P.label) || "blank"}: ${(p == null ? void 0 : p.label) || "empty"}. ${w}`,
              onClick: () => $(_.gapId),
              children: (p == null ? void 0 : p.label) || "______"
            },
            _.gapId
          );
        }) }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: b, children: [
          /* @__PURE__ */ n("legend", { children: "Available phrases" }),
          /* @__PURE__ */ n("div", { className: "lp-card__actions", children: A.map((_) => /* @__PURE__ */ d(
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
        /* @__PURE__ */ n(ve, { state: K, message: q })
      ]
    }
  );
}
function Xt({
  id: e = "sequence",
  title: t,
  prompt: r,
  instructions: s,
  items: a,
  correctOrder: l = [],
  feedback: c,
  formative: o = !0,
  retry: i = !0,
  shuffle: u = !1,
  shuffleSeed: m,
  maxAttempts: f,
  initialOrder: h,
  initialChecked: y = !1,
  initialCorrect: C,
  initialCanRetry: I,
  onMarkResponse: v,
  onResult: g
}) {
  const E = pe(
    () => Te(a, u, m || e),
    [a, u, m, e]
  ), k = pe(() => {
    if (!Array.isArray(h) || !h.length) return E;
    const b = new Map(a.map((A) => [A.id, A])), S = h.map((A) => b.get(A)).filter(Boolean);
    return S.length === a.length ? S : E;
  }, [E, h, a]), [x, F] = T(k);
  fe(() => {
    !Array.isArray(h) || !h.length || F(k);
  }, [h, k]);
  const [V, W] = T(0), [G, X] = Ce(y, !!(h != null && h.length)), [$, M] = T(!1), z = x.length > 0, {
    status: J,
    message: B,
    serverCanRetry: ce,
    setStatus: j,
    setMessage: Q,
    setServerCorrect: D,
    setServerCanRetry: re,
    markLive: K,
    markRetry: q
  } = Ee({
    initialChecked: y,
    hasResponse: z,
    initialCorrect: C,
    initialCanRetry: I,
    feedback: c
  }), U = ge(v), Y = Ae(o, l.length > 0, v), H = G || $, ne = be({
    checked: G,
    localRetry: i,
    localMaxAttempts: f,
    attempts: V,
    serverCanRetry: ce
  });
  function ee(b) {
    g == null || g(b);
  }
  function Z(b, S) {
    const A = b + S;
    if (A < 0 || A >= x.length) return;
    const R = x.slice(), [ae] = R.splice(b, 1);
    R.splice(A, 0, ae), F(R);
  }
  function le(b, S) {
    H || (b.key === "ArrowUp" && (b.preventDefault(), Z(S, -1)), b.key === "ArrowDown" && (b.preventDefault(), Z(S, 1)));
  }
  async function N() {
    if ($) return;
    const b = V + 1, S = x.map((se) => se.id), A = { itemIds: S };
    if (U && v) {
      M(!0), j("informative"), Q("Checking your answer…");
      const se = await je(
        v,
        A,
        c,
        "Your sequence has been recorded."
      );
      if (M(!1), !se.ok) {
        X(!1), D(null), re(!1), j("informative"), Q(se.message), ee({ completed: !1, correct: null, attempts: b, responses: A, status: "error" });
        return;
      }
      K(), W(b), X(!0), D(se.marked.correct), re(se.marked.canRetry), j(se.marked.status), Q(se.marked.message), ee(Ne(se.marked, b, A));
      return;
    }
    const R = Y ? S.filter((se, L) => se === l[L]).length : 0, ae = Y ? R === l.length && S.length === l.length : null;
    K(), W(b), X(!0), D(null), j(ae === !0 ? "correct" : ae === !1 ? "incorrect" : "informative"), Q(Y ? ae ? (c == null ? void 0 : c.correct) || "That order matches the expected sequence." : (c == null ? void 0 : c.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), ee({
      completed: !0,
      correct: ae,
      score: Y ? { correct: R, total: l.length } : void 0,
      attempts: b,
      responses: A
    });
  }
  function O() {
    q(), F(E), X(!1), M(!1), D(null), re(void 0), j("neutral"), Q(""), ee({
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
      "aria-busy": $ || void 0,
      children: [
        t ? /* @__PURE__ */ n("h3", { children: t }) : null,
        s ? /* @__PURE__ */ n("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ n("p", { children: r }),
        /* @__PURE__ */ n("ol", { className: "lp-activity-list", children: x.map((b, S) => /* @__PURE__ */ d(
          "li",
          {
            className: "lp-card",
            tabIndex: H ? -1 : 0,
            "aria-label": `${b.label}, position ${S + 1} of ${x.length}`,
            onKeyDown: (A) => le(A, S),
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
                    disabled: H || S === x.length - 1,
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
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void N(), disabled: H, children: $ ? "Checking…" : "Check order" }),
          ne ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: O, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(ve, { state: J, message: B })
      ]
    }
  );
}
function me(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Zt(e) {
  var t;
  return (e == null ? void 0 : e.formative) === !0 || ((t = e == null ? void 0 : e.marking) == null ? void 0 : t.mode) === "formative-local";
}
function Jt(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function Qt(e) {
  if (!e || e.length !== 2) return !1;
  const t = e.map((r) => String(r.label || "").trim().toLowerCase()).sort();
  return t[0] === "false" && t[1] === "true";
}
function er(e, t) {
  if ((e == null ? void 0 : e.shuffle) === !1 || (e == null ? void 0 : e.randomise) === !1 || me((t == null ? void 0 : t.presentation) ?? (e == null ? void 0 : e.presentation)) === "true-false") return !1;
  const s = (t == null ? void 0 : t.options) ?? (e == null ? void 0 : e.options);
  return !Qt(s);
}
const tr = [
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
], qe = 200, rr = 500;
function Xe(e, t) {
  const r = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return r > 0 ? r : t;
}
function Ze(e) {
  return tr.includes(me(e));
}
function _e(e) {
  var t;
  return ((t = e.content) == null ? void 0 : t.questionId) || e.id;
}
function nr({
  id: e,
  prompt: t,
  placeholder: r,
  value: s,
  defaultValue: a = "",
  minChars: l,
  minimumCharacters: c,
  defaultMinChars: o = qe,
  rows: i = 4,
  disabled: u = !1,
  hidePrompt: m = !1,
  onChange: f
}) {
  const h = $e(), y = e || h, C = Xe({ minChars: l, minimumCharacters: c }, o), I = typeof s == "string", [v, g] = T(String(a || "")), [E, k] = T(""), x = I ? s : v, F = x.trim().length, V = F >= C;
  function W($) {
    I || g($), f == null || f($);
  }
  function G($) {
    $.preventDefault(), k("Paste is disabled. Type your answer in your own words.");
  }
  function X($) {
    $.preventDefault(), k("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ d("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ d("label", { className: "lp-field", htmlFor: y, children: [
      m ? /* @__PURE__ */ n("span", { className: "lp-visually-hidden", children: t }) : /* @__PURE__ */ n("span", { className: "lp-field__label", children: t }),
      /* @__PURE__ */ n(
        "textarea",
        {
          id: y,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(C),
          rows: i,
          value: x,
          placeholder: r,
          minLength: C,
          autoComplete: "off",
          disabled: u,
          "aria-describedby": `${y}-count ${y}-notice`,
          onChange: ($) => W($.target.value),
          onPaste: G,
          onDrop: X
        }
      )
    ] }),
    /* @__PURE__ */ n(
      "p",
      {
        id: `${y}-count`,
        className: "lp-char-count",
        "data-lp-char-count": "",
        "data-lp-met": V ? "true" : "false",
        "aria-live": "polite",
        children: `${F} / ${C} characters minimum`
      }
    ),
    /* @__PURE__ */ n(
      "p",
      {
        id: `${y}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: E
      }
    )
  ] });
}
function ar(e, t) {
  return t > 0 ? `Write at least ${e} characters. You currently have ${t}.` : `Write at least ${e} characters before saving.`;
}
function Je({
  id: e = "text-response",
  blockType: t = "short-response",
  title: r,
  prompt: s,
  instructions: a,
  guidance: l,
  placeholder: c,
  minChars: o,
  minimumCharacters: i,
  defaultMinChars: u = qe,
  rows: m = 4,
  feedback: f,
  retry: h = !0,
  maxAttempts: y,
  initialResponse: C = "",
  initialChecked: I = !1,
  initialCorrect: v,
  initialCanRetry: g,
  saveLabel: E = "Save response",
  onMarkResponse: k,
  onResult: x
}) {
  const F = Xe({ minChars: o, minimumCharacters: i }, u), [V, W] = De(String(C || ""), ""), [G, X] = T(0), [$, M] = Ce(I, !!String(C || "").trim()), [z, J] = T(!1), B = V.trim(), ce = B.length, j = ce >= F, {
    status: Q,
    message: D,
    serverCanRetry: re,
    setStatus: K,
    setMessage: q,
    setServerCorrect: U,
    setServerCanRetry: Y,
    markLive: H,
    markRetry: ne
  } = Ee({
    initialChecked: I,
    hasResponse: !!B,
    initialCorrect: v,
    initialCanRetry: g,
    feedback: f
  }), ee = ge(k), Z = $ || z, le = be({
    checked: $,
    localRetry: h,
    localMaxAttempts: y,
    attempts: G,
    serverCanRetry: re
  });
  function N(S) {
    x == null || x(S);
  }
  async function O() {
    if (z) return;
    if (!j) {
      K("informative"), q(ar(F, ce));
      return;
    }
    const S = G + 1;
    if (ee && k) {
      J(!0), K("informative"), q("Saving your response…");
      try {
        const R = Ie(
          await k(B),
          f,
          l || "Your response has been recorded."
        );
        H(), X(S), M(!0), U(R.correct), Y(R.canRetry), K(R.status), q(R.requiresReview || R.correct !== null ? R.message : l || R.message), N(Ne(R, S, B));
      } catch (R) {
        M(!1), U(null), Y(!1), K("informative"), q(Le(R)), N({
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
    const A = l || (f == null ? void 0 : f.correct) || "Saved.";
    H(), X(S), M(!0), U(null), K("informative"), q(A), N({
      completed: !0,
      correct: null,
      attempts: S,
      responses: B
    });
  }
  function b() {
    ne(), W(""), M(!1), J(!1), U(null), Y(void 0), K("neutral"), q(""), N({
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
          nr,
          {
            id: `${e}-field`,
            prompt: s,
            placeholder: c,
            value: V,
            minChars: o,
            minimumCharacters: i,
            defaultMinChars: u,
            rows: m,
            disabled: Z,
            onChange: W
          }
        ),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: () => void O(), disabled: Z, children: z ? "Saving…" : E }),
          le ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: b, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ n(ve, { state: Q, message: D })
      ]
    }
  );
}
function sr({
  rows: e = 4,
  ...t
}) {
  return /* @__PURE__ */ n(
    Je,
    {
      ...t,
      blockType: "short-response",
      defaultMinChars: qe,
      rows: e
    }
  );
}
function cr({
  rows: e = 6,
  ...t
}) {
  return /* @__PURE__ */ n(
    Je,
    {
      ...t,
      blockType: "reflection",
      defaultMinChars: rr,
      rows: e
    }
  );
}
function lr(e, t) {
  const r = e.content || {}, s = me(r.presentation);
  return {
    id: e.id,
    instructions: r.instructions,
    feedback: r.feedback,
    formative: Zt(r),
    retry: Jt(r),
    shuffle: er(r, { presentation: s, options: r.options }),
    shuffleSeed: t,
    maxAttempts: r.maxAttempts
  };
}
function He(e) {
  return typeof e == "string" ? e : void 0;
}
function or({
  block: e,
  shuffleSeed: t,
  initialResponse: r,
  initialChecked: s,
  initialResult: a,
  onMarkResponse: l,
  onResult: c
}) {
  const o = me(e.type), i = e.content || {}, u = me(i.presentation), m = lr(
    e,
    t || ze({ questionId: _e(e), blockId: e.id })
  ), f = (h) => c == null ? void 0 : c(h, e);
  if (o === "single-choice" || o === "option-cards" || u === "option-cards" || u === "true-false" || u === "picture-quiz")
    return /* @__PURE__ */ n(
      Vt,
      {
        ...m,
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
    const h = r && typeof r == "object" && !Array.isArray(r) ? r : void 0;
    return /* @__PURE__ */ n(
      Ht,
      {
        ...m,
        prompt: i.prompt || "Classify each item",
        items: i.items || [],
        categories: i.categories || [],
        initialAssignments: h,
        initialChecked: s,
        initialCorrect: a == null ? void 0 : a.correct,
        initialCanRetry: a == null ? void 0 : a.canRetry,
        onMarkResponse: l,
        onResult: f
      }
    );
  }
  return o === "drag-drop" ? /* @__PURE__ */ n(
    Ut,
    {
      ...m,
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
    Wt,
    {
      ...m,
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
    Xt,
    {
      ...m,
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
    sr,
    {
      id: m.id,
      prompt: i.prompt || "Write your response",
      instructions: m.instructions,
      guidance: i.guidance,
      placeholder: i.placeholder,
      minChars: i.minChars,
      minimumCharacters: i.minimumCharacters,
      feedback: m.feedback,
      retry: m.retry,
      maxAttempts: m.maxAttempts,
      initialResponse: He(r),
      initialChecked: s,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: l,
      onResult: f
    }
  ) : o === "reflection" ? /* @__PURE__ */ n(
    cr,
    {
      id: m.id,
      prompt: i.prompt || "Write your reflection",
      instructions: m.instructions,
      guidance: i.guidance,
      placeholder: i.placeholder,
      minChars: i.minChars,
      minimumCharacters: i.minimumCharacters,
      feedback: m.feedback,
      retry: m.retry,
      maxAttempts: m.maxAttempts,
      initialResponse: He(r),
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
function ir(e, t, r, s) {
  if (s === "local") return r;
  const a = r || Bt(e, t);
  return s === "server" && !a ? Ge() : a;
}
function Or({
  activity: e,
  initialResponses: t = {},
  initialChecked: r = {},
  initialResults: s = {},
  renderFallback: a,
  platform: l,
  markingMode: c,
  shuffleSalt: o,
  onMarkResponse: i,
  onResult: u
}) {
  var C, I;
  const [m, f] = T(0), h = nt(e) || void 0, y = ir(l, e, i, c);
  return /* @__PURE__ */ d(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": h,
      children: [
        (C = e.metadata) != null && C.title ? /* @__PURE__ */ n("h3", { children: e.metadata.title }) : null,
        (I = e.metadata) != null && I.summary ? /* @__PURE__ */ n("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ n("div", { className: "lp-activity-list", children: (e.blocks || []).map((v) => {
          if (Ze(v.type)) {
            const g = ze({
              activityId: e.id,
              activityVersion: h,
              questionId: _e(v),
              blockId: v.id,
              shuffleSalt: o
            });
            return /* @__PURE__ */ n(
              or,
              {
                block: v,
                shuffleSeed: g,
                initialResponse: t[_e(v)],
                initialChecked: !!r[_e(v)],
                initialResult: s[_e(v)],
                onMarkResponse: y ? (E) => y({
                  activityId: e.id,
                  activityVersion: h || "",
                  block: v,
                  responses: E
                }) : void 0,
                onResult: u
              },
              v.id
            );
          }
          return a ? /* @__PURE__ */ n("div", { children: a(v) }, v.id) : /* @__PURE__ */ d("p", { className: "lp-card__meta", "data-lp-block": me(v.type), children: [
            "This ",
            me(v.type) || "unknown",
            " block is not part of the React activity catalogue yet."
          ] }, v.id);
        }) }, m),
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
function dr(e, t) {
  return typeof t == "number" && Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function Qe({
  title: e,
  badge: t,
  subtitle: r,
  score: s,
  progress: a,
  completed: l = !0,
  attempts: c,
  message: o,
  showStatus: i = !0,
  showDisclaimer: u = !0,
  collapsed: m = !1
}) {
  const f = t || r, h = dr(s, a), y = Math.round(h * 100), C = l ? "Completed" : "In progress", I = s ? `${s.correct} / ${s.total}` : null, v = s ? `${s.correct} of ${s.total} correct` : null, g = typeof c == "number" ? `${c} ${c === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ d(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": m ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ n("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ n("strong", { children: e }) }) : null,
        i ? /* @__PURE__ */ n(we, { status: l ? "completed" : "progress", label: C }) : null,
        I ? /* @__PURE__ */ n(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": v || void 0,
            children: I
          }
        ) : null,
        v ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: v }) : null,
        !m && f ? /* @__PURE__ */ n("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ n("strong", { children: f }) }) : null,
        m ? null : /* @__PURE__ */ d(tt, { children: [
          /* @__PURE__ */ n(
            "progress",
            {
              className: "lp-progress",
              max: 100,
              value: y,
              "aria-label": `${y}% complete`
            }
          ),
          /* @__PURE__ */ d("p", { className: "lp-card__meta", children: [
            y,
            "% complete"
          ] }),
          g ? /* @__PURE__ */ n("p", { children: g }) : null,
          o ? /* @__PURE__ */ n("p", { children: o }) : null,
          u ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function ur(e, t) {
  if (e)
    try {
      t && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !t && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      t ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function Fr({
  open: e = !1,
  title: t = "Activity complete",
  completed: r = !0,
  score: s,
  badge: a,
  subtitle: l,
  progress: c,
  attempts: o,
  message: i,
  onClose: u,
  onReview: m,
  onNext: f,
  nextLabel: h = "Continue",
  reviewLabel: y = "Review"
}) {
  const C = Fe(null), I = $e();
  return fe(() => {
    ur(C.current, e);
  }, [e]), e ? /* @__PURE__ */ d(
    "dialog",
    {
      ref: C,
      className: "lp-dialog",
      "aria-labelledby": I,
      onCancel: (v) => {
        v.preventDefault(), u == null || u();
      },
      children: [
        /* @__PURE__ */ d("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ n("h2", { id: I, children: t }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${t}`,
              onClick: u,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ n(
            Qe,
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
            m ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button lp-button--secondary", onClick: m, children: y }) : null,
            f ? /* @__PURE__ */ n("button", { type: "button", className: "lp-button", onClick: f, children: h }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const pr = (e) => ({
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
function Br({
  collapsed: e,
  defaultCollapsed: t = !0,
  onCollapsedChange: r,
  expandLabel: s = "Show progress details",
  collapseLabel: a = "Hide progress details",
  ...l
}) {
  const [c, o] = T(t), i = typeof e == "boolean" ? e : c, u = $e(), m = l.title || "Practice progress";
  function f(h) {
    typeof e != "boolean" && o(h), r == null || r(h);
  }
  return /* @__PURE__ */ d(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: pr(i),
      "aria-label": m,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": i ? "true" : "false",
      children: [
        /* @__PURE__ */ n("div", { id: u, children: /* @__PURE__ */ n(Qe, { ...l, title: m, collapsed: i }) }),
        /* @__PURE__ */ n("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !i,
            "aria-controls": u,
            onClick: () => f(!i),
            children: i ? s : a
          }
        ) })
      ]
    }
  );
}
const mr = {
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
}, hr = {
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
}, fr = {
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
}, gr = {
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
}, yr = {
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
}, vr = {
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
}, br = {
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
}, jr = [
  mr,
  hr,
  fr,
  gr,
  yr,
  vr,
  br,
  Nr
];
function Cr(e) {
  const t = me(e.type);
  return t === "single-choice" || t === "option-cards" || t === "classification" || t === "drag-drop" || t === "fill-gap" || t === "phrase-completion" || t === "ordering" || t === "sequence";
}
function Dr(e) {
  return Ze(e.type);
}
function qr(e) {
  if (!Cr(e)) return 0;
  const t = me(e.type);
  return t === "classification" ? (e.content && e.content.items || []).length : t === "drag-drop" ? (e.content && e.content.items || []).length : t === "fill-gap" || t === "phrase-completion" ? (e.content && e.content.gaps || []).length || 1 : t === "ordering" || t === "sequence" ? (e.content && e.content.items || []).length : 1;
}
function Yr() {
  return { completed: {}, scores: {} };
}
function Hr(e, t, r) {
  const s = { ...e.completed }, a = { ...e.scores };
  return r.completed ? (s[t] = !0, r.score && r.score.total > 0 && !r.requiresReview ? a[t] = r.score : delete a[t], { completed: s, scores: a }) : e;
}
function Kr(e, t) {
  return t.length > 0 && t.every((r) => e.completed[r]);
}
function Ur(e, t) {
  var s;
  if (!e.completed) return !1;
  const r = ((s = e.score) == null ? void 0 : s.total) || 0;
  return t.complete || t.completedCount >= 2 || r >= 2;
}
function Vr(e, t) {
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
const et = /* @__PURE__ */ new Set(["correct", "incorrect", "review", "recorded", "error"]);
function kr(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, r = {
    correct: t.correct === !0 ? !0 : t.correct === !1 ? !1 : null
  };
  return typeof t.canRetry == "boolean" && (r.canRetry = t.canRetry), typeof t.status == "string" && et.has(t.status) && (r.status = t.status), r;
}
function Gr(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return {};
  const t = {};
  for (const [r, s] of Object.entries(e)) {
    const a = kr(s);
    a && (t[r] = a);
  }
  return t;
}
function zr(e) {
  const t = typeof e.status == "string" && et.has(e.status) ? e.status : e.requiresReview ? "review" : e.correct === !0 ? "correct" : e.correct === !1 ? "incorrect" : "recorded", r = {
    correct: e.correct === !0 ? !0 : e.correct === !1 ? !1 : null,
    status: t
  };
  return typeof e.canRetry == "boolean" && (r.canRetry = e.canRetry), r;
}
export {
  or as ActivityBlock,
  gt as ActivityCard,
  Tt as AuthoredHtml,
  vt as Breadcrumbs,
  st as CONTEXT_TYPES,
  Nt as Callout,
  Ht as Classification,
  Fr as CompletionModal,
  Ct as ContextPanel,
  Ut as DragDrop,
  Ue as EmptyState,
  Er as ErrorState,
  Lt as FEEDBACK_STATES,
  ve as FeedbackPanel,
  Mr as HubShell,
  Or as InteractiveActivity,
  Ir as LEARNER_ACTIVITY_STATES,
  xr as LearnerHeader,
  _t as LearningOutcomeBadge,
  nr as LearningTextField,
  $r as LoadingState,
  kt as Navigation,
  Vt as OptionCards,
  Wt as PhraseCompletion,
  Br as PracticeProgressPanel,
  St as ProgressCard,
  Qe as ProgressSummary,
  rr as REFLECTION_DEFAULT_MIN_CHARS,
  cr as Reflection,
  Re as SERVER_CHECK_FAILED_MESSAGE,
  Rt as SERVER_REVIEW_MESSAGE,
  ct as SESSION_KINDS,
  Pe as SESSION_KIND_LABELS,
  qe as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  Tr as STATUS_TONES,
  Xt as Sequence,
  wt as SessionSection,
  sr as ShortResponse,
  we as StatusBadge,
  Je as TextResponse,
  ye as WEEK_ACCESS_COPY,
  lt as WEEK_UI_FEATURES,
  Rr as WeekAccessGuard,
  Pr as WeekAccessLink,
  At as WeekHeader,
  It as WeekNavigation,
  Lr as WeekView,
  ft as activityActionLabel,
  Vr as aggregatePracticeProgress,
  Hr as applyPracticeResult,
  qr as catalogueBlockScorableTotal,
  Bt as createMarkResponseHandler,
  Dt as createSeededRandom,
  jr as demoCatalogueActivities,
  vr as demoClassification,
  fr as demoDragDrop,
  mr as demoOptionCards,
  gr as demoPhraseCompletion,
  Nr as demoReflection,
  yr as demoSequence,
  br as demoShortResponse,
  hr as demoTrueFalse,
  Yr as emptyPracticeProgress,
  jt as hashSeed,
  Ze as isCatalogueReactType,
  Dr as isCompletableReactBlock,
  dt as isIndependentKind,
  Ur as isPracticeCompletionCue,
  Cr as isScorableReactBlock,
  ut as isSessionKind,
  Ft as learnerSafeBlock,
  kr as learnerSafeCheckedResult,
  Gr as learnerSafeCheckedResults,
  zr as learnerSafeResultFromActivityResult,
  Qt as looksLikeTrueFalseOptions,
  ot as mergeWeekUiFeatures,
  me as normaliseActivityType,
  ze as presentationShuffleSeed,
  _e as questionIdFor,
  Xe as resolveMinChars,
  dr as resolveProgressFraction,
  Be as resolveWeekStatus,
  xe as restoredCheckedDisplay,
  Kr as scorableBlocksComplete,
  it as shouldShowContext,
  er as shouldShuffle,
  Te as shuffled,
  qt as stableShuffle,
  Ke as statusLabel,
  ht as statusTone,
  Ee as useRestoredCheckedFeedback,
  xt as weekAccessFallbackCopy,
  Ve as weekIsAccessible
};
//# sourceMappingURL=index.js.map
