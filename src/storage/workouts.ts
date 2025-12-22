import { WorkoutTemplate, WorkoutEvent } from "@/types/workout";

const TEMPLATES_KEY = "workout_templates";
const EVENTS_KEY = "workout_events";

// ---------- Templates ----------
export function loadTemplates(): WorkoutTemplate[] {
  try {
    return JSON.parse(localStorage.getItem(TEMPLATES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveTemplates(templates: WorkoutTemplate[]) {
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
}

export function addTemplate(template: WorkoutTemplate) {
  const templates = loadTemplates();
  templates.push(template);
  saveTemplates(templates);
}

// ---------- Events ----------
export function loadEvents(): WorkoutEvent[] {
  try {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveEvents(events: WorkoutEvent[]) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function addEvent(event: WorkoutEvent) {
  const events = loadEvents();
  events.push(event);
  saveEvents(events);
}
