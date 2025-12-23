import type { ComponentType, JSX } from "react";

// import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { AddWorkoutPage } from "@/pages/AddWorkoutPage";
import { MainPage } from "@/pages/MainPage/MainPage";
import { ThemeParamsPage } from "@/pages/ThemeParamsPage";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: "/", Component: MainPage },
  { path: "/theme-params", Component: ThemeParamsPage, title: "Theme Params" },
  { path: "/workouts/new", Component: AddWorkoutPage, title: "Add Workout" },
];
