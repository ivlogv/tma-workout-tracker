import { FC, useEffect, useState } from "react";
import { hapticFeedback, initData, useSignal } from "@tma.js/sdk-react";
import { LuChevronLeft } from "react-icons/lu";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
//   Separator,
} from "@chakra-ui/react";

import { Page } from "@/components/Page";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Switch } from "@/components/ui/switch";

import { loadTemplates, loadEvents } from "@/storage/workouts";
import { WorkoutTemplate, WorkoutEvent } from "@/types/workout";

export const Settings: FC = () => {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const [reminders, setReminders] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Загружаем данные (если нужно)
  useEffect(() => {
    setTemplates(loadTemplates());
    setEvents(loadEvents());
    console.log("--------------");
    console.log("initDataRaw", initDataRaw);
    console.log("initDataState", initDataState);
    console.log("templates", templates);
    console.log("events", events);
    console.log("--------------");
  }, []);

  const userName = initDataState?.user?.first_name || "User";

  const handleReset = () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.notificationOccurred("warning");
    }
    setShowConfirm(true);
  };

  const confirmReset = () => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.notificationOccurred("success");
    }

    // Полный сброс локальных данных
    localStorage.removeItem("workout_templates");
    localStorage.removeItem("workout_events");

    setTemplates([]);
    setEvents([]);
    setShowConfirm(false);
  };

  return (
    <Page back showNav={false}>
      <Flex direction="column" color="text">
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
          <Heading fontSize="2xl">Settings</Heading>
        </Flex>

        {/* User Name */}
        <Text mb={8} color="hint">
          {userName}
        </Text>
        {/* Добавить Avatar c картинкой пользователя */}

        {/* Settings List */}
        <Box mb={8} bg="sectionBg" borderRadius="xl">
          <Flex align="center" justify="space-between" p={4} gap={2}>
            <Text>Reminders</Text>

            <Switch
              checked={reminders}
              onCheckedChange={() => {
                if (hapticFeedback.isSupported()) {
                  hapticFeedback.impactOccurred("light");
                }
                setReminders((v) => !v);
              }}
            />
          </Flex>

          {/* <Separator opacity={0.1} borderColor="sectionSeparator" /> */}
        </Box>

        {/* Reset Progress */}
        <Button
          variant="ghost"
          color="destructiveText"
          onClick={handleReset}
          _active={{ opacity: 0.7 }}
        >
          Reset progress
        </Button>

        {/* Confirm Modal */}
        <ConfirmModal
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={confirmReset}
          title="Reset progress?"
          message="This will delete all workout history. This action cannot be undone."
        />
      </Flex>
    </Page>
  );
};
