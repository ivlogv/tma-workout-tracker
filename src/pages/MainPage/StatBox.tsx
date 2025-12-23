import { Card, Text, HStack, Icon } from "@chakra-ui/react";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";

export function StatBox({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  const numericDelta = parseFloat(delta.replace(/[^0-9.-]/g, "")); // убираем лишние символы
  const isPositive = numericDelta > 0;

  return (
    <Card.Root p={2} px={4} borderRadius="lg" bg="secondaryBg" borderColor="bg">
      <Text fontSize="sm" color="hint" mb={1}>
        {label}
      </Text>
      <HStack justify="normal" gap={4}>
        <Text fontWeight="bold" fontSize="lg" color="text">
          {value}
        </Text>
        <HStack color={isPositive ? "green" : "red"} gap={0}>
          <Icon size="xs">
            {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
          </Icon>
          <Text fontSize="xs" mb={0.5}>
            {delta}
          </Text>
        </HStack>
      </HStack>
    </Card.Root>
  );
}
