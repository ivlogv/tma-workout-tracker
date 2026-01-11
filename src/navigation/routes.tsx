import type { ComponentType, JSX } from "react";

// import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { AddWorkoutPage } from "@/pages/AddWorkoutPage";
import { MainPage } from "@/pages/MainPage/MainPage";
import { ThemeParamsPage } from "@/pages/ThemeParamsPage";
import { Home } from "@/pages/v2/Home";
import { ActiveWorkout } from "@/pages/v2/ActiveWorkout";
import { Settings } from "@/pages/v2/Settings";
import { WorkoutHistory } from "@/pages/v2/WorkoutHistory";
import { WorkoutDetails } from "@/pages/v2/WorkoutDetails";
import { WorkoutSelectPage } from "@/pages/v2/WorkoutSelect";
import { WorkoutTemplateCreate } from "@/pages/v2/CreateWorkout";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: "/home", Component: MainPage },
  { path: "/theme-params", Component: ThemeParamsPage, title: "Theme Params" },
  { path: "/workouts/new", Component: AddWorkoutPage, title: "Add Workout" },

  { path: "/", Component: Home, title: "Home new" },
  { path: "/workout/active", Component: ActiveWorkout, title: "Active Workout" },
  { path: "/settings", Component: Settings, title: "Settings" },
  { path: "/history", Component: WorkoutHistory, title: "History" },
  { path: "/history/:workoutId", Component: WorkoutDetails, title: "Workout Details" },
  { path: "/workout/start", Component: WorkoutSelectPage, title: "Select Workout" },
  { path: "/templates/add", Component: WorkoutTemplateCreate, title: "Add Template" },
];
