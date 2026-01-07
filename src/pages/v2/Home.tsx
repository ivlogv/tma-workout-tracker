import { FC, useEffect, useState, useMemo, useCallback } from "react";
import { LuSettings as SettingsIcon } from "react-icons/lu";
import { Box, Flex, Heading, IconButton, Text, Button } from "@chakra-ui/react";

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

        {/* Stats */}
        <Box bg="sectionBg" borderRadius="xl" p={4} mb={6}>
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
