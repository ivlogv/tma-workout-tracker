import { FC } from "react";
import { Section, Cell, Subheadline, CircularProgress } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { Workout } from "@/types/workout";

interface StatBoxProps {
  label: string;
  value: string;
  delta: string;
}

export const StatBox: FC<StatBoxProps> = ({ label, value, delta }) => {
  const numericDelta = parseFloat(delta.replace(/[^0-9.-]/g, ""));
  const isPositive = numericDelta > 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "8px 16px",
        borderRadius: "8px",
        backgroundColor: "var(--tg-theme-secondary-bg-color)",
      }}
    >
      <Subheadline
        level="1"
        plain
        weight="3"
        style={{
          fontSize: "13px",
          color: "var(--tg-theme-hint-color)",
          marginBottom: "4px",
        }}
      >
        {label}
      </Subheadline>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Subheadline
          style={{
            fontWeight: 600,
            // fontSize: "16px",
            color: "var(--tg-theme-text-color)",
          }}
        >
          {value}
        </Subheadline>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: isPositive ? "green" : "red",
            // fontSize: "12px",
          }}
        >
          {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
          <Subheadline style={{ marginLeft: "2px" }}>{delta}</Subheadline>
        </div>
      </div>
    </div>
  );
};

interface WeeklyProgressProps {
  workouts: Workout[];
}

export const WeeklyProgress: FC<WeeklyProgressProps> = ({ workouts }) => {
  const navigate = useNavigate();
  const completed = workouts.filter((w) => w.is_completed).length;
  const planned = workouts.length;
  const percent = planned > 0 ? (completed / planned) * 100 : 0;

  return (
    <Section header="Прогресс за неделю" onClick={() => navigate("/history")}>
      <Cell
        title={`${completed} из ${planned} тренировок`}
        before={
          <CircularProgress progress={percent} size="medium" color="var(--tg-theme-button-color)">
            {/* <CircularProgressLabel>{completed}</CircularProgressLabel> */}
          </CircularProgress>
        }
      >
      {`${completed} из ${planned} тренировок`}
      </Cell>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          padding: "8px 16px",
        }}
      >
        <StatBox label="Сила" value="86" delta="+4" />
        <StatBox label="Объём" value="371 кг" delta="+12%" />
        <StatBox label="Длительность" value="2ч 6м" delta="+131%" />
        <StatBox label="Рекорды" value="5" delta="+4" />
      </div>
    </Section>
  );
};
