import { jsxs as c, jsx as t } from "react/jsx-runtime";
import { useId as ae, useState as I, useEffect as re, useMemo as X, useCallback as te, useRef as ie } from "react";
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
}, it = ["not-started", "in-progress", "completed"], ot = ["available", "planned", "progress", "completed"], ue = {
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
function se(e, n = "") {
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
  return /* @__PURE__ */ c("span", { className: `lp-status-badge lp-status-badge--${r}`, role: "status", children: [
    a ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "● " }) : null,
    n || se(e)
  ] });
}
function Ne({
  title: e = "Untitled activity",
  description: n = "",
  activityType: a = "Activity",
  duration: r = "",
  status: l = "Not started",
  state: i,
  href: s,
  actionLabel: o,
  badge: d = !1,
  badgeStatus: f,
  headingLevel: g = 2,
  muted: _ = !1
}) {
  const y = g === 3 ? "h3" : "h2", p = [a, r].filter(Boolean), v = i ? se(i, l) : l;
  return /* @__PURE__ */ c("article", { className: _ ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": i || void 0, children: [
    d ? /* @__PURE__ */ t(
      le,
      {
        status: f || i || "planned",
        label: typeof l == "string" && l !== "Not started" ? l : void 0
      }
    ) : null,
    p.length ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: p.join(" · ") }) : null,
    /* @__PURE__ */ t(y, { children: e }),
    n ? /* @__PURE__ */ t("p", { children: n }) : null,
    /* @__PURE__ */ t("p", { className: "lp-card__meta", children: `Status: ${v}` }),
    s ? /* @__PURE__ */ t("div", { className: "lp-card__actions", children: /* @__PURE__ */ t("a", { className: "lp-button", href: s, children: o || ve(i) }) }) : null
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
  return /* @__PURE__ */ c(
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
  const i = oe.includes(e) ? e : "assignment", s = `lp-context-${i}`;
  return /* @__PURE__ */ c(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${i}`,
      "aria-labelledby": s,
      "data-context-type": i,
      children: [
        /* @__PURE__ */ t("h2", { id: s, children: n }),
        a.length ? /* @__PURE__ */ t("dl", { className: "lp-meta-list", children: a.map((o) => /* @__PURE__ */ c("div", { children: [
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
  return /* @__PURE__ */ c("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: n }),
    a != null && a.label && (a != null && a.href) ? /* @__PURE__ */ t("a", { className: "lp-button", href: a.href, children: a.label }) : null
  ] });
}
function dt({
  heading: e = "There is a problem",
  message: n = "Try again."
}) {
  return /* @__PURE__ */ c("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
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
  theme: s = null,
  actions: o,
  listId: d
}) {
  const f = ae(), g = d || `lp-navigation-list-${f}`, [_, y] = I(!1), p = new Set([n, ...a].filter(Boolean)), v = e.find((b) => b.id === "home" && b.enabled !== !1), C = e.filter((b) => b.enabled !== !1);
  re(() => {
    function b(T) {
      T.key === "Escape" && y(!1);
    }
    return document.addEventListener("keydown", b), () => document.removeEventListener("keydown", b);
  }, []);
  function S(b) {
    if (b.key === "Escape") {
      y(!1);
      const T = b.currentTarget.querySelector(".lp-navigation__toggle");
      T == null || T.focus();
    }
  }
  return /* @__PURE__ */ t("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: S, children: /* @__PURE__ */ c("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ c("a", { className: "lp-navigation__brand", href: i || (v == null ? void 0 : v.path) || "./", children: [
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
        onClick: () => y((b) => !b),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ t(
      "ul",
      {
        className: "lp-navigation__list",
        id: g,
        "data-open": _ ? "true" : "false",
        children: C.map((b) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
          "a",
          {
            className: "lp-navigation__link",
            href: b.path,
            "aria-current": p.has(b.id) ? "page" : void 0,
            onClick: () => y(!1),
            children: b.label
          }
        ) }, b.id))
      }
    ),
    s ? /* @__PURE__ */ c("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ t(
        "select",
        {
          "aria-label": "Theme preference",
          value: s.preference,
          onChange: (b) => s.onChange(b.target.value),
          children: s.modes.map((b) => /* @__PURE__ */ t("option", { value: b, children: b[0].toUpperCase() + b.slice(1) }, b))
        }
      )
    ] }) : null,
    o ? /* @__PURE__ */ t("div", { className: "lp-navigation__actions", children: o }) : null
  ] }) });
}
function ut({
  brandTitle: e,
  brandTagline: n,
  navigation: a,
  currentId: r = "home",
  currentIds: l = [],
  theme: i = null,
  actions: s,
  breadcrumbs: o,
  resolveHref: d,
  pageHeader: f,
  footer: g,
  learnerHeader: _,
  notice: y,
  skipLabel: p = "Skip to main content",
  mainId: v = "main-content",
  children: C
}) {
  const S = g && typeof g == "object" && "lines" in g ? g.lines.map((b) => /* @__PURE__ */ t("p", { children: b }, b)) : g;
  return /* @__PURE__ */ c("div", { className: "lp-shell", children: [
    /* @__PURE__ */ t("a", { className: "lp-skip-link skip-link", href: `#${v}`, children: p }),
    /* @__PURE__ */ t("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ t(
      Te,
      {
        items: a,
        currentId: r,
        currentIds: l,
        brandTitle: e,
        brandTagline: n,
        theme: i,
        actions: s
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "lp-shell__learner", children: _ }),
    y,
    o ? /* @__PURE__ */ t(Ce, { items: o, resolveHref: d }) : null,
    f != null && f.title ? /* @__PURE__ */ c("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ t("h1", { children: f.title }),
      f.subtitle ? /* @__PURE__ */ t("p", { className: "lp-page-header__subtitle", children: f.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ t("main", { id: v, className: "lp-shell__main site-main", tabIndex: -1, children: C }),
    /* @__PURE__ */ t("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: S })
  ] });
}
function pt({
  learner: e,
  hubName: n,
  accountHref: a = "./account/",
  onSignOut: r
}) {
  return e ? /* @__PURE__ */ c("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ c("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Learner" }),
        /* @__PURE__ */ t("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Year group" }),
        /* @__PURE__ */ t("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Email" }),
        /* @__PURE__ */ t("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Current hub" }),
        /* @__PURE__ */ t("dd", { children: n })
      ] })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-learner-header__actions", children: [
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
function ht({ message: e = "Loading…" }) {
  return /* @__PURE__ */ c("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
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
  const l = Math.max(0, Number(a) || 0), i = Math.min(l, Math.max(0, Number(n) || 0)), s = l ? Math.round(i / l * 100) : 0;
  return /* @__PURE__ */ c("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    r ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: r }) : null,
    /* @__PURE__ */ t(
      "progress",
      {
        className: "lp-progress",
        max: l || 1,
        value: i,
        "aria-label": `${s}% complete`
      }
    ),
    /* @__PURE__ */ t("p", { children: `${i} of ${l} complete (${s}%)` })
  ] });
}
function Ee({
  id: e,
  title: n,
  kind: a = "session",
  summary: r = "",
  defaultOpen: l = !1,
  meta: i,
  children: s
}) {
  const o = fe(a) ? a : "session", d = ne[o];
  return /* @__PURE__ */ c("details", { className: "lp-session lp-panel", id: e, "data-kind": o, open: l, children: [
    /* @__PURE__ */ t("summary", { className: "lp-session__summary", children: /* @__PURE__ */ c("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ t("h2", { className: "lp-session__heading", children: n || d }),
      /* @__PURE__ */ t("span", { className: "lp-session__meta", children: i || d })
    ] }) }),
    /* @__PURE__ */ c("div", { className: "lp-session__content", children: [
      r ? /* @__PURE__ */ t("p", { className: "lp-panel-note", children: r }) : null,
      /* @__PURE__ */ t("div", { className: "lp-activity-list", children: s })
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
  showTitle: s = !0
}) {
  const o = e ? `Week ${e}${n ? `: ${n}` : ""}` : n || "Week";
  return /* @__PURE__ */ c("header", { className: "lp-week-header", children: [
    r ? /* @__PURE__ */ t(le, { status: r }) : null,
    s ? /* @__PURE__ */ t(i === 2 ? "h2" : "h1", { children: o }) : e ? /* @__PURE__ */ t("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-week-header__subtitle", children: a }) : null,
    l.length ? /* @__PURE__ */ t("ul", { className: "lp-week-header__outcomes", children: l.map((f) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(Ae, { id: f.id, title: f.title }) }, f.id || f.title)) }) : null
  ] });
}
function Le({ previousWeek: e, nextWeek: n }) {
  return !(e != null && e.href) && !(n != null && n.href) ? null : /* @__PURE__ */ t("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ c("ul", { className: "lp-week-nav__list", children: [
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
function mt({
  week: e = {},
  learningOutcomes: n = [],
  context: a = null,
  sessions: r = [],
  progress: l = null,
  previousWeek: i,
  nextWeek: s,
  features: o = {},
  renderActivity: d
}) {
  const f = pe(o), g = (a == null ? void 0 : a.type) || (a == null ? void 0 : a.contextType), _ = r.filter((p) => !(f.showIndependentStudy === !1 && me(p.kind))), y = d || Me;
  return /* @__PURE__ */ c("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ t(
      Pe,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: f.showLearningOutcomes ? n : [],
        headingLevel: e.headingLevel || 1,
        showTitle: f.showTitle !== !1
      }
    ),
    a && he(f, g) ? /* @__PURE__ */ t(
      Se,
      {
        contextType: g,
        heading: a.heading,
        items: a.items,
        description: a.description,
        action: a.action
      }
    ) : null,
    _.length ? _.map((p) => /* @__PURE__ */ t(
      Ee,
      {
        id: p.id,
        title: p.title,
        kind: p.kind,
        summary: p.summary,
        defaultOpen: p.defaultOpen,
        meta: Oe(p),
        children: (p.activities || []).map((v, C) => y(v, C))
      },
      p.id || p.title
    )) : /* @__PURE__ */ t(
      we,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    f.showProgress && l ? /* @__PURE__ */ t($e, { ...l }) : null,
    /* @__PURE__ */ t(Le, { previousWeek: i, nextWeek: s })
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
  feedback: s,
  formative: o = !0,
  retry: d = !0,
  shuffle: f = !1,
  maxAttempts: g,
  initialAssignments: _ = {},
  onResult: y
}) {
  const p = X(() => ee(l, f), [l, f]), [v, C] = I({ ..._ }), [S, b] = I(null), [T, R] = I(0), [D, K] = I(!1), [x, L] = I("neutral"), [E, B] = I(""), j = Object.fromEntries(
    l.filter((u) => u.correctCategoryId).map((u) => [u.id, u.correctCategoryId])
  ), A = !!(o && Object.keys(j).length), O = D, q = D && d && (typeof g != "number" || T < g), Y = p.filter((u) => !v[u.id]), h = p.find((u) => u.id === S);
  function N(u) {
    y == null || y(u);
  }
  function P(u, m) {
    C((k) => ({ ...k, [u]: m })), b(null);
  }
  function M(u) {
    b((m) => m === u ? null : u);
  }
  function U(u) {
    S && P(S, u);
  }
  function H(u) {
    C((m) => {
      const k = { ...m };
      return delete k[u], k;
    }), b(null);
  }
  function w() {
    if (!l.every(($) => v[$.id])) {
      L("informative"), B("Place every item in a category before checking.");
      return;
    }
    const m = T + 1, k = A ? l.filter(($) => v[$.id] === j[$.id]).length : 0, F = A ? k === l.length : null;
    R(m), K(!0), L(F === !0 ? "correct" : F === !1 ? "incorrect" : "informative"), B(A ? F ? (s == null ? void 0 : s.correct) || "Those items match the expected categories." : (s == null ? void 0 : s.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), N({
      completed: !0,
      correct: F,
      score: A ? { correct: k, total: l.length } : void 0,
      attempts: m,
      responses: { ...v }
    });
  }
  function G() {
    C({}), b(null), K(!1), L("neutral"), B(""), N({ completed: !1, correct: null, attempts: T, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "classification", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: h ? `Selected: ${J(h)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: O, children: [
      /* @__PURE__ */ t("legend", { children: a }),
      /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        Y.map((u) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": S === u.id,
            onClick: () => M(u.id),
            children: [
              J(u),
              S === u.id ? " (selected)" : ""
            ]
          },
          u.id
        )),
        Y.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((u) => {
        const m = p.filter((k) => v[k.id] === u.id);
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: u.label }) }),
          /* @__PURE__ */ t("ul", { className: "lp-activity-list", children: m.map((k) => {
            const F = D && A ? j[k.id] === u.id ? "Correct" : "Incorrect" : "Placed";
            return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                onClick: () => H(k.id),
                children: [
                  J(k),
                  " · ",
                  F,
                  O ? "" : " · Return"
                ]
              }
            ) }, k.id);
          }) }),
          m.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "No items yet" }) : null,
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "lp-button",
              disabled: !S,
              onClick: () => U(u.id),
              children: [
                "Place in ",
                J(u)
              ]
            }
          )
        ] }, u.id);
      }) }),
      /* @__PURE__ */ c("details", { children: [
        /* @__PURE__ */ t("summary", { children: "Use dropdown lists instead" }),
        p.map((u) => /* @__PURE__ */ c("p", { className: "lp-form__field", children: [
          /* @__PURE__ */ t("label", { htmlFor: `${e}-${u.id}`, children: J(u) }),
          /* @__PURE__ */ c(
            "select",
            {
              id: `${e}-${u.id}`,
              "data-lp-item": u.id,
              value: v[u.id] || "",
              disabled: O,
              onChange: (m) => {
                const k = m.target.value;
                C((F) => {
                  const $ = { ...F };
                  return k ? $[u.id] = k : delete $[u.id], $;
                }), b(null);
              },
              children: [
                /* @__PURE__ */ t("option", { value: "", children: "Select a category" }),
                i.map((m) => /* @__PURE__ */ t("option", { value: m.id, children: m.label }, m.id))
              ]
            }
          )
        ] }, `list-${u.id}`))
      ] })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: w, disabled: O, children: "Check types" }),
      q ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: G, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: x, message: E })
  ] });
}
function ce() {
  const [e, n] = I({}), [a, r] = I(null), l = te((d, f = e) => Object.keys(f).find((g) => f[g] === d) || null, [e]), i = te((d) => {
    r((f) => f === d ? null : d);
  }, []), s = te((d) => {
    if (!a) {
      const g = l(d);
      g && r(g);
      return;
    }
    const f = a;
    n((g) => {
      const _ = { ...g }, y = Object.keys(_).find((p) => _[p] === d);
      return y && delete _[y], _[f] = d, _;
    }), r(null);
  }, [l, a]), o = te(() => {
    n({}), r(null);
  }, []);
  return { placements: e, selectedItemId: a, selectItem: i, selectTarget: s, occupantOf: l, reset: o };
}
function Be({
  id: e = "drag-drop",
  title: n,
  prompt: a,
  instructions: r,
  items: l,
  targets: i,
  correct: s = {},
  feedback: o,
  formative: d = !0,
  retry: f = !0,
  shuffle: g = !1,
  maxAttempts: _,
  onResult: y
}) {
  var H;
  const p = X(() => ee(l, g), [l, g]), { placements: v, selectedItemId: C, selectItem: S, selectTarget: b, occupantOf: T, reset: R } = ce(), [D, K] = I(0), [x, L] = I(!1), [E, B] = I("neutral"), [j, A] = I(""), O = !!(d && Object.keys(s).length), q = x, Y = x && f && (typeof _ != "number" || D < _), h = p.filter((w) => !v[w.id]), N = (H = p.find((w) => w.id === C)) == null ? void 0 : H.label;
  function P(w) {
    y == null || y(w);
  }
  function M() {
    if (!l.every((k) => v[k.id])) {
      B("informative"), A("Place every item before checking.");
      return;
    }
    const G = D + 1, u = O ? l.filter((k) => v[k.id] === s[k.id]).length : 0, m = O ? u === l.length : null;
    K(G), L(!0), B(m === !0 ? "correct" : m === !1 ? "incorrect" : "informative"), A(O ? m ? (o == null ? void 0 : o.correct) || "Those placements match the expected targets." : (o == null ? void 0 : o.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), P({
      completed: !0,
      correct: m,
      score: O ? { correct: u, total: l.length } : void 0,
      attempts: G,
      responses: { ...v }
    });
  }
  function U() {
    R(), L(!1), B("neutral"), A(""), P({ completed: !1, correct: null, attempts: D, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "drag-drop", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { children: a }),
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: N ? `Selected: ${N}. Choose a target.` : "Select an item, then select a target to place it." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: q, children: [
      /* @__PURE__ */ t("legend", { children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        h.map((w) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": C === w.id,
            onClick: () => S(w.id),
            children: [
              w.label,
              C === w.id ? " (selected)" : ""
            ]
          },
          w.id
        )),
        h.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] })
    ] }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: q, children: [
      /* @__PURE__ */ t("legend", { children: "Targets" }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((w) => {
        const G = T(w.id), u = l.find((k) => k.id === G), m = x && O && G ? s[G] === w.id ? "Correct" : "Incorrect" : u ? "Placed" : "Empty";
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: w.label }) }),
          /* @__PURE__ */ c("p", { className: "lp-card__meta", children: [
            u ? u.label : "No item yet",
            " · ",
            m
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button",
              onClick: () => b(w.id),
              children: u ? `Place on ${w.label} (replace ${u.label})` : `Place on ${w.label}`
            }
          )
        ] }, w.id);
      }) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
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
  feedback: s,
  formative: o = !0,
  retry: d = !0,
  shuffle: f = !1,
  maxAttempts: g,
  initialSelectedId: _,
  onResult: y
}) {
  const p = X(() => ee(l, f), [l, f]), [v, C] = I(_ || null), [S, b] = I(0), [T, R] = I(!1), [D, K] = I("neutral"), [x, L] = I(""), E = !!(o && i), B = `lp-option-cards-${e}`, j = T, A = T && d && (typeof g != "number" || S < g);
  function O(h) {
    y == null || y(h);
  }
  function q() {
    if (!v) {
      K("informative"), L("Choose an option before checking.");
      return;
    }
    const h = S + 1, N = E ? v === i : null, P = E ? N ? (s == null ? void 0 : s.correct) || "That matches the expected option." : (s == null ? void 0 : s.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    b(h), R(!0), K(N === !0 ? "correct" : N === !1 ? "incorrect" : "informative"), L(P), O({
      completed: !0,
      correct: N,
      score: E ? { correct: N ? 1 : 0, total: 1 } : void 0,
      attempts: h,
      responses: { optionId: v }
    });
  }
  function Y() {
    C(null), R(!1), K("neutral"), L(""), O({
      completed: !1,
      correct: null,
      attempts: S,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "option-cards", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: j, children: [
      /* @__PURE__ */ t("legend", { children: a }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: p.map((h) => {
        const N = v === h.id, M = T && E && N ? h.id === i ? "Correct" : "Incorrect" : N ? "Selected" : "";
        return /* @__PURE__ */ c("label", { className: "lp-card lp-activity-card", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "radio",
              name: B,
              value: h.id,
              checked: N,
              "data-lp-response": "",
              onChange: () => C(h.id)
            }
          ),
          /* @__PURE__ */ c("span", { children: [
            /* @__PURE__ */ t("strong", { children: h.label }),
            h.description ? /* @__PURE__ */ c("span", { className: "lp-card__meta", children: [
              " — ",
              h.description
            ] }) : null
          ] }),
          h.imageSrc ? /* @__PURE__ */ t("img", { src: h.imageSrc, alt: h.imageAlt || h.label }) : null,
          M ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: M }) : null
        ] }, h.id);
      }) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: q, disabled: j, children: "Check answer" }),
      A ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: D, message: x })
  ] });
}
function qe(e, n) {
  var o;
  const a = [], r = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let l = 0, i = 0, s;
  for (; (s = r.exec(e)) !== null; ) {
    s.index > l && a.push(e.slice(l, s.index));
    const d = s[1] || ((o = n[i]) == null ? void 0 : o.id) || `gap-${i + 1}`;
    i += 1, a.push({ gapId: d }), l = s.index + s[0].length;
  }
  return l < e.length && a.push(e.slice(l)), !a.some((d) => typeof d != "string") && n[0] && (a.push(" "), a.push({ gapId: n[0].id })), a;
}
function Ke({
  id: e = "phrase-completion",
  title: n,
  prompt: a,
  instructions: r,
  gaps: l,
  options: i,
  correctOptionId: s,
  feedback: o,
  formative: d = !0,
  retry: f = !0,
  shuffle: g = !1,
  maxAttempts: _,
  onResult: y
}) {
  var u;
  const p = X(() => l && l.length ? l : [{ id: "gap", label: "missing term", correctOptionId: s || void 0 }], [s, l]), v = X(() => ee(i, g), [i, g]), C = X(() => qe(a, p), [a, p]), { placements: S, selectedItemId: b, selectItem: T, selectTarget: R, occupantOf: D, reset: K } = ce(), [x, L] = I(0), [E, B] = I(!1), [j, A] = I("neutral"), [O, q] = I(""), Y = Object.fromEntries(
    p.map((m) => [m.id, m.correctOptionId]).filter((m) => m[1])
  ), h = !!(d && Object.keys(Y).length), N = E, P = E && f && (typeof _ != "number" || x < _), M = v.filter((m) => !S[m.id]), U = (u = i.find((m) => m.id === b)) == null ? void 0 : u.label;
  function H(m) {
    y == null || y(m);
  }
  function w() {
    if (!p.every((z) => D(z.id))) {
      A("informative"), q("Fill every blank before checking.");
      return;
    }
    const k = x + 1, F = {};
    p.forEach((z) => {
      const Z = D(z.id);
      Z && (F[z.id] = Z);
    });
    const $ = h ? p.filter((z) => F[z.id] === Y[z.id]).length : 0, V = h ? $ === p.length : null;
    L(k), B(!0), A(V === !0 ? "correct" : V === !1 ? "incorrect" : "informative"), q(h ? V ? (o == null ? void 0 : o.correct) || "That completes the phrase." : (o == null ? void 0 : o.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), H({
      completed: !0,
      correct: V,
      score: h ? { correct: $, total: p.length } : void 0,
      attempts: k,
      responses: F
    });
  }
  function G() {
    K(), B(!1), A("neutral"), q(""), H({ completed: !1, correct: null, attempts: x, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "fill-gap", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: U ? `Selected: ${U}. Choose a blank.` : "Select a phrase, then select the blank." }),
    /* @__PURE__ */ t("p", { children: C.map((m, k) => {
      if (typeof m == "string") return /* @__PURE__ */ t("span", { children: m }, `text-${k}`);
      const F = D(m.gapId), $ = i.find((Z) => Z.id === F), V = p.find((Z) => Z.id === m.gapId), z = E && h && F ? Y[m.gapId] === F ? "Correct" : "Incorrect" : $ ? "Filled" : "Blank";
      return /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "lp-button lp-button--secondary",
          disabled: N,
          "aria-label": `${(V == null ? void 0 : V.label) || "blank"}: ${($ == null ? void 0 : $.label) || "empty"}. ${z}`,
          onClick: () => R(m.gapId),
          children: ($ == null ? void 0 : $.label) || "______"
        },
        m.gapId
      );
    }) }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: N, children: [
      /* @__PURE__ */ t("legend", { children: "Available phrases" }),
      /* @__PURE__ */ t("div", { className: "lp-card__actions", children: M.map((m) => /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: "lp-button",
          "aria-pressed": b === m.id,
          onClick: () => T(m.id),
          children: [
            m.label,
            b === m.id ? " (selected)" : ""
          ]
        },
        m.id
      )) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: w, disabled: N, children: "Check phrase" }),
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
  feedback: s,
  formative: o = !0,
  retry: d = !0,
  shuffle: f = !1,
  maxAttempts: g,
  onResult: _
}) {
  const y = X(() => ee(l, f), [l, f]), [p, v] = I(y), [C, S] = I(0), [b, T] = I(!1), [R, D] = I("neutral"), [K, x] = I(""), L = !!(o && i.length), E = b, B = b && d && (typeof g != "number" || C < g);
  function j(h) {
    _ == null || _(h);
  }
  function A(h, N) {
    const P = h + N;
    if (P < 0 || P >= p.length) return;
    const M = p.slice(), [U] = M.splice(h, 1);
    M.splice(P, 0, U), v(M);
  }
  function O(h, N) {
    E || (h.key === "ArrowUp" && (h.preventDefault(), A(N, -1)), h.key === "ArrowDown" && (h.preventDefault(), A(N, 1)));
  }
  function q() {
    const h = C + 1, N = p.map((U) => U.id), P = L ? N.filter((U, H) => U === i[H]).length : 0, M = L ? P === i.length && N.length === i.length : null;
    S(h), T(!0), D(M === !0 ? "correct" : M === !1 ? "incorrect" : "informative"), x(L ? M ? (s == null ? void 0 : s.correct) || "That order matches the expected sequence." : (s == null ? void 0 : s.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), j({
      completed: !0,
      correct: M,
      score: L ? { correct: P, total: i.length } : void 0,
      attempts: h,
      responses: { itemIds: N }
    });
  }
  function Y() {
    v(y), T(!1), D("neutral"), x(""), j({
      completed: !1,
      correct: null,
      attempts: C,
      responses: { itemIds: y.map((h) => h.id) }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "ordering", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { children: a }),
    /* @__PURE__ */ t("ol", { className: "lp-activity-list", children: p.map((h, N) => /* @__PURE__ */ c(
      "li",
      {
        className: "lp-card",
        tabIndex: E ? -1 : 0,
        "aria-label": `${h.label}, position ${N + 1} of ${p.length}`,
        onKeyDown: (P) => O(P, N),
        children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ c("strong", { children: [
            N + 1,
            ". ",
            h.label
          ] }) }),
          /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                disabled: E || N === 0,
                onClick: () => A(N, -1),
                children: [
                  "Move ",
                  h.label,
                  " up"
                ]
              }
            ),
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                disabled: E || N === p.length - 1,
                onClick: () => A(N, 1),
                children: [
                  "Move ",
                  h.label,
                  " down"
                ]
              }
            )
          ] })
        ]
      },
      h.id
    )) }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
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
const He = [
  "single-choice",
  "option-cards",
  "classification",
  "drag-drop",
  "fill-gap",
  "phrase-completion",
  "ordering",
  "sequence"
];
function ze(e) {
  return He.includes(Q(e));
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
  const r = Q(e.type), l = e.content || {}, i = Q(l.presentation), s = Xe(e), o = (d) => a == null ? void 0 : a(d, e);
  if (r === "single-choice" || r === "option-cards" || i === "option-cards" || i === "true-false" || i === "picture-quiz")
    return /* @__PURE__ */ t(
      je,
      {
        ...s,
        prompt: l.prompt || "Choose an option",
        options: l.options || [],
        correctOptionId: l.correctOptionId,
        initialSelectedId: typeof n == "string" ? n : void 0,
        onResult: o
      }
    );
  if (r === "classification") {
    const d = n && typeof n == "object" && !Array.isArray(n) ? n : void 0;
    return /* @__PURE__ */ t(
      xe,
      {
        ...s,
        prompt: l.prompt || "Classify each item",
        items: l.items || [],
        categories: l.categories || [],
        initialAssignments: d,
        onResult: o
      }
    );
  }
  return r === "drag-drop" ? /* @__PURE__ */ t(
    Be,
    {
      ...s,
      prompt: l.prompt || "Place each item",
      items: l.items || [],
      targets: l.targets || [],
      correct: l.correct,
      onResult: o
    }
  ) : r === "fill-gap" || r === "phrase-completion" ? /* @__PURE__ */ t(
    Ke,
    {
      ...s,
      prompt: l.prompt || "Complete the phrase",
      gaps: l.gaps,
      options: l.options || [],
      correctOptionId: l.correctOptionId,
      onResult: o
    }
  ) : r === "ordering" || r === "sequence" ? /* @__PURE__ */ t(
    Ye,
    {
      ...s,
      prompt: l.prompt || "Put the items in order",
      items: l.items || [],
      correctOrder: l.correctOrder,
      onResult: o
    }
  ) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": r, children: [
    "This ",
    r || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function ft({
  activity: e,
  initialResponses: n = {},
  renderFallback: a,
  onResult: r
}) {
  var s, o;
  const [l, i] = I(0);
  return /* @__PURE__ */ c(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": e.version || "0.1.0",
      children: [
        (s = e.metadata) != null && s.title ? /* @__PURE__ */ t("h3", { children: e.metadata.title }) : null,
        (o = e.metadata) != null && o.summary ? /* @__PURE__ */ t("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ t("div", { className: "lp-activity-list", children: (e.blocks || []).map((d) => ze(d.type) ? /* @__PURE__ */ t(
          Ze,
          {
            block: d,
            initialResponse: n[Ve(d)],
            onResult: r
          },
          d.id
        ) : a ? /* @__PURE__ */ t("div", { children: a(d) }, d.id) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": Q(d.type), children: [
          "This ",
          Q(d.type) || "unknown",
          " block is not part of the React activity catalogue yet."
        ] }, d.id)) }, l),
        /* @__PURE__ */ c("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => i((d) => d + 1),
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
  return typeof n == "number" && Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function Qe({
  title: e,
  badge: n,
  subtitle: a,
  score: r,
  progress: l,
  completed: i = !0,
  attempts: s,
  message: o,
  showStatus: d = !0,
  showDisclaimer: f = !0
}) {
  const g = n || a, _ = Je(r, l), y = Math.round(_ * 100), p = i ? "Completed" : "In progress", v = r ? `${r.correct} / ${r.total}` : null, C = r ? `${r.correct} of ${r.total} correct` : null, S = typeof s == "number" ? `${s} ${s === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ c("div", { className: "lp-progress-summary", "data-lp-progress-summary": "", children: [
    e ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ t("strong", { children: e }) }) : null,
    d ? /* @__PURE__ */ t(le, { status: i ? "completed" : "progress", label: p }) : null,
    v ? /* @__PURE__ */ t(
      "p",
      {
        className: "lp-progress-summary__score",
        "data-lp-progress-score": "",
        "aria-label": C || void 0,
        children: v
      }
    ) : null,
    C ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: C }) : null,
    g ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ t("strong", { children: g }) }) : null,
    /* @__PURE__ */ t(
      "progress",
      {
        className: "lp-progress",
        max: 100,
        value: y,
        "aria-label": `${y}% complete`
      }
    ),
    /* @__PURE__ */ c("p", { className: "lp-card__meta", children: [
      y,
      "% complete"
    ] }),
    S ? /* @__PURE__ */ t("p", { children: S }) : null,
    o ? /* @__PURE__ */ t("p", { children: o }) : null,
    f ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
  ] });
}
function We(e, n) {
  if (e)
    try {
      n && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !n && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      n ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function bt({
  open: e = !1,
  title: n = "Activity complete",
  completed: a = !0,
  score: r,
  badge: l,
  subtitle: i,
  progress: s,
  attempts: o,
  message: d,
  onClose: f,
  onReview: g,
  onNext: _,
  nextLabel: y = "Continue",
  reviewLabel: p = "Review"
}) {
  const v = ie(null), C = ae();
  return re(() => {
    We(v.current, e);
  }, [e]), e ? /* @__PURE__ */ c(
    "dialog",
    {
      ref: v,
      className: "lp-dialog",
      "aria-labelledby": C,
      onCancel: (S) => {
        S.preventDefault(), f == null || f();
      },
      children: [
        /* @__PURE__ */ c("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ t("h2", { id: C, children: n }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${n}`,
              onClick: f,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ t(
            Qe,
            {
              completed: a,
              score: r,
              badge: l,
              subtitle: i,
              progress: s,
              attempts: o,
              message: d
            }
          ),
          /* @__PURE__ */ c("div", { className: "lp-form__actions", children: [
            g ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: g, children: p }) : null,
            _ ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: _, children: y }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const et = {
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
}, tt = {
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
}, nt = {
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
}, lt = {
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
}, at = {
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
}, rt = {
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
}, gt = [
  et,
  tt,
  nt,
  lt,
  at,
  rt
];
export {
  Ze as ActivityBlock,
  Ne as ActivityCard,
  Ce as Breadcrumbs,
  oe as CONTEXT_TYPES,
  Ie as Callout,
  xe as Classification,
  bt as CompletionModal,
  Se as ContextPanel,
  Be as DragDrop,
  we as EmptyState,
  dt as ErrorState,
  De as FEEDBACK_STATES,
  W as FeedbackPanel,
  ut as HubShell,
  ft as InteractiveActivity,
  it as LEARNER_ACTIVITY_STATES,
  pt as LearnerHeader,
  Ae as LearningOutcomeBadge,
  ht as LoadingState,
  Te as Navigation,
  je as OptionCards,
  Ke as PhraseCompletion,
  $e as ProgressCard,
  Qe as ProgressSummary,
  de as SESSION_KINDS,
  ne as SESSION_KIND_LABELS,
  ot as STATUS_TONES,
  Ye as Sequence,
  Ee as SessionSection,
  le as StatusBadge,
  ue as WEEK_UI_FEATURES,
  Pe as WeekHeader,
  Le as WeekNavigation,
  mt as WeekView,
  ve as activityActionLabel,
  gt as demoCatalogueActivities,
  rt as demoClassification,
  nt as demoDragDrop,
  et as demoOptionCards,
  lt as demoPhraseCompletion,
  at as demoSequence,
  tt as demoTrueFalse,
  ze as isCatalogueReactType,
  me as isIndependentKind,
  fe as isSessionKind,
  pe as mergeWeekUiFeatures,
  Q as normaliseActivityType,
  Ve as questionIdFor,
  Je as resolveProgressFraction,
  he as shouldShowContext,
  se as statusLabel,
  ye as statusTone
};
//# sourceMappingURL=index.js.map
