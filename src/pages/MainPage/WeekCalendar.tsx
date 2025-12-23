import { HStack, VStack, Text, Center } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { useMemo } from "react";
import { type Workout } from "@/types/workout";

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

export function WeekCalendar({ workouts }: { workouts: Workout[] }) {
  const weekDates = useMemo(() => getCurrentWeek(), []);
  const today = new Date().toDateString();

  return (
    <HStack justify="space-between" mb={6}>
      {weekDates.map((date) => {
        const isActive = workouts.some(
          (w) => new Date(w.workout_date).toDateString() === date.toDateString()
        );
        const day = date.toLocaleDateString("ru-RU", { weekday: "short" });
        const num = date.getDate();
        const isToday = date.toDateString() === today;

        return (
          <VStack key={date.toISOString()} gap={1}>
            <Text fontSize="sm" color={isToday ? "accentText" : "hint"}>
              {day}
            </Text>
            <Center
              w={8}
              h={8}
              borderRadius="full"
              bg={isActive ? "button" : "secondaryBg"}
              color={isActive ? "buttonText" : "text"}
              fontWeight="semibold"
            >
              {isActive ? <FiCheck /> : num}
            </Center>
          </VStack>
        );
      })}
    </HStack>
  );
}
