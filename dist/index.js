import { jsxs as c, jsx as t, Fragment as he } from "react/jsx-runtime";
import { useId as ne, useState as k, useEffect as ce, useMemo as X, useCallback as te, useRef as me } from "react";
const fe = ["exam", "assignment", "project"], be = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], le = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, _t = ["not-started", "in-progress", "completed"], kt = ["available", "planned", "progress", "completed"], ge = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function ye(e = {}) {
  return { ...ge, ...e };
}
function ve(e, n) {
  return n ? n === "assignment" ? e.showAssignmentContext !== !1 : n === "exam" ? e.showExamContext !== !1 : n === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function Ne(e) {
  return e === "independent-study" || e === "homework";
}
function _e(e) {
  return be.includes(e);
}
const ke = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, Ce = {
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
function Ie(e) {
  return ke[e || ""] || "planned";
}
function ie(e, n = "") {
  return Ce[e || ""] || n || String(e || "Planned");
}
function we(e, n = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : n;
}
function re({
  status: e = "planned",
  label: n,
  marker: r = !0
}) {
  const a = Ie(e);
  return /* @__PURE__ */ c("span", { className: `lp-status-badge lp-status-badge--${a}`, role: "status", children: [
    r ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "● " }) : null,
    n || ie(e)
  ] });
}
function Se({
  title: e = "Untitled activity",
  description: n = "",
  activityType: r = "Activity",
  duration: a = "",
  status: l = "Not started",
  state: i,
  href: s,
  actionLabel: o,
  badge: d = !1,
  badgeStatus: u,
  headingLevel: g = 2,
  muted: y = !1
}) {
  const v = g === 3 ? "h3" : "h2", p = [r, a].filter(Boolean), N = i ? ie(i, l) : l;
  return /* @__PURE__ */ c("article", { className: y ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": i || void 0, children: [
    d ? /* @__PURE__ */ t(
      re,
      {
        status: u || i || "planned",
        label: typeof l == "string" && l !== "Not started" ? l : void 0
      }
    ) : null,
    p.length ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: p.join(" · ") }) : null,
    /* @__PURE__ */ t(v, { children: e }),
    n ? /* @__PURE__ */ t("p", { children: n }) : null,
    /* @__PURE__ */ t("p", { className: "lp-card__meta", children: `Status: ${N}` }),
    s ? /* @__PURE__ */ t("div", { className: "lp-card__actions", children: /* @__PURE__ */ t("a", { className: "lp-button", href: s, children: o || we(i) }) }) : null
  ] });
}
function Te(e, n) {
  return e.href ? e.href : e.path != null && n ? n(e.path) : e.path || void 0;
}
function Ae({ items: e = [], resolveHref: n }) {
  return e.length ? /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ t("ol", { className: "lp-breadcrumbs__list", children: e.map((r, a) => {
    const l = a === e.length - 1, i = Te(r, n);
    return /* @__PURE__ */ t("li", { children: l || !i ? /* @__PURE__ */ t("span", { "aria-current": "page", children: r.label }) : /* @__PURE__ */ t("a", { href: i, children: r.label }) }, `${r.label}-${a}`);
  }) }) }) : /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const $e = ["info", "success", "warning", "error"];
