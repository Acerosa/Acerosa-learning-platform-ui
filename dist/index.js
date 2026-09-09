import { jsxs as i, jsx as r, Fragment as Ue } from "react/jsx-runtime";
import { useId as _e, useState as C, useEffect as le, useMemo as se, useCallback as Ne, useRef as Le } from "react";
import { isUnsafeAuthoredHtml as Ve, resolveActivityVersion as Ge } from "@learning-platform/core";
import { isWeekAvailable as ze } from "@learning-platform/core/curriculum-runtime";
const We = ["exam", "assignment", "project"], Xe = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], ke = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, ur = ["not-started", "in-progress", "completed"], pr = ["available", "planned", "progress", "completed"], Ze = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function Je(e = {}) {
  return { ...Ze, ...e };
}
function Qe(e, t) {
  return t ? t === "assignment" ? e.showAssignmentContext !== !1 : t === "exam" ? e.showExamContext !== !1 : t === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function et(e) {
  return e === "independent-study" || e === "homework";
}
function tt(e) {
  return Xe.includes(e);
}
const rt = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, nt = {
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
function at(e) {
  return rt[e || ""] || "planned";
}
function De(e, t = "") {
  return nt[e || ""] || t || String(e || "Planned");
}
function st(e, t = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : t;
}
function ge({
  status: e = "planned",
  label: t,
  marker: n = !0
}) {
  const s = at(e);
  return /* @__PURE__ */ i("span", { className: `lp-status-badge lp-status-badge--${s}`, role: "status", children: [
    n ? /* @__PURE__ */ r("span", { "aria-hidden": "true", children: "● " }) : null,
    t || De(e)
  ] });
}
function lt({
  title: e = "Untitled activity",
  description: t = "",
  activityType: n = "Activity",
  duration: s = "",
  status: a = "Not started",
  state: o,
  href: l,
  actionLabel: c,
  badge: h = !1,
  badgeStatus: d,
  headingLevel: y = 2,
  muted: u = !1
}) {
  const b = y === 3 ? "h3" : "h2", m = [n, s].filter(Boolean), v = o ? De(o, a) : a;
  return /* @__PURE__ */ i("article", { className: u ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": o || void 0, children: [
    h ? /* @__PURE__ */ r(
      ge,
      {
        status: d || o || "planned",
        label: typeof a == "string" && a !== "Not started" ? a : void 0
      }
    ) : null,
    m.length ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: m.join(" · ") }) : null,
    /* @__PURE__ */ r(b, { children: e }),
    t ? /* @__PURE__ */ r("p", { children: t }) : null,
    /* @__PURE__ */ r("p", { className: "lp-card__meta", children: `Status: ${v}` }),
    l ? /* @__PURE__ */ r("div", { className: "lp-card__actions", children: /* @__PURE__ */ r("a", { className: "lp-button", href: l, children: c || st(o) }) }) : null
  ] });
}
function ct(e, t) {
  return e.href ? e.href : e.path != null && t ? t(e.path) : e.path || void 0;
}
function ot({ items: e = [], resolveHref: t }) {
  return e.length ? /* @__PURE__ */ r("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ r("ol", { className: "lp-breadcrumbs__list", children: e.map((n, s) => {
    const a = s === e.length - 1, o = ct(n, t);
    return /* @__PURE__ */ r("li", { children: a || !o ? /* @__PURE__ */ r("span", { "aria-current": "page", children: n.label }) : /* @__PURE__ */ r("a", { href: o, children: n.label }) }, `${n.label}-${s}`);
  }) }) }) : /* @__PURE__ */ r("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const it = ["info", "success", "warning", "error"];
function dt({ tone: e = "info", title: t, message: n }) {
  const s = it.includes(e) ? e : "info";
  return /* @__PURE__ */ i(
    "aside",
    {
      className: `lp-callout lp-callout--${s}`,
      role: s === "error" ? "alert" : void 0,
      children: [
        t ? /* @__PURE__ */ r("strong", { children: t }) : null,
        n ? /* @__PURE__ */ r("p", { children: n }) : null
      ]
    }
  );
}
function ut({
  contextType: e = "assignment",
  heading: t = "Context",
  items: n = [],
  description: s = "",
  action: a
}) {
  const o = We.includes(e) ? e : "assignment", l = `lp-context-${o}`;
  return /* @__PURE__ */ i(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${o}`,
      "aria-labelledby": l,
      "data-context-type": o,
      children: [
        /* @__PURE__ */ r("h2", { id: l, children: t }),
        n.length ? /* @__PURE__ */ r("dl", { className: "lp-meta-list", children: n.map((c) => /* @__PURE__ */ i("div", { children: [
          /* @__PURE__ */ r("dt", { children: c.label }),
          /* @__PURE__ */ r("dd", { children: c.value })
        ] }, `${c.label}:${c.value}`)) }) : null,
        s ? /* @__PURE__ */ r("p", { children: s }) : null,
        a != null && a.label && (a != null && a.href) ? /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: a.href, children: a.label }) }) : null
      ]
    }
  );
}
function Fe({
  heading: e = "Nothing to show yet",
  message: t = "Check again later.",
  action: n
}) {
  return /* @__PURE__ */ i("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ r("h2", { children: e }),
    /* @__PURE__ */ r("p", { children: t }),
    n != null && n.label && (n != null && n.href) ? /* @__PURE__ */ r("a", { className: "lp-button", href: n.href, children: n.label }) : null
  ] });
}
function mr({
  heading: e = "There is a problem",
  message: t = "Try again."
}) {
  return /* @__PURE__ */ i("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ r("h2", { children: e }),
    /* @__PURE__ */ r("p", { children: t })
  ] });
}
function pt({
  items: e,
  currentId: t = "home",
  currentIds: n = [],
  brandTitle: s,
  brandTagline: a,
  homeHref: o,
  theme: l = null,
  actions: c,
  listId: h
}) {
  const d = _e(), y = h || `lp-navigation-list-${d}`, [u, b] = C(!1), m = new Set([t, ...n].filter(Boolean)), v = e.find((g) => g.id === "home" && g.enabled !== !1), f = e.filter((g) => g.enabled !== !1);
  le(() => {
    function g(E) {
      E.key === "Escape" && b(!1);
    }
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, []);
  function N(g) {
    if (g.key === "Escape") {
      b(!1);
      const E = g.currentTarget.querySelector(".lp-navigation__toggle");
      E == null || E.focus();
    }
  }
  return /* @__PURE__ */ r("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: N, children: /* @__PURE__ */ i("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ i("a", { className: "lp-navigation__brand", href: o || (v == null ? void 0 : v.path) || "./", children: [
      /* @__PURE__ */ r("span", { className: "lp-navigation__brand-title", children: s }),
      a ? /* @__PURE__ */ r("span", { className: "lp-navigation__brand-tagline", children: a }) : null
    ] }),
    /* @__PURE__ */ r(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": u,
        "aria-controls": y,
        "aria-label": u ? "Close main menu" : "Open main menu",
        onClick: () => b((g) => !g),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ r(
      "ul",
      {
        className: "lp-navigation__list",
        id: y,
        "data-open": u ? "true" : "false",
        children: f.map((g) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(
          "a",
          {
            className: "lp-navigation__link",
            href: g.path,
            "aria-current": m.has(g.id) ? "page" : void 0,
            onClick: () => b(!1),
            children: g.label
          }
        ) }, g.id))
      }
    ),
    l ? /* @__PURE__ */ i("label", { className: "lp-theme-control", children: [
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
    c ? /* @__PURE__ */ r("div", { className: "lp-navigation__actions", children: c }) : null
  ] }) });
}
function hr({
  brandTitle: e,
  brandTagline: t,
  navigation: n,
  currentId: s = "home",
  currentIds: a = [],
  theme: o = null,
  actions: l,
  breadcrumbs: c,
  resolveHref: h,
  pageHeader: d,
  footer: y,
  learnerHeader: u,
  notice: b,
  skipLabel: m = "Skip to main content",
  mainId: v = "main-content",
  children: f
}) {
  const N = y && typeof y == "object" && "lines" in y ? y.lines.map((g) => /* @__PURE__ */ r("p", { children: g }, g)) : y;
  return /* @__PURE__ */ i("div", { className: "lp-shell", children: [
    /* @__PURE__ */ r("a", { className: "lp-skip-link skip-link", href: `#${v}`, children: m }),
    /* @__PURE__ */ r("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ r(
      pt,
      {
        items: n,
        currentId: s,
        currentIds: a,
        brandTitle: e,
        brandTagline: t,
        theme: o,
        actions: l
      }
    ) }),
    /* @__PURE__ */ r("div", { className: "lp-shell__learner", children: u }),
    b,
    c ? /* @__PURE__ */ r(ot, { items: c, resolveHref: h }) : null,
    d != null && d.title ? /* @__PURE__ */ i("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ r("h1", { children: d.title }),
      d.subtitle ? /* @__PURE__ */ r("p", { className: "lp-page-header__subtitle", children: d.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ r("main", { id: v, className: "lp-shell__main site-main", tabIndex: -1, children: f }),
    /* @__PURE__ */ r("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: N })
  ] });
}
function fr({
  learner: e,
  hubName: t,
  accountHref: n = "./account/",
  onSignOut: s
}) {
  return e ? /* @__PURE__ */ i("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ i("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Learner" }),
        /* @__PURE__ */ r("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Year group" }),
        /* @__PURE__ */ r("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Email" }),
        /* @__PURE__ */ r("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ r("dt", { children: "Current hub" }),
        /* @__PURE__ */ r("dd", { children: t })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ r("a", { href: n, children: "Account" }),
      s ? /* @__PURE__ */ r("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        s();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ r("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function mt({ id: e, title: t }) {
  const n = [e, t].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ r("span", { className: "lp-outcome-badge", children: n });
}
function gr({ message: e = "Loading…" }) {
  return /* @__PURE__ */ i("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ r("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ r("span", { children: e })
  ] });
}
function ht({
  title: e = "Progress",
  completed: t = 0,
  total: n = 0,
  description: s = ""
}) {
  const a = Math.max(0, Number(n) || 0), o = Math.min(a, Math.max(0, Number(t) || 0)), l = a ? Math.round(o / a * 100) : 0;
  return /* @__PURE__ */ i("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ r("h2", { children: e }),
    s ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: s }) : null,
    /* @__PURE__ */ r(
      "progress",
      {
        className: "lp-progress",
        max: a || 1,
        value: o,
        "aria-label": `${l}% complete`
      }
    ),
    /* @__PURE__ */ r("p", { children: `${o} of ${a} complete (${l}%)` })
  ] });
}
function ft({
  id: e,
  title: t,
  kind: n = "session",
  summary: s = "",
  defaultOpen: a = !1,
  meta: o,
  children: l
}) {
  const c = tt(n) ? n : "session", h = ke[c];
  return /* @__PURE__ */ i("details", { className: "lp-session lp-panel", id: e, "data-kind": c, open: a, children: [
    /* @__PURE__ */ r("summary", { className: "lp-session__summary", children: /* @__PURE__ */ i("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ r("h2", { className: "lp-session__heading", children: t || h }),
      /* @__PURE__ */ r("span", { className: "lp-session__meta", children: o || h })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "lp-session__content", children: [
      s ? /* @__PURE__ */ r("p", { className: "lp-panel-note", children: s }) : null,
      /* @__PURE__ */ r("div", { className: "lp-activity-list", children: l })
    ] })
  ] });
}
function gt({
  teachingWeek: e,
  title: t = "",
  subtitle: n = "",
  status: s,
  learningOutcomes: a = [],
  headingLevel: o = 1,
  showTitle: l = !0
}) {
  const c = e ? `Week ${e}${t ? `: ${t}` : ""}` : t || "Week";
  return /* @__PURE__ */ i("header", { className: "lp-week-header", children: [
    s ? /* @__PURE__ */ r(ge, { status: s }) : null,
    l ? /* @__PURE__ */ r(o === 2 ? "h2" : "h1", { children: c }) : e ? /* @__PURE__ */ r("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    n ? /* @__PURE__ */ r("p", { className: "lp-week-header__subtitle", children: n }) : null,
    a.length ? /* @__PURE__ */ r("ul", { className: "lp-week-header__outcomes", children: a.map((d) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(mt, { id: d.id, title: d.title }) }, d.id || d.title)) }) : null
  ] });
}
function yt({ previousWeek: e, nextWeek: t }) {
  return !(e != null && e.href) && !(t != null && t.href) ? null : /* @__PURE__ */ r("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ i("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    t != null && t.href ? /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r("a", { className: "lp-text-link", href: t.href, rel: "next", children: t.label || "Next week" }) }) : null
  ] }) });
}
function bt({ html: e, className: t, ...n }) {
  const s = e == null ? "" : String(e);
  return Ve(s) ? /* @__PURE__ */ r("div", { className: t, "data-lp-html-rejected": "true", ...n }) : /* @__PURE__ */ r("div", { className: t, dangerouslySetInnerHTML: { __html: s }, ...n });
}
function vt(e) {
  if (e.meta) return e.meta;
  const t = (e.activities || []).length, n = `${t} ${t === 1 ? "activity" : "activities"}`, s = ke[e.kind || "session"] || ke.session;
  return e.kind && e.kind !== "session" ? `${s} · ${n}` : n;
}
function Nt(e, t) {
  return "html" in e && e.html ? /* @__PURE__ */ r(
    bt,
    {
      className: "lp-activity-html",
      html: e.html
    },
    t
  ) : "children" in e && e.children ? /* @__PURE__ */ r("div", { children: e.children }, t) : /* @__PURE__ */ r(lt, { ...e }, t);
}
function yr({
  week: e = {},
  learningOutcomes: t = [],
  context: n = null,
  sessions: s = [],
  progress: a = null,
  previousWeek: o,
  nextWeek: l,
  features: c = {},
  renderActivity: h
}) {
  const d = Je(c), y = (n == null ? void 0 : n.type) || (n == null ? void 0 : n.contextType), u = s.filter((m) => !(d.showIndependentStudy === !1 && et(m.kind))), b = h || Nt;
  return /* @__PURE__ */ i("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ r(
      gt,
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
    n && Qe(d, y) ? /* @__PURE__ */ r(
      ut,
      {
        contextType: y,
        heading: n.heading,
        items: n.items,
        description: n.description,
        action: n.action
      }
    ) : null,
    u.length ? u.map((m) => /* @__PURE__ */ r(
      ft,
      {
        id: m.id,
        title: m.title,
        kind: m.kind,
        summary: m.summary,
        defaultOpen: m.defaultOpen,
        meta: vt(m),
        children: (m.activities || []).map((v, f) => b(v, f))
      },
      m.id || m.title
    )) : /* @__PURE__ */ r(
      Fe,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    d.showProgress && a ? /* @__PURE__ */ r(ht, { ...a }) : null,
    /* @__PURE__ */ r(yt, { previousWeek: o, nextWeek: l })
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
function Te(e) {
  var t;
  return String(e.status ?? ((t = e.metadata) == null ? void 0 : t.status) ?? "").trim();
}
function Be(e) {
  return ze(Te(e));
}
function _t(e) {
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
function Ct({ href: e, children: t, className: n }) {
  return /* @__PURE__ */ r("a", { className: n, href: e, children: t });
}
function br({
  week: e,
  href: t,
  children: n,
  className: s = "lp-text-link",
  lockedClassName: a = "lp-week-access-link lp-week-access-link--locked",
  renderLink: o = Ct
}) {
  if (Be(e))
    return o({ href: t, children: n, className: s });
  const l = Te(e);
  return /* @__PURE__ */ i("span", { className: a, "aria-disabled": "true", children: [
    /* @__PURE__ */ r("span", { className: "lp-week-access-link__label", children: n }),
    " ",
    /* @__PURE__ */ r(ge, { status: l || "planned" })
  ] });
}
function vr({ week: e, children: t, fallback: n }) {
  if (Be(e))
    return t;
  if (n != null)
    return n;
  const s = Te(e), a = _t(s);
  return /* @__PURE__ */ i("div", { className: "lp-week-access-guard", children: [
    /* @__PURE__ */ r(ge, { status: s || "planned" }),
    /* @__PURE__ */ r(Fe, { heading: a.heading, message: a.message })
  ] });
}
const wt = ["neutral", "correct", "incorrect", "informative", "hint"], kt = {
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
  const s = wt.includes(e) ? e : "neutral", a = kt[s];
  return !n && !t ? null : /* @__PURE__ */ r("div", { className: "lp-feedback", "data-lp-feedback-state": s, "data-lp-feedback": !0, children: /* @__PURE__ */ r(dt, { tone: a.tone, title: t || a.label, message: n }) });
}
const Se = "Your answer could not be checked. Please try again.", St = "Your response has been recorded for review.";
function oe(e) {
  return typeof e == "function";
}
function Ce(e) {
  if (e && typeof e == "object" && "learnerMessage" in e) {
    const t = String(e.learnerMessage || "").trim();
    if (t) return t;
  }
  return Se;
}
function je() {
  return async () => {
    throw Object.assign(new Error(Se), {
      code: "MARKING_UNAVAILABLE",
      learnerMessage: Se
    });
  };
}
function pe(e) {
  return !e.checked || e.serverCanRetry === !1 ? !1 : e.serverCanRetry === !0 ? !0 : e.localRetry && (typeof e.localMaxAttempts != "number" || e.attempts < e.localMaxAttempts);
}
function ye(e, t, n) {
  return !!(e && t && !oe(n));
}
function be(e, t, n = "Your response has been recorded.") {
  return e.requiresReview || e.status === "review" ? {
    status: "informative",
    message: St,
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
const Ae = "Your answer was recorded.";
function $e(e) {
  if (!e.checked || !e.hasResponse) return null;
  const t = be(
    { completed: !0, correct: e.correct ?? null },
    e.feedback,
    e.recordedMessage || Ae
  );
  return {
    status: t.status,
    message: t.message,
    serverCorrect: t.correct
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
async function Ee(e, t, n, s = "Your response has been recorded.") {
  try {
    return {
      ok: !0,
      marked: be(await e(t), n, s)
    };
  } catch (a) {
    return { ok: !1, message: Ce(a) };
  }
}
const At = /^(correctOptionId|correctCategoryId|correctValues|answerKey|markScheme|modelAnswer|correctOptions|correctOrder|spec)$/;
function Ie(e) {
  if (Array.isArray(e)) return e.map(Ie);
  if (!e || typeof e != "object") return e;
  const t = {};
  for (const [n, s] of Object.entries(e))
    At.test(n) || n === "correct" && s && typeof s == "object" || (t[n] = Ie(s));
  return t;
}
function It(e) {
  return Ie(e);
}
function Tt(e, t) {
  if (!e || typeof e != "object") return;
  const n = e.marking;
  if (!n || typeof n.markBlock != "function")
    return je();
  const s = n.markBlock;
  return (a) => s({
    activityKey: t.id,
    activityVersion: a.activityVersion,
    block: It(a.block),
    responses: a.responses,
    sourcePage: typeof window < "u" ? window.location.pathname : void 0
  });
}
function ve(e, t) {
  const n = e.slice();
  if (!t || n.length < 2) return n;
  for (let s = n.length - 1; s > 0; s -= 1) {
    const a = Math.floor(Math.random() * (s + 1)), o = n[s];
    n[s] = n[a], n[a] = o;
  }
  return n;
}
function Re(e) {
  return e == null ? !1 : typeof e == "string" || Array.isArray(e) ? e.length > 0 : typeof e == "object" ? Object.keys(e).length > 0 : !0;
}
function xe(e, t) {
  const [n, s] = C(Re(e) ? e : t);
  return le(() => {
    Re(e) && s(e);
  }, [e]), [n, s];
}
function he(e, t) {
  const [n, s] = C(!!(e && t));
  return le(() => {
    e && t && s(!0);
  }, [t, e]), [n, s];
}
function fe(e) {
  return e.label || e.text || e.id;
}
function Et(e, t, n, s, a, o, l, c) {
  if (!n) return "Placed";
  if (o) {
    const h = l == null ? void 0 : l.find((d) => d.itemId === e);
    return (h == null ? void 0 : h.correct) === !0 ? "Correct" : (h == null ? void 0 : h.correct) === !1 ? "Incorrect" : c || h != null && h.requiresReview ? "Recorded" : "Placed";
  }
  return s ? a[e] === t ? "Correct" : "Incorrect" : "Placed";
}
function xt({
  id: e = "classification",
  title: t,
  prompt: n,
  instructions: s,
  items: a,
  categories: o,
  feedback: l,
  formative: c = !0,
  retry: h = !0,
  shuffle: d = !1,
  maxAttempts: y,
  initialAssignments: u = {},
  initialChecked: b = !1,
  onMarkResponse: m,
  onResult: v
}) {
  const f = se(() => ve(a, d), [a, d]), [N, g] = xe(u, {}), [E, V] = C(null), [G, te] = C(0), O = a.length > 0 && a.every((p) => u[p.id]), [D, q] = he(b, O), [Y, k] = C(!1), [H, R] = C(b && O ? "informative" : "neutral"), [P, W] = C(b && O ? "Your answer was recorded." : ""), [L, K] = C();
  le(() => {
    b && a.every((p) => N[p.id]) && (R("informative"), W("Your answer was recorded."));
  }, [N, b, a]);
  const [F, U] = C(!1), [Z, X] = C(), z = Object.fromEntries(
    a.filter((p) => p.correctCategoryId).map((p) => [p.id, p.correctCategoryId])
  ), Q = oe(m), re = ye(c, Object.keys(z).length > 0, m), w = D || Y, x = pe({
    checked: D,
    localRetry: h,
    localMaxAttempts: y,
    attempts: G,
    serverCanRetry: Z
  }), M = f.filter((p) => !N[p.id]), B = f.find((p) => p.id === E);
  function _(p) {
    v == null || v(p);
  }
  function A(p, I) {
    g((j) => ({ ...j, [p]: I })), V(null);
  }
  function T(p) {
    V((I) => I === p ? null : p);
  }
  function S(p) {
    E && A(E, p);
  }
  function $(p) {
    g((I) => {
      const j = { ...I };
      return delete j[p], j;
    }), V(null);
  }
  async function J() {
    if (Y) return;
    if (!a.every((ne) => N[ne.id])) {
      R("informative"), W("Place every item in a category before checking.");
      return;
    }
    const I = G + 1, j = { ...N };
    if (Q && m) {
      k(!0), R("informative"), W("Checking your answer…");
      try {
        const ne = be(
          await m(j),
          l,
          "Your categories have been recorded."
        );
        te(I), q(!0), K(ne.itemResults), U(ne.requiresReview), X(ne.canRetry), R(ne.status), W(ne.message), _(me(ne, I, j));
      } catch (ne) {
        q(!1), K(void 0), U(!1), X(!1), R("informative"), W(Ce(ne)), _({
          completed: !1,
          correct: null,
          attempts: I,
          responses: j,
          status: "error"
        });
      } finally {
        k(!1);
      }
      return;
    }
    const ie = re ? a.filter((ne) => N[ne.id] === z[ne.id]).length : 0, ae = re ? ie === a.length : null;
    te(I), q(!0), K(void 0), U(!1), R(ae === !0 ? "correct" : ae === !1 ? "incorrect" : "informative"), W(re ? ae ? (l == null ? void 0 : l.correct) || "Those items match the expected categories." : (l == null ? void 0 : l.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), _({
      completed: !0,
      correct: ae,
      score: re ? { correct: ie, total: a.length } : void 0,
      attempts: I,
      responses: j
    });
  }
  function ee() {
    g({}), V(null), q(!1), k(!1), K(void 0), U(!1), X(void 0), R("neutral"), W(""), _({ completed: !1, correct: null, attempts: G, responses: {} });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "classification",
      "data-lp-block-id": e,
      "aria-busy": Y || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        s ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: B ? `Selected: ${fe(B)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: w, children: [
          /* @__PURE__ */ r("legend", { children: n }),
          /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "Items" }),
          /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
            M.map((p) => /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": E === p.id,
                onClick: () => T(p.id),
                children: [
                  fe(p),
                  E === p.id ? " (selected)" : ""
                ]
              },
              p.id
            )),
            M.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: o.map((p) => {
            const I = f.filter((j) => N[j.id] === p.id);
            return /* @__PURE__ */ i("div", { className: "lp-card", children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("strong", { children: p.label }) }),
              /* @__PURE__ */ r("ul", { className: "lp-activity-list", children: I.map((j) => {
                const ie = Et(
                  j.id,
                  p.id,
                  D,
                  re,
                  z,
                  Q,
                  L,
                  F
                );
                return /* @__PURE__ */ r("li", { children: /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    onClick: () => $(j.id),
                    children: [
                      fe(j),
                      " · ",
                      ie,
                      w ? "" : " · Return"
                    ]
                  }
                ) }, j.id);
              }) }),
              I.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "No items yet" }) : null,
              /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  disabled: !E,
                  onClick: () => S(p.id),
                  children: [
                    "Place in ",
                    fe(p)
                  ]
                }
              )
            ] }, p.id);
          }) }),
          /* @__PURE__ */ i("details", { children: [
            /* @__PURE__ */ r("summary", { children: "Use dropdown lists instead" }),
            f.map((p) => /* @__PURE__ */ i("p", { className: "lp-form__field", children: [
              /* @__PURE__ */ r("label", { htmlFor: `${e}-${p.id}`, children: fe(p) }),
              /* @__PURE__ */ i(
                "select",
                {
                  id: `${e}-${p.id}`,
                  "data-lp-item": p.id,
                  value: N[p.id] || "",
                  disabled: w,
                  onChange: (I) => {
                    const j = I.target.value;
                    g((ie) => {
                      const ae = { ...ie };
                      return j ? ae[p.id] = j : delete ae[p.id], ae;
                    }), V(null);
                  },
                  children: [
                    /* @__PURE__ */ r("option", { value: "", children: "Select a category" }),
                    o.map((I) => /* @__PURE__ */ r("option", { value: I.id, children: I.label }, I.id))
                  ]
                }
              )
            ] }, `list-${p.id}`))
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void J(), disabled: w, children: Y ? "Checking…" : "Check types" }),
          x ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: ee, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: H, message: P })
      ]
    }
  );
}
function Mt(e) {
  return !!(e && Object.keys(e).length);
}
function Ye(e = {}) {
  const [t, n] = C({ ...e }), [s, a] = C(null);
  le(() => {
    Mt(e) && n({ ...e });
  }, [e]);
  const o = Ne((d, y = t) => Object.keys(y).find((u) => y[u] === d) || null, [t]), l = Ne((d) => {
    a((y) => y === d ? null : d);
  }, []), c = Ne((d) => {
    if (!s) {
      const u = o(d);
      u && a(u);
      return;
    }
    const y = s;
    n((u) => {
      const b = { ...u }, m = Object.keys(b).find((v) => b[v] === d);
      return m && delete b[m], b[y] = d, b;
    }), a(null);
  }, [o, s]), h = Ne(() => {
    n({}), a(null);
  }, []);
  return { placements: t, selectedItemId: s, selectItem: l, selectTarget: c, occupantOf: o, reset: h };
}
function $t({
  id: e = "drag-drop",
  title: t,
  prompt: n,
  instructions: s,
  items: a,
  targets: o,
  correct: l = {},
  feedback: c,
  formative: h = !0,
  retry: d = !0,
  shuffle: y = !1,
  maxAttempts: u,
  initialPlacements: b = {},
  initialChecked: m = !1,
  onMarkResponse: v,
  onResult: f
}) {
  var A;
  const N = se(() => ve(a, y), [a, y]), { placements: g, selectedItemId: E, selectItem: V, selectTarget: G, occupantOf: te, reset: O } = Ye(b), [D, q] = C(0), Y = a.length > 0 && a.every((T) => b[T.id]), [k, H] = he(m, Y), [R, P] = C(!1), [W, L] = C(m && Y ? "informative" : "neutral"), [K, F] = C(m && Y ? "Your answer was recorded." : ""), [U, Z] = C(), X = oe(v), z = ye(h, Object.keys(l).length > 0, v), Q = k || R, re = pe({
    checked: k,
    localRetry: d,
    localMaxAttempts: u,
    attempts: D,
    serverCanRetry: U
  }), w = N.filter((T) => !g[T.id]), x = (A = N.find((T) => T.id === E)) == null ? void 0 : A.label;
  function M(T) {
    f == null || f(T);
  }
  async function B() {
    if (R) return;
    if (!a.every((p) => g[p.id])) {
      L("informative"), F("Place every item before checking.");
      return;
    }
    const S = D + 1, $ = { ...g };
    if (X && v) {
      P(!0), L("informative"), F("Checking your answer…");
      const p = await Ee(
        v,
        $,
        c,
        "Your placements have been recorded."
      );
      if (P(!1), !p.ok) {
        H(!1), Z(!1), L("informative"), F(p.message), M({ completed: !1, correct: null, attempts: S, responses: $, status: "error" });
        return;
      }
      q(S), H(!0), Z(p.marked.canRetry), L(p.marked.status), F(p.marked.message), M(me(p.marked, S, $));
      return;
    }
    const J = z ? a.filter((p) => g[p.id] === l[p.id]).length : 0, ee = z ? J === a.length : null;
    q(S), H(!0), L(ee === !0 ? "correct" : ee === !1 ? "incorrect" : "informative"), F(z ? ee ? (c == null ? void 0 : c.correct) || "Those placements match the expected targets." : (c == null ? void 0 : c.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), M({
      completed: !0,
      correct: ee,
      score: z ? { correct: J, total: a.length } : void 0,
      attempts: S,
      responses: $
    });
  }
  function _() {
    O(), H(!1), P(!1), Z(void 0), L("neutral"), F(""), M({ completed: !1, correct: null, attempts: D, responses: {} });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "drag-drop",
      "data-lp-block-id": e,
      "aria-busy": R || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        s ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ r("p", { children: n }),
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: x ? `Selected: ${x}. Choose a target.` : "Select an item, then select a target to place it." }),
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: Q, children: [
          /* @__PURE__ */ r("legend", { children: "Items" }),
          /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
            w.map((T) => /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": E === T.id,
                onClick: () => V(T.id),
                children: [
                  T.label,
                  E === T.id ? " (selected)" : ""
                ]
              },
              T.id
            )),
            w.length === 0 ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: Q, children: [
          /* @__PURE__ */ r("legend", { children: "Targets" }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: o.map((T) => {
            const S = te(T.id), $ = a.find((ee) => ee.id === S), J = k && z && S && !X ? l[S] === T.id ? "Correct" : "Incorrect" : $ ? "Placed" : "Empty";
            return /* @__PURE__ */ i("div", { className: "lp-card", children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("strong", { children: T.label }) }),
              /* @__PURE__ */ i("p", { className: "lp-card__meta", children: [
                $ ? $.label : "No item yet",
                " · ",
                J
              ] }),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  onClick: () => G(T.id),
                  children: $ ? `Place on ${T.label} (replace ${$.label})` : `Place on ${T.label}`
                }
              )
            ] }, T.id);
          }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void B(), disabled: Q, children: R ? "Checking…" : "Check placement" }),
          re ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: _, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: W, message: K })
      ]
    }
  );
}
function Rt({
  id: e = "option-cards",
  title: t,
  prompt: n,
  instructions: s,
  options: a,
  correctOptionId: o,
  feedback: l,
  formative: c = !0,
  retry: h = !0,
  shuffle: d = !1,
  maxAttempts: y,
  initialSelectedId: u,
  initialChecked: b = !1,
  initialCorrect: m,
  initialCanRetry: v,
  onMarkResponse: f,
  onResult: N
}) {
  const g = se(() => ve(a, d), [a, d]), [E, V] = xe(u || null, null), [G, te] = C(0), [O, D] = he(b, !!u), [q, Y] = C(!1), k = $e({
    checked: !!(b && u),
    hasResponse: !!u,
    correct: m,
    feedback: l,
    recordedMessage: Ae
  }), H = Le("idle"), [R, P] = C((k == null ? void 0 : k.status) || "neutral"), [W, L] = C((k == null ? void 0 : k.message) || ""), [K, F] = C((k == null ? void 0 : k.serverCorrect) ?? null), [U, Z] = C(v);
  le(() => {
    if (H.current === "live" || H.current === "retry" || !b || !E) return;
    const _ = $e({
      checked: !0,
      hasResponse: !0,
      correct: m,
      feedback: l,
      recordedMessage: Ae
    });
    _ && (P(_.status), L(_.message), F(_.serverCorrect), typeof v == "boolean" && Z(v), (_.status === "correct" || _.status === "incorrect") && (H.current = "restored"));
  }, [l, v, b, m, E]);
  const X = oe(f), z = ye(c, !!o, f), Q = `lp-option-cards-${e}`, re = O || q, w = pe({
    checked: O,
    localRetry: h,
    localMaxAttempts: y,
    attempts: G,
    serverCanRetry: U
  });
  function x(_) {
    N == null || N(_);
  }
  async function M() {
    if (q) return;
    if (!E) {
      P("informative"), L("Choose an option before checking.");
      return;
    }
    const _ = G + 1, A = { optionId: E };
    if (X && f) {
      Y(!0), P("informative"), L("Checking your answer…");
      try {
        const $ = be(await f(A), l, "Your choice has been recorded.");
        H.current = "live", te(_), D(!0), F($.correct), Z($.canRetry), P($.status), L($.message), x(me($, _, A));
      } catch ($) {
        D(!1), F(null), Z(!1), P("informative"), L(Ce($)), x({
          completed: !1,
          correct: null,
          attempts: _,
          responses: A,
          status: "error"
        });
      } finally {
        Y(!1);
      }
      return;
    }
    const T = z ? E === o : null, S = z ? T ? (l == null ? void 0 : l.correct) || "That matches the expected option." : (l == null ? void 0 : l.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    te(_), D(!0), H.current = "live", F(null), P(T === !0 ? "correct" : T === !1 ? "incorrect" : "informative"), L(S), x({
      completed: !0,
      correct: T,
      score: z ? { correct: T ? 1 : 0, total: 1 } : void 0,
      attempts: _,
      responses: A
    });
  }
  function B() {
    H.current = "retry", V(null), D(!1), Y(!1), F(null), Z(void 0), P("neutral"), L(""), x({
      completed: !1,
      correct: null,
      attempts: G,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "option-cards",
      "data-lp-block-id": e,
      "aria-busy": q || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        s ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: re, children: [
          /* @__PURE__ */ r("legend", { children: n }),
          /* @__PURE__ */ r("div", { className: "lp-card-grid", children: g.map((_) => {
            const A = E === _.id, J = O && z && A || O && X && A && K !== null ? (X ? K === !0 : _.id === o) ? "Correct" : "Incorrect" : A ? "Selected" : "";
            return /* @__PURE__ */ i("label", { className: "lp-card lp-activity-card", children: [
              /* @__PURE__ */ r(
                "input",
                {
                  type: "radio",
                  name: Q,
                  value: _.id,
                  checked: A,
                  "data-lp-response": "",
                  onChange: () => V(_.id)
                }
              ),
              /* @__PURE__ */ i("span", { children: [
                /* @__PURE__ */ r("strong", { children: _.label }),
                _.description ? /* @__PURE__ */ i("span", { className: "lp-card__meta", children: [
                  " — ",
                  _.description
                ] }) : null
              ] }),
              _.imageSrc ? /* @__PURE__ */ r("img", { src: _.imageSrc, alt: _.imageAlt || _.label }) : null,
              J ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: J }) : null
            ] }, _.id);
          }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void M(), disabled: re, children: q ? "Checking…" : "Check answer" }),
          w ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: B, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: R, message: W })
      ]
    }
  );
}
function Pt(e, t) {
  var c;
  const n = [], s = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let a = 0, o = 0, l;
  for (; (l = s.exec(e)) !== null; ) {
    l.index > a && n.push(e.slice(a, l.index));
    const h = l[1] || ((c = t[o]) == null ? void 0 : c.id) || `gap-${o + 1}`;
    o += 1, n.push({ gapId: h }), a = l.index + l[0].length;
  }
  return a < e.length && n.push(e.slice(a)), !n.some((h) => typeof h != "string") && t[0] && (n.push(" "), n.push({ gapId: t[0].id })), n;
}
function Lt({
  id: e = "phrase-completion",
  title: t,
  prompt: n,
  instructions: s,
  gaps: a,
  options: o,
  correctOptionId: l,
  feedback: c,
  formative: h = !0,
  retry: d = !0,
  shuffle: y = !1,
  maxAttempts: u,
  initialPlacements: b = {},
  initialChecked: m = !1,
  onMarkResponse: v,
  onResult: f
}) {
  var T;
  const N = se(() => a && a.length ? a : [{ id: "gap", label: "missing term", correctOptionId: l || void 0 }], [l, a]), g = se(() => ve(o, y), [o, y]), E = se(() => Pt(n, N), [n, N]), { placements: V, selectedItemId: G, selectItem: te, selectTarget: O, occupantOf: D, reset: q } = Ye(b), [Y, k] = C(0), [H, R] = he(m, Object.keys(b).length > 0), [P, W] = C(!1), [L, K] = C(m && Object.keys(b).length ? "informative" : "neutral"), [F, U] = C(m && Object.keys(b).length ? "Your answer was recorded." : ""), [Z, X] = C(), z = Object.fromEntries(
    N.map((S) => [S.id, S.correctOptionId]).filter((S) => S[1])
  ), Q = ye(h, Object.keys(z).length > 0, v), re = H || P, w = pe({
    checked: H,
    localRetry: d,
    localMaxAttempts: u,
    attempts: Y,
    serverCanRetry: Z
  }), x = g.filter((S) => !V[S.id]), M = (T = o.find((S) => S.id === G)) == null ? void 0 : T.label;
  function B(S) {
    f == null || f(S);
  }
  async function _() {
    if (P) return;
    if (!N.every((I) => D(I.id))) {
      K("informative"), U("Fill every blank before checking.");
      return;
    }
    const $ = Y + 1, J = {};
    if (N.forEach((I) => {
      const j = D(I.id);
      j && (J[I.id] = j);
    }), oe(v) && v) {
      W(!0), K("informative"), U("Checking your answer…");
      const I = await Ee(
        v,
        J,
        c,
        "Your phrase has been recorded."
      );
      if (W(!1), !I.ok) {
        R(!1), X(!1), K("informative"), U(I.message), B({ completed: !1, correct: null, attempts: $, responses: J, status: "error" });
        return;
      }
      k($), R(!0), X(I.marked.canRetry), K(I.marked.status), U(I.marked.message), B(me(I.marked, $, J));
      return;
    }
    const ee = Q ? N.filter((I) => J[I.id] === z[I.id]).length : 0, p = Q ? ee === N.length : null;
    k($), R(!0), K(p === !0 ? "correct" : p === !1 ? "incorrect" : "informative"), U(Q ? p ? (c == null ? void 0 : c.correct) || "That completes the phrase." : (c == null ? void 0 : c.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), B({
      completed: !0,
      correct: p,
      score: Q ? { correct: ee, total: N.length } : void 0,
      attempts: $,
      responses: J
    });
  }
  function A() {
    q(), R(!1), W(!1), X(void 0), K("neutral"), U(""), B({ completed: !1, correct: null, attempts: Y, responses: {} });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "fill-gap",
      "data-lp-block-id": e,
      "aria-busy": P || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        s ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ r("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: M ? `Selected: ${M}. Choose a blank.` : "Select a phrase, then select the blank." }),
        /* @__PURE__ */ r("p", { children: E.map((S, $) => {
          if (typeof S == "string") return /* @__PURE__ */ r("span", { children: S }, `text-${$}`);
          const J = D(S.gapId), ee = o.find((j) => j.id === J), p = N.find((j) => j.id === S.gapId), I = H && Q && J ? z[S.gapId] === J ? "Correct" : "Incorrect" : ee ? "Filled" : "Blank";
          return /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              disabled: re,
              "aria-label": `${(p == null ? void 0 : p.label) || "blank"}: ${(ee == null ? void 0 : ee.label) || "empty"}. ${I}`,
              onClick: () => O(S.gapId),
              children: (ee == null ? void 0 : ee.label) || "______"
            },
            S.gapId
          );
        }) }),
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: re, children: [
          /* @__PURE__ */ r("legend", { children: "Available phrases" }),
          /* @__PURE__ */ r("div", { className: "lp-card__actions", children: x.map((S) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "lp-button",
              "aria-pressed": G === S.id,
              onClick: () => te(S.id),
              children: [
                S.label,
                G === S.id ? " (selected)" : ""
              ]
            },
            S.id
          )) })
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void _(), disabled: re, children: P ? "Checking…" : "Check phrase" }),
          w ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: A, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: L, message: F })
      ]
    }
  );
}
function Dt({
  id: e = "sequence",
  title: t,
  prompt: n,
  instructions: s,
  items: a,
  correctOrder: o = [],
  feedback: l,
  formative: c = !0,
  retry: h = !0,
  shuffle: d = !1,
  maxAttempts: y,
  initialOrder: u,
  initialChecked: b = !1,
  onMarkResponse: m,
  onResult: v
}) {
  const f = se(() => ve(a, d), [a, d]), N = se(() => {
    if (!Array.isArray(u) || !u.length) return f;
    const w = new Map(a.map((M) => [M.id, M])), x = u.map((M) => w.get(M)).filter(Boolean);
    return x.length === a.length ? x : f;
  }, [f, u, a]), [g, E] = C(N);
  le(() => {
    !Array.isArray(u) || !u.length || E(N);
  }, [u, N]);
  const [V, G] = C(0), [te, O] = he(b, !!(u != null && u.length)), [D, q] = C(!1), [Y, k] = C(b && (u != null && u.length) ? "informative" : "neutral"), [H, R] = C(b && (u != null && u.length) ? "Your answer was recorded." : ""), [P, W] = C(), L = oe(m), K = ye(c, o.length > 0, m), F = te || D, U = pe({
    checked: te,
    localRetry: h,
    localMaxAttempts: y,
    attempts: V,
    serverCanRetry: P
  });
  function Z(w) {
    v == null || v(w);
  }
  function X(w, x) {
    const M = w + x;
    if (M < 0 || M >= g.length) return;
    const B = g.slice(), [_] = B.splice(w, 1);
    B.splice(M, 0, _), E(B);
  }
  function z(w, x) {
    F || (w.key === "ArrowUp" && (w.preventDefault(), X(x, -1)), w.key === "ArrowDown" && (w.preventDefault(), X(x, 1)));
  }
  async function Q() {
    if (D) return;
    const w = V + 1, x = g.map((A) => A.id), M = { itemIds: x };
    if (L && m) {
      q(!0), k("informative"), R("Checking your answer…");
      const A = await Ee(
        m,
        M,
        l,
        "Your sequence has been recorded."
      );
      if (q(!1), !A.ok) {
        O(!1), W(!1), k("informative"), R(A.message), Z({ completed: !1, correct: null, attempts: w, responses: M, status: "error" });
        return;
      }
      G(w), O(!0), W(A.marked.canRetry), k(A.marked.status), R(A.marked.message), Z(me(A.marked, w, M));
      return;
    }
    const B = K ? x.filter((A, T) => A === o[T]).length : 0, _ = K ? B === o.length && x.length === o.length : null;
    G(w), O(!0), k(_ === !0 ? "correct" : _ === !1 ? "incorrect" : "informative"), R(K ? _ ? (l == null ? void 0 : l.correct) || "That order matches the expected sequence." : (l == null ? void 0 : l.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), Z({
      completed: !0,
      correct: _,
      score: K ? { correct: B, total: o.length } : void 0,
      attempts: w,
      responses: M
    });
  }
  function re() {
    E(f), O(!1), q(!1), W(void 0), k("neutral"), R(""), Z({
      completed: !1,
      correct: null,
      attempts: V,
      responses: { itemIds: f.map((w) => w.id) }
    });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "ordering",
      "data-lp-block-id": e,
      "aria-busy": D || void 0,
      children: [
        t ? /* @__PURE__ */ r("h3", { children: t }) : null,
        s ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ r("p", { children: n }),
        /* @__PURE__ */ r("ol", { className: "lp-activity-list", children: g.map((w, x) => /* @__PURE__ */ i(
          "li",
          {
            className: "lp-card",
            tabIndex: F ? -1 : 0,
            "aria-label": `${w.label}, position ${x + 1} of ${g.length}`,
            onKeyDown: (M) => z(M, x),
            children: [
              /* @__PURE__ */ r("p", { children: /* @__PURE__ */ i("strong", { children: [
                x + 1,
                ". ",
                w.label
              ] }) }),
              /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: F || x === 0,
                    onClick: () => X(x, -1),
                    children: [
                      "Move ",
                      w.label,
                      " up"
                    ]
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: F || x === g.length - 1,
                    onClick: () => X(x, 1),
                    children: [
                      "Move ",
                      w.label,
                      " down"
                    ]
                  }
                )
              ] })
            ]
          },
          w.id
        )) }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void Q(), disabled: F, children: D ? "Checking…" : "Check order" }),
          U ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: re, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: Y, message: H })
      ]
    }
  );
}
function ce(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Ft(e) {
  var t;
  return (e == null ? void 0 : e.formative) === !0 || ((t = e == null ? void 0 : e.marking) == null ? void 0 : t.mode) === "formative-local";
}
function Bt(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function jt(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const Yt = [
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
], Me = 200, Ot = 500;
function Oe(e, t) {
  const n = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return n > 0 ? n : t;
}
function qe(e) {
  return Yt.includes(ce(e));
}
function we(e) {
  var t;
  return ((t = e.content) == null ? void 0 : t.questionId) || e.id;
}
function qt({
  id: e,
  prompt: t,
  placeholder: n,
  value: s,
  defaultValue: a = "",
  minChars: o,
  minimumCharacters: l,
  defaultMinChars: c = Me,
  rows: h = 4,
  disabled: d = !1,
  hidePrompt: y = !1,
  onChange: u
}) {
  const b = _e(), m = e || b, v = Oe({ minChars: o, minimumCharacters: l }, c), f = typeof s == "string", [N, g] = C(String(a || "")), [E, V] = C(""), G = f ? s : N, te = G.trim().length, O = te >= v;
  function D(k) {
    f || g(k), u == null || u(k);
  }
  function q(k) {
    k.preventDefault(), V("Paste is disabled. Type your answer in your own words.");
  }
  function Y(k) {
    k.preventDefault(), V("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ i("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ i("label", { className: "lp-field", htmlFor: m, children: [
      y ? /* @__PURE__ */ r("span", { className: "lp-visually-hidden", children: t }) : /* @__PURE__ */ r("span", { className: "lp-field__label", children: t }),
      /* @__PURE__ */ r(
        "textarea",
        {
          id: m,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(v),
          rows: h,
          value: G,
          placeholder: n,
          minLength: v,
          autoComplete: "off",
          disabled: d,
          "aria-describedby": `${m}-count ${m}-notice`,
          onChange: (k) => D(k.target.value),
          onPaste: q,
          onDrop: Y
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "p",
      {
        id: `${m}-count`,
        className: "lp-char-count",
        "data-lp-char-count": "",
        "data-lp-met": O ? "true" : "false",
        "aria-live": "polite",
        children: `${te} / ${v} characters minimum`
      }
    ),
    /* @__PURE__ */ r(
      "p",
      {
        id: `${m}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: E
      }
    )
  ] });
}
function Ht(e, t) {
  return t > 0 ? `Write at least ${e} characters. You currently have ${t}.` : `Write at least ${e} characters before saving.`;
}
function He({
  id: e = "text-response",
  blockType: t = "short-response",
  title: n,
  prompt: s,
  instructions: a,
  guidance: o,
  placeholder: l,
  minChars: c,
  minimumCharacters: h,
  defaultMinChars: d = Me,
  rows: y = 4,
  feedback: u,
  retry: b = !0,
  maxAttempts: m,
  initialResponse: v = "",
  initialChecked: f = !1,
  saveLabel: N = "Save response",
  onMarkResponse: g,
  onResult: E
}) {
  const V = Oe({ minChars: c, minimumCharacters: h }, d), [G, te] = xe(String(v || ""), ""), [O, D] = C(0), [q, Y] = he(f, !!String(v || "").trim()), [k, H] = C(!1), [R, P] = C(f && String(v || "").trim() ? "informative" : "neutral"), [W, L] = C(f && String(v || "").trim() ? "Your answer was recorded." : ""), [K, F] = C(), U = G.trim(), Z = U.length, X = Z >= V, z = oe(g), Q = q || k, re = pe({
    checked: q,
    localRetry: b,
    localMaxAttempts: m,
    attempts: O,
    serverCanRetry: K
  });
  function w(B) {
    E == null || E(B);
  }
  async function x() {
    if (k) return;
    if (!X) {
      P("informative"), L(Ht(V, Z));
      return;
    }
    const B = O + 1;
    if (z && g) {
      H(!0), P("informative"), L("Saving your response…");
      try {
        const A = be(
          await g(U),
          u,
          o || "Your response has been recorded."
        );
        D(B), Y(!0), F(A.canRetry), P(A.status), L(A.requiresReview || A.correct !== null ? A.message : o || A.message), w(me(A, B, U));
      } catch (A) {
        Y(!1), F(!1), P("informative"), L(Ce(A)), w({
          completed: !1,
          correct: null,
          attempts: B,
          responses: U,
          status: "error"
        });
      } finally {
        H(!1);
      }
      return;
    }
    const _ = o || (u == null ? void 0 : u.correct) || "Saved.";
    D(B), Y(!0), P("informative"), L(_), w({
      completed: !0,
      correct: null,
      attempts: B,
      responses: U
    });
  }
  function M() {
    te(""), Y(!1), H(!1), F(void 0), P("neutral"), L(""), w({
      completed: !1,
      correct: null,
      attempts: O,
      responses: ""
    });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive lp-form",
      "data-lp-block": t,
      "data-lp-block-id": e,
      "aria-busy": k || void 0,
      children: [
        n ? /* @__PURE__ */ r("h3", { children: n }) : null,
        a ? /* @__PURE__ */ r("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ r(
          qt,
          {
            id: `${e}-field`,
            prompt: s,
            placeholder: l,
            value: G,
            minChars: c,
            minimumCharacters: h,
            defaultMinChars: d,
            rows: y,
            disabled: Q,
            onChange: te
          }
        ),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: () => void x(), disabled: Q, children: k ? "Saving…" : N }),
          re ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: M, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ r(ue, { state: R, message: W })
      ]
    }
  );
}
function Kt({
  rows: e = 4,
  ...t
}) {
  return /* @__PURE__ */ r(
    He,
    {
      ...t,
      blockType: "short-response",
      defaultMinChars: Me,
      rows: e
    }
  );
}
function Ut({
  rows: e = 6,
  ...t
}) {
  return /* @__PURE__ */ r(
    He,
    {
      ...t,
      blockType: "reflection",
      defaultMinChars: Ot,
      rows: e
    }
  );
}
function Vt(e) {
  const t = e.content || {};
  return {
    id: e.id,
    instructions: t.instructions,
    feedback: t.feedback,
    formative: Ft(t),
    retry: Bt(t),
    shuffle: jt(t),
    maxAttempts: t.maxAttempts
  };
}
function Pe(e) {
  return typeof e == "string" ? e : void 0;
}
function Gt({ block: e, initialResponse: t, initialChecked: n, initialResult: s, onMarkResponse: a, onResult: o }) {
  const l = ce(e.type), c = e.content || {}, h = ce(c.presentation), d = Vt(e), y = (u) => o == null ? void 0 : o(u, e);
  if (l === "single-choice" || l === "option-cards" || h === "option-cards" || h === "true-false" || h === "picture-quiz")
    return /* @__PURE__ */ r(
      Rt,
      {
        ...d,
        prompt: c.prompt || "Choose an option",
        options: c.options || [],
        correctOptionId: c.correctOptionId,
        initialSelectedId: typeof t == "string" ? t : void 0,
        initialChecked: n,
        initialCorrect: s == null ? void 0 : s.correct,
        initialCanRetry: s == null ? void 0 : s.canRetry,
        onMarkResponse: a,
        onResult: y
      }
    );
  if (l === "classification") {
    const u = t && typeof t == "object" && !Array.isArray(t) ? t : void 0;
    return /* @__PURE__ */ r(
      xt,
      {
        ...d,
        prompt: c.prompt || "Classify each item",
        items: c.items || [],
        categories: c.categories || [],
        initialAssignments: u,
        initialChecked: n,
        onMarkResponse: a,
        onResult: y
      }
    );
  }
  return l === "drag-drop" ? /* @__PURE__ */ r(
    $t,
    {
      ...d,
      prompt: c.prompt || "Place each item",
      items: c.items || [],
      targets: c.targets || [],
      correct: c.correct,
      initialPlacements: t && typeof t == "object" && !Array.isArray(t) ? t : void 0,
      initialChecked: n,
      onMarkResponse: a,
      onResult: y
    }
  ) : l === "fill-gap" || l === "phrase-completion" ? /* @__PURE__ */ r(
    Lt,
    {
      ...d,
      prompt: c.prompt || "Complete the phrase",
      gaps: c.gaps,
      options: c.options || [],
      correctOptionId: c.correctOptionId,
      initialPlacements: t && typeof t == "object" && !Array.isArray(t) ? t : void 0,
      initialChecked: n,
      onMarkResponse: a,
      onResult: y
    }
  ) : l === "ordering" || l === "sequence" ? /* @__PURE__ */ r(
    Dt,
    {
      ...d,
      prompt: c.prompt || "Put the items in order",
      items: c.items || [],
      correctOrder: c.correctOrder,
      initialOrder: Array.isArray(t) ? t : void 0,
      initialChecked: n,
      onMarkResponse: a,
      onResult: y
    }
  ) : l === "short-response" ? /* @__PURE__ */ r(
    Kt,
    {
      id: d.id,
      prompt: c.prompt || "Write your response",
      instructions: d.instructions,
      guidance: c.guidance,
      placeholder: c.placeholder,
      minChars: c.minChars,
      minimumCharacters: c.minimumCharacters,
      feedback: d.feedback,
      retry: d.retry,
      maxAttempts: d.maxAttempts,
      initialResponse: Pe(t),
      initialChecked: n,
      onMarkResponse: a,
      onResult: y
    }
  ) : l === "reflection" ? /* @__PURE__ */ r(
    Ut,
    {
      id: d.id,
      prompt: c.prompt || "Write your reflection",
      instructions: d.instructions,
      guidance: c.guidance,
      placeholder: c.placeholder,
      minChars: c.minChars,
      minimumCharacters: c.minimumCharacters,
      feedback: d.feedback,
      retry: d.retry,
      maxAttempts: d.maxAttempts,
      initialResponse: Pe(t),
      initialChecked: n,
      onMarkResponse: a,
      onResult: y
    }
  ) : /* @__PURE__ */ i("p", { className: "lp-card__meta", "data-lp-block": l, children: [
    "This ",
    l || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function zt(e, t, n, s) {
  if (s === "local") return n;
  const a = n || Tt(e, t);
  return s === "server" && !a ? je() : a;
}
function Nr({
  activity: e,
  initialResponses: t = {},
  initialChecked: n = {},
  initialResults: s = {},
  renderFallback: a,
  platform: o,
  markingMode: l,
  onMarkResponse: c,
  onResult: h
}) {
  var m, v;
  const [d, y] = C(0), u = Ge(e) || void 0, b = zt(o, e, c, l);
  return /* @__PURE__ */ i(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": u,
      children: [
        (m = e.metadata) != null && m.title ? /* @__PURE__ */ r("h3", { children: e.metadata.title }) : null,
        (v = e.metadata) != null && v.summary ? /* @__PURE__ */ r("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ r("div", { className: "lp-activity-list", children: (e.blocks || []).map((f) => qe(f.type) ? /* @__PURE__ */ r(
          Gt,
          {
            block: f,
            initialResponse: t[we(f)],
            initialChecked: !!n[we(f)],
            initialResult: s[we(f)],
            onMarkResponse: b ? (N) => b({
              activityId: e.id,
              activityVersion: u || "",
              block: f,
              responses: N
            }) : void 0,
            onResult: h
          },
          f.id
        ) : a ? /* @__PURE__ */ r("div", { children: a(f) }, f.id) : /* @__PURE__ */ i("p", { className: "lp-card__meta", "data-lp-block": ce(f.type), children: [
          "This ",
          ce(f.type) || "unknown",
          " block is not part of the React activity catalogue yet."
        ] }, f.id)) }, d),
        /* @__PURE__ */ i("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => y((f) => f + 1),
              children: "Reset activity"
            }
          ),
          /* @__PURE__ */ r("p", { className: "lp-activity-status", "data-lp-activity-status": !0, role: "status", "aria-live": "polite" })
        ] })
      ]
    }
  );
}
function Wt(e, t) {
  return typeof t == "number" && Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function Ke({
  title: e,
  badge: t,
  subtitle: n,
  score: s,
  progress: a,
  completed: o = !0,
  attempts: l,
  message: c,
  showStatus: h = !0,
  showDisclaimer: d = !0,
  collapsed: y = !1
}) {
  const u = t || n, b = Wt(s, a), m = Math.round(b * 100), v = o ? "Completed" : "In progress", f = s ? `${s.correct} / ${s.total}` : null, N = s ? `${s.correct} of ${s.total} correct` : null, g = typeof l == "number" ? `${l} ${l === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ i(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": y ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ r("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ r("strong", { children: e }) }) : null,
        h ? /* @__PURE__ */ r(ge, { status: o ? "completed" : "progress", label: v }) : null,
        f ? /* @__PURE__ */ r(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": N || void 0,
            children: f
          }
        ) : null,
        N ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: N }) : null,
        !y && u ? /* @__PURE__ */ r("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ r("strong", { children: u }) }) : null,
        y ? null : /* @__PURE__ */ i(Ue, { children: [
          /* @__PURE__ */ r(
            "progress",
            {
              className: "lp-progress",
              max: 100,
              value: m,
              "aria-label": `${m}% complete`
            }
          ),
          /* @__PURE__ */ i("p", { className: "lp-card__meta", children: [
            m,
            "% complete"
          ] }),
          g ? /* @__PURE__ */ r("p", { children: g }) : null,
          c ? /* @__PURE__ */ r("p", { children: c }) : null,
          d ? /* @__PURE__ */ r("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function Xt(e, t) {
  if (e)
    try {
      t && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !t && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      t ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function _r({
  open: e = !1,
  title: t = "Activity complete",
  completed: n = !0,
  score: s,
  badge: a,
  subtitle: o,
  progress: l,
  attempts: c,
  message: h,
  onClose: d,
  onReview: y,
  onNext: u,
  nextLabel: b = "Continue",
  reviewLabel: m = "Review"
}) {
  const v = Le(null), f = _e();
  return le(() => {
    Xt(v.current, e);
  }, [e]), e ? /* @__PURE__ */ i(
    "dialog",
    {
      ref: v,
      className: "lp-dialog",
      "aria-labelledby": f,
      onCancel: (N) => {
        N.preventDefault(), d == null || d();
      },
      children: [
        /* @__PURE__ */ i("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ r("h2", { id: f, children: t }),
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
        /* @__PURE__ */ i("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ r(
            Ke,
            {
              completed: n,
              score: s,
              badge: a,
              subtitle: o,
              progress: l,
              attempts: c,
              message: h
            }
          ),
          /* @__PURE__ */ i("div", { className: "lp-form__actions", children: [
            y ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button lp-button--secondary", onClick: y, children: m }) : null,
            u ? /* @__PURE__ */ r("button", { type: "button", className: "lp-button", onClick: u, children: b }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const Zt = (e) => ({
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
function Cr({
  collapsed: e,
  defaultCollapsed: t = !0,
  onCollapsedChange: n,
  expandLabel: s = "Show progress details",
  collapseLabel: a = "Hide progress details",
  ...o
}) {
  const [l, c] = C(t), h = typeof e == "boolean" ? e : l, d = _e(), y = o.title || "Practice progress";
  function u(b) {
    typeof e != "boolean" && c(b), n == null || n(b);
  }
  return /* @__PURE__ */ i(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: Zt(h),
      "aria-label": y,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": h ? "true" : "false",
      children: [
        /* @__PURE__ */ r("div", { id: d, children: /* @__PURE__ */ r(Ke, { ...o, title: y, collapsed: h }) }),
        /* @__PURE__ */ r("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !h,
            "aria-controls": d,
            onClick: () => u(!h),
            children: h ? s : a
          }
        ) })
      ]
    }
  );
}
const Jt = {
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
}, Qt = {
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
}, er = {
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
}, tr = {
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
}, rr = {
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
}, nr = {
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
}, ar = {
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
}, sr = {
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
}, wr = [
  Jt,
  Qt,
  er,
  tr,
  rr,
  nr,
  ar,
  sr
];
function lr(e) {
  const t = ce(e.type);
  return t === "single-choice" || t === "option-cards" || t === "classification" || t === "drag-drop" || t === "fill-gap" || t === "phrase-completion" || t === "ordering" || t === "sequence";
}
function kr(e) {
  return qe(e.type);
}
function Sr(e) {
  if (!lr(e)) return 0;
  const t = ce(e.type);
  return t === "classification" ? (e.content && e.content.items || []).length : t === "drag-drop" ? (e.content && e.content.items || []).length : t === "fill-gap" || t === "phrase-completion" ? (e.content && e.content.gaps || []).length || 1 : t === "ordering" || t === "sequence" ? (e.content && e.content.items || []).length : 1;
}
function Ar() {
  return { completed: {}, scores: {} };
}
function Ir(e, t, n) {
  const s = { ...e.completed }, a = { ...e.scores };
  return n.completed ? (s[t] = !0, n.score && n.score.total > 0 && !n.requiresReview ? a[t] = n.score : delete a[t], { completed: s, scores: a }) : e;
}
function Tr(e, t) {
  return t.length > 0 && t.every((n) => e.completed[n]);
}
function Er(e, t) {
  var s;
  if (!e.completed) return !1;
  const n = ((s = e.score) == null ? void 0 : s.total) || 0;
  return t.complete || t.completedCount >= 2 || n >= 2;
}
function xr(e, t) {
  const n = Object.values(e.completed).filter(Boolean).length, s = Object.values(e.scores).reduce(
    (o, l) => ({
      correct: o.correct + l.correct,
      total: o.total + l.total
    }),
    { correct: 0, total: 0 }
  ), a = Math.max(0, t.requiredBlocks);
  return {
    completedCount: n,
    requiredBlocks: a,
    completion: a > 0 ? Math.min(1, n / a) : 0,
    score: {
      correct: s.correct,
      total: Math.max(t.scorableTotal, s.total, 0)
    },
    complete: a > 0 && n >= a
  };
}
export {
  Gt as ActivityBlock,
  lt as ActivityCard,
  bt as AuthoredHtml,
  ot as Breadcrumbs,
  We as CONTEXT_TYPES,
  dt as Callout,
  xt as Classification,
  _r as CompletionModal,
  ut as ContextPanel,
  $t as DragDrop,
  Fe as EmptyState,
  mr as ErrorState,
  wt as FEEDBACK_STATES,
  ue as FeedbackPanel,
  hr as HubShell,
  Nr as InteractiveActivity,
  ur as LEARNER_ACTIVITY_STATES,
  fr as LearnerHeader,
  mt as LearningOutcomeBadge,
  qt as LearningTextField,
  gr as LoadingState,
  pt as Navigation,
  Rt as OptionCards,
  Lt as PhraseCompletion,
  Cr as PracticeProgressPanel,
  ht as ProgressCard,
  Ke as ProgressSummary,
  Ot as REFLECTION_DEFAULT_MIN_CHARS,
  Ut as Reflection,
  Se as SERVER_CHECK_FAILED_MESSAGE,
  St as SERVER_REVIEW_MESSAGE,
  Xe as SESSION_KINDS,
  ke as SESSION_KIND_LABELS,
  Me as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  pr as STATUS_TONES,
  Dt as Sequence,
  ft as SessionSection,
  Kt as ShortResponse,
  ge as StatusBadge,
  He as TextResponse,
  de as WEEK_ACCESS_COPY,
  Ze as WEEK_UI_FEATURES,
  vr as WeekAccessGuard,
  br as WeekAccessLink,
  gt as WeekHeader,
  yt as WeekNavigation,
  yr as WeekView,
  st as activityActionLabel,
  xr as aggregatePracticeProgress,
  Ir as applyPracticeResult,
  Sr as catalogueBlockScorableTotal,
  Tt as createMarkResponseHandler,
  wr as demoCatalogueActivities,
  nr as demoClassification,
  er as demoDragDrop,
  Jt as demoOptionCards,
  tr as demoPhraseCompletion,
  sr as demoReflection,
  rr as demoSequence,
  ar as demoShortResponse,
  Qt as demoTrueFalse,
  Ar as emptyPracticeProgress,
  qe as isCatalogueReactType,
  kr as isCompletableReactBlock,
  et as isIndependentKind,
  Er as isPracticeCompletionCue,
  lr as isScorableReactBlock,
  tt as isSessionKind,
  It as learnerSafeBlock,
  Je as mergeWeekUiFeatures,
  ce as normaliseActivityType,
  we as questionIdFor,
  Oe as resolveMinChars,
  Wt as resolveProgressFraction,
  Te as resolveWeekStatus,
  $e as restoredCheckedDisplay,
  Tr as scorableBlocksComplete,
  Qe as shouldShowContext,
  De as statusLabel,
  at as statusTone,
  _t as weekAccessFallbackCopy,
  Be as weekIsAccessible
};
//# sourceMappingURL=index.js.map
