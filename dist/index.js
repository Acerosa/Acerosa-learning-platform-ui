import { jsxs as c, jsx as t, Fragment as ge } from "react/jsx-runtime";
import { useId as ae, useState as k, useEffect as oe, useMemo as X, useCallback as le, useRef as ye } from "react";
import { isUnsafeAuthoredHtml as ve, resolveActivityVersion as Ne } from "@learning-platform/core";
import { isWeekAvailable as _e } from "@learning-platform/core/curriculum-runtime";
const ke = ["exam", "assignment", "project"], Ce = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], re = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, Mt = ["not-started", "in-progress", "completed"], Pt = ["available", "planned", "progress", "completed"], we = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function Ie(e = {}) {
  return { ...we, ...e };
}
function Se(e, n) {
  return n ? n === "assignment" ? e.showAssignmentContext !== !1 : n === "exam" ? e.showExamContext !== !1 : n === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function Te(e) {
  return e === "independent-study" || e === "homework";
}
function Ae(e) {
  return Ce.includes(e);
}
const $e = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, xe = {
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
function Ee(e) {
  return $e[e || ""] || "planned";
}
function de(e, n = "") {
  return xe[e || ""] || n || String(e || "Planned");
}
function Me(e, n = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : n;
}
function te({
  status: e = "planned",
  label: n,
  marker: a = !0
}) {
  const r = Ee(e);
  return /* @__PURE__ */ c("span", { className: `lp-status-badge lp-status-badge--${r}`, role: "status", children: [
    a ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "● " }) : null,
    n || de(e)
  ] });
}
function Pe({
  title: e = "Untitled activity",
  description: n = "",
  activityType: a = "Activity",
  duration: r = "",
  status: l = "Not started",
  state: i,
  href: s,
  actionLabel: d,
  badge: p = !1,
  badgeStatus: o,
  headingLevel: g = 2,
  muted: y = !1
}) {
  const v = g === 3 ? "h3" : "h2", u = [a, r].filter(Boolean), N = i ? de(i, l) : l;
  return /* @__PURE__ */ c("article", { className: y ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": i || void 0, children: [
    p ? /* @__PURE__ */ t(
      te,
      {
        status: o || i || "planned",
        label: typeof l == "string" && l !== "Not started" ? l : void 0
      }
    ) : null,
    u.length ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: u.join(" · ") }) : null,
    /* @__PURE__ */ t(v, { children: e }),
    n ? /* @__PURE__ */ t("p", { children: n }) : null,
    /* @__PURE__ */ t("p", { className: "lp-card__meta", children: `Status: ${N}` }),
    s ? /* @__PURE__ */ t("div", { className: "lp-card__actions", children: /* @__PURE__ */ t("a", { className: "lp-button", href: s, children: d || Me(i) }) }) : null
  ] });
}
function Le(e, n) {
  return e.href ? e.href : e.path != null && n ? n(e.path) : e.path || void 0;
}
function Oe({ items: e = [], resolveHref: n }) {
  return e.length ? /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ t("ol", { className: "lp-breadcrumbs__list", children: e.map((a, r) => {
    const l = r === e.length - 1, i = Le(a, n);
    return /* @__PURE__ */ t("li", { children: l || !i ? /* @__PURE__ */ t("span", { "aria-current": "page", children: a.label }) : /* @__PURE__ */ t("a", { href: i, children: a.label }) }, `${a.label}-${r}`);
  }) }) }) : /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const De = ["info", "success", "warning", "error"];
