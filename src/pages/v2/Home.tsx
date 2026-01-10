import { FC, useEffect, useState, useMemo, useCallback } from "react";
import { LuSettings as SettingsIcon, LuCheck } from "react-icons/lu";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { loadTemplates, loadEvents } from "@/storage/workouts";
import { WorkoutTemplate, WorkoutEvent } from "@/types/workout";
import { useNavigate } from "react-router-dom";
import { Page } from "@/components/Page";
// import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useWorkoutStore } from "@/storage/workoutStore";
import { mainButton } from "@tma.js/sdk-react";

const MotionBox = motion.create(Box);

export const Home: FC = () => {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const { startWorkout } = useWorkoutStore();
  const [selectedWorkout, setSelectedWorkout] = useState<{
    eventId: string;
    templateId: string;
  } | null>(null);

  const navigate = useNavigate();
  const onOpenSettings = () => navigate("/settings");
  //const onStartWorkout = () => navigate("/workout/start");
  const onViewHistory = () => navigate("/history");

  const lastWorkouts = useMemo(() => {
    return [...events]
      .filter((e) => e.is_completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
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

    let handler: () => void;
    if (!hasTemplates) {
      mainButton.setParams({
        text: "Добавить тренировку",
        isVisible: true,
        hasShineEffect: true,
      });
      handler = () => {
        window.location.hash = "#/workouts/new";
      };
    } else if (selectedWorkout?.eventId) {
      alert(selectedWorkout.eventId);
      mainButton.setParams({
        text: "Старт",
        isVisible: true,
        hasShineEffect: true,
      });
      // handler = () => alert("Отметить тренировку");
      handler = handleStart;
    } else {
      mainButton.setParams({ text: "Выбрать тренировку", isVisible: true });
      handler = () => {
        window.location.hash = "#/workouts/start";
      };
    }

    mainButton.onClick(handler);

    return () => mainButton.offClick(handler);
  }, [selectedWorkout?.eventId, templates, events, mainButton, window.location.hash]);

  // Handle workout start
  const handleStart = useCallback(() => {
    if (selectedWorkout) {
      // alert(selectedWorkout.templateId);
      startWorkout(selectedWorkout.templateId);
      navigate("/workout/active");
      return;
    }
    navigate("/workout/start");
  }, [selectedWorkout, navigate, startWorkout]);

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
        <VStack alignItems="flex-start">
          <Flex align="center" justify="space-between" w="100%" mb={8}>
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
          {/* <Text color="hint" mb={4}>
          Your personal workout tracker //добавить баджи с кол-вом дней подряд
        </Text> */}
        </VStack>

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

        {/* Last Workout */}
        {lastWorkouts.length > 0 && (
          <Box bg="sectionBg" borderRadius="xl" p={4} mb={6}>
            <Text color="hint" mb={3}>
              Последние тренировки
            </Text>

            <Flex direction="column" gap={2}>
              {lastWorkouts.map((w) => {
                const template = templates.find((t) => t.id === w.template_id);
                const isSelected = selectedWorkout?.eventId === w.id;

                return (
                  <Flex
                    key={w.id}
                    justify="space-between"
                    align="center"
                    bg={isSelected ? "accentBg" : "bg"}
                    borderRadius="lg"
                    p={2}
                    cursor="pointer"
                    onClick={() =>
                      setSelectedWorkout((prev) =>
                        prev?.eventId === w.id
                          ? null
                          : { eventId: w.id, templateId: w.template_id }
                      )
                    }
                    transition="0.15s ease"
                  >
                    <Box>
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        color={isSelected ? "accentText" : "text"}
                      >
                        {template?.title || "Тренировка"}
                      </Text>
                      <Text color="hint" fontSize="sm">
                        {new Date(w.date).toLocaleDateString()}
                      </Text>
                    </Box>

                    {/* Анимированная галочка */}
                    <MotionBox
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isSelected
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.15 }}
                      w="24px"
                      h="24px"
                      borderRadius="full"
                      bg="accent"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="accentText"
                    >
                      <LuCheck size={24} />
                    </MotionBox>
                  </Flex>
                );
              })}
            </Flex>
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
          {selectedWorkout?.eventId ? "Start" : "Select workout"}
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
