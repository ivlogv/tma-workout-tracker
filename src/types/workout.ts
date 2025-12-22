// src/types/workout.ts
export interface Workout {
  id: string;
  user_id: string;
  workout_date: string;
  title: string;
  description?: string | null;
  created_at: string;
  is_completed: boolean;
  duration?: string;
  calories?: string;
}

export interface WorkoutTemplate {
  id: string;
  title: string;
  description?: string | null;
}

export interface WorkoutEvent {
  id: string;
  template_id: string;
  date: string; // ISO
  is_completed: boolean;
}