function Fe({ tone: e = "info", title: n, message: a }) {
  const r = De.includes(e) ? e : "info";
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
function Re({
  contextType: e = "assignment",
  heading: n = "Context",
  items: a = [],
  description: r = "",
  action: l
}) {
  const i = ke.includes(e) ? e : "assignment", s = `lp-context-${i}`;
  return /* @__PURE__ */ c(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${i}`,
      "aria-labelledby": s,
      "data-context-type": i,
      children: [
        /* @__PURE__ */ t("h2", { id: s, children: n }),
        a.length ? /* @__PURE__ */ t("dl", { className: "lp-meta-list", children: a.map((d) => /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ t("dt", { children: d.label }),
          /* @__PURE__ */ t("dd", { children: d.value })
        ] }, `${d.label}:${d.value}`)) }) : null,
        r ? /* @__PURE__ */ t("p", { children: r }) : null,
        l != null && l.label && (l != null && l.href) ? /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: l.href, children: l.label }) }) : null
      ]
    }
  );
}
function ue({
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
function Lt({
  heading: e = "There is a problem",
  message: n = "Try again."
}) {
  return /* @__PURE__ */ c("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: n })
  ] });
}
function Be({
  items: e,
  currentId: n = "home",
  currentIds: a = [],
  brandTitle: r,
  brandTagline: l,
  homeHref: i,
  theme: s = null,
  actions: d,
  listId: p
}) {
  const o = ae(), g = p || `lp-navigation-list-${o}`, [y, v] = k(!1), u = new Set([n, ...a].filter(Boolean)), N = e.find((f) => f.id === "home" && f.enabled !== !1), C = e.filter((f) => f.enabled !== !1);
  oe(() => {
    function f(T) {
      T.key === "Escape" && v(!1);
    }
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, []);
  function w(f) {
    if (f.key === "Escape") {
      v(!1);
      const T = f.currentTarget.querySelector(".lp-navigation__toggle");
      T == null || T.focus();
    }
  }
  return /* @__PURE__ */ t("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: w, children: /* @__PURE__ */ c("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ c("a", { className: "lp-navigation__brand", href: i || (N == null ? void 0 : N.path) || "./", children: [
      /* @__PURE__ */ t("span", { className: "lp-navigation__brand-title", children: r }),
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
            "aria-current": u.has(f.id) ? "page" : void 0,
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
    d ? /* @__PURE__ */ t("div", { className: "lp-navigation__actions", children: d }) : null
  ] }) });
}
function Ot({
  brandTitle: e,
  brandTagline: n,
  navigation: a,
  currentId: r = "home",
  currentIds: l = [],
  theme: i = null,
  actions: s,
  breadcrumbs: d,
  resolveHref: p,
  pageHeader: o,
  footer: g,
  learnerHeader: y,
  notice: v,
  skipLabel: u = "Skip to main content",
  mainId: N = "main-content",
  children: C
}) {
  const w = g && typeof g == "object" && "lines" in g ? g.lines.map((f) => /* @__PURE__ */ t("p", { children: f }, f)) : g;
  return /* @__PURE__ */ c("div", { className: "lp-shell", children: [
    /* @__PURE__ */ t("a", { className: "lp-skip-link skip-link", href: `#${N}`, children: u }),
    /* @__PURE__ */ t("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ t(
      Be,
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
    /* @__PURE__ */ t("div", { className: "lp-shell__learner", children: y }),
    v,
    d ? /* @__PURE__ */ t(Oe, { items: d, resolveHref: p }) : null,
    o != null && o.title ? /* @__PURE__ */ c("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ t("h1", { children: o.title }),
      o.subtitle ? /* @__PURE__ */ t("p", { className: "lp-page-header__subtitle", children: o.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ t("main", { id: N, className: "lp-shell__main site-main", tabIndex: -1, children: C }),
    /* @__PURE__ */ t("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: w })
  ] });
}
function Dt({
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
function je({ id: e, title: n }) {
  const a = [e, n].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ t("span", { className: "lp-outcome-badge", children: a });
}
function Ft({ message: e = "Loading…" }) {
  return /* @__PURE__ */ c("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ t("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { children: e })
  ] });
}
function He({
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
function Ue({
  id: e,
  title: n,
  kind: a = "session",
  summary: r = "",
  defaultOpen: l = !1,
  meta: i,
  children: s
}) {
  const d = Ae(a) ? a : "session", p = re[d];
  return /* @__PURE__ */ c("details", { className: "lp-session lp-panel", id: e, "data-kind": d, open: l, children: [
    /* @__PURE__ */ t("summary", { className: "lp-session__summary", children: /* @__PURE__ */ c("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ t("h2", { className: "lp-session__heading", children: n || p }),
      /* @__PURE__ */ t("span", { className: "lp-session__meta", children: i || p })
    ] }) }),
    /* @__PURE__ */ c("div", { className: "lp-session__content", children: [
      r ? /* @__PURE__ */ t("p", { className: "lp-panel-note", children: r }) : null,
      /* @__PURE__ */ t("div", { className: "lp-activity-list", children: s })
    ] })
  ] });
}
function Ke({
  teachingWeek: e,
  title: n = "",
  subtitle: a = "",
  status: r,
  learningOutcomes: l = [],
  headingLevel: i = 1,
  showTitle: s = !0
}) {
  const d = e ? `Week ${e}${n ? `: ${n}` : ""}` : n || "Week";
  return /* @__PURE__ */ c("header", { className: "lp-week-header", children: [
    r ? /* @__PURE__ */ t(te, { status: r }) : null,
    s ? /* @__PURE__ */ t(i === 2 ? "h2" : "h1", { children: d }) : e ? /* @__PURE__ */ t("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    a ? /* @__PURE__ */ t("p", { className: "lp-week-header__subtitle", children: a }) : null,
    l.length ? /* @__PURE__ */ t("ul", { className: "lp-week-header__outcomes", children: l.map((o) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(je, { id: o.id, title: o.title }) }, o.id || o.title)) }) : null
  ] });
}
function Ye({ previousWeek: e, nextWeek: n }) {
  return !(e != null && e.href) && !(n != null && n.href) ? null : /* @__PURE__ */ t("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ c("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    n != null && n.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: n.href, rel: "next", children: n.label || "Next week" }) }) : null
  ] }) });
}
function qe({ html: e, className: n, ...a }) {
  const r = e == null ? "" : String(e);
  return ve(r) ? /* @__PURE__ */ t("div", { className: n, "data-lp-html-rejected": "true", ...a }) : /* @__PURE__ */ t("div", { className: n, dangerouslySetInnerHTML: { __html: r }, ...a });
}
function Ve(e) {
  if (e.meta) return e.meta;
  const n = (e.activities || []).length, a = `${n} ${n === 1 ? "activity" : "activities"}`, r = re[e.kind || "session"] || re.session;
  return e.kind && e.kind !== "session" ? `${r} · ${a}` : a;
}
function ze(e, n) {
  return "html" in e && e.html ? /* @__PURE__ */ t(
    qe,
    {
      className: "lp-activity-html",
      html: e.html
    },
    n
  ) : "children" in e && e.children ? /* @__PURE__ */ t("div", { children: e.children }, n) : /* @__PURE__ */ t(Pe, { ...e }, n);
}
function Rt({
  week: e = {},
  learningOutcomes: n = [],
  context: a = null,
  sessions: r = [],
  progress: l = null,
  previousWeek: i,
  nextWeek: s,
  features: d = {},
  renderActivity: p
}) {
  const o = Ie(d), g = (a == null ? void 0 : a.type) || (a == null ? void 0 : a.contextType), y = r.filter((u) => !(o.showIndependentStudy === !1 && Te(u.kind))), v = p || ze;
  return /* @__PURE__ */ c("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ t(
      Ke,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: o.showLearningOutcomes ? n : [],
        headingLevel: e.headingLevel || 1,
        showTitle: o.showTitle !== !1
      }
    ),
    a && Se(o, g) ? /* @__PURE__ */ t(
      Re,
      {
        contextType: g,
        heading: a.heading,
        items: a.items,
        description: a.description,
        action: a.action
      }
    ) : null,
    y.length ? y.map((u) => /* @__PURE__ */ t(
      Ue,
      {
        id: u.id,
        title: u.title,
        kind: u.kind,
        summary: u.summary,
        defaultOpen: u.defaultOpen,
        meta: Ve(u),
        children: (u.activities || []).map((N, C) => v(N, C))
      },
      u.id || u.title
    )) : /* @__PURE__ */ t(
      ue,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    o.showProgress && l ? /* @__PURE__ */ t(He, { ...l }) : null,
    /* @__PURE__ */ t(Ye, { previousWeek: i, nextWeek: s })
  ] });
}
const J = {
  plannedHeading: "Week not available yet",
  plannedMessage: "This week has not been made available by your teacher.",
  archivedHeading: "Week not available",
  archivedMessage: "This week is no longer available to learners.",
  inaccessibleHeading: "Week not available",
  inaccessibleMessage: "This week is not available."
};
function se(e) {
  var n;
  return String(e.status ?? ((n = e.metadata) == null ? void 0 : n.status) ?? "").trim();
}
function pe(e) {
  return _e(se(e));
}
function Ge(e) {
  const n = e.toLowerCase();
  return n === "planned" ? {
    heading: J.plannedHeading,
    message: J.plannedMessage
  } : n === "archived" ? {
    heading: J.archivedHeading,
    message: J.archivedMessage
  } : {
    heading: J.inaccessibleHeading,
    message: J.inaccessibleMessage
  };
}
function Xe({ href: e, children: n, className: a }) {
  return /* @__PURE__ */ t("a", { className: a, href: e, children: n });
}
function Bt({
  week: e,
  href: n,
  children: a,
  className: r = "lp-text-link",
  lockedClassName: l = "lp-week-access-link lp-week-access-link--locked",
  renderLink: i = Xe
}) {
  if (pe(e))
    return i({ href: n, children: a, className: r });
  const s = se(e);
  return /* @__PURE__ */ c("span", { className: l, "aria-disabled": "true", children: [
    /* @__PURE__ */ t("span", { className: "lp-week-access-link__label", children: a }),
    " ",
    /* @__PURE__ */ t(te, { status: s || "planned" })
  ] });
}
function jt({ week: e, children: n, fallback: a }) {
  if (pe(e))
    return n;
  if (a != null)
    return a;
  const r = se(e), l = Ge(r);
  return /* @__PURE__ */ c("div", { className: "lp-week-access-guard", children: [
    /* @__PURE__ */ t(te, { status: r || "planned" }),
    /* @__PURE__ */ t(ue, { heading: l.heading, message: l.message })
  ] });
}
const Ze = ["neutral", "correct", "incorrect", "informative", "hint"], Je = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function Q({
  state: e = "neutral",
  title: n,
  message: a
}) {
  const r = Ze.includes(e) ? e : "neutral", l = Je[r];
  return !a && !n ? null : /* @__PURE__ */ t("div", { className: "lp-feedback", "data-lp-feedback-state": r, "data-lp-feedback": !0, children: /* @__PURE__ */ t(Fe, { tone: l.tone, title: n || l.label, message: a }) });
}
function ne(e, n) {
  const a = e.slice();
  if (!n || a.length < 2) return a;
  for (let r = a.length - 1; r > 0; r -= 1) {
    const l = Math.floor(Math.random() * (r + 1)), i = a[r];
    a[r] = a[l], a[l] = i;
  }
  return a;
}
function W(e) {
  return e.label || e.text || e.id;
}
function Qe({
  id: e = "classification",
  title: n,
  prompt: a,
  instructions: r,
  items: l,
  categories: i,
  feedback: s,
  formative: d = !0,
  retry: p = !0,
  shuffle: o = !1,
  maxAttempts: g,
  initialAssignments: y = {},
  onResult: v
}) {
  const u = X(() => ne(l, o), [l, o]), [N, C] = k({ ...y }), [w, f] = k(null), [T, j] = k(0), [x, B] = k(!1), [D, E] = k("neutral"), [M, L] = k(""), A = Object.fromEntries(
    l.filter((h) => h.correctCategoryId).map((h) => [h.id, h.correctCategoryId])
  ), $ = !!(d && Object.keys(A).length), O = x, H = x && p && (typeof g != "number" || T < g), K = u.filter((h) => !N[h.id]), m = u.find((h) => h.id === w);
  function _(h) {
    v == null || v(h);
  }
  function P(h, b) {
    C((I) => ({ ...I, [h]: b })), f(null);
  }
  function F(h) {
    f((b) => b === h ? null : h);
  }
  function Y(h) {
    w && P(w, h);
  }
  function q(h) {
    C((b) => {
      const I = { ...b };
      return delete I[h], I;
    }), f(null);
  }
  function S() {
    if (!l.every((R) => N[R.id])) {
      E("informative"), L("Place every item in a category before checking.");
      return;
    }
    const b = T + 1, I = $ ? l.filter((R) => N[R.id] === A[R.id]).length : 0, U = $ ? I === l.length : null;
    j(b), B(!0), E(U === !0 ? "correct" : U === !1 ? "incorrect" : "informative"), L($ ? U ? (s == null ? void 0 : s.correct) || "Those items match the expected categories." : (s == null ? void 0 : s.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), _({
      completed: !0,
      correct: U,
      score: $ ? { correct: I, total: l.length } : void 0,
      attempts: b,
      responses: { ...N }
    });
  }
  function V() {
    C({}), f(null), B(!1), E("neutral"), L(""), _({ completed: !1, correct: null, attempts: T, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "classification", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: m ? `Selected: ${W(m)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: O, children: [
      /* @__PURE__ */ t("legend", { children: a }),
      /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        K.map((h) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": w === h.id,
            onClick: () => F(h.id),
            children: [
              W(h),
              w === h.id ? " (selected)" : ""
            ]
          },
          h.id
        )),
        K.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
      ] }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((h) => {
        const b = u.filter((I) => N[I.id] === h.id);
        return /* @__PURE__ */ c("div", { className: "lp-card", children: [
          /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: h.label }) }),
          /* @__PURE__ */ t("ul", { className: "lp-activity-list", children: b.map((I) => {
            const U = x && $ ? A[I.id] === h.id ? "Correct" : "Incorrect" : "Placed";
            return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                onClick: () => q(I.id),
                children: [
                  W(I),
                  " · ",
                  U,
                  O ? "" : " · Return"
                ]
              }
            ) }, I.id);
          }) }),
          b.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "No items yet" }) : null,
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "lp-button",
              disabled: !w,
              onClick: () => Y(h.id),
              children: [
                "Place in ",
                W(h)
              ]
            }
          )
        ] }, h.id);
      }) }),
      /* @__PURE__ */ c("details", { children: [
        /* @__PURE__ */ t("summary", { children: "Use dropdown lists instead" }),
        u.map((h) => /* @__PURE__ */ c("p", { className: "lp-form__field", children: [
          /* @__PURE__ */ t("label", { htmlFor: `${e}-${h.id}`, children: W(h) }),
          /* @__PURE__ */ c(
            "select",
            {
              id: `${e}-${h.id}`,
              "data-lp-item": h.id,
              value: N[h.id] || "",
              disabled: O,
              onChange: (b) => {
                const I = b.target.value;
                C((U) => {
                  const R = { ...U };
                  return I ? R[h.id] = I : delete R[h.id], R;
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
      H ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: V, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(Q, { state: D, message: M })
  ] });
}
function he() {
  const [e, n] = k({}), [a, r] = k(null), l = le((p, o = e) => Object.keys(o).find((g) => o[g] === p) || null, [e]), i = le((p) => {
    r((o) => o === p ? null : p);
  }, []), s = le((p) => {
    if (!a) {
      const g = l(p);
      g && r(g);
      return;
    }
    const o = a;
    n((g) => {
      const y = { ...g }, v = Object.keys(y).find((u) => y[u] === p);
      return v && delete y[v], y[o] = p, y;
    }), r(null);
  }, [l, a]), d = le(() => {
    n({}), r(null);
  }, []);
  return { placements: e, selectedItemId: a, selectItem: i, selectTarget: s, occupantOf: l, reset: d };
}
function We({
  id: e = "drag-drop",
  title: n,
  prompt: a,
  instructions: r,
  items: l,
  targets: i,
  correct: s = {},
  feedback: d,
  formative: p = !0,
  retry: o = !0,
  shuffle: g = !1,
  maxAttempts: y,
  onResult: v
}) {
  var q;
  const u = X(() => ne(l, g), [l, g]), { placements: N, selectedItemId: C, selectItem: w, selectTarget: f, occupantOf: T, reset: j } = he(), [x, B] = k(0), [D, E] = k(!1), [M, L] = k("neutral"), [A, $] = k(""), O = !!(p && Object.keys(s).length), H = D, K = D && o && (typeof y != "number" || x < y), m = u.filter((S) => !N[S.id]), _ = (q = u.find((S) => S.id === C)) == null ? void 0 : q.label;
  function P(S) {
    v == null || v(S);
  }
  function F() {
    if (!l.every((I) => N[I.id])) {
      L("informative"), $("Place every item before checking.");
      return;
    }
    const V = x + 1, h = O ? l.filter((I) => N[I.id] === s[I.id]).length : 0, b = O ? h === l.length : null;
    B(V), E(!0), L(b === !0 ? "correct" : b === !1 ? "incorrect" : "informative"), $(O ? b ? (d == null ? void 0 : d.correct) || "Those placements match the expected targets." : (d == null ? void 0 : d.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), P({
      completed: !0,
      correct: b,
      score: O ? { correct: h, total: l.length } : void 0,
      attempts: V,
      responses: { ...N }
    });
  }
  function Y() {
    j(), E(!1), L("neutral"), $(""), P({ completed: !1, correct: null, attempts: x, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "drag-drop", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { children: a }),
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: _ ? `Selected: ${_}. Choose a target.` : "Select an item, then select a target to place it." }),
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: H, children: [
      /* @__PURE__ */ t("legend", { children: "Items" }),
      /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
        m.map((S) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-pressed": C === S.id,
            onClick: () => w(S.id),
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
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: H, children: [
      /* @__PURE__ */ t("legend", { children: "Targets" }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: i.map((S) => {
        const V = T(S.id), h = l.find((I) => I.id === V), b = D && O && V ? s[V] === S.id ? "Correct" : "Incorrect" : h ? "Placed" : "Empty";
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
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: F, disabled: H, children: "Check placement" }),
      K ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(Q, { state: M, message: A })
  ] });
}
function et({
  id: e = "option-cards",
  title: n,
  prompt: a,
  instructions: r,
  options: l,
  correctOptionId: i,
  feedback: s,
  formative: d = !0,
  retry: p = !0,
  shuffle: o = !1,
  maxAttempts: g,
  initialSelectedId: y,
  onResult: v
}) {
  const u = X(() => ne(l, o), [l, o]), [N, C] = k(y || null), [w, f] = k(0), [T, j] = k(!1), [x, B] = k("neutral"), [D, E] = k(""), M = !!(d && i), L = `lp-option-cards-${e}`, A = T, $ = T && p && (typeof g != "number" || w < g);
  function O(m) {
    v == null || v(m);
  }
  function H() {
    if (!N) {
      B("informative"), E("Choose an option before checking.");
      return;
    }
    const m = w + 1, _ = M ? N === i : null, P = M ? _ ? (s == null ? void 0 : s.correct) || "That matches the expected option." : (s == null ? void 0 : s.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    f(m), j(!0), B(_ === !0 ? "correct" : _ === !1 ? "incorrect" : "informative"), E(P), O({
      completed: !0,
      correct: _,
      score: M ? { correct: _ ? 1 : 0, total: 1 } : void 0,
      attempts: m,
      responses: { optionId: N }
    });
  }
  function K() {
    C(null), j(!1), B("neutral"), E(""), O({
      completed: !1,
      correct: null,
      attempts: w,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "option-cards", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ c("fieldset", { className: "lp-fieldset", disabled: A, children: [
      /* @__PURE__ */ t("legend", { children: a }),
      /* @__PURE__ */ t("div", { className: "lp-card-grid", children: u.map((m) => {
        const _ = N === m.id, F = T && M && _ ? m.id === i ? "Correct" : "Incorrect" : _ ? "Selected" : "";
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
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: H, disabled: A, children: "Check answer" }),
      $ ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: K, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(Q, { state: x, message: D })
  ] });
}
function tt(e, n) {
  var d;
  const a = [], r = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let l = 0, i = 0, s;
  for (; (s = r.exec(e)) !== null; ) {
    s.index > l && a.push(e.slice(l, s.index));
    const p = s[1] || ((d = n[i]) == null ? void 0 : d.id) || `gap-${i + 1}`;
    i += 1, a.push({ gapId: p }), l = s.index + s[0].length;
  }
  return l < e.length && a.push(e.slice(l)), !a.some((p) => typeof p != "string") && n[0] && (a.push(" "), a.push({ gapId: n[0].id })), a;
}
function nt({
  id: e = "phrase-completion",
  title: n,
  prompt: a,
  instructions: r,
  gaps: l,
  options: i,
  correctOptionId: s,
  feedback: d,
  formative: p = !0,
  retry: o = !0,
  shuffle: g = !1,
  maxAttempts: y,
  onResult: v
}) {
  var h;
  const u = X(() => l && l.length ? l : [{ id: "gap", label: "missing term", correctOptionId: s || void 0 }], [s, l]), N = X(() => ne(i, g), [i, g]), C = X(() => tt(a, u), [a, u]), { placements: w, selectedItemId: f, selectItem: T, selectTarget: j, occupantOf: x, reset: B } = he(), [D, E] = k(0), [M, L] = k(!1), [A, $] = k("neutral"), [O, H] = k(""), K = Object.fromEntries(
    u.map((b) => [b.id, b.correctOptionId]).filter((b) => b[1])
  ), m = !!(p && Object.keys(K).length), _ = M, P = M && o && (typeof y != "number" || D < y), F = N.filter((b) => !w[b.id]), Y = (h = i.find((b) => b.id === f)) == null ? void 0 : h.label;
  function q(b) {
    v == null || v(b);
  }
  function S() {
    if (!u.every((z) => x(z.id))) {
      $("informative"), H("Fill every blank before checking.");
      return;
    }
    const I = D + 1, U = {};
    u.forEach((z) => {
      const Z = x(z.id);
      Z && (U[z.id] = Z);
    });
    const R = m ? u.filter((z) => U[z.id] === K[z.id]).length : 0, G = m ? R === u.length : null;
    E(I), L(!0), $(G === !0 ? "correct" : G === !1 ? "incorrect" : "informative"), H(m ? G ? (d == null ? void 0 : d.correct) || "That completes the phrase." : (d == null ? void 0 : d.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), q({
      completed: !0,
      correct: G,
      score: m ? { correct: R, total: u.length } : void 0,
      attempts: I,
      responses: U
    });
  }
  function V() {
    B(), L(!1), $("neutral"), H(""), q({ completed: !1, correct: null, attempts: D, responses: {} });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "fill-gap", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: Y ? `Selected: ${Y}. Choose a blank.` : "Select a phrase, then select the blank." }),
    /* @__PURE__ */ t("p", { children: C.map((b, I) => {
      if (typeof b == "string") return /* @__PURE__ */ t("span", { children: b }, `text-${I}`);
      const U = x(b.gapId), R = i.find((Z) => Z.id === U), G = u.find((Z) => Z.id === b.gapId), z = M && m && U ? K[b.gapId] === U ? "Correct" : "Incorrect" : R ? "Filled" : "Blank";
      return /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "lp-button lp-button--secondary",
          disabled: _,
          "aria-label": `${(G == null ? void 0 : G.label) || "blank"}: ${(R == null ? void 0 : R.label) || "empty"}. ${z}`,
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
      P ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: V, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(Q, { state: A, message: O })
  ] });
}
function lt({
  id: e = "sequence",
  title: n,
  prompt: a,
  instructions: r,
  items: l,
  correctOrder: i = [],
  feedback: s,
  formative: d = !0,
  retry: p = !0,
  shuffle: o = !1,
  maxAttempts: g,
  onResult: y
}) {
  const v = X(() => ne(l, o), [l, o]), [u, N] = k(v), [C, w] = k(0), [f, T] = k(!1), [j, x] = k("neutral"), [B, D] = k(""), E = !!(d && i.length), M = f, L = f && p && (typeof g != "number" || C < g);
  function A(m) {
    y == null || y(m);
  }
  function $(m, _) {
    const P = m + _;
    if (P < 0 || P >= u.length) return;
    const F = u.slice(), [Y] = F.splice(m, 1);
    F.splice(P, 0, Y), N(F);
  }
  function O(m, _) {
    M || (m.key === "ArrowUp" && (m.preventDefault(), $(_, -1)), m.key === "ArrowDown" && (m.preventDefault(), $(_, 1)));
  }
  function H() {
    const m = C + 1, _ = u.map((Y) => Y.id), P = E ? _.filter((Y, q) => Y === i[q]).length : 0, F = E ? P === i.length && _.length === i.length : null;
    w(m), T(!0), x(F === !0 ? "correct" : F === !1 ? "incorrect" : "informative"), D(E ? F ? (s == null ? void 0 : s.correct) || "That order matches the expected sequence." : (s == null ? void 0 : s.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), A({
      completed: !0,
      correct: F,
      score: E ? { correct: P, total: i.length } : void 0,
      attempts: m,
      responses: { itemIds: _ }
    });
  }
  function K() {
    N(v), T(!1), x("neutral"), D(""), A({
      completed: !1,
      correct: null,
      attempts: C,
      responses: { itemIds: v.map((m) => m.id) }
    });
  }
  return /* @__PURE__ */ c("section", { className: "lp-block lp-block--interactive", "data-lp-block": "ordering", "data-lp-block-id": e, children: [
    n ? /* @__PURE__ */ t("h3", { children: n }) : null,
    r ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: r }) : null,
    /* @__PURE__ */ t("p", { children: a }),
    /* @__PURE__ */ t("ol", { className: "lp-activity-list", children: u.map((m, _) => /* @__PURE__ */ c(
      "li",
      {
        className: "lp-card",
        tabIndex: M ? -1 : 0,
        "aria-label": `${m.label}, position ${_ + 1} of ${u.length}`,
        onKeyDown: (P) => O(P, _),
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
                disabled: M || _ === 0,
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
                disabled: M || _ === u.length - 1,
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
      /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: H, disabled: M, children: "Check order" }),
      L ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: K, children: "Try again" }) : null
    ] }),
    /* @__PURE__ */ t(Q, { state: j, message: B })
  ] });
}
function ee(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function at(e) {
  var n;
  return (e == null ? void 0 : e.formative) === !0 || ((n = e == null ? void 0 : e.marking) == null ? void 0 : n.mode) === "formative-local";
}
function rt(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function st(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const ct = [
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
], ce = 200, it = 500;
function me(e, n) {
  const a = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return a > 0 ? a : n;
}
function ot(e) {
  return ct.includes(ee(e));
}
function dt(e) {
  var n;
  return ((n = e.content) == null ? void 0 : n.questionId) || e.id;
}
function ut({
  id: e,
  prompt: n,
  placeholder: a,
  value: r,
  defaultValue: l = "",
  minChars: i,
  minimumCharacters: s,
  defaultMinChars: d = ce,
  rows: p = 4,
  disabled: o = !1,
  hidePrompt: g = !1,
  onChange: y
}) {
  const v = ae(), u = e || v, N = me({ minChars: i, minimumCharacters: s }, d), C = typeof r == "string", [w, f] = k(String(l || "")), [T, j] = k(""), x = C ? r : w, B = x.trim().length, D = B >= N;
  function E(A) {
    C || f(A), y == null || y(A);
  }
  function M(A) {
    A.preventDefault(), j("Paste is disabled. Type your answer in your own words.");
  }
  function L(A) {
    A.preventDefault(), j("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ c("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ c("label", { className: "lp-field", htmlFor: u, children: [
      g ? /* @__PURE__ */ t("span", { className: "lp-visually-hidden", children: n }) : /* @__PURE__ */ t("span", { className: "lp-field__label", children: n }),
      /* @__PURE__ */ t(
        "textarea",
        {
          id: u,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(N),
          rows: p,
          value: x,
          placeholder: a,
          minLength: N,
          autoComplete: "off",
          disabled: o,
          "aria-describedby": `${u}-count ${u}-notice`,
          onChange: (A) => E(A.target.value),
          onPaste: M,
          onDrop: L
        }
      )
    ] }),
    /* @__PURE__ */ t(
      "p",
      {
        id: `${u}-count`,
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
        id: `${u}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: T
      }
    )
  ] });
}
function pt(e, n) {
  return n > 0 ? `Write at least ${e} characters. You currently have ${n}.` : `Write at least ${e} characters before saving.`;
}
function fe({
  id: e = "text-response",
  blockType: n = "short-response",
  title: a,
  prompt: r,
  instructions: l,
  guidance: i,
  placeholder: s,
  minChars: d,
  minimumCharacters: p,
  defaultMinChars: o = ce,
  rows: g = 4,
  feedback: y,
  retry: v = !0,
  maxAttempts: u,
  initialResponse: N = "",
  saveLabel: C = "Save response",
  onResult: w
}) {
  const f = me({ minChars: d, minimumCharacters: p }, o), [T, j] = k(String(N || "")), [x, B] = k(0), [D, E] = k(!1), [M, L] = k("neutral"), [A, $] = k(""), O = T.trim(), H = O.length, K = H >= f, m = D, _ = D && v && (typeof u != "number" || x < u);
  function P(q) {
    w == null || w(q);
  }
  function F() {
    if (!K) {
      L("informative"), $(pt(f, H));
      return;
    }
    const q = x + 1, S = i || (y == null ? void 0 : y.correct) || "Saved.";
    B(q), E(!0), L("informative"), $(S), P({
      completed: !0,
      correct: null,
      attempts: q,
      responses: O
    });
  }
  function Y() {
    j(""), E(!1), L("neutral"), $(""), P({
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
        a ? /* @__PURE__ */ t("h3", { children: a }) : null,
        l ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ t(
          ut,
          {
            id: `${e}-field`,
            prompt: r,
            placeholder: s,
            value: T,
            minChars: d,
            minimumCharacters: p,
            defaultMinChars: o,
            rows: g,
            disabled: m,
            onChange: j
          }
        ),
        /* @__PURE__ */ c("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: F, disabled: m, children: C }),
          _ ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(Q, { state: M, message: A })
      ]
    }
  );
}
function ht({
  rows: e = 4,
  ...n
}) {
  return /* @__PURE__ */ t(
    fe,
    {
      ...n,
      blockType: "short-response",
      defaultMinChars: ce,
      rows: e
    }
  );
}
function mt({
  rows: e = 6,
  ...n
}) {
  return /* @__PURE__ */ t(
    fe,
    {
      ...n,
      blockType: "reflection",
      defaultMinChars: it,
      rows: e
    }
  );
}
function ft(e) {
  const n = e.content || {};
  return {
    id: e.id,
    instructions: n.instructions,
    feedback: n.feedback,
    formative: at(n),
    retry: rt(n),
    shuffle: st(n),
    maxAttempts: n.maxAttempts
  };
}
function ie(e) {
  return typeof e == "string" ? e : void 0;
}
function bt({ block: e, initialResponse: n, onResult: a }) {
  const r = ee(e.type), l = e.content || {}, i = ee(l.presentation), s = ft(e), d = (p) => a == null ? void 0 : a(p, e);
  if (r === "single-choice" || r === "option-cards" || i === "option-cards" || i === "true-false" || i === "picture-quiz")
    return /* @__PURE__ */ t(
      et,
      {
        ...s,
        prompt: l.prompt || "Choose an option",
        options: l.options || [],
        correctOptionId: l.correctOptionId,
        initialSelectedId: typeof n == "string" ? n : void 0,
        onResult: d
      }
    );
  if (r === "classification") {
    const p = n && typeof n == "object" && !Array.isArray(n) ? n : void 0;
    return /* @__PURE__ */ t(
      Qe,
      {
        ...s,
        prompt: l.prompt || "Classify each item",
        items: l.items || [],
        categories: l.categories || [],
        initialAssignments: p,
        onResult: d
      }
    );
  }
  return r === "drag-drop" ? /* @__PURE__ */ t(
    We,
    {
      ...s,
      prompt: l.prompt || "Place each item",
      items: l.items || [],
      targets: l.targets || [],
      correct: l.correct,
      onResult: d
    }
  ) : r === "fill-gap" || r === "phrase-completion" ? /* @__PURE__ */ t(
    nt,
    {
      ...s,
      prompt: l.prompt || "Complete the phrase",
      gaps: l.gaps,
      options: l.options || [],
      correctOptionId: l.correctOptionId,
      onResult: d
    }
  ) : r === "ordering" || r === "sequence" ? /* @__PURE__ */ t(
    lt,
    {
      ...s,
      prompt: l.prompt || "Put the items in order",
      items: l.items || [],
      correctOrder: l.correctOrder,
      onResult: d
    }
  ) : r === "short-response" ? /* @__PURE__ */ t(
    ht,
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
      initialResponse: ie(n),
      onResult: d
    }
  ) : r === "reflection" ? /* @__PURE__ */ t(
    mt,
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
      initialResponse: ie(n),
      onResult: d
    }
  ) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": r, children: [
    "This ",
    r || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function Ht({
  activity: e,
  initialResponses: n = {},
  renderFallback: a,
  onResult: r
}) {
  var d, p;
  const [l, i] = k(0), s = Ne(e) || void 0;
  return /* @__PURE__ */ c(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": s,
      children: [
        (d = e.metadata) != null && d.title ? /* @__PURE__ */ t("h3", { children: e.metadata.title }) : null,
        (p = e.metadata) != null && p.summary ? /* @__PURE__ */ t("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ t("div", { className: "lp-activity-list", children: (e.blocks || []).map((o) => ot(o.type) ? /* @__PURE__ */ t(
          bt,
          {
            block: o,
            initialResponse: n[dt(o)],
            onResult: r
          },
          o.id
        ) : a ? /* @__PURE__ */ t("div", { children: a(o) }, o.id) : /* @__PURE__ */ c("p", { className: "lp-card__meta", "data-lp-block": ee(o.type), children: [
          "This ",
          ee(o.type) || "unknown",
          " block is not part of the React activity catalogue yet."
        ] }, o.id)) }, l),
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
function gt(e, n) {
  return typeof n == "number" && Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function be({
  title: e,
  badge: n,
  subtitle: a,
  score: r,
  progress: l,
  completed: i = !0,
  attempts: s,
  message: d,
  showStatus: p = !0,
  showDisclaimer: o = !0,
  collapsed: g = !1
}) {
  const y = n || a, v = gt(r, l), u = Math.round(v * 100), N = i ? "Completed" : "In progress", C = r ? `${r.correct} / ${r.total}` : null, w = r ? `${r.correct} of ${r.total} correct` : null, f = typeof s == "number" ? `${s} ${s === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ c(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": g ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ t("strong", { children: e }) }) : null,
        p ? /* @__PURE__ */ t(te, { status: i ? "completed" : "progress", label: N }) : null,
        C ? /* @__PURE__ */ t(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": w || void 0,
            children: C
          }
        ) : null,
        w ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: w }) : null,
        !g && y ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ t("strong", { children: y }) }) : null,
        g ? null : /* @__PURE__ */ c(ge, { children: [
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
          f ? /* @__PURE__ */ t("p", { children: f }) : null,
          d ? /* @__PURE__ */ t("p", { children: d }) : null,
          o ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function yt(e, n) {
  if (e)
    try {
      n && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !n && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      n ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function Ut({
  open: e = !1,
  title: n = "Activity complete",
  completed: a = !0,
  score: r,
  badge: l,
  subtitle: i,
  progress: s,
  attempts: d,
  message: p,
  onClose: o,
  onReview: g,
  onNext: y,
  nextLabel: v = "Continue",
  reviewLabel: u = "Review"
}) {
  const N = ye(null), C = ae();
  return oe(() => {
    yt(N.current, e);
  }, [e]), e ? /* @__PURE__ */ c(
    "dialog",
    {
      ref: N,
      className: "lp-dialog",
      "aria-labelledby": C,
      onCancel: (w) => {
        w.preventDefault(), o == null || o();
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
              onClick: o,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ t(
            be,
            {
              completed: a,
              score: r,
              badge: l,
              subtitle: i,
              progress: s,
              attempts: d,
              message: p
            }
          ),
          /* @__PURE__ */ c("div", { className: "lp-form__actions", children: [
            g ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: g, children: u }) : null,
            y ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: y, children: v }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const vt = (e) => ({
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
function Kt({
  collapsed: e,
  defaultCollapsed: n = !0,
  onCollapsedChange: a,
  expandLabel: r = "Show progress details",
  collapseLabel: l = "Hide progress details",
  ...i
}) {
  const [s, d] = k(n), p = typeof e == "boolean" ? e : s, o = ae(), g = i.title || "Practice progress";
  function y(v) {
    typeof e != "boolean" && d(v), a == null || a(v);
  }
  return /* @__PURE__ */ c(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: vt(p),
      "aria-label": g,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": p ? "true" : "false",
      children: [
        /* @__PURE__ */ t("div", { id: o, children: /* @__PURE__ */ t(be, { ...i, title: g, collapsed: p }) }),
        /* @__PURE__ */ t("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !p,
            "aria-controls": o,
            onClick: () => y(!p),
            children: p ? r : l
          }
        ) })
      ]
    }
  );
}
const Nt = {
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
}, _t = {
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
}, kt = {
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
}, Ct = {
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
}, wt = {
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
}, It = {
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
}, St = {
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
}, Tt = {
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
}, Yt = [
  Nt,
  _t,
  kt,
  Ct,
  wt,
  It,
  St,
  Tt
];
export {
  bt as ActivityBlock,
  Pe as ActivityCard,
  qe as AuthoredHtml,
  Oe as Breadcrumbs,
  ke as CONTEXT_TYPES,
  Fe as Callout,
  Qe as Classification,
  Ut as CompletionModal,
  Re as ContextPanel,
  We as DragDrop,
  ue as EmptyState,
  Lt as ErrorState,
  Ze as FEEDBACK_STATES,
  Q as FeedbackPanel,
  Ot as HubShell,
  Ht as InteractiveActivity,
  Mt as LEARNER_ACTIVITY_STATES,
  Dt as LearnerHeader,
  je as LearningOutcomeBadge,
  ut as LearningTextField,
  Ft as LoadingState,
  Be as Navigation,
  et as OptionCards,
  nt as PhraseCompletion,
  Kt as PracticeProgressPanel,
  He as ProgressCard,
  be as ProgressSummary,
  it as REFLECTION_DEFAULT_MIN_CHARS,
  mt as Reflection,
  Ce as SESSION_KINDS,
  re as SESSION_KIND_LABELS,
  ce as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  Pt as STATUS_TONES,
  lt as Sequence,
  Ue as SessionSection,
  ht as ShortResponse,
  te as StatusBadge,
  fe as TextResponse,
  J as WEEK_ACCESS_COPY,
  we as WEEK_UI_FEATURES,
  jt as WeekAccessGuard,
  Bt as WeekAccessLink,
  Ke as WeekHeader,
  Ye as WeekNavigation,
  Rt as WeekView,
  Me as activityActionLabel,
  Yt as demoCatalogueActivities,
  It as demoClassification,
  kt as demoDragDrop,
  Nt as demoOptionCards,
  Ct as demoPhraseCompletion,
  Tt as demoReflection,
  wt as demoSequence,
  St as demoShortResponse,
  _t as demoTrueFalse,
  ot as isCatalogueReactType,
  Te as isIndependentKind,
  Ae as isSessionKind,
  Ie as mergeWeekUiFeatures,
  ee as normaliseActivityType,
  dt as questionIdFor,
  me as resolveMinChars,
  gt as resolveProgressFraction,
  se as resolveWeekStatus,
  Se as shouldShowContext,
  de as statusLabel,
  Ee as statusTone,
  Ge as weekAccessFallbackCopy,
  pe as weekIsAccessible
};
//# sourceMappingURL=index.js.map
