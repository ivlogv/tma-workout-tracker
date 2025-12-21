import { FC, useMemo } from "react";
import { Caption } from "@telegram-apps/telegram-ui";
import { FiCheck } from "react-icons/fi";
import { Workout } from "@/types/workout";

function getCurrentWeek(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = воскресенье, 1 = понедельник
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push(d);
  }
  return week;
}

export const WeekCalendar: FC<{ workouts: Workout[] }> = ({ workouts }) => {
  const weekDates = useMemo(() => getCurrentWeek(), []);
  const today = new Date().toDateString();

  return (
    <div
      style={{
        margin: "0 12px",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "24px",
      }}
    >
      {weekDates.map((date) => {
        const key = date.toDateString();
        const dayWorkouts = workouts.filter(
          (w) => new Date(w.workout_date).toDateString() === key
        );

        const hasWorkout = dayWorkouts.length > 0;
        const isCompleted = dayWorkouts.some((w) => w.is_completed);
        const isToday = key === today;

        const day = date.toLocaleDateString("ru-RU", { weekday: "short" });
        const num = date.getDate();

        return (
          <div
            key={date.toISOString()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Caption
              style={{
                color: isToday
                  ? "var(--tg-theme-accent-text-color)"
                  : "var(--tg-theme-hint-color)",
              }}
            >
              {day}
            </Caption>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                fontFamily: "var(--tg-theme-font-family, sans-serif)",
                backgroundColor: isCompleted
                  ? "var(--tg-theme-button-color)" // выполнено
                  : hasWorkout
                  ? "var(--tg-theme-bg-color)" // запланировано
                  : "transparent",
                color: isCompleted
                  ? "var(--tg-theme-button-text-color)"
                  : "var(--tg-theme-text-color)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isCompleted  ? <FiCheck /> : num}
            </div>
          </div>
        );
      })}
    </div>
  );
};
