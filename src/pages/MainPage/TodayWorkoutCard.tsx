import { Box, HStack, Text, Icon, Card, Button } from "@chakra-ui/react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function TodayWorkoutCard({ todayWorkout }: { todayWorkout: any }) {
  const navigate = useNavigate();

  return (
    <Box mb={6}>
      <HStack justify="space-between" pr={2} color="accentText">
        <Text fontSize="md" fontWeight="semibold" mb={2} px={2}>
          Сегодня
        </Text>
        <Icon mb={2}>
          <FiCalendar />
        </Icon>
      </HStack>

      <Card.Root
        borderRadius="lg"
        border="none"
        bg="sectionBg"
        overflow="hidden"
        borderTop="none"
      >
        <Card.Header
          p={2}
          bg="sectionBg"
          borderBottom="1px solid"
          // borderBottomColor="bg"
          borderTopRadius="lg"
          // _hover={{ bg: "headerBg", borderColor: "headerBg" }}
          // _active={{ bg: "headerBg", borderColor: "headerBg" }}
          onClick={() => navigate("/add")}
        >
          <HStack justify="space-between" mx={4} color="hint">
            <Text fontSize="md">Добавить</Text>
            <Icon>
              <FiPlus />
            </Icon>
          </HStack>
        </Card.Header>
        <Card.Body bg="sectionBg" p={4} pt={2}>
          <Card.Title fontWeight="medium" mb={2} color="text">
            {todayWorkout?.title || "Нет тренировки на сегодня"}
          </Card.Title>
          <Card.Description>{ todayWorkout?.description }</Card.Description>
        </Card.Body>
        <Card.Footer bg="sectionBg" p={2}>
          {todayWorkout && (
            <Button size="sm" color="buttonText" w="100%">
              Начать тренировку
            </Button>
          )}
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
