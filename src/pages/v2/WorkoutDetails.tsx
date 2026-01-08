import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Separator,
  IconButton,
} from "@chakra-ui/react";

import { Page } from "@/components/Page";
// import { BackButton } from "@/components/ui/BackButton";

import { loadEvents } from "@/storage/workouts";
import { WorkoutEvent } from "@/types/workout";

import { formatDate, formatDuration } from "@/utils/format";
import { LuChevronLeft } from "react-icons/lu";
import { useLaunchParams } from "@tma.js/sdk-react";

export const WorkoutDetails: FC = () => {
  const { workoutId } = useParams();
  const [event, setEvent] = useState<WorkoutEvent | null>(null);
  const lp = useLaunchParams();

  useEffect(() => {
    const events = loadEvents();
    const found = events.find((e) => e.id === workoutId);
    setEvent(found || null);
  }, [workoutId]);

  if (!event) {
    return (
      <Page back>
        <Flex direction="column" minH="100%" color="text">
          <Flex mb={8}>
            {!["ios", "android"].includes(lp?.tgWebAppPlatform) && (
              <IconButton
                aria-label="Back"
                color="text"
                size="xs"
                colorPalette="gray"
                onClick={() => history.back()}
              >
                <LuChevronLeft size={20} />
              </IconButton>
            )}
          </Flex>

          <Flex flex="1" align="center" justify="center">
            <Text color="hint">Workout not found</Text>
          </Flex>
        </Flex>
      </Page>
    );
  }

  return (
    <Page back>
      <Flex direction="column" minH="100%" color="text">
        {/* Header */}
        <Flex align="center" gap={2} mb={8}>
          {!["ios", "android"].includes(lp?.tgWebAppPlatform) && (
            <IconButton
              aria-label="Back"
              color="text"
              size="xs"
              colorPalette="gray"
              onClick={() => history.back()}
            >
              <LuChevronLeft size={20} />
            </IconButton>
          )}
          <Heading fontSize="2xl">{formatDate(event.date)}</Heading>
        </Flex>

        {/* Duration */}
        <Text mb={6} color="hint">
          {formatDuration(event.duration)}
        </Text>

        {/* Exercises */}
        <Box bg="sectionBg" borderRadius="xl">
          {event.exercises?.map((exercise, index) => (
            <Box key={exercise.id}>
              <Flex
                p={4}
                color={exercise.is_completed ? "text" : "hint"}
                justify="space-between"
              >
                <Text
                  textDecoration={
                    exercise.is_completed ? "none" : "line-through"
                  }
                >
                  {exercise.name}
                </Text>
                {/* Sets & Reps */}
                <Text color="hint">3x12</Text>
              </Flex>

              {index < event.exercises.length - 1 && (
                <Separator opacity={0.1} borderColor="sectionSeparator" />
              )}
            </Box>
          ))}
        </Box>
      </Flex>
    </Page>
  );
};
