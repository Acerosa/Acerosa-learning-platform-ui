import type { StatusTone } from "./contracts";

const TONE_BY_STATUS: Record<string, StatusTone> = {
  available: "available",
  active: "available",
  planned: "planned",
  archived: "planned",
  "coming-soon": "planned",
  "not-started": "planned",
  "in-progress": "progress",
  progress: "progress",
  completed: "completed"
};

const LABEL_BY_STATUS: Record<string, string> = {
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

export function statusTone(status?: string | null): StatusTone {
  return TONE_BY_STATUS[status || ""] || "planned";
}

export function statusLabel(status?: string | null, fallback = ""): string {
  return LABEL_BY_STATUS[status || ""] || fallback || String(status || "Planned");
}

export function activityActionLabel(state?: string | null, fallback = "Open activity"): string {
  if (state === "completed") return "Review activity";
  if (state === "in-progress") return "Resume activity";
  if (state === "not-started") return "Start activity";
  return fallback;
}
