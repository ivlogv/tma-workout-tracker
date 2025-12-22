import { FC } from "react";
import { Section, Cell, ButtonCell } from "@telegram-apps/telegram-ui";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Workout } from "@/types/workout";

interface TodayWorkoutCardProps {
  todayWorkout?: Workout | null;
}

export const TodayWorkoutCard: FC<TodayWorkoutCardProps> = ({
  todayWorkout,
}) => {
  const navigate = useNavigate();

  return (
    <Section header="Сегодня" style={{marginBottom: "16px"}}>
      {/* Основная карточка тренировки */}
      <Cell subtitle={todayWorkout?.description || "Нет тренировки на сегодня"}>
        {todayWorkout?.title || "—"}
      </Cell>

      <ButtonCell before={<FiPlusCircle  size="24"/>} onClick={() => navigate("/workouts/new")}>
        Добавить тренировку
      </ButtonCell>
    </Section>
  );
};
