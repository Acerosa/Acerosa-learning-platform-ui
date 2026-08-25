import { jsxs as s, jsx as t } from "react/jsx-runtime";
import { useId as ae, useState as k, useEffect as re, useMemo as X, useCallback as te, useRef as ie } from "react";
const oe = ["exam", "assignment", "project"], de = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], ne = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, ct = ["not-started", "in-progress", "completed"], st = ["available", "planned", "progress", "completed"], ue = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function pe(e = {}) {
  return { ...ue, ...e };
}
function he(e, n) {
  return n ? n === "assignment" ? e.showAssignmentContext !== !1 : n === "exam" ? e.showExamContext !== !1 : n === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function me(e) {
  return e === "independent-study" || e === "homework";
}
function fe(e) {
  return de.includes(e);
}
const be = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, ge = {
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
function ye(e) {
  return be[e || ""] || "planned";
}
function ce(e, n = "") {
  return ge[e || ""] || n || String(e || "Planned");
}
function ve(e, n = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : n;
}
function le({
  status: e = "planned",
  label: n,
  marker: a = !0
}) {
  const r = ye(e);
  return /* @__PURE__ */ s("span", { className: `lp-status-badge lp-status-badge--${r}`, role: "status", children: [
    a ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "● " }) : null,
    n || ce(e)
  ] });
}
function Ne({
  title: e = "Untitled activity",
  description: n = "",
  activityType: a = "Activity",
  duration: r = "",
  status: l = "Not started",
  state: i,
  href: c,
  actionLabel: o,
  badge: u = !1,
  badgeStatus: b,
  headingLevel: g = 2,
  muted: _ = !1
}) {
  const y = g === 3 ? "h3" : "h2", m = [a, r].filter(Boolean), N = i ? ce(i, l) : l;
  return /* @__PURE__ */ s("article", { className: _ ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": i || void 0, children: [
    u ? /* @__PURE__ */ t(
      le,
      {
        status: b || i || "planned",
        label: typeof l == "string" && l !== "Not started" ? l : void 0
      }
    ) : null,
    m.length ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: m.join(" · ") }) : null,
    /* @__PURE__ */ t(y, { children: e }),
    n ? /* @__PURE__ */ t("p", { children: n }) : null,
    /* @__PURE__ */ t("p", { className: "lp-card__meta", children: `Status: ${N}` }),
    c ? /* @__PURE__ */ t("div", { className: "lp-card__actions", children: /* @__PURE__ */ t("a", { className: "lp-button", href: c, children: o || ve(i) }) }) : null
  ] });
}
function _e(e, n) {
  return e.href ? e.href : e.path != null && n ? n(e.path) : e.path || void 0;
}
function Ce({ items: e = [], resolveHref: n }) {
  return e.length ? /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ t("ol", { className: "lp-breadcrumbs__list", children: e.map((a, r) => {
    const l = r === e.length - 1, i = _e(a, n);
    return /* @__PURE__ */ t("li", { children: l || !i ? /* @__PURE__ */ t("span", { "aria-current": "page", children: a.label }) : /* @__PURE__ */ t("a", { href: i, children: a.label }) }, `${a.label}-${r}`);
  }) }) }) : /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const ke = ["info", "success", "warning", "error"];
