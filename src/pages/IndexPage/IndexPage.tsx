import type { FC } from "react";
import { List } from "@telegram-apps/telegram-ui";

import { Page } from "@/components/Page.tsx";
import { IndexHeader } from "./IndexHeader";
import { Workout } from "@/types/workout";
import { WeekCalendar } from "./WeekCalendar";
import { TodayWorkoutCard } from "./TodayWorkoutCard";
import { WeeklyProgress } from "./WeeklyProgress";
import { RecentWorkouts } from "./RecentWorkouts";
// import { useInitDataContext } from "@/context/InitDataContext";

export const IndexPage: FC = () => {
  // const { user } = useInitDataContext();
  // const name = user?.first_name ?? user?.username ?? "Friend";

  const workouts: Workout[] = [
    {
      id: "1",
      user_id: "user_123",
      workout_date: new Date().toISOString(),
      title: "Кардио тренировка",
      description: "30 минут беговой дорожки и велотренажёр",
      created_at: new Date().toISOString(),
      is_completed: true,
      duration: "45 мин",
      calories: "400 ккал",
    },
    {
      id: "2",
      user_id: "user_123",
      workout_date: new Date(Date.now() - 86400000).toISOString(), // вчера
      title: "Силовая тренировка",
      description: "Жим лёжа, приседания, подтягивания",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      is_completed: false,
      duration: "45 мин",
      calories: "400 ккал",
    },
    {
      id: "2",
      user_id: "user_123",
      workout_date: new Date(Date.now() - 86400000 * 3).toISOString(), // вчера
      title: "Силовая тренировка",
      description: "Жим лёжа, приседания, подтягивания",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      is_completed: true,
      duration: "45 мин",
      calories: "400 ккал",
    },
  ];

  const recentWorkouts = [...workouts]
  .sort((a, b) => new Date(b.workout_date).getTime() - new Date(a.workout_date).getTime())
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
