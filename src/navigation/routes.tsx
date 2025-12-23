import type { ComponentType, JSX } from 'react';

// import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { AddWorkoutPage } from '@/pages/AddWorkoutPage';
import { MainPage } from '@/pages/MainPage/MainPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: MainPage },
  {path: '/workouts/new', Component: AddWorkoutPage, title: 'Add Workout'}
];
