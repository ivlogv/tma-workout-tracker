import { useState, useEffect } from "react";
import {
  WorkoutTemplate,
  WorkoutEvent,
  WorkoutExercise,
} from "@/types/workout";

const TEMPLATES_KEY = "workout_templates";
const EVENTS_KEY = "workout_events";
const EXERCISES_KEY = "workout_exercises";

export function useWorkoutStore() {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [activeEvent, setActiveEvent] = useState<WorkoutEvent | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  // ---------- LOAD ----------
  useEffect(() => {
    try {
      setTemplates(JSON.parse(localStorage.getItem(TEMPLATES_KEY) || "[]"));
      setEvents(JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]"));
      setExercises(JSON.parse(localStorage.getItem(EXERCISES_KEY) || "[]"));
    } catch {
      setTemplates([]);
      setEvents([]);
      setExercises([]);
    }
  }, []);

  // ---------- SAVE ----------
  useEffect(() => {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
  }, [exercises]);

  // ---------- START WORKOUT ----------
  const startWorkout = (templateId: string) => {
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

    setActiveEvent(event);
    setStartTime(Date.now());
  };

  // ---------- TOGGLE EXERCISE ----------
  const toggleExercise = (exerciseId: string) => {
    if (!activeEvent) return;

    setActiveEvent({
      ...activeEvent,
      exercises: activeEvent.exercises.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, is_completed: !ex.is_completed }
          : ex
      ),
    });
  };

  // ---------- FINISH WORKOUT ----------
  const finishWorkout = () => {
    if (!activeEvent || !startTime) return;

    const duration = Math.round((Date.now() - startTime) / 60000);

    const completedEvent = {
      ...activeEvent,
      is_completed: true,
      duration: duration.toString(),
    };

    setEvents((prev) => [completedEvent, ...prev]);
    setActiveEvent(null);
    setStartTime(null);
  };

  // ---------- STREAK ----------
  const getStreak = () => {
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
  };

  // ---------- WEEK COUNT ----------
  const getWeekCount = () => {
    const weekAgo = Date.now() - 7 * 86400000;
    return events.filter((e) => new Date(e.date).getTime() >= weekAgo).length;
  };

  // ---------- RESET ----------
  const resetProgress = () => {
    setEvents([]);
    setActiveEvent(null);
    setStartTime(null);
    localStorage.removeItem(EVENTS_KEY);
  };

  return {
    templates,
    events,
    exercises,
    activeEvent,

    startWorkout,
    toggleExercise,
    finishWorkout,

    getStreak,
    getWeekCount,
    resetProgress,
  };
}
