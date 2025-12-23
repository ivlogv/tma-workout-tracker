import { FC, useEffect, useState } from "react";
import { mainButton } from "@tma.js/sdk-react";
import { Box } from "@chakra-ui/react";
// import { useWorkout } from "@/components/ui/WorkoutProvider";
// import { useRegister } from "@/components/ui/RegisterProvider";
// import { MainHeader } from "./MainHeader";
import { WeekCalendar } from "./WeekCalendar";
import { TodayWorkoutCard } from "./TodayWorkoutCard";
import { WeeklyProgress } from "./WeeklyProgress";
import { RecentWorkouts } from "./RecentWorkouts";
import { loadTemplates, loadEvents } from "@/storage/workouts";
import { WorkoutTemplate, WorkoutEvent } from "@/types/workout";
import { Page } from "@/components/Page";

export const MainPage: FC = () => {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  // const [isModalOpen, setModalOpen] = useState(false);

  // Загружаем данные при входе
  useEffect(() => {
    setTemplates(loadTemplates());
    setEvents(loadEvents());
  }, []);

  // Преобразуем events → workouts
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

  // Логика MainButton
  useEffect(() => {
    if (!mainButton) return;
    const hasTemplates = templates.length > 0;
    const hasCompletedToday = events.some(
      (e) =>
        new Date(e.date).toDateString() === new Date().toDateString() &&
        e.is_completed
    );

    let handler: () => void;
    if (!hasTemplates) {
      mainButton.setParams({ text: "Добавить тренировку", isVisible: true });
      handler = () => {
        window.location.hash = "#/workouts/new";
      };
    } else if (!hasCompletedToday) {
      mainButton.setParams({ text: "Отметить тренировку", isVisible: true });
      handler = () => alert("Отметить тренировку");
    } else {
      mainButton.setParams({ text: "Добавить тренировку", isVisible: true });
      handler = () => {
        window.location.hash = "#/workouts/new";
      };
    }

    mainButton.onClick(handler);

    return () => {
      mainButton.offClick(handler);
    };
  }, [templates, events]);

  return (
    <Page back={false} showNav={true}>
      <WeekCalendar workouts={workouts} />
      <TodayWorkoutCard todayWorkout={workouts[0]} />
      <WeeklyProgress />
      <RecentWorkouts recentWorkouts={recentWorkouts} />
    </Page>
  );
};
{
  /* <Box p={2} pb="80px" bg="bg" color="text" userSelect="none"></Box> */
}
{
  /* <MainHeader
        avatarColor={avatarColor}
        avatarFallback={avatarFallback}
        avatarImage={avatarImage}
      /> */
}
// </Box>
