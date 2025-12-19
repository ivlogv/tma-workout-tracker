// src/types/workout.ts
export interface Workout {
  id: string;
  user_id: string;
  workout_date: string;
  title: string;
  description?: string | null;
  created_at: string;
}
