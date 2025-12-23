import { Box, HStack, Text, Icon, SimpleGrid } from "@chakra-ui/react";
import { FiBarChart2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StatBox } from "./StatBox";

export function WeeklyProgress() {
  const navigate = useNavigate();

  return (
    <Box p={0} mb={6} borderRadius="lg" onClick={() => navigate("/history")}>
      <HStack justify="space-between" pr={2} color="accentText">
        <Text fontSize="md" fontWeight="semibold" mb={2} px={2}>
          Прогресс за неделю
        </Text>
        <Icon mb={2}>
          <FiBarChart2 />
        </Icon>
      </HStack>
      <SimpleGrid
        columns={2}
        gap={2}
        bg="sectionBg"
        p={4}
        borderRadius="lg"
        _hover={{ bg: "hint" }}
        _active={{ bg: "hint" }}
      >
        <StatBox label="Объём" value="371 кг" delta="+12%" />
        <StatBox label="Сила" value="86" delta="+4" />
        <StatBox label="Длительность" value="2ч 6м" delta="+131%" />
        <StatBox label="Рекорды" value="5" delta="+4" />
      </SimpleGrid>
    </Box>
  );
}
