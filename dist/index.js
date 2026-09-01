import { jsxs as i, jsx as t, Fragment as Oe } from "react/jsx-runtime";
import { useId as ge, useState as b, useEffect as Ie, useMemo as ne, useCallback as fe, useRef as Fe } from "react";
import { isUnsafeAuthoredHtml as De, resolveActivityVersion as qe } from "@learning-platform/core";
import { isWeekAvailable as Be } from "@learning-platform/core/curriculum-runtime";
const je = ["exam", "assignment", "project"], Ye = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], ve = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, nr = ["not-started", "in-progress", "completed"], ar = ["available", "planned", "progress", "completed"], He = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function Ke(e = {}) {
  return { ...He, ...e };
}
function Ue(e, r) {
  return r ? r === "assignment" ? e.showAssignmentContext !== !1 : r === "exam" ? e.showExamContext !== !1 : r === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function Ve(e) {
  return e === "independent-study" || e === "homework";
}
function Ge(e) {
  return Ye.includes(e);
}
const ze = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, We = {
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
function Xe(e) {
  return ze[e || ""] || "planned";
}
function Ae(e, r = "") {
  return We[e || ""] || r || String(e || "Planned");
}
function Ze(e, r = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : r;
}
function pe({
  status: e = "planned",
  label: r,
  marker: n = !0
}) {
  const l = Xe(e);
  return /* @__PURE__ */ i("span", { className: `lp-status-badge lp-status-badge--${l}`, role: "status", children: [
    n ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "● " }) : null,
    r || Ae(e)
  ] });
}
function Je({
  title: e = "Untitled activity",
  description: r = "",
  activityType: n = "Activity",
  duration: l = "",
  status: a = "Not started",
  state: s,
  href: c,
  actionLabel: o,
  badge: d = !1,
  badgeStatus: p,
  headingLevel: y = 2,
  muted: v = !1
}) {
  const h = y === 3 ? "h3" : "h2", u = [n, l].filter(Boolean), f = s ? Ae(s, a) : a;
  return /* @__PURE__ */ i("article", { className: v ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": s || void 0, children: [
    d ? /* @__PURE__ */ t(
      pe,
      {
        status: p || s || "planned",
        label: typeof a == "string" && a !== "Not started" ? a : void 0
      }
    ) : null,
    u.length ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: u.join(" · ") }) : null,
    /* @__PURE__ */ t(h, { children: e }),
    r ? /* @__PURE__ */ t("p", { children: r }) : null,
    /* @__PURE__ */ t("p", { className: "lp-card__meta", children: `Status: ${f}` }),
    c ? /* @__PURE__ */ t("div", { className: "lp-card__actions", children: /* @__PURE__ */ t("a", { className: "lp-button", href: c, children: o || Ze(s) }) }) : null
  ] });
}
function Qe(e, r) {
  return e.href ? e.href : e.path != null && r ? r(e.path) : e.path || void 0;
}
function et({ items: e = [], resolveHref: r }) {
  return e.length ? /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ t("ol", { className: "lp-breadcrumbs__list", children: e.map((n, l) => {
    const a = l === e.length - 1, s = Qe(n, r);
    return /* @__PURE__ */ t("li", { children: a || !s ? /* @__PURE__ */ t("span", { "aria-current": "page", children: n.label }) : /* @__PURE__ */ t("a", { href: s, children: n.label }) }, `${n.label}-${l}`);
  }) }) }) : /* @__PURE__ */ t("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const tt = ["info", "success", "warning", "error"];
function rt({ tone: e = "info", title: r, message: n }) {
  const l = tt.includes(e) ? e : "info";
  return /* @__PURE__ */ i(
    "aside",
    {
      className: `lp-callout lp-callout--${l}`,
      role: l === "error" ? "alert" : void 0,
      children: [
        r ? /* @__PURE__ */ t("strong", { children: r }) : null,
        n ? /* @__PURE__ */ t("p", { children: n }) : null
      ]
    }
  );
}
function nt({
  contextType: e = "assignment",
  heading: r = "Context",
  items: n = [],
  description: l = "",
  action: a
}) {
  const s = je.includes(e) ? e : "assignment", c = `lp-context-${s}`;
  return /* @__PURE__ */ i(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${s}`,
      "aria-labelledby": c,
      "data-context-type": s,
      children: [
        /* @__PURE__ */ t("h2", { id: c, children: r }),
        n.length ? /* @__PURE__ */ t("dl", { className: "lp-meta-list", children: n.map((o) => /* @__PURE__ */ i("div", { children: [
          /* @__PURE__ */ t("dt", { children: o.label }),
          /* @__PURE__ */ t("dd", { children: o.value })
        ] }, `${o.label}:${o.value}`)) }) : null,
        l ? /* @__PURE__ */ t("p", { children: l }) : null,
        a != null && a.label && (a != null && a.href) ? /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: a.href, children: a.label }) }) : null
      ]
    }
  );
}
function Te({
  heading: e = "Nothing to show yet",
  message: r = "Check again later.",
  action: n
}) {
  return /* @__PURE__ */ i("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: r }),
    n != null && n.label && (n != null && n.href) ? /* @__PURE__ */ t("a", { className: "lp-button", href: n.href, children: n.label }) : null
  ] });
}
function lr({
  heading: e = "There is a problem",
  message: r = "Try again."
}) {
  return /* @__PURE__ */ i("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ t("h2", { children: e }),
    /* @__PURE__ */ t("p", { children: r })
  ] });
}
function at({
  items: e,
  currentId: r = "home",
  currentIds: n = [],
  brandTitle: l,
  brandTagline: a,
  homeHref: s,
  theme: c = null,
  actions: o,
  listId: d
}) {
  const p = ge(), y = d || `lp-navigation-list-${p}`, [v, h] = b(!1), u = new Set([r, ...n].filter(Boolean)), f = e.find((m) => m.id === "home" && m.enabled !== !1), _ = e.filter((m) => m.enabled !== !1);
  Ie(() => {
    function m(M) {
      M.key === "Escape" && h(!1);
    }
    return document.addEventListener("keydown", m), () => document.removeEventListener("keydown", m);
  }, []);
  function T(m) {
    if (m.key === "Escape") {
      h(!1);
      const M = m.currentTarget.querySelector(".lp-navigation__toggle");
      M == null || M.focus();
    }
  }
  return /* @__PURE__ */ t("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: T, children: /* @__PURE__ */ i("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ i("a", { className: "lp-navigation__brand", href: s || (f == null ? void 0 : f.path) || "./", children: [
      /* @__PURE__ */ t("span", { className: "lp-navigation__brand-title", children: l }),
      a ? /* @__PURE__ */ t("span", { className: "lp-navigation__brand-tagline", children: a }) : null
    ] }),
    /* @__PURE__ */ t(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": v,
        "aria-controls": y,
        "aria-label": v ? "Close main menu" : "Open main menu",
        onClick: () => h((m) => !m),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ t(
      "ul",
      {
        className: "lp-navigation__list",
        id: y,
        "data-open": v ? "true" : "false",
        children: _.map((m) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
          "a",
          {
            className: "lp-navigation__link",
            href: m.path,
            "aria-current": u.has(m.id) ? "page" : void 0,
            onClick: () => h(!1),
            children: m.label
          }
        ) }, m.id))
      }
    ),
    c ? /* @__PURE__ */ i("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ t(
        "select",
        {
          "aria-label": "Theme preference",
          value: c.preference,
          onChange: (m) => c.onChange(m.target.value),
          children: c.modes.map((m) => /* @__PURE__ */ t("option", { value: m, children: m[0].toUpperCase() + m.slice(1) }, m))
        }
      )
    ] }) : null,
    o ? /* @__PURE__ */ t("div", { className: "lp-navigation__actions", children: o }) : null
  ] }) });
}
function sr({
  brandTitle: e,
  brandTagline: r,
  navigation: n,
  currentId: l = "home",
  currentIds: a = [],
  theme: s = null,
  actions: c,
  breadcrumbs: o,
  resolveHref: d,
  pageHeader: p,
  footer: y,
  learnerHeader: v,
  notice: h,
  skipLabel: u = "Skip to main content",
  mainId: f = "main-content",
  children: _
}) {
  const T = y && typeof y == "object" && "lines" in y ? y.lines.map((m) => /* @__PURE__ */ t("p", { children: m }, m)) : y;
  return /* @__PURE__ */ i("div", { className: "lp-shell", children: [
    /* @__PURE__ */ t("a", { className: "lp-skip-link skip-link", href: `#${f}`, children: u }),
    /* @__PURE__ */ t("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ t(
      at,
      {
        items: n,
        currentId: l,
        currentIds: a,
        brandTitle: e,
        brandTagline: r,
        theme: s,
        actions: c
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "lp-shell__learner", children: v }),
    h,
    o ? /* @__PURE__ */ t(et, { items: o, resolveHref: d }) : null,
    p != null && p.title ? /* @__PURE__ */ i("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ t("h1", { children: p.title }),
      p.subtitle ? /* @__PURE__ */ t("p", { className: "lp-page-header__subtitle", children: p.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ t("main", { id: f, className: "lp-shell__main site-main", tabIndex: -1, children: _ }),
    /* @__PURE__ */ t("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: T })
  ] });
}
function cr({
  learner: e,
  hubName: r,
  accountHref: n = "./account/",
  onSignOut: l
}) {
  return e ? /* @__PURE__ */ i("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ i("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Learner" }),
        /* @__PURE__ */ t("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Year group" }),
        /* @__PURE__ */ t("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Email" }),
        /* @__PURE__ */ t("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("dt", { children: "Current hub" }),
        /* @__PURE__ */ t("dd", { children: r })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ t("a", { href: n, children: "Account" }),
      l ? /* @__PURE__ */ t("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        l();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ t("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function lt({ id: e, title: r }) {
  const n = [e, r].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ t("span", { className: "lp-outcome-badge", children: n });
}
function ir({ message: e = "Loading…" }) {
  return /* @__PURE__ */ i("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ t("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { children: e })
  ] });
}
function st({
  title: e = "Progress",
  completed: r = 0,
  total: n = 0,
  description: l = ""
}) {
  const a = Math.max(0, Number(n) || 0), s = Math.min(a, Math.max(0, Number(r) || 0)), c = a ? Math.round(s / a * 100) : 0;
  return /* @__PURE__ */ i("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ t("h2", { children: e }),
    l ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: l }) : null,
    /* @__PURE__ */ t(
      "progress",
      {
        className: "lp-progress",
        max: a || 1,
        value: s,
        "aria-label": `${c}% complete`
      }
    ),
    /* @__PURE__ */ t("p", { children: `${s} of ${a} complete (${c}%)` })
  ] });
}
function ct({
  id: e,
  title: r,
  kind: n = "session",
  summary: l = "",
  defaultOpen: a = !1,
  meta: s,
  children: c
}) {
  const o = Ge(n) ? n : "session", d = ve[o];
  return /* @__PURE__ */ i("details", { className: "lp-session lp-panel", id: e, "data-kind": o, open: a, children: [
    /* @__PURE__ */ t("summary", { className: "lp-session__summary", children: /* @__PURE__ */ i("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ t("h2", { className: "lp-session__heading", children: r || d }),
      /* @__PURE__ */ t("span", { className: "lp-session__meta", children: s || d })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "lp-session__content", children: [
      l ? /* @__PURE__ */ t("p", { className: "lp-panel-note", children: l }) : null,
      /* @__PURE__ */ t("div", { className: "lp-activity-list", children: c })
    ] })
  ] });
}
function it({
  teachingWeek: e,
  title: r = "",
  subtitle: n = "",
  status: l,
  learningOutcomes: a = [],
  headingLevel: s = 1,
  showTitle: c = !0
}) {
  const o = e ? `Week ${e}${r ? `: ${r}` : ""}` : r || "Week";
  return /* @__PURE__ */ i("header", { className: "lp-week-header", children: [
    l ? /* @__PURE__ */ t(pe, { status: l }) : null,
    c ? /* @__PURE__ */ t(s === 2 ? "h2" : "h1", { children: o }) : e ? /* @__PURE__ */ t("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    n ? /* @__PURE__ */ t("p", { className: "lp-week-header__subtitle", children: n }) : null,
    a.length ? /* @__PURE__ */ t("ul", { className: "lp-week-header__outcomes", children: a.map((p) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(lt, { id: p.id, title: p.title }) }, p.id || p.title)) }) : null
  ] });
}
function ot({ previousWeek: e, nextWeek: r }) {
  return !(e != null && e.href) && !(r != null && r.href) ? null : /* @__PURE__ */ t("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ i("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    r != null && r.href ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", { className: "lp-text-link", href: r.href, rel: "next", children: r.label || "Next week" }) }) : null
  ] }) });
}
function dt({ html: e, className: r, ...n }) {
  const l = e == null ? "" : String(e);
  return De(l) ? /* @__PURE__ */ t("div", { className: r, "data-lp-html-rejected": "true", ...n }) : /* @__PURE__ */ t("div", { className: r, dangerouslySetInnerHTML: { __html: l }, ...n });
}
function ut(e) {
  if (e.meta) return e.meta;
  const r = (e.activities || []).length, n = `${r} ${r === 1 ? "activity" : "activities"}`, l = ve[e.kind || "session"] || ve.session;
  return e.kind && e.kind !== "session" ? `${l} · ${n}` : n;
}
function pt(e, r) {
  return "html" in e && e.html ? /* @__PURE__ */ t(
    dt,
    {
      className: "lp-activity-html",
      html: e.html
    },
    r
  ) : "children" in e && e.children ? /* @__PURE__ */ t("div", { children: e.children }, r) : /* @__PURE__ */ t(Je, { ...e }, r);
}
function or({
  week: e = {},
  learningOutcomes: r = [],
  context: n = null,
  sessions: l = [],
  progress: a = null,
  previousWeek: s,
  nextWeek: c,
  features: o = {},
  renderActivity: d
}) {
  const p = Ke(o), y = (n == null ? void 0 : n.type) || (n == null ? void 0 : n.contextType), v = l.filter((u) => !(p.showIndependentStudy === !1 && Ve(u.kind))), h = d || pt;
  return /* @__PURE__ */ i("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ t(
      it,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: p.showLearningOutcomes ? r : [],
        headingLevel: e.headingLevel || 1,
        showTitle: p.showTitle !== !1
      }
    ),
    n && Ue(p, y) ? /* @__PURE__ */ t(
      nt,
      {
        contextType: y,
        heading: n.heading,
        items: n.items,
        description: n.description,
        action: n.action
      }
    ) : null,
    v.length ? v.map((u) => /* @__PURE__ */ t(
      ct,
      {
        id: u.id,
        title: u.title,
        kind: u.kind,
        summary: u.summary,
        defaultOpen: u.defaultOpen,
        meta: ut(u),
        children: (u.activities || []).map((f, _) => h(f, _))
      },
      u.id || u.title
    )) : /* @__PURE__ */ t(
      Te,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    p.showProgress && a ? /* @__PURE__ */ t(st, { ...a }) : null,
    /* @__PURE__ */ t(ot, { previousWeek: s, nextWeek: c })
  ] });
}
const ce = {
  plannedHeading: "Week not available yet",
  plannedMessage: "This week has not been made available by your teacher.",
  archivedHeading: "Week not available",
  archivedMessage: "This week is no longer available to learners.",
  inaccessibleHeading: "Week not available",
  inaccessibleMessage: "This week is not available."
};
function _e(e) {
  var r;
  return String(e.status ?? ((r = e.metadata) == null ? void 0 : r.status) ?? "").trim();
}
function Re(e) {
  return Be(_e(e));
}
function mt(e) {
  const r = e.toLowerCase();
  return r === "planned" ? {
    heading: ce.plannedHeading,
    message: ce.plannedMessage
  } : r === "archived" ? {
    heading: ce.archivedHeading,
    message: ce.archivedMessage
  } : {
    heading: ce.inaccessibleHeading,
    message: ce.inaccessibleMessage
  };
}
function ht({ href: e, children: r, className: n }) {
  return /* @__PURE__ */ t("a", { className: n, href: e, children: r });
}
function dr({
  week: e,
  href: r,
  children: n,
  className: l = "lp-text-link",
  lockedClassName: a = "lp-week-access-link lp-week-access-link--locked",
  renderLink: s = ht
}) {
  if (Re(e))
    return s({ href: r, children: n, className: l });
  const c = _e(e);
  return /* @__PURE__ */ i("span", { className: a, "aria-disabled": "true", children: [
    /* @__PURE__ */ t("span", { className: "lp-week-access-link__label", children: n }),
    " ",
    /* @__PURE__ */ t(pe, { status: c || "planned" })
  ] });
}
function ur({ week: e, children: r, fallback: n }) {
  if (Re(e))
    return r;
  if (n != null)
    return n;
  const l = _e(e), a = mt(l);
  return /* @__PURE__ */ i("div", { className: "lp-week-access-guard", children: [
    /* @__PURE__ */ t(pe, { status: l || "planned" }),
    /* @__PURE__ */ t(Te, { heading: a.heading, message: a.message })
  ] });
}
const ft = ["neutral", "correct", "incorrect", "informative", "hint"], gt = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function ie({
  state: e = "neutral",
  title: r,
  message: n
}) {
  const l = ft.includes(e) ? e : "neutral", a = gt[l];
  return !n && !r ? null : /* @__PURE__ */ t("div", { className: "lp-feedback", "data-lp-feedback-state": l, "data-lp-feedback": !0, children: /* @__PURE__ */ t(rt, { tone: a.tone, title: r || a.label, message: n }) });
}
const Ne = "Your answer could not be checked. Please try again.", bt = "Your response has been recorded for review.";
function le(e) {
  return typeof e == "function";
}
function be(e) {
  if (e && typeof e == "object" && "learnerMessage" in e) {
    const r = String(e.learnerMessage || "").trim();
    if (r) return r;
  }
  return Ne;
}
function xe() {
  return async () => {
    throw Object.assign(new Error(Ne), {
      code: "MARKING_UNAVAILABLE",
      learnerMessage: Ne
    });
  };
}
function oe(e) {
  return !e.checked || e.serverCanRetry === !1 ? !1 : e.serverCanRetry === !0 ? !0 : e.localRetry && (typeof e.localMaxAttempts != "number" || e.attempts < e.localMaxAttempts);
}
function me(e, r, n) {
  return !!(e && r && !le(n));
}
function ye(e, r, n = "Your response has been recorded.") {
  return e.requiresReview || e.status === "review" ? {
    status: "informative",
    message: bt,
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
    message: (r == null ? void 0 : r.correct) || "That matches the expected option.",
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
    message: (r == null ? void 0 : r.incorrect) || "Check the options and try again.",
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
function de(e, r, n) {
  return {
    completed: e.completed,
    correct: e.correct,
    score: e.score,
    attempts: r,
    responses: n,
    requiresReview: e.requiresReview,
    status: e.requiresReview ? "review" : e.correct === !0 ? "correct" : e.correct === !1 ? "incorrect" : "recorded",
    itemResults: e.itemResults,
    canRetry: e.canRetry,
    checkNumber: e.checkNumber,
    remainingAttempts: e.remainingAttempts
  };
}
async function ke(e, r, n, l = "Your response has been recorded.") {
  try {
    return {
      ok: !0,
      marked: ye(await e(r), n, l)
    };
  } catch (a) {
    return { ok: !1, message: be(a) };
  }
}
const yt = /^(correctOptionId|correctCategoryId|correctValues|answerKey|markScheme|modelAnswer|correctOptions|correctOrder|spec)$/;
function Ce(e) {
  if (Array.isArray(e)) return e.map(Ce);
  if (!e || typeof e != "object") return e;
  const r = {};
  for (const [n, l] of Object.entries(e))
    yt.test(n) || n === "correct" && l && typeof l == "object" || (r[n] = Ce(l));
  return r;
}
function vt(e) {
  return Ce(e);
}
function Nt(e, r) {
  if (!e || typeof e != "object") return;
  const n = e.marking;
  if (!n || typeof n.markBlock != "function")
    return xe();
  const l = n.markBlock;
  return (a) => l({
    activityKey: r.id,
    activityVersion: a.activityVersion,
    block: vt(a.block),
    responses: a.responses,
    sourcePage: typeof window < "u" ? window.location.pathname : void 0
  });
}
function he(e, r) {
  const n = e.slice();
  if (!r || n.length < 2) return n;
  for (let l = n.length - 1; l > 0; l -= 1) {
    const a = Math.floor(Math.random() * (l + 1)), s = n[l];
    n[l] = n[a], n[a] = s;
  }
  return n;
}
function ue(e) {
  return e.label || e.text || e.id;
}
function Ct(e, r, n, l, a, s, c, o) {
  if (!n) return "Placed";
  if (s) {
    const d = c == null ? void 0 : c.find((p) => p.itemId === e);
    return (d == null ? void 0 : d.correct) === !0 ? "Correct" : (d == null ? void 0 : d.correct) === !1 ? "Incorrect" : o || d != null && d.requiresReview ? "Recorded" : "Placed";
  }
  return l ? a[e] === r ? "Correct" : "Incorrect" : "Placed";
}
function _t({
  id: e = "classification",
  title: r,
  prompt: n,
  instructions: l,
  items: a,
  categories: s,
  feedback: c,
  formative: o = !0,
  retry: d = !0,
  shuffle: p = !1,
  maxAttempts: y,
  initialAssignments: v = {},
  onMarkResponse: h,
  onResult: u
}) {
  const f = ne(() => he(a, p), [a, p]), [_, T] = b({ ...v }), [m, M] = b(null), [H, K] = b(0), [P, V] = b(!1), [q, L] = b(!1), [B, w] = b("neutral"), [X, R] = b(""), [J, A] = b(), [ee, $] = b(!1), [G, U] = b(), Z = Object.fromEntries(
    a.filter((g) => g.correctCategoryId).map((g) => [g.id, g.correctCategoryId])
  ), z = le(h), C = me(o, Object.keys(Z).length > 0, h), E = P || q, N = oe({
    checked: P,
    localRetry: d,
    localMaxAttempts: y,
    attempts: H,
    serverCanRetry: G
  }), F = f.filter((g) => !_[g.id]), j = f.find((g) => g.id === m);
  function x(g) {
    u == null || u(g);
  }
  function S(g, I) {
    T((D) => ({ ...D, [g]: I })), M(null);
  }
  function O(g) {
    M((I) => I === g ? null : g);
  }
  function k(g) {
    m && S(m, g);
  }
  function Q(g) {
    T((I) => {
      const D = { ...I };
      return delete D[g], D;
    }), M(null);
  }
  async function W() {
    if (q) return;
    if (!a.every((te) => _[te.id])) {
      w("informative"), R("Place every item in a category before checking.");
      return;
    }
    const I = H + 1, D = { ..._ };
    if (z && h) {
      L(!0), w("informative"), R("Checking your answer…");
      try {
        const te = ye(
          await h(D),
          c,
          "Your categories have been recorded."
        );
        K(I), V(!0), A(te.itemResults), $(te.requiresReview), U(te.canRetry), w(te.status), R(te.message), x(de(te, I, D));
      } catch (te) {
        V(!1), A(void 0), $(!1), U(!1), w("informative"), R(be(te)), x({
          completed: !1,
          correct: null,
          attempts: I,
          responses: D,
          status: "error"
        });
      } finally {
        L(!1);
      }
      return;
    }
    const se = C ? a.filter((te) => _[te.id] === Z[te.id]).length : 0, re = C ? se === a.length : null;
    K(I), V(!0), A(void 0), $(!1), w(re === !0 ? "correct" : re === !1 ? "incorrect" : "informative"), R(C ? re ? (c == null ? void 0 : c.correct) || "Those items match the expected categories." : (c == null ? void 0 : c.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), x({
      completed: !0,
      correct: re,
      score: C ? { correct: se, total: a.length } : void 0,
      attempts: I,
      responses: D
    });
  }
  function Y() {
    T({}), M(null), V(!1), L(!1), A(void 0), $(!1), U(void 0), w("neutral"), R(""), x({ completed: !1, correct: null, attempts: H, responses: {} });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "classification",
      "data-lp-block-id": e,
      "aria-busy": q || void 0,
      children: [
        r ? /* @__PURE__ */ t("h3", { children: r }) : null,
        l ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: j ? `Selected: ${ue(j)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: E, children: [
          /* @__PURE__ */ t("legend", { children: n }),
          /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "Items" }),
          /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
            F.map((g) => /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": m === g.id,
                onClick: () => O(g.id),
                children: [
                  ue(g),
                  m === g.id ? " (selected)" : ""
                ]
              },
              g.id
            )),
            F.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] }),
          /* @__PURE__ */ t("div", { className: "lp-card-grid", children: s.map((g) => {
            const I = f.filter((D) => _[D.id] === g.id);
            return /* @__PURE__ */ i("div", { className: "lp-card", children: [
              /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: g.label }) }),
              /* @__PURE__ */ t("ul", { className: "lp-activity-list", children: I.map((D) => {
                const se = Ct(
                  D.id,
                  g.id,
                  P,
                  C,
                  Z,
                  z,
                  J,
                  ee
                );
                return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    onClick: () => Q(D.id),
                    children: [
                      ue(D),
                      " · ",
                      se,
                      E ? "" : " · Return"
                    ]
                  }
                ) }, D.id);
              }) }),
              I.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "No items yet" }) : null,
              /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  disabled: !m,
                  onClick: () => k(g.id),
                  children: [
                    "Place in ",
                    ue(g)
                  ]
                }
              )
            ] }, g.id);
          }) }),
          /* @__PURE__ */ i("details", { children: [
            /* @__PURE__ */ t("summary", { children: "Use dropdown lists instead" }),
            f.map((g) => /* @__PURE__ */ i("p", { className: "lp-form__field", children: [
              /* @__PURE__ */ t("label", { htmlFor: `${e}-${g.id}`, children: ue(g) }),
              /* @__PURE__ */ i(
                "select",
                {
                  id: `${e}-${g.id}`,
                  "data-lp-item": g.id,
                  value: _[g.id] || "",
                  disabled: E,
                  onChange: (I) => {
                    const D = I.target.value;
                    T((se) => {
                      const re = { ...se };
                      return D ? re[g.id] = D : delete re[g.id], re;
                    }), M(null);
                  },
                  children: [
                    /* @__PURE__ */ t("option", { value: "", children: "Select a category" }),
                    s.map((I) => /* @__PURE__ */ t("option", { value: I.id, children: I.label }, I.id))
                  ]
                }
              )
            ] }, `list-${g.id}`))
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: () => void W(), disabled: E, children: q ? "Checking…" : "Check types" }),
          N ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Y, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(ie, { state: B, message: X })
      ]
    }
  );
}
function Ee() {
  const [e, r] = b({}), [n, l] = b(null), a = fe((d, p = e) => Object.keys(p).find((y) => p[y] === d) || null, [e]), s = fe((d) => {
    l((p) => p === d ? null : d);
  }, []), c = fe((d) => {
    if (!n) {
      const y = a(d);
      y && l(y);
      return;
    }
    const p = n;
    r((y) => {
      const v = { ...y }, h = Object.keys(v).find((u) => v[u] === d);
      return h && delete v[h], v[p] = d, v;
    }), l(null);
  }, [a, n]), o = fe(() => {
    r({}), l(null);
  }, []);
  return { placements: e, selectedItemId: n, selectItem: s, selectTarget: c, occupantOf: a, reset: o };
}
function kt({
  id: e = "drag-drop",
  title: r,
  prompt: n,
  instructions: l,
  items: a,
  targets: s,
  correct: c = {},
  feedback: o,
  formative: d = !0,
  retry: p = !0,
  shuffle: y = !1,
  maxAttempts: v,
  onMarkResponse: h,
  onResult: u
}) {
  var x;
  const f = ne(() => he(a, y), [a, y]), { placements: _, selectedItemId: T, selectItem: m, selectTarget: M, occupantOf: H, reset: K } = Ee(), [P, V] = b(0), [q, L] = b(!1), [B, w] = b(!1), [X, R] = b("neutral"), [J, A] = b(""), [ee, $] = b(), G = le(h), U = me(d, Object.keys(c).length > 0, h), Z = q || B, z = oe({
    checked: q,
    localRetry: p,
    localMaxAttempts: v,
    attempts: P,
    serverCanRetry: ee
  }), C = f.filter((S) => !_[S.id]), E = (x = f.find((S) => S.id === T)) == null ? void 0 : x.label;
  function N(S) {
    u == null || u(S);
  }
  async function F() {
    if (B) return;
    if (!a.every((Y) => _[Y.id])) {
      R("informative"), A("Place every item before checking.");
      return;
    }
    const O = P + 1, k = { ..._ };
    if (G && h) {
      w(!0), R("informative"), A("Checking your answer…");
      const Y = await ke(
        h,
        k,
        o,
        "Your placements have been recorded."
      );
      if (w(!1), !Y.ok) {
        L(!1), $(!1), R("informative"), A(Y.message), N({ completed: !1, correct: null, attempts: O, responses: k, status: "error" });
        return;
      }
      V(O), L(!0), $(Y.marked.canRetry), R(Y.marked.status), A(Y.marked.message), N(de(Y.marked, O, k));
      return;
    }
    const Q = U ? a.filter((Y) => _[Y.id] === c[Y.id]).length : 0, W = U ? Q === a.length : null;
    V(O), L(!0), R(W === !0 ? "correct" : W === !1 ? "incorrect" : "informative"), A(U ? W ? (o == null ? void 0 : o.correct) || "Those placements match the expected targets." : (o == null ? void 0 : o.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), N({
      completed: !0,
      correct: W,
      score: U ? { correct: Q, total: a.length } : void 0,
      attempts: O,
      responses: k
    });
  }
  function j() {
    K(), L(!1), w(!1), $(void 0), R("neutral"), A(""), N({ completed: !1, correct: null, attempts: P, responses: {} });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "drag-drop",
      "data-lp-block-id": e,
      "aria-busy": B || void 0,
      children: [
        r ? /* @__PURE__ */ t("h3", { children: r }) : null,
        l ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ t("p", { children: n }),
        /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: E ? `Selected: ${E}. Choose a target.` : "Select an item, then select a target to place it." }),
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: Z, children: [
          /* @__PURE__ */ t("legend", { children: "Items" }),
          /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
            C.map((S) => /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": T === S.id,
                onClick: () => m(S.id),
                children: [
                  S.label,
                  T === S.id ? " (selected)" : ""
                ]
              },
              S.id
            )),
            C.length === 0 ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: Z, children: [
          /* @__PURE__ */ t("legend", { children: "Targets" }),
          /* @__PURE__ */ t("div", { className: "lp-card-grid", children: s.map((S) => {
            const O = H(S.id), k = a.find((W) => W.id === O), Q = q && U && O && !G ? c[O] === S.id ? "Correct" : "Incorrect" : k ? "Placed" : "Empty";
            return /* @__PURE__ */ i("div", { className: "lp-card", children: [
              /* @__PURE__ */ t("p", { children: /* @__PURE__ */ t("strong", { children: S.label }) }),
              /* @__PURE__ */ i("p", { className: "lp-card__meta", children: [
                k ? k.label : "No item yet",
                " · ",
                Q
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  onClick: () => M(S.id),
                  children: k ? `Place on ${S.label} (replace ${k.label})` : `Place on ${S.label}`
                }
              )
            ] }, S.id);
          }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: () => void F(), disabled: Z, children: B ? "Checking…" : "Check placement" }),
          z ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: j, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(ie, { state: X, message: J })
      ]
    }
  );
}
function wt({
  id: e = "option-cards",
  title: r,
  prompt: n,
  instructions: l,
  options: a,
  correctOptionId: s,
  feedback: c,
  formative: o = !0,
  retry: d = !0,
  shuffle: p = !1,
  maxAttempts: y,
  initialSelectedId: v,
  onMarkResponse: h,
  onResult: u
}) {
  const f = ne(() => he(a, p), [a, p]), [_, T] = b(v || null), [m, M] = b(0), [H, K] = b(!1), [P, V] = b(!1), [q, L] = b("neutral"), [B, w] = b(""), [X, R] = b(null), [J, A] = b(), ee = le(h), $ = me(o, !!s, h), G = `lp-option-cards-${e}`, U = H || P, Z = oe({
    checked: H,
    localRetry: d,
    localMaxAttempts: y,
    attempts: m,
    serverCanRetry: J
  });
  function z(N) {
    u == null || u(N);
  }
  async function C() {
    if (P) return;
    if (!_) {
      L("informative"), w("Choose an option before checking.");
      return;
    }
    const N = m + 1, F = { optionId: _ };
    if (ee && h) {
      V(!0), L("informative"), w("Checking your answer…");
      try {
        const S = ye(await h(F), c, "Your choice has been recorded.");
        M(N), K(!0), R(S.correct), A(S.canRetry), L(S.status), w(S.message), z(de(S, N, F));
      } catch (S) {
        K(!1), R(null), A(!1), L("informative"), w(be(S)), z({
          completed: !1,
          correct: null,
          attempts: N,
          responses: F,
          status: "error"
        });
      } finally {
        V(!1);
      }
      return;
    }
    const j = $ ? _ === s : null, x = $ ? j ? (c == null ? void 0 : c.correct) || "That matches the expected option." : (c == null ? void 0 : c.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    M(N), K(!0), R(null), L(j === !0 ? "correct" : j === !1 ? "incorrect" : "informative"), w(x), z({
      completed: !0,
      correct: j,
      score: $ ? { correct: j ? 1 : 0, total: 1 } : void 0,
      attempts: N,
      responses: F
    });
  }
  function E() {
    T(null), K(!1), V(!1), R(null), A(void 0), L("neutral"), w(""), z({
      completed: !1,
      correct: null,
      attempts: m,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "option-cards",
      "data-lp-block-id": e,
      "aria-busy": P || void 0,
      children: [
        r ? /* @__PURE__ */ t("h3", { children: r }) : null,
        l ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: U, children: [
          /* @__PURE__ */ t("legend", { children: n }),
          /* @__PURE__ */ t("div", { className: "lp-card-grid", children: f.map((N) => {
            const F = _ === N.id, O = H && $ && F || H && ee && F && X !== null ? (ee ? X === !0 : N.id === s) ? "Correct" : "Incorrect" : F ? "Selected" : "";
            return /* @__PURE__ */ i("label", { className: "lp-card lp-activity-card", children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "radio",
                  name: G,
                  value: N.id,
                  checked: F,
                  "data-lp-response": "",
                  onChange: () => T(N.id)
                }
              ),
              /* @__PURE__ */ i("span", { children: [
                /* @__PURE__ */ t("strong", { children: N.label }),
                N.description ? /* @__PURE__ */ i("span", { className: "lp-card__meta", children: [
                  " — ",
                  N.description
                ] }) : null
              ] }),
              N.imageSrc ? /* @__PURE__ */ t("img", { src: N.imageSrc, alt: N.imageAlt || N.label }) : null,
              O ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: O }) : null
            ] }, N.id);
          }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: () => void C(), disabled: U, children: P ? "Checking…" : "Check answer" }),
          Z ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: E, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(ie, { state: q, message: B })
      ]
    }
  );
}
function St(e, r) {
  var o;
  const n = [], l = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let a = 0, s = 0, c;
  for (; (c = l.exec(e)) !== null; ) {
    c.index > a && n.push(e.slice(a, c.index));
    const d = c[1] || ((o = r[s]) == null ? void 0 : o.id) || `gap-${s + 1}`;
    s += 1, n.push({ gapId: d }), a = c.index + c[0].length;
  }
  return a < e.length && n.push(e.slice(a)), !n.some((d) => typeof d != "string") && r[0] && (n.push(" "), n.push({ gapId: r[0].id })), n;
}
function It({
  id: e = "phrase-completion",
  title: r,
  prompt: n,
  instructions: l,
  gaps: a,
  options: s,
  correctOptionId: c,
  feedback: o,
  formative: d = !0,
  retry: p = !0,
  shuffle: y = !1,
  maxAttempts: v,
  onMarkResponse: h,
  onResult: u
}) {
  var O;
  const f = ne(() => a && a.length ? a : [{ id: "gap", label: "missing term", correctOptionId: c || void 0 }], [c, a]), _ = ne(() => he(s, y), [s, y]), T = ne(() => St(n, f), [n, f]), { placements: m, selectedItemId: M, selectItem: H, selectTarget: K, occupantOf: P, reset: V } = Ee(), [q, L] = b(0), [B, w] = b(!1), [X, R] = b(!1), [J, A] = b("neutral"), [ee, $] = b(""), [G, U] = b(), Z = Object.fromEntries(
    f.map((k) => [k.id, k.correctOptionId]).filter((k) => k[1])
  ), z = me(d, Object.keys(Z).length > 0, h), C = B || X, E = oe({
    checked: B,
    localRetry: p,
    localMaxAttempts: v,
    attempts: q,
    serverCanRetry: G
  }), N = _.filter((k) => !m[k.id]), F = (O = s.find((k) => k.id === M)) == null ? void 0 : O.label;
  function j(k) {
    u == null || u(k);
  }
  async function x() {
    if (X) return;
    if (!f.every((I) => P(I.id))) {
      A("informative"), $("Fill every blank before checking.");
      return;
    }
    const Q = q + 1, W = {};
    if (f.forEach((I) => {
      const D = P(I.id);
      D && (W[I.id] = D);
    }), le(h) && h) {
      R(!0), A("informative"), $("Checking your answer…");
      const I = await ke(
        h,
        W,
        o,
        "Your phrase has been recorded."
      );
      if (R(!1), !I.ok) {
        w(!1), U(!1), A("informative"), $(I.message), j({ completed: !1, correct: null, attempts: Q, responses: W, status: "error" });
        return;
      }
      L(Q), w(!0), U(I.marked.canRetry), A(I.marked.status), $(I.marked.message), j(de(I.marked, Q, W));
      return;
    }
    const Y = z ? f.filter((I) => W[I.id] === Z[I.id]).length : 0, g = z ? Y === f.length : null;
    L(Q), w(!0), A(g === !0 ? "correct" : g === !1 ? "incorrect" : "informative"), $(z ? g ? (o == null ? void 0 : o.correct) || "That completes the phrase." : (o == null ? void 0 : o.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), j({
      completed: !0,
      correct: g,
      score: z ? { correct: Y, total: f.length } : void 0,
      attempts: Q,
      responses: W
    });
  }
  function S() {
    V(), w(!1), R(!1), U(void 0), A("neutral"), $(""), j({ completed: !1, correct: null, attempts: q, responses: {} });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "fill-gap",
      "data-lp-block-id": e,
      "aria-busy": X || void 0,
      children: [
        r ? /* @__PURE__ */ t("h3", { children: r }) : null,
        l ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: F ? `Selected: ${F}. Choose a blank.` : "Select a phrase, then select the blank." }),
        /* @__PURE__ */ t("p", { children: T.map((k, Q) => {
          if (typeof k == "string") return /* @__PURE__ */ t("span", { children: k }, `text-${Q}`);
          const W = P(k.gapId), Y = s.find((D) => D.id === W), g = f.find((D) => D.id === k.gapId), I = B && z && W ? Z[k.gapId] === W ? "Correct" : "Incorrect" : Y ? "Filled" : "Blank";
          return /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              disabled: C,
              "aria-label": `${(g == null ? void 0 : g.label) || "blank"}: ${(Y == null ? void 0 : Y.label) || "empty"}. ${I}`,
              onClick: () => K(k.gapId),
              children: (Y == null ? void 0 : Y.label) || "______"
            },
            k.gapId
          );
        }) }),
        /* @__PURE__ */ i("fieldset", { className: "lp-fieldset", disabled: C, children: [
          /* @__PURE__ */ t("legend", { children: "Available phrases" }),
          /* @__PURE__ */ t("div", { className: "lp-card__actions", children: N.map((k) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "lp-button",
              "aria-pressed": M === k.id,
              onClick: () => H(k.id),
              children: [
                k.label,
                M === k.id ? " (selected)" : ""
              ]
            },
            k.id
          )) })
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: () => void x(), disabled: C, children: X ? "Checking…" : "Check phrase" }),
          E ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: S, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(ie, { state: J, message: ee })
      ]
    }
  );
}
function At({
  id: e = "sequence",
  title: r,
  prompt: n,
  instructions: l,
  items: a,
  correctOrder: s = [],
  feedback: c,
  formative: o = !0,
  retry: d = !0,
  shuffle: p = !1,
  maxAttempts: y,
  onMarkResponse: v,
  onResult: h
}) {
  const u = ne(() => he(a, p), [a, p]), [f, _] = b(u), [T, m] = b(0), [M, H] = b(!1), [K, P] = b(!1), [V, q] = b("neutral"), [L, B] = b(""), [w, X] = b(), R = le(v), J = me(o, s.length > 0, v), A = M || K, ee = oe({
    checked: M,
    localRetry: d,
    localMaxAttempts: y,
    attempts: T,
    serverCanRetry: w
  });
  function $(C) {
    h == null || h(C);
  }
  function G(C, E) {
    const N = C + E;
    if (N < 0 || N >= f.length) return;
    const F = f.slice(), [j] = F.splice(C, 1);
    F.splice(N, 0, j), _(F);
  }
  function U(C, E) {
    A || (C.key === "ArrowUp" && (C.preventDefault(), G(E, -1)), C.key === "ArrowDown" && (C.preventDefault(), G(E, 1)));
  }
  async function Z() {
    if (K) return;
    const C = T + 1, E = f.map((x) => x.id), N = { itemIds: E };
    if (R && v) {
      P(!0), q("informative"), B("Checking your answer…");
      const x = await ke(
        v,
        N,
        c,
        "Your sequence has been recorded."
      );
      if (P(!1), !x.ok) {
        H(!1), X(!1), q("informative"), B(x.message), $({ completed: !1, correct: null, attempts: C, responses: N, status: "error" });
        return;
      }
      m(C), H(!0), X(x.marked.canRetry), q(x.marked.status), B(x.marked.message), $(de(x.marked, C, N));
      return;
    }
    const F = J ? E.filter((x, S) => x === s[S]).length : 0, j = J ? F === s.length && E.length === s.length : null;
    m(C), H(!0), q(j === !0 ? "correct" : j === !1 ? "incorrect" : "informative"), B(J ? j ? (c == null ? void 0 : c.correct) || "That order matches the expected sequence." : (c == null ? void 0 : c.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), $({
      completed: !0,
      correct: j,
      score: J ? { correct: F, total: s.length } : void 0,
      attempts: C,
      responses: N
    });
  }
  function z() {
    _(u), H(!1), P(!1), X(void 0), q("neutral"), B(""), $({
      completed: !1,
      correct: null,
      attempts: T,
      responses: { itemIds: u.map((C) => C.id) }
    });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "ordering",
      "data-lp-block-id": e,
      "aria-busy": K || void 0,
      children: [
        r ? /* @__PURE__ */ t("h3", { children: r }) : null,
        l ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: l }) : null,
        /* @__PURE__ */ t("p", { children: n }),
        /* @__PURE__ */ t("ol", { className: "lp-activity-list", children: f.map((C, E) => /* @__PURE__ */ i(
          "li",
          {
            className: "lp-card",
            tabIndex: A ? -1 : 0,
            "aria-label": `${C.label}, position ${E + 1} of ${f.length}`,
            onKeyDown: (N) => U(N, E),
            children: [
              /* @__PURE__ */ t("p", { children: /* @__PURE__ */ i("strong", { children: [
                E + 1,
                ". ",
                C.label
              ] }) }),
              /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: A || E === 0,
                    onClick: () => G(E, -1),
                    children: [
                      "Move ",
                      C.label,
                      " up"
                    ]
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: A || E === f.length - 1,
                    onClick: () => G(E, 1),
                    children: [
                      "Move ",
                      C.label,
                      " down"
                    ]
                  }
                )
              ] })
            ]
          },
          C.id
        )) }),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: () => void Z(), disabled: A, children: K ? "Checking…" : "Check order" }),
          ee ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: z, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(ie, { state: V, message: L })
      ]
    }
  );
}
function ae(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function Tt(e) {
  var r;
  return (e == null ? void 0 : e.formative) === !0 || ((r = e == null ? void 0 : e.marking) == null ? void 0 : r.mode) === "formative-local";
}
function Rt(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function xt(e) {
  return (e == null ? void 0 : e.shuffle) === !0 || (e == null ? void 0 : e.randomise) === !0;
}
const Et = [
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
], we = 200, $t = 500;
function $e(e, r) {
  const n = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return n > 0 ? n : r;
}
function Me(e) {
  return Et.includes(ae(e));
}
function Mt(e) {
  var r;
  return ((r = e.content) == null ? void 0 : r.questionId) || e.id;
}
function Pt({
  id: e,
  prompt: r,
  placeholder: n,
  value: l,
  defaultValue: a = "",
  minChars: s,
  minimumCharacters: c,
  defaultMinChars: o = we,
  rows: d = 4,
  disabled: p = !1,
  hidePrompt: y = !1,
  onChange: v
}) {
  const h = ge(), u = e || h, f = $e({ minChars: s, minimumCharacters: c }, o), _ = typeof l == "string", [T, m] = b(String(a || "")), [M, H] = b(""), K = _ ? l : T, P = K.trim().length, V = P >= f;
  function q(w) {
    _ || m(w), v == null || v(w);
  }
  function L(w) {
    w.preventDefault(), H("Paste is disabled. Type your answer in your own words.");
  }
  function B(w) {
    w.preventDefault(), H("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ i("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ i("label", { className: "lp-field", htmlFor: u, children: [
      y ? /* @__PURE__ */ t("span", { className: "lp-visually-hidden", children: r }) : /* @__PURE__ */ t("span", { className: "lp-field__label", children: r }),
      /* @__PURE__ */ t(
        "textarea",
        {
          id: u,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(f),
          rows: d,
          value: K,
          placeholder: n,
          minLength: f,
          autoComplete: "off",
          disabled: p,
          "aria-describedby": `${u}-count ${u}-notice`,
          onChange: (w) => q(w.target.value),
          onPaste: L,
          onDrop: B
        }
      )
    ] }),
    /* @__PURE__ */ t(
      "p",
      {
        id: `${u}-count`,
        className: "lp-char-count",
        "data-lp-char-count": "",
        "data-lp-met": V ? "true" : "false",
        "aria-live": "polite",
        children: `${P} / ${f} characters minimum`
      }
    ),
    /* @__PURE__ */ t(
      "p",
      {
        id: `${u}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: M
      }
    )
  ] });
}
function Lt(e, r) {
  return r > 0 ? `Write at least ${e} characters. You currently have ${r}.` : `Write at least ${e} characters before saving.`;
}
function Pe({
  id: e = "text-response",
  blockType: r = "short-response",
  title: n,
  prompt: l,
  instructions: a,
  guidance: s,
  placeholder: c,
  minChars: o,
  minimumCharacters: d,
  defaultMinChars: p = we,
  rows: y = 4,
  feedback: v,
  retry: h = !0,
  maxAttempts: u,
  initialResponse: f = "",
  saveLabel: _ = "Save response",
  onMarkResponse: T,
  onResult: m
}) {
  const M = $e({ minChars: o, minimumCharacters: d }, p), [H, K] = b(String(f || "")), [P, V] = b(0), [q, L] = b(!1), [B, w] = b(!1), [X, R] = b("neutral"), [J, A] = b(""), [ee, $] = b(), G = H.trim(), U = G.length, Z = U >= M, z = le(T), C = q || B, E = oe({
    checked: q,
    localRetry: h,
    localMaxAttempts: u,
    attempts: P,
    serverCanRetry: ee
  });
  function N(x) {
    m == null || m(x);
  }
  async function F() {
    if (B) return;
    if (!Z) {
      R("informative"), A(Lt(M, U));
      return;
    }
    const x = P + 1;
    if (z && T) {
      w(!0), R("informative"), A("Saving your response…");
      try {
        const O = ye(
          await T(G),
          v,
          s || "Your response has been recorded."
        );
        V(x), L(!0), $(O.canRetry), R(O.status), A(O.requiresReview || O.correct !== null ? O.message : s || O.message), N(de(O, x, G));
      } catch (O) {
        L(!1), $(!1), R("informative"), A(be(O)), N({
          completed: !1,
          correct: null,
          attempts: x,
          responses: G,
          status: "error"
        });
      } finally {
        w(!1);
      }
      return;
    }
    const S = s || (v == null ? void 0 : v.correct) || "Saved.";
    V(x), L(!0), R("informative"), A(S), N({
      completed: !0,
      correct: null,
      attempts: x,
      responses: G
    });
  }
  function j() {
    K(""), L(!1), w(!1), $(void 0), R("neutral"), A(""), N({
      completed: !1,
      correct: null,
      attempts: P,
      responses: ""
    });
  }
  return /* @__PURE__ */ i(
    "section",
    {
      className: "lp-block lp-block--interactive lp-form",
      "data-lp-block": r,
      "data-lp-block-id": e,
      "aria-busy": B || void 0,
      children: [
        n ? /* @__PURE__ */ t("h3", { children: n }) : null,
        a ? /* @__PURE__ */ t("p", { className: "lp-instructions", children: a }) : null,
        /* @__PURE__ */ t(
          Pt,
          {
            id: `${e}-field`,
            prompt: l,
            placeholder: c,
            value: H,
            minChars: o,
            minimumCharacters: d,
            defaultMinChars: p,
            rows: y,
            disabled: C,
            onChange: K
          }
        ),
        /* @__PURE__ */ i("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: () => void F(), disabled: C, children: B ? "Saving…" : _ }),
          E ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: j, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ t(ie, { state: X, message: J })
      ]
    }
  );
}
function Ot({
  rows: e = 4,
  ...r
}) {
  return /* @__PURE__ */ t(
    Pe,
    {
      ...r,
      blockType: "short-response",
      defaultMinChars: we,
      rows: e
    }
  );
}
function Ft({
  rows: e = 6,
  ...r
}) {
  return /* @__PURE__ */ t(
    Pe,
    {
      ...r,
      blockType: "reflection",
      defaultMinChars: $t,
      rows: e
    }
  );
}
function Dt(e) {
  const r = e.content || {};
  return {
    id: e.id,
    instructions: r.instructions,
    feedback: r.feedback,
    formative: Tt(r),
    retry: Rt(r),
    shuffle: xt(r),
    maxAttempts: r.maxAttempts
  };
}
function Se(e) {
  return typeof e == "string" ? e : void 0;
}
function qt({ block: e, initialResponse: r, onMarkResponse: n, onResult: l }) {
  const a = ae(e.type), s = e.content || {}, c = ae(s.presentation), o = Dt(e), d = (p) => l == null ? void 0 : l(p, e);
  if (a === "single-choice" || a === "option-cards" || c === "option-cards" || c === "true-false" || c === "picture-quiz")
    return /* @__PURE__ */ t(
      wt,
      {
        ...o,
        prompt: s.prompt || "Choose an option",
        options: s.options || [],
        correctOptionId: s.correctOptionId,
        initialSelectedId: typeof r == "string" ? r : void 0,
        onMarkResponse: n,
        onResult: d
      }
    );
  if (a === "classification") {
    const p = r && typeof r == "object" && !Array.isArray(r) ? r : void 0;
    return /* @__PURE__ */ t(
      _t,
      {
        ...o,
        prompt: s.prompt || "Classify each item",
        items: s.items || [],
        categories: s.categories || [],
        initialAssignments: p,
        onMarkResponse: n,
        onResult: d
      }
    );
  }
  return a === "drag-drop" ? /* @__PURE__ */ t(
    kt,
    {
      ...o,
      prompt: s.prompt || "Place each item",
      items: s.items || [],
      targets: s.targets || [],
      correct: s.correct,
      onMarkResponse: n,
      onResult: d
    }
  ) : a === "fill-gap" || a === "phrase-completion" ? /* @__PURE__ */ t(
    It,
    {
      ...o,
      prompt: s.prompt || "Complete the phrase",
      gaps: s.gaps,
      options: s.options || [],
      correctOptionId: s.correctOptionId,
      onMarkResponse: n,
      onResult: d
    }
  ) : a === "ordering" || a === "sequence" ? /* @__PURE__ */ t(
    At,
    {
      ...o,
      prompt: s.prompt || "Put the items in order",
      items: s.items || [],
      correctOrder: s.correctOrder,
      onMarkResponse: n,
      onResult: d
    }
  ) : a === "short-response" ? /* @__PURE__ */ t(
    Ot,
    {
      id: o.id,
      prompt: s.prompt || "Write your response",
      instructions: o.instructions,
      guidance: s.guidance,
      placeholder: s.placeholder,
      minChars: s.minChars,
      minimumCharacters: s.minimumCharacters,
      feedback: o.feedback,
      retry: o.retry,
      maxAttempts: o.maxAttempts,
      initialResponse: Se(r),
      onMarkResponse: n,
      onResult: d
    }
  ) : a === "reflection" ? /* @__PURE__ */ t(
    Ft,
    {
      id: o.id,
      prompt: s.prompt || "Write your reflection",
      instructions: o.instructions,
      guidance: s.guidance,
      placeholder: s.placeholder,
      minChars: s.minChars,
      minimumCharacters: s.minimumCharacters,
      feedback: o.feedback,
      retry: o.retry,
      maxAttempts: o.maxAttempts,
      initialResponse: Se(r),
      onMarkResponse: n,
      onResult: d
    }
  ) : /* @__PURE__ */ i("p", { className: "lp-card__meta", "data-lp-block": a, children: [
    "This ",
    a || "unknown",
    " block is not part of the React activity catalogue yet."
  ] });
}
function Bt(e, r, n, l) {
  if (l === "local") return n;
  const a = n || Nt(e, r);
  return l === "server" && !a ? xe() : a;
}
function pr({
  activity: e,
  initialResponses: r = {},
  renderFallback: n,
  platform: l,
  markingMode: a,
  onMarkResponse: s,
  onResult: c
}) {
  var v, h;
  const [o, d] = b(0), p = qe(e) || void 0, y = Bt(l, e, s, a);
  return /* @__PURE__ */ i(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": p,
      children: [
        (v = e.metadata) != null && v.title ? /* @__PURE__ */ t("h3", { children: e.metadata.title }) : null,
        (h = e.metadata) != null && h.summary ? /* @__PURE__ */ t("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ t("div", { className: "lp-activity-list", children: (e.blocks || []).map((u) => Me(u.type) ? /* @__PURE__ */ t(
          qt,
          {
            block: u,
            initialResponse: r[Mt(u)],
            onMarkResponse: y ? (f) => y({
              activityId: e.id,
              activityVersion: p || "",
              block: u,
              responses: f
            }) : void 0,
            onResult: c
          },
          u.id
        ) : n ? /* @__PURE__ */ t("div", { children: n(u) }, u.id) : /* @__PURE__ */ i("p", { className: "lp-card__meta", "data-lp-block": ae(u.type), children: [
          "This ",
          ae(u.type) || "unknown",
          " block is not part of the React activity catalogue yet."
        ] }, u.id)) }, o),
        /* @__PURE__ */ i("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => d((u) => u + 1),
              children: "Reset activity"
            }
          ),
          /* @__PURE__ */ t("p", { className: "lp-activity-status", "data-lp-activity-status": !0, role: "status", "aria-live": "polite" })
        ] })
      ]
    }
  );
}
function jt(e, r) {
  return typeof r == "number" && Number.isFinite(r) ? Math.min(1, Math.max(0, r)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function Le({
  title: e,
  badge: r,
  subtitle: n,
  score: l,
  progress: a,
  completed: s = !0,
  attempts: c,
  message: o,
  showStatus: d = !0,
  showDisclaimer: p = !0,
  collapsed: y = !1
}) {
  const v = r || n, h = jt(l, a), u = Math.round(h * 100), f = s ? "Completed" : "In progress", _ = l ? `${l.correct} / ${l.total}` : null, T = l ? `${l.correct} of ${l.total} correct` : null, m = typeof c == "number" ? `${c} ${c === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ i(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": y ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ t("strong", { children: e }) }) : null,
        d ? /* @__PURE__ */ t(pe, { status: s ? "completed" : "progress", label: f }) : null,
        _ ? /* @__PURE__ */ t(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": T || void 0,
            children: _
          }
        ) : null,
        T ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: T }) : null,
        !y && v ? /* @__PURE__ */ t("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ t("strong", { children: v }) }) : null,
        y ? null : /* @__PURE__ */ i(Oe, { children: [
          /* @__PURE__ */ t(
            "progress",
            {
              className: "lp-progress",
              max: 100,
              value: u,
              "aria-label": `${u}% complete`
            }
          ),
          /* @__PURE__ */ i("p", { className: "lp-card__meta", children: [
            u,
            "% complete"
          ] }),
          m ? /* @__PURE__ */ t("p", { children: m }) : null,
          o ? /* @__PURE__ */ t("p", { children: o }) : null,
          p ? /* @__PURE__ */ t("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function Yt(e, r) {
  if (e)
    try {
      r && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !r && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      r ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function mr({
  open: e = !1,
  title: r = "Activity complete",
  completed: n = !0,
  score: l,
  badge: a,
  subtitle: s,
  progress: c,
  attempts: o,
  message: d,
  onClose: p,
  onReview: y,
  onNext: v,
  nextLabel: h = "Continue",
  reviewLabel: u = "Review"
}) {
  const f = Fe(null), _ = ge();
  return Ie(() => {
    Yt(f.current, e);
  }, [e]), e ? /* @__PURE__ */ i(
    "dialog",
    {
      ref: f,
      className: "lp-dialog",
      "aria-labelledby": _,
      onCancel: (T) => {
        T.preventDefault(), p == null || p();
      },
      children: [
        /* @__PURE__ */ i("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ t("h2", { id: _, children: r }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${r}`,
              onClick: p,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ t(
            Le,
            {
              completed: n,
              score: l,
              badge: a,
              subtitle: s,
              progress: c,
              attempts: o,
              message: d
            }
          ),
          /* @__PURE__ */ i("div", { className: "lp-form__actions", children: [
            y ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button lp-button--secondary", onClick: y, children: u }) : null,
            v ? /* @__PURE__ */ t("button", { type: "button", className: "lp-button", onClick: v, children: h }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const Ht = (e) => ({
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
function hr({
  collapsed: e,
  defaultCollapsed: r = !0,
  onCollapsedChange: n,
  expandLabel: l = "Show progress details",
  collapseLabel: a = "Hide progress details",
  ...s
}) {
  const [c, o] = b(r), d = typeof e == "boolean" ? e : c, p = ge(), y = s.title || "Practice progress";
  function v(h) {
    typeof e != "boolean" && o(h), n == null || n(h);
  }
  return /* @__PURE__ */ i(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: Ht(d),
      "aria-label": y,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": d ? "true" : "false",
      children: [
        /* @__PURE__ */ t("div", { id: p, children: /* @__PURE__ */ t(Le, { ...s, title: y, collapsed: d }) }),
        /* @__PURE__ */ t("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !d,
            "aria-controls": p,
            onClick: () => v(!d),
            children: d ? l : a
          }
        ) })
      ]
    }
  );
}
const Kt = {
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
}, Ut = {
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
}, Vt = {
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
}, Gt = {
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
}, zt = {
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
}, Wt = {
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
}, Xt = {
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
}, Zt = {
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
}, fr = [
  Kt,
  Ut,
  Vt,
  Gt,
  zt,
  Wt,
  Xt,
  Zt
];
function Jt(e) {
  const r = ae(e.type);
  return r === "single-choice" || r === "option-cards" || r === "classification" || r === "drag-drop" || r === "fill-gap" || r === "phrase-completion" || r === "ordering" || r === "sequence";
}
function gr(e) {
  return Me(e.type);
}
function br(e) {
  if (!Jt(e)) return 0;
  const r = ae(e.type);
  return r === "classification" ? (e.content && e.content.items || []).length : r === "drag-drop" ? (e.content && e.content.items || []).length : r === "fill-gap" || r === "phrase-completion" ? (e.content && e.content.gaps || []).length || 1 : r === "ordering" || r === "sequence" ? (e.content && e.content.items || []).length : 1;
}
function yr() {
  return { completed: {}, scores: {} };
}
function vr(e, r, n) {
  const l = { ...e.completed }, a = { ...e.scores };
  return n.completed ? (l[r] = !0, n.score && n.score.total > 0 && !n.requiresReview ? a[r] = n.score : delete a[r], { completed: l, scores: a }) : e;
}
function Nr(e, r) {
  return r.length > 0 && r.every((n) => e.completed[n]);
}
function Cr(e, r) {
  var l;
  if (!e.completed) return !1;
  const n = ((l = e.score) == null ? void 0 : l.total) || 0;
  return r.complete || r.completedCount >= 2 || n >= 2;
}
function _r(e, r) {
  const n = Object.values(e.completed).filter(Boolean).length, l = Object.values(e.scores).reduce(
    (s, c) => ({
      correct: s.correct + c.correct,
      total: s.total + c.total
    }),
    { correct: 0, total: 0 }
  ), a = Math.max(0, r.requiredBlocks);
  return {
    completedCount: n,
    requiredBlocks: a,
    completion: a > 0 ? Math.min(1, n / a) : 0,
    score: {
      correct: l.correct,
      total: Math.max(r.scorableTotal, l.total, 0)
    },
    complete: a > 0 && n >= a
  };
}
export {
  qt as ActivityBlock,
  Je as ActivityCard,
  dt as AuthoredHtml,
  et as Breadcrumbs,
  je as CONTEXT_TYPES,
  rt as Callout,
  _t as Classification,
  mr as CompletionModal,
  nt as ContextPanel,
  kt as DragDrop,
  Te as EmptyState,
  lr as ErrorState,
  ft as FEEDBACK_STATES,
  ie as FeedbackPanel,
  sr as HubShell,
  pr as InteractiveActivity,
  nr as LEARNER_ACTIVITY_STATES,
  cr as LearnerHeader,
  lt as LearningOutcomeBadge,
  Pt as LearningTextField,
  ir as LoadingState,
  at as Navigation,
  wt as OptionCards,
  It as PhraseCompletion,
  hr as PracticeProgressPanel,
  st as ProgressCard,
  Le as ProgressSummary,
  $t as REFLECTION_DEFAULT_MIN_CHARS,
  Ft as Reflection,
  Ne as SERVER_CHECK_FAILED_MESSAGE,
  bt as SERVER_REVIEW_MESSAGE,
  Ye as SESSION_KINDS,
  ve as SESSION_KIND_LABELS,
  we as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  ar as STATUS_TONES,
  At as Sequence,
  ct as SessionSection,
  Ot as ShortResponse,
  pe as StatusBadge,
  Pe as TextResponse,
  ce as WEEK_ACCESS_COPY,
  He as WEEK_UI_FEATURES,
  ur as WeekAccessGuard,
  dr as WeekAccessLink,
  it as WeekHeader,
  ot as WeekNavigation,
  or as WeekView,
  Ze as activityActionLabel,
  _r as aggregatePracticeProgress,
  vr as applyPracticeResult,
  br as catalogueBlockScorableTotal,
  Nt as createMarkResponseHandler,
  fr as demoCatalogueActivities,
  Wt as demoClassification,
  Vt as demoDragDrop,
  Kt as demoOptionCards,
  Gt as demoPhraseCompletion,
  Zt as demoReflection,
  zt as demoSequence,
  Xt as demoShortResponse,
  Ut as demoTrueFalse,
  yr as emptyPracticeProgress,
  Me as isCatalogueReactType,
  gr as isCompletableReactBlock,
  Ve as isIndependentKind,
  Cr as isPracticeCompletionCue,
  Jt as isScorableReactBlock,
  Ge as isSessionKind,
  vt as learnerSafeBlock,
  Ke as mergeWeekUiFeatures,
  ae as normaliseActivityType,
  Mt as questionIdFor,
  $e as resolveMinChars,
  jt as resolveProgressFraction,
  _e as resolveWeekStatus,
  Nr as scorableBlocksComplete,
  Ue as shouldShowContext,
  Ae as statusLabel,
  Xe as statusTone,
  mt as weekAccessFallbackCopy,
  Re as weekIsAccessible
};
//# sourceMappingURL=index.js.map
