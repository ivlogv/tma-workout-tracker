import type { FC } from "react";
import { useEffect, useState } from "react";
import { List } from "@telegram-apps/telegram-ui";

import { Page } from "@/components/Page.tsx";
import { IndexHeader } from "./IndexHeader";
import { WeekCalendar } from "./WeekCalendar";
import { TodayWorkoutCard } from "./TodayWorkoutCard";
import { WeeklyProgress } from "./WeeklyProgress";
import { RecentWorkouts } from "./RecentWorkouts";

import { loadTemplates, loadEvents } from "@/storage/workouts";
import { WorkoutTemplate, WorkoutEvent } from "@/types/workout";
// import { useInitDataContext } from "@/context/InitDataContext";

export const IndexPage: FC = () => {
  // const { user } = useInitDataContext();
  // const name = user?.first_name ?? user?.username ?? "Friend";

  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);

  // Загружаем данные при входе
  useEffect(() => {
    setTemplates(loadTemplates());
    setEvents(loadEvents());
  }, []);

  // Преобразуем events → workouts для календаря и прогресса
  const workouts = events.map((e) => ({
    id: e.id,
    user_id: "local",
    workout_date: e.date,
    title: templates.find((t) => t.id === e.template_id)?.title || "Тренировка",
    description: templates.find((t) => t.id === e.template_id)?.description,
    created_at: e.date,
    is_completed: e.is_completed,
  }));

  const recentWorkouts = [...workouts]
    .sort(
      (a, b) =>
        new Date(b.workout_date).getTime() - new Date(a.workout_date).getTime()
    )
    .slice(0, 5);

  return (
    <Page back={false}>
      <List>
        <IndexHeader />
        <WeekCalendar workouts={workouts} />
        <TodayWorkoutCard todayWorkout={workouts[0]} />
        <WeeklyProgress workouts={workouts} />
        <RecentWorkouts recentWorkouts={recentWorkouts} />
      </List>
    </Page>
  );
};
