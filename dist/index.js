import { jsxs as c, jsx as t, Fragment as oe } from "react/jsx-runtime";
import { useId as ne, useState as I, useEffect as re, useMemo as X, useCallback as te, useRef as de } from "react";
const pe = ["exam", "assignment", "project"], ue = [
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
}, dt = ["not-started", "in-progress", "completed"], pt = ["available", "planned", "progress", "completed"], he = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function me(e = {}) {
  return { ...he, ...e };
}
function fe(e, l) {
  return l ? l === "assignment" ? e.showAssignmentContext !== !1 : l === "exam" ? e.showExamContext !== !1 : l === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function be(e) {
  return e === "independent-study" || e === "homework";
}
function ge(e) {
  return ue.includes(e);
}
const ye = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, ve = {
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
function Ne(e) {
  return ye[e || ""] || "planned";
}
function se(e, l = "") {
  return ve[e || ""] || l || String(e || "Planned");
}
function _e(e, l = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : l;
}
function ae({
  status: e = "planned",
  label: l,
  marker: n = !0
}) {
  const r = Ne(e);
  return /* @__PURE__ */ c("span", { className: `lp-status-badge lp-status-badge--${r}`, role: "status", children: [
    n ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "● " }) : null,
    l || se(e)
  ] });
}
function ke({
  title: e = "Untitled activity",
  description: l = "",
  activityType: n = "Activity",
  duration: r = "",
  status: a = "Not started",
  state: i,
  href: s,
  actionLabel: d,
  badge: o = !1,
  badgeStatus: h,
  headingLevel: g = 2,
  muted: v = !1
}) {
  const y = g === 3 ? "h3" : "h2", u = [n, r].filter(Boolean), N = i ? se(i, a) : a;
  return /* @__PURE__ */ c("article", { className: v ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": i || void 0, children: [
    o ? /* @__PURE__ */ t(
      ae,
      {
        status: h || i || "planned",
        label: typeof a == "string" && a !== "Not started" ? a : void 0
      }
    ) : null,
    u.length ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: u.join(" · ") }) : null,
    /* @__PURE__ */ t(y, { children: e }),
    l ? /* @__PURE__ */ t("p", { children: l }) : null,
    /* @__PURE__ */ t("p", { className: "lp-card__meta", children: `Status: ${N}` }),
    s ? /* @__PURE__ */ t("div", { className: "lp-card__actions", children: /* @__PURE__ */ t("a", { className: "lp-button", href: s, children: d || _e(i) }) }) : null
  ] });
}
function Ce(e, l) {
  return e.href ? e.href : e.path != null && l ? l(e.path) : e.path || void 0;
}
function Ie({ items: e = [], resolveHref: l }) {
  return e.length ? /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ t("ol", { className: "lp-breadcrumbs__list", children: e.map((n, r) => {
    const a = r === e.length - 1, i = Ce(n, l);
    return /* @__PURE__ */ t("li", { children: a || !i ? /* @__PURE__ */ t("span", { "aria-current": "page", children: n.label }) : /* @__PURE__ */ t("a", { href: i, children: n.label }) }, `${n.label}-${r}`);
  }) }) }) : /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const Se = ["info", "success", "warning", "error"];
