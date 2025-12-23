import type { FC } from "react";
import { useEffect, useState } from "react";
import { List } from "@telegram-apps/telegram-ui";
import { mainButton } from "@tma.js/sdk-react";

import { Page } from "@/components/Page.tsx";
import { IndexHeader } from "./IndexHeader";
import { WeekCalendar } from "./WeekCalendar";
import { TodayWorkoutCard } from "./TodayWorkoutCard";
import { WeeklyProgress } from "./WeeklyProgress";
import { RecentWorkouts } from "./RecentWorkouts";

import { loadTemplates, loadEvents } from "@/storage/workouts";
import { WorkoutTemplate, WorkoutEvent } from "@/types/workout";
import { SelectWorkoutModal } from "@/components/SelectWorkoutModal";
// import { useInitDataContext } from "@/context/InitDataContext";

export const IndexPage: FC = () => {
  // const { user } = useInitDataContext();
  // const name = user?.first_name ?? user?.username ?? "Friend";

  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    if (!mainButton) return;
    const hasTemplates = templates.length > 0;
    const hasCompletedToday = events.some(
      (e) =>
        new Date(e.date).toDateString() === new Date().toDateString() &&
        e.is_completed
    );
    mainButton.offClick(() => {});
    if (!hasTemplates) {
      mainButton.setParams({ text: "Добавить тренировку", isVisible: true });
      mainButton.onClick(() => {
        window.location.hash = "#/workouts/new";
      });
    } else if (!hasCompletedToday) {
      mainButton.setParams({ text: "Отметить тренировку", isVisible: true });
      mainButton.onClick(() => setModalOpen(true));
    } else {
      mainButton.setParams({ text: "Добавить тренировку", isVisible: true });
      mainButton.onClick(() => {
        window.location.hash = "#/workouts/new";
      });
    }
  }, [templates, events]);

  return (
    <Page back={false}>
      <List>
        <IndexHeader />
        <WeekCalendar workouts={workouts} />
        <TodayWorkoutCard todayWorkout={workouts[0]} />
        <WeeklyProgress workouts={workouts} />
        <RecentWorkouts recentWorkouts={recentWorkouts} />

        <SelectWorkoutModal
          open={isModalOpen}
          onOpenChange={setModalOpen}
          templates={templates}
          onEventAdded={(event) => setEvents((prev) => [...prev, event])}
        />
      </List>
    </Page>
  );
};