function Ie({ tone: e = "info", title: n, message: a }) {
  const r = ke.includes(e) ? e : "info";
  return /* @__PURE__ */ s(
    "aside",
    {
      className: `lp-callout lp-callout--${r}`,
      role: r === "error" ? "alert" : void 0,
      children: [
        n ? /* @__PURE__ */ t("strong", { children: n }) : null,
        a ? /* @__PURE__ */ t("p", { children: a }) : null
      ]
    }
  );
}
function Se({
  contextType: e = "assignment",
  heading: n = "Context",
  items: a = [],
  description: r = "",
  action: l
}) {
  const i = oe.includes(e) ? e : "assignment", c = `lp-context-${i}`;
  return /* @__PURE__ */ s(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${i}`,
      "aria-labelledby": c,
      "data-context-type": i,
      children: [
        /* @__PURE__ */ t("h2", { id: c, children: n }),
        a.length ? /* @__PURE__ */ t("dl", { className: "lp-meta-list", children: a.map((o) => /* @__PURE__ */ s("div", { children: [
          /* @__PURE__ */ t("dt", { children: o.label }),
          /* @__PURE__ */ t("dd", { children: o.value })
        ] }, `${o.label}:${o.value}`)) }) : null,
        r ? /* @__PURE__ */ t("p", { children: r }) : null,
        l != null && l.label && (l != null && l.href) ? /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: l.href, children: l.label }) }) : null
      ]
    }
  );
}
function we({
  heading: e = "Nothing to show yet",
  message: n = "Check again later.",
  action: a
}) {
  return /* @__PURE__ */ s("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: n }),
    a != null && a.label && (a != null && a.href) ? /* @__PURE__ */ t("a", { className: "lp-button", href: a.href, children: a.label }) : null
  ] });
}
function it({
  heading: e = "There is a problem",
  message: n = "Try again."
}) {
  return /* @__PURE__ */ s("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: n })
  ] });
}
function Te({
  items: e,
  currentId: n = "home",
  currentIds: a = [],
  brandTitle: r,
  brandTagline: l,
  homeHref: i,
  theme: c = null,
  actions: o,
  listId: u
}) {
  const b = ae(), g = u || `lp-navigation-list-${b}`, [_, y] = k(!1), m = new Set([n, ...a].filter(Boolean)), N = e.find((f) => f.id === "home" && f.enabled !== !1), I = e.filter((f) => f.enabled !== !1);
  re(() => {
    function f(T) {
      T.key === "Escape" && y(!1);
    }
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, []);
  function w(f) {
    if (f.key === "Escape") {
      y(!1);
      const T = f.currentTarget.querySelector(".lp-navigation__toggle");
      T == null || T.focus();
    }
  }
  return /* @__PURE__ */ t("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: w, children: /* @__PURE__ */ s("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ s("a", { className: "lp-navigation__brand", href: i || (N == null ? void 0 : N.path) || "./", children: [
      /* @__PURE__ */ t("span", { className: "lp-navigation__brand-title", children: r }),
      l ? /* @__PURE__ */ t("span", { className: "lp-navigation__brand-tagline", children: l }) : null
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": _,
        "aria-controls": g,
        "aria-label": _ ? "Close main menu" : "Open main menu",
        onClick: () => y((f) => !f),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ t(
      "ul",
      {
        className: "lp-navigation__list",
        id: g,
        "data-open": _ ? "true" : "false",
        children: I.map((f) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
          "a",
          {
            className: "lp-navigation__link",
            href: f.path,
            "aria-current": m.has(f.id) ? "page" : void 0,
            onClick: () => y(!1),
            children: f.label
          }
        ) }, f.id))
      }
    ),
    c ? /* @__PURE__ */ s("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ t(
        "select",
        {
          "aria-label": "Theme preference",
          value: c.preference,
          onChange: (f) => c.onChange(f.target.value),
          children: c.modes.map((f) => /* @__PURE__ */ t("option", { value: f, children: f[0].toUpperCase() + f.slice(1) }, f))
        }
      )
    ] }) : null,
    o ? /* @__PURE__ */ t("div", { className: "lp-navigation__actions", children: o }) : null
  ] }) });
}
function ot({
  brandTitle: e,
  brandTagline: n,
  navigation: a,
  currentId: r = "home",
  currentIds: l = [],
  theme: i = null,
  actions: c,
  breadcrumbs: o,
  resolveHref: u,
  pageHeader: b,
  footer: g,
  learnerHeader: _,
  notice: y,
  skipLabel: m = "Skip to main content",
  mainId: N = "main-content",
  children: I
}) {
  const w = g && typeof g == "object" && "lines" in g ? g.lines.map((f) => /* @__PURE__ */ t("p", { children: f }, f)) : g;
  return /* @__PURE__ */ s("div", { className: "lp-shell", children: [
    /* @__PURE__ */ t("a", { className: "lp-skip-link skip-link", href: `#${N}`, children: m }),
    /* @__PURE__ */ t("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ t(
      Te,
      {
        items: a,
        currentId: r,
        currentIds: l,
        brandTitle: e,
        brandTagline: n,
        theme: i,
        actions: c
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "lp-shell__learner", children: _ }),
    y,
    o ? /* @__PURE__ */ t(Ce, { items: o, resolveHref: u }) : null,
    b != null && b.title ? /* @__PURE__ */ s("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ t("h1", { children: b.title }),
      b.subtitle ? /* @__PURE__ */ t("p", { className: "lp-page-header__subtitle", children: b.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ t("main", { id: N, className: "lp-shell__main site-main", tabIndex: -1, children: I }),
    /* @__PURE__ */ t("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: w })
  ] });
}
function dt({
  learner: e,
  hubName: n,
  accountHref: a = "./account/",
  onSignOut: r
}) {
  return e ? /* @__PURE__ */ s("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ s("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Learner" }),
        /* @__PURE__ */ t("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Year group" }),
        /* @__PURE__ */ t("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Email" }),
        /* @__PURE__ */ t("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Current hub" }),
        /* @__PURE__ */ t("dd", { children: n })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ t("a", { href: a, children: "Account" }),
      r ? /* @__PURE__ */ t("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        r();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ t("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function Ae({ id: e, title: n }) {
  const a = [e, n].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ t("span", { className: "lp-outcome-badge", children: a });
}
function ut({ message: e = "Loading…" }) {
  return /* @__PURE__ */ s("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ t("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { children: e })
  ] });
}
function $e({
  title: e = "Progress",
  completed: n = 0,
  total: a = 0,
  description: r = ""
}) {
  const l = Math.max(0, Number(a) || 0), i = Math.min(l, Math.max(0, Number(n) || 0)), c = l ? Math.round(i / l * 100) : 0;
  return /* @__PURE__ */ s("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    r ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: r }) : null,
    /* @__PURE__ */ t(
      "progress",
      {
        className: "lp-progress",
        max: l || 1,
        value: i,
        "aria-label": `${c}% complete`
      }
    ),
    /* @__PURE__ */ t("p", { children: `${i} of ${l} complete (${c}%)` })
  ] });
}
function Ee({
  id: e,
  title: n,
  kind: a = "session",
  summary: r = "",
  defaultOpen: l = !1,
  meta: i,
  children: c
}) {
  const o = fe(a) ? a : "session", u = ne[o];
  return /* @__PURE__ */ s("details", { className: "lp-session lp-panel", id: e, "data-kind": o, open: l, children: [
    /* @__PURE__ */ t("summary", { className: "lp-session__summary", children: /* @__PURE__ */ s("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ t("h2", { className: "lp-session__heading", children: n || u }),
      /* @__PURE__ */ t("span", { className: "lp-session__meta", children: i || u })
    ] }) }),
    /* @__PURE__ */ s("div", { className: "lp-session__content", children: [
      r ? /* @__PURE__ */ t("p", { className: "lp-panel-note", children: r }) : null,
      /* @__PURE__ */ t("div", { className: "lp-activity-list", children: c })
    ] })
  ] });
}
function Pe({
  teachingWeek: e,
  title: n = "",
  subtitle: a = "",
  status: r,
  learningOutcomes: l = [],
  headingLevel: i = 1,
  showTitle: c = !0
}) {
  const o = e ? `Week ${e}${n ? `: ${n}` : ""}` : n || "Week";
  return /* @__PURE__ */ s("header", { className: "lp-week-header", children: [
    r ? /* @__PURE__ */ t(le, { status: r }) : null,
    c ? /* @__PURE__ */ t(i === 2 ? "h2" : "h1", { children: o }) : e ? /* @__PURE__ */ t("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-week-header__subtitle", children: a }) : null,
    l.length ? /* @__PURE__ */ t("ul", { className: "lp-week-header__outcomes", children: l.map((b) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(Ae, { id: b.id, title: b.title }) }, b.id || b.title)) }) : null
  ] });
}
function Le({ previousWeek: e, nextWeek: n }) {
  return !(e != null && e.href) && !(n != null && n.href) ? null : /* @__PURE__ */ t("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ s("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    n != null && n.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: n.href, rel: "next", children: n.label || "Next week" }) }) : null
  ] }) });
}
function Oe(e) {
  if (e.meta) return e.meta;
  const n = (e.activities || []).length, a = `${n} ${n === 1 ? "activity" : "activities"}`, r = ne[e.kind || "session"] || ne.session;
  return e.kind && e.kind !== "session" ? `${r} · ${a}` : a;
}
function Me(e, n) {
  return "html" in e && e.html ? /* @__PURE__ */ t(
    "div",
    {
      className: "lp-activity-html",
      dangerouslySetInnerHTML: { __html: e.html }
    },
    n
  ) : "children" in e && e.children ? /* @__PURE__ */ t("div", { children: e.children }, n) : /* @__PURE__ */ t(Ne, { ...e }, n);
}
function pt({
  week: e = {},
  learningOutcomes: n = [],
  context: a = null,
  sessions: r = [],
  progress: l = null,
  previousWeek: i,
  nextWeek: c,
  features: o = {},
  renderActivity: u
}) {
  const b = pe(o), g = (a == null ? void 0 : a.type) || (a == null ? void 0 : a.contextType), _ = r.filter((m) => !(b.showIndependentStudy === !1 && me(m.kind))), y = u || Me;
  return /* @__PURE__ */ s("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ t(
      Pe,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: b.showLearningOutcomes ? n : [],
        headingLevel: e.headingLevel || 1,
        showTitle: b.showTitle !== !1
      }
    ),
    a && he(b, g) ? /* @__PURE__ */ t(
      Se,
      {
        contextType: g,
        heading: a.heading,
        items: a.items,
        description: a.description,
        action: a.action
      }
    ) : null,
    _.length ? _.map((m) => /* @__PURE__ */ t(
      Ee,
      {
        id: m.id,
        title: m.title,
        kind: m.kind,
        summary: m.summary,
        defaultOpen: m.defaultOpen,
        meta: Oe(m),
        children: (m.activities || []).map((N, I) => y(N, I))
      },
      m.id || m.title
    )) : /* @__PURE__ */ t(
      we,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    b.showProgress && l ? /* @__PURE__ */ t($e, { ...l }) : null,
    /* @__PURE__ */ t(Le, { previousWeek: i, nextWeek: c })
  ] });
}
const De = ["neutral", "correct", "incorrect", "informative", "hint"], Fe = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function W({
  state: e = "neutral",
  title: n,
  message: a
}) {
  const r = De.includes(e) ? e : "neutral", l = Fe[r];
  return !a && !n ? null : /* @__PURE__ */ t("div", { className: "lp-feedback", "data-lp-feedback-state": r, "data-lp-feedback": !0, children: /* @__PURE__ */ t(Ie, { tone: l.tone, title: n || l.label, message: a }) });
}
function ee(e, n) {
  const a = e.slice();
  if (!n || a.length < 2) return a;
  for (let r = a.length - 1; r > 0; r -= 1) {
    const l = Math.floor(Math.random() * (r + 1)), i = a[r];
    a[r] = a[l], a[l] = i;
  }
  return a;
}
function J(e) {
  return e.label || e.text || e.id;
}
function xe({
  id: e = "classification",
  title: n,
  prompt: a,
  instructions: r,
  items: l,
  categories: i,
  feedback: c,
  formative: o = !0,
  retry: u = !0,
  shuffle: b = !1,
  maxAttempts: g,
  initialAssignments: _ = {},
  onResult: y
}) {
  const m = X(() => ee(l, b), [l, b]), [N, I] = k({ ..._ }), [w, f] = k(null), [T, R] = k(0), [D, K] = k(!1), [x, L] = k("neutral"), [E, B] = k(""), j = Object.fromEntries(
    l.filter((d) => d.correctCategoryId).map((d) => [d.id, d.correctCategoryId])
  ), A = !!(o && Object.keys(j).length), O = D, q = D && u && (typeof g != "number" || T < g), Y = m.filter((d) => !N[d.id]), p = m.find((d) => d.id === w);
  function v(d) {
    y == null || y(d);
  }
  function P(d, h) {
    I((C) => ({ ...C, [d]: h })), f(null);
  }
  function M(d) {
    f((h) => h === d ? null : d);
  }
  function U(d) {
    w && P(w, d);
  }
  function z(d) {
    I((h) => {
      const C = { ...h };
      return delete C[d], C;
    }), f(null);
  }
  function S() {
    if (!l.every(($) => N[$.id])) {
      L("informative"), B("Place every item in a category before checking.");
      return;
    }
    const h = T + 1, C = A ? l.filter(($) => N[$.id] === j[$.id]).length : 0, F = A ? C === l.length : null;
    R(h), K(!0), L(F === !0 ? "correct" : F === !1 ? "incorrect" : "informative"), B(A ? F ? (c == null ? void 0 : c.correct) || "Those items match the expected categories." : (c == null ? void 0 : c.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), v({
      completed: !0,
      correct: F,
      score: A ? { correct: C, total: l.length } : void 0,
      attempts: h,
      responses: { ...N }
    });
  }
  function G() {
    I({}), f(null), K(!1), L("neutral"), B(""), v({ completed: !1, correct: null, attempts: T, responses: {} });
  }
  return /* @__PURE__ */ s("section", { className: "lp-block lp-block--interactive", "data-lp-block": "classification", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: p ? `Selected: ${J(p)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
    /* @__PURE__ */ s("fieldset", { className: "lp-fieldset", disabled: O, children: [
      /* @__PURE__ */ t("legend", { children: a }),
      /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "Items" }),
      /* @__PURE__ */ s("div", { className: "lp-card__actions", children: [
        Y.map((d) => /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": w === d.id,
            onClick: () => M(d.id),
            children: [
              J(d),
              w === d.id ? " (selected)" : ""
            ]
          },
          d.id
        )),
        Y.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((d) => {
        const h = m.filter((C) => N[C.id] === d.id);
        return /* @__PURE__ */ s("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: d.label }) }),
          /* @__PURE__ */ t("ul", { className: "lp-activity-list", children: h.map((C) => {
            const F = D && A ? j[C.id] === d.id ? "Correct" : "Incorrect" : "Placed";
            return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                onClick: () => z(C.id),
                children: [
                  J(C),
                  " · ",
                  F,
                  O ? "" : " · Return"
                ]
              }
            ) }, C.id);
          }) }),
          h.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "No items yet" }) : null,
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              className: "lp-button",
              disabled: !w,
              onClick: () => U(d.id),
              children: [
                "Place in ",
                J(d)
              ]
            }
          )
        ] }, d.id);
      }) }),
      /* @__PURE__ */ s("details", { children: [
        /* @__PURE__ */ t("summary", { children: "Use dropdown lists instead" }),
        m.map((d) => /* @__PURE__ */ s("p", { className: "lp-form__field", children: [
          /* @__PURE__ */ t("label", { htmlFor: `${e}-${d.id}`, children: J(d) }),
          /* @__PURE__ */ s(
            "select",
            {
              id: `${e}-${d.id}`,
              "data-lp-item": d.id,
              value: N[d.id] || "",
              disabled: O,
              onChange: (h) => {
                const C = h.target.value;
                I((F) => {
                  const $ = { ...F };
                  return C ? $[d.id] = C : delete $[d.id], $;
                }), f(null);
              },
              children: [
                /* @__PURE__ */ t("option", { value: "", children: "Select a category" }),
                i.map((h) => /* @__PURE__ */ t("option", { value: h.id, children: h.label }, h.id))
              ]
            }
          )
        ] }, `list-${d.id}`))
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: S, disabled: O, children: "Check types" }),
      q ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: G, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: x, message: E })
  ] });
}
function se() {
  const [e, n] = k({}), [a, r] = k(null), l = te((u, b = e) => Object.keys(b).find((g) => b[g] === u) || null, [e]), i = te((u) => {
    r((b) => b === u ? null : u);
  }, []), c = te((u) => {
    if (!a) {
      const g = l(u);
      g && r(g);
      return;
    }
    const b = a;
    n((g) => {
      const _ = { ...g }, y = Object.keys(_).find((m) => _[m] === u);
      return y && delete _[y], _[b] = u, _;
    }), r(null);
  }, [l, a]), o = te(() => {
    n({}), r(null);
  }, []);
  return { placements: e, selectedItemId: a, selectItem: i, selectTarget: c, occupantOf: l, reset: o };
}
function Be({
  id: e = "drag-drop",
  title: n,
  prompt: a,
  instructions: r,
  items: l,
  targets: i,
  correct: c = {},
  feedback: o,
  formative: u = !0,
  retry: b = !0,
  shuffle: g = !1,
  maxAttempts: _,
  onResult: y
}) {
  var z;
  const m = X(() => ee(l, g), [l, g]), { placements: N, selectedItemId: I, selectItem: w, selectTarget: f, occupantOf: T, reset: R } = se(), [D, K] = k(0), [x, L] = k(!1), [E, B] = k("neutral"), [j, A] = k(""), O = !!(u && Object.keys(c).length), q = x, Y = x && b && (typeof _ != "number" || D < _), p = m.filter((S) => !N[S.id]), v = (z = m.find((S) => S.id === I)) == null ? void 0 : z.label;
  function P(S) {
    y == null || y(S);
  }
  function M() {
    if (!l.every((C) => N[C.id])) {
      B("informative"), A("Place every item before checking.");
      return;
    }
    const G = D + 1, d = O ? l.filter((C) => N[C.id] === c[C.id]).length : 0, h = O ? d === l.length : null;
    K(G), L(!0), B(h === !0 ? "correct" : h === !1 ? "incorrect" : "informative"), A(O ? h ? (o == null ? void 0 : o.correct) || "Those placements match the expected targets." : (o == null ? void 0 : o.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), P({
      completed: !0,
      correct: h,
      score: O ? { correct: d, total: l.length } : void 0,
      attempts: G,
      responses: { ...N }
    });
  }
  function U() {
    R(), L(!1), B("neutral"), A(""), P({ completed: !1, correct: null, attempts: D, responses: {} });
  }
  return /* @__PURE__ */ s("section", { className: "lp-block lp-block--interactive", "data-lp-block": "drag-drop", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { children: a }),
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: v ? `Selected: ${v}. Choose a target.` : "Select an item, then select a target to place it." }),
    /* @__PURE__ */ s("fieldset", { className: "lp-fieldset", disabled: q, children: [
      /* @__PURE__ */ t("legend", { children: "Items" }),
      /* @__PURE__ */ s("div", { className: "lp-card__actions", children: [
        p.map((S) => /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": I === S.id,
            onClick: () => w(S.id),
            children: [
              S.label,
              I === S.id ? " (selected)" : ""
            ]
          },
          S.id
        )),
        p.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] })
    ] }),
    /* @__PURE__ */ s("fieldset", { className: "lp-fieldset", disabled: q, children: [
      /* @__PURE__ */ t("legend", { children: "Targets" }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((S) => {
        const G = T(S.id), d = l.find((C) => C.id === G), h = x && O && G ? c[G] === S.id ? "Correct" : "Incorrect" : d ? "Placed" : "Empty";
        return /* @__PURE__ */ s("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: S.label }) }),
          /* @__PURE__ */ s("p", { className: "lp-card__meta", children: [
            d ? d.label : "No item yet",
            " · ",
            h
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button",
              onClick: () => f(S.id),
              children: d ? `Place on ${S.label} (replace ${d.label})` : `Place on ${S.label}`
            }
          )
        ] }, S.id);
      }) })
    ] }),
    /* @__PURE__ */ s("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: M, disabled: q, children: "Check placement" }),
      Y ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: U, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: E, message: j })
  ] });
}
function je({
  id: e = "option-cards",
  title: n,
  prompt: a,
  instructions: r,
  options: l,
  correctOptionId: i,
  feedback: c,
  formative: o = !0,
  retry: u = !0,
  shuffle: b = !1,
  maxAttempts: g,
  initialSelectedId: _,
  onResult: y
}) {
  const m = X(() => ee(l, b), [l, b]), [N, I] = k(_ || null), [w, f] = k(0), [T, R] = k(!1), [D, K] = k("neutral"), [x, L] = k(""), E = !!(o && i), B = `lp-option-cards-${e}`, j = T, A = T && u && (typeof g != "number" || w < g);
  function O(p) {
    y == null || y(p);
  }
  function q() {
    if (!N) {
      K("informative"), L("Choose an option before checking.");
      return;
    }
    const p = w + 1, v = E ? N === i : null, P = E ? v ? (c == null ? void 0 : c.correct) || "That matches the expected option." : (c == null ? void 0 : c.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    f(p), R(!0), K(v === !0 ? "correct" : v === !1 ? "incorrect" : "informative"), L(P), O({
      completed: !0,
      correct: v,
      score: E ? { correct: v ? 1 : 0, total: 1 } : void 0,
      attempts: p,
      responses: { optionId: N }
    });
  }
  function Y() {
    I(null), R(!1), K("neutral"), L(""), O({
      completed: !1,
      correct: null,
      attempts: w,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ s("section", { className: "lp-block lp-block--interactive", "data-lp-block": "option-cards", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ s("fieldset", { className: "lp-fieldset", disabled: j, children: [
      /* @__PURE__ */ t("legend", { children: a }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: m.map((p) => {
        const v = N === p.id, M = T && E && v ? p.id === i ? "Correct" : "Incorrect" : v ? "Selected" : "";
        return /* @__PURE__ */ s("label", { className: "lp-card lp-activity-card", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "radio",
              name: B,
              value: p.id,
              checked: v,
              "data-lp-response": "",
              onChange: () => I(p.id)
            }
          ),
          /* @__PURE__ */ s("span", { children: [
            /* @__PURE__ */ t("strong", { children: p.label }),
            p.description ? /* @__PURE__ */ s("span", { className: "lp-card__meta", children: [
              " — ",
              p.description
            ] }) : null
          ] }),
          p.imageSrc ? /* @__PURE__ */ t("img", { src: p.imageSrc, alt: p.imageAlt || p.label }) : null,
          M ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: M }) : null
        ] }, p.id);
      }) })
    ] }),
    /* @__PURE__ */ s("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: q, disabled: j, children: "Check answer" }),
      A ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: D, message: x })
  ] });
}
function qe(e, n) {
  var o;
  const a = [], r = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let l = 0, i = 0, c;
  for (; (c = r.exec(e)) !== null; ) {
    c.index > l && a.push(e.slice(l, c.index));
    const u = c[1] || ((o = n[i]) == null ? void 0 : o.id) || `gap-${i + 1}`;
    i += 1, a.push({ gapId: u }), l = c.index + c[0].length;
  }
  return l < e.length && a.push(e.slice(l)), !a.some((u) => typeof u != "string") && n[0] && (a.push(" "), a.push({ gapId: n[0].id })), a;
}
function Ke({
  id: e = "phrase-completion",
  title: n,
  prompt: a,
  instructions: r,
  gaps: l,
  options: i,
  correctOptionId: c,
  feedback: o,
  formative: u = !0,
  retry: b = !0,
  shuffle: g = !1,
  maxAttempts: _,
  onResult: y
}) {
  var d;
  const m = X(() => l && l.length ? l : [{ id: "gap", label: "missing term", correctOptionId: c || void 0 }], [c, l]), N = X(() => ee(i, g), [i, g]), I = X(() => qe(a, m), [a, m]), { placements: w, selectedItemId: f, selectItem: T, selectTarget: R, occupantOf: D, reset: K } = se(), [x, L] = k(0), [E, B] = k(!1), [j, A] = k("neutral"), [O, q] = k(""), Y = Object.fromEntries(
    m.map((h) => [h.id, h.correctOptionId]).filter((h) => h[1])
  ), p = !!(u && Object.keys(Y).length), v = E, P = E && b && (typeof _ != "number" || x < _), M = N.filter((h) => !w[h.id]), U = (d = i.find((h) => h.id === f)) == null ? void 0 : d.label;
  function z(h) {
    y == null || y(h);
  }
  function S() {
    if (!m.every((H) => D(H.id))) {
      A("informative"), q("Fill every blank before checking.");
      return;
    }
    const C = x + 1, F = {};
    m.forEach((H) => {
      const Z = D(H.id);
      Z && (F[H.id] = Z);
    });
    const $ = p ? m.filter((H) => F[H.id] === Y[H.id]).length : 0, V = p ? $ === m.length : null;
    L(C), B(!0), A(V === !0 ? "correct" : V === !1 ? "incorrect" : "informative"), q(p ? V ? (o == null ? void 0 : o.correct) || "That completes the phrase." : (o == null ? void 0 : o.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), z({
      completed: !0,
      correct: V,
      score: p ? { correct: $, total: m.length } : void 0,
      attempts: C,
      responses: F
    });
  }
  function G() {
    K(), B(!1), A("neutral"), q(""), z({ completed: !1, correct: null, attempts: x, responses: {} });
  }
  return /* @__PURE__ */ s("section", { className: "lp-block lp-block--interactive", "data-lp-block": "fill-gap", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: U ? `Selected: ${U}. Choose a blank.` : "Select a phrase, then select the blank." }),
    /* @__PURE__ */ t("p", { children: I.map((h, C) => {
      if (typeof h == "string") return /* @__PURE__ */ t("span", { children: h }, `text-${C}`);
      const F = D(h.gapId), $ = i.find((Z) => Z.id === F), V = m.find((Z) => Z.id === h.gapId), H = E && p && F ? Y[h.gapId] === F ? "Correct" : "Incorrect" : $ ? "Filled" : "Blank";
      return /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "lp-button lp-button--secondary",
          disabled: v,
          "aria-label": `${(V == null ? void 0 : V.label) || "blank"}: ${($ == null ? void 0 : $.label) || "empty"}. ${H}`,
          onClick: () => R(h.gapId),
          children: ($ == null ? void 0 : $.label) || "______"
        },
        h.gapId
      );
    }) }),
    /* @__PURE__ */ s("fieldset", { className: "lp-fieldset", disabled: v, children: [
      /* @__PURE__ */ t("legend", { children: "Available phrases" }),
      /* @__PURE__ */ t("div", { className: "lp-card__actions", children: M.map((h) => /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          className: "lp-button",
          "aria-pressed": f === h.id,
          onClick: () => T(h.id),
          children: [
            h.label,
            f === h.id ? " (selected)" : ""
          ]
        },
        h.id
      )) })
    ] }),
    /* @__PURE__ */ s("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: S, disabled: v, children: "Check phrase" }),
      P ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: G, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: j, message: O })
  ] });
}
function Ye({
  id: e = "sequence",
  title: n,
  prompt: a,
  instructions: r,
  items: l,
  correctOrder: i = [],
  feedback: c,
  formative: o = !0,
  retry: u = !0,
  shuffle: b = !1,
  maxAttempts: g,
  onResult: _
}) {
  const y = X(() => ee(l, b), [l, b]), [m, N] = k(y), [I, w] = k(0), [f, T] = k(!1), [R, D] = k("neutral"), [K, x] = k(""), L = !!(o && i.length), E = f, B = f && u && (typeof g != "number" || I < g);
  function j(p) {
    _ == null || _(p);
  }
  function A(p, v) {
    const P = p + v;
    if (P < 0 || P >= m.length) return;
    const M = m.slice(), [U] = M.splice(p, 1);
    M.splice(P, 0, U), N(M);
  }
  function O(p, v) {
    E || (p.key === "ArrowUp" && (p.preventDefault(), A(v, -1)), p.key === "ArrowDown" && (p.preventDefault(), A(v, 1)));
  }
  function q() {
    const p = I + 1, v = m.map((U) => U.id), P = L ? v.filter((U, z) => U === i[z]).length : 0, M = L ? P === i.length && v.length === i.length : null;
    w(p), T(!0), D(M === !0 ? "correct" : M === !1 ? "incorrect" : "informative"), x(L ? M ? (c == null ? void 0 : c.correct) || "That order matches the expected sequence." : (c == null ? void 0 : c.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), j({
      completed: !0,
      correct: M,
      score: L ? { correct: P, total: i.length } : void 0,
      attempts: p,
      responses: { itemIds: v }
    });
  }
  function Y() {
    N(y), T(!1), D("neutral"), x(""), j({
      completed: !1,
      correct: null,
      attempts: I,
      responses: { itemIds: y.map((p) => p.id) }
    });
  }
  return /* @__PURE__ */ s("section", { className: "lp-block lp-block--interactive", "data-lp-block": "ordering", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { children: a }),
    /* @__PURE__ */ t("ol", { className: "lp-activity-list", children: m.map((p, v) => /* @__PURE__ */ s(
      "li",
      {
        className: "lp-card",
        tabIndex: E ? -1 : 0,
        "aria-label": `${p.label}, position ${v + 1} of ${m.length}`,
        onKeyDown: (P) => O(P, v),
        children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ s("strong", { children: [
            v + 1,
            ". ",
            p.label
          ] }) }),
          /* @__PURE__ */ s("div", { className: "lp-card__actions", children: [
            /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                disabled: E || v === 0,
                onClick: () => A(v, -1),
                children: [
                  "Move ",
                  p.label,
                  " up"
                ]
              }
            ),
            /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                disabled: E || v === m.length - 1,
                onClick: () => A(v, 1),
                children: [
                  "Move ",
                  p.label,
                  " down"
                ]
              }
            )
          ] })
        ]
      },
      p.id
    )) }),
    /* @__PURE__ */ s("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: q, disabled: E, children: "Check order" }),
      B ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: R, message: K })
  ] });
}
function Q(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Ue(e) {
  var n;
  return (e == null ? void 0 : e.formative) === !0 || ((n = e == null ? void 0 : e.marking) == null ? void 0 : n.mode) === "formative-local";
}
function Re(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function Ge(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const ze = [
  "single-choice",
  "option-cards",
  "classification",
  "drag-drop",
  "fill-gap",
  "phrase-completion",
  "ordering",
  "sequence"
];
function He(e) {
  return ze.includes(Q(e));
}
function Ve(e) {
  var n;
  return ((n = e.content) == null ? void 0 : n.questionId) || e.id;
}
function Xe(e) {
  const n = e.content || {};
  return {
    id: e.id,
    instructions: n.instructions,
    feedback: n.feedback,
    formative: Ue(n),
    retry: Re(n),
    shuffle: Ge(n),
    maxAttempts: n.maxAttempts
  };
}
function Ze({ block: e, initialResponse: n, onResult: a }) {
  const r = Q(e.type), l = e.content || {}, i = Q(l.presentation), c = Xe(e), o = (u) => a == null ? void 0 : a(u, e);
  if (r === "single-choice" || r === "option-cards" || i === "option-cards" || i === "true-false" || i === "picture-quiz")
    return /* @__PURE__ */ t(
      je,
      {
        ...c,
        prompt: l.prompt || "Choose an option",
        options: l.options || [],
        correctOptionId: l.correctOptionId,
        initialSelectedId: typeof n == "string" ? n : void 0,
        onResult: o
      }
    );
  if (r === "classification") {
    const u = n && typeof n == "object" && !Array.isArray(n) ? n : void 0;
    return /* @__PURE__ */ t(
      xe,
      {
        ...c,
        prompt: l.prompt || "Classify each item",
        items: l.items || [],
        categories: l.categories || [],
        initialAssignments: u,
        onResult: o
      }
    );
  }
  return r === "drag-drop" ? /* @__PURE__ */ t(
    Be,
    {
      ...c,
      prompt: l.prompt || "Place each item",
      items: l.items || [],
      targets: l.targets || [],
      correct: l.correct,
      onResult: o
    }
  ) : r === "fill-gap" || r === "phrase-completion" ? /* @__PURE__ */ t(
    Ke,
    {
      ...c,
      prompt: l.prompt || "Complete the phrase",
      gaps: l.gaps,
      options: l.options || [],
      correctOptionId: l.correctOptionId,
      onResult: o
    }
  ) : r === "ordering" || r === "sequence" ? /* @__PURE__ */ t(
    Ye,
    {
      ...c,
      prompt: l.prompt || "Put the items in order",
      items: l.items || [],
      correctOrder: l.correctOrder,
      onResult: o
    }
  ) : /* @__PURE__ */ s("p", { className: "lp-card__meta", "data-lp-block": r, children: [
    "This ",
    r || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function ht({
  activity: e,
  initialResponses: n = {},
  renderFallback: a,
  onResult: r
}) {
  var c, o;
  const [l, i] = k(0);
  return /* @__PURE__ */ s(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": e.version || "0.1.0",
      children: [
        (c = e.metadata) != null && c.title ? /* @__PURE__ */ t("h3", { children: e.metadata.title }) : null,
        (o = e.metadata) != null && o.summary ? /* @__PURE__ */ t("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ t("div", { className: "lp-activity-list", children: (e.blocks || []).map((u) => He(u.type) ? /* @__PURE__ */ t(
          Ze,
          {
            block: u,
            initialResponse: n[Ve(u)],
            onResult: r
          },
          u.id
        ) : a ? /* @__PURE__ */ t("div", { children: a(u) }, u.id) : /* @__PURE__ */ s("p", { className: "lp-card__meta", "data-lp-block": Q(u.type), children: [
          "This ",
          Q(u.type) || "unknown",
          " block is not part of the React activity catalogue yet."
        ] }, u.id)) }, l),
        /* @__PURE__ */ s("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => i((u) => u + 1),
              children: "Reset activity"
            }
          ),
          /* @__PURE__ */ t("p", { className: "lp-activity-status", "data-lp-activity-status": !0, role: "status", "aria-live": "polite" })
        ] })
      ]
    }
  );
}
function Je(e, n) {
  if (e)
    try {
      n && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !n && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      n ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function mt({
  open: e = !1,
  title: n = "Activity complete",
  completed: a = !0,
  score: r,
  attempts: l,
  message: i,
  onClose: c,
  onReview: o,
  onNext: u,
  nextLabel: b = "Continue",
  reviewLabel: g = "Review"
}) {
  const _ = ie(null), y = ae();
  if (re(() => {
    Je(_.current, e);
  }, [e]), !e) return null;
  const m = a ? "Completed" : "In progress", N = r ? `${r.correct} of ${r.total} correct` : null, I = typeof l == "number" ? `${l} ${l === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ s(
    "dialog",
    {
      ref: _,
      className: "lp-dialog",
      "aria-labelledby": y,
      onCancel: (w) => {
        w.preventDefault(), c == null || c();
      },
      children: [
        /* @__PURE__ */ s("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ t("h2", { id: y, children: n }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${n}`,
              onClick: c,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ t(le, { status: a ? "completed" : "progress", label: m }),
          N ? /* @__PURE__ */ t("p", { children: N }) : null,
          I ? /* @__PURE__ */ t("p", { children: I }) : null,
          i ? /* @__PURE__ */ t("p", { children: i }) : null,
          /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }),
          /* @__PURE__ */ s("div", { className: "lp-form__actions", children: [
            o ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: o, children: g }) : null,
            u ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: u, children: b }) : null
          ] })
        ] })
      ]
    }
  );
}
const Qe = {
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
}, We = {
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
}, et = {
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
}, tt = {
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
}, nt = {
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
}, lt = {
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
}, ft = [
  Qe,
  We,
  et,
  tt,
  nt,
  lt
];
export {
  Ze as ActivityBlock,
  Ne as ActivityCard,
  Ce as Breadcrumbs,
  oe as CONTEXT_TYPES,
  Ie as Callout,
  xe as Classification,
  mt as CompletionModal,
  Se as ContextPanel,
  Be as DragDrop,
  we as EmptyState,
  it as ErrorState,
  De as FEEDBACK_STATES,
  W as FeedbackPanel,
  ot as HubShell,
  ht as InteractiveActivity,
  ct as LEARNER_ACTIVITY_STATES,
  dt as LearnerHeader,
  Ae as LearningOutcomeBadge,
  ut as LoadingState,
  Te as Navigation,
  je as OptionCards,
  Ke as PhraseCompletion,
  $e as ProgressCard,
  de as SESSION_KINDS,
  ne as SESSION_KIND_LABELS,
  st as STATUS_TONES,
  Ye as Sequence,
  Ee as SessionSection,
  le as StatusBadge,
  ue as WEEK_UI_FEATURES,
  Pe as WeekHeader,
  Le as WeekNavigation,
  pt as WeekView,
  ve as activityActionLabel,
  ft as demoCatalogueActivities,
  lt as demoClassification,
  et as demoDragDrop,
  Qe as demoOptionCards,
  tt as demoPhraseCompletion,
  nt as demoSequence,
  We as demoTrueFalse,
  He as isCatalogueReactType,
  me as isIndependentKind,
  fe as isSessionKind,
  pe as mergeWeekUiFeatures,
  Q as normaliseActivityType,
  Ve as questionIdFor,
  he as shouldShowContext,
  ce as statusLabel,
  ye as statusTone
};
//# sourceMappingURL=index.js.map