function we({ tone: e = "info", title: l, message: n }) {
  const r = Se.includes(e) ? e : "info";
  return /* @__PURE__ */ c(
    "aside",
    {
      className: `lp-callout lp-callout--${r}`,
      role: r === "error" ? "alert" : void 0,
      children: [
        l ? /* @__PURE__ */ t("strong", { children: l }) : null,
        n ? /* @__PURE__ */ t("p", { children: n }) : null
      ]
    }
  );
}
function Te({
  contextType: e = "assignment",
  heading: l = "Context",
  items: n = [],
  description: r = "",
  action: a
}) {
  const i = pe.includes(e) ? e : "assignment", s = `lp-context-${i}`;
  return /* @__PURE__ */ c(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${i}`,
      "aria-labelledby": s,
      "data-context-type": i,
      children: [
        /* @__PURE__ */ t("h2", { id: s, children: l }),
        n.length ? /* @__PURE__ */ t("dl", { className: "lp-meta-list", children: n.map((d) => /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ t("dt", { children: d.label }),
          /* @__PURE__ */ t("dd", { children: d.value })
        ] }, `${d.label}:${d.value}`)) }) : null,
        r ? /* @__PURE__ */ t("p", { children: r }) : null,
        a != null && a.label && (a != null && a.href) ? /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: a.href, children: a.label }) }) : null
      ]
    }
  );
}
function Ae({
  heading: e = "Nothing to show yet",
  message: l = "Check again later.",
  action: n
}) {
  return /* @__PURE__ */ c("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: l }),
    n != null && n.label && (n != null && n.href) ? /* @__PURE__ */ t("a", { className: "lp-button", href: n.href, children: n.label }) : null
  ] });
}
function ut({
  heading: e = "There is a problem",
  message: l = "Try again."
}) {
  return /* @__PURE__ */ c("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: l })
  ] });
}
function $e({
  items: e,
  currentId: l = "home",
  currentIds: n = [],
  brandTitle: r,
  brandTagline: a,
  homeHref: i,
  theme: s = null,
  actions: d,
  listId: o
}) {
  const h = ne(), g = o || `lp-navigation-list-${h}`, [v, y] = I(!1), u = new Set([l, ...n].filter(Boolean)), N = e.find((b) => b.id === "home" && b.enabled !== !1), k = e.filter((b) => b.enabled !== !1);
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
    /* @__PURE__ */ c("a", { className: "lp-navigation__brand", href: i || (N == null ? void 0 : N.path) || "./", children: [
      /* @__PURE__ */ t("span", { className: "lp-navigation__brand-title", children: r }),
      a ? /* @__PURE__ */ t("span", { className: "lp-navigation__brand-tagline", children: a }) : null
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": v,
        "aria-controls": g,
        "aria-label": v ? "Close main menu" : "Open main menu",
        onClick: () => y((b) => !b),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ t(
      "ul",
      {
        className: "lp-navigation__list",
        id: g,
        "data-open": v ? "true" : "false",
        children: k.map((b) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
          "a",
          {
            className: "lp-navigation__link",
            href: b.path,
            "aria-current": u.has(b.id) ? "page" : void 0,
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
    d ? /* @__PURE__ */ t("div", { className: "lp-navigation__actions", children: d }) : null
  ] }) });
}
function ht({
  brandTitle: e,
  brandTagline: l,
  navigation: n,
  currentId: r = "home",
  currentIds: a = [],
  theme: i = null,
  actions: s,
  breadcrumbs: d,
  resolveHref: o,
  pageHeader: h,
  footer: g,
  learnerHeader: v,
  notice: y,
  skipLabel: u = "Skip to main content",
  mainId: N = "main-content",
  children: k
}) {
  const S = g && typeof g == "object" && "lines" in g ? g.lines.map((b) => /* @__PURE__ */ t("p", { children: b }, b)) : g;
  return /* @__PURE__ */ c("div", { className: "lp-shell", children: [
    /* @__PURE__ */ t("a", { className: "lp-skip-link skip-link", href: `#${N}`, children: u }),
    /* @__PURE__ */ t("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ t(
      $e,
      {
        items: n,
        currentId: r,
        currentIds: a,
        brandTitle: e,
        brandTagline: l,
        theme: i,
        actions: s
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "lp-shell__learner", children: v }),
    y,
    d ? /* @__PURE__ */ t(Ie, { items: d, resolveHref: o }) : null,
    h != null && h.title ? /* @__PURE__ */ c("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ t("h1", { children: h.title }),
      h.subtitle ? /* @__PURE__ */ t("p", { className: "lp-page-header__subtitle", children: h.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ t("main", { id: N, className: "lp-shell__main site-main", tabIndex: -1, children: k }),
    /* @__PURE__ */ t("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: S })
  ] });
}
function mt({
  learner: e,
  hubName: l,
  accountHref: n = "./account/",
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
        /* @__PURE__ */ t("dd", { children: l })
      ] })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ t("a", { href: n, children: "Account" }),
      r ? /* @__PURE__ */ t("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        r();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ t("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function Ee({ id: e, title: l }) {
  const n = [e, l].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ t("span", { className: "lp-outcome-badge", children: n });
}
function ft({ message: e = "Loading…" }) {
  return /* @__PURE__ */ c("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ t("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { children: e })
  ] });
}
function Pe({
  title: e = "Progress",
  completed: l = 0,
  total: n = 0,
  description: r = ""
}) {
  const a = Math.max(0, Number(n) || 0), i = Math.min(a, Math.max(0, Number(l) || 0)), s = a ? Math.round(i / a * 100) : 0;
  return /* @__PURE__ */ c("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    r ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: r }) : null,
    /* @__PURE__ */ t(
      "progress",
      {
        className: "lp-progress",
        max: a || 1,
        value: i,
        "aria-label": `${s}% complete`
      }
    ),
    /* @__PURE__ */ t("p", { children: `${i} of ${a} complete (${s}%)` })
  ] });
}
function xe({
  id: e,
  title: l,
  kind: n = "session",
  summary: r = "",
  defaultOpen: a = !1,
  meta: i,
  children: s
}) {
  const d = ge(n) ? n : "session", o = le[d];
  return /* @__PURE__ */ c("details", { className: "lp-session lp-panel", id: e, "data-kind": d, open: a, children: [
    /* @__PURE__ */ t("summary", { className: "lp-session__summary", children: /* @__PURE__ */ c("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ t("h2", { className: "lp-session__heading", children: l || o }),
      /* @__PURE__ */ t("span", { className: "lp-session__meta", children: i || o })
    ] }) }),
    /* @__PURE__ */ c("div", { className: "lp-session__content", children: [
      r ? /* @__PURE__ */ t("p", { className: "lp-panel-note", children: r }) : null,
      /* @__PURE__ */ t("div", { className: "lp-activity-list", children: s })
    ] })
  ] });
}
function Le({
  teachingWeek: e,
  title: l = "",
  subtitle: n = "",
  status: r,
  learningOutcomes: a = [],
  headingLevel: i = 1,
  showTitle: s = !0
}) {
  const d = e ? `Week ${e}${l ? `: ${l}` : ""}` : l || "Week";
  return /* @__PURE__ */ c("header", { className: "lp-week-header", children: [
    r ? /* @__PURE__ */ t(ae, { status: r }) : null,
    s ? /* @__PURE__ */ t(i === 2 ? "h2" : "h1", { children: d }) : e ? /* @__PURE__ */ t("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    n ? /* @__PURE__ */ t("p", { className: "lp-week-header__subtitle", children: n }) : null,
    a.length ? /* @__PURE__ */ t("ul", { className: "lp-week-header__outcomes", children: a.map((h) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(Ee, { id: h.id, title: h.title }) }, h.id || h.title)) }) : null
  ] });
}
function Oe({ previousWeek: e, nextWeek: l }) {
  return !(e != null && e.href) && !(l != null && l.href) ? null : /* @__PURE__ */ t("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ c("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    l != null && l.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: l.href, rel: "next", children: l.label || "Next week" }) }) : null
  ] }) });
}
function Me(e) {
  if (e.meta) return e.meta;
  const l = (e.activities || []).length, n = `${l} ${l === 1 ? "activity" : "activities"}`, r = le[e.kind || "session"] || le.session;
  return e.kind && e.kind !== "session" ? `${r} · ${n}` : n;
}
function Fe(e, l) {
  return "html" in e && e.html ? /* @__PURE__ */ t(
    "div",
    {
      className: "lp-activity-html",
      dangerouslySetInnerHTML: { __html: e.html }
    },
    l
  ) : "children" in e && e.children ? /* @__PURE__ */ t("div", { children: e.children }, l) : /* @__PURE__ */ t(ke, { ...e }, l);
}
function bt({
  week: e = {},
  learningOutcomes: l = [],
  context: n = null,
  sessions: r = [],
  progress: a = null,
  previousWeek: i,
  nextWeek: s,
  features: d = {},
  renderActivity: o
}) {
  const h = me(d), g = (n == null ? void 0 : n.type) || (n == null ? void 0 : n.contextType), v = r.filter((u) => !(h.showIndependentStudy === !1 && be(u.kind))), y = o || Fe;
  return /* @__PURE__ */ c("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ t(
      Le,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: h.showLearningOutcomes ? l : [],
        headingLevel: e.headingLevel || 1,
        showTitle: h.showTitle !== !1
      }
    ),
    n && fe(h, g) ? /* @__PURE__ */ t(
      Te,
      {
        contextType: g,
        heading: n.heading,
        items: n.items,
        description: n.description,
        action: n.action
      }
    ) : null,
    v.length ? v.map((u) => /* @__PURE__ */ t(
      xe,
      {
        id: u.id,
        title: u.title,
        kind: u.kind,
        summary: u.summary,
        defaultOpen: u.defaultOpen,
        meta: Me(u),
        children: (u.activities || []).map((N, k) => y(N, k))
      },
      u.id || u.title
    )) : /* @__PURE__ */ t(
      Ae,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    h.showProgress && a ? /* @__PURE__ */ t(Pe, { ...a }) : null,
    /* @__PURE__ */ t(Oe, { previousWeek: i, nextWeek: s })
  ] });
}
const De = ["neutral", "correct", "incorrect", "informative", "hint"], Be = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function W({
  state: e = "neutral",
  title: l,
  message: n
}) {
  const r = De.includes(e) ? e : "neutral", a = Be[r];
  return !n && !l ? null : /* @__PURE__ */ t("div", { className: "lp-feedback", "data-lp-feedback-state": r, "data-lp-feedback": !0, children: /* @__PURE__ */ t(we, { tone: a.tone, title: l || a.label, message: n }) });
}
function ee(e, l) {
  const n = e.slice();
  if (!l || n.length < 2) return n;
  for (let r = n.length - 1; r > 0; r -= 1) {
    const a = Math.floor(Math.random() * (r + 1)), i = n[r];
    n[r] = n[a], n[a] = i;
  }
  return n;
}
function J(e) {
  return e.label || e.text || e.id;
}
function je({
  id: e = "classification",
  title: l,
  prompt: n,
  instructions: r,
  items: a,
  categories: i,
  feedback: s,
  formative: d = !0,
  retry: o = !0,
  shuffle: h = !1,
  maxAttempts: g,
  initialAssignments: v = {},
  onResult: y
}) {
  const u = X(() => ee(a, h), [a, h]), [N, k] = I({ ...v }), [S, b] = I(null), [T, R] = I(0), [M, K] = I(!1), [D, x] = I("neutral"), [E, B] = I(""), j = Object.fromEntries(
    a.filter((p) => p.correctCategoryId).map((p) => [p.id, p.correctCategoryId])
  ), A = !!(d && Object.keys(j).length), L = M, q = M && o && (typeof g != "number" || T < g), Y = u.filter((p) => !N[p.id]), m = u.find((p) => p.id === S);
  function _(p) {
    y == null || y(p);
  }
  function P(p, f) {
    k((C) => ({ ...C, [p]: f })), b(null);
  }
  function O(p) {
    b((f) => f === p ? null : p);
  }
  function U(p) {
    S && P(S, p);
  }
  function z(p) {
    k((f) => {
      const C = { ...f };
      return delete C[p], C;
    }), b(null);
  }
  function w() {
    if (!a.every(($) => N[$.id])) {
      x("informative"), B("Place every item in a category before checking.");
      return;
    }
    const f = T + 1, C = A ? a.filter(($) => N[$.id] === j[$.id]).length : 0, F = A ? C === a.length : null;
    R(f), K(!0), x(F === !0 ? "correct" : F === !1 ? "incorrect" : "informative"), B(A ? F ? (s == null ? void 0 : s.correct) || "Those items match the expected categories." : (s == null ? void 0 : s.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), _({
      completed: !0,
      correct: F,
      score: A ? { correct: C, total: a.length } : void 0,
      attempts: f,
      responses: { ...N }
    });
  }
  function H() {
    k({}), b(null), K(!1), x("neutral"), B(""), _({ completed: !1, correct: null, attempts: T, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "classification", "data-lp-block-id": e, children: [
    l ? /* @__PURE__ */ t("h3", { children: l }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: m ? `Selected: ${J(m)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: L, children: [
      /* @__PURE__ */ t("legend", { children: n }),
      /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        Y.map((p) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": S === p.id,
            onClick: () => O(p.id),
            children: [
              J(p),
              S === p.id ? " (selected)" : ""
            ]
          },
          p.id
        )),
        Y.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((p) => {
        const f = u.filter((C) => N[C.id] === p.id);
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: p.label }) }),
          /* @__PURE__ */ t("ul", { className: "lp-activity-list", children: f.map((C) => {
            const F = M && A ? j[C.id] === p.id ? "Correct" : "Incorrect" : "Placed";
            return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                onClick: () => z(C.id),
                children: [
                  J(C),
                  " · ",
                  F,
                  L ? "" : " · Return"
                ]
              }
            ) }, C.id);
          }) }),
          f.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "No items yet" }) : null,
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "lp-button",
              disabled: !S,
              onClick: () => U(p.id),
              children: [
                "Place in ",
                J(p)
              ]
            }
          )
        ] }, p.id);
      }) }),
      /* @__PURE__ */ c("details", { children: [
        /* @__PURE__ */ t("summary", { children: "Use dropdown lists instead" }),
        u.map((p) => /* @__PURE__ */ c("p", { className: "lp-form__field", children: [
          /* @__PURE__ */ t("label", { htmlFor: `${e}-${p.id}`, children: J(p) }),
          /* @__PURE__ */ c(
            "select",
            {
              id: `${e}-${p.id}`,
              "data-lp-item": p.id,
              value: N[p.id] || "",
              disabled: L,
              onChange: (f) => {
                const C = f.target.value;
                k((F) => {
                  const $ = { ...F };
                  return C ? $[p.id] = C : delete $[p.id], $;
                }), b(null);
              },
              children: [
                /* @__PURE__ */ t("option", { value: "", children: "Select a category" }),
                i.map((f) => /* @__PURE__ */ t("option", { value: f.id, children: f.label }, f.id))
              ]
            }
          )
        ] }, `list-${p.id}`))
      ] })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: w, disabled: L, children: "Check types" }),
      q ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: H, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: D, message: E })
  ] });
}
function ce() {
  const [e, l] = I({}), [n, r] = I(null), a = te((o, h = e) => Object.keys(h).find((g) => h[g] === o) || null, [e]), i = te((o) => {
    r((h) => h === o ? null : o);
  }, []), s = te((o) => {
    if (!n) {
      const g = a(o);
      g && r(g);
      return;
    }
    const h = n;
    l((g) => {
      const v = { ...g }, y = Object.keys(v).find((u) => v[u] === o);
      return y && delete v[y], v[h] = o, v;
    }), r(null);
  }, [a, n]), d = te(() => {
    l({}), r(null);
  }, []);
  return { placements: e, selectedItemId: n, selectItem: i, selectTarget: s, occupantOf: a, reset: d };
}
function qe({
  id: e = "drag-drop",
  title: l,
  prompt: n,
  instructions: r,
  items: a,
  targets: i,
  correct: s = {},
  feedback: d,
  formative: o = !0,
  retry: h = !0,
  shuffle: g = !1,
  maxAttempts: v,
  onResult: y
}) {
  var z;
  const u = X(() => ee(a, g), [a, g]), { placements: N, selectedItemId: k, selectItem: S, selectTarget: b, occupantOf: T, reset: R } = ce(), [M, K] = I(0), [D, x] = I(!1), [E, B] = I("neutral"), [j, A] = I(""), L = !!(o && Object.keys(s).length), q = D, Y = D && h && (typeof v != "number" || M < v), m = u.filter((w) => !N[w.id]), _ = (z = u.find((w) => w.id === k)) == null ? void 0 : z.label;
  function P(w) {
    y == null || y(w);
  }
  function O() {
    if (!a.every((C) => N[C.id])) {
      B("informative"), A("Place every item before checking.");
      return;
    }
    const H = M + 1, p = L ? a.filter((C) => N[C.id] === s[C.id]).length : 0, f = L ? p === a.length : null;
    K(H), x(!0), B(f === !0 ? "correct" : f === !1 ? "incorrect" : "informative"), A(L ? f ? (d == null ? void 0 : d.correct) || "Those placements match the expected targets." : (d == null ? void 0 : d.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), P({
      completed: !0,
      correct: f,
      score: L ? { correct: p, total: a.length } : void 0,
      attempts: H,
      responses: { ...N }
    });
  }
  function U() {
    R(), x(!1), B("neutral"), A(""), P({ completed: !1, correct: null, attempts: M, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "drag-drop", "data-lp-block-id": e, children: [
    l ? /* @__PURE__ */ t("h3", { children: l }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { children: n }),
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: _ ? `Selected: ${_}. Choose a target.` : "Select an item, then select a target to place it." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: q, children: [
      /* @__PURE__ */ t("legend", { children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        m.map((w) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": k === w.id,
            onClick: () => S(w.id),
            children: [
              w.label,
              k === w.id ? " (selected)" : ""
            ]
          },
          w.id
        )),
        m.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] })
    ] }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: q, children: [
      /* @__PURE__ */ t("legend", { children: "Targets" }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((w) => {
        const H = T(w.id), p = a.find((C) => C.id === H), f = D && L && H ? s[H] === w.id ? "Correct" : "Incorrect" : p ? "Placed" : "Empty";
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: w.label }) }),
          /* @__PURE__ */ c("p", { className: "lp-card__meta", children: [
            p ? p.label : "No item yet",
            " · ",
            f
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button",
              onClick: () => b(w.id),
              children: p ? `Place on ${w.label} (replace ${p.label})` : `Place on ${w.label}`
            }
          )
        ] }, w.id);
      }) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: O, disabled: q, children: "Check placement" }),
      Y ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: U, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: E, message: j })
  ] });
}
function Ke({
  id: e = "option-cards",
  title: l,
  prompt: n,
  instructions: r,
  options: a,
  correctOptionId: i,
  feedback: s,
  formative: d = !0,
  retry: o = !0,
  shuffle: h = !1,
  maxAttempts: g,
  initialSelectedId: v,
  onResult: y
}) {
  const u = X(() => ee(a, h), [a, h]), [N, k] = I(v || null), [S, b] = I(0), [T, R] = I(!1), [M, K] = I("neutral"), [D, x] = I(""), E = !!(d && i), B = `lp-option-cards-${e}`, j = T, A = T && o && (typeof g != "number" || S < g);
  function L(m) {
    y == null || y(m);
  }
  function q() {
    if (!N) {
      K("informative"), x("Choose an option before checking.");
      return;
    }
    const m = S + 1, _ = E ? N === i : null, P = E ? _ ? (s == null ? void 0 : s.correct) || "That matches the expected option." : (s == null ? void 0 : s.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    b(m), R(!0), K(_ === !0 ? "correct" : _ === !1 ? "incorrect" : "informative"), x(P), L({
      completed: !0,
      correct: _,
      score: E ? { correct: _ ? 1 : 0, total: 1 } : void 0,
      attempts: m,
      responses: { optionId: N }
    });
  }
  function Y() {
    k(null), R(!1), K("neutral"), x(""), L({
      completed: !1,
      correct: null,
      attempts: S,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "option-cards", "data-lp-block-id": e, children: [
    l ? /* @__PURE__ */ t("h3", { children: l }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: j, children: [
      /* @__PURE__ */ t("legend", { children: n }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: u.map((m) => {
        const _ = N === m.id, O = T && E && _ ? m.id === i ? "Correct" : "Incorrect" : _ ? "Selected" : "";
        return /* @__PURE__ */ c("label", { className: "lp-card lp-activity-card", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "radio",
              name: B,
              value: m.id,
              checked: _,
              "data-lp-response": "",
              onChange: () => k(m.id)
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
          O ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: O }) : null
        ] }, m.id);
      }) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: q, disabled: j, children: "Check answer" }),
      A ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: M, message: D })
  ] });
}
function Ye(e, l) {
  var d;
  const n = [], r = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let a = 0, i = 0, s;
  for (; (s = r.exec(e)) !== null; ) {
    s.index > a && n.push(e.slice(a, s.index));
    const o = s[1] || ((d = l[i]) == null ? void 0 : d.id) || `gap-${i + 1}`;
    i += 1, n.push({ gapId: o }), a = s.index + s[0].length;
  }
  return a < e.length && n.push(e.slice(a)), !n.some((o) => typeof o != "string") && l[0] && (n.push(" "), n.push({ gapId: l[0].id })), n;
}
function Ue({
  id: e = "phrase-completion",
  title: l,
  prompt: n,
  instructions: r,
  gaps: a,
  options: i,
  correctOptionId: s,
  feedback: d,
  formative: o = !0,
  retry: h = !0,
  shuffle: g = !1,
  maxAttempts: v,
  onResult: y
}) {
  var p;
  const u = X(() => a && a.length ? a : [{ id: "gap", label: "missing term", correctOptionId: s || void 0 }], [s, a]), N = X(() => ee(i, g), [i, g]), k = X(() => Ye(n, u), [n, u]), { placements: S, selectedItemId: b, selectItem: T, selectTarget: R, occupantOf: M, reset: K } = ce(), [D, x] = I(0), [E, B] = I(!1), [j, A] = I("neutral"), [L, q] = I(""), Y = Object.fromEntries(
    u.map((f) => [f.id, f.correctOptionId]).filter((f) => f[1])
  ), m = !!(o && Object.keys(Y).length), _ = E, P = E && h && (typeof v != "number" || D < v), O = N.filter((f) => !S[f.id]), U = (p = i.find((f) => f.id === b)) == null ? void 0 : p.label;
  function z(f) {
    y == null || y(f);
  }
  function w() {
    if (!u.every((G) => M(G.id))) {
      A("informative"), q("Fill every blank before checking.");
      return;
    }
    const C = D + 1, F = {};
    u.forEach((G) => {
      const Z = M(G.id);
      Z && (F[G.id] = Z);
    });
    const $ = m ? u.filter((G) => F[G.id] === Y[G.id]).length : 0, V = m ? $ === u.length : null;
    x(C), B(!0), A(V === !0 ? "correct" : V === !1 ? "incorrect" : "informative"), q(m ? V ? (d == null ? void 0 : d.correct) || "That completes the phrase." : (d == null ? void 0 : d.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), z({
      completed: !0,
      correct: V,
      score: m ? { correct: $, total: u.length } : void 0,
      attempts: C,
      responses: F
    });
  }
  function H() {
    K(), B(!1), A("neutral"), q(""), z({ completed: !1, correct: null, attempts: D, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "fill-gap", "data-lp-block-id": e, children: [
    l ? /* @__PURE__ */ t("h3", { children: l }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: U ? `Selected: ${U}. Choose a blank.` : "Select a phrase, then select the blank." }),
    /* @__PURE__ */ t("p", { children: k.map((f, C) => {
      if (typeof f == "string") return /* @__PURE__ */ t("span", { children: f }, `text-${C}`);
      const F = M(f.gapId), $ = i.find((Z) => Z.id === F), V = u.find((Z) => Z.id === f.gapId), G = E && m && F ? Y[f.gapId] === F ? "Correct" : "Incorrect" : $ ? "Filled" : "Blank";
      return /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "lp-button lp-button--secondary",
          disabled: _,
          "aria-label": `${(V == null ? void 0 : V.label) || "blank"}: ${($ == null ? void 0 : $.label) || "empty"}. ${G}`,
          onClick: () => R(f.gapId),
          children: ($ == null ? void 0 : $.label) || "______"
        },
        f.gapId
      );
    }) }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: _, children: [
      /* @__PURE__ */ t("legend", { children: "Available phrases" }),
      /* @__PURE__ */ t("div", { className: "lp-card__actions", children: O.map((f) => /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: "lp-button",
          "aria-pressed": b === f.id,
          onClick: () => T(f.id),
          children: [
            f.label,
            b === f.id ? " (selected)" : ""
          ]
        },
        f.id
      )) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: w, disabled: _, children: "Check phrase" }),
      P ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: H, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: j, message: L })
  ] });
}
function Re({
  id: e = "sequence",
  title: l,
  prompt: n,
  instructions: r,
  items: a,
  correctOrder: i = [],
  feedback: s,
  formative: d = !0,
  retry: o = !0,
  shuffle: h = !1,
  maxAttempts: g,
  onResult: v
}) {
  const y = X(() => ee(a, h), [a, h]), [u, N] = I(y), [k, S] = I(0), [b, T] = I(!1), [R, M] = I("neutral"), [K, D] = I(""), x = !!(d && i.length), E = b, B = b && o && (typeof g != "number" || k < g);
  function j(m) {
    v == null || v(m);
  }
  function A(m, _) {
    const P = m + _;
    if (P < 0 || P >= u.length) return;
    const O = u.slice(), [U] = O.splice(m, 1);
    O.splice(P, 0, U), N(O);
  }
  function L(m, _) {
    E || (m.key === "ArrowUp" && (m.preventDefault(), A(_, -1)), m.key === "ArrowDown" && (m.preventDefault(), A(_, 1)));
  }
  function q() {
    const m = k + 1, _ = u.map((U) => U.id), P = x ? _.filter((U, z) => U === i[z]).length : 0, O = x ? P === i.length && _.length === i.length : null;
    S(m), T(!0), M(O === !0 ? "correct" : O === !1 ? "incorrect" : "informative"), D(x ? O ? (s == null ? void 0 : s.correct) || "That order matches the expected sequence." : (s == null ? void 0 : s.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), j({
      completed: !0,
      correct: O,
      score: x ? { correct: P, total: i.length } : void 0,
      attempts: m,
      responses: { itemIds: _ }
    });
  }
  function Y() {
    N(y), T(!1), M("neutral"), D(""), j({
      completed: !1,
      correct: null,
      attempts: k,
      responses: { itemIds: y.map((m) => m.id) }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "ordering", "data-lp-block-id": e, children: [
    l ? /* @__PURE__ */ t("h3", { children: l }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { children: n }),
    /* @__PURE__ */ t("ol", { className: "lp-activity-list", children: u.map((m, _) => /* @__PURE__ */ c(
      "li",
      {
        className: "lp-card",
        tabIndex: E ? -1 : 0,
        "aria-label": `${m.label}, position ${_ + 1} of ${u.length}`,
        onKeyDown: (P) => L(P, _),
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
                disabled: E || _ === 0,
                onClick: () => A(_, -1),
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
                disabled: E || _ === u.length - 1,
                onClick: () => A(_, 1),
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
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: q, disabled: E, children: "Check order" }),
      B ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(W, { state: R, message: K })
  ] });
}
function Q(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function He(e) {
  var l;
  return (e == null ? void 0 : e.formative) === !0 || ((l = e == null ? void 0 : e.marking) == null ? void 0 : l.mode) === "formative-local";
}
function ze(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function Ge(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const Ve = [
  "single-choice",
  "option-cards",
  "classification",
  "drag-drop",
  "fill-gap",
  "phrase-completion",
  "ordering",
  "sequence"
];
function Xe(e) {
  return Ve.includes(Q(e));
}
function Ze(e) {
  var l;
  return ((l = e.content) == null ? void 0 : l.questionId) || e.id;
}
function Je(e) {
  const l = e.content || {};
  return {
    id: e.id,
    instructions: l.instructions,
    feedback: l.feedback,
    formative: He(l),
    retry: ze(l),
    shuffle: Ge(l),
    maxAttempts: l.maxAttempts
  };
}
function Qe({ block: e, initialResponse: l, onResult: n }) {
  const r = Q(e.type), a = e.content || {}, i = Q(a.presentation), s = Je(e), d = (o) => n == null ? void 0 : n(o, e);
  if (r === "single-choice" || r === "option-cards" || i === "option-cards" || i === "true-false" || i === "picture-quiz")
    return /* @__PURE__ */ t(
      Ke,
      {
        ...s,
        prompt: a.prompt || "Choose an option",
        options: a.options || [],
        correctOptionId: a.correctOptionId,
        initialSelectedId: typeof l == "string" ? l : void 0,
        onResult: d
      }
    );
  if (r === "classification") {
    const o = l && typeof l == "object" && !Array.isArray(l) ? l : void 0;
    return /* @__PURE__ */ t(
      je,
      {
        ...s,
        prompt: a.prompt || "Classify each item",
        items: a.items || [],
        categories: a.categories || [],
        initialAssignments: o,
        onResult: d
      }
    );
  }
  return r === "drag-drop" ? /* @__PURE__ */ t(
    qe,
    {
      ...s,
      prompt: a.prompt || "Place each item",
      items: a.items || [],
      targets: a.targets || [],
      correct: a.correct,
      onResult: d
    }
  ) : r === "fill-gap" || r === "phrase-completion" ? /* @__PURE__ */ t(
    Ue,
    {
      ...s,
      prompt: a.prompt || "Complete the phrase",
      gaps: a.gaps,
      options: a.options || [],
      correctOptionId: a.correctOptionId,
      onResult: d
    }
  ) : r === "ordering" || r === "sequence" ? /* @__PURE__ */ t(
    Re,
    {
      ...s,
      prompt: a.prompt || "Put the items in order",
      items: a.items || [],
      correctOrder: a.correctOrder,
      onResult: d
    }
  ) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": r, children: [
    "This ",
    r || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function gt({
  activity: e,
  initialResponses: l = {},
  renderFallback: n,
  onResult: r
}) {
  var s, d;
  const [a, i] = I(0);
  return /* @__PURE__ */ c(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": e.version || "0.1.0",
      children: [
        (s = e.metadata) != null && s.title ? /* @__PURE__ */ t("h3", { children: e.metadata.title }) : null,
        (d = e.metadata) != null && d.summary ? /* @__PURE__ */ t("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ t("div", { className: "lp-activity-list", children: (e.blocks || []).map((o) => Xe(o.type) ? /* @__PURE__ */ t(
          Qe,
          {
            block: o,
            initialResponse: l[Ze(o)],
            onResult: r
          },
          o.id
        ) : n ? /* @__PURE__ */ t("div", { children: n(o) }, o.id) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": Q(o.type), children: [
          "This ",
          Q(o.type) || "unknown",
          " block is not part of the React activity catalogue yet."
        ] }, o.id)) }, a),
        /* @__PURE__ */ c("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => i((o) => o + 1),
              children: "Reset activity"
            }
          ),
          /* @__PURE__ */ t("p", { className: "lp-activity-status", "data-lp-activity-status": !0, role: "status", "aria-live": "polite" })
        ] })
      ]
    }
  );
}
function We(e, l) {
  return typeof l == "number" && Number.isFinite(l) ? Math.min(1, Math.max(0, l)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function ie({
  title: e,
  badge: l,
  subtitle: n,
  score: r,
  progress: a,
  completed: i = !0,
  attempts: s,
  message: d,
  showStatus: o = !0,
  showDisclaimer: h = !0,
  collapsed: g = !1
}) {
  const v = l || n, y = We(r, a), u = Math.round(y * 100), N = i ? "Completed" : "In progress", k = r ? `${r.correct} / ${r.total}` : null, S = r ? `${r.correct} of ${r.total} correct` : null, b = typeof s == "number" ? `${s} ${s === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ c(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": g ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ t("strong", { children: e }) }) : null,
        o ? /* @__PURE__ */ t(ae, { status: i ? "completed" : "progress", label: N }) : null,
        k ? /* @__PURE__ */ t(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": S || void 0,
            children: k
          }
        ) : null,
        S ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: S }) : null,
        !g && v ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ t("strong", { children: v }) }) : null,
        g ? null : /* @__PURE__ */ c(oe, { children: [
          /* @__PURE__ */ t(
            "progress",
            {
              className: "lp-progress",
              max: 100,
              value: u,
              "aria-label": `${u}% complete`
            }
          ),
          /* @__PURE__ */ c("p", { className: "lp-card__meta", children: [
            u,
            "% complete"
          ] }),
          b ? /* @__PURE__ */ t("p", { children: b }) : null,
          d ? /* @__PURE__ */ t("p", { children: d }) : null,
          h ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function et(e, l) {
  if (e)
    try {
      l && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !l && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      l ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function yt({
  open: e = !1,
  title: l = "Activity complete",
  completed: n = !0,
  score: r,
  badge: a,
  subtitle: i,
  progress: s,
  attempts: d,
  message: o,
  onClose: h,
  onReview: g,
  onNext: v,
  nextLabel: y = "Continue",
  reviewLabel: u = "Review"
}) {
  const N = de(null), k = ne();
  return re(() => {
    et(N.current, e);
  }, [e]), e ? /* @__PURE__ */ c(
    "dialog",
    {
      ref: N,
      className: "lp-dialog",
      "aria-labelledby": k,
      onCancel: (S) => {
        S.preventDefault(), h == null || h();
      },
      children: [
        /* @__PURE__ */ c("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ t("h2", { id: k, children: l }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${l}`,
              onClick: h,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ t(
            ie,
            {
              completed: n,
              score: r,
              badge: a,
              subtitle: i,
              progress: s,
              attempts: d,
              message: o
            }
          ),
          /* @__PURE__ */ c("div", { className: "lp-form__actions", children: [
            g ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: g, children: u }) : null,
            v ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: v, children: y }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const tt = (e) => ({
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
function vt({
  collapsed: e,
  defaultCollapsed: l = !0,
  onCollapsedChange: n,
  expandLabel: r = "Show progress details",
  collapseLabel: a = "Hide progress details",
  ...i
}) {
  const [s, d] = I(l), o = typeof e == "boolean" ? e : s, h = ne(), g = i.title || "Practice progress";
  function v(y) {
    typeof e != "boolean" && d(y), n == null || n(y);
  }
  return /* @__PURE__ */ c(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: tt(o),
      "aria-label": g,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": o ? "true" : "false",
      children: [
        /* @__PURE__ */ t("div", { id: h, children: /* @__PURE__ */ t(ie, { ...i, title: g, collapsed: o }) }),
        /* @__PURE__ */ t("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !o,
            "aria-controls": h,
            onClick: () => v(!o),
            children: o ? r : a
          }
        ) })
      ]
    }
  );
}
const lt = {
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
}, nt = {
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
}, at = {
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
}, rt = {
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
}, st = {
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
}, ct = {
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
}, Nt = [
  lt,
  nt,
  at,
  rt,
  st,
  ct
];
export {
  Qe as ActivityBlock,
  ke as ActivityCard,
  Ie as Breadcrumbs,
  pe as CONTEXT_TYPES,
  we as Callout,
  je as Classification,
  yt as CompletionModal,
  Te as ContextPanel,
  qe as DragDrop,
  Ae as EmptyState,
  ut as ErrorState,
  De as FEEDBACK_STATES,
  W as FeedbackPanel,
  ht as HubShell,
  gt as InteractiveActivity,
  dt as LEARNER_ACTIVITY_STATES,
  mt as LearnerHeader,
  Ee as LearningOutcomeBadge,
  ft as LoadingState,
  $e as Navigation,
  Ke as OptionCards,
  Ue as PhraseCompletion,
  vt as PracticeProgressPanel,
  Pe as ProgressCard,
  ie as ProgressSummary,
  ue as SESSION_KINDS,
  le as SESSION_KIND_LABELS,
  pt as STATUS_TONES,
  Re as Sequence,
  xe as SessionSection,
  ae as StatusBadge,
  he as WEEK_UI_FEATURES,
  Le as WeekHeader,
  Oe as WeekNavigation,
  bt as WeekView,
  _e as activityActionLabel,
  Nt as demoCatalogueActivities,
  ct as demoClassification,
  at as demoDragDrop,
  lt as demoOptionCards,
  rt as demoPhraseCompletion,
  st as demoSequence,
  nt as demoTrueFalse,
  Xe as isCatalogueReactType,
  be as isIndependentKind,
  ge as isSessionKind,
  me as mergeWeekUiFeatures,
  Q as normaliseActivityType,
  Ze as questionIdFor,
  We as resolveProgressFraction,
  fe as shouldShowContext,
  se as statusLabel,
  Ne as statusTone
};
//# sourceMappingURL=index.js.map