function xe({ tone: e = "info", title: n, message: r }) {
  const a = $e.includes(e) ? e : "info";
  return /* @__PURE__ */ c(
    "aside",
    {
      className: `lp-callout lp-callout--${a}`,
      role: a === "error" ? "alert" : void 0,
      children: [
        n ? /* @__PURE__ */ t("strong", { children: n }) : null,
        r ? /* @__PURE__ */ t("p", { children: r }) : null
      ]
    }
  );
}
function Ee({
  contextType: e = "assignment",
  heading: n = "Context",
  items: r = [],
  description: a = "",
  action: l
}) {
  const i = fe.includes(e) ? e : "assignment", s = `lp-context-${i}`;
  return /* @__PURE__ */ c(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${i}`,
      "aria-labelledby": s,
      "data-context-type": i,
      children: [
        /* @__PURE__ */ t("h2", { id: s, children: n }),
        r.length ? /* @__PURE__ */ t("dl", { className: "lp-meta-list", children: r.map((o) => /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ t("dt", { children: o.label }),
          /* @__PURE__ */ t("dd", { children: o.value })
        ] }, `${o.label}:${o.value}`)) }) : null,
        a ? /* @__PURE__ */ t("p", { children: a }) : null,
        l != null && l.label && (l != null && l.href) ? /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: l.href, children: l.label }) }) : null
      ]
    }
  );
}
function Pe({
  heading: e = "Nothing to show yet",
  message: n = "Check again later.",
  action: r
}) {
  return /* @__PURE__ */ c("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: n }),
    r != null && r.label && (r != null && r.href) ? /* @__PURE__ */ t("a", { className: "lp-button", href: r.href, children: r.label }) : null
  ] });
}
function Ct({
  heading: e = "There is a problem",
  message: n = "Try again."
}) {
  return /* @__PURE__ */ c("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: n })
  ] });
}
function Me({
  items: e,
  currentId: n = "home",
  currentIds: r = [],
  brandTitle: a,
  brandTagline: l,
  homeHref: i,
  theme: s = null,
  actions: o,
  listId: d
}) {
  const u = ne(), g = d || `lp-navigation-list-${u}`, [y, v] = k(!1), p = new Set([n, ...r].filter(Boolean)), N = e.find((f) => f.id === "home" && f.enabled !== !1), C = e.filter((f) => f.enabled !== !1);
  ce(() => {
    function f(T) {
      T.key === "Escape" && v(!1);
    }
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, []);
  function I(f) {
    if (f.key === "Escape") {
      v(!1);
      const T = f.currentTarget.querySelector(".lp-navigation__toggle");
      T == null || T.focus();
    }
  }
  return /* @__PURE__ */ t("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: I, children: /* @__PURE__ */ c("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ c("a", { className: "lp-navigation__brand", href: i || (N == null ? void 0 : N.path) || "./", children: [
      /* @__PURE__ */ t("span", { className: "lp-navigation__brand-title", children: a }),
      l ? /* @__PURE__ */ t("span", { className: "lp-navigation__brand-tagline", children: l }) : null
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": y,
        "aria-controls": g,
        "aria-label": y ? "Close main menu" : "Open main menu",
        onClick: () => v((f) => !f),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ t(
      "ul",
      {
        className: "lp-navigation__list",
        id: g,
        "data-open": y ? "true" : "false",
        children: C.map((f) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
          "a",
          {
            className: "lp-navigation__link",
            href: f.path,
            "aria-current": p.has(f.id) ? "page" : void 0,
            onClick: () => v(!1),
            children: f.label
          }
        ) }, f.id))
      }
    ),
    s ? /* @__PURE__ */ c("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ t(
        "select",
        {
          "aria-label": "Theme preference",
          value: s.preference,
          onChange: (f) => s.onChange(f.target.value),
          children: s.modes.map((f) => /* @__PURE__ */ t("option", { value: f, children: f[0].toUpperCase() + f.slice(1) }, f))
        }
      )
    ] }) : null,
    o ? /* @__PURE__ */ t("div", { className: "lp-navigation__actions", children: o }) : null
  ] }) });
}
function It({
  brandTitle: e,
  brandTagline: n,
  navigation: r,
  currentId: a = "home",
  currentIds: l = [],
  theme: i = null,
  actions: s,
  breadcrumbs: o,
  resolveHref: d,
  pageHeader: u,
  footer: g,
  learnerHeader: y,
  notice: v,
  skipLabel: p = "Skip to main content",
  mainId: N = "main-content",
  children: C
}) {
  const I = g && typeof g == "object" && "lines" in g ? g.lines.map((f) => /* @__PURE__ */ t("p", { children: f }, f)) : g;
  return /* @__PURE__ */ c("div", { className: "lp-shell", children: [
    /* @__PURE__ */ t("a", { className: "lp-skip-link skip-link", href: `#${N}`, children: p }),
    /* @__PURE__ */ t("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ t(
      Me,
      {
        items: r,
        currentId: a,
        currentIds: l,
        brandTitle: e,
        brandTagline: n,
        theme: i,
        actions: s
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "lp-shell__learner", children: y }),
    v,
    o ? /* @__PURE__ */ t(Ae, { items: o, resolveHref: d }) : null,
    u != null && u.title ? /* @__PURE__ */ c("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ t("h1", { children: u.title }),
      u.subtitle ? /* @__PURE__ */ t("p", { className: "lp-page-header__subtitle", children: u.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ t("main", { id: N, className: "lp-shell__main site-main", tabIndex: -1, children: C }),
    /* @__PURE__ */ t("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: I })
  ] });
}
function wt({
  learner: e,
  hubName: n,
  accountHref: r = "./account/",
  onSignOut: a
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
      /* @__PURE__ */ t("a", { href: r, children: "Account" }),
      a ? /* @__PURE__ */ t("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        a();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ t("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function Le({ id: e, title: n }) {
  const r = [e, n].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ t("span", { className: "lp-outcome-badge", children: r });
}
function St({ message: e = "Loading…" }) {
  return /* @__PURE__ */ c("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ t("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { children: e })
  ] });
}
function Oe({
  title: e = "Progress",
  completed: n = 0,
  total: r = 0,
  description: a = ""
}) {
  const l = Math.max(0, Number(r) || 0), i = Math.min(l, Math.max(0, Number(n) || 0)), s = l ? Math.round(i / l * 100) : 0;
  return /* @__PURE__ */ c("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    a ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: a }) : null,
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
function De({
  id: e,
  title: n,
  kind: r = "session",
  summary: a = "",
  defaultOpen: l = !1,
  meta: i,
  children: s
}) {
  const o = _e(r) ? r : "session", d = le[o];
  return /* @__PURE__ */ c("details", { className: "lp-session lp-panel", id: e, "data-kind": o, open: l, children: [
    /* @__PURE__ */ t("summary", { className: "lp-session__summary", children: /* @__PURE__ */ c("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ t("h2", { className: "lp-session__heading", children: n || d }),
      /* @__PURE__ */ t("span", { className: "lp-session__meta", children: i || d })
    ] }) }),
    /* @__PURE__ */ c("div", { className: "lp-session__content", children: [
      a ? /* @__PURE__ */ t("p", { className: "lp-panel-note", children: a }) : null,
      /* @__PURE__ */ t("div", { className: "lp-activity-list", children: s })
    ] })
  ] });
}
function Fe({
  teachingWeek: e,
  title: n = "",
  subtitle: r = "",
  status: a,
  learningOutcomes: l = [],
  headingLevel: i = 1,
  showTitle: s = !0
}) {
  const o = e ? `Week ${e}${n ? `: ${n}` : ""}` : n || "Week";
  return /* @__PURE__ */ c("header", { className: "lp-week-header", children: [
    a ? /* @__PURE__ */ t(re, { status: a }) : null,
    s ? /* @__PURE__ */ t(i === 2 ? "h2" : "h1", { children: o }) : e ? /* @__PURE__ */ t("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-week-header__subtitle", children: r }) : null,
    l.length ? /* @__PURE__ */ t("ul", { className: "lp-week-header__outcomes", children: l.map((u) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(Le, { id: u.id, title: u.title }) }, u.id || u.title)) }) : null
  ] });
}
function Re({ previousWeek: e, nextWeek: n }) {
  return !(e != null && e.href) && !(n != null && n.href) ? null : /* @__PURE__ */ t("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ c("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    n != null && n.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: n.href, rel: "next", children: n.label || "Next week" }) }) : null
  ] }) });
}
function Be(e) {
  if (e.meta) return e.meta;
  const n = (e.activities || []).length, r = `${n} ${n === 1 ? "activity" : "activities"}`, a = le[e.kind || "session"] || le.session;
  return e.kind && e.kind !== "session" ? `${a} · ${r}` : r;
}
function je(e, n) {
  return "html" in e && e.html ? /* @__PURE__ */ t(
    "div",
    {
      className: "lp-activity-html",
      dangerouslySetInnerHTML: { __html: e.html }
    },
    n
  ) : "children" in e && e.children ? /* @__PURE__ */ t("div", { children: e.children }, n) : /* @__PURE__ */ t(Se, { ...e }, n);
}
function Tt({
  week: e = {},
  learningOutcomes: n = [],
  context: r = null,
  sessions: a = [],
  progress: l = null,
  previousWeek: i,
  nextWeek: s,
  features: o = {},
  renderActivity: d
}) {
  const u = ye(o), g = (r == null ? void 0 : r.type) || (r == null ? void 0 : r.contextType), y = a.filter((p) => !(u.showIndependentStudy === !1 && Ne(p.kind))), v = d || je;
  return /* @__PURE__ */ c("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ t(
      Fe,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: u.showLearningOutcomes ? n : [],
        headingLevel: e.headingLevel || 1,
        showTitle: u.showTitle !== !1
      }
    ),
    r && ve(u, g) ? /* @__PURE__ */ t(
      Ee,
      {
        contextType: g,
        heading: r.heading,
        items: r.items,
        description: r.description,
        action: r.action
      }
    ) : null,
    y.length ? y.map((p) => /* @__PURE__ */ t(
      De,
      {
        id: p.id,
        title: p.title,
        kind: p.kind,
        summary: p.summary,
        defaultOpen: p.defaultOpen,
        meta: Be(p),
        children: (p.activities || []).map((N, C) => v(N, C))
      },
      p.id || p.title
    )) : /* @__PURE__ */ t(
      Pe,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    u.showProgress && l ? /* @__PURE__ */ t(Oe, { ...l }) : null,
    /* @__PURE__ */ t(Re, { previousWeek: i, nextWeek: s })
  ] });
}
const Ue = ["neutral", "correct", "incorrect", "informative", "hint"], Ke = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function J({
  state: e = "neutral",
  title: n,
  message: r
}) {
  const a = Ue.includes(e) ? e : "neutral", l = Ke[a];
  return !r && !n ? null : /* @__PURE__ */ t("div", { className: "lp-feedback", "data-lp-feedback-state": a, "data-lp-feedback": !0, children: /* @__PURE__ */ t(xe, { tone: l.tone, title: n || l.label, message: r }) });
}
function ee(e, n) {
  const r = e.slice();
  if (!n || r.length < 2) return r;
  for (let a = r.length - 1; a > 0; a -= 1) {
    const l = Math.floor(Math.random() * (a + 1)), i = r[a];
    r[a] = r[l], r[l] = i;
  }
  return r;
}
function Q(e) {
  return e.label || e.text || e.id;
}
function Ye({
  id: e = "classification",
  title: n,
  prompt: r,
  instructions: a,
  items: l,
  categories: i,
  feedback: s,
  formative: o = !0,
  retry: d = !0,
  shuffle: u = !1,
  maxAttempts: g,
  initialAssignments: y = {},
  onResult: v
}) {
  const p = X(() => ee(l, u), [l, u]), [N, C] = k({ ...y }), [I, f] = k(null), [T, j] = k(0), [x, B] = k(!1), [D, E] = k("neutral"), [P, L] = k(""), A = Object.fromEntries(
    l.filter((h) => h.correctCategoryId).map((h) => [h.id, h.correctCategoryId])
  ), $ = !!(o && Object.keys(A).length), O = x, U = x && d && (typeof g != "number" || T < g), Y = p.filter((h) => !N[h.id]), m = p.find((h) => h.id === I);
  function _(h) {
    v == null || v(h);
  }
  function M(h, b) {
    C((w) => ({ ...w, [h]: b })), f(null);
  }
  function F(h) {
    f((b) => b === h ? null : h);
  }
  function q(h) {
    I && M(I, h);
  }
  function H(h) {
    C((b) => {
      const w = { ...b };
      return delete w[h], w;
    }), f(null);
  }
  function S() {
    if (!l.every((R) => N[R.id])) {
      E("informative"), L("Place every item in a category before checking.");
      return;
    }
    const b = T + 1, w = $ ? l.filter((R) => N[R.id] === A[R.id]).length : 0, K = $ ? w === l.length : null;
    j(b), B(!0), E(K === !0 ? "correct" : K === !1 ? "incorrect" : "informative"), L($ ? K ? (s == null ? void 0 : s.correct) || "Those items match the expected categories." : (s == null ? void 0 : s.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), _({
      completed: !0,
      correct: K,
      score: $ ? { correct: w, total: l.length } : void 0,
      attempts: b,
      responses: { ...N }
    });
  }
  function z() {
    C({}), f(null), B(!1), E("neutral"), L(""), _({ completed: !1, correct: null, attempts: T, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "classification", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: m ? `Selected: ${Q(m)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: O, children: [
      /* @__PURE__ */ t("legend", { children: r }),
      /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        Y.map((h) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": I === h.id,
            onClick: () => F(h.id),
            children: [
              Q(h),
              I === h.id ? " (selected)" : ""
            ]
          },
          h.id
        )),
        Y.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((h) => {
        const b = p.filter((w) => N[w.id] === h.id);
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: h.label }) }),
          /* @__PURE__ */ t("ul", { className: "lp-activity-list", children: b.map((w) => {
            const K = x && $ ? A[w.id] === h.id ? "Correct" : "Incorrect" : "Placed";
            return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                onClick: () => H(w.id),
                children: [
                  Q(w),
                  " · ",
                  K,
                  O ? "" : " · Return"
                ]
              }
            ) }, w.id);
          }) }),
          b.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "No items yet" }) : null,
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "lp-button",
              disabled: !I,
              onClick: () => q(h.id),
              children: [
                "Place in ",
                Q(h)
              ]
            }
          )
        ] }, h.id);
      }) }),
      /* @__PURE__ */ c("details", { children: [
        /* @__PURE__ */ t("summary", { children: "Use dropdown lists instead" }),
        p.map((h) => /* @__PURE__ */ c("p", { className: "lp-form__field", children: [
          /* @__PURE__ */ t("label", { htmlFor: `${e}-${h.id}`, children: Q(h) }),
          /* @__PURE__ */ c(
            "select",
            {
              id: `${e}-${h.id}`,
              "data-lp-item": h.id,
              value: N[h.id] || "",
              disabled: O,
              onChange: (b) => {
                const w = b.target.value;
                C((K) => {
                  const R = { ...K };
                  return w ? R[h.id] = w : delete R[h.id], R;
                }), f(null);
              },
              children: [
                /* @__PURE__ */ t("option", { value: "", children: "Select a category" }),
                i.map((b) => /* @__PURE__ */ t("option", { value: b.id, children: b.label }, b.id))
              ]
            }
          )
        ] }, `list-${h.id}`))
      ] })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: S, disabled: O, children: "Check types" }),
      U ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: z, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: D, message: P })
  ] });
}
function oe() {
  const [e, n] = k({}), [r, a] = k(null), l = te((d, u = e) => Object.keys(u).find((g) => u[g] === d) || null, [e]), i = te((d) => {
    a((u) => u === d ? null : d);
  }, []), s = te((d) => {
    if (!r) {
      const g = l(d);
      g && a(g);
      return;
    }
    const u = r;
    n((g) => {
      const y = { ...g }, v = Object.keys(y).find((p) => y[p] === d);
      return v && delete y[v], y[u] = d, y;
    }), a(null);
  }, [l, r]), o = te(() => {
    n({}), a(null);
  }, []);
  return { placements: e, selectedItemId: r, selectItem: i, selectTarget: s, occupantOf: l, reset: o };
}
function qe({
  id: e = "drag-drop",
  title: n,
  prompt: r,
  instructions: a,
  items: l,
  targets: i,
  correct: s = {},
  feedback: o,
  formative: d = !0,
  retry: u = !0,
  shuffle: g = !1,
  maxAttempts: y,
  onResult: v
}) {
  var H;
  const p = X(() => ee(l, g), [l, g]), { placements: N, selectedItemId: C, selectItem: I, selectTarget: f, occupantOf: T, reset: j } = oe(), [x, B] = k(0), [D, E] = k(!1), [P, L] = k("neutral"), [A, $] = k(""), O = !!(d && Object.keys(s).length), U = D, Y = D && u && (typeof y != "number" || x < y), m = p.filter((S) => !N[S.id]), _ = (H = p.find((S) => S.id === C)) == null ? void 0 : H.label;
  function M(S) {
    v == null || v(S);
  }
  function F() {
    if (!l.every((w) => N[w.id])) {
      L("informative"), $("Place every item before checking.");
      return;
    }
    const z = x + 1, h = O ? l.filter((w) => N[w.id] === s[w.id]).length : 0, b = O ? h === l.length : null;
    B(z), E(!0), L(b === !0 ? "correct" : b === !1 ? "incorrect" : "informative"), $(O ? b ? (o == null ? void 0 : o.correct) || "Those placements match the expected targets." : (o == null ? void 0 : o.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), M({
      completed: !0,
      correct: b,
      score: O ? { correct: h, total: l.length } : void 0,
      attempts: z,
      responses: { ...N }
    });
  }
  function q() {
    j(), E(!1), L("neutral"), $(""), M({ completed: !1, correct: null, attempts: x, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "drag-drop", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ t("p", { children: r }),
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: _ ? `Selected: ${_}. Choose a target.` : "Select an item, then select a target to place it." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: U, children: [
      /* @__PURE__ */ t("legend", { children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        m.map((S) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": C === S.id,
            onClick: () => I(S.id),
            children: [
              S.label,
              C === S.id ? " (selected)" : ""
            ]
          },
          S.id
        )),
        m.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] })
    ] }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: U, children: [
      /* @__PURE__ */ t("legend", { children: "Targets" }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((S) => {
        const z = T(S.id), h = l.find((w) => w.id === z), b = D && O && z ? s[z] === S.id ? "Correct" : "Incorrect" : h ? "Placed" : "Empty";
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: S.label }) }),
          /* @__PURE__ */ c("p", { className: "lp-card__meta", children: [
            h ? h.label : "No item yet",
            " · ",
            b
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button",
              onClick: () => f(S.id),
              children: h ? `Place on ${S.label} (replace ${h.label})` : `Place on ${S.label}`
            }
          )
        ] }, S.id);
      }) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: F, disabled: U, children: "Check placement" }),
      Y ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: q, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: P, message: A })
  ] });
}
function He({
  id: e = "option-cards",
  title: n,
  prompt: r,
  instructions: a,
  options: l,
  correctOptionId: i,
  feedback: s,
  formative: o = !0,
  retry: d = !0,
  shuffle: u = !1,
  maxAttempts: g,
  initialSelectedId: y,
  onResult: v
}) {
  const p = X(() => ee(l, u), [l, u]), [N, C] = k(y || null), [I, f] = k(0), [T, j] = k(!1), [x, B] = k("neutral"), [D, E] = k(""), P = !!(o && i), L = `lp-option-cards-${e}`, A = T, $ = T && d && (typeof g != "number" || I < g);
  function O(m) {
    v == null || v(m);
  }
  function U() {
    if (!N) {
      B("informative"), E("Choose an option before checking.");
      return;
    }
    const m = I + 1, _ = P ? N === i : null, M = P ? _ ? (s == null ? void 0 : s.correct) || "That matches the expected option." : (s == null ? void 0 : s.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    f(m), j(!0), B(_ === !0 ? "correct" : _ === !1 ? "incorrect" : "informative"), E(M), O({
      completed: !0,
      correct: _,
      score: P ? { correct: _ ? 1 : 0, total: 1 } : void 0,
      attempts: m,
      responses: { optionId: N }
    });
  }
  function Y() {
    C(null), j(!1), B("neutral"), E(""), O({
      completed: !1,
      correct: null,
      attempts: I,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "option-cards", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: A, children: [
      /* @__PURE__ */ t("legend", { children: r }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: p.map((m) => {
        const _ = N === m.id, F = T && P && _ ? m.id === i ? "Correct" : "Incorrect" : _ ? "Selected" : "";
        return /* @__PURE__ */ c("label", { className: "lp-card lp-activity-card", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "radio",
              name: L,
              value: m.id,
              checked: _,
              "data-lp-response": "",
              onChange: () => C(m.id)
            }
          ),
          /* @__PURE__ */ c("span", { children: [
            /* @__PURE__ */ t("strong", { children: m.label }),
            m.description ? /* @__PURE__ */ c("span", { className: "lp-card__meta", children: [
              " — ",
              m.description
            ] }) : null
          ] }),
          m.imageSrc ? /* @__PURE__ */ t("img", { src: m.imageSrc, alt: m.imageAlt || m.label }) : null,
          F ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: F }) : null
        ] }, m.id);
      }) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: U, disabled: A, children: "Check answer" }),
      $ ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: x, message: D })
  ] });
}
function ze(e, n) {
  var o;
  const r = [], a = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let l = 0, i = 0, s;
  for (; (s = a.exec(e)) !== null; ) {
    s.index > l && r.push(e.slice(l, s.index));
    const d = s[1] || ((o = n[i]) == null ? void 0 : o.id) || `gap-${i + 1}`;
    i += 1, r.push({ gapId: d }), l = s.index + s[0].length;
  }
  return l < e.length && r.push(e.slice(l)), !r.some((d) => typeof d != "string") && n[0] && (r.push(" "), r.push({ gapId: n[0].id })), r;
}
function Ve({
  id: e = "phrase-completion",
  title: n,
  prompt: r,
  instructions: a,
  gaps: l,
  options: i,
  correctOptionId: s,
  feedback: o,
  formative: d = !0,
  retry: u = !0,
  shuffle: g = !1,
  maxAttempts: y,
  onResult: v
}) {
  var h;
  const p = X(() => l && l.length ? l : [{ id: "gap", label: "missing term", correctOptionId: s || void 0 }], [s, l]), N = X(() => ee(i, g), [i, g]), C = X(() => ze(r, p), [r, p]), { placements: I, selectedItemId: f, selectItem: T, selectTarget: j, occupantOf: x, reset: B } = oe(), [D, E] = k(0), [P, L] = k(!1), [A, $] = k("neutral"), [O, U] = k(""), Y = Object.fromEntries(
    p.map((b) => [b.id, b.correctOptionId]).filter((b) => b[1])
  ), m = !!(d && Object.keys(Y).length), _ = P, M = P && u && (typeof y != "number" || D < y), F = N.filter((b) => !I[b.id]), q = (h = i.find((b) => b.id === f)) == null ? void 0 : h.label;
  function H(b) {
    v == null || v(b);
  }
  function S() {
    if (!p.every((V) => x(V.id))) {
      $("informative"), U("Fill every blank before checking.");
      return;
    }
    const w = D + 1, K = {};
    p.forEach((V) => {
      const Z = x(V.id);
      Z && (K[V.id] = Z);
    });
    const R = m ? p.filter((V) => K[V.id] === Y[V.id]).length : 0, G = m ? R === p.length : null;
    E(w), L(!0), $(G === !0 ? "correct" : G === !1 ? "incorrect" : "informative"), U(m ? G ? (o == null ? void 0 : o.correct) || "That completes the phrase." : (o == null ? void 0 : o.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), H({
      completed: !0,
      correct: G,
      score: m ? { correct: R, total: p.length } : void 0,
      attempts: w,
      responses: K
    });
  }
  function z() {
    B(), L(!1), $("neutral"), U(""), H({ completed: !1, correct: null, attempts: D, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "fill-gap", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: q ? `Selected: ${q}. Choose a blank.` : "Select a phrase, then select the blank." }),
    /* @__PURE__ */ t("p", { children: C.map((b, w) => {
      if (typeof b == "string") return /* @__PURE__ */ t("span", { children: b }, `text-${w}`);
      const K = x(b.gapId), R = i.find((Z) => Z.id === K), G = p.find((Z) => Z.id === b.gapId), V = P && m && K ? Y[b.gapId] === K ? "Correct" : "Incorrect" : R ? "Filled" : "Blank";
      return /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "lp-button lp-button--secondary",
          disabled: _,
          "aria-label": `${(G == null ? void 0 : G.label) || "blank"}: ${(R == null ? void 0 : R.label) || "empty"}. ${V}`,
          onClick: () => j(b.gapId),
          children: (R == null ? void 0 : R.label) || "______"
        },
        b.gapId
      );
    }) }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: _, children: [
      /* @__PURE__ */ t("legend", { children: "Available phrases" }),
      /* @__PURE__ */ t("div", { className: "lp-card__actions", children: F.map((b) => /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: "lp-button",
          "aria-pressed": f === b.id,
          onClick: () => T(b.id),
          children: [
            b.label,
            f === b.id ? " (selected)" : ""
          ]
        },
        b.id
      )) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: S, disabled: _, children: "Check phrase" }),
      M ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: z, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: A, message: O })
  ] });
}
function Ge({
  id: e = "sequence",
  title: n,
  prompt: r,
  instructions: a,
  items: l,
  correctOrder: i = [],
  feedback: s,
  formative: o = !0,
  retry: d = !0,
  shuffle: u = !1,
  maxAttempts: g,
  onResult: y
}) {
  const v = X(() => ee(l, u), [l, u]), [p, N] = k(v), [C, I] = k(0), [f, T] = k(!1), [j, x] = k("neutral"), [B, D] = k(""), E = !!(o && i.length), P = f, L = f && d && (typeof g != "number" || C < g);
  function A(m) {
    y == null || y(m);
  }
  function $(m, _) {
    const M = m + _;
    if (M < 0 || M >= p.length) return;
    const F = p.slice(), [q] = F.splice(m, 1);
    F.splice(M, 0, q), N(F);
  }
  function O(m, _) {
    P || (m.key === "ArrowUp" && (m.preventDefault(), $(_, -1)), m.key === "ArrowDown" && (m.preventDefault(), $(_, 1)));
  }
  function U() {
    const m = C + 1, _ = p.map((q) => q.id), M = E ? _.filter((q, H) => q === i[H]).length : 0, F = E ? M === i.length && _.length === i.length : null;
    I(m), T(!0), x(F === !0 ? "correct" : F === !1 ? "incorrect" : "informative"), D(E ? F ? (s == null ? void 0 : s.correct) || "That order matches the expected sequence." : (s == null ? void 0 : s.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), A({
      completed: !0,
      correct: F,
      score: E ? { correct: M, total: i.length } : void 0,
      attempts: m,
      responses: { itemIds: _ }
    });
  }
  function Y() {
    N(v), T(!1), x("neutral"), D(""), A({
      completed: !1,
      correct: null,
      attempts: C,
      responses: { itemIds: v.map((m) => m.id) }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "ordering", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ t("p", { children: r }),
    /* @__PURE__ */ t("ol", { className: "lp-activity-list", children: p.map((m, _) => /* @__PURE__ */ c(
      "li",
      {
        className: "lp-card",
        tabIndex: P ? -1 : 0,
        "aria-label": `${m.label}, position ${_ + 1} of ${p.length}`,
        onKeyDown: (M) => O(M, _),
        children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ c("strong", { children: [
            _ + 1,
            ". ",
            m.label
          ] }) }),
          /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                disabled: P || _ === 0,
                onClick: () => $(_, -1),
                children: [
                  "Move ",
                  m.label,
                  " up"
                ]
              }
            ),
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                disabled: P || _ === p.length - 1,
                onClick: () => $(_, 1),
                children: [
                  "Move ",
                  m.label,
                  " down"
                ]
              }
            )
          ] })
        ]
      },
      m.id
    )) }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: U, disabled: P, children: "Check order" }),
      L ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: j, message: B })
  ] });
}
function W(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Xe(e) {
  var n;
  return (e == null ? void 0 : e.formative) === !0 || ((n = e == null ? void 0 : e.marking) == null ? void 0 : n.mode) === "formative-local";
}
function Ze(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function Je(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const Qe = [
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
], ae = 200, We = 500;
function de(e, n) {
  const r = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return r > 0 ? r : n;
}
function et(e) {
  return Qe.includes(W(e));
}
function tt(e) {
  var n;
  return ((n = e.content) == null ? void 0 : n.questionId) || e.id;
}
function nt({
  id: e,
  prompt: n,
  placeholder: r,
  value: a,
  defaultValue: l = "",
  minChars: i,
  minimumCharacters: s,
  defaultMinChars: o = ae,
  rows: d = 4,
  disabled: u = !1,
  hidePrompt: g = !1,
  onChange: y
}) {
  const v = ne(), p = e || v, N = de({ minChars: i, minimumCharacters: s }, o), C = typeof a == "string", [I, f] = k(String(l || "")), [T, j] = k(""), x = C ? a : I, B = x.trim().length, D = B >= N;
  function E(A) {
    C || f(A), y == null || y(A);
  }
  function P(A) {
    A.preventDefault(), j("Paste is disabled. Type your answer in your own words.");
  }
  function L(A) {
    A.preventDefault(), j("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ c("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ c("label", { className: "lp-field", htmlFor: p, children: [
      g ? /* @__PURE__ */ t("span", { className: "lp-visually-hidden", children: n }) : /* @__PURE__ */ t("span", { className: "lp-field__label", children: n }),
      /* @__PURE__ */ t(
        "textarea",
        {
          id: p,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(N),
          rows: d,
          value: x,
          placeholder: r,
          minLength: N,
          autoComplete: "off",
          disabled: u,
          "aria-describedby": `${p}-count ${p}-notice`,
          onChange: (A) => E(A.target.value),
          onPaste: P,
          onDrop: L
        }
      )
    ] }),
    /* @__PURE__ */ t(
      "p",
      {
        id: `${p}-count`,
        className: "lp-char-count",
        "data-lp-char-count": "",
        "data-lp-met": D ? "true" : "false",
        "aria-live": "polite",
        children: `${B} / ${N} characters minimum`
      }
    ),
    /* @__PURE__ */ t(
      "p",
      {
        id: `${p}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: T
      }
    )
  ] });
}
function lt(e, n) {
  return n > 0 ? `Write at least ${e} characters. You currently have ${n}.` : `Write at least ${e} characters before saving.`;
}
function pe({
  id: e = "text-response",
  blockType: n = "short-response",
  title: r,
  prompt: a,
  instructions: l,
  guidance: i,
  placeholder: s,
  minChars: o,
  minimumCharacters: d,
  defaultMinChars: u = ae,
  rows: g = 4,
  feedback: y,
  retry: v = !0,
  maxAttempts: p,
  initialResponse: N = "",
  saveLabel: C = "Save response",
  onResult: I
}) {
  const f = de({ minChars: o, minimumCharacters: d }, u), [T, j] = k(String(N || "")), [x, B] = k(0), [D, E] = k(!1), [P, L] = k("neutral"), [A, $] = k(""), O = T.trim(), U = O.length, Y = U >= f, m = D, _ = D && v && (typeof p != "number" || x < p);
  function M(H) {
    I == null || I(H);
  }
  function F() {
    if (!Y) {
      L("informative"), $(lt(f, U));
      return;
    }
    const H = x + 1, S = i || (y == null ? void 0 : y.correct) || "Saved.";
    B(H), E(!0), L("informative"), $(S), M({
      completed: !0,
      correct: null,
      attempts: H,
      responses: O
    });
  }
  function q() {
    j(""), E(!1), L("neutral"), $(""), M({
      completed: !1,
      correct: null,
      attempts: x,
      responses: ""
    });
  }
  return /* @__PURE__ */ c(
    "section",
    {
      className: "lp-block lp-block--interactive lp-form",
      "data-lp-block": n,
      "data-lp-block-id": e,
      children: [
        r ? /* @__PURE__ */ t("h3", { children: r }) : null,
        l ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ t(
          nt,
          {
            id: `${e}-field`,
            prompt: a,
            placeholder: s,
            value: T,
            minChars: o,
            minimumCharacters: d,
            defaultMinChars: u,
            rows: g,
            disabled: m,
            onChange: j
          }
        ),
        /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: F, disabled: m, children: C }),
          _ ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: q, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(J, { state: P, message: A })
      ]
    }
  );
}
function rt({
  rows: e = 4,
  ...n
}) {
  return /* @__PURE__ */ t(
    pe,
    {
      ...n,
      blockType: "short-response",
      defaultMinChars: ae,
      rows: e
    }
  );
}
function at({
  rows: e = 6,
  ...n
}) {
  return /* @__PURE__ */ t(
    pe,
    {
      ...n,
      blockType: "reflection",
      defaultMinChars: We,
      rows: e
    }
  );
}
function st(e) {
  const n = e.content || {};
  return {
    id: e.id,
    instructions: n.instructions,
    feedback: n.feedback,
    formative: Xe(n),
    retry: Ze(n),
    shuffle: Je(n),
    maxAttempts: n.maxAttempts
  };
}
function se(e) {
  return typeof e == "string" ? e : void 0;
}
function ct({ block: e, initialResponse: n, onResult: r }) {
  const a = W(e.type), l = e.content || {}, i = W(l.presentation), s = st(e), o = (d) => r == null ? void 0 : r(d, e);
  if (a === "single-choice" || a === "option-cards" || i === "option-cards" || i === "true-false" || i === "picture-quiz")
    return /* @__PURE__ */ t(
      He,
      {
        ...s,
        prompt: l.prompt || "Choose an option",
        options: l.options || [],
        correctOptionId: l.correctOptionId,
        initialSelectedId: typeof n == "string" ? n : void 0,
        onResult: o
      }
    );
  if (a === "classification") {
    const d = n && typeof n == "object" && !Array.isArray(n) ? n : void 0;
    return /* @__PURE__ */ t(
      Ye,
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
  return a === "drag-drop" ? /* @__PURE__ */ t(
    qe,
    {
      ...s,
      prompt: l.prompt || "Place each item",
      items: l.items || [],
      targets: l.targets || [],
      correct: l.correct,
      onResult: o
    }
  ) : a === "fill-gap" || a === "phrase-completion" ? /* @__PURE__ */ t(
    Ve,
    {
      ...s,
      prompt: l.prompt || "Complete the phrase",
      gaps: l.gaps,
      options: l.options || [],
      correctOptionId: l.correctOptionId,
      onResult: o
    }
  ) : a === "ordering" || a === "sequence" ? /* @__PURE__ */ t(
    Ge,
    {
      ...s,
      prompt: l.prompt || "Put the items in order",
      items: l.items || [],
      correctOrder: l.correctOrder,
      onResult: o
    }
  ) : a === "short-response" ? /* @__PURE__ */ t(
    rt,
    {
      id: s.id,
      prompt: l.prompt || "Write your response",
      instructions: s.instructions,
      guidance: l.guidance,
      placeholder: l.placeholder,
      minChars: l.minChars,
      minimumCharacters: l.minimumCharacters,
      feedback: s.feedback,
      retry: s.retry,
      maxAttempts: s.maxAttempts,
      initialResponse: se(n),
      onResult: o
    }
  ) : a === "reflection" ? /* @__PURE__ */ t(
    at,
    {
      id: s.id,
      prompt: l.prompt || "Write your reflection",
      instructions: s.instructions,
      guidance: l.guidance,
      placeholder: l.placeholder,
      minChars: l.minChars,
      minimumCharacters: l.minimumCharacters,
      feedback: s.feedback,
      retry: s.retry,
      maxAttempts: s.maxAttempts,
      initialResponse: se(n),
      onResult: o
    }
  ) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": a, children: [
    "This ",
    a || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function At({
  activity: e,
  initialResponses: n = {},
  renderFallback: r,
  onResult: a
}) {
  var s, o;
  const [l, i] = k(0);
  return /* @__PURE__ */ c(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": e.version || "0.1.0",
      children: [
        (s = e.metadata) != null && s.title ? /* @__PURE__ */ t("h3", { children: e.metadata.title }) : null,
        (o = e.metadata) != null && o.summary ? /* @__PURE__ */ t("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ t("div", { className: "lp-activity-list", children: (e.blocks || []).map((d) => et(d.type) ? /* @__PURE__ */ t(
          ct,
          {
            block: d,
            initialResponse: n[tt(d)],
            onResult: a
          },
          d.id
        ) : r ? /* @__PURE__ */ t("div", { children: r(d) }, d.id) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": W(d.type), children: [
          "This ",
          W(d.type) || "unknown",
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
function it(e, n) {
  return typeof n == "number" && Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function ue({
  title: e,
  badge: n,
  subtitle: r,
  score: a,
  progress: l,
  completed: i = !0,
  attempts: s,
  message: o,
  showStatus: d = !0,
  showDisclaimer: u = !0,
  collapsed: g = !1
}) {
  const y = n || r, v = it(a, l), p = Math.round(v * 100), N = i ? "Completed" : "In progress", C = a ? `${a.correct} / ${a.total}` : null, I = a ? `${a.correct} of ${a.total} correct` : null, f = typeof s == "number" ? `${s} ${s === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ c(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": g ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ t("strong", { children: e }) }) : null,
        d ? /* @__PURE__ */ t(re, { status: i ? "completed" : "progress", label: N }) : null,
        C ? /* @__PURE__ */ t(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": I || void 0,
            children: C
          }
        ) : null,
        I ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: I }) : null,
        !g && y ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ t("strong", { children: y }) }) : null,
        g ? null : /* @__PURE__ */ c(he, { children: [
          /* @__PURE__ */ t(
            "progress",
            {
              className: "lp-progress",
              max: 100,
              value: p,
              "aria-label": `${p}% complete`
            }
          ),
          /* @__PURE__ */ c("p", { className: "lp-card__meta", children: [
            p,
            "% complete"
          ] }),
          f ? /* @__PURE__ */ t("p", { children: f }) : null,
          o ? /* @__PURE__ */ t("p", { children: o }) : null,
          u ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function ot(e, n) {
  if (e)
    try {
      n && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !n && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      n ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function $t({
  open: e = !1,
  title: n = "Activity complete",
  completed: r = !0,
  score: a,
  badge: l,
  subtitle: i,
  progress: s,
  attempts: o,
  message: d,
  onClose: u,
  onReview: g,
  onNext: y,
  nextLabel: v = "Continue",
  reviewLabel: p = "Review"
}) {
  const N = me(null), C = ne();
  return ce(() => {
    ot(N.current, e);
  }, [e]), e ? /* @__PURE__ */ c(
    "dialog",
    {
      ref: N,
      className: "lp-dialog",
      "aria-labelledby": C,
      onCancel: (I) => {
        I.preventDefault(), u == null || u();
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
              onClick: u,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ t(
            ue,
            {
              completed: r,
              score: a,
              badge: l,
              subtitle: i,
              progress: s,
              attempts: o,
              message: d
            }
          ),
          /* @__PURE__ */ c("div", { className: "lp-form__actions", children: [
            g ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: g, children: p }) : null,
            y ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: y, children: v }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const dt = (e) => ({
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
function xt({
  collapsed: e,
  defaultCollapsed: n = !0,
  onCollapsedChange: r,
  expandLabel: a = "Show progress details",
  collapseLabel: l = "Hide progress details",
  ...i
}) {
  const [s, o] = k(n), d = typeof e == "boolean" ? e : s, u = ne(), g = i.title || "Practice progress";
  function y(v) {
    typeof e != "boolean" && o(v), r == null || r(v);
  }
  return /* @__PURE__ */ c(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: dt(d),
      "aria-label": g,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": d ? "true" : "false",
      children: [
        /* @__PURE__ */ t("div", { id: u, children: /* @__PURE__ */ t(ue, { ...i, title: g, collapsed: d }) }),
        /* @__PURE__ */ t("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !d,
            "aria-controls": u,
            onClick: () => y(!d),
            children: d ? a : l
          }
        ) })
      ]
    }
  );
}
const pt = {
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
}, ut = {
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
}, ht = {
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
}, mt = {
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
}, ft = {
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
}, bt = {
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
}, gt = {
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
}, yt = {
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
}, Et = [
  pt,
  ut,
  ht,
  mt,
  ft,
  bt,
  gt,
  yt
];
export {
  ct as ActivityBlock,
  Se as ActivityCard,
  Ae as Breadcrumbs,
  fe as CONTEXT_TYPES,
  xe as Callout,
  Ye as Classification,
  $t as CompletionModal,
  Ee as ContextPanel,
  qe as DragDrop,
  Pe as EmptyState,
  Ct as ErrorState,
  Ue as FEEDBACK_STATES,
  J as FeedbackPanel,
  It as HubShell,
  At as InteractiveActivity,
  _t as LEARNER_ACTIVITY_STATES,
  wt as LearnerHeader,
  Le as LearningOutcomeBadge,
  nt as LearningTextField,
  St as LoadingState,
  Me as Navigation,
  He as OptionCards,
  Ve as PhraseCompletion,
  xt as PracticeProgressPanel,
  Oe as ProgressCard,
  ue as ProgressSummary,
  We as REFLECTION_DEFAULT_MIN_CHARS,
  at as Reflection,
  be as SESSION_KINDS,
  le as SESSION_KIND_LABELS,
  ae as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  kt as STATUS_TONES,
  Ge as Sequence,
  De as SessionSection,
  rt as ShortResponse,
  re as StatusBadge,
  pe as TextResponse,
  ge as WEEK_UI_FEATURES,
  Fe as WeekHeader,
  Re as WeekNavigation,
  Tt as WeekView,
  we as activityActionLabel,
  Et as demoCatalogueActivities,
  bt as demoClassification,
  ht as demoDragDrop,
  pt as demoOptionCards,
  mt as demoPhraseCompletion,
  yt as demoReflection,
  ft as demoSequence,
  gt as demoShortResponse,
  ut as demoTrueFalse,
  et as isCatalogueReactType,
  Ne as isIndependentKind,
  _e as isSessionKind,
  ye as mergeWeekUiFeatures,
  W as normaliseActivityType,
  tt as questionIdFor,
  de as resolveMinChars,
  it as resolveProgressFraction,
  ve as shouldShowContext,
  ie as statusLabel,
  Ie as statusTone
};
//# sourceMappingURL=index.js.map
