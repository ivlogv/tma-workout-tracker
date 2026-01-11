import { FC, useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Separator,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { hapticFeedback, mainButton, useLaunchParams } from "@tma.js/sdk-react";

import { Page } from "@/components/Page";

import { loadTemplates } from "@/storage/workouts";
import { WorkoutTemplate } from "@/types/workout";

// import { useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useWorkoutStore } from "@/storage/workoutStore";
import { useNavigate } from "react-router-dom";

export const WorkoutSelectPage: FC = () => {
  const navigate = useNavigate();
  const { startWorkout } = useWorkoutStore();
  const lp = useLaunchParams();

  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setTemplates(loadTemplates());
    mainButton?.setParams({
      text: "Add new workout",
      hasShineEffect: false,
    });
  }, [location.pathname]);

  const handleSelect = (id: string) => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("light");
    }
    setSelected(id);

    mainButton?.setParams({
      text: "Начать тренировку",
      hasShineEffect: true,
    });
  };

  const handleStart = useCallback(() => {
    if (!selected) {
      navigate("/templates/add");
      return;
    }

    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("medium");
    }

    startWorkout(selected);
    navigate("/workout/active");
  }, [selected, navigate]);

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
          <Heading fontSize="2xl">Choose workout</Heading>
        </Flex>

        {/* Templates List */}
        <Box flex="1" bg="sectionBg" borderRadius="xl">
          {templates.map((t, index) => (
            <Box key={t.id}>
              <Flex
                as="button"
                w="100%"
                p={4}
                align="center"
                justify="space-between"
                _active={{ opacity: 0.7 }}
                onClick={() => handleSelect(t.id)}
              >
                <Flex direction="column" align="flex-start">
                  <Text
                    fontWeight="medium"
                    color={selected === t.id ? "button" : "text"}
                  >
                    {t.title}
                  </Text>
                  {t.description && (
                    <Text fontSize="sm" color="hint">
                      {t.description}
                    </Text>
                  )}
                </Flex>

                <Icon
                  as={LuChevronRight}
                  boxSize={5}
                  color={selected === t.id ? "button" : "hint"}
                />
              </Flex>

              {index < templates.length - 1 && (
                <Separator opacity={0.1} borderColor="sectionSeparator" />
              )}
            </Box>
          ))}
        </Box>

        {/* Start Button */}
        {!["ios", "android"].includes(lp?.tgWebAppPlatform) && (
          <Button
            onClick={handleStart}
            bg="button"
            color="buttonText"
            borderRadius="xl"
            py={6}
            mt={4}
            _active={{ opacity: 0.7 }}
            _hover={{ opacity: 0.9 }}
            fontSize="lg"
          >
            {selected ? "Start Workout" : "Add new"}
          </Button>
        )}
      </Flex>
    </Page>
  );
};
