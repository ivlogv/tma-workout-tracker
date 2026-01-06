import { WorkoutTemplate, WorkoutEvent, WorkoutExercise } from "@/types/workout";

const TEMPLATES_KEY = "workout_templates";
const EVENTS_KEY = "workout_events";
const EXERCISES_KEY = "workout_exercises";

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

// ---------- Exercises ----------
export function loadExercises(): WorkoutExercise[] {
  try {
    return JSON.parse(localStorage.getItem(EXERCISES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveExercises(exercises: WorkoutExercise[]) {
  localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
}

export function addExercise(exercise: WorkoutExercise) {
  const exercises = loadExercises();
  exercises.push(exercise);
  saveExercises(exercises);
}
