import { jsxs as s, jsx as n } from "react/jsx-runtime";
import { useId as E, useState as L, useEffect as T } from "react";
const C = ["exam", "assignment", "project"], $ = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], y = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, ee = ["not-started", "in-progress", "completed"], ne = ["available", "planned", "progress", "completed"], k = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function A(e = {}) {
  return { ...k, ...e };
}
function I(e, l) {
  return l ? l === "assignment" ? e.showAssignmentContext !== !1 : l === "exam" ? e.showExamContext !== !1 : l === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function P(e) {
  return e === "independent-study" || e === "homework";
}
function O(e) {
  return $.includes(e);
}
const B = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, j = {
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
function M(e) {
  return B[e || ""] || "planned";
}
function S(e, l = "") {
  return j[e || ""] || l || String(e || "Planned");
}
function K(e, l = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : l;
}
function w({
  status: e = "planned",
  label: l,
  marker: a = !0
}) {
  const t = M(e);
  return /* @__PURE__ */ s("span", { className: `lp-status-badge lp-status-badge--${t}`, role: "status", children: [
    a ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: "● " }) : null,
    l || S(e)
  ] });
}
function U({
  title: e = "Untitled activity",
  description: l = "",
  activityType: a = "Activity",
  duration: t = "",
  status: r = "Not started",
  state: c,
  href: d,
  actionLabel: h,
  badge: m = !1,
  badgeStatus: o,
  headingLevel: p = 2,
  muted: f = !1
}) {
  const g = p === 3 ? "h3" : "h2", u = [a, t].filter(Boolean), N = c ? S(c, r) : r;
  return /* @__PURE__ */ s("article", { className: f ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": c || void 0, children: [
    m ? /* @__PURE__ */ n(
      w,
      {
        status: o || c || "planned",
        label: typeof r == "string" && r !== "Not started" ? r : void 0
      }
    ) : null,
    u.length ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: u.join(" · ") }) : null,
    /* @__PURE__ */ n(g, { children: e }),
    l ? /* @__PURE__ */ n("p", { children: l }) : null,
    /* @__PURE__ */ n("p", { className: "lp-card__meta", children: `Status: ${N}` }),
    d ? /* @__PURE__ */ n("div", { className: "lp-card__actions", children: /* @__PURE__ */ n("a", { className: "lp-button", href: d, children: h || K(c) }) }) : null
  ] });
}
function R(e, l) {
  return e.href ? e.href : e.path != null && l ? l(e.path) : e.path || void 0;
}
function Y({ items: e = [], resolveHref: l }) {
  return e.length ? /* @__PURE__ */ n("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ n("ol", { className: "lp-breadcrumbs__list", children: e.map((a, t) => {
    const r = t === e.length - 1, c = R(a, l);
    return /* @__PURE__ */ n("li", { children: r || !c ? /* @__PURE__ */ n("span", { "aria-current": "page", children: a.label }) : /* @__PURE__ */ n("a", { href: c, children: a.label }) }, `${a.label}-${t}`);
  }) }) }) : /* @__PURE__ */ n("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const D = ["info", "success", "warning", "error"];
function le({ tone: e = "info", title: l, message: a }) {
  const t = D.includes(e) ? e : "info";
  return /* @__PURE__ */ s(
    "aside",
    {
      className: `lp-callout lp-callout--${t}`,
      role: t === "error" ? "alert" : void 0,
      children: [
        l ? /* @__PURE__ */ n("strong", { children: l }) : null,
        a ? /* @__PURE__ */ n("p", { children: a }) : null
      ]
    }
  );
}
function x({
  contextType: e = "assignment",
  heading: l = "Context",
  items: a = [],
  description: t = "",
  action: r
}) {
  const c = C.includes(e) ? e : "assignment", d = `lp-context-${c}`;
  return /* @__PURE__ */ s(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${c}`,
      "aria-labelledby": d,
      "data-context-type": c,
      children: [
        /* @__PURE__ */ n("h2", { id: d, children: l }),
        a.length ? /* @__PURE__ */ n("dl", { className: "lp-meta-list", children: a.map((h) => /* @__PURE__ */ s("div", { children: [
          /* @__PURE__ */ n("dt", { children: h.label }),
          /* @__PURE__ */ n("dd", { children: h.value })
        ] }, `${h.label}:${h.value}`)) }) : null,
        t ? /* @__PURE__ */ n("p", { children: t }) : null,
        r != null && r.label && (r != null && r.href) ? /* @__PURE__ */ n("p", { children: /* @__PURE__ */ n("a", { className: "lp-text-link", href: r.href, children: r.label }) }) : null
      ]
    }
  );
}
function F({
  heading: e = "Nothing to show yet",
  message: l = "Check again later.",
  action: a
}) {
  return /* @__PURE__ */ s("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ n("h2", { children: e }),
    /* @__PURE__ */ n("p", { children: l }),
    a != null && a.label && (a != null && a.href) ? /* @__PURE__ */ n("a", { className: "lp-button", href: a.href, children: a.label }) : null
  ] });
}
function ae({
  heading: e = "There is a problem",
  message: l = "Try again."
}) {
  return /* @__PURE__ */ s("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ n("h2", { children: e }),
    /* @__PURE__ */ n("p", { children: l })
  ] });
}
function V({
  items: e,
  currentId: l = "home",
  currentIds: a = [],
  brandTitle: t,
  brandTagline: r,
  homeHref: c,
  theme: d = null,
  actions: h,
  listId: m
}) {
  const o = E(), p = m || `lp-navigation-list-${o}`, [f, g] = L(!1), u = new Set([l, ...a].filter(Boolean)), N = e.find((i) => i.id === "home" && i.enabled !== !1), v = e.filter((i) => i.enabled !== !1);
  T(() => {
    function i(b) {
      b.key === "Escape" && g(!1);
    }
    return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i);
  }, []);
  function _(i) {
    if (i.key === "Escape") {
      g(!1);
      const b = i.currentTarget.querySelector(".lp-navigation__toggle");
      b == null || b.focus();
    }
  }
  return /* @__PURE__ */ n("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: _, children: /* @__PURE__ */ s("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ s("a", { className: "lp-navigation__brand", href: c || (N == null ? void 0 : N.path) || "./", children: [
      /* @__PURE__ */ n("span", { className: "lp-navigation__brand-title", children: t }),
      r ? /* @__PURE__ */ n("span", { className: "lp-navigation__brand-tagline", children: r }) : null
    ] }),
    /* @__PURE__ */ n(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": f,
        "aria-controls": p,
        "aria-label": f ? "Close main menu" : "Open main menu",
        onClick: () => g((i) => !i),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ n(
      "ul",
      {
        className: "lp-navigation__list",
        id: p,
        "data-open": f ? "true" : "false",
        children: v.map((i) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
          "a",
          {
            className: "lp-navigation__link",
            href: i.path,
            "aria-current": u.has(i.id) ? "page" : void 0,
            onClick: () => g(!1),
            children: i.label
          }
        ) }, i.id))
      }
    ),
    d ? /* @__PURE__ */ s("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ n(
        "select",
        {
          "aria-label": "Theme preference",
          value: d.preference,
          onChange: (i) => d.onChange(i.target.value),
          children: d.modes.map((i) => /* @__PURE__ */ n("option", { value: i, children: i[0].toUpperCase() + i.slice(1) }, i))
        }
      )
    ] }) : null,
    h ? /* @__PURE__ */ n("div", { className: "lp-navigation__actions", children: h }) : null
  ] }) });
}
function re({
  brandTitle: e,
  brandTagline: l,
  navigation: a,
  currentId: t = "home",
  currentIds: r = [],
  theme: c = null,
  actions: d,
  breadcrumbs: h,
  resolveHref: m,
  pageHeader: o,
  footer: p,
  learnerHeader: f,
  notice: g,
  skipLabel: u = "Skip to main content",
  mainId: N = "main-content",
  children: v
}) {
  const _ = p && typeof p == "object" && "lines" in p ? p.lines.map((i) => /* @__PURE__ */ n("p", { children: i }, i)) : p;
  return /* @__PURE__ */ s("div", { className: "lp-shell", children: [
    /* @__PURE__ */ n("a", { className: "lp-skip-link skip-link", href: `#${N}`, children: u }),
    /* @__PURE__ */ n("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ n(
      V,
      {
        items: a,
        currentId: t,
        currentIds: r,
        brandTitle: e,
        brandTagline: l,
        theme: c,
        actions: d
      }
    ) }),
    /* @__PURE__ */ n("div", { className: "lp-shell__learner", children: f }),
    g,
    h ? /* @__PURE__ */ n(Y, { items: h, resolveHref: m }) : null,
    o != null && o.title ? /* @__PURE__ */ s("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ n("h1", { children: o.title }),
      o.subtitle ? /* @__PURE__ */ n("p", { className: "lp-page-header__subtitle", children: o.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ n("main", { id: N, className: "lp-shell__main site-main", tabIndex: -1, children: v }),
    /* @__PURE__ */ n("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: _ })
  ] });
}
function te({
  learner: e,
  hubName: l,
  accountHref: a = "./account/",
  onSignOut: t
}) {
  return e ? /* @__PURE__ */ s("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ s("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Learner" }),
        /* @__PURE__ */ n("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Year group" }),
        /* @__PURE__ */ n("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Email" }),
        /* @__PURE__ */ n("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ n("dt", { children: "Current hub" }),
        /* @__PURE__ */ n("dd", { children: l })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ n("a", { href: a, children: "Account" }),
      t ? /* @__PURE__ */ n("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        t();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ n("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function q({ id: e, title: l }) {
  const a = [e, l].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ n("span", { className: "lp-outcome-badge", children: a });
}
function ie({ message: e = "Loading…" }) {
  return /* @__PURE__ */ s("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ n("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { children: e })
  ] });
}
function G({
  title: e = "Progress",
  completed: l = 0,
  total: a = 0,
  description: t = ""
}) {
  const r = Math.max(0, Number(a) || 0), c = Math.min(r, Math.max(0, Number(l) || 0)), d = r ? Math.round(c / r * 100) : 0;
  return /* @__PURE__ */ s("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ n("h2", { children: e }),
    t ? /* @__PURE__ */ n("p", { className: "lp-card__meta", children: t }) : null,
    /* @__PURE__ */ n(
      "progress",
      {
        className: "lp-progress",
        max: r || 1,
        value: c,
        "aria-label": `${d}% complete`
      }
    ),
    /* @__PURE__ */ n("p", { children: `${c} of ${r} complete (${d}%)` })
  ] });
}
function H({
  id: e,
  title: l,
  kind: a = "session",
  summary: t = "",
  defaultOpen: r = !1,
  meta: c,
  children: d
}) {
  const h = O(a) ? a : "session", m = y[h];
  return /* @__PURE__ */ s("details", { className: "lp-session lp-panel", id: e, "data-kind": h, open: r, children: [
    /* @__PURE__ */ n("summary", { className: "lp-session__summary", children: /* @__PURE__ */ s("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ n("h2", { className: "lp-session__heading", children: l || m }),
      /* @__PURE__ */ n("span", { className: "lp-session__meta", children: c || m })
    ] }) }),
    /* @__PURE__ */ s("div", { className: "lp-session__content", children: [
      t ? /* @__PURE__ */ n("p", { className: "lp-panel-note", children: t }) : null,
      /* @__PURE__ */ n("div", { className: "lp-activity-list", children: d })
    ] })
  ] });
}
function X({
  teachingWeek: e,
  title: l = "",
  subtitle: a = "",
  status: t,
  learningOutcomes: r = [],
  headingLevel: c = 1,
  showTitle: d = !0
}) {
  const h = e ? `Week ${e}${l ? `: ${l}` : ""}` : l || "Week";
  return /* @__PURE__ */ s("header", { className: "lp-week-header", children: [
    t ? /* @__PURE__ */ n(w, { status: t }) : null,
    d ? /* @__PURE__ */ n(c === 2 ? "h2" : "h1", { children: h }) : e ? /* @__PURE__ */ n("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    a ? /* @__PURE__ */ n("p", { className: "lp-week-header__subtitle", children: a }) : null,
    r.length ? /* @__PURE__ */ n("ul", { className: "lp-week-header__outcomes", children: r.map((o) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(q, { id: o.id, title: o.title }) }, o.id || o.title)) }) : null
  ] });
}
function z({ previousWeek: e, nextWeek: l }) {
  return !(e != null && e.href) && !(l != null && l.href) ? null : /* @__PURE__ */ n("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ s("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    l != null && l.href ? /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: "lp-text-link", href: l.href, rel: "next", children: l.label || "Next week" }) }) : null
  ] }) });
}
function J(e) {
  if (e.meta) return e.meta;
  const l = (e.activities || []).length, a = `${l} ${l === 1 ? "activity" : "activities"}`, t = y[e.kind || "session"] || y.session;
  return e.kind && e.kind !== "session" ? `${t} · ${a}` : a;
}
function Q(e, l) {
  return "html" in e && e.html ? /* @__PURE__ */ n(
    "div",
    {
      className: "lp-activity-html",
      dangerouslySetInnerHTML: { __html: e.html }
    },
    l
  ) : "children" in e && e.children ? /* @__PURE__ */ n("div", { children: e.children }, l) : /* @__PURE__ */ n(U, { ...e }, l);
}
function se({
  week: e = {},
  learningOutcomes: l = [],
  context: a = null,
  sessions: t = [],
  progress: r = null,
  previousWeek: c,
  nextWeek: d,
  features: h = {},
  renderActivity: m
}) {
  const o = A(h), p = (a == null ? void 0 : a.type) || (a == null ? void 0 : a.contextType), f = t.filter((u) => !(o.showIndependentStudy === !1 && P(u.kind))), g = m || Q;
  return /* @__PURE__ */ s("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ n(
      X,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: o.showLearningOutcomes ? l : [],
        headingLevel: e.headingLevel || 1,
        showTitle: o.showTitle !== !1
      }
    ),
    a && I(o, p) ? /* @__PURE__ */ n(
      x,
      {
        contextType: p,
        heading: a.heading,
        items: a.items,
        description: a.description,
        action: a.action
      }
    ) : null,
    f.length ? f.map((u) => /* @__PURE__ */ n(
      H,
      {
        id: u.id,
        title: u.title,
        kind: u.kind,
        summary: u.summary,
        defaultOpen: u.defaultOpen,
        meta: J(u),
        children: (u.activities || []).map((N, v) => g(N, v))
      },
      u.id || u.title
    )) : /* @__PURE__ */ n(
      F,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    o.showProgress && r ? /* @__PURE__ */ n(G, { ...r }) : null,
    /* @__PURE__ */ n(z, { previousWeek: c, nextWeek: d })
  ] });
}
export {
  U as ActivityCard,
  Y as Breadcrumbs,
  C as CONTEXT_TYPES,
  le as Callout,
  x as ContextPanel,
  F as EmptyState,
  ae as ErrorState,
  re as HubShell,
  ee as LEARNER_ACTIVITY_STATES,
  te as LearnerHeader,
  q as LearningOutcomeBadge,
  ie as LoadingState,
  V as Navigation,
  G as ProgressCard,
  $ as SESSION_KINDS,
  y as SESSION_KIND_LABELS,
  ne as STATUS_TONES,
  H as SessionSection,
  w as StatusBadge,
  k as WEEK_UI_FEATURES,
  X as WeekHeader,
  z as WeekNavigation,
  se as WeekView,
  K as activityActionLabel,
  P as isIndependentKind,
  O as isSessionKind,
  A as mergeWeekUiFeatures,
  I as shouldShowContext,
  S as statusLabel,
  M as statusTone
};
//# sourceMappingURL=index.js.map
