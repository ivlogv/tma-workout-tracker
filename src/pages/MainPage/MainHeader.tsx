import { HStack, Heading, Avatar, Badge } from "@chakra-ui/react";

export function MainHeader({
  avatarColor,
  avatarFallback,
  avatarImage,
}: {
  avatarColor: string;
  avatarFallback: string;
  avatarImage: string;
}) {
  return (
    <HStack justify="space-between" mb={6}>
      <HStack gap={2}>
        <Avatar.Root size="sm" colorPalette={avatarColor}>
          {avatarImage ? <Avatar.Image src={avatarImage} /> : <Avatar.Fallback name={avatarFallback} />}
        </Avatar.Root>
        <Heading size="lg" ml={2}>
          Привет!
        </Heading>
      </HStack>
      <Badge colorPalette="orange" variant="surface">
        🔥 5 weeks
      </Badge>
    </HStack>
  );
}
