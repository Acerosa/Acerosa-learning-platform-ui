import { jsxs as c, jsx as t, Fragment as ue } from "react/jsx-runtime";
import { useId as ne, useState as k, useEffect as se, useMemo as X, useCallback as te, useRef as he } from "react";
const me = ["exam", "assignment", "project"], fe = [
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
}, Nt = ["not-started", "in-progress", "completed"], _t = ["available", "planned", "progress", "completed"], be = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function ge(e = {}) {
  return { ...be, ...e };
}
function ye(e, n) {
  return n ? n === "assignment" ? e.showAssignmentContext !== !1 : n === "exam" ? e.showExamContext !== !1 : n === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function ve(e) {
  return e === "independent-study" || e === "homework";
}
function Ne(e) {
  return fe.includes(e);
}
const _e = {
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
function ke(e) {
  return _e[e || ""] || "planned";
}
function ce(e, n = "") {
  return Ce[e || ""] || n || String(e || "Planned");
}
function Ie(e, n = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : n;
}
function re({
  status: e = "planned",
  label: n,
  marker: r = !0
}) {
  const a = ke(e);
  return /* @__PURE__ */ c("span", { className: `lp-status-badge lp-status-badge--${a}`, role: "status", children: [
    r ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "● " }) : null,
    n || ce(e)
  ] });
}
function we({
  title: e = "Untitled activity",
  description: n = "",
  activityType: r = "Activity",
  duration: a = "",
  status: l = "Not started",
  state: i,
  href: s,
  actionLabel: o,
  badge: d = !1,
  badgeStatus: m,
  headingLevel: g = 2,
  muted: y = !1
}) {
  const v = g === 3 ? "h3" : "h2", p = [r, a].filter(Boolean), C = i ? ce(i, l) : l;
  return /* @__PURE__ */ c("article", { className: y ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": i || void 0, children: [
    d ? /* @__PURE__ */ t(
      re,
      {
        status: m || i || "planned",
        label: typeof l == "string" && l !== "Not started" ? l : void 0
      }
    ) : null,
    p.length ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: p.join(" · ") }) : null,
    /* @__PURE__ */ t(v, { children: e }),
    n ? /* @__PURE__ */ t("p", { children: n }) : null,
    /* @__PURE__ */ t("p", { className: "lp-card__meta", children: `Status: ${C}` }),
    s ? /* @__PURE__ */ t("div", { className: "lp-card__actions", children: /* @__PURE__ */ t("a", { className: "lp-button", href: s, children: o || Ie(i) }) }) : null
  ] });
}
function Se(e, n) {
  return e.href ? e.href : e.path != null && n ? n(e.path) : e.path || void 0;
}
function Te({ items: e = [], resolveHref: n }) {
  return e.length ? /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ t("ol", { className: "lp-breadcrumbs__list", children: e.map((r, a) => {
    const l = a === e.length - 1, i = Se(r, n);
    return /* @__PURE__ */ t("li", { children: l || !i ? /* @__PURE__ */ t("span", { "aria-current": "page", children: r.label }) : /* @__PURE__ */ t("a", { href: i, children: r.label }) }, `${r.label}-${a}`);
  }) }) }) : /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const Ae = ["info", "success", "warning", "error"];
