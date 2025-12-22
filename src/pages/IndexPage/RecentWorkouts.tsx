import { FC } from "react";
import { Section, Cell, ButtonCell } from "@telegram-apps/telegram-ui";
import { FiClock, FiChevronRight } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface RecentWorkoutsProps {
  recentWorkouts: {
    id: string;
    title: string;
    workout_date: string;
    duration?: string;
    calories?: string;
  }[];
}

function formatDate(dateString: string) {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export const RecentWorkouts: FC<RecentWorkoutsProps> = ({ recentWorkouts }) => {
  const navigate = useNavigate();

  return (
    <Section header="Последние тренировки">
      {recentWorkouts.map((w) => (
        <Cell
          key={w.id}
          onClick={() => navigate(`/workout/${w.id}`)}
          after={<FiChevronRight />}
          subtitle={
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span>{formatDate(w.workout_date)}</span>

              <span
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <FiClock size={12} />
                {w.duration ?? "30 мин"}
              </span>

              <span
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <FaFire size={12} />
                {w.calories ?? "330 ккал"}
              </span>
            </div>
          }
        >
          {w.title}
        </Cell>
      ))}

      {/* Кнопка "Вся история" */}
      <ButtonCell
        before={<FiClock size="24" />}
        onClick={() => navigate("/history")}
      >
        Вся история
      </ButtonCell>
    </Section>
  );
};
