import type { FC } from "react";

import { Page } from "@/components/Page.tsx";
import { IndexHeader } from "./IndexHeader";
import { Workout } from "@/types/workout";
import { WeekCalendar } from "./WeekCalendar";
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
  },
  {
    id: "2",
    user_id: "user_123",
    workout_date: new Date(Date.now() - 86400000).toISOString(), // вчера
    title: "Силовая тренировка",
    description: "Жим лёжа, приседания, подтягивания",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];


  return (
    <Page back={false}>
      <IndexHeader />
      <WeekCalendar workouts={workouts} />
    </Page>
  );
};
