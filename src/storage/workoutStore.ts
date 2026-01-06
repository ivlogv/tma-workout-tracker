import { create } from "zustand";
import {
  WorkoutTemplate,
  WorkoutEvent,
  WorkoutExercise,
} from "@/types/workout";

import { loadMockData } from "@/hooks/mock";

const TEMPLATES_KEY = "workout_templates";
const EVENTS_KEY = "workout_events";
const EXERCISES_KEY = "workout_exercises";

interface WorkoutState {
  templates: WorkoutTemplate[];
  events: WorkoutEvent[];
  exercises: WorkoutExercise[];
  activeEvent: WorkoutEvent | null;
  startTime: number | null;

  startWorkout: (templateId: string) => void;
  toggleExercise: (exerciseId: string) => void;
  finishWorkout: () => void;

  getStreak: () => number;
  getWeekCount: () => number;

  resetProgress: () => void;
}

console.log("Zustand store imported");
console.log("localStorage templates:", localStorage.getItem(TEMPLATES_KEY));

export const useWorkoutStore = create<WorkoutState>((set, get) => {
  // 1. Если данных нет — загрузить моки
  if (!localStorage.getItem(TEMPLATES_KEY)) {
    console.log("Loading mock data...");
    loadMockData();
  }

  // 2. Прочитать данные из localStorage (уже гарантированно есть)
  const templates = JSON.parse(localStorage.getItem(TEMPLATES_KEY) || "[]");
  const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]");
  const exercises = JSON.parse(localStorage.getItem(EXERCISES_KEY) || "[]");

  console.log("Loaded into Zustand:", { templates, events, exercises });

  return {
    templates,
    events,
    exercises,
    activeEvent: null,
    startTime: null,

    // ---------- START WORKOUT ----------
    startWorkout: (templateId) => {
      const { exercises } = get();

      const templateExercises = exercises
        .filter((e) => e.template_id === templateId)
        .map((e) => ({ ...e, is_completed: false }));

      const event: WorkoutEvent = {
        id: Date.now().toString(),
        template_id: templateId,
        date: new Date().toISOString(),
        is_completed: false,
        duration: "0",
        exercises: templateExercises,
      };

      set({
        activeEvent: event,
        startTime: Date.now(),
      });
    },

    // ---------- TOGGLE EXERCISE ----------
    toggleExercise: (exerciseId) => {
      const { activeEvent } = get();
      if (!activeEvent) return;

      const updated = {
        ...activeEvent,
        exercises: activeEvent.exercises.map((ex) =>
          ex.id === exerciseId ? { ...ex, is_completed: !ex.is_completed } : ex
        ),
      };

      set({ activeEvent: updated });
    },

    // ---------- FINISH WORKOUT ----------
    finishWorkout: () => {
      const { activeEvent, startTime, events } = get();
      if (!activeEvent || !startTime) return;

      const duration = Math.round((Date.now() - startTime) / 60000);

      const completedEvent = {
        ...activeEvent,
        is_completed: true,
        duration: duration.toString(),
      };

      const updatedEvents = [completedEvent, ...events];

      localStorage.setItem(EVENTS_KEY, JSON.stringify(updatedEvents));

      set({
        events: updatedEvents,
        activeEvent: null,
        startTime: null,
      });
    },

    // ---------- STREAK ----------
    getStreak: () => {
      const { events } = get();
      const completed = events.filter((e) => e.is_completed);
      if (completed.length === 0) return 0;

      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const event of completed) {
        const d = new Date(event.date);
        d.setHours(0, 0, 0, 0);

        const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);

        if (diff === streak) streak++;
        else break;
      }

      return streak;
    },

    // ---------- WEEK COUNT ----------
    getWeekCount: () => {
      const { events } = get();
      const weekAgo = Date.now() - 7 * 86400000;

      return events.filter(
        (e) => e.is_completed && new Date(e.date).getTime() >= weekAgo
      ).length;
    },

    // ---------- RESET ----------
    resetProgress: () => {
      localStorage.removeItem(EVENTS_KEY);
      set({
        events: [],
        activeEvent: null,
        startTime: null,
      });
    },
  };
});
