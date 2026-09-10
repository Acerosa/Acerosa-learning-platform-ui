import { jsxs as d, jsx as r, Fragment as Qe } from "react/jsx-runtime";
import { useId as xe, useState as T, useEffect as me, useRef as Oe, useMemo as ue, useCallback as Te } from "react";
import { isUnsafeAuthoredHtml as et, resolveActivityVersion as tt } from "@learning-platform/core";
import { isWeekAvailable as rt } from "@learning-platform/core/curriculum-runtime";
const nt = ["exam", "assignment", "project"], at = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], Le = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, Cr = ["not-started", "in-progress", "completed"], kr = ["available", "planned", "progress", "completed"], ct = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function st(e = {}) {
  return { ...ct, ...e };
}
function lt(e, t) {
  return t ? t === "assignment" ? e.showAssignmentContext !== !1 : t === "exam" ? e.showExamContext !== !1 : t === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function ot(e) {
  return e === "independent-study" || e === "homework";
}
function it(e) {
  return at.includes(e);
}
const dt = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, ut = {
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
function pt(e) {
  return dt[e || ""] || "planned";
}
function He(e, t = "") {
  return ut[e || ""] || t || String(e || "Planned");
}
function mt(e, t = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : t;
}
function _e({
  status: e = "planned",
  label: t,
  marker: n = !0
}) {
  const a = pt(e);
  return /* @__PURE__ */ d("span", { className: `lp-status-badge lp-status-badge--${a}`, role: "status", children: [
    n ? /* @__PURE__ */ r("span", { "aria-hidden": "true", children: "● " }) : null,
    t || He(e)
  ] });
}
function ht({
  title: e = "Untitled activity",
  description: t = "",
  activityType: n = "Activity",
  duration: a = "",
  status: c = "Not started",
  state: o,
  href: l,
  actionLabel: s,
  badge: m = !1,
  badgeStatus: i,
  headingLevel: h = 2,
  muted: p = !1
}) {
  const f = h === 3 ? "h3" : "h2", y = [n, a].filter(Boolean), _ = o ? He(o, c) : c;
  return /* @__PURE__ */ d("article", { className: p ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": o || void 0, children: [
    m ? /* @__PURE__ */ r(
      _e,
      {
        status: i || o || "planned",
        label: typeof c == "string" && c !== "Not started" ? c : void 0
      }
    ) : null,
    y.length ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: y.join(" · ") }) : null,
    /* @__PURE__ */ r(f, { children: e }),
    t ? /* @__PURE__ */ r("p", { children: t }) : null,
    /* @__PURE__ */ r("p", { className: "lp-card__meta", children: `Status: ${_}` }),
    l ? /* @__PURE__ */ r("div", { className: "lp-card__actions", children: /* @__PURE__ */ r("a", { className: "lp-button", href: l, children: s || mt(o) }) }) : null
  ] });
}
function ft(e, t) {
  return e.href ? e.href : e.path != null && t ? t(e.path) : e.path || void 0;
}
function gt({ items: e = [], resolveHref: t }) {
  return e.length ? /* @__PURE__ */ r("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ r("ol", { className: "lp-breadcrumbs__list", children: e.map((n, a) => {
    const c = a === e.length - 1, o = ft(n, t);
    return /* @__PURE__ */ r("li", { children: c || !o ? /* @__PURE__ */ r("span", { "aria-current": "page", children: n.label }) : /* @__PURE__ */ r("a", { href: o, children: n.label }) }, `${n.label}-${a}`);
  }) }) }) : /* @__PURE__ */ r("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const yt = ["info", "success", "warning", "error"];
function vt({ tone: e = "info", title: t, message: n }) {
  const a = yt.includes(e) ? e : "info";
  return /* @__PURE__ */ d(
    "aside",
    {
      className: `lp-callout lp-callout--${a}`,
      role: a === "error" ? "alert" : void 0,
      children: [
        t ? /* @__PURE__ */ r("strong", { children: t }) : null,
        n ? /* @__PURE__ */ r("p", { children: n }) : null
      ]
    }
  );
}
function bt({
  contextType: e = "assignment",
  heading: t = "Context",
  items: n = [],
  description: a = "",
  action: c
}) {
  const o = nt.includes(e) ? e : "assignment", l = `lp-context-${o}`;
  return /* @__PURE__ */ d(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${o}`,
      "aria-labelledby": l,
      "data-context-type": o,
      children: [
        /* @__PURE__ */ r("h2", { id: l, children: t }),
        n.length ? /* @__PURE__ */ r("dl", { className: "lp-meta-list", children: n.map((s) => /* @__PURE__ */ d("div", { children: [
          /* @__PURE__ */ r("dt", { children: s.label }),
          /* @__PURE__ */ r("dd", { children: s.value })
        ] }, `${s.label}:${s.value}`)) }) : null,
        a ? /* @__PURE__ */ r("p", { children: a }) : null,
        c != null && c.label && (c != null && c.href) ? /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: c.href, children: c.label }) }) : null
      ]
    }
  );
}
function Ke({
  heading: e = "Nothing to show yet",
  message: t = "Check again later.",
  action: n
}) {
  return /* @__PURE__ */ d("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ r("h2", { children: e }),
    /* @__PURE__ */ r("p", { children: t }),
    n != null && n.label && (n != null && n.href) ? /* @__PURE__ */ r("a", { className: "lp-button", href: n.href, children: n.label }) : null
  ] });
}
function _r({
  heading: e = "There is a problem",
  message: t = "Try again."
}) {
  return /* @__PURE__ */ d("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ r("h2", { children: e }),
    /* @__PURE__ */ r("p", { children: t })
  ] });
}
function Nt({
  items: e,
  currentId: t = "home",
  currentIds: n = [],
  brandTitle: a,
  brandTagline: c,
  homeHref: o,
  theme: l = null,
  actions: s,
  listId: m
}) {
  const i = xe(), h = m || `lp-navigation-list-${i}`, [p, f] = T(!1), y = new Set([t, ...n].filter(Boolean)), _ = e.find((g) => g.id === "home" && g.enabled !== !1), v = e.filter((g) => g.enabled !== !1);
  me(() => {
    function g(N) {
      N.key === "Escape" && f(!1);
    }
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, []);
  function A(g) {
    if (g.key === "Escape") {
      f(!1);
      const N = g.currentTarget.querySelector(".lp-navigation__toggle");
      N == null || N.focus();
    }
  }
  return /* @__PURE__ */ r("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: A, children: /* @__PURE__ */ d("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ d("a", { className: "lp-navigation__brand", href: o || (_ == null ? void 0 : _.path) || "./", children: [
      /* @__PURE__ */ r("span", { className: "lp-navigation__brand-title", children: a }),
      c ? /* @__PURE__ */ r("span", { className: "lp-navigation__brand-tagline", children: c }) : null
    ] }),
    /* @__PURE__ */ r(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": p,
        "aria-controls": h,
        "aria-label": p ? "Close main menu" : "Open main menu",
        onClick: () => f((g) => !g),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ r(
      "ul",
      {
        className: "lp-navigation__list",
        id: h,
        "data-open": p ? "true" : "false",
        children: v.map((g) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(
          "a",
          {
            className: "lp-navigation__link",
            href: g.path,
            "aria-current": y.has(g.id) ? "page" : void 0,
            onClick: () => f(!1),
            children: g.label
          }
        ) }, g.id))
      }
    ),
    l ? /* @__PURE__ */ d("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ r(
        "select",
        {
          "aria-label": "Theme preference",
          value: l.preference,
          onChange: (g) => l.onChange(g.target.value),
          children: l.modes.map((g) => /* @__PURE__ */ r("option", { value: g, children: g[0].toUpperCase() + g.slice(1) }, g))
        }
      )
    ] }) : null,
    s ? /* @__PURE__ */ r("div", { className: "lp-navigation__actions", children: s }) : null
  ] }) });
}
function Sr({
  brandTitle: e,
  brandTagline: t,
  navigation: n,
  currentId: a = "home",
  currentIds: c = [],
  theme: o = null,
  actions: l,
  breadcrumbs: s,
  resolveHref: m,
  pageHeader: i,
  footer: h,
  learnerHeader: p,
  notice: f,
  skipLabel: y = "Skip to main content",
  mainId: _ = "main-content",
  children: v
}) {
  const A = h && typeof h == "object" && "lines" in h ? h.lines.map((g) => /* @__PURE__ */ r("p", { children: g }, g)) : h;
  return /* @__PURE__ */ d("div", { className: "lp-shell", children: [
    /* @__PURE__ */ r("a", { className: "lp-skip-link skip-link", href: `#${_}`, children: y }),
    /* @__PURE__ */ r("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ r(
      Nt,
      {
        items: n,
        currentId: a,
        currentIds: c,
        brandTitle: e,
        brandTagline: t,
        theme: o,
        actions: l
      }
    ) }),
    /* @__PURE__ */ r("div", { className: "lp-shell__learner", children: p }),
    f,
    s ? /* @__PURE__ */ r(gt, { items: s, resolveHref: m }) : null,
    i != null && i.title ? /* @__PURE__ */ d("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ r("h1", { children: i.title }),
      i.subtitle ? /* @__PURE__ */ r("p", { className: "lp-page-header__subtitle", children: i.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ r("main", { id: _, className: "lp-shell__main site-main", tabIndex: -1, children: v }),
    /* @__PURE__ */ r("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: A })
  ] });
}
function wr({
  learner: e,
  hubName: t,
  accountHref: n = "./account/",
  onSignOut: a
}) {
  return e ? /* @__PURE__ */ d("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ d("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Learner" }),
        /* @__PURE__ */ r("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Year group" }),
        /* @__PURE__ */ r("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Email" }),
        /* @__PURE__ */ r("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Current hub" }),
        /* @__PURE__ */ r("dd", { children: t })
      ] })
    ] }),
    /* @__PURE__ */ d("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ r("a", { href: n, children: "Account" }),
      a ? /* @__PURE__ */ r("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        a();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ r("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function Ct({ id: e, title: t }) {
  const n = [e, t].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ r("span", { className: "lp-outcome-badge", children: n });
}
function Ar({ message: e = "Loading…" }) {
  return /* @__PURE__ */ d("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ r("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ r("span", { children: e })
  ] });
}
function kt({
  title: e = "Progress",
  completed: t = 0,
  total: n = 0,
  description: a = ""
}) {
  const c = Math.max(0, Number(n) || 0), o = Math.min(c, Math.max(0, Number(t) || 0)), l = c ? Math.round(o / c * 100) : 0;
  return /* @__PURE__ */ d("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ r("h2", { children: e }),
    a ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: a }) : null,
    /* @__PURE__ */ r(
      "progress",
      {
        className: "lp-progress",
        max: c || 1,
        value: o,
        "aria-label": `${l}% complete`
      }
    ),
    /* @__PURE__ */ r("p", { children: `${o} of ${c} complete (${l}%)` })
  ] });
}
function _t({
  id: e,
  title: t,
  kind: n = "session",
  summary: a = "",
  defaultOpen: c = !1,
  meta: o,
  children: l
}) {
  const s = it(n) ? n : "session", m = Le[s];
  return /* @__PURE__ */ d("details", { className: "lp-session lp-panel", id: e, "data-kind": s, open: c, children: [
    /* @__PURE__ */ r("summary", { className: "lp-session__summary", children: /* @__PURE__ */ d("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ r("h2", { className: "lp-session__heading", children: t || m }),
      /* @__PURE__ */ r("span", { className: "lp-session__meta", children: o || m })
    ] }) }),
    /* @__PURE__ */ d("div", { className: "lp-session__content", children: [
      a ? /* @__PURE__ */ r("p", { className: "lp-panel-note", children: a }) : null,
      /* @__PURE__ */ r("div", { className: "lp-activity-list", children: l })
    ] })
  ] });
}
function St({
  teachingWeek: e,
  title: t = "",
  subtitle: n = "",
  status: a,
  learningOutcomes: c = [],
  headingLevel: o = 1,
  showTitle: l = !0
}) {
  const s = e ? `Week ${e}${t ? `: ${t}` : ""}` : t || "Week";
  return /* @__PURE__ */ d("header", { className: "lp-week-header", children: [
    a ? /* @__PURE__ */ r(_e, { status: a }) : null,
    l ? /* @__PURE__ */ r(o === 2 ? "h2" : "h1", { children: s }) : e ? /* @__PURE__ */ r("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    n ? /* @__PURE__ */ r("p", { className: "lp-week-header__subtitle", children: n }) : null,
    c.length ? /* @__PURE__ */ r("ul", { className: "lp-week-header__outcomes", children: c.map((i) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(Ct, { id: i.id, title: i.title }) }, i.id || i.title)) }) : null
  ] });
}
function wt({ previousWeek: e, nextWeek: t }) {
  return !(e != null && e.href) && !(t != null && t.href) ? null : /* @__PURE__ */ r("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ d("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    t != null && t.href ? /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: t.href, rel: "next", children: t.label || "Next week" }) }) : null
  ] }) });
}
function At({ html: e, className: t, ...n }) {
  const a = e == null ? "" : String(e);
  return et(a) ? /* @__PURE__ */ r("div", { className: t, "data-lp-html-rejected": "true", ...n }) : /* @__PURE__ */ r("div", { className: t, dangerouslySetInnerHTML: { __html: a }, ...n });
}
function It(e) {
  if (e.meta) return e.meta;
  const t = (e.activities || []).length, n = `${t} ${t === 1 ? "activity" : "activities"}`, a = Le[e.kind || "session"] || Le.session;
  return e.kind && e.kind !== "session" ? `${a} · ${n}` : n;
}
function Tt(e, t) {
  return "html" in e && e.html ? /* @__PURE__ */ r(
    At,
    {
      className: "lp-activity-html",
      html: e.html
    },
    t
  ) : "children" in e && e.children ? /* @__PURE__ */ r("div", { children: e.children }, t) : /* @__PURE__ */ r(ht, { ...e }, t);
}
function Ir({
  week: e = {},
  learningOutcomes: t = [],
  context: n = null,
  sessions: a = [],
  progress: c = null,
  previousWeek: o,
  nextWeek: l,
  features: s = {},
  renderActivity: m
}) {
  const i = st(s), h = (n == null ? void 0 : n.type) || (n == null ? void 0 : n.contextType), p = a.filter((y) => !(i.showIndependentStudy === !1 && ot(y.kind))), f = m || Tt;
  return /* @__PURE__ */ d("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ r(
      St,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: i.showLearningOutcomes ? t : [],
        headingLevel: e.headingLevel || 1,
        showTitle: i.showTitle !== !1
      }
    ),
    n && lt(i, h) ? /* @__PURE__ */ r(
      bt,
      {
        contextType: h,
        heading: n.heading,
        items: n.items,
        description: n.description,
        action: n.action
      }
    ) : null,
    p.length ? p.map((y) => /* @__PURE__ */ r(
      _t,
      {
        id: y.id,
        title: y.title,
        kind: y.kind,
        summary: y.summary,
        defaultOpen: y.defaultOpen,
        meta: It(y),
        children: (y.activities || []).map((_, v) => f(_, v))
      },
      y.id || y.title
    )) : /* @__PURE__ */ r(
      Ke,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    i.showProgress && c ? /* @__PURE__ */ r(kt, { ...c }) : null,
    /* @__PURE__ */ r(wt, { previousWeek: o, nextWeek: l })
  ] });
}
const ge = {
  plannedHeading: "Week not available yet",
  plannedMessage: "This week has not been made available by your teacher.",
  archivedHeading: "Week not available",
  archivedMessage: "This week is no longer available to learners.",
  inaccessibleHeading: "Week not available",
  inaccessibleMessage: "This week is not available."
};
function Fe(e) {
  var t;
  return String(e.status ?? ((t = e.metadata) == null ? void 0 : t.status) ?? "").trim();
}
function Ue(e) {
  return rt(Fe(e));
}
function Et(e) {
  const t = e.toLowerCase();
  return t === "planned" ? {
    heading: ge.plannedHeading,
    message: ge.plannedMessage
  } : t === "archived" ? {
    heading: ge.archivedHeading,
    message: ge.archivedMessage
  } : {
    heading: ge.inaccessibleHeading,
    message: ge.inaccessibleMessage
  };
}
function xt({ href: e, children: t, className: n }) {
  return /* @__PURE__ */ r("a", { className: n, href: e, children: t });
}
function Tr({
  week: e,
  href: t,
  children: n,
  className: a = "lp-text-link",
  lockedClassName: c = "lp-week-access-link lp-week-access-link--locked",
  renderLink: o = xt
}) {
  if (Ue(e))
    return o({ href: t, children: n, className: a });
  const l = Fe(e);
  return /* @__PURE__ */ d("span", { className: c, "aria-disabled": "true", children: [
    /* @__PURE__ */ r("span", { className: "lp-week-access-link__label", children: n }),
    " ",
    /* @__PURE__ */ r(_e, { status: l || "planned" })
  ] });
}
function Er({ week: e, children: t, fallback: n }) {
  if (Ue(e))
    return t;
  if (n != null)
    return n;
  const a = Fe(e), c = Et(a);
  return /* @__PURE__ */ d("div", { className: "lp-week-access-guard", children: [
    /* @__PURE__ */ r(_e, { status: a || "planned" }),
    /* @__PURE__ */ r(Ke, { heading: c.heading, message: c.message })
  ] });
}
const Mt = ["neutral", "correct", "incorrect", "informative", "hint"], $t = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function ye({
  state: e = "neutral",
  title: t,
  message: n
}) {
  const a = Mt.includes(e) ? e : "neutral", c = $t[a];
  return !n && !t ? null : /* @__PURE__ */ r("div", { className: "lp-feedback", "data-lp-feedback-state": a, "data-lp-feedback": !0, children: /* @__PURE__ */ r(vt, { tone: c.tone, title: t || c.label, message: n }) });
}
const Pe = "Your answer could not be checked. Please try again.", Lt = "Your response has been recorded for review.";
function fe(e) {
  return typeof e == "function";
}
function Me(e) {
  if (e && typeof e == "object" && "learnerMessage" in e) {
    const t = String(e.learnerMessage || "").trim();
    if (t) return t;
  }
  return Pe;
}
function Ve() {
  return async () => {
    throw Object.assign(new Error(Pe), {
      code: "MARKING_UNAVAILABLE",
      learnerMessage: Pe
    });
  };
}
function ve(e) {
  return !e.checked || e.serverCanRetry === !1 ? !1 : e.serverCanRetry === !0 ? !0 : e.localRetry && (typeof e.localMaxAttempts != "number" || e.attempts < e.localMaxAttempts);
}
function Se(e, t, n) {
  return !!(e && t && !fe(n));
}
function we(e, t, n = "Your response has been recorded.") {
  return e.requiresReview || e.status === "review" ? {
    status: "informative",
    message: Lt,
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
    message: n,
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
const ke = "Your answer was recorded.";
function Ee(e) {
  if (!e.checked || !e.hasResponse) return null;
  const t = we(
    { completed: !0, correct: e.correct ?? null },
    e.feedback,
    e.recordedMessage || ke
  );
  return {
    status: t.status,
    message: t.message,
    serverCorrect: t.correct
  };
}
function be(e, t, n) {
  return {
    completed: e.completed,
    correct: e.correct,
    score: e.score,
    attempts: t,
    responses: n,
    requiresReview: e.requiresReview,
    status: e.requiresReview ? "review" : e.correct === !0 ? "correct" : e.correct === !1 ? "incorrect" : "recorded",
    itemResults: e.itemResults,
    canRetry: e.canRetry,
    checkNumber: e.checkNumber,
    remainingAttempts: e.remainingAttempts
  };
}
async function Be(e, t, n, a = "Your response has been recorded.") {
  try {
    return {
      ok: !0,
      marked: we(await e(t), n, a)
    };
  } catch (c) {
    return { ok: !1, message: Me(c) };
  }
}
const Pt = /^(correctOptionId|correctCategoryId|correctValues|answerKey|markScheme|modelAnswer|correctOptions|correctOrder|spec)$/;
function Re(e) {
  if (Array.isArray(e)) return e.map(Re);
  if (!e || typeof e != "object") return e;
  const t = {};
  for (const [n, a] of Object.entries(e))
    Pt.test(n) || n === "correct" && a && typeof a == "object" || (t[n] = Re(a));
  return t;
}
function Rt(e) {
  return Re(e);
}
function Ot(e, t) {
  if (!e || typeof e != "object") return;
  const n = e.marking;
  if (!n || typeof n.markBlock != "function")
    return Ve();
  const a = n.markBlock;
  return (c) => a({
    activityKey: t.id,
    activityVersion: c.activityVersion,
    block: Rt(c.block),
    responses: c.responses,
    sourcePage: typeof window < "u" ? window.location.pathname : void 0
  });
}
function Ae(e, t) {
  const n = e.slice();
  if (!t || n.length < 2) return n;
  for (let a = n.length - 1; a > 0; a -= 1) {
    const c = Math.floor(Math.random() * (a + 1)), o = n[a];
    n[a] = n[c], n[c] = o;
  }
  return n;
}
function Ie(e) {
  const t = !!(e.initialChecked && e.hasResponse), n = Ee({
    checked: t,
    hasResponse: e.hasResponse,
    correct: e.initialCorrect,
    feedback: e.feedback,
    recordedMessage: ke
  }), a = Oe("idle"), [c, o] = T((n == null ? void 0 : n.status) || "neutral"), [l, s] = T((n == null ? void 0 : n.message) || ""), [m, i] = T((n == null ? void 0 : n.serverCorrect) ?? null), [h, p] = T(e.initialCanRetry);
  return me(() => {
    if (a.current === "live" || a.current === "retry" || !e.initialChecked || !e.hasResponse) return;
    const f = Ee({
      checked: !0,
      hasResponse: !0,
      correct: e.initialCorrect,
      feedback: e.feedback,
      recordedMessage: ke
    });
    f && (o(f.status), s(f.message), i(f.serverCorrect), typeof e.initialCanRetry == "boolean" && p(e.initialCanRetry), (f.status === "correct" || f.status === "incorrect" || f.status === "informative") && (a.current = "restored"));
  }, [
    e.feedback,
    e.hasResponse,
    e.initialCanRetry,
    e.initialChecked,
    e.initialCorrect
  ]), {
    status: c,
    message: l,
    serverCorrect: m,
    serverCanRetry: h,
    setStatus: o,
    setMessage: s,
    setServerCorrect: i,
    setServerCanRetry: p,
    markLive: () => {
      a.current = "live";
    },
    markRetry: () => {
      a.current = "retry";
    }
  };
}
function qe(e) {
  return e == null ? !1 : typeof e == "string" || Array.isArray(e) ? e.length > 0 : typeof e == "object" ? Object.keys(e).length > 0 : !0;
}
function je(e, t) {
  const [n, a] = T(qe(e) ? e : t);
  return me(() => {
    qe(e) && a(e);
  }, [e]), [n, a];
}
function Ne(e, t) {
  const [n, a] = T(!!(e && t));
  return me(() => {
    e && t && a(!0);
  }, [t, e]), [n, a];
}
function Ce(e) {
  return e.label || e.text || e.id;
}
function Ft(e, t, n, a, c, o, l, s) {
  if (!n) return "Placed";
  if (o) {
    const m = l == null ? void 0 : l.find((i) => i.itemId === e);
    return (m == null ? void 0 : m.correct) === !0 ? "Correct" : (m == null ? void 0 : m.correct) === !1 ? "Incorrect" : s || m != null && m.requiresReview ? "Recorded" : "Placed";
  }
  return a ? c[e] === t ? "Correct" : "Incorrect" : "Placed";
}
function Bt({
  id: e = "classification",
  title: t,
  prompt: n,
  instructions: a,
  items: c,
  categories: o,
  feedback: l,
  formative: s = !0,
  retry: m = !0,
  shuffle: i = !1,
  maxAttempts: h,
  initialAssignments: p = {},
  initialChecked: f = !1,
  initialCorrect: y,
  initialCanRetry: _,
  onMarkResponse: v,
  onResult: A
}) {
  const g = ue(() => Ae(c, i), [c, i]), [N, x] = je(p, {}), [R, Y] = T(null), [W, V] = T(0), G = c.length > 0 && c.every((u) => p[u.id]), [H, w] = Ne(f, G), [U, X] = T(!1), K = c.length > 0 && c.every((u) => N[u.id]), {
    status: z,
    message: O,
    serverCanRetry: Z,
    setStatus: F,
    setMessage: ne,
    setServerCorrect: ae,
    setServerCanRetry: B,
    markLive: j,
    markRetry: D
  } = Ie({
    initialChecked: f,
    hasResponse: K,
    initialCorrect: y,
    initialCanRetry: _,
    feedback: l
  }), [q, J] = T(), [Q, ee] = T(!1), ce = Object.fromEntries(
    c.filter((u) => u.correctCategoryId).map((u) => [u.id, u.correctCategoryId])
  ), C = fe(v), M = Se(s, Object.keys(ce).length > 0, v), b = H || U, E = ve({
    checked: H,
    localRetry: m,
    localMaxAttempts: h,
    attempts: W,
    serverCanRetry: Z
  }), k = g.filter((u) => !N[u.id]), te = g.find((u) => u.id === R);
  function L(u) {
    A == null || A(u);
  }
  function se(u, P) {
    x((I) => ({ ...I, [u]: P })), Y(null);
  }
  function $(u) {
    Y((P) => P === u ? null : u);
  }
  function le(u) {
    R && se(R, u);
  }
  function S(u) {
    x((P) => {
      const I = { ...P };
      return delete I[u], I;
    }), Y(null);
  }
  async function oe() {
    if (U) return;
    if (!c.every((ie) => N[ie.id])) {
      F("informative"), ne("Place every item in a category before checking.");
      return;
    }
    const P = W + 1, I = { ...N };
    if (C && v) {
      X(!0), F("informative"), ne("Checking your answer…");
      try {
        const ie = we(
          await v(I),
          l,
          "Your categories have been recorded."
        );
        j(), V(P), w(!0), J(ie.itemResults), ee(ie.requiresReview), ae(ie.correct), B(ie.canRetry), F(ie.status), ne(ie.message), L(be(ie, P, I));
      } catch (ie) {
        w(!1), J(void 0), ee(!1), ae(null), B(!1), F("informative"), ne(Me(ie)), L({
          completed: !1,
          correct: null,
          attempts: P,
          responses: I,
          status: "error"
        });
      } finally {
        X(!1);
      }
      return;
    }
    const de = M ? c.filter((ie) => N[ie.id] === ce[ie.id]).length : 0, pe = M ? de === c.length : null;
    j(), V(P), w(!0), J(void 0), ee(!1), ae(null), F(pe === !0 ? "correct" : pe === !1 ? "incorrect" : "informative"), ne(M ? pe ? (l == null ? void 0 : l.correct) || "Those items match the expected categories." : (l == null ? void 0 : l.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), L({
      completed: !0,
      correct: pe,
      score: M ? { correct: de, total: c.length } : void 0,
      attempts: P,
      responses: I
    });
  }
  function re() {
    D(), x({}), Y(null), w(!1), X(!1), J(void 0), ee(!1), ae(null), B(void 0), F("neutral"), ne(""), L({ completed: !1, correct: null, attempts: W, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "classification",
      "data-lp-block-id": e,
      "aria-busy": U || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        a ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: te ? `Selected: ${Ce(te)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: b, children: [
          /* @__PURE__ */ r("legend", { children: n }),
          /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "Items" }),
          /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
            k.map((u) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": R === u.id,
                onClick: () => $(u.id),
                children: [
                  Ce(u),
                  R === u.id ? " (selected)" : ""
                ]
              },
              u.id
            )),
            k.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: o.map((u) => {
            const P = g.filter((I) => N[I.id] === u.id);
            return /* @__PURE__ */ d("div", { className: "lp-card", children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("strong", { children: u.label }) }),
              /* @__PURE__ */ r("ul", { className: "lp-activity-list", children: P.map((I) => {
                const de = Ft(
                  I.id,
                  u.id,
                  H,
                  M,
                  ce,
                  C,
                  q,
                  Q
                );
                return /* @__PURE__ */ r("li", { children: /* @__PURE__ */ d(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    onClick: () => S(I.id),
                    children: [
                      Ce(I),
                      " · ",
                      de,
                      b ? "" : " · Return"
                    ]
                  }
                ) }, I.id);
              }) }),
              P.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "No items yet" }) : null,
              /* @__PURE__ */ d(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  disabled: !R,
                  onClick: () => le(u.id),
                  children: [
                    "Place in ",
                    Ce(u)
                  ]
                }
              )
            ] }, u.id);
          }) }),
          /* @__PURE__ */ d("details", { children: [
            /* @__PURE__ */ r("summary", { children: "Use dropdown lists instead" }),
            g.map((u) => /* @__PURE__ */ d("p", { className: "lp-form__field", children: [
              /* @__PURE__ */ r("label", { htmlFor: `${e}-${u.id}`, children: Ce(u) }),
              /* @__PURE__ */ d(
                "select",
                {
                  id: `${e}-${u.id}`,
                  "data-lp-item": u.id,
                  value: N[u.id] || "",
                  disabled: b,
                  onChange: (P) => {
                    const I = P.target.value;
                    x((de) => {
                      const pe = { ...de };
                      return I ? pe[u.id] = I : delete pe[u.id], pe;
                    }), Y(null);
                  },
                  children: [
                    /* @__PURE__ */ r("option", { value: "", children: "Select a category" }),
                    o.map((P) => /* @__PURE__ */ r("option", { value: P.id, children: P.label }, P.id))
                  ]
                }
              )
            ] }, `list-${u.id}`))
          ] })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void oe(), disabled: b, children: U ? "Checking…" : "Check types" }),
          E ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: re, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ye, { state: z, message: O })
      ]
    }
  );
}
function jt(e) {
  return !!(e && Object.keys(e).length);
}
function Ge(e = {}) {
  const [t, n] = T({ ...e }), [a, c] = T(null);
  me(() => {
    jt(e) && n({ ...e });
  }, [e]);
  const o = Te((i, h = t) => Object.keys(h).find((p) => h[p] === i) || null, [t]), l = Te((i) => {
    c((h) => h === i ? null : i);
  }, []), s = Te((i) => {
    if (!a) {
      const p = o(i);
      p && c(p);
      return;
    }
    const h = a;
    n((p) => {
      const f = { ...p }, y = Object.keys(f).find((_) => f[_] === i);
      return y && delete f[y], f[h] = i, f;
    }), c(null);
  }, [o, a]), m = Te(() => {
    n({}), c(null);
  }, []);
  return { placements: t, selectedItemId: a, selectItem: l, selectTarget: s, occupantOf: o, reset: m };
}
function Dt({
  id: e = "drag-drop",
  title: t,
  prompt: n,
  instructions: a,
  items: c,
  targets: o,
  correct: l = {},
  feedback: s,
  formative: m = !0,
  retry: i = !0,
  shuffle: h = !1,
  maxAttempts: p,
  initialPlacements: f = {},
  initialChecked: y = !1,
  initialCorrect: _,
  initialCanRetry: v,
  onMarkResponse: A,
  onResult: g
}) {
  var se;
  const N = ue(() => Ae(c, h), [c, h]), { placements: x, selectedItemId: R, selectItem: Y, selectTarget: W, occupantOf: V, reset: G } = Ge(f), [H, w] = T(0), U = c.length > 0 && c.every(($) => f[$.id]), [X, K] = Ne(y, U), [z, O] = T(!1), Z = c.length > 0 && c.every(($) => x[$.id]), {
    status: F,
    message: ne,
    serverCanRetry: ae,
    setStatus: B,
    setMessage: j,
    setServerCorrect: D,
    setServerCanRetry: q,
    markLive: J,
    markRetry: Q
  } = Ie({
    initialChecked: y,
    hasResponse: Z,
    initialCorrect: _,
    initialCanRetry: v,
    feedback: s
  }), ee = fe(A), ce = Se(m, Object.keys(l).length > 0, A), C = X || z, M = ve({
    checked: X,
    localRetry: i,
    localMaxAttempts: p,
    attempts: H,
    serverCanRetry: ae
  }), b = N.filter(($) => !x[$.id]), E = (se = N.find(($) => $.id === R)) == null ? void 0 : se.label;
  function k($) {
    g == null || g($);
  }
  async function te() {
    if (z) return;
    if (!c.every((u) => x[u.id])) {
      B("informative"), j("Place every item before checking.");
      return;
    }
    const le = H + 1, S = { ...x };
    if (ee && A) {
      O(!0), B("informative"), j("Checking your answer…");
      const u = await Be(
        A,
        S,
        s,
        "Your placements have been recorded."
      );
      if (O(!1), !u.ok) {
        K(!1), D(null), q(!1), B("informative"), j(u.message), k({ completed: !1, correct: null, attempts: le, responses: S, status: "error" });
        return;
      }
      J(), w(le), K(!0), D(u.marked.correct), q(u.marked.canRetry), B(u.marked.status), j(u.marked.message), k(be(u.marked, le, S));
      return;
    }
    const oe = ce ? c.filter((u) => x[u.id] === l[u.id]).length : 0, re = ce ? oe === c.length : null;
    J(), w(le), K(!0), D(null), B(re === !0 ? "correct" : re === !1 ? "incorrect" : "informative"), j(ce ? re ? (s == null ? void 0 : s.correct) || "Those placements match the expected targets." : (s == null ? void 0 : s.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), k({
      completed: !0,
      correct: re,
      score: ce ? { correct: oe, total: c.length } : void 0,
      attempts: le,
      responses: S
    });
  }
  function L() {
    Q(), G(), K(!1), O(!1), D(null), q(void 0), B("neutral"), j(""), k({ completed: !1, correct: null, attempts: H, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "drag-drop",
      "data-lp-block-id": e,
      "aria-busy": z || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        a ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ r("p", { children: n }),
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: E ? `Selected: ${E}. Choose a target.` : "Select an item, then select a target to place it." }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: C, children: [
          /* @__PURE__ */ r("legend", { children: "Items" }),
          /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
            b.map(($) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": R === $.id,
                onClick: () => Y($.id),
                children: [
                  $.label,
                  R === $.id ? " (selected)" : ""
                ]
              },
              $.id
            )),
            b.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: C, children: [
          /* @__PURE__ */ r("legend", { children: "Targets" }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: o.map(($) => {
            const le = V($.id), S = c.find((re) => re.id === le), oe = X && ce && le && !ee ? l[le] === $.id ? "Correct" : "Incorrect" : S ? "Placed" : "Empty";
            return /* @__PURE__ */ d("div", { className: "lp-card", children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("strong", { children: $.label }) }),
              /* @__PURE__ */ d("p", { className: "lp-card__meta", children: [
                S ? S.label : "No item yet",
                " · ",
                oe
              ] }),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  onClick: () => W($.id),
                  children: S ? `Place on ${$.label} (replace ${S.label})` : `Place on ${$.label}`
                }
              )
            ] }, $.id);
          }) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void te(), disabled: C, children: z ? "Checking…" : "Check placement" }),
          M ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: L, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ye, { state: F, message: ne })
      ]
    }
  );
}
function qt({
  id: e = "option-cards",
  title: t,
  prompt: n,
  instructions: a,
  options: c,
  correctOptionId: o,
  feedback: l,
  formative: s = !0,
  retry: m = !0,
  shuffle: i = !1,
  maxAttempts: h,
  initialSelectedId: p,
  initialChecked: f = !1,
  initialCorrect: y,
  initialCanRetry: _,
  onMarkResponse: v,
  onResult: A
}) {
  const g = ue(() => Ae(c, i), [c, i]), [N, x] = je(p || null, null), [R, Y] = T(0), [W, V] = Ne(f, !!p), [G, H] = T(!1), w = Ee({
    checked: !!(f && p),
    hasResponse: !!p,
    correct: y,
    feedback: l,
    recordedMessage: ke
  }), U = Oe("idle"), [X, K] = T((w == null ? void 0 : w.status) || "neutral"), [z, O] = T((w == null ? void 0 : w.message) || ""), [Z, F] = T((w == null ? void 0 : w.serverCorrect) ?? null), [ne, ae] = T(_);
  me(() => {
    if (U.current === "live" || U.current === "retry" || !f || !N) return;
    const C = Ee({
      checked: !0,
      hasResponse: !0,
      correct: y,
      feedback: l,
      recordedMessage: ke
    });
    C && (K(C.status), O(C.message), F(C.serverCorrect), typeof _ == "boolean" && ae(_), (C.status === "correct" || C.status === "incorrect") && (U.current = "restored"));
  }, [l, _, f, y, N]);
  const B = fe(v), j = Se(s, !!o, v), D = `lp-option-cards-${e}`, q = W || G, J = ve({
    checked: W,
    localRetry: m,
    localMaxAttempts: h,
    attempts: R,
    serverCanRetry: ne
  });
  function Q(C) {
    A == null || A(C);
  }
  async function ee() {
    if (G) return;
    if (!N) {
      K("informative"), O("Choose an option before checking.");
      return;
    }
    const C = R + 1, M = { optionId: N };
    if (B && v) {
      H(!0), K("informative"), O("Checking your answer…");
      try {
        const k = we(await v(M), l, "Your choice has been recorded.");
        U.current = "live", Y(C), V(!0), F(k.correct), ae(k.canRetry), K(k.status), O(k.message), Q(be(k, C, M));
      } catch (k) {
        V(!1), F(null), ae(!1), K("informative"), O(Me(k)), Q({
          completed: !1,
          correct: null,
          attempts: C,
          responses: M,
          status: "error"
        });
      } finally {
        H(!1);
      }
      return;
    }
    const b = j ? N === o : null, E = j ? b ? (l == null ? void 0 : l.correct) || "That matches the expected option." : (l == null ? void 0 : l.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    Y(C), V(!0), U.current = "live", F(null), K(b === !0 ? "correct" : b === !1 ? "incorrect" : "informative"), O(E), Q({
      completed: !0,
      correct: b,
      score: j ? { correct: b ? 1 : 0, total: 1 } : void 0,
      attempts: C,
      responses: M
    });
  }
  function ce() {
    U.current = "retry", x(null), V(!1), H(!1), F(null), ae(void 0), K("neutral"), O(""), Q({
      completed: !1,
      correct: null,
      attempts: R,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "option-cards",
      "data-lp-block-id": e,
      "aria-busy": G || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        a ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: q, children: [
          /* @__PURE__ */ r("legend", { children: n }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: g.map((C) => {
            const M = N === C.id, te = W && j && M || W && B && M && Z !== null ? (B ? Z === !0 : C.id === o) ? "Correct" : "Incorrect" : M ? "Selected" : "";
            return /* @__PURE__ */ d("label", { className: "lp-card lp-activity-card", children: [
              /* @__PURE__ */ r(
                "input",
                {
                  type: "radio",
                  name: D,
                  value: C.id,
                  checked: M,
                  "data-lp-response": "",
                  onChange: () => x(C.id)
                }
              ),
              /* @__PURE__ */ d("span", { children: [
                /* @__PURE__ */ r("strong", { children: C.label }),
                C.description ? /* @__PURE__ */ d("span", { className: "lp-card__meta", children: [
                  " — ",
                  C.description
                ] }) : null
              ] }),
              C.imageSrc ? /* @__PURE__ */ r("img", { src: C.imageSrc, alt: C.imageAlt || C.label }) : null,
              te ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: te }) : null
            ] }, C.id);
          }) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void ee(), disabled: q, children: G ? "Checking…" : "Check answer" }),
          J ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: ce, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ye, { state: X, message: z })
      ]
    }
  );
}
function Yt(e, t) {
  var s;
  const n = [], a = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let c = 0, o = 0, l;
  for (; (l = a.exec(e)) !== null; ) {
    l.index > c && n.push(e.slice(c, l.index));
    const m = l[1] || ((s = t[o]) == null ? void 0 : s.id) || `gap-${o + 1}`;
    o += 1, n.push({ gapId: m }), c = l.index + l[0].length;
  }
  return c < e.length && n.push(e.slice(c)), !n.some((m) => typeof m != "string") && t[0] && (n.push(" "), n.push({ gapId: t[0].id })), n;
}
function Ht(e, t, n) {
  if (!e || !Object.keys(e).length) return {};
  const a = new Set(t.map((s) => s.id)), c = new Set(n.map((s) => s.id)), o = Object.keys(e), l = Object.values(e).map(String);
  if (o.every((s) => c.has(s)) && l.every((s) => a.has(s)))
    return { ...e };
  if (o.every((s) => a.has(s)) && l.every((s) => c.has(s))) {
    const s = {};
    for (const [m, i] of Object.entries(e))
      s[String(i)] = m;
    return s;
  }
  return { ...e };
}
function Kt({
  id: e = "phrase-completion",
  title: t,
  prompt: n,
  instructions: a,
  gaps: c,
  options: o,
  correctOptionId: l,
  feedback: s,
  formative: m = !0,
  retry: i = !0,
  shuffle: h = !1,
  maxAttempts: p,
  initialPlacements: f = {},
  initialChecked: y = !1,
  initialCorrect: _,
  initialCanRetry: v,
  onMarkResponse: A,
  onResult: g
}) {
  var le;
  const N = ue(() => c && c.length ? c : [{ id: "gap", label: "missing term", correctOptionId: l || void 0 }], [l, c]), x = ue(() => Ae(o, h), [o, h]), R = ue(() => Yt(n, N), [n, N]), Y = ue(
    () => Ht(f, N, o),
    [f, o, N]
  ), { placements: W, selectedItemId: V, selectItem: G, selectTarget: H, occupantOf: w, reset: U } = Ge(Y), [X, K] = T(0), [z, O] = Ne(y, Object.keys(Y).length > 0), [Z, F] = T(!1), ne = N.length > 0 && N.every((S) => !!w(S.id)), {
    status: ae,
    message: B,
    serverCanRetry: j,
    setStatus: D,
    setMessage: q,
    setServerCorrect: J,
    setServerCanRetry: Q,
    markLive: ee,
    markRetry: ce
  } = Ie({
    initialChecked: y,
    hasResponse: ne,
    initialCorrect: _,
    initialCanRetry: v,
    feedback: s
  }), C = Object.fromEntries(
    N.map((S) => [S.id, S.correctOptionId]).filter((S) => S[1])
  ), M = Se(m, Object.keys(C).length > 0, A), b = z || Z, E = ve({
    checked: z,
    localRetry: i,
    localMaxAttempts: p,
    attempts: X,
    serverCanRetry: j
  }), k = x.filter((S) => !W[S.id]), te = (le = o.find((S) => S.id === V)) == null ? void 0 : le.label;
  function L(S) {
    g == null || g(S);
  }
  async function se() {
    if (Z) return;
    if (!N.every((I) => w(I.id))) {
      D("informative"), q("Fill every blank before checking.");
      return;
    }
    const oe = X + 1, re = {};
    if (N.forEach((I) => {
      const de = w(I.id);
      de && (re[I.id] = de);
    }), fe(A) && A) {
      F(!0), D("informative"), q("Checking your answer…");
      const I = await Be(
        A,
        re,
        s,
        "Your phrase has been recorded."
      );
      if (F(!1), !I.ok) {
        O(!1), J(null), Q(!1), D("informative"), q(I.message), L({ completed: !1, correct: null, attempts: oe, responses: re, status: "error" });
        return;
      }
      ee(), K(oe), O(!0), J(I.marked.correct), Q(I.marked.canRetry), D(I.marked.status), q(I.marked.message), L(be(I.marked, oe, re));
      return;
    }
    const u = M ? N.filter((I) => re[I.id] === C[I.id]).length : 0, P = M ? u === N.length : null;
    ee(), K(oe), O(!0), J(null), D(P === !0 ? "correct" : P === !1 ? "incorrect" : "informative"), q(M ? P ? (s == null ? void 0 : s.correct) || "That completes the phrase." : (s == null ? void 0 : s.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), L({
      completed: !0,
      correct: P,
      score: M ? { correct: u, total: N.length } : void 0,
      attempts: oe,
      responses: re
    });
  }
  function $() {
    ce(), U(), O(!1), F(!1), J(null), Q(void 0), D("neutral"), q(""), L({ completed: !1, correct: null, attempts: X, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "fill-gap",
      "data-lp-block-id": e,
      "aria-busy": Z || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        a ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: te ? `Selected: ${te}. Choose a blank.` : "Select a phrase, then select the blank." }),
        /* @__PURE__ */ r("p", { children: R.map((S, oe) => {
          if (typeof S == "string") return /* @__PURE__ */ r("span", { children: S }, `text-${oe}`);
          const re = w(S.gapId), u = o.find((de) => de.id === re), P = N.find((de) => de.id === S.gapId), I = z && M && re ? C[S.gapId] === re ? "Correct" : "Incorrect" : u ? "Filled" : "Blank";
          return /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              disabled: b,
              "aria-label": `${(P == null ? void 0 : P.label) || "blank"}: ${(u == null ? void 0 : u.label) || "empty"}. ${I}`,
              onClick: () => H(S.gapId),
              children: (u == null ? void 0 : u.label) || "______"
            },
            S.gapId
          );
        }) }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: b, children: [
          /* @__PURE__ */ r("legend", { children: "Available phrases" }),
          /* @__PURE__ */ r("div", { className: "lp-card__actions", children: k.map((S) => /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              className: "lp-button",
              "aria-pressed": V === S.id,
              onClick: () => G(S.id),
              children: [
                S.label,
                V === S.id ? " (selected)" : ""
              ]
            },
            S.id
          )) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void se(), disabled: b, children: Z ? "Checking…" : "Check phrase" }),
          E ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: $, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ye, { state: ae, message: B })
      ]
    }
  );
}
function Ut({
  id: e = "sequence",
  title: t,
  prompt: n,
  instructions: a,
  items: c,
  correctOrder: o = [],
  feedback: l,
  formative: s = !0,
  retry: m = !0,
  shuffle: i = !1,
  maxAttempts: h,
  initialOrder: p,
  initialChecked: f = !1,
  initialCorrect: y,
  initialCanRetry: _,
  onMarkResponse: v,
  onResult: A
}) {
  const g = ue(() => Ae(c, i), [c, i]), N = ue(() => {
    if (!Array.isArray(p) || !p.length) return g;
    const b = new Map(c.map((k) => [k.id, k])), E = p.map((k) => b.get(k)).filter(Boolean);
    return E.length === c.length ? E : g;
  }, [g, p, c]), [x, R] = T(N);
  me(() => {
    !Array.isArray(p) || !p.length || R(N);
  }, [p, N]);
  const [Y, W] = T(0), [V, G] = Ne(f, !!(p != null && p.length)), [H, w] = T(!1), U = x.length > 0, {
    status: X,
    message: K,
    serverCanRetry: z,
    setStatus: O,
    setMessage: Z,
    setServerCorrect: F,
    setServerCanRetry: ne,
    markLive: ae,
    markRetry: B
  } = Ie({
    initialChecked: f,
    hasResponse: U,
    initialCorrect: y,
    initialCanRetry: _,
    feedback: l
  }), j = fe(v), D = Se(s, o.length > 0, v), q = V || H, J = ve({
    checked: V,
    localRetry: m,
    localMaxAttempts: h,
    attempts: Y,
    serverCanRetry: z
  });
  function Q(b) {
    A == null || A(b);
  }
  function ee(b, E) {
    const k = b + E;
    if (k < 0 || k >= x.length) return;
    const te = x.slice(), [L] = te.splice(b, 1);
    te.splice(k, 0, L), R(te);
  }
  function ce(b, E) {
    q || (b.key === "ArrowUp" && (b.preventDefault(), ee(E, -1)), b.key === "ArrowDown" && (b.preventDefault(), ee(E, 1)));
  }
  async function C() {
    if (H) return;
    const b = Y + 1, E = x.map((se) => se.id), k = { itemIds: E };
    if (j && v) {
      w(!0), O("informative"), Z("Checking your answer…");
      const se = await Be(
        v,
        k,
        l,
        "Your sequence has been recorded."
      );
      if (w(!1), !se.ok) {
        G(!1), F(null), ne(!1), O("informative"), Z(se.message), Q({ completed: !1, correct: null, attempts: b, responses: k, status: "error" });
        return;
      }
      ae(), W(b), G(!0), F(se.marked.correct), ne(se.marked.canRetry), O(se.marked.status), Z(se.marked.message), Q(be(se.marked, b, k));
      return;
    }
    const te = D ? E.filter((se, $) => se === o[$]).length : 0, L = D ? te === o.length && E.length === o.length : null;
    ae(), W(b), G(!0), F(null), O(L === !0 ? "correct" : L === !1 ? "incorrect" : "informative"), Z(D ? L ? (l == null ? void 0 : l.correct) || "That order matches the expected sequence." : (l == null ? void 0 : l.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), Q({
      completed: !0,
      correct: L,
      score: D ? { correct: te, total: o.length } : void 0,
      attempts: b,
      responses: k
    });
  }
  function M() {
    B(), R(g), G(!1), w(!1), F(null), ne(void 0), O("neutral"), Z(""), Q({
      completed: !1,
      correct: null,
      attempts: Y,
      responses: { itemIds: g.map((b) => b.id) }
    });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "ordering",
      "data-lp-block-id": e,
      "aria-busy": H || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        a ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ r("p", { children: n }),
        /* @__PURE__ */ r("ol", { className: "lp-activity-list", children: x.map((b, E) => /* @__PURE__ */ d(
          "li",
          {
            className: "lp-card",
            tabIndex: q ? -1 : 0,
            "aria-label": `${b.label}, position ${E + 1} of ${x.length}`,
            onKeyDown: (k) => ce(k, E),
            children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ d("strong", { children: [
                E + 1,
                ". ",
                b.label
              ] }) }),
              /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
                /* @__PURE__ */ d(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: q || E === 0,
                    onClick: () => ee(E, -1),
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
                    disabled: q || E === x.length - 1,
                    onClick: () => ee(E, 1),
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
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void C(), disabled: q, children: H ? "Checking…" : "Check order" }),
          J ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: M, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ye, { state: X, message: K })
      ]
    }
  );
}
function he(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Vt(e) {
  var t;
  return (e == null ? void 0 : e.formative) === !0 || ((t = e == null ? void 0 : e.marking) == null ? void 0 : t.mode) === "formative-local";
}
function Gt(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function zt(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const Wt = [
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
], De = 200, Xt = 500;
function ze(e, t) {
  const n = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return n > 0 ? n : t;
}
function We(e) {
  return Wt.includes(he(e));
}
function $e(e) {
  var t;
  return ((t = e.content) == null ? void 0 : t.questionId) || e.id;
}
function Zt({
  id: e,
  prompt: t,
  placeholder: n,
  value: a,
  defaultValue: c = "",
  minChars: o,
  minimumCharacters: l,
  defaultMinChars: s = De,
  rows: m = 4,
  disabled: i = !1,
  hidePrompt: h = !1,
  onChange: p
}) {
  const f = xe(), y = e || f, _ = ze({ minChars: o, minimumCharacters: l }, s), v = typeof a == "string", [A, g] = T(String(c || "")), [N, x] = T(""), R = v ? a : A, Y = R.trim().length, W = Y >= _;
  function V(w) {
    v || g(w), p == null || p(w);
  }
  function G(w) {
    w.preventDefault(), x("Paste is disabled. Type your answer in your own words.");
  }
  function H(w) {
    w.preventDefault(), x("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ d("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ d("label", { className: "lp-field", htmlFor: y, children: [
      h ? /* @__PURE__ */ r("span", { className: "lp-visually-hidden", children: t }) : /* @__PURE__ */ r("span", { className: "lp-field__label", children: t }),
      /* @__PURE__ */ r(
        "textarea",
        {
          id: y,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(_),
          rows: m,
          value: R,
          placeholder: n,
          minLength: _,
          autoComplete: "off",
          disabled: i,
          "aria-describedby": `${y}-count ${y}-notice`,
          onChange: (w) => V(w.target.value),
          onPaste: G,
          onDrop: H
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "p",
      {
        id: `${y}-count`,
        className: "lp-char-count",
        "data-lp-char-count": "",
        "data-lp-met": W ? "true" : "false",
        "aria-live": "polite",
        children: `${Y} / ${_} characters minimum`
      }
    ),
    /* @__PURE__ */ r(
      "p",
      {
        id: `${y}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: N
      }
    )
  ] });
}
function Jt(e, t) {
  return t > 0 ? `Write at least ${e} characters. You currently have ${t}.` : `Write at least ${e} characters before saving.`;
}
function Xe({
  id: e = "text-response",
  blockType: t = "short-response",
  title: n,
  prompt: a,
  instructions: c,
  guidance: o,
  placeholder: l,
  minChars: s,
  minimumCharacters: m,
  defaultMinChars: i = De,
  rows: h = 4,
  feedback: p,
  retry: f = !0,
  maxAttempts: y,
  initialResponse: _ = "",
  initialChecked: v = !1,
  initialCorrect: A,
  initialCanRetry: g,
  saveLabel: N = "Save response",
  onMarkResponse: x,
  onResult: R
}) {
  const Y = ze({ minChars: s, minimumCharacters: m }, i), [W, V] = je(String(_ || ""), ""), [G, H] = T(0), [w, U] = Ne(v, !!String(_ || "").trim()), [X, K] = T(!1), z = W.trim(), O = z.length, Z = O >= Y, {
    status: F,
    message: ne,
    serverCanRetry: ae,
    setStatus: B,
    setMessage: j,
    setServerCorrect: D,
    setServerCanRetry: q,
    markLive: J,
    markRetry: Q
  } = Ie({
    initialChecked: v,
    hasResponse: !!z,
    initialCorrect: A,
    initialCanRetry: g,
    feedback: p
  }), ee = fe(x), ce = w || X, C = ve({
    checked: w,
    localRetry: f,
    localMaxAttempts: y,
    attempts: G,
    serverCanRetry: ae
  });
  function M(k) {
    R == null || R(k);
  }
  async function b() {
    if (X) return;
    if (!Z) {
      B("informative"), j(Jt(Y, O));
      return;
    }
    const k = G + 1;
    if (ee && x) {
      K(!0), B("informative"), j("Saving your response…");
      try {
        const L = we(
          await x(z),
          p,
          o || "Your response has been recorded."
        );
        J(), H(k), U(!0), D(L.correct), q(L.canRetry), B(L.status), j(L.requiresReview || L.correct !== null ? L.message : o || L.message), M(be(L, k, z));
      } catch (L) {
        U(!1), D(null), q(!1), B("informative"), j(Me(L)), M({
          completed: !1,
          correct: null,
          attempts: k,
          responses: z,
          status: "error"
        });
      } finally {
        K(!1);
      }
      return;
    }
    const te = o || (p == null ? void 0 : p.correct) || "Saved.";
    J(), H(k), U(!0), D(null), B("informative"), j(te), M({
      completed: !0,
      correct: null,
      attempts: k,
      responses: z
    });
  }
  function E() {
    Q(), V(""), U(!1), K(!1), D(null), q(void 0), B("neutral"), j(""), M({
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
      "aria-busy": X || void 0,
      children: [
        n ? /* @__PURE__ */ r("h3", { children: n }) : null,
        c ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: c }) : null,
        /* @__PURE__ */ r(
          Zt,
          {
            id: `${e}-field`,
            prompt: a,
            placeholder: l,
            value: W,
            minChars: s,
            minimumCharacters: m,
            defaultMinChars: i,
            rows: h,
            disabled: ce,
            onChange: V
          }
        ),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void b(), disabled: ce, children: X ? "Saving…" : N }),
          C ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: E, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ye, { state: F, message: ne })
      ]
    }
  );
}
function Qt({
  rows: e = 4,
  ...t
}) {
  return /* @__PURE__ */ r(
    Xe,
    {
      ...t,
      blockType: "short-response",
      defaultMinChars: De,
      rows: e
    }
  );
}
function er({
  rows: e = 6,
  ...t
}) {
  return /* @__PURE__ */ r(
    Xe,
    {
      ...t,
      blockType: "reflection",
      defaultMinChars: Xt,
      rows: e
    }
  );
}
function tr(e) {
  const t = e.content || {};
  return {
    id: e.id,
    instructions: t.instructions,
    feedback: t.feedback,
    formative: Vt(t),
    retry: Gt(t),
    shuffle: zt(t),
    maxAttempts: t.maxAttempts
  };
}
function Ye(e) {
  return typeof e == "string" ? e : void 0;
}
function rr({ block: e, initialResponse: t, initialChecked: n, initialResult: a, onMarkResponse: c, onResult: o }) {
  const l = he(e.type), s = e.content || {}, m = he(s.presentation), i = tr(e), h = (p) => o == null ? void 0 : o(p, e);
  if (l === "single-choice" || l === "option-cards" || m === "option-cards" || m === "true-false" || m === "picture-quiz")
    return /* @__PURE__ */ r(
      qt,
      {
        ...i,
        prompt: s.prompt || "Choose an option",
        options: s.options || [],
        correctOptionId: s.correctOptionId,
        initialSelectedId: typeof t == "string" ? t : void 0,
        initialChecked: n,
        initialCorrect: a == null ? void 0 : a.correct,
        initialCanRetry: a == null ? void 0 : a.canRetry,
        onMarkResponse: c,
        onResult: h
      }
    );
  if (l === "classification") {
    const p = t && typeof t == "object" && !Array.isArray(t) ? t : void 0;
    return /* @__PURE__ */ r(
      Bt,
      {
        ...i,
        prompt: s.prompt || "Classify each item",
        items: s.items || [],
        categories: s.categories || [],
        initialAssignments: p,
        initialChecked: n,
        initialCorrect: a == null ? void 0 : a.correct,
        initialCanRetry: a == null ? void 0 : a.canRetry,
        onMarkResponse: c,
        onResult: h
      }
    );
  }
  return l === "drag-drop" ? /* @__PURE__ */ r(
    Dt,
    {
      ...i,
      prompt: s.prompt || "Place each item",
      items: s.items || [],
      targets: s.targets || [],
      correct: s.correct,
      initialPlacements: t && typeof t == "object" && !Array.isArray(t) ? t : void 0,
      initialChecked: n,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: c,
      onResult: h
    }
  ) : l === "fill-gap" || l === "phrase-completion" ? /* @__PURE__ */ r(
    Kt,
    {
      ...i,
      prompt: s.prompt || "Complete the phrase",
      gaps: s.gaps,
      options: s.options || [],
      correctOptionId: s.correctOptionId,
      initialPlacements: t && typeof t == "object" && !Array.isArray(t) ? t : void 0,
      initialChecked: n,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: c,
      onResult: h
    }
  ) : l === "ordering" || l === "sequence" ? /* @__PURE__ */ r(
    Ut,
    {
      ...i,
      prompt: s.prompt || "Put the items in order",
      items: s.items || [],
      correctOrder: s.correctOrder,
      initialOrder: Array.isArray(t) ? t : void 0,
      initialChecked: n,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: c,
      onResult: h
    }
  ) : l === "short-response" ? /* @__PURE__ */ r(
    Qt,
    {
      id: i.id,
      prompt: s.prompt || "Write your response",
      instructions: i.instructions,
      guidance: s.guidance,
      placeholder: s.placeholder,
      minChars: s.minChars,
      minimumCharacters: s.minimumCharacters,
      feedback: i.feedback,
      retry: i.retry,
      maxAttempts: i.maxAttempts,
      initialResponse: Ye(t),
      initialChecked: n,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: c,
      onResult: h
    }
  ) : l === "reflection" ? /* @__PURE__ */ r(
    er,
    {
      id: i.id,
      prompt: s.prompt || "Write your reflection",
      instructions: i.instructions,
      guidance: s.guidance,
      placeholder: s.placeholder,
      minChars: s.minChars,
      minimumCharacters: s.minimumCharacters,
      feedback: i.feedback,
      retry: i.retry,
      maxAttempts: i.maxAttempts,
      initialResponse: Ye(t),
      initialChecked: n,
      initialCorrect: a == null ? void 0 : a.correct,
      initialCanRetry: a == null ? void 0 : a.canRetry,
      onMarkResponse: c,
      onResult: h
    }
  ) : /* @__PURE__ */ d("p", { className: "lp-card__meta", "data-lp-block": l, children: [
    "This ",
    l || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function nr(e, t, n, a) {
  if (a === "local") return n;
  const c = n || Ot(e, t);
  return a === "server" && !c ? Ve() : c;
}
function xr({
  activity: e,
  initialResponses: t = {},
  initialChecked: n = {},
  initialResults: a = {},
  renderFallback: c,
  platform: o,
  markingMode: l,
  onMarkResponse: s,
  onResult: m
}) {
  var y, _;
  const [i, h] = T(0), p = tt(e) || void 0, f = nr(o, e, s, l);
  return /* @__PURE__ */ d(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": p,
      children: [
        (y = e.metadata) != null && y.title ? /* @__PURE__ */ r("h3", { children: e.metadata.title }) : null,
        (_ = e.metadata) != null && _.summary ? /* @__PURE__ */ r("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ r("div", { className: "lp-activity-list", children: (e.blocks || []).map((v) => We(v.type) ? /* @__PURE__ */ r(
          rr,
          {
            block: v,
            initialResponse: t[$e(v)],
            initialChecked: !!n[$e(v)],
            initialResult: a[$e(v)],
            onMarkResponse: f ? (A) => f({
              activityId: e.id,
              activityVersion: p || "",
              block: v,
              responses: A
            }) : void 0,
            onResult: m
          },
          v.id
        ) : c ? /* @__PURE__ */ r("div", { children: c(v) }, v.id) : /* @__PURE__ */ d("p", { className: "lp-card__meta", "data-lp-block": he(v.type), children: [
          "This ",
          he(v.type) || "unknown",
          " block is not part of the React activity catalogue yet."
        ] }, v.id)) }, i),
        /* @__PURE__ */ d("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => h((v) => v + 1),
              children: "Reset activity"
            }
          ),
          /* @__PURE__ */ r("p", { className: "lp-activity-status", "data-lp-activity-status": !0, role: "status", "aria-live": "polite" })
        ] })
      ]
    }
  );
}
function ar(e, t) {
  return typeof t == "number" && Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function Ze({
  title: e,
  badge: t,
  subtitle: n,
  score: a,
  progress: c,
  completed: o = !0,
  attempts: l,
  message: s,
  showStatus: m = !0,
  showDisclaimer: i = !0,
  collapsed: h = !1
}) {
  const p = t || n, f = ar(a, c), y = Math.round(f * 100), _ = o ? "Completed" : "In progress", v = a ? `${a.correct} / ${a.total}` : null, A = a ? `${a.correct} of ${a.total} correct` : null, g = typeof l == "number" ? `${l} ${l === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ d(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": h ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ r("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ r("strong", { children: e }) }) : null,
        m ? /* @__PURE__ */ r(_e, { status: o ? "completed" : "progress", label: _ }) : null,
        v ? /* @__PURE__ */ r(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": A || void 0,
            children: v
          }
        ) : null,
        A ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: A }) : null,
        !h && p ? /* @__PURE__ */ r("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ r("strong", { children: p }) }) : null,
        h ? null : /* @__PURE__ */ d(Qe, { children: [
          /* @__PURE__ */ r(
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
          g ? /* @__PURE__ */ r("p", { children: g }) : null,
          s ? /* @__PURE__ */ r("p", { children: s }) : null,
          i ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function cr(e, t) {
  if (e)
    try {
      t && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !t && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      t ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function Mr({
  open: e = !1,
  title: t = "Activity complete",
  completed: n = !0,
  score: a,
  badge: c,
  subtitle: o,
  progress: l,
  attempts: s,
  message: m,
  onClose: i,
  onReview: h,
  onNext: p,
  nextLabel: f = "Continue",
  reviewLabel: y = "Review"
}) {
  const _ = Oe(null), v = xe();
  return me(() => {
    cr(_.current, e);
  }, [e]), e ? /* @__PURE__ */ d(
    "dialog",
    {
      ref: _,
      className: "lp-dialog",
      "aria-labelledby": v,
      onCancel: (A) => {
        A.preventDefault(), i == null || i();
      },
      children: [
        /* @__PURE__ */ d("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ r("h2", { id: v, children: t }),
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${t}`,
              onClick: i,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ r(
            Ze,
            {
              completed: n,
              score: a,
              badge: c,
              subtitle: o,
              progress: l,
              attempts: s,
              message: m
            }
          ),
          /* @__PURE__ */ d("div", { className: "lp-form__actions", children: [
            h ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: h, children: y }) : null,
            p ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: p, children: f }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const sr = (e) => ({
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
function $r({
  collapsed: e,
  defaultCollapsed: t = !0,
  onCollapsedChange: n,
  expandLabel: a = "Show progress details",
  collapseLabel: c = "Hide progress details",
  ...o
}) {
  const [l, s] = T(t), m = typeof e == "boolean" ? e : l, i = xe(), h = o.title || "Practice progress";
  function p(f) {
    typeof e != "boolean" && s(f), n == null || n(f);
  }
  return /* @__PURE__ */ d(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: sr(m),
      "aria-label": h,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": m ? "true" : "false",
      children: [
        /* @__PURE__ */ r("div", { id: i, children: /* @__PURE__ */ r(Ze, { ...o, title: h, collapsed: m }) }),
        /* @__PURE__ */ r("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !m,
            "aria-controls": i,
            onClick: () => p(!m),
            children: m ? a : c
          }
        ) })
      ]
    }
  );
}
const lr = {
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
}, or = {
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
}, ir = {
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
}, dr = {
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
}, ur = {
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
}, pr = {
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
}, mr = {
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
}, hr = {
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
}, Lr = [
  lr,
  or,
  ir,
  dr,
  ur,
  pr,
  mr,
  hr
];
function fr(e) {
  const t = he(e.type);
  return t === "single-choice" || t === "option-cards" || t === "classification" || t === "drag-drop" || t === "fill-gap" || t === "phrase-completion" || t === "ordering" || t === "sequence";
}
function Pr(e) {
  return We(e.type);
}
function Rr(e) {
  if (!fr(e)) return 0;
  const t = he(e.type);
  return t === "classification" ? (e.content && e.content.items || []).length : t === "drag-drop" ? (e.content && e.content.items || []).length : t === "fill-gap" || t === "phrase-completion" ? (e.content && e.content.gaps || []).length || 1 : t === "ordering" || t === "sequence" ? (e.content && e.content.items || []).length : 1;
}
function Or() {
  return { completed: {}, scores: {} };
}
function Fr(e, t, n) {
  const a = { ...e.completed }, c = { ...e.scores };
  return n.completed ? (a[t] = !0, n.score && n.score.total > 0 && !n.requiresReview ? c[t] = n.score : delete c[t], { completed: a, scores: c }) : e;
}
function Br(e, t) {
  return t.length > 0 && t.every((n) => e.completed[n]);
}
function jr(e, t) {
  var a;
  if (!e.completed) return !1;
  const n = ((a = e.score) == null ? void 0 : a.total) || 0;
  return t.complete || t.completedCount >= 2 || n >= 2;
}
function Dr(e, t) {
  const n = Object.values(e.completed).filter(Boolean).length, a = Object.values(e.scores).reduce(
    (o, l) => ({
      correct: o.correct + l.correct,
      total: o.total + l.total
    }),
    { correct: 0, total: 0 }
  ), c = Math.max(0, t.requiredBlocks);
  return {
    completedCount: n,
    requiredBlocks: c,
    completion: c > 0 ? Math.min(1, n / c) : 0,
    score: {
      correct: a.correct,
      total: Math.max(t.scorableTotal, a.total, 0)
    },
    complete: c > 0 && n >= c
  };
}
const Je = /* @__PURE__ */ new Set(["correct", "incorrect", "review", "recorded", "error"]);
function gr(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, n = {
    correct: t.correct === !0 ? !0 : t.correct === !1 ? !1 : null
  };
  return typeof t.canRetry == "boolean" && (n.canRetry = t.canRetry), typeof t.status == "string" && Je.has(t.status) && (n.status = t.status), n;
}
function qr(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return {};
  const t = {};
  for (const [n, a] of Object.entries(e)) {
    const c = gr(a);
    c && (t[n] = c);
  }
  return t;
}
function Yr(e) {
  const t = typeof e.status == "string" && Je.has(e.status) ? e.status : e.requiresReview ? "review" : e.correct === !0 ? "correct" : e.correct === !1 ? "incorrect" : "recorded", n = {
    correct: e.correct === !0 ? !0 : e.correct === !1 ? !1 : null,
    status: t
  };
  return typeof e.canRetry == "boolean" && (n.canRetry = e.canRetry), n;
}
export {
  rr as ActivityBlock,
  ht as ActivityCard,
  At as AuthoredHtml,
  gt as Breadcrumbs,
  nt as CONTEXT_TYPES,
  vt as Callout,
  Bt as Classification,
  Mr as CompletionModal,
  bt as ContextPanel,
  Dt as DragDrop,
  Ke as EmptyState,
  _r as ErrorState,
  Mt as FEEDBACK_STATES,
  ye as FeedbackPanel,
  Sr as HubShell,
  xr as InteractiveActivity,
  Cr as LEARNER_ACTIVITY_STATES,
  wr as LearnerHeader,
  Ct as LearningOutcomeBadge,
  Zt as LearningTextField,
  Ar as LoadingState,
  Nt as Navigation,
  qt as OptionCards,
  Kt as PhraseCompletion,
  $r as PracticeProgressPanel,
  kt as ProgressCard,
  Ze as ProgressSummary,
  Xt as REFLECTION_DEFAULT_MIN_CHARS,
  er as Reflection,
  Pe as SERVER_CHECK_FAILED_MESSAGE,
  Lt as SERVER_REVIEW_MESSAGE,
  at as SESSION_KINDS,
  Le as SESSION_KIND_LABELS,
  De as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  kr as STATUS_TONES,
  Ut as Sequence,
  _t as SessionSection,
  Qt as ShortResponse,
  _e as StatusBadge,
  Xe as TextResponse,
  ge as WEEK_ACCESS_COPY,
  ct as WEEK_UI_FEATURES,
  Er as WeekAccessGuard,
  Tr as WeekAccessLink,
  St as WeekHeader,
  wt as WeekNavigation,
  Ir as WeekView,
  mt as activityActionLabel,
  Dr as aggregatePracticeProgress,
  Fr as applyPracticeResult,
  Rr as catalogueBlockScorableTotal,
  Ot as createMarkResponseHandler,
  Lr as demoCatalogueActivities,
  pr as demoClassification,
  ir as demoDragDrop,
  lr as demoOptionCards,
  dr as demoPhraseCompletion,
  hr as demoReflection,
  ur as demoSequence,
  mr as demoShortResponse,
  or as demoTrueFalse,
  Or as emptyPracticeProgress,
  We as isCatalogueReactType,
  Pr as isCompletableReactBlock,
  ot as isIndependentKind,
  jr as isPracticeCompletionCue,
  fr as isScorableReactBlock,
  it as isSessionKind,
  Rt as learnerSafeBlock,
  gr as learnerSafeCheckedResult,
  qr as learnerSafeCheckedResults,
  Yr as learnerSafeResultFromActivityResult,
  st as mergeWeekUiFeatures,
  he as normaliseActivityType,
  $e as questionIdFor,
  ze as resolveMinChars,
  ar as resolveProgressFraction,
  Fe as resolveWeekStatus,
  Ee as restoredCheckedDisplay,
  Br as scorableBlocksComplete,
  lt as shouldShowContext,
  He as statusLabel,
  pt as statusTone,
  Ie as useRestoredCheckedFeedback,
  Et as weekAccessFallbackCopy,
  Ue as weekIsAccessible
};
//# sourceMappingURL=index.js.map
