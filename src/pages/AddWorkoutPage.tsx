import { FC, useState, useEffect } from "react";
import { Page } from "@/components/Page";
import { Section, Input, List } from "@telegram-apps/telegram-ui";
// import { addTemplate } from "@/storage/workouts";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { mainButton } from "@tma.js/sdk-react";
import { useWorkoutStore } from "@/hooks/useWorkoutStore";

export const AddWorkoutPage: FC = () => {
  const navigate = useNavigate();

  const { addTemplate } = useWorkoutStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Управление MainButton
  useEffect(() => {
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
      alert("Тренировка добавлена!");
      navigate("/");
    };

    mainButton.onClick(handleClick);
    return () => {
      mainButton.offClick(handleClick);
    };
  }, [title, description, navigate, addTemplate]);

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
        </Section>
        <Section header="Описание">
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
