import { FC } from "react";
import { Section, Cell, Avatar, Badge } from "@telegram-apps/telegram-ui";
import { useInitDataContext } from "@/context/InitDataContext";

export const IndexHeader: FC = () => {
  const { user } = useInitDataContext();
  const name = user?.first_name ?? user?.username ?? "Friend";

  const avatarFallback = `${user?.first_name ?? "User"} ${user?.last_name ?? ""}`;
  const avatarImage = user?.photo_url ?? "";

  return (
    <Section style={{
      margin: "16px 0"
    }}>
      <Cell
        before={
          <Avatar
            size={28}
            src={avatarImage || undefined}
            fallbackIcon={avatarFallback}
          />
        }
        after={
          <Badge type="number" mode="secondary">
            🔥 5 weeks
          </Badge>
        }
      >
        Привет, {name}!
      </Cell>
    </Section>
  );
};