function $e({ tone: e = "info", title: n, message: r }) {
  const a = Ae.includes(e) ? e : "info";
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
function xe({
  contextType: e = "assignment",
  heading: n = "Context",
  items: r = [],
  description: a = "",
  action: l
}) {
  const i = me.includes(e) ? e : "assignment", s = `lp-context-${i}`;
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
function Ee({
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
function Pe({
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
  const m = ne(), g = d || `lp-navigation-list-${m}`, [y, v] = k(!1), p = new Set([n, ...r].filter(Boolean)), C = e.find((h) => h.id === "home" && h.enabled !== !1), I = e.filter((h) => h.enabled !== !1);
  se(() => {
    function h(S) {
      S.key === "Escape" && v(!1);
    }
    return document.addEventListener("keydown", h), () => document.removeEventListener("keydown", h);
  }, []);
  function w(h) {
    if (h.key === "Escape") {
      v(!1);
      const S = h.currentTarget.querySelector(".lp-navigation__toggle");
      S == null || S.focus();
    }
  }
  return /* @__PURE__ */ t("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: w, children: /* @__PURE__ */ c("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ c("a", { className: "lp-navigation__brand", href: i || (C == null ? void 0 : C.path) || "./", children: [
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
        onClick: () => v((h) => !h),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ t(
      "ul",
      {
        className: "lp-navigation__list",
        id: g,
        "data-open": y ? "true" : "false",
        children: I.map((h) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
          "a",
          {
            className: "lp-navigation__link",
            href: h.path,
            "aria-current": p.has(h.id) ? "page" : void 0,
            onClick: () => v(!1),
            children: h.label
          }
        ) }, h.id))
      }
    ),
    s ? /* @__PURE__ */ c("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ t(
        "select",
        {
          "aria-label": "Theme preference",
          value: s.preference,
          onChange: (h) => s.onChange(h.target.value),
          children: s.modes.map((h) => /* @__PURE__ */ t("option", { value: h, children: h[0].toUpperCase() + h.slice(1) }, h))
        }
      )
    ] }) : null,
    o ? /* @__PURE__ */ t("div", { className: "lp-navigation__actions", children: o }) : null
  ] }) });
}
function kt({
  brandTitle: e,
  brandTagline: n,
  navigation: r,
  currentId: a = "home",
  currentIds: l = [],
  theme: i = null,
  actions: s,
  breadcrumbs: o,
  resolveHref: d,
  pageHeader: m,
  footer: g,
  learnerHeader: y,
  notice: v,
  skipLabel: p = "Skip to main content",
  mainId: C = "main-content",
  children: I
}) {
  const w = g && typeof g == "object" && "lines" in g ? g.lines.map((h) => /* @__PURE__ */ t("p", { children: h }, h)) : g;
  return /* @__PURE__ */ c("div", { className: "lp-shell", children: [
    /* @__PURE__ */ t("a", { className: "lp-skip-link skip-link", href: `#${C}`, children: p }),
    /* @__PURE__ */ t("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ t(
      Pe,
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
    o ? /* @__PURE__ */ t(Te, { items: o, resolveHref: d }) : null,
    m != null && m.title ? /* @__PURE__ */ c("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ t("h1", { children: m.title }),
      m.subtitle ? /* @__PURE__ */ t("p", { className: "lp-page-header__subtitle", children: m.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ t("main", { id: C, className: "lp-shell__main site-main", tabIndex: -1, children: I }),
    /* @__PURE__ */ t("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: w })
  ] });
}
function It({
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
function Me({ id: e, title: n }) {
  const r = [e, n].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ t("span", { className: "lp-outcome-badge", children: r });
}
function wt({ message: e = "Loading…" }) {
  return /* @__PURE__ */ c("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ t("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { children: e })
  ] });
}
function Le({
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
function Oe({
  id: e,
  title: n,
  kind: r = "session",
  summary: a = "",
  defaultOpen: l = !1,
  meta: i,
  children: s
}) {
  const o = Ne(r) ? r : "session", d = le[o];
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
function De({
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
    l.length ? /* @__PURE__ */ t("ul", { className: "lp-week-header__outcomes", children: l.map((m) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(Me, { id: m.id, title: m.title }) }, m.id || m.title)) }) : null
  ] });
}
function Fe({ previousWeek: e, nextWeek: n }) {
  return !(e != null && e.href) && !(n != null && n.href) ? null : /* @__PURE__ */ t("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ c("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    n != null && n.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: n.href, rel: "next", children: n.label || "Next week" }) }) : null
  ] }) });
}
function Re(e) {
  if (e.meta) return e.meta;
  const n = (e.activities || []).length, r = `${n} ${n === 1 ? "activity" : "activities"}`, a = le[e.kind || "session"] || le.session;
  return e.kind && e.kind !== "session" ? `${a} · ${r}` : r;
}
function Be(e, n) {
  return "html" in e && e.html ? /* @__PURE__ */ t(
    "div",
    {
      className: "lp-activity-html",
      dangerouslySetInnerHTML: { __html: e.html }
    },
    n
  ) : "children" in e && e.children ? /* @__PURE__ */ t("div", { children: e.children }, n) : /* @__PURE__ */ t(we, { ...e }, n);
}
function St({
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
  const m = ge(o), g = (r == null ? void 0 : r.type) || (r == null ? void 0 : r.contextType), y = a.filter((p) => !(m.showIndependentStudy === !1 && ve(p.kind))), v = d || Be;
  return /* @__PURE__ */ c("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ t(
      De,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: m.showLearningOutcomes ? n : [],
        headingLevel: e.headingLevel || 1,
        showTitle: m.showTitle !== !1
      }
    ),
    r && ye(m, g) ? /* @__PURE__ */ t(
      xe,
      {
        contextType: g,
        heading: r.heading,
        items: r.items,
        description: r.description,
        action: r.action
      }
    ) : null,
    y.length ? y.map((p) => /* @__PURE__ */ t(
      Oe,
      {
        id: p.id,
        title: p.title,
        kind: p.kind,
        summary: p.summary,
        defaultOpen: p.defaultOpen,
        meta: Re(p),
        children: (p.activities || []).map((C, I) => v(C, I))
      },
      p.id || p.title
    )) : /* @__PURE__ */ t(
      Ee,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    m.showProgress && l ? /* @__PURE__ */ t(Le, { ...l }) : null,
    /* @__PURE__ */ t(Fe, { previousWeek: i, nextWeek: s })
  ] });
}
const je = ["neutral", "correct", "incorrect", "informative", "hint"], Ue = {
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
  const a = je.includes(e) ? e : "neutral", l = Ue[a];
  return !r && !n ? null : /* @__PURE__ */ t("div", { className: "lp-feedback", "data-lp-feedback-state": a, "data-lp-feedback": !0, children: /* @__PURE__ */ t($e, { tone: l.tone, title: n || l.label, message: r }) });
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
function Ke({
  id: e = "classification",
  title: n,
  prompt: r,
  instructions: a,
  items: l,
  categories: i,
  feedback: s,
  formative: o = !0,
  retry: d = !0,
  shuffle: m = !1,
  maxAttempts: g,
  initialAssignments: y = {},
  onResult: v
}) {
  const p = X(() => ee(l, m), [l, m]), [C, I] = k({ ...y }), [w, h] = k(null), [S, q] = k(0), [L, R] = k(!1), [B, P] = k("neutral"), [$, j] = k(""), F = Object.fromEntries(
    l.filter((u) => u.correctCategoryId).map((u) => [u.id, u.correctCategoryId])
  ), A = !!(o && Object.keys(F).length), x = L, K = L && d && (typeof g != "number" || S < g), U = p.filter((u) => !C[u.id]), f = p.find((u) => u.id === w);
  function N(u) {
    v == null || v(u);
  }
  function E(u, b) {
    I((_) => ({ ..._, [u]: b })), h(null);
  }
  function M(u) {
    h((b) => b === u ? null : u);
  }
  function Y(u) {
    w && E(w, u);
  }
  function H(u) {
    I((b) => {
      const _ = { ...b };
      return delete _[u], _;
    }), h(null);
  }
  function T() {
    if (!l.every((O) => C[O.id])) {
      P("informative"), j("Place every item in a category before checking.");
      return;
    }
    const b = S + 1, _ = A ? l.filter((O) => C[O.id] === F[O.id]).length : 0, D = A ? _ === l.length : null;
    q(b), R(!0), P(D === !0 ? "correct" : D === !1 ? "incorrect" : "informative"), j(A ? D ? (s == null ? void 0 : s.correct) || "Those items match the expected categories." : (s == null ? void 0 : s.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), N({
      completed: !0,
      correct: D,
      score: A ? { correct: _, total: l.length } : void 0,
      attempts: b,
      responses: { ...C }
    });
  }
  function z() {
    I({}), h(null), R(!1), P("neutral"), j(""), N({ completed: !1, correct: null, attempts: S, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "classification", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: f ? `Selected: ${Q(f)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: x, children: [
      /* @__PURE__ */ t("legend", { children: r }),
      /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        U.map((u) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": w === u.id,
            onClick: () => M(u.id),
            children: [
              Q(u),
              w === u.id ? " (selected)" : ""
            ]
          },
          u.id
        )),
        U.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((u) => {
        const b = p.filter((_) => C[_.id] === u.id);
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: u.label }) }),
          /* @__PURE__ */ t("ul", { className: "lp-activity-list", children: b.map((_) => {
            const D = L && A ? F[_.id] === u.id ? "Correct" : "Incorrect" : "Placed";
            return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                onClick: () => H(_.id),
                children: [
                  Q(_),
                  " · ",
                  D,
                  x ? "" : " · Return"
                ]
              }
            ) }, _.id);
          }) }),
          b.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "No items yet" }) : null,
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "lp-button",
              disabled: !w,
              onClick: () => Y(u.id),
              children: [
                "Place in ",
                Q(u)
              ]
            }
          )
        ] }, u.id);
      }) }),
      /* @__PURE__ */ c("details", { children: [
        /* @__PURE__ */ t("summary", { children: "Use dropdown lists instead" }),
        p.map((u) => /* @__PURE__ */ c("p", { className: "lp-form__field", children: [
          /* @__PURE__ */ t("label", { htmlFor: `${e}-${u.id}`, children: Q(u) }),
          /* @__PURE__ */ c(
            "select",
            {
              id: `${e}-${u.id}`,
              "data-lp-item": u.id,
              value: C[u.id] || "",
              disabled: x,
              onChange: (b) => {
                const _ = b.target.value;
                I((D) => {
                  const O = { ...D };
                  return _ ? O[u.id] = _ : delete O[u.id], O;
                }), h(null);
              },
              children: [
                /* @__PURE__ */ t("option", { value: "", children: "Select a category" }),
                i.map((b) => /* @__PURE__ */ t("option", { value: b.id, children: b.label }, b.id))
              ]
            }
          )
        ] }, `list-${u.id}`))
      ] })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: T, disabled: x, children: "Check types" }),
      K ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: z, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: B, message: $ })
  ] });
}
function ie() {
  const [e, n] = k({}), [r, a] = k(null), l = te((d, m = e) => Object.keys(m).find((g) => m[g] === d) || null, [e]), i = te((d) => {
    a((m) => m === d ? null : d);
  }, []), s = te((d) => {
    if (!r) {
      const g = l(d);
      g && a(g);
      return;
    }
    const m = r;
    n((g) => {
      const y = { ...g }, v = Object.keys(y).find((p) => y[p] === d);
      return v && delete y[v], y[m] = d, y;
    }), a(null);
  }, [l, r]), o = te(() => {
    n({}), a(null);
  }, []);
  return { placements: e, selectedItemId: r, selectItem: i, selectTarget: s, occupantOf: l, reset: o };
}
function Ye({
  id: e = "drag-drop",
  title: n,
  prompt: r,
  instructions: a,
  items: l,
  targets: i,
  correct: s = {},
  feedback: o,
  formative: d = !0,
  retry: m = !0,
  shuffle: g = !1,
  maxAttempts: y,
  onResult: v
}) {
  var H;
  const p = X(() => ee(l, g), [l, g]), { placements: C, selectedItemId: I, selectItem: w, selectTarget: h, occupantOf: S, reset: q } = ie(), [L, R] = k(0), [B, P] = k(!1), [$, j] = k("neutral"), [F, A] = k(""), x = !!(d && Object.keys(s).length), K = B, U = B && m && (typeof y != "number" || L < y), f = p.filter((T) => !C[T.id]), N = (H = p.find((T) => T.id === I)) == null ? void 0 : H.label;
  function E(T) {
    v == null || v(T);
  }
  function M() {
    if (!l.every((_) => C[_.id])) {
      j("informative"), A("Place every item before checking.");
      return;
    }
    const z = L + 1, u = x ? l.filter((_) => C[_.id] === s[_.id]).length : 0, b = x ? u === l.length : null;
    R(z), P(!0), j(b === !0 ? "correct" : b === !1 ? "incorrect" : "informative"), A(x ? b ? (o == null ? void 0 : o.correct) || "Those placements match the expected targets." : (o == null ? void 0 : o.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), E({
      completed: !0,
      correct: b,
      score: x ? { correct: u, total: l.length } : void 0,
      attempts: z,
      responses: { ...C }
    });
  }
  function Y() {
    q(), P(!1), j("neutral"), A(""), E({ completed: !1, correct: null, attempts: L, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "drag-drop", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ t("p", { children: r }),
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: N ? `Selected: ${N}. Choose a target.` : "Select an item, then select a target to place it." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: K, children: [
      /* @__PURE__ */ t("legend", { children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        f.map((T) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": I === T.id,
            onClick: () => w(T.id),
            children: [
              T.label,
              I === T.id ? " (selected)" : ""
            ]
          },
          T.id
        )),
        f.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] })
    ] }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: K, children: [
      /* @__PURE__ */ t("legend", { children: "Targets" }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((T) => {
        const z = S(T.id), u = l.find((_) => _.id === z), b = B && x && z ? s[z] === T.id ? "Correct" : "Incorrect" : u ? "Placed" : "Empty";
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: T.label }) }),
          /* @__PURE__ */ c("p", { className: "lp-card__meta", children: [
            u ? u.label : "No item yet",
            " · ",
            b
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button",
              onClick: () => h(T.id),
              children: u ? `Place on ${T.label} (replace ${u.label})` : `Place on ${T.label}`
            }
          )
        ] }, T.id);
      }) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: M, disabled: K, children: "Check placement" }),
      U ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: $, message: F })
  ] });
}
function qe({
  id: e = "option-cards",
  title: n,
  prompt: r,
  instructions: a,
  options: l,
  correctOptionId: i,
  feedback: s,
  formative: o = !0,
  retry: d = !0,
  shuffle: m = !1,
  maxAttempts: g,
  initialSelectedId: y,
  onResult: v
}) {
  const p = X(() => ee(l, m), [l, m]), [C, I] = k(y || null), [w, h] = k(0), [S, q] = k(!1), [L, R] = k("neutral"), [B, P] = k(""), $ = !!(o && i), j = `lp-option-cards-${e}`, F = S, A = S && d && (typeof g != "number" || w < g);
  function x(f) {
    v == null || v(f);
  }
  function K() {
    if (!C) {
      R("informative"), P("Choose an option before checking.");
      return;
    }
    const f = w + 1, N = $ ? C === i : null, E = $ ? N ? (s == null ? void 0 : s.correct) || "That matches the expected option." : (s == null ? void 0 : s.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    h(f), q(!0), R(N === !0 ? "correct" : N === !1 ? "incorrect" : "informative"), P(E), x({
      completed: !0,
      correct: N,
      score: $ ? { correct: N ? 1 : 0, total: 1 } : void 0,
      attempts: f,
      responses: { optionId: C }
    });
  }
  function U() {
    I(null), q(!1), R("neutral"), P(""), x({
      completed: !1,
      correct: null,
      attempts: w,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "option-cards", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: F, children: [
      /* @__PURE__ */ t("legend", { children: r }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: p.map((f) => {
        const N = C === f.id, M = S && $ && N ? f.id === i ? "Correct" : "Incorrect" : N ? "Selected" : "";
        return /* @__PURE__ */ c("label", { className: "lp-card lp-activity-card", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "radio",
              name: j,
              value: f.id,
              checked: N,
              "data-lp-response": "",
              onChange: () => I(f.id)
            }
          ),
          /* @__PURE__ */ c("span", { children: [
            /* @__PURE__ */ t("strong", { children: f.label }),
            f.description ? /* @__PURE__ */ c("span", { className: "lp-card__meta", children: [
              " — ",
              f.description
            ] }) : null
          ] }),
          f.imageSrc ? /* @__PURE__ */ t("img", { src: f.imageSrc, alt: f.imageAlt || f.label }) : null,
          M ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: M }) : null
        ] }, f.id);
      }) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: K, disabled: F, children: "Check answer" }),
      A ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: U, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: L, message: B })
  ] });
}
function He(e, n) {
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
function ze({
  id: e = "phrase-completion",
  title: n,
  prompt: r,
  instructions: a,
  gaps: l,
  options: i,
  correctOptionId: s,
  feedback: o,
  formative: d = !0,
  retry: m = !0,
  shuffle: g = !1,
  maxAttempts: y,
  onResult: v
}) {
  var u;
  const p = X(() => l && l.length ? l : [{ id: "gap", label: "missing term", correctOptionId: s || void 0 }], [s, l]), C = X(() => ee(i, g), [i, g]), I = X(() => He(r, p), [r, p]), { placements: w, selectedItemId: h, selectItem: S, selectTarget: q, occupantOf: L, reset: R } = ie(), [B, P] = k(0), [$, j] = k(!1), [F, A] = k("neutral"), [x, K] = k(""), U = Object.fromEntries(
    p.map((b) => [b.id, b.correctOptionId]).filter((b) => b[1])
  ), f = !!(d && Object.keys(U).length), N = $, E = $ && m && (typeof y != "number" || B < y), M = C.filter((b) => !w[b.id]), Y = (u = i.find((b) => b.id === h)) == null ? void 0 : u.label;
  function H(b) {
    v == null || v(b);
  }
  function T() {
    if (!p.every((G) => L(G.id))) {
      A("informative"), K("Fill every blank before checking.");
      return;
    }
    const _ = B + 1, D = {};
    p.forEach((G) => {
      const Z = L(G.id);
      Z && (D[G.id] = Z);
    });
    const O = f ? p.filter((G) => D[G.id] === U[G.id]).length : 0, V = f ? O === p.length : null;
    P(_), j(!0), A(V === !0 ? "correct" : V === !1 ? "incorrect" : "informative"), K(f ? V ? (o == null ? void 0 : o.correct) || "That completes the phrase." : (o == null ? void 0 : o.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), H({
      completed: !0,
      correct: V,
      score: f ? { correct: O, total: p.length } : void 0,
      attempts: _,
      responses: D
    });
  }
  function z() {
    R(), j(!1), A("neutral"), K(""), H({ completed: !1, correct: null, attempts: B, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "fill-gap", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: Y ? `Selected: ${Y}. Choose a blank.` : "Select a phrase, then select the blank." }),
    /* @__PURE__ */ t("p", { children: I.map((b, _) => {
      if (typeof b == "string") return /* @__PURE__ */ t("span", { children: b }, `text-${_}`);
      const D = L(b.gapId), O = i.find((Z) => Z.id === D), V = p.find((Z) => Z.id === b.gapId), G = $ && f && D ? U[b.gapId] === D ? "Correct" : "Incorrect" : O ? "Filled" : "Blank";
      return /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "lp-button lp-button--secondary",
          disabled: N,
          "aria-label": `${(V == null ? void 0 : V.label) || "blank"}: ${(O == null ? void 0 : O.label) || "empty"}. ${G}`,
          onClick: () => q(b.gapId),
          children: (O == null ? void 0 : O.label) || "______"
        },
        b.gapId
      );
    }) }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: N, children: [
      /* @__PURE__ */ t("legend", { children: "Available phrases" }),
      /* @__PURE__ */ t("div", { className: "lp-card__actions", children: M.map((b) => /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          className: "lp-button",
          "aria-pressed": h === b.id,
          onClick: () => S(b.id),
          children: [
            b.label,
            h === b.id ? " (selected)" : ""
          ]
        },
        b.id
      )) })
    ] }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: T, disabled: N, children: "Check phrase" }),
      E ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: z, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: F, message: x })
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
  shuffle: m = !1,
  maxAttempts: g,
  onResult: y
}) {
  const v = X(() => ee(l, m), [l, m]), [p, C] = k(v), [I, w] = k(0), [h, S] = k(!1), [q, L] = k("neutral"), [R, B] = k(""), P = !!(o && i.length), $ = h, j = h && d && (typeof g != "number" || I < g);
  function F(f) {
    y == null || y(f);
  }
  function A(f, N) {
    const E = f + N;
    if (E < 0 || E >= p.length) return;
    const M = p.slice(), [Y] = M.splice(f, 1);
    M.splice(E, 0, Y), C(M);
  }
  function x(f, N) {
    $ || (f.key === "ArrowUp" && (f.preventDefault(), A(N, -1)), f.key === "ArrowDown" && (f.preventDefault(), A(N, 1)));
  }
  function K() {
    const f = I + 1, N = p.map((Y) => Y.id), E = P ? N.filter((Y, H) => Y === i[H]).length : 0, M = P ? E === i.length && N.length === i.length : null;
    w(f), S(!0), L(M === !0 ? "correct" : M === !1 ? "incorrect" : "informative"), B(P ? M ? (s == null ? void 0 : s.correct) || "That order matches the expected sequence." : (s == null ? void 0 : s.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), F({
      completed: !0,
      correct: M,
      score: P ? { correct: E, total: i.length } : void 0,
      attempts: f,
      responses: { itemIds: N }
    });
  }
  function U() {
    C(v), S(!1), L("neutral"), B(""), F({
      completed: !1,
      correct: null,
      attempts: I,
      responses: { itemIds: v.map((f) => f.id) }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "ordering", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
    /* @__PURE__ */ t("p", { children: r }),
    /* @__PURE__ */ t("ol", { className: "lp-activity-list", children: p.map((f, N) => /* @__PURE__ */ c(
      "li",
      {
        className: "lp-card",
        tabIndex: $ ? -1 : 0,
        "aria-label": `${f.label}, position ${N + 1} of ${p.length}`,
        onKeyDown: (E) => x(E, N),
        children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ c("strong", { children: [
            N + 1,
            ". ",
            f.label
          ] }) }),
          /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                disabled: $ || N === 0,
                onClick: () => A(N, -1),
                children: [
                  "Move ",
                  f.label,
                  " up"
                ]
              }
            ),
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                disabled: $ || N === p.length - 1,
                onClick: () => A(N, 1),
                children: [
                  "Move ",
                  f.label,
                  " down"
                ]
              }
            )
          ] })
        ]
      },
      f.id
    )) }),
    /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: K, disabled: $, children: "Check order" }),
      j ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: U, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(J, { state: q, message: R })
  ] });
}
function W(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Ve(e) {
  var n;
  return (e == null ? void 0 : e.formative) === !0 || ((n = e == null ? void 0 : e.marking) == null ? void 0 : n.mode) === "formative-local";
}
function Xe(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function Ze(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const Je = [
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
], oe = 200, Qe = 500;
function We(e, n) {
  const r = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return r > 0 ? r : n;
}
function et(e) {
  return Je.includes(W(e));
}
function tt(e) {
  var n;
  return ((n = e.content) == null ? void 0 : n.questionId) || e.id;
}
function nt(e, n) {
  return n > 0 ? `Write at least ${e} characters. You currently have ${n}.` : `Write at least ${e} characters before saving.`;
}
function de({
  id: e = "text-response",
  blockType: n = "short-response",
  title: r,
  prompt: a,
  instructions: l,
  guidance: i,
  placeholder: s,
  minChars: o,
  minimumCharacters: d,
  defaultMinChars: m = oe,
  rows: g = 4,
  feedback: y,
  retry: v = !0,
  maxAttempts: p,
  initialResponse: C = "",
  saveLabel: I = "Save response",
  onResult: w
}) {
  const h = ne(), S = We({ minChars: o, minimumCharacters: d }, m), [q, L] = k(String(C || "")), [R, B] = k(0), [P, $] = k(!1), [j, F] = k("neutral"), [A, x] = k(""), [K, U] = k(""), f = q.trim(), N = f.length, E = N >= S, M = P, Y = P && v && (typeof p != "number" || R < p);
  function H(_) {
    w == null || w(_);
  }
  function T(_) {
    _.preventDefault(), U("Paste is disabled. Type your answer in your own words.");
  }
  function z(_) {
    _.preventDefault(), U("Dropping text is disabled. Type your answer in your own words.");
  }
  function u() {
    if (!E) {
      F("informative"), x(nt(S, N));
      return;
    }
    const _ = R + 1, D = i || (y == null ? void 0 : y.correct) || "Saved.";
    B(_), $(!0), F("informative"), x(D), H({
      completed: !0,
      correct: null,
      attempts: _,
      responses: f
    });
  }
  function b() {
    L(""), $(!1), F("neutral"), x(""), U(""), H({
      completed: !1,
      correct: null,
      attempts: R,
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
        /* @__PURE__ */ c("label", { className: "lp-field", htmlFor: h, children: [
          /* @__PURE__ */ t("span", { className: "lp-field__label", children: a }),
          /* @__PURE__ */ t(
            "textarea",
            {
              id: h,
              className: "lp-textarea",
              "data-lp-response": "",
              "data-lp-min-chars": String(S),
              rows: g,
              value: q,
              placeholder: s,
              minLength: S,
              autoComplete: "off",
              disabled: M,
              "aria-describedby": `${h}-count ${h}-notice`,
              onChange: (_) => L(_.target.value),
              onPaste: T,
              onDrop: z
            }
          )
        ] }),
        /* @__PURE__ */ t(
          "p",
          {
            id: `${h}-count`,
            className: "lp-char-count",
            "data-lp-char-count": "",
            "data-lp-met": E ? "true" : "false",
            "aria-live": "polite",
            children: `${N} / ${S} characters minimum`
          }
        ),
        /* @__PURE__ */ t(
          "p",
          {
            id: `${h}-notice`,
            className: "lp-paste-notice",
            "data-lp-paste-notice": "",
            role: "status",
            children: K
          }
        ),
        /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: u, disabled: M, children: I }),
          Y ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: b, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(J, { state: j, message: A })
      ]
    }
  );
}
function lt({
  rows: e = 4,
  ...n
}) {
  return /* @__PURE__ */ t(
    de,
    {
      ...n,
      blockType: "short-response",
      defaultMinChars: oe,
      rows: e
    }
  );
}
function rt({
  rows: e = 6,
  ...n
}) {
  return /* @__PURE__ */ t(
    de,
    {
      ...n,
      blockType: "reflection",
      defaultMinChars: Qe,
      rows: e
    }
  );
}
function at(e) {
  const n = e.content || {};
  return {
    id: e.id,
    instructions: n.instructions,
    feedback: n.feedback,
    formative: Ve(n),
    retry: Xe(n),
    shuffle: Ze(n),
    maxAttempts: n.maxAttempts
  };
}
function ae(e) {
  return typeof e == "string" ? e : void 0;
}
function st({ block: e, initialResponse: n, onResult: r }) {
  const a = W(e.type), l = e.content || {}, i = W(l.presentation), s = at(e), o = (d) => r == null ? void 0 : r(d, e);
  if (a === "single-choice" || a === "option-cards" || i === "option-cards" || i === "true-false" || i === "picture-quiz")
    return /* @__PURE__ */ t(
      qe,
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
      Ke,
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
    Ye,
    {
      ...s,
      prompt: l.prompt || "Place each item",
      items: l.items || [],
      targets: l.targets || [],
      correct: l.correct,
      onResult: o
    }
  ) : a === "fill-gap" || a === "phrase-completion" ? /* @__PURE__ */ t(
    ze,
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
    lt,
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
      initialResponse: ae(n),
      onResult: o
    }
  ) : a === "reflection" ? /* @__PURE__ */ t(
    rt,
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
      initialResponse: ae(n),
      onResult: o
    }
  ) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": a, children: [
    "This ",
    a || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function Tt({
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
          st,
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
function ct(e, n) {
  return typeof n == "number" && Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function pe({
  title: e,
  badge: n,
  subtitle: r,
  score: a,
  progress: l,
  completed: i = !0,
  attempts: s,
  message: o,
  showStatus: d = !0,
  showDisclaimer: m = !0,
  collapsed: g = !1
}) {
  const y = n || r, v = ct(a, l), p = Math.round(v * 100), C = i ? "Completed" : "In progress", I = a ? `${a.correct} / ${a.total}` : null, w = a ? `${a.correct} of ${a.total} correct` : null, h = typeof s == "number" ? `${s} ${s === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ c(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": g ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ t("strong", { children: e }) }) : null,
        d ? /* @__PURE__ */ t(re, { status: i ? "completed" : "progress", label: C }) : null,
        I ? /* @__PURE__ */ t(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": w || void 0,
            children: I
          }
        ) : null,
        w ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: w }) : null,
        !g && y ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ t("strong", { children: y }) }) : null,
        g ? null : /* @__PURE__ */ c(ue, { children: [
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
          h ? /* @__PURE__ */ t("p", { children: h }) : null,
          o ? /* @__PURE__ */ t("p", { children: o }) : null,
          m ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function it(e, n) {
  if (e)
    try {
      n && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !n && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      n ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function At({
  open: e = !1,
  title: n = "Activity complete",
  completed: r = !0,
  score: a,
  badge: l,
  subtitle: i,
  progress: s,
  attempts: o,
  message: d,
  onClose: m,
  onReview: g,
  onNext: y,
  nextLabel: v = "Continue",
  reviewLabel: p = "Review"
}) {
  const C = he(null), I = ne();
  return se(() => {
    it(C.current, e);
  }, [e]), e ? /* @__PURE__ */ c(
    "dialog",
    {
      ref: C,
      className: "lp-dialog",
      "aria-labelledby": I,
      onCancel: (w) => {
        w.preventDefault(), m == null || m();
      },
      children: [
        /* @__PURE__ */ c("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ t("h2", { id: I, children: n }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${n}`,
              onClick: m,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ t(
            pe,
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
const ot = (e) => ({
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
function $t({
  collapsed: e,
  defaultCollapsed: n = !0,
  onCollapsedChange: r,
  expandLabel: a = "Show progress details",
  collapseLabel: l = "Hide progress details",
  ...i
}) {
  const [s, o] = k(n), d = typeof e == "boolean" ? e : s, m = ne(), g = i.title || "Practice progress";
  function y(v) {
    typeof e != "boolean" && o(v), r == null || r(v);
  }
  return /* @__PURE__ */ c(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: ot(d),
      "aria-label": g,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": d ? "true" : "false",
      children: [
        /* @__PURE__ */ t("div", { id: m, children: /* @__PURE__ */ t(pe, { ...i, title: g, collapsed: d }) }),
        /* @__PURE__ */ t("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !d,
            "aria-controls": m,
            onClick: () => y(!d),
            children: d ? a : l
          }
        ) })
      ]
    }
  );
}
const dt = {
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
}, pt = {
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
}, ut = {
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
}, ht = {
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
}, mt = {
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
}, ft = {
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
}, bt = {
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
}, gt = {
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
}, xt = [
  dt,
  pt,
  ut,
  ht,
  mt,
  ft,
  bt,
  gt
];
export {
  st as ActivityBlock,
  we as ActivityCard,
  Te as Breadcrumbs,
  me as CONTEXT_TYPES,
  $e as Callout,
  Ke as Classification,
  At as CompletionModal,
  xe as ContextPanel,
  Ye as DragDrop,
  Ee as EmptyState,
  Ct as ErrorState,
  je as FEEDBACK_STATES,
  J as FeedbackPanel,
  kt as HubShell,
  Tt as InteractiveActivity,
  Nt as LEARNER_ACTIVITY_STATES,
  It as LearnerHeader,
  Me as LearningOutcomeBadge,
  wt as LoadingState,
  Pe as Navigation,
  qe as OptionCards,
  ze as PhraseCompletion,
  $t as PracticeProgressPanel,
  Le as ProgressCard,
  pe as ProgressSummary,
  Qe as REFLECTION_DEFAULT_MIN_CHARS,
  rt as Reflection,
  fe as SESSION_KINDS,
  le as SESSION_KIND_LABELS,
  oe as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  _t as STATUS_TONES,
  Ge as Sequence,
  Oe as SessionSection,
  lt as ShortResponse,
  re as StatusBadge,
  de as TextResponse,
  be as WEEK_UI_FEATURES,
  De as WeekHeader,
  Fe as WeekNavigation,
  St as WeekView,
  Ie as activityActionLabel,
  xt as demoCatalogueActivities,
  ft as demoClassification,
  ut as demoDragDrop,
  dt as demoOptionCards,
  ht as demoPhraseCompletion,
  gt as demoReflection,
  mt as demoSequence,
  bt as demoShortResponse,
  pt as demoTrueFalse,
  et as isCatalogueReactType,
  ve as isIndependentKind,
  Ne as isSessionKind,
  ge as mergeWeekUiFeatures,
  W as normaliseActivityType,
  tt as questionIdFor,
  We as resolveMinChars,
  ct as resolveProgressFraction,
  ye as shouldShowContext,
  ce as statusLabel,
  ke as statusTone
};
//# sourceMappingURL=index.js.map
