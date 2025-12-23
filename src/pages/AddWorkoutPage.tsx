import { FC, useState, useEffect } from "react";
import { Page } from "@/components/Page";
import { Section, Input, List } from "@telegram-apps/telegram-ui";
import { addTemplate } from "@/storage/workouts";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { mainButton } from "@tma.js/sdk-react";

export const AddWorkoutPage: FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Управление MainButton
  useEffect(() => {
    // if (!window.Telegram?.WebApp) return;

    // const tg = window.Telegram.WebApp;

    mainButton.setParams({
      text: "Добавить",
      isVisible: true,
      isEnabled: title.trim().length > 0,
    });

    const handleClick = () => {
      if (title.trim().length === 0) return;

      addTemplate({
        id: nanoid(),
        title: title.trim(),
        description: description.trim() || null,
      });

      mainButton.hide();
      navigate("/");
    };

    mainButton.onClick(handleClick);
    return () => {
      mainButton.offClick(handleClick);
    };
  }, [title, description, navigate]);

  return (
    <Page back>
      <List>
        <Section header="Новая тренировка">
            <Input
              placeholder="Название тренировки"
              value={title}
              status="focused"
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              placeholder="Описание (необязательно)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
        </Section>
      </List>
    </Page>
  );
};
