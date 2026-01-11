import { FC, useEffect, useState, useCallback } from "react";
import {
  Box,
  Flex,
  Input,
  Textarea,
  Field,
  VStack,
  HStack,
  Button,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { mainButton, useLaunchParams } from "@tma.js/sdk-react";

import { Page } from "@/components/Page";
import { addTemplate, saveExercises } from "@/storage/workouts";
import { useNavigate } from "react-router-dom";
import { LuChevronLeft, LuPlus } from "react-icons/lu";

export const WorkoutTemplateCreate: FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseInput, setExerciseInput] = useState("");
  const [localExercises, setLocalExercises] = useState<{ name: string }[]>([]);
  const lp = useLaunchParams();

  const isValid = title.trim().length > 0 && localExercises.length > 0;

  const addExercise = () => {
    if (!exerciseInput.trim()) return;

    setLocalExercises((prev) => [...prev, { name: exerciseInput.trim() }]);
    setExerciseInput("");
  };

  const handleSave = useCallback(() => {
    const templateId = uuid();

    const template = {
      id: templateId,
      title: title.trim(),
      description: description.trim() || null,
    };

    const exercises = localExercises.map((ex, index) => ({
      id: uuid(),
      template_id: templateId,
      name: ex.name,
      order: index,
      is_completed: false,
    }));

    addTemplate(template);
    saveExercises(exercises);

    navigate("/workouts/select");
  }, [title, description, localExercises, navigate]);

  useEffect(() => {
    if (!mainButton) return;

    if (!isValid) {
      mainButton.hide();
      return;
    }

    mainButton.setParams({
      text: "Сохранить",
      isVisible: true,
    });

    const handler = () => handleSave();
    mainButton.onClick(handler);

    return () => mainButton.offClick(handler);
  }, [isValid, handleSave]);

  return (
    <Page back>
      <Flex direction="column" color="text" pb={6}>
        {/* Header */}
        <Flex align="center" gap={2} mb={6}>
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
          <Heading fontSize="28px" fontWeight="600">
            Новая тренировка
          </Heading>
        </Flex>

        <VStack align="stretch" gap={5}>
          {/* Основная карточка */}
          <Flex
            direction="column"
            gap={4}
            bg="sectionBg"
            p={4}
            borderRadius="xl"
          >
            <Field.Root>
              <Field.Label color="hint" fontSize="14px">
                Название тренировки
              </Field.Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Грудь + Трицепс"
                borderRadius="xl"
                fontSize="16px"
                py={6}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color="hint" fontSize="14px">
                Описание
              </Field.Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Необязательно"
                borderRadius="xl"
                fontSize="16px"
                py={4}
              />
            </Field.Root>
          </Flex>

          {/* Добавление упражнения */}
          <Box bg="sectionBg" p={4} borderRadius="xl">
            <Field.Root w="100%">
              <Field.Label color="hint" fontSize="14px">
                Добавить упражнение
              </Field.Label>

              <HStack w="100%" mt={2}>
                <Input
                  placeholder="Например: Жим лёжа"
                  value={exerciseInput}
                  onChange={(e) => setExerciseInput(e.target.value)}
                  borderRadius="xl"
                  fontSize="16px"
                  py={6}
                />
                <Button
                  onClick={addExercise}
                  borderRadius="xl"
                  px={4}
                  py={0}
                  height="50px"
                  fontSize="20px"
                  bg="button"
                  color="buttonText"
                >
                  <LuPlus />
                </Button>
              </HStack>
            </Field.Root>

            <VStack align="stretch" mt={4} gap={2}>
              {localExercises.map((ex, i) => (
                <Box key={i} p={3} borderRadius="xl" bg="bg" fontSize="16px">
                  {ex.name}
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Primary Action (для desktop) */}
          {!["ios", "android"].includes(lp?.tgWebAppPlatform) && (
            <Button
              onClick={handleSave}
              bg="button"
              color="buttonText"
              borderRadius="xl"
              py={6}
              mt={2}
              fontSize="18px"
              _active={{ opacity: 0.7 }}
              _hover={{ opacity: 0.9 }}
            >
              Сохранить
            </Button>
          )}
        </VStack>
      </Flex>
    </Page>
  );
};
