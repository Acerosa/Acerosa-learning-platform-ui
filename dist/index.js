import { jsxs as d, jsx as c, Fragment as ot } from "react/jsx-runtime";
import { useId as Le, useState as M, useEffect as ye, Fragment as it, createContext as Ve, useContext as Ge, useMemo as pe, useRef as be, useCallback as Ae } from "react";
import { isUnsafeAuthoredHtml as dt, resolveActivityVersion as ut } from "@learning-platform/core";
import { isWeekAvailable as pt } from "@learning-platform/core/curriculum-runtime";
const mt = ["exam", "assignment", "project"], ht = [
  "session",
  "independent-study",
  "homework",
  "revision",
  "retrieval"
], Oe = {
  session: "Session",
  "independent-study": "Independent study",
  homework: "Homework",
  revision: "Revision",
  retrieval: "Retrieval"
}, Kr = ["not-started", "in-progress", "completed"], Ur = ["available", "planned", "progress", "completed"], ft = {
  showTitle: !0,
  showLearningOutcomes: !0,
  showAssignmentContext: !0,
  showExamContext: !0,
  showProjectContext: !0,
  showIndependentStudy: !0,
  showProgress: !0
};
function yt(e = {}) {
  return { ...ft, ...e };
}
function gt(e, t) {
  return t ? t === "assignment" ? e.showAssignmentContext !== !1 : t === "exam" ? e.showExamContext !== !1 : t === "project" ? e.showProjectContext !== !1 : !0 : !1;
}
function vt(e) {
  return e === "independent-study" || e === "homework";
}
function bt(e) {
  return ht.includes(e);
}
const Ct = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
}, Nt = {
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
function kt(e) {
  return Ct[e || ""] || "planned";
}
function ze(e, t = "") {
  return Nt[e || ""] || t || String(e || "Planned");
}
function _t(e, t = "Open activity") {
  return e === "completed" ? "Review activity" : e === "in-progress" ? "Resume activity" : e === "not-started" ? "Start activity" : t;
}
function Te({
  status: e = "planned",
  label: t,
  marker: r = !0
}) {
  const s = kt(e);
  return /* @__PURE__ */ d("span", { className: `lp-status-badge lp-status-badge--${s}`, role: "status", children: [
    r ? /* @__PURE__ */ c("span", { "aria-hidden": "true", children: "● " }) : null,
    t || ze(e)
  ] });
}
function St({
  title: e = "Untitled activity",
  description: t = "",
  activityType: r = "Activity",
  duration: s = "",
  status: n = "Not started",
  state: a,
  href: l,
  actionLabel: o,
  badge: i = !1,
  badgeStatus: m,
  headingLevel: u = 2,
  muted: y = !1
}) {
  const f = u === 3 ? "h3" : "h2", h = [r, s].filter(Boolean), C = a ? ze(a, n) : n;
  return /* @__PURE__ */ d("article", { className: y ? "lp-card lp-activity-card lp-card--muted is-coming-soon" : "lp-card lp-activity-card", "data-state": a || void 0, children: [
    i ? /* @__PURE__ */ c(
      Te,
      {
        status: m || a || "planned",
        label: typeof n == "string" && n !== "Not started" ? n : void 0
      }
    ) : null,
    h.length ? /* @__PURE__ */ c("p", { className: "lp-card__meta", children: h.join(" · ") }) : null,
    /* @__PURE__ */ c(f, { children: e }),
    t ? /* @__PURE__ */ c("p", { children: t }) : null,
    /* @__PURE__ */ c("p", { className: "lp-card__meta", children: `Status: ${C}` }),
    l ? /* @__PURE__ */ c("div", { className: "lp-card__actions", children: /* @__PURE__ */ c("a", { className: "lp-button", href: l, children: o || _t(a) }) }) : null
  ] });
}
function wt(e, t) {
  return e.href ? e.href : e.path != null && t ? t(e.path) : e.path || void 0;
}
function At({ items: e = [], resolveHref: t }) {
  return e.length ? /* @__PURE__ */ c("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ c("ol", { className: "lp-breadcrumbs__list", children: e.map((r, s) => {
    const n = s === e.length - 1, a = wt(r, t);
    return /* @__PURE__ */ c("li", { children: n || !a ? /* @__PURE__ */ c("span", { "aria-current": "page", children: r.label }) : /* @__PURE__ */ c("a", { href: a, children: r.label }) }, `${r.label}-${s}`);
  }) }) }) : /* @__PURE__ */ c("nav", { className: "lp-breadcrumbs", "aria-label": "Breadcrumb", hidden: !0 });
}
const It = ["info", "success", "warning", "error"];
function Tt({ tone: e = "info", title: t, message: r }) {
  const s = It.includes(e) ? e : "info";
  return /* @__PURE__ */ d(
    "aside",
    {
      className: `lp-callout lp-callout--${s}`,
      role: s === "error" ? "alert" : void 0,
      children: [
        t ? /* @__PURE__ */ c("strong", { children: t }) : null,
        r ? /* @__PURE__ */ c("p", { children: r }) : null
      ]
    }
  );
}
function Et({
  contextType: e = "assignment",
  heading: t = "Context",
  items: r = [],
  description: s = "",
  action: n
}) {
  const a = mt.includes(e) ? e : "assignment", l = `lp-context-${a}`;
  return /* @__PURE__ */ d(
    "section",
    {
      className: `lp-context-panel lp-panel lp-context-panel--${a}`,
      "aria-labelledby": l,
      "data-context-type": a,
      children: [
        /* @__PURE__ */ c("h2", { id: l, children: t }),
        r.length ? /* @__PURE__ */ c("dl", { className: "lp-meta-list", children: r.map((o) => /* @__PURE__ */ d("div", { children: [
          /* @__PURE__ */ c("dt", { children: o.label }),
          /* @__PURE__ */ c("dd", { children: o.value })
        ] }, `${o.label}:${o.value}`)) }) : null,
        s ? /* @__PURE__ */ c("p", { children: s }) : null,
        n != null && n.label && (n != null && n.href) ? /* @__PURE__ */ c("p", { children: /* @__PURE__ */ c("a", { className: "lp-text-link", href: n.href, children: n.label }) }) : null
      ]
    }
  );
}
function We({
  heading: e = "Nothing to show yet",
  message: t = "Check again later.",
  action: r
}) {
  return /* @__PURE__ */ d("section", { className: "lp-empty-state", children: [
    /* @__PURE__ */ c("h2", { children: e }),
    /* @__PURE__ */ c("p", { children: t }),
    r != null && r.label && (r != null && r.href) ? /* @__PURE__ */ c("a", { className: "lp-button", href: r.href, children: r.label }) : null
  ] });
}
function Vr({
  heading: e = "There is a problem",
  message: t = "Try again."
}) {
  return /* @__PURE__ */ d("section", { className: "lp-error-banner", role: "alert", tabIndex: -1, children: [
    /* @__PURE__ */ c("h2", { children: e }),
    /* @__PURE__ */ c("p", { children: t })
  ] });
}
function xt({
  items: e,
  currentId: t = "home",
  currentIds: r = [],
  brandTitle: s,
  brandTagline: n,
  homeHref: a,
  theme: l = null,
  actions: o,
  listId: i
}) {
  const m = Le(), u = i || `lp-navigation-list-${m}`, [y, f] = M(!1), h = new Set([t, ...r].filter(Boolean)), C = e.find((g) => g.id === "home" && g.enabled !== !1), I = e.filter((g) => g.enabled !== !1);
  ye(() => {
    function g(v) {
      v.key === "Escape" && f(!1);
    }
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, []);
  function E(g) {
    if (g.key === "Escape") {
      f(!1);
      const v = g.currentTarget.querySelector(".lp-navigation__toggle");
      v == null || v.focus();
    }
  }
  return /* @__PURE__ */ c("nav", { className: "lp-navigation", "aria-label": "Main navigation", onKeyDown: E, children: /* @__PURE__ */ d("div", { className: "lp-navigation__bar", children: [
    /* @__PURE__ */ d("a", { className: "lp-navigation__brand", href: a || (C == null ? void 0 : C.path) || "./", children: [
      /* @__PURE__ */ c("span", { className: "lp-navigation__brand-title", children: s }),
      n ? /* @__PURE__ */ c("span", { className: "lp-navigation__brand-tagline", children: n }) : null
    ] }),
    /* @__PURE__ */ c(
      "button",
      {
        className: "lp-button lp-button--secondary lp-navigation__toggle",
        type: "button",
        "aria-expanded": y,
        "aria-controls": u,
        "aria-label": y ? "Close main menu" : "Open main menu",
        onClick: () => f((g) => !g),
        children: "Menu"
      }
    ),
    /* @__PURE__ */ c(
      "ul",
      {
        className: "lp-navigation__list",
        id: u,
        "data-open": y ? "true" : "false",
        children: I.map((g) => /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(
          "a",
          {
            className: "lp-navigation__link",
            href: g.path,
            "aria-current": h.has(g.id) ? "page" : void 0,
            onClick: () => f(!1),
            children: g.label
          }
        ) }, g.id))
      }
    ),
    l ? /* @__PURE__ */ d("label", { className: "lp-theme-control", children: [
      "Theme",
      /* @__PURE__ */ c(
        "select",
        {
          "aria-label": "Theme preference",
          value: l.preference,
          onChange: (g) => l.onChange(g.target.value),
          children: l.modes.map((g) => /* @__PURE__ */ c("option", { value: g, children: g[0].toUpperCase() + g.slice(1) }, g))
        }
      )
    ] }) : null,
    o ? /* @__PURE__ */ c("div", { className: "lp-navigation__actions", children: o }) : null
  ] }) });
}
function Gr({
  brandTitle: e,
  brandTagline: t,
  navigation: r,
  currentId: s = "home",
  currentIds: n = [],
  theme: a = null,
  actions: l,
  breadcrumbs: o,
  resolveHref: i,
  pageHeader: m,
  footer: u,
  learnerHeader: y,
  notice: f,
  skipLabel: h = "Skip to main content",
  mainId: C = "main-content",
  children: I
}) {
  const E = u && typeof u == "object" && "lines" in u ? u.lines.map((g) => /* @__PURE__ */ c("p", { children: g }, g)) : u;
  return /* @__PURE__ */ d("div", { className: "lp-shell", children: [
    /* @__PURE__ */ c("a", { className: "lp-skip-link skip-link", href: `#${C}`, children: h }),
    /* @__PURE__ */ c("header", { className: "lp-shell__banner", role: "banner", children: /* @__PURE__ */ c(
      xt,
      {
        items: r,
        currentId: s,
        currentIds: n,
        brandTitle: e,
        brandTagline: t,
        theme: a,
        actions: l
      }
    ) }),
    /* @__PURE__ */ c("div", { className: "lp-shell__learner", children: y }),
    f,
    o ? /* @__PURE__ */ c(At, { items: o, resolveHref: i }) : null,
    m != null && m.title ? /* @__PURE__ */ d("div", { className: "lp-page-header page-header", children: [
      /* @__PURE__ */ c("h1", { children: m.title }),
      m.subtitle ? /* @__PURE__ */ c("p", { className: "lp-page-header__subtitle", children: m.subtitle }) : null
    ] }) : null,
    /* @__PURE__ */ c("main", { id: C, className: "lp-shell__main site-main", tabIndex: -1, children: I }),
    /* @__PURE__ */ c("footer", { className: "lp-shell__footer site-footer", role: "contentinfo", children: E })
  ] });
}
function zr({
  learner: e,
  hubName: t,
  accountHref: r = "./account/",
  onSignOut: s
}) {
  return e ? /* @__PURE__ */ d("section", { className: "lp-learner-header", "aria-label": "Learner account", children: [
    /* @__PURE__ */ d("dl", { className: "lp-learner-header__details", children: [
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ c("dt", { children: "Learner" }),
        /* @__PURE__ */ c("dd", { children: e.fullName || e.displayName || "Learner" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ c("dt", { children: "Year group" }),
        /* @__PURE__ */ c("dd", { children: e.yearGroup || e.academicYear || "Not set" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ c("dt", { children: "Email" }),
        /* @__PURE__ */ c("dd", { children: e.contactEmail || "Not set" })
      ] }),
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ c("dt", { children: "Current hub" }),
        /* @__PURE__ */ c("dd", { children: t })
      ] })
    ] }),
    /* @__PURE__ */ d("div", { className: "lp-learner-header__actions", children: [
      /* @__PURE__ */ c("a", { href: r, children: "Account" }),
      s ? /* @__PURE__ */ c("button", { className: "lp-button lp-button--secondary", type: "button", onClick: () => {
        s();
      }, children: "Sign out" }) : null
    ] })
  ] }) : /* @__PURE__ */ c("section", { className: "lp-learner-header", "aria-label": "Learner account", hidden: !0 });
}
function Mt({ id: e, title: t }) {
  const r = [e, t].filter(Boolean).join(" ") || "Learning outcome";
  return /* @__PURE__ */ c("span", { className: "lp-outcome-badge", children: r });
}
function Wr({ message: e = "Loading…" }) {
  return /* @__PURE__ */ d("div", { className: "lp-loading", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ c("span", { className: "lp-loading__spinner", "aria-hidden": "true" }),
    /* @__PURE__ */ c("span", { children: e })
  ] });
}
function $t({
  title: e = "Progress",
  completed: t = 0,
  total: r = 0,
  description: s = ""
}) {
  const n = Math.max(0, Number(r) || 0), a = Math.min(n, Math.max(0, Number(t) || 0)), l = n ? Math.round(a / n * 100) : 0;
  return /* @__PURE__ */ d("article", { className: "lp-card lp-progress-card", children: [
    /* @__PURE__ */ c("h2", { children: e }),
    s ? /* @__PURE__ */ c("p", { className: "lp-card__meta", children: s }) : null,
    /* @__PURE__ */ c(
      "progress",
      {
        className: "lp-progress",
        max: n || 1,
        value: a,
        "aria-label": `${l}% complete`
      }
    ),
    /* @__PURE__ */ c("p", { children: `${a} of ${n} complete (${l}%)` })
  ] });
}
function Pt({
  id: e,
  title: t,
  kind: r = "session",
  summary: s = "",
  defaultOpen: n = !1,
  meta: a,
  children: l
}) {
  const o = bt(r) ? r : "session", i = Oe[o];
  return /* @__PURE__ */ d("details", { className: "lp-session lp-panel", id: e, "data-kind": o, open: n, children: [
    /* @__PURE__ */ c("summary", { className: "lp-session__summary", children: /* @__PURE__ */ d("span", { className: "lp-session__text", children: [
      /* @__PURE__ */ c("h2", { className: "lp-session__heading", children: t || i }),
      /* @__PURE__ */ c("span", { className: "lp-session__meta", children: a || i })
    ] }) }),
    /* @__PURE__ */ d("div", { className: "lp-session__content", children: [
      s ? /* @__PURE__ */ c("p", { className: "lp-panel-note", children: s }) : null,
      /* @__PURE__ */ c("div", { className: "lp-activity-list", children: l })
    ] })
  ] });
}
function Lt({
  teachingWeek: e,
  title: t = "",
  subtitle: r = "",
  status: s,
  learningOutcomes: n = [],
  headingLevel: a = 1,
  showTitle: l = !0
}) {
  const o = e ? `Week ${e}${t ? `: ${t}` : ""}` : t || "Week";
  return /* @__PURE__ */ d("header", { className: "lp-week-header", children: [
    s ? /* @__PURE__ */ c(Te, { status: s }) : null,
    l ? /* @__PURE__ */ c(a === 2 ? "h2" : "h1", { children: o }) : e ? /* @__PURE__ */ c("p", { className: "lp-week-header__kicker", children: `Teaching week ${e}` }) : null,
    r ? /* @__PURE__ */ c("p", { className: "lp-week-header__subtitle", children: r }) : null,
    n.length ? /* @__PURE__ */ c("ul", { className: "lp-week-header__outcomes", children: n.map((m) => /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(Mt, { id: m.id, title: m.title }) }, m.id || m.title)) }) : null
  ] });
}
function Dt({ previousWeek: e, nextWeek: t }) {
  return !(e != null && e.href) && !(t != null && t.href) ? null : /* @__PURE__ */ c("nav", { className: "lp-week-nav", "aria-label": "Week", children: /* @__PURE__ */ d("ul", { className: "lp-week-nav__list", children: [
    e != null && e.href ? /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c("a", { className: "lp-text-link", href: e.href, rel: "prev", children: e.label || "Previous week" }) }) : null,
    t != null && t.href ? /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c("a", { className: "lp-text-link", href: t.href, rel: "next", children: t.label || "Next week" }) }) : null
  ] }) });
}
function Rt({ html: e, className: t, ...r }) {
  const s = e == null ? "" : String(e);
  return dt(s) ? /* @__PURE__ */ c("div", { className: t, "data-lp-html-rejected": "true", ...r }) : /* @__PURE__ */ c("div", { className: t, dangerouslySetInnerHTML: { __html: s }, ...r });
}
function Ot(e) {
  if (e.meta) return e.meta;
  const t = (e.activities || []).length, r = `${t} ${t === 1 ? "activity" : "activities"}`, s = Oe[e.kind || "session"] || Oe.session;
  return e.kind && e.kind !== "session" ? `${s} · ${r}` : r;
}
function Ft(e, t) {
  const r = e.id || e.activityId;
  return r ? e.activityVersion ? `${r}@${e.activityVersion}` : r : `index:${t}`;
}
function jt(e, t) {
  return "html" in e && e.html ? /* @__PURE__ */ c(
    Rt,
    {
      className: "lp-activity-html",
      html: e.html
    }
  ) : "children" in e && e.children ? /* @__PURE__ */ c("div", { children: e.children }) : /* @__PURE__ */ c(St, { ...e });
}
function Xr({
  week: e = {},
  learningOutcomes: t = [],
  context: r = null,
  sessions: s = [],
  progress: n = null,
  previousWeek: a,
  nextWeek: l,
  features: o = {},
  renderActivity: i
}) {
  const m = yt(o), u = (r == null ? void 0 : r.type) || (r == null ? void 0 : r.contextType), y = s.filter((h) => !(m.showIndependentStudy === !1 && vt(h.kind))), f = i || jt;
  return /* @__PURE__ */ d("div", { className: "lp-week", "data-week": e.id || void 0, children: [
    /* @__PURE__ */ c(
      Lt,
      {
        teachingWeek: e.teachingWeek,
        title: e.title,
        subtitle: e.subtitle,
        status: e.status,
        learningOutcomes: m.showLearningOutcomes ? t : [],
        headingLevel: e.headingLevel || 1,
        showTitle: m.showTitle !== !1
      }
    ),
    r && gt(m, u) ? /* @__PURE__ */ c(
      Et,
      {
        contextType: u,
        heading: r.heading,
        items: r.items,
        description: r.description,
        action: r.action
      }
    ) : null,
    y.length ? y.map((h) => /* @__PURE__ */ c(
      Pt,
      {
        id: h.id,
        title: h.title,
        kind: h.kind,
        summary: h.summary,
        defaultOpen: h.defaultOpen,
        meta: Ot(h),
        children: (h.activities || []).map((C, I) => /* @__PURE__ */ c(it, { children: f(C, I) }, Ft(C, I)))
      },
      h.id || h.title
    )) : /* @__PURE__ */ c(
      We,
      {
        heading: "Planned teaching week",
        message: e.emptyMessage || "Detailed session activities for this week have not been added yet.",
        action: e.emptyAction
      }
    ),
    m.showProgress && n ? /* @__PURE__ */ c($t, { ...n }) : null,
    /* @__PURE__ */ c(Dt, { previousWeek: a, nextWeek: l })
  ] });
}
const ve = {
  plannedHeading: "Week not available yet",
  plannedMessage: "This week has not been made available by your teacher.",
  archivedHeading: "Week not available",
  archivedMessage: "This week is no longer available to learners.",
  inaccessibleHeading: "Week not available",
  inaccessibleMessage: "This week is not available."
};
function Be(e) {
  var t;
  return String(e.status ?? ((t = e.metadata) == null ? void 0 : t.status) ?? "").trim();
}
function Xe(e) {
  return pt(Be(e));
}
function Bt(e) {
  const t = e.toLowerCase();
  return t === "planned" ? {
    heading: ve.plannedHeading,
    message: ve.plannedMessage
  } : t === "archived" ? {
    heading: ve.archivedHeading,
    message: ve.archivedMessage
  } : {
    heading: ve.inaccessibleHeading,
    message: ve.inaccessibleMessage
  };
}
function qt({ href: e, children: t, className: r }) {
  return /* @__PURE__ */ c("a", { className: r, href: e, children: t });
}
function Zr({
  week: e,
  href: t,
  children: r,
  className: s = "lp-text-link",
  lockedClassName: n = "lp-week-access-link lp-week-access-link--locked",
  renderLink: a = qt
}) {
  if (Xe(e))
    return a({ href: t, children: r, className: s });
  const l = Be(e);
  return /* @__PURE__ */ d("span", { className: n, "aria-disabled": "true", children: [
    /* @__PURE__ */ c("span", { className: "lp-week-access-link__label", children: r }),
    " ",
    /* @__PURE__ */ c(Te, { status: l || "planned" })
  ] });
}
function Jr({ week: e, children: t, fallback: r }) {
  if (Xe(e))
    return t;
  if (r != null)
    return r;
  const s = Be(e), n = Bt(s);
  return /* @__PURE__ */ d("div", { className: "lp-week-access-guard", children: [
    /* @__PURE__ */ c(Te, { status: s || "planned" }),
    /* @__PURE__ */ c(We, { heading: n.heading, message: n.message })
  ] });
}
const Ze = Ve(null), Je = Ve(null), Yt = {
  isDirty: () => !1,
  markDirty: () => {
  },
  recordResponse: () => {
  }
};
function Ht({
  store: e,
  children: t
}) {
  return /* @__PURE__ */ c(Ze.Provider, { value: e, children: t });
}
function Kt({
  questionId: e,
  children: t
}) {
  const r = Ge(Ze), s = pe(() => ({
    isDirty: () => {
      var n;
      return !!((n = r == null ? void 0 : r.isDirty) != null && n.call(r));
    },
    markDirty: () => {
      var n;
      (n = r == null ? void 0 : r.markDirty) == null || n.call(r);
    },
    recordResponse: (n) => {
      var i;
      if ((i = r == null ? void 0 : r.markDirty) == null || i.call(r), typeof (r == null ? void 0 : r.save) != "function") return;
      const a = (typeof r.load == "function" ? r.load() : null) || {}, l = {
        ...a.responses && typeof a.responses == "object" && !Array.isArray(a.responses) ? a.responses : {}
      }, o = {
        ...a.checked && typeof a.checked == "object" && !Array.isArray(a.checked) ? a.checked : {}
      };
      l[e] = n, o[e] = !1, r.save({ ...a, responses: l, checked: o }, { remote: !1 });
    }
  }), [e, r]);
  return /* @__PURE__ */ c(Je.Provider, { value: s, children: t });
}
function Ce() {
  return Ge(Je) || Yt;
}
function Ut(e, t, r) {
  var n;
  const s = (n = e == null ? void 0 : e.progress) == null ? void 0 : n.createStore;
  if (typeof s != "function" || !t || !r) return null;
  try {
    return s({
      activityKey: t,
      activityVersion: r,
      storage: typeof globalThis.window < "u" ? globalThis.window.localStorage : void 0
    });
  } catch {
    return null;
  }
}
function Vt(e, t = {}, r = {}, s = {}) {
  var i, m;
  if (!((i = e == null ? void 0 : e.isDirty) != null && i.call(e)))
    return { responses: t, checked: r, results: s };
  const n = ((m = e.load) == null ? void 0 : m.call(e)) || {}, a = n.responses && typeof n.responses == "object" && !Array.isArray(n.responses) ? { ...t, ...n.responses } : t, l = n.checked && typeof n.checked == "object" && !Array.isArray(n.checked) ? { ...r, ...n.checked } : r, o = n.results && typeof n.results == "object" && !Array.isArray(n.results) ? { ...s, ...n.results } : s;
  return { responses: a, checked: l, results: o };
}
const Gt = ["neutral", "correct", "incorrect", "informative", "hint"], zt = {
  neutral: { tone: "info", label: "Feedback" },
  correct: { tone: "success", label: "Correct" },
  incorrect: { tone: "error", label: "Incorrect" },
  informative: { tone: "info", label: "Information" },
  hint: { tone: "warning", label: "Hint" }
};
function Ne({
  state: e = "neutral",
  title: t,
  message: r
}) {
  const s = Gt.includes(e) ? e : "neutral", n = zt[s];
  return !r && !t ? null : /* @__PURE__ */ c("div", { className: "lp-feedback", "data-lp-feedback-state": s, "data-lp-feedback": !0, children: /* @__PURE__ */ c(Tt, { tone: n.tone, title: t || n.label, message: r }) });
}
const Fe = "Your answer could not be checked. Please try again.", Wt = "Your response has been recorded for review.";
function ge(e) {
  return typeof e == "function";
}
function De(e) {
  if (e && typeof e == "object" && "learnerMessage" in e) {
    const t = String(e.learnerMessage || "").trim();
    if (t) return t;
  }
  return Fe;
}
function Qe() {
  return async () => {
    throw Object.assign(new Error(Fe), {
      code: "MARKING_UNAVAILABLE",
      learnerMessage: Fe
    });
  };
}
function ke(e) {
  return !e.checked || e.serverCanRetry === !1 ? !1 : e.serverCanRetry === !0 ? !0 : e.localRetry && (typeof e.localMaxAttempts != "number" || e.attempts < e.localMaxAttempts);
}
function Ee(e, t, r) {
  return !!(e && t && !ge(r));
}
function xe(e, t, r = "Your response has been recorded.") {
  return e.requiresReview || e.status === "review" ? {
    status: "informative",
    message: Wt,
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
    message: r,
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
const Ie = "Your answer was recorded.";
function Pe(e) {
  if (!e.checked || !e.hasResponse) return null;
  const t = xe(
    { completed: !0, correct: e.correct ?? null },
    e.feedback,
    e.recordedMessage || Ie
  );
  return {
    status: t.status,
    message: t.message,
    serverCorrect: t.correct
  };
}
function _e(e, t, r) {
  return {
    completed: e.completed,
    correct: e.correct,
    score: e.score,
    attempts: t,
    responses: r,
    requiresReview: e.requiresReview,
    status: e.requiresReview ? "review" : e.correct === !0 ? "correct" : e.correct === !1 ? "incorrect" : "recorded",
    itemResults: e.itemResults,
    canRetry: e.canRetry,
    checkNumber: e.checkNumber,
    remainingAttempts: e.remainingAttempts
  };
}
async function qe(e, t, r, s = "Your response has been recorded.") {
  try {
    return {
      ok: !0,
      marked: xe(await e(t), r, s)
    };
  } catch (n) {
    return { ok: !1, message: De(n) };
  }
}
const Xt = /^(correctOptionId|correctCategoryId|correctValues|answerKey|markScheme|modelAnswer|correctOptions|correctOrder|spec)$/;
function je(e) {
  if (Array.isArray(e)) return e.map(je);
  if (!e || typeof e != "object") return e;
  const t = {};
  for (const [r, s] of Object.entries(e))
    Xt.test(r) || r === "correct" && s && typeof s == "object" || (t[r] = je(s));
  return t;
}
function Zt(e) {
  return je(e);
}
function Jt(e, t) {
  if (!e || typeof e != "object") return;
  const r = e.marking;
  if (!r || typeof r.markBlock != "function")
    return Qe();
  const s = r.markBlock;
  return (n) => s({
    activityKey: t.id,
    activityVersion: n.activityVersion,
    block: Zt(n.block),
    responses: n.responses,
    sourcePage: typeof window < "u" ? window.location.pathname : void 0
  });
}
function Qt(e) {
  let t = 2166136261;
  for (let r = 0; r < e.length; r += 1)
    t ^= e.charCodeAt(r), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function er(e) {
  let t = Qt(e) || 1;
  return () => {
    t |= 0, t = t + 1831565813 | 0;
    let r = Math.imul(t ^ t >>> 15, 1 | t);
    return r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r, ((r ^ r >>> 14) >>> 0) / 4294967296;
  };
}
function tr(e, t) {
  const r = e.slice();
  if (r.length < 2) return r;
  const s = er(t);
  for (let n = r.length - 1; n > 0; n -= 1) {
    const a = Math.floor(s() * (n + 1)), l = r[n];
    r[n] = r[a], r[a] = l;
  }
  return r;
}
function et(e) {
  const t = [
    e.activityId,
    e.activityVersion,
    e.questionId,
    e.blockId,
    e.shuffleSalt
  ].map((r) => r == null ? "" : String(r).trim()).filter(Boolean);
  return t.length ? t.join("|") : "default";
}
function Me(e, t, r = "default") {
  return !t || e.length < 2 ? e.slice() : tr(e, r);
}
function $e(e) {
  const t = Ce(), r = !!(e.initialChecked && e.hasResponse), s = Pe({
    checked: r,
    hasResponse: e.hasResponse,
    correct: e.initialCorrect,
    feedback: e.feedback,
    recordedMessage: Ie
  }), n = be("idle"), [a, l] = M((s == null ? void 0 : s.status) || "neutral"), [o, i] = M((s == null ? void 0 : s.message) || ""), [m, u] = M((s == null ? void 0 : s.serverCorrect) ?? null), [y, f] = M(e.initialCanRetry);
  return ye(() => {
    if (t.isDirty() || n.current === "live") return;
    if (!e.initialChecked || !e.hasResponse) {
      n.current = "idle", l("neutral"), i(""), u(null);
      return;
    }
    if (n.current === "retry") return;
    const h = Pe({
      checked: !0,
      hasResponse: !0,
      correct: e.initialCorrect,
      feedback: e.feedback,
      recordedMessage: Ie
    });
    h && (l(h.status), i(h.message), u(h.serverCorrect), typeof e.initialCanRetry == "boolean" && f(e.initialCanRetry), (h.status === "correct" || h.status === "incorrect" || h.status === "informative") && (n.current = "restored"));
  }, [
    e.feedback,
    e.hasResponse,
    e.initialCanRetry,
    e.initialChecked,
    e.initialCorrect,
    t
  ]), {
    status: a,
    message: o,
    serverCorrect: m,
    serverCanRetry: y,
    setStatus: l,
    setMessage: i,
    setServerCorrect: u,
    setServerCanRetry: f,
    markLive: () => {
      n.current = "live";
    },
    markRetry: () => {
      n.current = "retry";
    }
  };
}
function Re(e) {
  return e == null ? !1 : typeof e == "string" || Array.isArray(e) ? e.length > 0 : typeof e == "object" ? Object.keys(e).length > 0 : !0;
}
function Ye(e, t) {
  const r = Ce(), [s, n] = M(Re(e) ? e : t), a = be(Re(e)), l = be(s);
  l.current = s, ye(() => {
    if (!r.isDirty()) {
      if (Re(e)) {
        a.current = !0, n(e);
        return;
      }
      a.current && (a.current = !1, n(t));
    }
  }, [t, e, r]);
  const o = Ae((i) => {
    const m = l.current, u = typeof i == "function" ? i(m) : i;
    r.recordResponse(u), l.current = u, n(u);
  }, [r]);
  return [s, o];
}
function Se(e, t) {
  const r = Ce(), [s, n] = M(!!(e && t));
  return ye(() => {
    if (!r.isDirty()) {
      if (e && t) {
        n(!0);
        return;
      }
      (e === !1 || !t) && n(!1);
    }
  }, [t, e, r]), [s, n];
}
function we(e) {
  return e.label || e.text || e.id;
}
function rr(e, t, r, s, n, a, l, o) {
  if (!r) return "Placed";
  if (a) {
    const i = l == null ? void 0 : l.find((m) => m.itemId === e);
    return (i == null ? void 0 : i.correct) === !0 ? "Correct" : (i == null ? void 0 : i.correct) === !1 ? "Incorrect" : o || i != null && i.requiresReview ? "Recorded" : "Placed";
  }
  return s ? n[e] === t ? "Correct" : "Incorrect" : "Placed";
}
function nr({
  id: e = "classification",
  title: t,
  prompt: r,
  instructions: s,
  items: n,
  categories: a,
  feedback: l,
  formative: o = !0,
  retry: i = !0,
  shuffle: m = !1,
  shuffleSeed: u,
  maxAttempts: y,
  initialAssignments: f = {},
  initialChecked: h = !1,
  initialCorrect: C,
  initialCanRetry: I,
  onMarkResponse: E,
  onResult: g
}) {
  const v = pe(
    () => Me(n, m, u || e),
    [n, m, u, e]
  ), [S, T] = Ye(f, {}), [F, q] = M(null), [te, z] = M(0), ce = n.length > 0 && n.every((p) => f[p.id]), [$, O] = Se(h, ce), [L, D] = M(!1), Q = n.length > 0 && n.every((p) => S[p.id]), {
    status: Y,
    message: se,
    serverCanRetry: j,
    setStatus: U,
    setMessage: H,
    setServerCorrect: J,
    setServerCanRetry: R,
    markLive: W,
    markRetry: K
  } = $e({
    initialChecked: h,
    hasResponse: Q,
    initialCorrect: C,
    initialCanRetry: I,
    feedback: l
  }), [X, V] = M(), [ie, G] = M(!1), ee = Object.fromEntries(
    n.filter((p) => p.correctCategoryId).map((p) => [p.id, p.correctCategoryId])
  ), re = ge(E), N = Ee(o, Object.keys(ee).length > 0, E), B = $ || L, b = ke({
    checked: $,
    localRetry: i,
    localMaxAttempts: y,
    attempts: te,
    serverCanRetry: j
  }), x = v.filter((p) => !S[p.id]), k = v.find((p) => p.id === F);
  function Z(p) {
    g == null || g(p);
  }
  function de(p, P) {
    T((A) => ({ ...A, [p]: P })), q(null);
  }
  function _(p) {
    q((P) => P === p ? null : p);
  }
  function ae(p) {
    F && de(F, p);
  }
  function w(p) {
    T((P) => {
      const A = { ...P };
      return delete A[p], A;
    }), q(null);
  }
  async function le() {
    if (L) return;
    if (!n.every((oe) => S[oe.id])) {
      U("informative"), H("Place every item in a category before checking.");
      return;
    }
    const P = te + 1, A = { ...S };
    if (re && E) {
      D(!0), U("informative"), H("Checking your answer…");
      try {
        const oe = xe(
          await E(A),
          l,
          "Your categories have been recorded."
        );
        W(), z(P), O(!0), V(oe.itemResults), G(oe.requiresReview), J(oe.correct), R(oe.canRetry), U(oe.status), H(oe.message), Z(_e(oe, P, A));
      } catch (oe) {
        O(!1), V(void 0), G(!1), J(null), R(!1), U("informative"), H(De(oe)), Z({
          completed: !1,
          correct: null,
          attempts: P,
          responses: A,
          status: "error"
        });
      } finally {
        D(!1);
      }
      return;
    }
    const ue = N ? n.filter((oe) => S[oe.id] === ee[oe.id]).length : 0, he = N ? ue === n.length : null;
    W(), z(P), O(!0), V(void 0), G(!1), J(null), U(he === !0 ? "correct" : he === !1 ? "incorrect" : "informative"), H(N ? he ? (l == null ? void 0 : l.correct) || "Those items match the expected categories." : (l == null ? void 0 : l.incorrect) || "Check the categories and try again." : "Your categories have been recorded."), Z({
      completed: !0,
      correct: he,
      score: N ? { correct: ue, total: n.length } : void 0,
      attempts: P,
      responses: A
    });
  }
  function ne() {
    K(), T({}), q(null), O(!1), D(!1), V(void 0), G(!1), J(null), R(void 0), U("neutral"), H(""), Z({ completed: !1, correct: null, attempts: te, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "classification",
      "data-lp-block-id": e,
      "aria-busy": L || void 0,
      children: [
        t ? /* @__PURE__ */ c("h3", { children: t }) : null,
        s ? /* @__PURE__ */ c("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ c("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: k ? `Selected: ${we(k)}. Choose a category.` : "Select an item, then select a category. More than one item can share a category." }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: B, children: [
          /* @__PURE__ */ c("legend", { children: r }),
          /* @__PURE__ */ c("p", { className: "lp-card__meta", children: "Items" }),
          /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
            x.map((p) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": F === p.id,
                onClick: () => _(p.id),
                children: [
                  we(p),
                  F === p.id ? " (selected)" : ""
                ]
              },
              p.id
            )),
            x.length === 0 ? /* @__PURE__ */ c("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] }),
          /* @__PURE__ */ c("div", { className: "lp-card-grid", children: a.map((p) => {
            const P = v.filter((A) => S[A.id] === p.id);
            return /* @__PURE__ */ d("div", { className: "lp-card", children: [
              /* @__PURE__ */ c("p", { children: /* @__PURE__ */ c("strong", { children: p.label }) }),
              /* @__PURE__ */ c("ul", { className: "lp-activity-list", children: P.map((A) => {
                const ue = rr(
                  A.id,
                  p.id,
                  $,
                  N,
                  ee,
                  re,
                  X,
                  ie
                );
                return /* @__PURE__ */ c("li", { children: /* @__PURE__ */ d(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    onClick: () => w(A.id),
                    children: [
                      we(A),
                      " · ",
                      ue,
                      B ? "" : " · Return"
                    ]
                  }
                ) }, A.id);
              }) }),
              P.length === 0 ? /* @__PURE__ */ c("p", { className: "lp-card__meta", children: "No items yet" }) : null,
              /* @__PURE__ */ d(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  disabled: !F,
                  onClick: () => ae(p.id),
                  children: [
                    "Place in ",
                    we(p)
                  ]
                }
              )
            ] }, p.id);
          }) }),
          /* @__PURE__ */ d("details", { children: [
            /* @__PURE__ */ c("summary", { children: "Use dropdown lists instead" }),
            v.map((p) => /* @__PURE__ */ d("p", { className: "lp-form__field", children: [
              /* @__PURE__ */ c("label", { htmlFor: `${e}-${p.id}`, children: we(p) }),
              /* @__PURE__ */ d(
                "select",
                {
                  id: `${e}-${p.id}`,
                  "data-lp-item": p.id,
                  value: S[p.id] || "",
                  disabled: B,
                  onChange: (P) => {
                    const A = P.target.value;
                    T((ue) => {
                      const he = { ...ue };
                      return A ? he[p.id] = A : delete he[p.id], he;
                    }), q(null);
                  },
                  children: [
                    /* @__PURE__ */ c("option", { value: "", children: "Select a category" }),
                    a.map((P) => /* @__PURE__ */ c("option", { value: P.id, children: P.label }, P.id))
                  ]
                }
              )
            ] }, `list-${p.id}`))
          ] })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ c("button", { type: "button", className: "lp-button", onClick: () => void le(), disabled: B, children: L ? "Checking…" : "Check types" }),
          b ? /* @__PURE__ */ c("button", { type: "button", className: "lp-button lp-button--secondary", onClick: ne, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ c(Ne, { state: Y, message: se })
      ]
    }
  );
}
function Ke(e) {
  return !!(e && Object.keys(e).length);
}
function cr(e, t, r) {
  const s = { ...e }, n = Object.keys(s).find((a) => s[a] === r);
  return n && delete s[n], s[t] = r, s;
}
function tt(e = {}) {
  const t = Ce(), [r, s] = M({ ...e }), [n, a] = M(null), l = be(Ke(e));
  ye(() => {
    if (!t.isDirty()) {
      if (Ke(e)) {
        l.current = !0, s({ ...e });
        return;
      }
      l.current && (l.current = !1, s({}), a(null));
    }
  }, [e, t]);
  const o = Ae((y, f = r) => Object.keys(f).find((h) => f[h] === y) || null, [r]), i = Ae((y) => {
    a((f) => f === y ? null : y);
  }, []), m = Ae((y) => {
    if (!n) {
      const C = o(y);
      C && a(C);
      return;
    }
    const h = cr(r, n, y);
    s(h), t.recordResponse(h), a(null);
  }, [o, r, t, n]), u = Ae(() => {
    s({}), a(null), t.recordResponse({});
  }, [t]);
  return { placements: r, selectedItemId: n, selectItem: i, selectTarget: m, occupantOf: o, reset: u };
}
function sr({
  id: e = "drag-drop",
  title: t,
  prompt: r,
  instructions: s,
  items: n,
  targets: a,
  correct: l = {},
  feedback: o,
  formative: i = !0,
  retry: m = !0,
  shuffle: u = !1,
  shuffleSeed: y,
  maxAttempts: f,
  initialPlacements: h = {},
  initialChecked: C = !1,
  initialCorrect: I,
  initialCanRetry: E,
  onMarkResponse: g,
  onResult: v
}) {
  var de;
  const S = pe(
    () => Me(n, u, y || e),
    [n, u, y, e]
  ), { placements: T, selectedItemId: F, selectItem: q, selectTarget: te, occupantOf: z, reset: ce } = tt(h), [$, O] = M(0), L = n.length > 0 && n.every((_) => h[_.id]), [D, Q] = Se(C, L), [Y, se] = M(!1), j = n.length > 0 && n.every((_) => T[_.id]), {
    status: U,
    message: H,
    serverCanRetry: J,
    setStatus: R,
    setMessage: W,
    setServerCorrect: K,
    setServerCanRetry: X,
    markLive: V,
    markRetry: ie
  } = $e({
    initialChecked: C,
    hasResponse: j,
    initialCorrect: I,
    initialCanRetry: E,
    feedback: o
  }), G = ge(g), ee = Ee(i, Object.keys(l).length > 0, g), re = D || Y, N = ke({
    checked: D,
    localRetry: m,
    localMaxAttempts: f,
    attempts: $,
    serverCanRetry: J
  }), B = S.filter((_) => !T[_.id]), b = (de = S.find((_) => _.id === F)) == null ? void 0 : de.label;
  function x(_) {
    v == null || v(_);
  }
  async function k() {
    if (Y) return;
    if (!n.every((p) => T[p.id])) {
      R("informative"), W("Place every item before checking.");
      return;
    }
    const ae = $ + 1, w = { ...T };
    if (G && g) {
      se(!0), R("informative"), W("Checking your answer…");
      const p = await qe(
        g,
        w,
        o,
        "Your placements have been recorded."
      );
      if (se(!1), !p.ok) {
        Q(!1), K(null), X(!1), R("informative"), W(p.message), x({ completed: !1, correct: null, attempts: ae, responses: w, status: "error" });
        return;
      }
      V(), O(ae), Q(!0), K(p.marked.correct), X(p.marked.canRetry), R(p.marked.status), W(p.marked.message), x(_e(p.marked, ae, w));
      return;
    }
    const le = ee ? n.filter((p) => T[p.id] === l[p.id]).length : 0, ne = ee ? le === n.length : null;
    V(), O(ae), Q(!0), K(null), R(ne === !0 ? "correct" : ne === !1 ? "incorrect" : "informative"), W(ee ? ne ? (o == null ? void 0 : o.correct) || "Those placements match the expected targets." : (o == null ? void 0 : o.incorrect) || "Check the targets and try again." : "Your placements have been recorded."), x({
      completed: !0,
      correct: ne,
      score: ee ? { correct: le, total: n.length } : void 0,
      attempts: ae,
      responses: w
    });
  }
  function Z() {
    ie(), ce(), Q(!1), se(!1), K(null), X(void 0), R("neutral"), W(""), x({ completed: !1, correct: null, attempts: $, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "drag-drop",
      "data-lp-block-id": e,
      "aria-busy": Y || void 0,
      children: [
        t ? /* @__PURE__ */ c("h3", { children: t }) : null,
        s ? /* @__PURE__ */ c("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ c("p", { children: r }),
        /* @__PURE__ */ c("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: b ? `Selected: ${b}. Choose a target.` : "Select an item, then select a target to place it." }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: re, children: [
          /* @__PURE__ */ c("legend", { children: "Items" }),
          /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
            B.map((_) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: "lp-button lp-button--secondary",
                "aria-pressed": F === _.id,
                onClick: () => q(_.id),
                children: [
                  _.label,
                  F === _.id ? " (selected)" : ""
                ]
              },
              _.id
            )),
            B.length === 0 ? /* @__PURE__ */ c("p", { className: "lp-card__meta", children: "All items placed." }) : null
          ] })
        ] }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: re, children: [
          /* @__PURE__ */ c("legend", { children: "Targets" }),
          /* @__PURE__ */ c("div", { className: "lp-card-grid", children: a.map((_) => {
            const ae = z(_.id), w = n.find((ne) => ne.id === ae), le = D && ee && ae && !G ? l[ae] === _.id ? "Correct" : "Incorrect" : w ? "Placed" : "Empty";
            return /* @__PURE__ */ d("div", { className: "lp-card", children: [
              /* @__PURE__ */ c("p", { children: /* @__PURE__ */ c("strong", { children: _.label }) }),
              /* @__PURE__ */ d("p", { className: "lp-card__meta", children: [
                w ? w.label : "No item yet",
                " · ",
                le
              ] }),
              /* @__PURE__ */ c(
                "button",
                {
                  type: "button",
                  className: "lp-button",
                  onClick: () => te(_.id),
                  children: w ? `Place on ${_.label} (replace ${w.label})` : `Place on ${_.label}`
                }
              )
            ] }, _.id);
          }) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ c("button", { type: "button", className: "lp-button", onClick: () => void k(), disabled: re, children: Y ? "Checking…" : "Check placement" }),
          N ? /* @__PURE__ */ c("button", { type: "button", className: "lp-button lp-button--secondary", onClick: Z, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ c(Ne, { state: U, message: H })
      ]
    }
  );
}
function ar({
  id: e = "option-cards",
  title: t,
  prompt: r,
  instructions: s,
  options: n,
  correctOptionId: a,
  feedback: l,
  formative: o = !0,
  retry: i = !0,
  shuffle: m = !1,
  shuffleSeed: u,
  maxAttempts: y,
  initialSelectedId: f,
  initialChecked: h = !1,
  initialCorrect: C,
  initialCanRetry: I,
  onMarkResponse: E,
  onResult: g
}) {
  const v = pe(
    () => Me(n, m, u || e),
    [n, m, u, e]
  ), S = Ce(), [T, F] = Ye(f || null, null), [q, te] = M(0), [z, ce] = Se(h, !!f), [$, O] = M(!1), L = Pe({
    checked: !!(h && f),
    hasResponse: !!f,
    correct: C,
    feedback: l,
    recordedMessage: Ie
  }), D = be("idle"), [Q, Y] = M((L == null ? void 0 : L.status) || "neutral"), [se, j] = M((L == null ? void 0 : L.message) || ""), [U, H] = M((L == null ? void 0 : L.serverCorrect) ?? null), [J, R] = M(I);
  ye(() => {
    if (S.isDirty() || D.current === "live") return;
    if (!h || !T) {
      D.current = "idle", Y("neutral"), j(""), H(null);
      return;
    }
    if (D.current === "retry") return;
    const N = Pe({
      checked: !0,
      hasResponse: !0,
      correct: C,
      feedback: l,
      recordedMessage: Ie
    });
    N && (Y(N.status), j(N.message), H(N.serverCorrect), typeof I == "boolean" && R(I), (N.status === "correct" || N.status === "incorrect") && (D.current = "restored"));
  }, [l, I, h, C, S, T]);
  const W = ge(E), K = Ee(o, !!a, E), X = `lp-option-cards-${e}`, V = z || $, ie = ke({
    checked: z,
    localRetry: i,
    localMaxAttempts: y,
    attempts: q,
    serverCanRetry: J
  });
  function G(N) {
    g == null || g(N);
  }
  async function ee() {
    if ($) return;
    if (!T) {
      Y("informative"), j("Choose an option before checking.");
      return;
    }
    const N = q + 1, B = { optionId: T };
    if (W && E) {
      D.current = "live", O(!0), Y("informative"), j("Checking your answer…");
      try {
        const k = xe(await E(B), l, "Your choice has been recorded.");
        D.current = "live", te(N), ce(!0), H(k.correct), R(k.canRetry), Y(k.status), j(k.message), G(_e(k, N, B));
      } catch (k) {
        D.current = "idle", ce(!1), H(null), R(!1), Y("informative"), j(De(k)), G({
          completed: !1,
          correct: null,
          attempts: N,
          responses: B,
          status: "error"
        });
      } finally {
        O(!1);
      }
      return;
    }
    const b = K ? T === a : null, x = K ? b ? (l == null ? void 0 : l.correct) || "That matches the expected option." : (l == null ? void 0 : l.incorrect) || "Check the options and try again." : "Your choice has been recorded.";
    te(N), ce(!0), D.current = "live", H(null), Y(b === !0 ? "correct" : b === !1 ? "incorrect" : "informative"), j(x), G({
      completed: !0,
      correct: b,
      score: K ? { correct: b ? 1 : 0, total: 1 } : void 0,
      attempts: N,
      responses: B
    });
  }
  function re() {
    D.current = "retry", F(null), ce(!1), O(!1), H(null), R(void 0), Y("neutral"), j(""), G({
      completed: !1,
      correct: null,
      attempts: q,
      responses: { optionId: null }
    });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "option-cards",
      "data-lp-block-id": e,
      "aria-busy": $ || void 0,
      children: [
        t ? /* @__PURE__ */ c("h3", { children: t }) : null,
        s ? /* @__PURE__ */ c("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: V, children: [
          /* @__PURE__ */ c("legend", { children: r }),
          /* @__PURE__ */ c("div", { className: "lp-card-grid", children: v.map((N) => {
            const B = T === N.id, Z = z && K && B || z && W && B && U !== null ? (W ? U === !0 : N.id === a) ? "Correct" : "Incorrect" : B ? "Selected" : "";
            return /* @__PURE__ */ d("label", { className: "lp-card lp-activity-card", children: [
              /* @__PURE__ */ c(
                "input",
                {
                  type: "radio",
                  name: X,
                  value: N.id,
                  checked: B,
                  "data-lp-response": "",
                  onChange: () => F(N.id)
                }
              ),
              /* @__PURE__ */ d("span", { children: [
                /* @__PURE__ */ c("strong", { children: N.label }),
                N.description ? /* @__PURE__ */ d("span", { className: "lp-card__meta", children: [
                  " — ",
                  N.description
                ] }) : null
              ] }),
              N.imageSrc ? /* @__PURE__ */ c("img", { src: N.imageSrc, alt: N.imageAlt || N.label }) : null,
              Z ? /* @__PURE__ */ c("p", { className: "lp-card__meta", children: Z }) : null
            ] }, N.id);
          }) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ c("button", { type: "button", className: "lp-button", onClick: () => void ee(), disabled: V, children: $ ? "Checking…" : "Check answer" }),
          ie ? /* @__PURE__ */ c("button", { type: "button", className: "lp-button lp-button--secondary", onClick: re, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ c(Ne, { state: Q, message: se })
      ]
    }
  );
}
function lr(e, t) {
  var o;
  const r = [], s = /\{([A-Za-z0-9_-]+)\}|_{3,}/g;
  let n = 0, a = 0, l;
  for (; (l = s.exec(e)) !== null; ) {
    l.index > n && r.push(e.slice(n, l.index));
    const i = l[1] || ((o = t[a]) == null ? void 0 : o.id) || `gap-${a + 1}`;
    a += 1, r.push({ gapId: i }), n = l.index + l[0].length;
  }
  return n < e.length && r.push(e.slice(n)), !r.some((i) => typeof i != "string") && t[0] && (r.push(" "), r.push({ gapId: t[0].id })), r;
}
function or(e, t, r) {
  if (!e || !Object.keys(e).length) return {};
  const s = new Set(t.map((o) => o.id)), n = new Set(r.map((o) => o.id)), a = Object.keys(e), l = Object.values(e).map(String);
  if (a.every((o) => n.has(o)) && l.every((o) => s.has(o)))
    return { ...e };
  if (a.every((o) => s.has(o)) && l.every((o) => n.has(o))) {
    const o = {};
    for (const [i, m] of Object.entries(e))
      o[String(m)] = i;
    return o;
  }
  return { ...e };
}
function ir({
  id: e = "phrase-completion",
  title: t,
  prompt: r,
  instructions: s,
  gaps: n,
  options: a,
  correctOptionId: l,
  feedback: o,
  formative: i = !0,
  retry: m = !0,
  shuffle: u = !1,
  shuffleSeed: y,
  maxAttempts: f,
  initialPlacements: h = {},
  initialChecked: C = !1,
  initialCorrect: I,
  initialCanRetry: E,
  onMarkResponse: g,
  onResult: v
}) {
  var ae;
  const S = pe(() => n && n.length ? n : [{ id: "gap", label: "missing term", correctOptionId: l || void 0 }], [l, n]), T = pe(
    () => Me(a, u, y || e),
    [a, u, y, e]
  ), F = pe(() => lr(r, S), [r, S]), q = pe(
    () => or(h, S, a),
    [h, a, S]
  ), { placements: te, selectedItemId: z, selectItem: ce, selectTarget: $, occupantOf: O, reset: L } = tt(q), [D, Q] = M(0), [Y, se] = Se(C, Object.keys(q).length > 0), [j, U] = M(!1), H = S.length > 0 && S.every((w) => !!O(w.id)), {
    status: J,
    message: R,
    serverCanRetry: W,
    setStatus: K,
    setMessage: X,
    setServerCorrect: V,
    setServerCanRetry: ie,
    markLive: G,
    markRetry: ee
  } = $e({
    initialChecked: C,
    hasResponse: H,
    initialCorrect: I,
    initialCanRetry: E,
    feedback: o
  }), re = Object.fromEntries(
    S.map((w) => [w.id, w.correctOptionId]).filter((w) => w[1])
  ), N = Ee(i, Object.keys(re).length > 0, g), B = Y || j, b = ke({
    checked: Y,
    localRetry: m,
    localMaxAttempts: f,
    attempts: D,
    serverCanRetry: W
  }), x = T.filter((w) => !te[w.id]), k = (ae = a.find((w) => w.id === z)) == null ? void 0 : ae.label;
  function Z(w) {
    v == null || v(w);
  }
  async function de() {
    if (j) return;
    if (!S.every((A) => O(A.id))) {
      K("informative"), X("Fill every blank before checking.");
      return;
    }
    const le = D + 1, ne = {};
    if (S.forEach((A) => {
      const ue = O(A.id);
      ue && (ne[A.id] = ue);
    }), ge(g) && g) {
      U(!0), K("informative"), X("Checking your answer…");
      const A = await qe(
        g,
        ne,
        o,
        "Your phrase has been recorded."
      );
      if (U(!1), !A.ok) {
        se(!1), V(null), ie(!1), K("informative"), X(A.message), Z({ completed: !1, correct: null, attempts: le, responses: ne, status: "error" });
        return;
      }
      G(), Q(le), se(!0), V(A.marked.correct), ie(A.marked.canRetry), K(A.marked.status), X(A.marked.message), Z(_e(A.marked, le, ne));
      return;
    }
    const p = N ? S.filter((A) => ne[A.id] === re[A.id]).length : 0, P = N ? p === S.length : null;
    G(), Q(le), se(!0), V(null), K(P === !0 ? "correct" : P === !1 ? "incorrect" : "informative"), X(N ? P ? (o == null ? void 0 : o.correct) || "That completes the phrase." : (o == null ? void 0 : o.incorrect) || "Check the missing words and try again." : "Your phrase has been recorded."), Z({
      completed: !0,
      correct: P,
      score: N ? { correct: p, total: S.length } : void 0,
      attempts: le,
      responses: ne
    });
  }
  function _() {
    ee(), L(), se(!1), U(!1), V(null), ie(void 0), K("neutral"), X(""), Z({ completed: !1, correct: null, attempts: D, responses: {} });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "fill-gap",
      "data-lp-block-id": e,
      "aria-busy": j || void 0,
      children: [
        t ? /* @__PURE__ */ c("h3", { children: t }) : null,
        s ? /* @__PURE__ */ c("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ c("p", { role: "status", "aria-live": "polite", className: "lp-card__meta", children: k ? `Selected: ${k}. Choose a blank.` : "Select a phrase, then select the blank." }),
        /* @__PURE__ */ c("p", { children: F.map((w, le) => {
          if (typeof w == "string") return /* @__PURE__ */ c("span", { children: w }, `text-${le}`);
          const ne = O(w.gapId), p = a.find((ue) => ue.id === ne), P = S.find((ue) => ue.id === w.gapId), A = Y && N && ne ? re[w.gapId] === ne ? "Correct" : "Incorrect" : p ? "Filled" : "Blank";
          return /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              disabled: B,
              "aria-label": `${(P == null ? void 0 : P.label) || "blank"}: ${(p == null ? void 0 : p.label) || "empty"}. ${A}`,
              onClick: () => $(w.gapId),
              children: (p == null ? void 0 : p.label) || "______"
            },
            w.gapId
          );
        }) }),
        /* @__PURE__ */ d("fieldset", { className: "lp-fieldset", disabled: B, children: [
          /* @__PURE__ */ c("legend", { children: "Available phrases" }),
          /* @__PURE__ */ c("div", { className: "lp-card__actions", children: x.map((w) => /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              className: "lp-button",
              "aria-pressed": z === w.id,
              onClick: () => ce(w.id),
              children: [
                w.label,
                z === w.id ? " (selected)" : ""
              ]
            },
            w.id
          )) })
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ c("button", { type: "button", className: "lp-button", onClick: () => void de(), disabled: B, children: j ? "Checking…" : "Check phrase" }),
          b ? /* @__PURE__ */ c("button", { type: "button", className: "lp-button lp-button--secondary", onClick: _, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ c(Ne, { state: J, message: R })
      ]
    }
  );
}
function dr({
  id: e = "sequence",
  title: t,
  prompt: r,
  instructions: s,
  items: n,
  correctOrder: a = [],
  feedback: l,
  formative: o = !0,
  retry: i = !0,
  shuffle: m = !1,
  shuffleSeed: u,
  maxAttempts: y,
  initialOrder: f,
  initialChecked: h = !1,
  initialCorrect: C,
  initialCanRetry: I,
  onMarkResponse: E,
  onResult: g
}) {
  const v = pe(
    () => Me(n, m, u || e),
    [n, m, u, e]
  ), S = pe(() => {
    if (!Array.isArray(f) || !f.length) return v;
    const b = new Map(n.map((k) => [k.id, k])), x = f.map((k) => b.get(k)).filter(Boolean);
    return x.length === n.length ? x : v;
  }, [v, f, n]), [T, F] = M(S), q = Ce();
  ye(() => {
    q.isDirty() || !Array.isArray(f) || !f.length || F(S);
  }, [f, q, S]);
  const [te, z] = M(0), [ce, $] = Se(h, !!(f != null && f.length)), [O, L] = M(!1), D = T.length > 0, {
    status: Q,
    message: Y,
    serverCanRetry: se,
    setStatus: j,
    setMessage: U,
    setServerCorrect: H,
    setServerCanRetry: J,
    markLive: R,
    markRetry: W
  } = $e({
    initialChecked: h,
    hasResponse: D,
    initialCorrect: C,
    initialCanRetry: I,
    feedback: l
  }), K = ge(E), X = Ee(o, a.length > 0, E), V = ce || O, ie = ke({
    checked: ce,
    localRetry: i,
    localMaxAttempts: y,
    attempts: te,
    serverCanRetry: se
  });
  function G(b) {
    g == null || g(b);
  }
  function ee(b, x) {
    const k = b + x;
    if (k < 0 || k >= T.length) return;
    const Z = T.slice(), [de] = Z.splice(b, 1);
    Z.splice(k, 0, de), F(Z), q.recordResponse(Z.map((_) => _.id));
  }
  function re(b, x) {
    V || (b.key === "ArrowUp" && (b.preventDefault(), ee(x, -1)), b.key === "ArrowDown" && (b.preventDefault(), ee(x, 1)));
  }
  async function N() {
    if (O) return;
    const b = te + 1, x = T.map((_) => _.id), k = { itemIds: x };
    if (K && E) {
      L(!0), j("informative"), U("Checking your answer…");
      const _ = await qe(
        E,
        k,
        l,
        "Your sequence has been recorded."
      );
      if (L(!1), !_.ok) {
        $(!1), H(null), J(!1), j("informative"), U(_.message), G({ completed: !1, correct: null, attempts: b, responses: k, status: "error" });
        return;
      }
      R(), z(b), $(!0), H(_.marked.correct), J(_.marked.canRetry), j(_.marked.status), U(_.marked.message), G(_e(_.marked, b, k));
      return;
    }
    const Z = X ? x.filter((_, ae) => _ === a[ae]).length : 0, de = X ? Z === a.length && x.length === a.length : null;
    R(), z(b), $(!0), H(null), j(de === !0 ? "correct" : de === !1 ? "incorrect" : "informative"), U(X ? de ? (l == null ? void 0 : l.correct) || "That order matches the expected sequence." : (l == null ? void 0 : l.incorrect) || "Check the sequence and try again." : "Your sequence has been recorded."), G({
      completed: !0,
      correct: de,
      score: X ? { correct: Z, total: a.length } : void 0,
      attempts: b,
      responses: k
    });
  }
  function B() {
    W(), F(v), $(!1), L(!1), H(null), J(void 0), j("neutral"), U(""), q.recordResponse(v.map((b) => b.id)), G({
      completed: !1,
      correct: null,
      attempts: te,
      responses: { itemIds: v.map((b) => b.id) }
    });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive",
      "data-lp-block": "ordering",
      "data-lp-block-id": e,
      "aria-busy": O || void 0,
      children: [
        t ? /* @__PURE__ */ c("h3", { children: t }) : null,
        s ? /* @__PURE__ */ c("p", { className: "lp-instructions", children: s }) : null,
        /* @__PURE__ */ c("p", { children: r }),
        /* @__PURE__ */ c("ol", { className: "lp-activity-list", children: T.map((b, x) => /* @__PURE__ */ d(
          "li",
          {
            className: "lp-card",
            tabIndex: V ? -1 : 0,
            "aria-label": `${b.label}, position ${x + 1} of ${T.length}`,
            onKeyDown: (k) => re(k, x),
            children: [
              /* @__PURE__ */ c("p", { children: /* @__PURE__ */ d("strong", { children: [
                x + 1,
                ". ",
                b.label
              ] }) }),
              /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
                /* @__PURE__ */ d(
                  "button",
                  {
                    type: "button",
                    className: "lp-button lp-button--secondary",
                    disabled: V || x === 0,
                    onClick: () => ee(x, -1),
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
                    disabled: V || x === T.length - 1,
                    onClick: () => ee(x, 1),
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
          /* @__PURE__ */ c("button", { type: "button", className: "lp-button", onClick: () => void N(), disabled: V, children: O ? "Checking…" : "Check order" }),
          ie ? /* @__PURE__ */ c("button", { type: "button", className: "lp-button lp-button--secondary", onClick: B, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ c(Ne, { state: Q, message: Y })
      ]
    }
  );
}
function me(e) {
  return String(e || "").trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}
function ur(e) {
  var t;
  return (e == null ? void 0 : e.formative) === !0 || ((t = e == null ? void 0 : e.marking) == null ? void 0 : t.mode) === "formative-local";
}
function pr(e) {
  return (e == null ? void 0 : e.retry) !== !1;
}
function mr(e) {
  if (!e || e.length !== 2) return !1;
  const t = e.map((r) => String(r.label || "").trim().toLowerCase()).sort();
  return t[0] === "false" && t[1] === "true";
}
function hr(e, t) {
  if ((e == null ? void 0 : e.shuffle) === !1 || (e == null ? void 0 : e.randomise) === !1 || me((t == null ? void 0 : t.presentation) ?? (e == null ? void 0 : e.presentation)) === "true-false") return !1;
  const s = (t == null ? void 0 : t.options) ?? (e == null ? void 0 : e.options);
  return !mr(s);
}
const fr = [
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
], He = 200, yr = 500;
function rt(e, t) {
  const r = Number((e == null ? void 0 : e.minChars) || (e == null ? void 0 : e.minimumCharacters) || 0);
  return r > 0 ? r : t;
}
function nt(e) {
  return fr.includes(me(e));
}
function fe(e) {
  var t;
  return ((t = e.content) == null ? void 0 : t.questionId) || e.id;
}
function gr({
  id: e,
  prompt: t,
  placeholder: r,
  value: s,
  defaultValue: n = "",
  minChars: a,
  minimumCharacters: l,
  defaultMinChars: o = He,
  rows: i = 4,
  disabled: m = !1,
  hidePrompt: u = !1,
  onChange: y
}) {
  const f = Le(), h = e || f, C = rt({ minChars: a, minimumCharacters: l }, o), I = typeof s == "string", [E, g] = M(String(n || "")), [v, S] = M(""), T = I ? s : E, F = T.trim().length, q = F >= C;
  function te($) {
    I || g($), y == null || y($);
  }
  function z($) {
    $.preventDefault(), S("Paste is disabled. Type your answer in your own words.");
  }
  function ce($) {
    $.preventDefault(), S("Dropping text is disabled. Type your answer in your own words.");
  }
  return /* @__PURE__ */ d("div", { className: "lp-form lp-learning-text-field", "data-lp-learning-text-field": "", children: [
    /* @__PURE__ */ d("label", { className: "lp-field", htmlFor: h, children: [
      u ? /* @__PURE__ */ c("span", { className: "lp-visually-hidden", children: t }) : /* @__PURE__ */ c("span", { className: "lp-field__label", children: t }),
      /* @__PURE__ */ c(
        "textarea",
        {
          id: h,
          className: "lp-textarea",
          "data-lp-response": "",
          "data-lp-min-chars": String(C),
          rows: i,
          value: T,
          placeholder: r,
          minLength: C,
          autoComplete: "off",
          disabled: m,
          "aria-describedby": `${h}-count ${h}-notice`,
          onChange: ($) => te($.target.value),
          onPaste: z,
          onDrop: ce
        }
      )
    ] }),
    /* @__PURE__ */ c(
      "p",
      {
        id: `${h}-count`,
        className: "lp-char-count",
        "data-lp-char-count": "",
        "data-lp-met": q ? "true" : "false",
        "aria-live": "polite",
        children: `${F} / ${C} characters minimum`
      }
    ),
    /* @__PURE__ */ c(
      "p",
      {
        id: `${h}-notice`,
        className: "lp-paste-notice",
        "data-lp-paste-notice": "",
        role: "status",
        children: v
      }
    )
  ] });
}
function vr(e, t) {
  return t > 0 ? `Write at least ${e} characters. You currently have ${t}.` : `Write at least ${e} characters before saving.`;
}
function ct({
  id: e = "text-response",
  blockType: t = "short-response",
  title: r,
  prompt: s,
  instructions: n,
  guidance: a,
  placeholder: l,
  minChars: o,
  minimumCharacters: i,
  defaultMinChars: m = He,
  rows: u = 4,
  feedback: y,
  retry: f = !0,
  maxAttempts: h,
  initialResponse: C = "",
  initialChecked: I = !1,
  initialCorrect: E,
  initialCanRetry: g,
  saveLabel: v = "Save response",
  onMarkResponse: S,
  onResult: T
}) {
  const F = rt({ minChars: o, minimumCharacters: i }, m), [q, te] = Ye(String(C || ""), ""), [z, ce] = M(0), [$, O] = Se(I, !!String(C || "").trim()), [L, D] = M(!1), Q = q.trim(), Y = Q.length, se = Y >= F, {
    status: j,
    message: U,
    serverCanRetry: H,
    setStatus: J,
    setMessage: R,
    setServerCorrect: W,
    setServerCanRetry: K,
    markLive: X,
    markRetry: V
  } = $e({
    initialChecked: I,
    hasResponse: !!Q,
    initialCorrect: E,
    initialCanRetry: g,
    feedback: y
  }), ie = ge(S), G = $ || L, ee = ke({
    checked: $,
    localRetry: f,
    localMaxAttempts: h,
    attempts: z,
    serverCanRetry: H
  });
  function re(b) {
    T == null || T(b);
  }
  async function N() {
    if (L) return;
    if (!se) {
      J("informative"), R(vr(F, Y));
      return;
    }
    const b = z + 1;
    if (ie && S) {
      D(!0), J("informative"), R("Saving your response…");
      try {
        const k = xe(
          await S(Q),
          y,
          a || "Your response has been recorded."
        );
        X(), ce(b), O(!0), W(k.correct), K(k.canRetry), J(k.status), R(k.requiresReview || k.correct !== null ? k.message : a || k.message), re(_e(k, b, Q));
      } catch (k) {
        O(!1), W(null), K(!1), J("informative"), R(De(k)), re({
          completed: !1,
          correct: null,
          attempts: b,
          responses: Q,
          status: "error"
        });
      } finally {
        D(!1);
      }
      return;
    }
    const x = a || (y == null ? void 0 : y.correct) || "Saved.";
    X(), ce(b), O(!0), W(null), J("informative"), R(x), re({
      completed: !0,
      correct: null,
      attempts: b,
      responses: Q
    });
  }
  function B() {
    V(), te(""), O(!1), D(!1), W(null), K(void 0), J("neutral"), R(""), re({
      completed: !1,
      correct: null,
      attempts: z,
      responses: ""
    });
  }
  return /* @__PURE__ */ d(
    "section",
    {
      className: "lp-block lp-block--interactive lp-form",
      "data-lp-block": t,
      "data-lp-block-id": e,
      "aria-busy": L || void 0,
      children: [
        r ? /* @__PURE__ */ c("h3", { children: r }) : null,
        n ? /* @__PURE__ */ c("p", { className: "lp-instructions", children: n }) : null,
        /* @__PURE__ */ c(
          gr,
          {
            id: `${e}-field`,
            prompt: s,
            placeholder: l,
            value: q,
            minChars: o,
            minimumCharacters: i,
            defaultMinChars: m,
            rows: u,
            disabled: G,
            onChange: te
          }
        ),
        /* @__PURE__ */ d("div", { className: "lp-card__actions", children: [
          /* @__PURE__ */ c("button", { type: "button", className: "lp-button", onClick: () => void N(), disabled: G, children: L ? "Saving…" : v }),
          ee ? /* @__PURE__ */ c("button", { type: "button", className: "lp-button lp-button--secondary", onClick: B, children: "Try again" }) : null
        ] }),
        /* @__PURE__ */ c(Ne, { state: j, message: U })
      ]
    }
  );
}
function br({
  rows: e = 4,
  ...t
}) {
  return /* @__PURE__ */ c(
    ct,
    {
      ...t,
      blockType: "short-response",
      defaultMinChars: He,
      rows: e
    }
  );
}
function Cr({
  rows: e = 6,
  ...t
}) {
  return /* @__PURE__ */ c(
    ct,
    {
      ...t,
      blockType: "reflection",
      defaultMinChars: yr,
      rows: e
    }
  );
}
function Nr(e, t) {
  const r = e.content || {}, s = me(r.presentation);
  return {
    id: e.id,
    instructions: r.instructions,
    feedback: r.feedback,
    formative: ur(r),
    retry: pr(r),
    shuffle: hr(r, { presentation: s, options: r.options }),
    shuffleSeed: t,
    maxAttempts: r.maxAttempts
  };
}
function Ue(e) {
  return typeof e == "string" ? e : void 0;
}
function kr({
  block: e,
  shuffleSeed: t,
  initialResponse: r,
  initialChecked: s,
  initialResult: n,
  onMarkResponse: a,
  onResult: l
}) {
  const o = me(e.type), i = e.content || {}, m = me(i.presentation), u = Nr(
    e,
    t || et({ questionId: fe(e), blockId: e.id })
  ), y = (C) => l == null ? void 0 : l(C, e), f = fe(e), h = (() => {
    if (o === "single-choice" || o === "option-cards" || m === "option-cards" || m === "true-false" || m === "picture-quiz")
      return /* @__PURE__ */ c(
        ar,
        {
          ...u,
          prompt: i.prompt || "Choose an option",
          options: i.options || [],
          correctOptionId: i.correctOptionId,
          initialSelectedId: typeof r == "string" ? r : void 0,
          initialChecked: s,
          initialCorrect: n == null ? void 0 : n.correct,
          initialCanRetry: n == null ? void 0 : n.canRetry,
          onMarkResponse: a,
          onResult: y
        }
      );
    if (o === "classification") {
      const C = r && typeof r == "object" && !Array.isArray(r) ? r : void 0;
      return /* @__PURE__ */ c(
        nr,
        {
          ...u,
          prompt: i.prompt || "Classify each item",
          items: i.items || [],
          categories: i.categories || [],
          initialAssignments: C,
          initialChecked: s,
          initialCorrect: n == null ? void 0 : n.correct,
          initialCanRetry: n == null ? void 0 : n.canRetry,
          onMarkResponse: a,
          onResult: y
        }
      );
    }
    return o === "drag-drop" ? /* @__PURE__ */ c(
      sr,
      {
        ...u,
        prompt: i.prompt || "Place each item",
        items: i.items || [],
        targets: i.targets || [],
        correct: i.correct,
        initialPlacements: r && typeof r == "object" && !Array.isArray(r) ? r : void 0,
        initialChecked: s,
        initialCorrect: n == null ? void 0 : n.correct,
        initialCanRetry: n == null ? void 0 : n.canRetry,
        onMarkResponse: a,
        onResult: y
      }
    ) : o === "fill-gap" || o === "phrase-completion" ? /* @__PURE__ */ c(
      ir,
      {
        ...u,
        prompt: i.prompt || "Complete the phrase",
        gaps: i.gaps,
        options: i.options || [],
        correctOptionId: i.correctOptionId,
        initialPlacements: r && typeof r == "object" && !Array.isArray(r) ? r : void 0,
        initialChecked: s,
        initialCorrect: n == null ? void 0 : n.correct,
        initialCanRetry: n == null ? void 0 : n.canRetry,
        onMarkResponse: a,
        onResult: y
      }
    ) : o === "ordering" || o === "sequence" ? /* @__PURE__ */ c(
      dr,
      {
        ...u,
        prompt: i.prompt || "Put the items in order",
        items: i.items || [],
        correctOrder: i.correctOrder,
        initialOrder: Array.isArray(r) ? r : void 0,
        initialChecked: s,
        initialCorrect: n == null ? void 0 : n.correct,
        initialCanRetry: n == null ? void 0 : n.canRetry,
        onMarkResponse: a,
        onResult: y
      }
    ) : o === "short-response" ? /* @__PURE__ */ c(
      br,
      {
        id: u.id,
        prompt: i.prompt || "Write your response",
        instructions: u.instructions,
        guidance: i.guidance,
        placeholder: i.placeholder,
        minChars: i.minChars,
        minimumCharacters: i.minimumCharacters,
        feedback: u.feedback,
        retry: u.retry,
        maxAttempts: u.maxAttempts,
        initialResponse: Ue(r),
        initialChecked: s,
        initialCorrect: n == null ? void 0 : n.correct,
        initialCanRetry: n == null ? void 0 : n.canRetry,
        onMarkResponse: a,
        onResult: y
      }
    ) : o === "reflection" ? /* @__PURE__ */ c(
      Cr,
      {
        id: u.id,
        prompt: i.prompt || "Write your reflection",
        instructions: u.instructions,
        guidance: i.guidance,
        placeholder: i.placeholder,
        minChars: i.minChars,
        minimumCharacters: i.minimumCharacters,
        feedback: u.feedback,
        retry: u.retry,
        maxAttempts: u.maxAttempts,
        initialResponse: Ue(r),
        initialChecked: s,
        initialCorrect: n == null ? void 0 : n.correct,
        initialCanRetry: n == null ? void 0 : n.canRetry,
        onMarkResponse: a,
        onResult: y
      }
    ) : /* @__PURE__ */ d("p", { className: "lp-card__meta", "data-lp-block": o, children: [
      "This ",
      o || "unknown",
      " block is not part of the React activity catalogue yet."
    ] });
  })();
  return /* @__PURE__ */ c(Kt, { questionId: f, children: h });
}
function _r(e, t, r, s) {
  if (s === "local") return r;
  const n = r || Jt(e, t);
  return s === "server" && !n ? Qe() : n;
}
function Qr({
  activity: e,
  initialResponses: t = {},
  initialChecked: r = {},
  initialResults: s = {},
  renderFallback: n,
  platform: a,
  markingMode: l,
  shuffleSalt: o,
  onMarkResponse: i,
  onResult: m
}) {
  var E, g;
  const [u, y] = M(0), f = ut(e) || void 0, h = _r(a, e, i, l), C = pe(
    () => Ut(a, e.id, f),
    [e.id, f, a]
  ), I = Vt(C, t, r, s);
  return /* @__PURE__ */ c(Ht, { store: C, children: /* @__PURE__ */ d(
    "article",
    {
      className: "lp-activity panel",
      "data-lp-activity": e.id,
      "data-lp-activity-version": f,
      children: [
        (E = e.metadata) != null && E.title ? /* @__PURE__ */ c("h3", { children: e.metadata.title }) : null,
        (g = e.metadata) != null && g.summary ? /* @__PURE__ */ c("p", { children: e.metadata.summary }) : null,
        /* @__PURE__ */ c("div", { className: "lp-activity-list", children: (e.blocks || []).map((v) => {
          if (nt(v.type)) {
            const S = et({
              activityId: e.id,
              activityVersion: f,
              questionId: fe(v),
              blockId: v.id,
              shuffleSalt: o
            });
            return /* @__PURE__ */ c(
              kr,
              {
                block: v,
                shuffleSeed: S,
                initialResponse: I.responses[fe(v)],
                initialChecked: !!I.checked[fe(v)],
                initialResult: I.results[fe(v)] || s[fe(v)],
                onMarkResponse: h ? (T) => h({
                  activityId: e.id,
                  activityVersion: f || "",
                  block: v,
                  responses: T
                }) : void 0,
                onResult: m
              },
              v.id
            );
          }
          return n ? /* @__PURE__ */ c("div", { children: n(v) }, v.id) : /* @__PURE__ */ d("p", { className: "lp-card__meta", "data-lp-block": me(v.type), children: [
            "This ",
            me(v.type) || "unknown",
            " block is not part of the React activity catalogue yet."
          ] }, v.id);
        }) }, u),
        /* @__PURE__ */ d("div", { className: "lp-activity-actions", children: [
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "lp-button lp-button--secondary",
              "data-lp-reset-activity": e.id,
              onClick: () => y((v) => v + 1),
              children: "Reset activity"
            }
          ),
          /* @__PURE__ */ c("p", { className: "lp-activity-status", "data-lp-activity-status": !0, role: "status", "aria-live": "polite" })
        ] })
      ]
    }
  ) });
}
function Sr(e, t) {
  return typeof t == "number" && Number.isFinite(t) ? Math.min(1, Math.max(0, t)) : e && e.total > 0 ? Math.min(1, Math.max(0, e.correct / e.total)) : 0;
}
function st({
  title: e,
  badge: t,
  subtitle: r,
  score: s,
  progress: n,
  completed: a = !0,
  attempts: l,
  message: o,
  showStatus: i = !0,
  showDisclaimer: m = !0,
  collapsed: u = !1
}) {
  const y = t || r, f = Sr(s, n), h = Math.round(f * 100), C = a ? "Completed" : "In progress", I = s ? `${s.correct} / ${s.total}` : null, E = s ? `${s.correct} of ${s.total} correct` : null, g = typeof l == "number" ? `${l} ${l === 1 ? "attempt" : "attempts"}` : null;
  return /* @__PURE__ */ d(
    "div",
    {
      className: "lp-progress-summary",
      "data-lp-progress-summary": "",
      "data-lp-progress-collapsed": u ? "true" : "false",
      children: [
        e ? /* @__PURE__ */ c("p", { className: "lp-progress-summary__title", children: /* @__PURE__ */ c("strong", { children: e }) }) : null,
        i ? /* @__PURE__ */ c(Te, { status: a ? "completed" : "progress", label: C }) : null,
        I ? /* @__PURE__ */ c(
          "p",
          {
            className: "lp-progress-summary__score",
            "data-lp-progress-score": "",
            "aria-label": E || void 0,
            children: I
          }
        ) : null,
        E ? /* @__PURE__ */ c("p", { className: "lp-card__meta", children: E }) : null,
        !u && y ? /* @__PURE__ */ c("p", { className: "lp-progress-summary__badge", "data-lp-progress-badge": "", children: /* @__PURE__ */ c("strong", { children: y }) }) : null,
        u ? null : /* @__PURE__ */ d(ot, { children: [
          /* @__PURE__ */ c(
            "progress",
            {
              className: "lp-progress",
              max: 100,
              value: h,
              "aria-label": `${h}% complete`
            }
          ),
          /* @__PURE__ */ d("p", { className: "lp-card__meta", children: [
            h,
            "% complete"
          ] }),
          g ? /* @__PURE__ */ c("p", { children: g }) : null,
          o ? /* @__PURE__ */ c("p", { children: o }) : null,
          m ? /* @__PURE__ */ c("p", { className: "lp-card__meta", children: "This summary is practice feedback, not an official mark." }) : null
        ] })
      ]
    }
  );
}
function wr(e, t) {
  if (e)
    try {
      t && !e.open && (typeof e.showModal == "function" ? e.showModal() : e.setAttribute("open", "")), !t && e.open && (typeof e.close == "function" ? e.close() : e.removeAttribute("open"));
    } catch {
      t ? e.setAttribute("open", "") : e.removeAttribute("open");
    }
}
function en({
  open: e = !1,
  title: t = "Activity complete",
  completed: r = !0,
  score: s,
  badge: n,
  subtitle: a,
  progress: l,
  attempts: o,
  message: i,
  onClose: m,
  onReview: u,
  onNext: y,
  nextLabel: f = "Continue",
  reviewLabel: h = "Review"
}) {
  const C = be(null), I = Le();
  return ye(() => {
    wr(C.current, e);
  }, [e]), e ? /* @__PURE__ */ d(
    "dialog",
    {
      ref: C,
      className: "lp-dialog",
      "aria-labelledby": I,
      onCancel: (E) => {
        E.preventDefault(), m == null || m();
      },
      children: [
        /* @__PURE__ */ d("header", { className: "lp-dialog__header", children: [
          /* @__PURE__ */ c("h2", { id: I, children: t }),
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "lp-dialog__close",
              "aria-label": `Close ${t}`,
              onClick: m,
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { className: "lp-dialog__body", children: [
          /* @__PURE__ */ c(
            st,
            {
              completed: r,
              score: s,
              badge: n,
              subtitle: a,
              progress: l,
              attempts: o,
              message: i
            }
          ),
          /* @__PURE__ */ d("div", { className: "lp-form__actions", children: [
            u ? /* @__PURE__ */ c("button", { type: "button", className: "lp-button lp-button--secondary", onClick: u, children: h }) : null,
            y ? /* @__PURE__ */ c("button", { type: "button", className: "lp-button", onClick: y, children: f }) : null
          ] })
        ] })
      ]
    }
  ) : null;
}
const Ar = (e) => ({
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
function tn({
  collapsed: e,
  defaultCollapsed: t = !0,
  onCollapsedChange: r,
  expandLabel: s = "Show progress details",
  collapseLabel: n = "Hide progress details",
  ...a
}) {
  const [l, o] = M(t), i = typeof e == "boolean" ? e : l, m = Le(), u = a.title || "Practice progress";
  function y(f) {
    typeof e != "boolean" && o(f), r == null || r(f);
  }
  return /* @__PURE__ */ d(
    "aside",
    {
      className: "lp-card lp-practice-progress-panel",
      style: Ar(i),
      "aria-label": u,
      "data-lp-practice-progress-panel": "",
      "data-lp-docked": "left",
      "data-lp-collapsed": i ? "true" : "false",
      children: [
        /* @__PURE__ */ c("div", { id: m, children: /* @__PURE__ */ c(st, { ...a, title: u, collapsed: i }) }),
        /* @__PURE__ */ c("div", { className: "lp-card__actions", style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "lp-button lp-button--secondary",
            "aria-expanded": !i,
            "aria-controls": m,
            onClick: () => y(!i),
            children: i ? s : n
          }
        ) })
      ]
    }
  );
}
const Ir = {
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
}, Tr = {
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
}, Er = {
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
}, xr = {
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
}, Mr = {
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
}, $r = {
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
}, Pr = {
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
}, Lr = {
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
}, rn = [
  Ir,
  Tr,
  Er,
  xr,
  Mr,
  $r,
  Pr,
  Lr
];
function Dr(e) {
  const t = me(e.type);
  return t === "single-choice" || t === "option-cards" || t === "classification" || t === "drag-drop" || t === "fill-gap" || t === "phrase-completion" || t === "ordering" || t === "sequence";
}
function Rr(e) {
  return nt(e.type);
}
function Or(e) {
  return ((e == null ? void 0 : e.blocks) || []).filter((t) => Rr(t)).map((t) => fe(t));
}
function at(e, t) {
  const r = Or(e);
  return !r.length || !t ? !1 : r.every((s) => !!t[s]);
}
function Fr(e, t) {
  return at(e, t);
}
function nn(e, t) {
  let r = 0;
  for (const s of e)
    at(s, t) && (r += 1);
  return r;
}
function cn(e, t) {
  let r = 0;
  for (const s of e)
    s != null && s.id && Fr(s, t[s.id]) && (r += 1);
  return r;
}
function sn(e, t) {
  return `${e} / ${t} ${t === 1 ? "activity" : "activities"} completed`;
}
function an(e) {
  if (!Dr(e)) return 0;
  const t = me(e.type);
  return t === "classification" ? (e.content && e.content.items || []).length : t === "drag-drop" ? (e.content && e.content.items || []).length : t === "fill-gap" || t === "phrase-completion" ? (e.content && e.content.gaps || []).length || 1 : t === "ordering" || t === "sequence" ? (e.content && e.content.items || []).length : 1;
}
function ln() {
  return { completed: {}, scores: {} };
}
function on(e, t, r) {
  const s = { ...e.completed }, n = { ...e.scores };
  return r.completed ? (s[t] = !0, r.score && r.score.total > 0 && !r.requiresReview ? n[t] = r.score : delete n[t], { completed: s, scores: n }) : r.status === "error" ? e : (delete s[t], delete n[t], { completed: s, scores: n });
}
function dn(e, t) {
  return t.length > 0 && t.every((r) => e.completed[r]);
}
function un(e, t) {
  var s;
  if (!e.completed) return !1;
  const r = ((s = e.score) == null ? void 0 : s.total) || 0;
  return t.complete || t.completedCount >= 2 || r >= 2;
}
function pn(e, t) {
  const r = Object.values(e.completed).filter(Boolean).length, s = Object.values(e.scores).reduce(
    (a, l) => ({
      correct: a.correct + l.correct,
      total: a.total + l.total
    }),
    { correct: 0, total: 0 }
  ), n = Math.max(0, t.requiredBlocks);
  return {
    completedCount: r,
    requiredBlocks: n,
    completion: n > 0 ? Math.min(1, r / n) : 0,
    score: {
      correct: s.correct,
      total: Math.max(t.scorableTotal, s.total, 0)
    },
    complete: n > 0 && r >= n
  };
}
const lt = /* @__PURE__ */ new Set(["correct", "incorrect", "review", "recorded", "error"]);
function jr(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, r = {
    correct: t.correct === !0 ? !0 : t.correct === !1 ? !1 : null
  };
  return typeof t.canRetry == "boolean" && (r.canRetry = t.canRetry), typeof t.status == "string" && lt.has(t.status) && (r.status = t.status), r;
}
function mn(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return {};
  const t = {};
  for (const [r, s] of Object.entries(e)) {
    const n = jr(s);
    n && (t[r] = n);
  }
  return t;
}
function hn(e) {
  const t = typeof e.status == "string" && lt.has(e.status) ? e.status : e.requiresReview ? "review" : e.correct === !0 ? "correct" : e.correct === !1 ? "incorrect" : "recorded", r = {
    correct: e.correct === !0 ? !0 : e.correct === !1 ? !1 : null,
    status: t
  };
  return typeof e.canRetry == "boolean" && (r.canRetry = e.canRetry), r;
}
export {
  kr as ActivityBlock,
  St as ActivityCard,
  Rt as AuthoredHtml,
  At as Breadcrumbs,
  mt as CONTEXT_TYPES,
  Tt as Callout,
  nr as Classification,
  en as CompletionModal,
  Et as ContextPanel,
  sr as DragDrop,
  We as EmptyState,
  Vr as ErrorState,
  Gt as FEEDBACK_STATES,
  Ne as FeedbackPanel,
  Gr as HubShell,
  Qr as InteractiveActivity,
  Kr as LEARNER_ACTIVITY_STATES,
  zr as LearnerHeader,
  Mt as LearningOutcomeBadge,
  gr as LearningTextField,
  Wr as LoadingState,
  xt as Navigation,
  ar as OptionCards,
  ir as PhraseCompletion,
  tn as PracticeProgressPanel,
  $t as ProgressCard,
  st as ProgressSummary,
  yr as REFLECTION_DEFAULT_MIN_CHARS,
  Cr as Reflection,
  Fe as SERVER_CHECK_FAILED_MESSAGE,
  Wt as SERVER_REVIEW_MESSAGE,
  ht as SESSION_KINDS,
  Oe as SESSION_KIND_LABELS,
  He as SHORT_RESPONSE_DEFAULT_MIN_CHARS,
  Ur as STATUS_TONES,
  dr as Sequence,
  Pt as SessionSection,
  br as ShortResponse,
  Te as StatusBadge,
  ct as TextResponse,
  ve as WEEK_ACCESS_COPY,
  ft as WEEK_UI_FEATURES,
  Jr as WeekAccessGuard,
  Zr as WeekAccessLink,
  Lt as WeekHeader,
  Dt as WeekNavigation,
  Xr as WeekView,
  _t as activityActionLabel,
  sn as activityProgressLabel,
  pn as aggregatePracticeProgress,
  on as applyPracticeResult,
  an as catalogueBlockScorableTotal,
  Or as completableBlockIds,
  cn as completedActivityCountFromCheckedDrafts,
  nn as completedActivityCountFromState,
  Jt as createMarkResponseHandler,
  er as createSeededRandom,
  rn as demoCatalogueActivities,
  $r as demoClassification,
  Er as demoDragDrop,
  Ir as demoOptionCards,
  xr as demoPhraseCompletion,
  Lr as demoReflection,
  Mr as demoSequence,
  Pr as demoShortResponse,
  Tr as demoTrueFalse,
  ln as emptyPracticeProgress,
  Qt as hashSeed,
  Fr as isActivityCheckedComplete,
  at as isActivityPracticeComplete,
  nt as isCatalogueReactType,
  Rr as isCompletableReactBlock,
  vt as isIndependentKind,
  un as isPracticeCompletionCue,
  Dr as isScorableReactBlock,
  bt as isSessionKind,
  Zt as learnerSafeBlock,
  jr as learnerSafeCheckedResult,
  mn as learnerSafeCheckedResults,
  hn as learnerSafeResultFromActivityResult,
  mr as looksLikeTrueFalseOptions,
  yt as mergeWeekUiFeatures,
  me as normaliseActivityType,
  et as presentationShuffleSeed,
  fe as questionIdFor,
  rt as resolveMinChars,
  Sr as resolveProgressFraction,
  Be as resolveWeekStatus,
  Pe as restoredCheckedDisplay,
  dn as scorableBlocksComplete,
  gt as shouldShowContext,
  hr as shouldShuffle,
  Me as shuffled,
  tr as stableShuffle,
  ze as statusLabel,
  kt as statusTone,
  $e as useRestoredCheckedFeedback,
  Bt as weekAccessFallbackCopy,
  Xe as weekIsAccessible
};
//# sourceMappingURL=index.js.map
