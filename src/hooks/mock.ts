import { saveEvents, saveExercises, saveTemplates } from "@/storage/workouts";
import { WorkoutEvent, WorkoutExercise, WorkoutTemplate } from "@/types/workout";

export const mockTemplates: WorkoutTemplate[] = [
  {
    id: "t1",
    title: "Full Body Beginner",
    description: "A simple full‑body routine for beginners",
  },
  {
    id: "t2",
    title: "Core Strength",
    description: "Short but intense core workout",
  },
];

export const mockExercises: WorkoutExercise[] = [
  // Template t1
  { id: "e1", template_id: "t1", name: "Push-ups", order: 1, is_completed: false },
  { id: "e2", template_id: "t1", name: "Squats", order: 2, is_completed: false },
  { id: "e3", template_id: "t1", name: "Plank", order: 3, is_completed: false },

  // Template t2
  { id: "e4", template_id: "t2", name: "Crunches", order: 1, is_completed: false },
  { id: "e5", template_id: "t2", name: "Leg Raises", order: 2, is_completed: false },
  { id: "e6", template_id: "t2", name: "Side Plank", order: 3, is_completed: false },
];

export const mockEvents: WorkoutEvent[] = [
  {
    id: "ev1",
    template_id: "t1",
    date: new Date(Date.now() - 1 * 86400000).toISOString(), // вчера
    is_completed: true,
    duration: "18",
    exercises: [
      { id: "e1", template_id: "t1", name: "Push-ups", order: 1, is_completed: true },
      { id: "e2", template_id: "t1", name: "Squats", order: 2, is_completed: true },
      { id: "e3", template_id: "t1", name: "Plank", order: 3, is_completed: true },
    ],
  },
  {
    id: "ev2",
    template_id: "t2",
    date: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 дня назад
    is_completed: true,
    duration: "12",
    exercises: [
      { id: "e4", template_id: "t2", name: "Crunches", order: 1, is_completed: true },
      { id: "e5", template_id: "t2", name: "Leg Raises", order: 2, is_completed: true },
      { id: "e6", template_id: "t2", name: "Side Plank", order: 3, is_completed: true },
    ],
  },
  {
    id: "ev3",
    template_id: "t1",
    date: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 дней назад
    is_completed: true,
    duration: "20",
    exercises: [
      { id: "e1", template_id: "t1", name: "Push-ups", order: 1, is_completed: true },
      { id: "e2", template_id: "t1", name: "Squats", order: 2, is_completed: true },
      { id: "e3", template_id: "t1", name: "Plank", order: 3, is_completed: true },
    ],
  },
];

export function loadMockData() {
  saveTemplates(mockTemplates);
  saveExercises(mockExercises);
  saveEvents(mockEvents);
}


