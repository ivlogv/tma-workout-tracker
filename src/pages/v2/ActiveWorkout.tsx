import { FC, useEffect } from "react";
import { hapticFeedback, mainButton, useLaunchParams } from "@tma.js/sdk-react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  VStack,
  Separator,
  IconButton,
} from "@chakra-ui/react";
import { LuCheck, LuChevronLeft } from "react-icons/lu";

import { Page } from "@/components/Page";
import { useWorkoutStore } from "@/storage/workoutStore";
import { useNavigate } from "react-router-dom";

export const ActiveWorkout: FC = () => {
  const { activeEvent, templates, toggleExercise, finishWorkout } =
    useWorkoutStore();
  const lp = useLaunchParams();
  const navigate = useNavigate();

  useEffect(() => {
      mainButton?.setParams({
        text: "Finish",
        hasShineEffect: false,
      });
    }, []);

  const handleFinish = () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("medium");
    }

    finishWorkout();
    navigate("/");
  };

  if (!activeEvent) {
    return (
      <Page back showNav>
        <Flex direction="column" minH="100%" color="text">
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
            <Heading fontSize="2xl">No active workout</Heading>
          </Flex>
          <Text color="hint">Start a new workout from the main screen.</Text>
        </Flex>
      </Page>
    );
  }

  const template = templates.find((t) => t.id === activeEvent.template_id);

  if (!template) {
    return (
      <Page back showNav={false}>
        <Flex direction="column" minH="100%" color="text">
          {/* Header */}
          <Flex align="center" gap={2} mb={6}>
            <IconButton
              aria-label="Back"
              color="text"
              size="xs"
              colorPalette="gray"
              onClick={() => history.back()}
            >
              <LuChevronLeft size={20} />
            </IconButton>
            <Heading fontSize="2xl">Template not found</Heading>
          </Flex>
        </Flex>
      </Page>
    );
  }

  const completedCount = activeEvent.exercises.filter(
    (e) => e.is_completed
  ).length;
  const progress = Math.round(
    (completedCount / activeEvent.exercises.length) * 100
  );

  return (
    <Page back showNav={false}>
      <Flex direction="column" minH="100%" color="text">
        {/* Header */}
        <Flex align="center" gap={2} mb={6}>
          <IconButton
            aria-label="Back"
            color="text"
            size="xs"
            colorPalette="gray"
            onClick={() => history.back()}
          >
            <LuChevronLeft size={20} />
          </IconButton>
          <Heading fontSize="2xl">{template.title}</Heading>
        </Flex>

        {/* Progress bar */}
        <Box mb={8}>
          <Box h="8px" borderRadius="full" overflow="hidden" bg="sectionBg">
            <Box
              h="100%"
              transition="width 0.3s"
              bg="button"
              width={`${progress}%`}
            />
          </Box>
        </Box>

        {/* Exercises */}
        <VStack
          align="stretch"
          gap={0}
          flex="1"
          bg="sectionBg"
          borderRadius="xl"
        >
          {activeEvent.exercises.map((ex, index) => (
            <Box key={ex.id}>
              <Flex
                key={ex.id}
                as="button"
                onClick={() => {
                  if (hapticFeedback.isSupported()) {
                    hapticFeedback.impactOccurred("light");
                  }
                  toggleExercise(ex.id);
                }}
                w="100%"
                p={4}
                align="center"
                justify="space-between"
                _active={{ opacity: 0.7 }}
              >
                <Text>{ex.name}</Text>
                {ex.is_completed && (
                  <Icon as={LuCheck} boxSize={5} color="button" />
                )}
              </Flex>
              {index < activeEvent.exercises.length - 1 && (
                <Separator opacity={0.1} borderColor="sectionSeparator" />
              )}
            </Box>
          ))}
        </VStack>

        {!["ios", "android"].includes(lp?.tgWebAppPlatform) && (
          <Button
            mt={6}
            w="100%"
            borderRadius="xl"
            py={6}
            bg="button"
            color="buttonText"
            _active={{ opacity: 0.7 }}
            onClick={handleFinish}
          >
            Finish
          </Button>
        )}
      </Flex>
    </Page>
  );
};
