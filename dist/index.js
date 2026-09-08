import { jsxs as o, jsx as r, Fragment as Oe } from "react/jsx-runtime";
import { useId as Ne, useState as _, useEffect as se, useMemo as le, useCallback as ve, useRef as He } from "react";
import { isUnsafeAuthoredHtml as Ke, resolveActivityVersion as Ue } from "@learning-platform/core";
import { isWeekAvailable as Ve } from "@learning-platform/core/curriculum-runtime";
const Ge = ["exam", "assignment", "project"], ze = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], we = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, ir = ["not-started", "in-progress", "completed"], dr = ["available", "planned", "progress", "completed"], We = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function Xe(e = {}) {
  return { ...We, ...e };
}
function Ze(e, t) {
  return t ? t === "assignment" ? e.showAssignmentContext !== !1 : t === "exam" ? e.showExamContext !== !1 : t === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function Je(e) {
  return e === "independent-study" || e === "homework";
}
function Qe(e) {
  return ze.includes(e);
}
const et = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, tt = {
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
function rt(e) {
  return et[e || ""] || "planned";
}
function Me(e, t = "") {
  return tt[e || ""] || t || String(e || "Planned");
}
function nt(e, t = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : t;
}
function ge({
  status: e = "planned",
  label: t,
  marker: n = !0
}) {
  const l = rt(e);
  return /* @__PURE__ */ o("span", { className: `lp-status-badge lp-status-badge--${l}`, role: "status", children: [
    n ? /* @__PURE__ */ r("span", { "aria-hidden": "true", children: "● " }) : null,
    t || Me(e)
  ] });
}
function at({
  title: e = "Untitled activity",
  description: t = "",
  activityType: n = "Activity",
  duration: l = "",
  status: a = "Not started",
  state: c,
  href: s,
  actionLabel: p,
  badge: i = !1,
  badgeStatus: d,
  headingLevel: v = 2,
  muted: m = !1
}) {
  const b = v === 3 ? "h3" : "h2", f = [n, l].filter(Boolean), h = c ? Me(c, a) : a;
  return /* @__PURE__ */ o("article", { className: m ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": c || void 0, children: [
    i ? /* @__PURE__ */ r(
      ge,
      {
        status: d || c || "planned",
        label: typeof a == "string" && a !== "Not started" ? a : void 0
      }
    ) : null,
    f.length ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: f.join(" · ") }) : null,
    /* @__PURE__ */ r(b, { children: e }),
    t ? /* @__PURE__ */ r("p", { children: t }) : null,
    /* @__PURE__ */ r("p", { className: "lp-card__meta", children: `Status: ${h}` }),
    s ? /* @__PURE__ */ r("div", { className: "lp-card__actions", children: /* @__PURE__ */ r("a", { className: "lp-button", href: s, children: p || nt(c) }) }) : null
  ] });
}
function lt(e, t) {
  return e.href ? e.href : e.path != null && t ? t(e.path) : e.path || void 0;
}
function st({ items: e = [], resolveHref: t }) {
  return e.length ? /* @__PURE__ */ r("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ r("ol", { className: "lp-breadcrumbs__list", children: e.map((n, l) => {
    const a = l === e.length - 1, c = lt(n, t);
    return /* @__PURE__ */ r("li", { children: a || !c ? /* @__PURE__ */ r("span", { "aria-current": "page", children: n.label }) : /* @__PURE__ */ r("a", { href: c, children: n.label }) }, `${n.label}-${l}`);
  }) }) }) : /* @__PURE__ */ r("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const ct = ["info", "success", "warning", "error"];
function ot({ tone: e = "info", title: t, message: n }) {
  const l = ct.includes(e) ? e : "info";
  return /* @__PURE__ */ o(
    "aside",
    {
      className: `lp-callout lp-callout--${l}`,
      role: l === "error" ? "alert" : void 0,
      children: [
        t ? /* @__PURE__ */ r("strong", { children: t }) : null,
        n ? /* @__PURE__ */ r("p", { children: n }) : null
      ]
    }
  );
}
function it({
  contextType: e = "assignment",
  heading: t = "Context",
  items: n = [],
  description: l = "",
  action: a
}) {
  const c = Ge.includes(e) ? e : "assignment", s = `lp-context-${c}`;
  return /* @__PURE__ */ o(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${c}`,
      "aria-labelledby": s,
      "data-context-type": c,
      children: [
        /* @__PURE__ */ r("h2", { id: s, children: t }),
        n.length ? /* @__PURE__ */ r("dl", { className: "lp-meta-list", children: n.map((p) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ r("dt", { children: p.label }),
          /* @__PURE__ */ r("dd", { children: p.value })
        ] }, `${p.label}:${p.value}`)) }) : null,
        l ? /* @__PURE__ */ r("p", { children: l }) : null,
        a != null && a.label && (a != null && a.href) ? /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: a.href, children: a.label }) }) : null
      ]
    }
  );
}
function Pe({
  heading: e = "Nothing to show yet",
  message: t = "Check again later.",
  action: n
}) {
  return /* @__PURE__ */ o("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ r("h2", { children: e }),
    /* @__PURE__ */ r("p", { children: t }),
    n != null && n.label && (n != null && n.href) ? /* @__PURE__ */ r("a", { className: "lp-button", href: n.href, children: n.label }) : null
  ] });
}
function ur({
  heading: e = "There is a problem",
  message: t = "Try again."
}) {
  return /* @__PURE__ */ o("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ r("h2", { children: e }),
    /* @__PURE__ */ r("p", { children: t })
  ] });
}
function dt({
  items: e,
  currentId: t = "home",
  currentIds: n = [],
  brandTitle: l,
  brandTagline: a,
  homeHref: c,
  theme: s = null,
  actions: p,
  listId: i
}) {
  const d = Ne(), v = i || `lp-navigation-list-${d}`, [m, b] = _(!1), f = new Set([t, ...n].filter(Boolean)), h = e.find((y) => y.id === "home" && y.enabled !== !1), C = e.filter((y) => y.enabled !== !1);
  se(() => {
    function y(I) {
      I.key === "Escape" && b(!1);
    }
    return document.addEventListener("keydown", y), () => document.removeEventListener("keydown", y);
  }, []);
  function N(y) {
    if (y.key === "Escape") {
      b(!1);
      const I = y.currentTarget.querySelector(".lp-navigation__toggle");
      I == null || I.focus();
    }
  }
  return /* @__PURE__ */ r("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: N, children: /* @__PURE__ */ o("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ o("a", { className: "lp-navigation__brand", href: c || (h == null ? void 0 : h.path) || "./", children: [
      /* @__PURE__ */ r("span", { className: "lp-navigation__brand-title", children: l }),
      a ? /* @__PURE__ */ r("span", { className: "lp-navigation__brand-tagline", children: a }) : null
    ] }),
    /* @__PURE__ */ r(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": m,
        "aria-controls": v,
        "aria-label": m ? "Close main menu" : "Open main menu",
        onClick: () => b((y) => !y),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ r(
      "ul",
      {
        className: "lp-navigation__list",
        id: v,
        "data-open": m ? "true" : "false",
        children: C.map((y) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(
          "a",
          {
            className: "lp-navigation__link",
            href: y.path,
            "aria-current": f.has(y.id) ? "page" : void 0,
            onClick: () => b(!1),
            children: y.label
          }
        ) }, y.id))
      }
    ),
    s ? /* @__PURE__ */ o("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ r(
        "select",
        {
          "aria-label": "Theme preference",
          value: s.preference,
          onChange: (y) => s.onChange(y.target.value),
          children: s.modes.map((y) => /* @__PURE__ */ r("option", { value: y, children: y[0].toUpperCase() + y.slice(1) }, y))
        }
      )
    ] }) : null,
    p ? /* @__PURE__ */ r("div", { className: "lp-navigation__actions", children: p }) : null
  ] }) });
}
function pr({
  brandTitle: e,
  brandTagline: t,
  navigation: n,
  currentId: l = "home",
  currentIds: a = [],
  theme: c = null,
  actions: s,
  breadcrumbs: p,
  resolveHref: i,
  pageHeader: d,
  footer: v,
  learnerHeader: m,
  notice: b,
  skipLabel: f = "Skip to main content",
  mainId: h = "main-content",
  children: C
}) {
  const N = v && typeof v == "object" && "lines" in v ? v.lines.map((y) => /* @__PURE__ */ r("p", { children: y }, y)) : v;
  return /* @__PURE__ */ o("div", { className: "lp-shell", children: [
    /* @__PURE__ */ r("a", { className: "lp-skip-link skip-link", href: `#${h}`, children: f }),
    /* @__PURE__ */ r("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ r(
      dt,
      {
        items: n,
        currentId: l,
        currentIds: a,
        brandTitle: e,
        brandTagline: t,
        theme: c,
        actions: s
      }
    ) }),
    /* @__PURE__ */ r("div", { className: "lp-shell__learner", children: m }),
    b,
    p ? /* @__PURE__ */ r(st, { items: p, resolveHref: i }) : null,
    d != null && d.title ? /* @__PURE__ */ o("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ r("h1", { children: d.title }),
      d.subtitle ? /* @__PURE__ */ r("p", { className: "lp-page-header__subtitle", children: d.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ r("main", { id: h, className: "lp-shell__main site-main", tabIndex: -1, children: C }),
    /* @__PURE__ */ r("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: N })
  ] });
}
function mr({
  learner: e,
  hubName: t,
  accountHref: n = "./account/",
  onSignOut: l
}) {
  return e ? /* @__PURE__ */ o("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ o("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Learner" }),
        /* @__PURE__ */ r("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Year group" }),
        /* @__PURE__ */ r("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Email" }),
        /* @__PURE__ */ r("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Current hub" }),
        /* @__PURE__ */ r("dd", { children: t })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ r("a", { href: n, children: "Account" }),
      l ? /* @__PURE__ */ r("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        l();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ r("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function ut({ id: e, title: t }) {
  const n = [e, t].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ r("span", { className: "lp-outcome-badge", children: n });
}
function hr({ message: e = "Loading…" }) {
  return /* @__PURE__ */ o("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ r("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ r("span", { children: e })
  ] });
}
function pt({
  title: e = "Progress",
  completed: t = 0,
  total: n = 0,
  description: l = ""
}) {
  const a = Math.max(0, Number(n) || 0), c = Math.min(a, Math.max(0, Number(t) || 0)), s = a ? Math.round(c / a * 100) : 0;
  return /* @__PURE__ */ o("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ r("h2", { children: e }),
    l ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: l }) : null,
    /* @__PURE__ */ r(
      "progress",
      {
        className: "lp-progress",
        max: a || 1,
        value: c,
        "aria-label": `${s}% complete`
      }
    ),
    /* @__PURE__ */ r("p", { children: `${c} of ${a} complete (${s}%)` })
  ] });
}
function mt({
  id: e,
  title: t,
  kind: n = "session",
  summary: l = "",
  defaultOpen: a = !1,
  meta: c,
  children: s
}) {
  const p = Qe(n) ? n : "session", i = we[p];
  return /* @__PURE__ */ o("details", { className: "lp-session lp-panel", id: e, "data-kind": p, open: a, children: [
    /* @__PURE__ */ r("summary", { className: "lp-session__summary", children: /* @__PURE__ */ o("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ r("h2", { className: "lp-session__heading", children: t || i }),
      /* @__PURE__ */ r("span", { className: "lp-session__meta", children: c || i })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "lp-session__content", children: [
      l ? /* @__PURE__ */ r("p", { className: "lp-panel-note", children: l }) : null,
      /* @__PURE__ */ r("div", { className: "lp-activity-list", children: s })
    ] })
  ] });
}
function ht({
  teachingWeek: e,
  title: t = "",
  subtitle: n = "",
  status: l,
  learningOutcomes: a = [],
  headingLevel: c = 1,
  showTitle: s = !0
}) {
  const p = e ? `Week ${e}${t ? `: ${t}` : ""}` : t || "Week";
  return /* @__PURE__ */ o("header", { className: "lp-week-header", children: [
    l ? /* @__PURE__ */ r(ge, { status: l }) : null,
    s ? /* @__PURE__ */ r(c === 2 ? "h2" : "h1", { children: p }) : e ? /* @__PURE__ */ r("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    n ? /* @__PURE__ */ r("p", { className: "lp-week-header__subtitle", children: n }) : null,
    a.length ? /* @__PURE__ */ r("ul", { className: "lp-week-header__outcomes", children: a.map((d) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(ut, { id: d.id, title: d.title }) }, d.id || d.title)) }) : null
  ] });
}
function ft({ previousWeek: e, nextWeek: t }) {
  return !(e != null && e.href) && !(t != null && t.href) ? null : /* @__PURE__ */ r("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ o("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    t != null && t.href ? /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: t.href, rel: "next", children: t.label || "Next week" }) }) : null
  ] }) });
}
function gt({ html: e, className: t, ...n }) {
  const l = e == null ? "" : String(e);
  return Ke(l) ? /* @__PURE__ */ r("div", { className: t, "data-lp-html-rejected": "true", ...n }) : /* @__PURE__ */ r("div", { className: t, dangerouslySetInnerHTML: { __html: l }, ...n });
}
function yt(e) {
  if (e.meta) return e.meta;
  const t = (e.activities || []).length, n = `${t} ${t === 1 ? "activity" : "activities"}`, l = we[e.kind || "session"] || we.session;
  return e.kind && e.kind !== "session" ? `${l} · ${n}` : n;
}
function bt(e, t) {
  return "html" in e && e.html ? /* @__PURE__ */ r(
    gt,
    {
      className: "lp-activity-html",
      html: e.html
    },
    t
  ) : "children" in e && e.children ? /* @__PURE__ */ r("div", { children: e.children }, t) : /* @__PURE__ */ r(at, { ...e }, t);
}
function fr({
  week: e = {},
  learningOutcomes: t = [],
  context: n = null,
  sessions: l = [],
  progress: a = null,
  previousWeek: c,
  nextWeek: s,
  features: p = {},
  renderActivity: i
}) {
  const d = Xe(p), v = (n == null ? void 0 : n.type) || (n == null ? void 0 : n.contextType), m = l.filter((f) => !(d.showIndependentStudy === !1 && Je(f.kind))), b = i || bt;
  return /* @__PURE__ */ o("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ r(
      ht,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: d.showLearningOutcomes ? t : [],
        headingLevel: e.headingLevel || 1,
        showTitle: d.showTitle !== !1
      }
    ),
    n && Ze(d, v) ? /* @__PURE__ */ r(
      it,
      {
        contextType: v,
        heading: n.heading,
        items: n.items,
        description: n.description,
        action: n.action
      }
    ) : null,
    m.length ? m.map((f) => /* @__PURE__ */ r(
      mt,
      {
        id: f.id,
        title: f.title,
        kind: f.kind,
        summary: f.summary,
        defaultOpen: f.defaultOpen,
        meta: yt(f),
        children: (f.activities || []).map((h, C) => b(h, C))
      },
      f.id || f.title
    )) : /* @__PURE__ */ r(
      Pe,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    d.showProgress && a ? /* @__PURE__ */ r(pt, { ...a }) : null,
    /* @__PURE__ */ r(ft, { previousWeek: c, nextWeek: s })
  ] });
}
const de = {
  plannedHeading: "Week not available yet",
  plannedMessage: "This week has not been made available by your teacher.",
  archivedHeading: "Week not available",
  archivedMessage: "This week is no longer available to learners.",
  inaccessibleHeading: "Week not available",
  inaccessibleMessage: "This week is not available."
};
function Ae(e) {
  var t;
  return String(e.status ?? ((t = e.metadata) == null ? void 0 : t.status) ?? "").trim();
}
function Le(e) {
  return Ve(Ae(e));
}
function vt(e) {
  const t = e.toLowerCase();
  return t === "planned" ? {
    heading: de.plannedHeading,
    message: de.plannedMessage
  } : t === "archived" ? {
    heading: de.archivedHeading,
    message: de.archivedMessage
  } : {
    heading: de.inaccessibleHeading,
    message: de.inaccessibleMessage
  };
}
function Nt({ href: e, children: t, className: n }) {
  return /* @__PURE__ */ r("a", { className: n, href: e, children: t });
}
function gr({
  week: e,
  href: t,
  children: n,
  className: l = "lp-text-link",
  lockedClassName: a = "lp-week-access-link lp-week-access-link--locked",
  renderLink: c = Nt
}) {
  if (Le(e))
    return c({ href: t, children: n, className: l });
  const s = Ae(e);
  return /* @__PURE__ */ o("span", { className: a, "aria-disabled": "true", children: [
    /* @__PURE__ */ r("span", { className: "lp-week-access-link__label", children: n }),
    " ",
    /* @__PURE__ */ r(ge, { status: s || "planned" })
  ] });
}
function yr({ week: e, children: t, fallback: n }) {
  if (Le(e))
    return t;
  if (n != null)
    return n;
  const l = Ae(e), a = vt(l);
  return /* @__PURE__ */ o("div", { className: "lp-week-access-guard", children: [
    /* @__PURE__ */ r(ge, { status: l || "planned" }),
    /* @__PURE__ */ r(Pe, { heading: a.heading, message: a.message })
  ] });
}
const _t = ["neutral", "correct", "incorrect", "informative", "hint"], Ct = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function ue({
  state: e = "neutral",
  title: t,
  message: n
}) {
  const l = _t.includes(e) ? e : "neutral", a = Ct[l];
  return !n && !t ? null : /* @__PURE__ */ r("div", { className: "lp-feedback", "data-lp-feedback-state": l, "data-lp-feedback": !0, children: /* @__PURE__ */ r(ot, { tone: a.tone, title: t || a.label, message: n }) });
}
const ke = "Your answer could not be checked. Please try again.", wt = "Your response has been recorded for review.";
function oe(e) {
  return typeof e == "function";
}
function _e(e) {
  if (e && typeof e == "object" && "learnerMessage" in e) {
    const t = String(e.learnerMessage || "").trim();
    if (t) return t;
  }
  return ke;
}
function Fe() {
  return async () => {
    throw Object.assign(new Error(ke), {
      code: "MARKING_UNAVAILABLE",
      learnerMessage: ke
    });
  };
}
function pe(e) {
  return !e.checked || e.serverCanRetry === !1 ? !1 : e.serverCanRetry === !0 ? !0 : e.localRetry && (typeof e.localMaxAttempts != "number" || e.attempts < e.localMaxAttempts);
}
function ye(e, t, n) {
  return !!(e && t && !oe(n));
}
function Ce(e, t, n = "Your response has been recorded.") {
  return e.requiresReview || e.status === "review" ? {
    status: "informative",
    message: wt,
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
function me(e, t, n) {
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
async function Ie(e, t, n, l = "Your response has been recorded.") {
  try {
    return {
      ok: !0,
      marked: Ce(await e(t), n, l)
    };
  } catch (a) {
    return { ok: !1, message: _e(a) };
  }
}
const kt = /^(correctOptionId|correctCategoryId|correctValues|answerKey|markScheme|modelAnswer|correctOptions|correctOrder|spec)$/;
function Se(e) {
  if (Array.isArray(e)) return e.map(Se);
  if (!e || typeof e != "object") return e;
  const t = {};
  for (const [n, l] of Object.entries(e))
    kt.test(n) || n === "correct" && l && typeof l == "object" || (t[n] = Se(l));
  return t;
}
function St(e) {
  return Se(e);
}
function At(e, t) {
  if (!e || typeof e != "object") return;
  const n = e.marking;
  if (!n || typeof n.markBlock != "function")
    return Fe();
  const l = n.markBlock;
  return (a) => l({
    activityKey: t.id,
    activityVersion: a.activityVersion,
    block: St(a.block),
    responses: a.responses,
    sourcePage: typeof window < "u" ? window.location.pathname : void 0
  });
}
function be(e, t) {
  const n = e.slice();
  if (!t || n.length < 2) return n;
  for (let l = n.length - 1; l > 0; l -= 1) {
    const a = Math.floor(Math.random() * (l + 1)), c = n[l];
    n[l] = n[a], n[a] = c;
  }
  return n;
}
function Ee(e) {
  return e == null ? !1 : typeof e == "string" || Array.isArray(e) ? e.length > 0 : typeof e == "object" ? Object.keys(e).length > 0 : !0;
}
function Te(e, t) {
  const [n, l] = _(Ee(e) ? e : t);
  return se(() => {
    Ee(e) && l(e);
  }, [e]), [n, l];
}
function he(e, t) {
  const [n, l] = _(!!(e && t));
  return se(() => {
    e && t && l(!0);
  }, [t, e]), [n, l];
}
function fe(e) {
  return e.label || e.text || e.id;
}
function It(e, t, n, l, a, c, s, p) {
  if (!n) return "Placed";
  if (c) {
    const i = s == null ? void 0 : s.find((d) => d.itemId === e);
    return (i == null ? void 0 : i.correct) === !0 ? "Correct" : (i == null ? void 0 : i.correct) === !1 ? "Incorrect" : p || i != null && i.requiresReview ? "Recorded" : "Placed";
  }
  return l ? a[e] === t ? "Correct" : "Incorrect" : "Placed";
}
function Tt({
  id: e = "classification",
  title: t,
  prompt: n,
  instructions: l,
  items: a,
  categories: c,
  feedback: s,
  formative: p = !0,
  retry: i = !0,
  shuffle: d = !1,
  maxAttempts: v,
  initialAssignments: m = {},
  initialChecked: b = !1,
  onMarkResponse: f,
  onResult: h
}) {
  const C = le(() => be(a, d), [a, d]), [N, y] = Te(m, {}), [I, U] = _(null), [q, z] = _(0), O = a.length > 0 && a.every((u) => m[u.id]), [F, W] = he(b, O), [E, T] = _(!1), [B, $] = _(b && O ? "informative" : "neutral"), [j, G] = _(b && O ? "Your answer was recorded." : ""), [H, Y] = _();
  se(() => {
    b && a.every((u) => N[u.id]) && ($("informative"), G("Your answer was recorded."));
  }, [N, b, a]);
  const [D, K] = _(!1), [ee, Z] = _(), V = Object.fromEntries(
    a.filter((u) => u.correctCategoryId).map((u) => [u.id, u.correctCategoryId])
  ), J = oe(f), te = ye(p, Object.keys(V).length > 0, f), g = F || E, w = pe({
    checked: F,
    localRetry: i,
    localMaxAttempts: v,
    attempts: q,
    serverCanRetry: ee
  }), A = C.filter((u) => !N[u.id]), M = C.find((u) => u.id === I);
  function P(u) {
    h == null || h(u);
  }
  function x(u, S) {
    y((L) => ({ ...L, [u]: S })), U(null);
  }
  function R(u) {
    U((S) => S === u ? null : u);
  }
  function k(u) {
    I && x(I, u);
  }
  function X(u) {
    y((S) => {
      const L = { ...S };
      return delete L[u], L;
    }), U(null);
  }
  async function re() {
    if (E) return;
    if (!a.every((ne) => N[ne.id])) {
      $("informative"), G("Place every item in a category before checking.");
      return;
    }
    const S = q + 1, L = { ...N };
    if (J && f) {
      T(!0), $("informative"), G("Checking your answer…");
      try {
        const ne = Ce(
          await f(L),
          s,
          "Your categories have been recorded."
        );
        z(S), W(!0), Y(ne.itemResults), K(ne.requiresReview), Z(ne.canRetry), $(ne.status), G(ne.message), P(me(ne, S, L));
      } catch (ne) {
        W(!1), Y(void 0), K(!1), Z(!1), $("informative"), G(_e(ne)), P({
          completed: !1,
          correct: null,
          attempts: S,
          responses: L,
          status: "error"
        });
      } finally {
        T(!1);
      }
      return;
    }
    const ie = te ? a.filter((ne) => N[ne.id] === V[ne.id]).length : 0, ae = te ? ie === a.length : null;
    z(S), W(!0), Y(void 0), K(!1), $(ae === !0 ? "correct" : ae === !1 ? "incorrect" : "informative"), G(te ? ae ? (s == null ? void 0 : s.correct) || "Those items match the expected categories." : (s == null ? void 0 : s.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), P({
      completed: !0,
      correct: ae,
      score: te ? { correct: ie, total: a.length } : void 0,
      attempts: S,
      responses: L
    });
  }
  function Q() {
    y({}), U(null), W(!1), T(!1), Y(void 0), K(!1), Z(void 0), $("neutral"), G(""), P({ completed: !1, correct: null, attempts: q, responses: {} });
  }
  return /* @__PURE__ */ o(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "classification",
      "data-lp-block-id": e,
      "aria-busy": E || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        l ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: M ? `Selected: ${fe(M)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
        /* @__PURE__ */ o("fieldset", { className: "lp-fieldset", disabled: g, children: [
          /* @__PURE__ */ r("legend", { children: n }),
          /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "Items" }),
          /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
            A.map((u) => /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": I === u.id,
                onClick: () => R(u.id),
                children: [
                  fe(u),
                  I === u.id ? " (selected)" : ""
                ]
              },
              u.id
            )),
            A.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: c.map((u) => {
            const S = C.filter((L) => N[L.id] === u.id);
            return /* @__PURE__ */ o("div", { className: "lp-card", children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("strong", { children: u.label }) }),
              /* @__PURE__ */ r("ul", { className: "lp-activity-list", children: S.map((L) => {
                const ie = It(
                  L.id,
                  u.id,
                  F,
                  te,
                  V,
                  J,
                  H,
                  D
                );
                return /* @__PURE__ */ r("li", { children: /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    onClick: () => X(L.id),
                    children: [
                      fe(L),
                      " · ",
                      ie,
                      g ? "" : " · Return"
                    ]
                  }
                ) }, L.id);
              }) }),
              S.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "No items yet" }) : null,
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  disabled: !I,
                  onClick: () => k(u.id),
                  children: [
                    "Place in ",
                    fe(u)
                  ]
                }
              )
            ] }, u.id);
          }) }),
          /* @__PURE__ */ o("details", { children: [
            /* @__PURE__ */ r("summary", { children: "Use dropdown lists instead" }),
            C.map((u) => /* @__PURE__ */ o("p", { className: "lp-form__field", children: [
              /* @__PURE__ */ r("label", { htmlFor: `${e}-${u.id}`, children: fe(u) }),
              /* @__PURE__ */ o(
                "select",
                {
                  id: `${e}-${u.id}`,
                  "data-lp-item": u.id,
                  value: N[u.id] || "",
                  disabled: g,
                  onChange: (S) => {
                    const L = S.target.value;
                    y((ie) => {
                      const ae = { ...ie };
                      return L ? ae[u.id] = L : delete ae[u.id], ae;
                    }), U(null);
                  },
                  children: [
                    /* @__PURE__ */ r("option", { value: "", children: "Select a category" }),
                    c.map((S) => /* @__PURE__ */ r("option", { value: S.id, children: S.label }, S.id))
                  ]
                }
              )
            ] }, `list-${u.id}`))
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void re(), disabled: g, children: E ? "Checking…" : "Check types" }),
          w ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Q, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: B, message: j })
      ]
    }
  );
}
function xt(e) {
  return !!(e && Object.keys(e).length);
}
function De(e = {}) {
  const [t, n] = _({ ...e }), [l, a] = _(null);
  se(() => {
    xt(e) && n({ ...e });
  }, [e]);
  const c = ve((d, v = t) => Object.keys(v).find((m) => v[m] === d) || null, [t]), s = ve((d) => {
    a((v) => v === d ? null : d);
  }, []), p = ve((d) => {
    if (!l) {
      const m = c(d);
      m && a(m);
      return;
    }
    const v = l;
    n((m) => {
      const b = { ...m }, f = Object.keys(b).find((h) => b[h] === d);
      return f && delete b[f], b[v] = d, b;
    }), a(null);
  }, [c, l]), i = ve(() => {
    n({}), a(null);
  }, []);
  return { placements: t, selectedItemId: l, selectItem: s, selectTarget: p, occupantOf: c, reset: i };
}
function Et({
  id: e = "drag-drop",
  title: t,
  prompt: n,
  instructions: l,
  items: a,
  targets: c,
  correct: s = {},
  feedback: p,
  formative: i = !0,
  retry: d = !0,
  shuffle: v = !1,
  maxAttempts: m,
  initialPlacements: b = {},
  initialChecked: f = !1,
  onMarkResponse: h,
  onResult: C
}) {
  var x;
  const N = le(() => be(a, v), [a, v]), { placements: y, selectedItemId: I, selectItem: U, selectTarget: q, occupantOf: z, reset: O } = De(b), [F, W] = _(0), E = a.length > 0 && a.every((R) => b[R.id]), [T, B] = he(f, E), [$, j] = _(!1), [G, H] = _(f && E ? "informative" : "neutral"), [Y, D] = _(f && E ? "Your answer was recorded." : ""), [K, ee] = _(), Z = oe(h), V = ye(i, Object.keys(s).length > 0, h), J = T || $, te = pe({
    checked: T,
    localRetry: d,
    localMaxAttempts: m,
    attempts: F,
    serverCanRetry: K
  }), g = N.filter((R) => !y[R.id]), w = (x = N.find((R) => R.id === I)) == null ? void 0 : x.label;
  function A(R) {
    C == null || C(R);
  }
  async function M() {
    if ($) return;
    if (!a.every((u) => y[u.id])) {
      H("informative"), D("Place every item before checking.");
      return;
    }
    const k = F + 1, X = { ...y };
    if (Z && h) {
      j(!0), H("informative"), D("Checking your answer…");
      const u = await Ie(
        h,
        X,
        p,
        "Your placements have been recorded."
      );
      if (j(!1), !u.ok) {
        B(!1), ee(!1), H("informative"), D(u.message), A({ completed: !1, correct: null, attempts: k, responses: X, status: "error" });
        return;
      }
      W(k), B(!0), ee(u.marked.canRetry), H(u.marked.status), D(u.marked.message), A(me(u.marked, k, X));
      return;
    }
    const re = V ? a.filter((u) => y[u.id] === s[u.id]).length : 0, Q = V ? re === a.length : null;
    W(k), B(!0), H(Q === !0 ? "correct" : Q === !1 ? "incorrect" : "informative"), D(V ? Q ? (p == null ? void 0 : p.correct) || "Those placements match the expected targets." : (p == null ? void 0 : p.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), A({
      completed: !0,
      correct: Q,
      score: V ? { correct: re, total: a.length } : void 0,
      attempts: k,
      responses: X
    });
  }
  function P() {
    O(), B(!1), j(!1), ee(void 0), H("neutral"), D(""), A({ completed: !1, correct: null, attempts: F, responses: {} });
  }
  return /* @__PURE__ */ o(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "drag-drop",
      "data-lp-block-id": e,
      "aria-busy": $ || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        l ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ r("p", { children: n }),
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: w ? `Selected: ${w}. Choose a target.` : "Select an item, then select a target to place it." }),
        /* @__PURE__ */ o("fieldset", { className: "lp-fieldset", disabled: J, children: [
          /* @__PURE__ */ r("legend", { children: "Items" }),
          /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
            g.map((R) => /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": I === R.id,
                onClick: () => U(R.id),
                children: [
                  R.label,
                  I === R.id ? " (selected)" : ""
                ]
              },
              R.id
            )),
            g.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ o("fieldset", { className: "lp-fieldset", disabled: J, children: [
          /* @__PURE__ */ r("legend", { children: "Targets" }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: c.map((R) => {
            const k = z(R.id), X = a.find((Q) => Q.id === k), re = T && V && k && !Z ? s[k] === R.id ? "Correct" : "Incorrect" : X ? "Placed" : "Empty";
            return /* @__PURE__ */ o("div", { className: "lp-card", children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("strong", { children: R.label }) }),
              /* @__PURE__ */ o("p", { className: "lp-card__meta", children: [
                X ? X.label : "No item yet",
                " · ",
                re
              ] }),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  onClick: () => q(R.id),
                  children: X ? `Place on ${R.label} (replace ${X.label})` : `Place on ${R.label}`
                }
              )
            ] }, R.id);
          }) })
        ] }),
        /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void M(), disabled: J, children: $ ? "Checking…" : "Check placement" }),
          te ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: P, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: G, message: Y })
      ]
    }
  );
}
function Rt({
  id: e = "option-cards",
  title: t,
  prompt: n,
  instructions: l,
  options: a,
  correctOptionId: c,
  feedback: s,
  formative: p = !0,
  retry: i = !0,
  shuffle: d = !1,
  maxAttempts: v,
  initialSelectedId: m,
  initialChecked: b = !1,
  onMarkResponse: f,
  onResult: h
}) {
  const C = le(() => be(a, d), [a, d]), [N, y] = Te(m || null, null), [I, U] = _(0), [q, z] = he(b, !!m), [O, F] = _(!1), [W, E] = _(b && m ? "informative" : "neutral"), [T, B] = _(b && m ? "Your answer was recorded." : ""), [$, j] = _(null);
  se(() => {
    !b || !N || (E("informative"), B("Your answer was recorded."));
  }, [b, N]);
  const [G, H] = _(), Y = oe(f), D = ye(p, !!c, f), K = `lp-option-cards-${e}`, ee = q || O, Z = pe({
    checked: q,
    localRetry: i,
    localMaxAttempts: v,
    attempts: I,
    serverCanRetry: G
  });
  function V(g) {
    h == null || h(g);
  }
  async function J() {
    if (O) return;
    if (!N) {
      E("informative"), B("Choose an option before checking.");
      return;
    }
    const g = I + 1, w = { optionId: N };
    if (Y && f) {
      F(!0), E("informative"), B("Checking your answer…");
      try {
        const P = Ce(await f(w), s, "Your choice has been recorded.");
        U(g), z(!0), j(P.correct), H(P.canRetry), E(P.status), B(P.message), V(me(P, g, w));
      } catch (P) {
        z(!1), j(null), H(!1), E("informative"), B(_e(P)), V({
          completed: !1,
          correct: null,
          attempts: g,
          responses: w,
          status: "error"
        });
      } finally {
        F(!1);
      }
      return;
    }
    const A = D ? N === c : null, M = D ? A ? (s == null ? void 0 : s.correct) || "That matches the expected option." : (s == null ? void 0 : s.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    U(g), z(!0), j(null), E(A === !0 ? "correct" : A === !1 ? "incorrect" : "informative"), B(M), V({
      completed: !0,
      correct: A,
      score: D ? { correct: A ? 1 : 0, total: 1 } : void 0,
      attempts: g,
      responses: w
    });
  }
  function te() {
    y(null), z(!1), F(!1), j(null), H(void 0), E("neutral"), B(""), V({
      completed: !1,
      correct: null,
      attempts: I,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ o(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "option-cards",
      "data-lp-block-id": e,
      "aria-busy": O || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        l ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ o("fieldset", { className: "lp-fieldset", disabled: ee, children: [
          /* @__PURE__ */ r("legend", { children: n }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: C.map((g) => {
            const w = N === g.id, x = q && D && w || q && Y && w && $ !== null ? (Y ? $ === !0 : g.id === c) ? "Correct" : "Incorrect" : w ? "Selected" : "";
            return /* @__PURE__ */ o("label", { className: "lp-card lp-activity-card", children: [
              /* @__PURE__ */ r(
                "input",
                {
                  type: "radio",
                  name: K,
                  value: g.id,
                  checked: w,
                  "data-lp-response": "",
                  onChange: () => y(g.id)
                }
              ),
              /* @__PURE__ */ o("span", { children: [
                /* @__PURE__ */ r("strong", { children: g.label }),
                g.description ? /* @__PURE__ */ o("span", { className: "lp-card__meta", children: [
                  " — ",
                  g.description
                ] }) : null
              ] }),
              g.imageSrc ? /* @__PURE__ */ r("img", { src: g.imageSrc, alt: g.imageAlt || g.label }) : null,
              x ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: x }) : null
            ] }, g.id);
          }) })
        ] }),
        /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void J(), disabled: ee, children: O ? "Checking…" : "Check answer" }),
          Z ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: te, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: W, message: T })
      ]
    }
  );
}
function $t(e, t) {
  var p;
  const n = [], l = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let a = 0, c = 0, s;
  for (; (s = l.exec(e)) !== null; ) {
    s.index > a && n.push(e.slice(a, s.index));
    const i = s[1] || ((p = t[c]) == null ? void 0 : p.id) || `gap-${c + 1}`;
    c += 1, n.push({ gapId: i }), a = s.index + s[0].length;
  }
  return a < e.length && n.push(e.slice(a)), !n.some((i) => typeof i != "string") && t[0] && (n.push(" "), n.push({ gapId: t[0].id })), n;
}
function Mt({
  id: e = "phrase-completion",
  title: t,
  prompt: n,
  instructions: l,
  gaps: a,
  options: c,
  correctOptionId: s,
  feedback: p,
  formative: i = !0,
  retry: d = !0,
  shuffle: v = !1,
  maxAttempts: m,
  initialPlacements: b = {},
  initialChecked: f = !1,
  onMarkResponse: h,
  onResult: C
}) {
  var R;
  const N = le(() => a && a.length ? a : [{ id: "gap", label: "missing term", correctOptionId: s || void 0 }], [s, a]), y = le(() => be(c, v), [c, v]), I = le(() => $t(n, N), [n, N]), { placements: U, selectedItemId: q, selectItem: z, selectTarget: O, occupantOf: F, reset: W } = De(b), [E, T] = _(0), [B, $] = he(f, Object.keys(b).length > 0), [j, G] = _(!1), [H, Y] = _(f && Object.keys(b).length ? "informative" : "neutral"), [D, K] = _(f && Object.keys(b).length ? "Your answer was recorded." : ""), [ee, Z] = _(), V = Object.fromEntries(
    N.map((k) => [k.id, k.correctOptionId]).filter((k) => k[1])
  ), J = ye(i, Object.keys(V).length > 0, h), te = B || j, g = pe({
    checked: B,
    localRetry: d,
    localMaxAttempts: m,
    attempts: E,
    serverCanRetry: ee
  }), w = y.filter((k) => !U[k.id]), A = (R = c.find((k) => k.id === q)) == null ? void 0 : R.label;
  function M(k) {
    C == null || C(k);
  }
  async function P() {
    if (j) return;
    if (!N.every((S) => F(S.id))) {
      Y("informative"), K("Fill every blank before checking.");
      return;
    }
    const X = E + 1, re = {};
    if (N.forEach((S) => {
      const L = F(S.id);
      L && (re[S.id] = L);
    }), oe(h) && h) {
      G(!0), Y("informative"), K("Checking your answer…");
      const S = await Ie(
        h,
        re,
        p,
        "Your phrase has been recorded."
      );
      if (G(!1), !S.ok) {
        $(!1), Z(!1), Y("informative"), K(S.message), M({ completed: !1, correct: null, attempts: X, responses: re, status: "error" });
        return;
      }
      T(X), $(!0), Z(S.marked.canRetry), Y(S.marked.status), K(S.marked.message), M(me(S.marked, X, re));
      return;
    }
    const Q = J ? N.filter((S) => re[S.id] === V[S.id]).length : 0, u = J ? Q === N.length : null;
    T(X), $(!0), Y(u === !0 ? "correct" : u === !1 ? "incorrect" : "informative"), K(J ? u ? (p == null ? void 0 : p.correct) || "That completes the phrase." : (p == null ? void 0 : p.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), M({
      completed: !0,
      correct: u,
      score: J ? { correct: Q, total: N.length } : void 0,
      attempts: X,
      responses: re
    });
  }
  function x() {
    W(), $(!1), G(!1), Z(void 0), Y("neutral"), K(""), M({ completed: !1, correct: null, attempts: E, responses: {} });
  }
  return /* @__PURE__ */ o(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "fill-gap",
      "data-lp-block-id": e,
      "aria-busy": j || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        l ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: A ? `Selected: ${A}. Choose a blank.` : "Select a phrase, then select the blank." }),
        /* @__PURE__ */ r("p", { children: I.map((k, X) => {
          if (typeof k == "string") return /* @__PURE__ */ r("span", { children: k }, `text-${X}`);
          const re = F(k.gapId), Q = c.find((L) => L.id === re), u = N.find((L) => L.id === k.gapId), S = B && J && re ? V[k.gapId] === re ? "Correct" : "Incorrect" : Q ? "Filled" : "Blank";
          return /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              disabled: te,
              "aria-label": `${(u == null ? void 0 : u.label) || "blank"}: ${(Q == null ? void 0 : Q.label) || "empty"}. ${S}`,
              onClick: () => O(k.gapId),
              children: (Q == null ? void 0 : Q.label) || "______"
            },
            k.gapId
          );
        }) }),
        /* @__PURE__ */ o("fieldset", { className: "lp-fieldset", disabled: te, children: [
          /* @__PURE__ */ r("legend", { children: "Available phrases" }),
          /* @__PURE__ */ r("div", { className: "lp-card__actions", children: w.map((k) => /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "lp-button",
              "aria-pressed": q === k.id,
              onClick: () => z(k.id),
              children: [
                k.label,
                q === k.id ? " (selected)" : ""
              ]
            },
            k.id
          )) })
        ] }),
        /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void P(), disabled: te, children: j ? "Checking…" : "Check phrase" }),
          g ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: x, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: H, message: D })
      ]
    }
  );
}
function Pt({
  id: e = "sequence",
  title: t,
  prompt: n,
  instructions: l,
  items: a,
  correctOrder: c = [],
  feedback: s,
  formative: p = !0,
  retry: i = !0,
  shuffle: d = !1,
  maxAttempts: v,
  initialOrder: m,
  initialChecked: b = !1,
  onMarkResponse: f,
  onResult: h
}) {
  const C = le(() => be(a, d), [a, d]), N = le(() => {
    if (!Array.isArray(m) || !m.length) return C;
    const g = new Map(a.map((A) => [A.id, A])), w = m.map((A) => g.get(A)).filter(Boolean);
    return w.length === a.length ? w : C;
  }, [C, m, a]), [y, I] = _(N);
  se(() => {
    !Array.isArray(m) || !m.length || I(N);
  }, [m, N]);
  const [U, q] = _(0), [z, O] = he(b, !!(m != null && m.length)), [F, W] = _(!1), [E, T] = _(b && (m != null && m.length) ? "informative" : "neutral"), [B, $] = _(b && (m != null && m.length) ? "Your answer was recorded." : ""), [j, G] = _(), H = oe(f), Y = ye(p, c.length > 0, f), D = z || F, K = pe({
    checked: z,
    localRetry: i,
    localMaxAttempts: v,
    attempts: U,
    serverCanRetry: j
  });
  function ee(g) {
    h == null || h(g);
  }
  function Z(g, w) {
    const A = g + w;
    if (A < 0 || A >= y.length) return;
    const M = y.slice(), [P] = M.splice(g, 1);
    M.splice(A, 0, P), I(M);
  }
  function V(g, w) {
    D || (g.key === "ArrowUp" && (g.preventDefault(), Z(w, -1)), g.key === "ArrowDown" && (g.preventDefault(), Z(w, 1)));
  }
  async function J() {
    if (F) return;
    const g = U + 1, w = y.map((x) => x.id), A = { itemIds: w };
    if (H && f) {
      W(!0), T("informative"), $("Checking your answer…");
      const x = await Ie(
        f,
        A,
        s,
        "Your sequence has been recorded."
      );
      if (W(!1), !x.ok) {
        O(!1), G(!1), T("informative"), $(x.message), ee({ completed: !1, correct: null, attempts: g, responses: A, status: "error" });
        return;
      }
      q(g), O(!0), G(x.marked.canRetry), T(x.marked.status), $(x.marked.message), ee(me(x.marked, g, A));
      return;
    }
    const M = Y ? w.filter((x, R) => x === c[R]).length : 0, P = Y ? M === c.length && w.length === c.length : null;
    q(g), O(!0), T(P === !0 ? "correct" : P === !1 ? "incorrect" : "informative"), $(Y ? P ? (s == null ? void 0 : s.correct) || "That order matches the expected sequence." : (s == null ? void 0 : s.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), ee({
      completed: !0,
      correct: P,
      score: Y ? { correct: M, total: c.length } : void 0,
      attempts: g,
      responses: A
    });
  }
  function te() {
    I(C), O(!1), W(!1), G(void 0), T("neutral"), $(""), ee({
      completed: !1,
      correct: null,
      attempts: U,
      responses: { itemIds: C.map((g) => g.id) }
    });
  }
  return /* @__PURE__ */ o(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "ordering",
      "data-lp-block-id": e,
      "aria-busy": F || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        l ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ r("p", { children: n }),
        /* @__PURE__ */ r("ol", { className: "lp-activity-list", children: y.map((g, w) => /* @__PURE__ */ o(
          "li",
          {
            className: "lp-card",
            tabIndex: D ? -1 : 0,
            "aria-label": `${g.label}, position ${w + 1} of ${y.length}`,
            onKeyDown: (A) => V(A, w),
            children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ o("strong", { children: [
                w + 1,
                ". ",
                g.label
              ] }) }),
              /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: D || w === 0,
                    onClick: () => Z(w, -1),
                    children: [
                      "Move ",
                      g.label,
                      " up"
                    ]
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: D || w === y.length - 1,
                    onClick: () => Z(w, 1),
                    children: [
                      "Move ",
                      g.label,
                      " down"
                    ]
                  }
                )
              ] })
            ]
          },
          g.id
        )) }),
        /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void J(), disabled: D, children: F ? "Checking…" : "Check order" }),
          K ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: te, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: E, message: B })
      ]
    }
  );
}
function ce(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Lt(e) {
  var t;
  return (e == null ? void 0 : e.formative) === !0 || ((t = e == null ? void 0 : e.marking) == null ? void 0 : t.mode) === "formative-local";
}
function Ft(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function Dt(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const Bt = [
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
], xe = 200, jt = 500;
function Be(e, t) {
  const n = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return n > 0 ? n : t;
}
function je(e) {
  return Bt.includes(ce(e));
}
function Re(e) {
  var t;
  return ((t = e.content) == null ? void 0 : t.questionId) || e.id;
}
function Yt({
  id: e,
  prompt: t,
  placeholder: n,
  value: l,
  defaultValue: a = "",
  minChars: c,
  minimumCharacters: s,
  defaultMinChars: p = xe,
  rows: i = 4,
  disabled: d = !1,
  hidePrompt: v = !1,
  onChange: m
}) {
  const b = Ne(), f = e || b, h = Be({ minChars: c, minimumCharacters: s }, p), C = typeof l == "string", [N, y] = _(String(a || "")), [I, U] = _(""), q = C ? l : N, z = q.trim().length, O = z >= h;
  function F(T) {
    C || y(T), m == null || m(T);
  }
  function W(T) {
    T.preventDefault(), U("Paste is disabled. Type your answer in your own words.");
  }
  function E(T) {
    T.preventDefault(), U("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ o("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ o("label", { className: "lp-field", htmlFor: f, children: [
      v ? /* @__PURE__ */ r("span", { className: "lp-visually-hidden", children: t }) : /* @__PURE__ */ r("span", { className: "lp-field__label", children: t }),
      /* @__PURE__ */ r(
        "textarea",
        {
          id: f,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(h),
          rows: i,
          value: q,
          placeholder: n,
          minLength: h,
          autoComplete: "off",
          disabled: d,
          "aria-describedby": `${f}-count ${f}-notice`,
          onChange: (T) => F(T.target.value),
          onPaste: W,
          onDrop: E
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "p",
      {
        id: `${f}-count`,
        className: "lp-char-count",
        "data-lp-char-count": "",
        "data-lp-met": O ? "true" : "false",
        "aria-live": "polite",
        children: `${z} / ${h} characters minimum`
      }
    ),
    /* @__PURE__ */ r(
      "p",
      {
        id: `${f}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: I
      }
    )
  ] });
}
function qt(e, t) {
  return t > 0 ? `Write at least ${e} characters. You currently have ${t}.` : `Write at least ${e} characters before saving.`;
}
function Ye({
  id: e = "text-response",
  blockType: t = "short-response",
  title: n,
  prompt: l,
  instructions: a,
  guidance: c,
  placeholder: s,
  minChars: p,
  minimumCharacters: i,
  defaultMinChars: d = xe,
  rows: v = 4,
  feedback: m,
  retry: b = !0,
  maxAttempts: f,
  initialResponse: h = "",
  initialChecked: C = !1,
  saveLabel: N = "Save response",
  onMarkResponse: y,
  onResult: I
}) {
  const U = Be({ minChars: p, minimumCharacters: i }, d), [q, z] = Te(String(h || ""), ""), [O, F] = _(0), [W, E] = he(C, !!String(h || "").trim()), [T, B] = _(!1), [$, j] = _(C && String(h || "").trim() ? "informative" : "neutral"), [G, H] = _(C && String(h || "").trim() ? "Your answer was recorded." : ""), [Y, D] = _(), K = q.trim(), ee = K.length, Z = ee >= U, V = oe(y), J = W || T, te = pe({
    checked: W,
    localRetry: b,
    localMaxAttempts: f,
    attempts: O,
    serverCanRetry: Y
  });
  function g(M) {
    I == null || I(M);
  }
  async function w() {
    if (T) return;
    if (!Z) {
      j("informative"), H(qt(U, ee));
      return;
    }
    const M = O + 1;
    if (V && y) {
      B(!0), j("informative"), H("Saving your response…");
      try {
        const x = Ce(
          await y(K),
          m,
          c || "Your response has been recorded."
        );
        F(M), E(!0), D(x.canRetry), j(x.status), H(x.requiresReview || x.correct !== null ? x.message : c || x.message), g(me(x, M, K));
      } catch (x) {
        E(!1), D(!1), j("informative"), H(_e(x)), g({
          completed: !1,
          correct: null,
          attempts: M,
          responses: K,
          status: "error"
        });
      } finally {
        B(!1);
      }
      return;
    }
    const P = c || (m == null ? void 0 : m.correct) || "Saved.";
    F(M), E(!0), j("informative"), H(P), g({
      completed: !0,
      correct: null,
      attempts: M,
      responses: K
    });
  }
  function A() {
    z(""), E(!1), B(!1), D(void 0), j("neutral"), H(""), g({
      completed: !1,
      correct: null,
      attempts: O,
      responses: ""
    });
  }
  return /* @__PURE__ */ o(
    "section",
    {
      className: "lp-block lp-block--interactive lp-form",
      "data-lp-block": t,
      "data-lp-block-id": e,
      "aria-busy": T || void 0,
      children: [
        n ? /* @__PURE__ */ r("h3", { children: n }) : null,
        a ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ r(
          Yt,
          {
            id: `${e}-field`,
            prompt: l,
            placeholder: s,
            value: q,
            minChars: p,
            minimumCharacters: i,
            defaultMinChars: d,
            rows: v,
            disabled: J,
            onChange: z
          }
        ),
        /* @__PURE__ */ o("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void w(), disabled: J, children: T ? "Saving…" : N }),
          te ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: A, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: $, message: G })
      ]
    }
  );
}
function Ot({
  rows: e = 4,
  ...t
}) {
  return /* @__PURE__ */ r(
    Ye,
    {
      ...t,
      blockType: "short-response",
      defaultMinChars: xe,
      rows: e
    }
  );
}
function Ht({
  rows: e = 6,
  ...t
}) {
  return /* @__PURE__ */ r(
    Ye,
    {
      ...t,
      blockType: "reflection",
      defaultMinChars: jt,
      rows: e
    }
  );
}
function Kt(e) {
  const t = e.content || {};
  return {
    id: e.id,
    instructions: t.instructions,
    feedback: t.feedback,
    formative: Lt(t),
    retry: Ft(t),
    shuffle: Dt(t),
    maxAttempts: t.maxAttempts
  };
}
function $e(e) {
  return typeof e == "string" ? e : void 0;
}
function Ut({ block: e, initialResponse: t, initialChecked: n, onMarkResponse: l, onResult: a }) {
  const c = ce(e.type), s = e.content || {}, p = ce(s.presentation), i = Kt(e), d = (v) => a == null ? void 0 : a(v, e);
  if (c === "single-choice" || c === "option-cards" || p === "option-cards" || p === "true-false" || p === "picture-quiz")
    return /* @__PURE__ */ r(
      Rt,
      {
        ...i,
        prompt: s.prompt || "Choose an option",
        options: s.options || [],
        correctOptionId: s.correctOptionId,
        initialSelectedId: typeof t == "string" ? t : void 0,
        initialChecked: n,
        onMarkResponse: l,
        onResult: d
      }
    );
  if (c === "classification") {
    const v = t && typeof t == "object" && !Array.isArray(t) ? t : void 0;
    return /* @__PURE__ */ r(
      Tt,
      {
        ...i,
        prompt: s.prompt || "Classify each item",
        items: s.items || [],
        categories: s.categories || [],
        initialAssignments: v,
        initialChecked: n,
        onMarkResponse: l,
        onResult: d
      }
    );
  }
  return c === "drag-drop" ? /* @__PURE__ */ r(
    Et,
    {
      ...i,
      prompt: s.prompt || "Place each item",
      items: s.items || [],
      targets: s.targets || [],
      correct: s.correct,
      initialPlacements: t && typeof t == "object" && !Array.isArray(t) ? t : void 0,
      initialChecked: n,
      onMarkResponse: l,
      onResult: d
    }
  ) : c === "fill-gap" || c === "phrase-completion" ? /* @__PURE__ */ r(
    Mt,
    {
      ...i,
      prompt: s.prompt || "Complete the phrase",
      gaps: s.gaps,
      options: s.options || [],
      correctOptionId: s.correctOptionId,
      initialPlacements: t && typeof t == "object" && !Array.isArray(t) ? t : void 0,
      initialChecked: n,
      onMarkResponse: l,
      onResult: d
    }
  ) : c === "ordering" || c === "sequence" ? /* @__PURE__ */ r(
    Pt,
    {
      ...i,
      prompt: s.prompt || "Put the items in order",
      items: s.items || [],
      correctOrder: s.correctOrder,
      initialOrder: Array.isArray(t) ? t : void 0,
      initialChecked: n,
      onMarkResponse: l,
      onResult: d
    }
  ) : c === "short-response" ? /* @__PURE__ */ r(
    Ot,
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
      initialResponse: $e(t),
      initialChecked: n,
      onMarkResponse: l,
      onResult: d
    }
  ) : c === "reflection" ? /* @__PURE__ */ r(
    Ht,
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
      initialResponse: $e(t),
      initialChecked: n,
      onMarkResponse: l,
      onResult: d
    }
  ) : /* @__PURE__ */ o("p", { className: "lp-card__meta", "data-lp-block": c, children: [
    "This ",
    c || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function Vt(e, t, n, l) {
  if (l === "local") return n;
  const a = n || At(e, t);
  return l === "server" && !a ? Fe() : a;
}
function br({
  activity: e,
  initialResponses: t = {},
  initialChecked: n = {},
  renderFallback: l,
  platform: a,
  markingMode: c,
  onMarkResponse: s,
  onResult: p
}) {
  var b, f;
  const [i, d] = _(0), v = Ue(e) || void 0, m = Vt(a, e, s, c);
  return /* @__PURE__ */ o(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": v,
      children: [
        (b = e.metadata) != null && b.title ? /* @__PURE__ */ r("h3", { children: e.metadata.title }) : null,
        (f = e.metadata) != null && f.summary ? /* @__PURE__ */ r("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ r("div", { className: "lp-activity-list", children: (e.blocks || []).map((h) => je(h.type) ? /* @__PURE__ */ r(
          Ut,
          {
            block: h,
            initialResponse: t[Re(h)],
            initialChecked: !!n[Re(h)],
            onMarkResponse: m ? (C) => m({
              activityId: e.id,
              activityVersion: v || "",
              block: h,
              responses: C
            }) : void 0,
            onResult: p
          },
          h.id
        ) : l ? /* @__PURE__ */ r("div", { children: l(h) }, h.id) : /* @__PURE__ */ o("p", { className: "lp-card__meta", "data-lp-block": ce(h.type), children: [
          "This ",
          ce(h.type) || "unknown",
          " block is not part of the React activity catalogue yet."
        ] }, h.id)) }, i),
        /* @__PURE__ */ o("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => d((h) => h + 1),
              children: "Reset activity"
            }
          ),
          /* @__PURE__ */ r("p", { className: "lp-activity-status", "data-lp-activity-status": !0, role: "status", "aria-live": "polite" })
        ] })
      ]
    }
  );
}
function Gt(e, t) {
  return typeof t == "number" && Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function qe({
  title: e,
  badge: t,
  subtitle: n,
  score: l,
  progress: a,
  completed: c = !0,
  attempts: s,
  message: p,
  showStatus: i = !0,
  showDisclaimer: d = !0,
  collapsed: v = !1
}) {
  const m = t || n, b = Gt(l, a), f = Math.round(b * 100), h = c ? "Completed" : "In progress", C = l ? `${l.correct} / ${l.total}` : null, N = l ? `${l.correct} of ${l.total} correct` : null, y = typeof s == "number" ? `${s} ${s === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": v ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ r("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ r("strong", { children: e }) }) : null,
        i ? /* @__PURE__ */ r(ge, { status: c ? "completed" : "progress", label: h }) : null,
        C ? /* @__PURE__ */ r(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": N || void 0,
            children: C
          }
        ) : null,
        N ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: N }) : null,
        !v && m ? /* @__PURE__ */ r("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ r("strong", { children: m }) }) : null,
        v ? null : /* @__PURE__ */ o(Oe, { children: [
          /* @__PURE__ */ r(
            "progress",
            {
              className: "lp-progress",
              max: 100,
              value: f,
              "aria-label": `${f}% complete`
            }
          ),
          /* @__PURE__ */ o("p", { className: "lp-card__meta", children: [
            f,
            "% complete"
          ] }),
          y ? /* @__PURE__ */ r("p", { children: y }) : null,
          p ? /* @__PURE__ */ r("p", { children: p }) : null,
          d ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function zt(e, t) {
  if (e)
    try {
      t && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !t && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      t ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function vr({
  open: e = !1,
  title: t = "Activity complete",
  completed: n = !0,
  score: l,
  badge: a,
  subtitle: c,
  progress: s,
  attempts: p,
  message: i,
  onClose: d,
  onReview: v,
  onNext: m,
  nextLabel: b = "Continue",
  reviewLabel: f = "Review"
}) {
  const h = He(null), C = Ne();
  return se(() => {
    zt(h.current, e);
  }, [e]), e ? /* @__PURE__ */ o(
    "dialog",
    {
      ref: h,
      className: "lp-dialog",
      "aria-labelledby": C,
      onCancel: (N) => {
        N.preventDefault(), d == null || d();
      },
      children: [
        /* @__PURE__ */ o("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ r("h2", { id: C, children: t }),
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${t}`,
              onClick: d,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ r(
            qe,
            {
              completed: n,
              score: l,
              badge: a,
              subtitle: c,
              progress: s,
              attempts: p,
              message: i
            }
          ),
          /* @__PURE__ */ o("div", { className: "lp-form__actions", children: [
            v ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: v, children: f }) : null,
            m ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: m, children: b }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const Wt = (e) => ({
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
function Nr({
  collapsed: e,
  defaultCollapsed: t = !0,
  onCollapsedChange: n,
  expandLabel: l = "Show progress details",
  collapseLabel: a = "Hide progress details",
  ...c
}) {
  const [s, p] = _(t), i = typeof e == "boolean" ? e : s, d = Ne(), v = c.title || "Practice progress";
  function m(b) {
    typeof e != "boolean" && p(b), n == null || n(b);
  }
  return /* @__PURE__ */ o(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: Wt(i),
      "aria-label": v,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": i ? "true" : "false",
      children: [
        /* @__PURE__ */ r("div", { id: d, children: /* @__PURE__ */ r(qe, { ...c, title: v, collapsed: i }) }),
        /* @__PURE__ */ r("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !i,
            "aria-controls": d,
            onClick: () => m(!i),
            children: i ? l : a
          }
        ) })
      ]
    }
  );
}
const Xt = {
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
}, Zt = {
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
}, Jt = {
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
}, Qt = {
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
}, er = {
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
}, tr = {
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
}, rr = {
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
}, nr = {
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
}, _r = [
  Xt,
  Zt,
  Jt,
  Qt,
  er,
  tr,
  rr,
  nr
];
function ar(e) {
  const t = ce(e.type);
  return t === "single-choice" || t === "option-cards" || t === "classification" || t === "drag-drop" || t === "fill-gap" || t === "phrase-completion" || t === "ordering" || t === "sequence";
}
function Cr(e) {
  return je(e.type);
}
function wr(e) {
  if (!ar(e)) return 0;
  const t = ce(e.type);
  return t === "classification" ? (e.content && e.content.items || []).length : t === "drag-drop" ? (e.content && e.content.items || []).length : t === "fill-gap" || t === "phrase-completion" ? (e.content && e.content.gaps || []).length || 1 : t === "ordering" || t === "sequence" ? (e.content && e.content.items || []).length : 1;
}
function kr() {
  return { completed: {}, scores: {} };
}
function Sr(e, t, n) {
  const l = { ...e.completed }, a = { ...e.scores };
  return n.completed ? (l[t] = !0, n.score && n.score.total > 0 && !n.requiresReview ? a[t] = n.score : delete a[t], { completed: l, scores: a }) : e;
}
function Ar(e, t) {
  return t.length > 0 && t.every((n) => e.completed[n]);
}
function Ir(e, t) {
  var l;
  if (!e.completed) return !1;
  const n = ((l = e.score) == null ? void 0 : l.total) || 0;
  return t.complete || t.completedCount >= 2 || n >= 2;
}
function Tr(e, t) {
  const n = Object.values(e.completed).filter(Boolean).length, l = Object.values(e.scores).reduce(
    (c, s) => ({
      correct: c.correct + s.correct,
      total: c.total + s.total
    }),
    { correct: 0, total: 0 }
  ), a = Math.max(0, t.requiredBlocks);
  return {
    completedCount: n,
    requiredBlocks: a,
    completion: a > 0 ? Math.min(1, n / a) : 0,
    score: {
      correct: l.correct,
      total: Math.max(t.scorableTotal, l.total, 0)
    },
    complete: a > 0 && n >= a
  };
}
export {
  Ut as ActivityBlock,
  at as ActivityCard,
  gt as AuthoredHtml,
  st as Breadcrumbs,
  Ge as CONTEXT_TYPES,
  ot as Callout,
  Tt as Classification,
  vr as CompletionModal,
  it as ContextPanel,
  Et as DragDrop,
  Pe as EmptyState,
  ur as ErrorState,
  _t as FEEDBACK_STATES,
  ue as FeedbackPanel,
  pr as HubShell,
  br as InteractiveActivity,
  ir as LEARNER_ACTIVITY_STATES,
  mr as LearnerHeader,
  ut as LearningOutcomeBadge,
  Yt as LearningTextField,
  hr as LoadingState,
  dt as Navigation,
  Rt as OptionCards,
  Mt as PhraseCompletion,
  Nr as PracticeProgressPanel,
  pt as ProgressCard,
  qe as ProgressSummary,
  jt as REFLECTION_DEFAULT_MIN_CHARS,
  Ht as Reflection,
  ke as SERVER_CHECK_FAILED_MESSAGE,
  wt as SERVER_REVIEW_MESSAGE,
  ze as SESSION_KINDS,
  we as SESSION_KIND_LABELS,
  xe as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  dr as STATUS_TONES,
  Pt as Sequence,
  mt as SessionSection,
  Ot as ShortResponse,
  ge as StatusBadge,
  Ye as TextResponse,
  de as WEEK_ACCESS_COPY,
  We as WEEK_UI_FEATURES,
  yr as WeekAccessGuard,
  gr as WeekAccessLink,
  ht as WeekHeader,
  ft as WeekNavigation,
  fr as WeekView,
  nt as activityActionLabel,
  Tr as aggregatePracticeProgress,
  Sr as applyPracticeResult,
  wr as catalogueBlockScorableTotal,
  At as createMarkResponseHandler,
  _r as demoCatalogueActivities,
  tr as demoClassification,
  Jt as demoDragDrop,
  Xt as demoOptionCards,
  Qt as demoPhraseCompletion,
  nr as demoReflection,
  er as demoSequence,
  rr as demoShortResponse,
  Zt as demoTrueFalse,
  kr as emptyPracticeProgress,
  je as isCatalogueReactType,
  Cr as isCompletableReactBlock,
  Je as isIndependentKind,
  Ir as isPracticeCompletionCue,
  ar as isScorableReactBlock,
  Qe as isSessionKind,
  St as learnerSafeBlock,
  Xe as mergeWeekUiFeatures,
  ce as normaliseActivityType,
  Re as questionIdFor,
  Be as resolveMinChars,
  Gt as resolveProgressFraction,
  Ae as resolveWeekStatus,
  Ar as scorableBlocksComplete,
  Ze as shouldShowContext,
  Me as statusLabel,
  rt as statusTone,
  vt as weekAccessFallbackCopy,
  Le as weekIsAccessible
};
//# sourceMappingURL=index.js.map
