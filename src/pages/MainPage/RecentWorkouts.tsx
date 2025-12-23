import { Box, HStack, Text, Icon, VStack, Flex } from "@chakra-ui/react";
import { FiClock, FiChevronRight } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function RecentWorkouts({ recentWorkouts }: { recentWorkouts: any[] }) {
  const navigate = useNavigate();

  return (
    <Box mb={6}>
      <HStack justify="space-between" pr={2} color="accentText">
        <Text fontSize="md" fontWeight="semibold" mb={2} px={2}>
          Последние тренировки
        </Text>
        <Icon mb={2}>
          <FiClock />
        </Icon>
      </HStack>

      <VStack align="stretch" bg="sectionBg" borderRadius="lg" gap={0}>
        {recentWorkouts.map((w, i) => (
          <Flex
            key={w.id}
            justify="space-between"
            align="center"
            _hover={{ bg: "sectionBg" }}
            _active={{ bg: "sectionBg" }}
            borderBottom="1px solid"
            borderBottomColor="secondaryBg"
            borderTopRadius={i === 0 ? "lg" : "none"}
            p={4}
          >
            <Box px={2}>
              <Text fontWeight="semibold" color="text">
                {w.title}
              </Text>
              <HStack gap={4} fontSize="xs" color="hint">
                <Text>{w.date}</Text>
                <HStack gap={1}>
                  <Icon as={FiClock} />
                  <Text>30 min</Text>
                </HStack>
                <HStack gap={1}>
                  <Icon>
                    <FaFire />
                  </Icon>
                  <Text>330 kcal</Text>
                </HStack>
              </HStack>
            </Box>
            <Icon color="gray.300" boxSize={6}>
              <FiChevronRight />
            </Icon>
          </Flex>
        ))}

        <Flex
          justify="center"
          align="center"
          p={2}
          borderBottomRadius="lg"
          cursor="pointer"
          _hover={{ bg: "sectionBg" }}
          _active={{ bg: "sectionBg" }}
          onClick={() => navigate("/history")}
        >
          <HStack gap={2} color="hint">
            <Text fontSize="sm">Вся история</Text>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
}
