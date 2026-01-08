import { FC, useEffect, useState } from "react";
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
import { type WorkoutEvent } from "@/types/workout";

import { formatDate, formatDuration } from "@/utils/format";
import { LuChevronLeft } from "react-icons/lu";
import { useLaunchParams } from "@tma.js/sdk-react";

export const WorkoutHistory: FC = () => {
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const lp = useLaunchParams();

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const workouts = events.filter((e) => e.is_completed);

  if (workouts.length === 0) {
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
            <Text color="hint">No workouts yet</Text>
          </Flex>
        </Flex>
      </Page>
    );
  }

  return (
    <Page back>
      <Flex direction="column" color="text">
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
          <Heading fontSize="2xl">History</Heading>
        </Flex>

        {/* List */}
        <Box bg="sectionBg" borderRadius="xl">
          {workouts.map((workout, index) => (
            <Box key={workout.id}>
              <Flex
                as="button"
                w="100%"
                p={4}
                align="center"
                justify="space-between"
                _active={{ opacity: 0.7 }}
                onClick={() => {
                  // переход на страницу тренировки
                  window.location.hash = `/history/${workout.id}`;
                }}
              >
                <Text>{formatDate(workout.date)}</Text>

                <Text color="hint">{formatDuration(workout.duration)}</Text>
              </Flex>

              {index < workouts.length - 1 && (
                <Separator opacity={0.1} borderColor="sectionSeparator" />
              )}
            </Box>
          ))}
        </Box>
      </Flex>
    </Page>
  );
};
