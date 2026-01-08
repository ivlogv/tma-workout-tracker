import { FC, useEffect, useState, useMemo, useCallback } from "react";
import { LuSettings as SettingsIcon } from "react-icons/lu";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Status } from "@/components/ui/status";

import { loadTemplates, loadEvents } from "@/storage/workouts";
import { WorkoutTemplate, WorkoutEvent } from "@/types/workout";
import { useNavigate } from "react-router-dom";
import { Page } from "@/components/Page";
// import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useWorkoutStore } from "@/storage/workoutStore";
import { mainButton } from "@tma.js/sdk-react";

export const Home: FC = () => {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const { startWorkout } = useWorkoutStore();

  const navigate = useNavigate();
  const onOpenSettings = () => navigate("/settings");
  //const onStartWorkout = () => navigate("/workout/start");
  const onViewHistory = () => navigate("/history");

  const todayEvent = useMemo(() => {
    const today = new Date().toDateString();
    return events.find((e) => new Date(e.date).toDateString() === today);
  }, [events, templates]);

  const lastWorkout = useMemo(() => {
    return [...events]
      .filter((e) => e.is_completed)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
  }, [events]);

  // Load data
  useEffect(() => {
    setTemplates(loadTemplates());
    setEvents(loadEvents());
  }, []);

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
      mainButton.setParams({ text: "Добавить", isVisible: true });
      handler = () => {
        window.location.hash = "#/workouts/start";
      };
    } else if (!hasCompletedToday) {
      mainButton.setParams({ text: "Старт", isVisible: true });
      // handler = () => alert("Отметить тренировку");
      handler = handleStart;
    } else {
      mainButton.setParams({ text: "Добавить 2", isVisible: true });
      handler = () => {
        window.location.hash = "#/workouts/new";
      };
    }

    mainButton.onClick(handler);

    return () => {
      mainButton.offClick(handler);
    };
  }, [templates, events]);

  // Handle workout start
  const handleStart = useCallback(() => {
    startWorkout("t1"); // или выбранный шаблон
    navigate("/workout/start");
  }, [navigate, startWorkout]);

  // Convert events → workouts
  const workouts = useMemo(
    () =>
      events.map((e) => ({
        id: e.id,
        user_id: "local",
        workout_date: e.date,
        title:
          templates.find((t) => t.id === e.template_id)?.title || "Тренировка",
        description: templates.find((t) => t.id === e.template_id)?.description,
        created_at: e.date,
        is_completed: e.is_completed,
      })),
    [events, templates]
  );

  // Compute streak
  const streak = useMemo(() => {
    let count = 0;
    const today = new Date();
    const sorted = [...events]
      .filter((e) => e.is_completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    for (let i = 0; i < sorted.length; i++) {
      const d = new Date(sorted[i].date);
      const diff = Math.floor(
        (today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff === count) count++;
      else break;
    }
    return count;
  }, [events]);

  // Compute workouts this week
  const weekCount = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    console.log(workouts);

    return events.filter(
      (e) =>
        e.is_completed && new Date(e.date).getTime() >= startOfWeek.getTime()
    ).length;
  }, [events]);

  const weekProgress = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const completed = events.some(
        (e) =>
          e.is_completed && new Date(e.date).toDateString() === d.toDateString()
      );
      return { day: d, completed };
    });
    return days;
  }, [events]);

  return (
    <Page showNav back={false}>
      <Flex direction="column">
        {/* Header */}
        <Flex align="center" justify="space-between" mb={8}>
          <Heading fontSize="2xl">Workouts</Heading>

          <IconButton
            aria-label="Settings"
            onClick={onOpenSettings}
            variant="ghost"
            color="hint"
            p={2}
            mr={-2}
          >
            <SettingsIcon size={22} />
          </IconButton>
        </Flex>

        {/* Week Progress */}
        <Box bg="sectionBg" borderRadius="xl" p={4} mb={2}>
          <Flex justify="space-between">
            {weekProgress.map((d, i) => (
              <Box key={i} textAlign="center">
                <Text fontSize="xs" color="hint">
                  {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][i]}
                </Text>
                <Text fontSize="xl">
                  {d.completed ? (
                    <Status size="lg" colorPalette="cyan" />
                  ) : (
                    <Status size="lg" colorPalette="gray"/>
                  )}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Stats */}
        <Box bg="sectionBg" borderRadius="xl" p={4} mb={2}>
          <Flex justify="space-around" align="center">
            <Box textAlign="center">
              <Text fontSize="3xl" mb={1}>
                {streak}
              </Text>
              <Text color="hint">day streak</Text>
            </Box>

            <Box w="1px" h="40px" bg="hint" opacity={0.2} />

            <Box textAlign="center">
              <Text fontSize="3xl" mb={1}>
                {weekCount}
              </Text>
              <Text color="hint">this week</Text>
            </Box>
          </Flex>
        </Box>

        {/* Today's Workout */}
        <Box bg="sectionBg" borderRadius="xl" p={4} mb={2}>
          {todayEvent ? (
            <>
              <Text color="hint" mb={1}>
                Сегодня:
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {templates.find((t) => t.id === todayEvent.template_id)?.title}
              </Text>
              <Text color="hint">
                {new Date(todayEvent.date).toLocaleTimeString()}
              </Text>
            </>
          ) : (
            <Text color="hint">Сегодня тренировки ещё не было</Text>
          )}
        </Box>

        {/* Last Workout */}
        {lastWorkout && (
          <Box bg="sectionBg" borderRadius="xl" p={4} mb={6}>
            <HStack justify="space-between">
              <Text color="hint" mb={2}>
                Последняя тренировка
              </Text>
              <Text color="hint" mb={3}>
                {new Date(lastWorkout.date).toLocaleDateString()}
              </Text>
            </HStack>
            <Text fontSize="xl" fontWeight="bold" mb={3}>
              {templates.find((t) => t.id === lastWorkout.template_id)?.title}
            </Text>

            <Button
              w="100%"
              borderRadius="xl"
              onClick={() => {
                startWorkout(lastWorkout.template_id);
                navigate("/workout/active");
              }}
            >
              Повторить
            </Button>
          </Box>
        )}

        {/* Primary Action */}
        <Button
          onClick={handleStart}
          bg="button"
          color="buttonText"
          borderRadius="xl"
          py={6}
          mb={4}
          _active={{ opacity: 0.7 }}
          _hover={{ opacity: 0.9 }}
          fontSize="lg"
        >
          Start
        </Button>

        {/* Secondary Action */}
        <Button
          onClick={onViewHistory}
          variant="ghost"
          color="link"
          _active={{ opacity: 0.7 }}
        >
          History
        </Button>
      </Flex>
    </Page>
  );
};
