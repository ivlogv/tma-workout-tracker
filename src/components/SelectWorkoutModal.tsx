import { FC } from "react";
import { Modal, Cell, List } from "@telegram-apps/telegram-ui";
import { WorkoutTemplate, WorkoutEvent } from "@/types/workout";
import { addEvent } from "@/storage/workouts";
import { nanoid } from "nanoid";

interface SelectWorkoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: WorkoutTemplate[];
  onEventAdded: (event: WorkoutEvent) => void;
}

export const SelectWorkoutModal: FC<SelectWorkoutModalProps> = ({
  open,
  onOpenChange,
  templates,
  onEventAdded,
}) => {
  const handleSelect = (template: WorkoutTemplate) => {
    const event: WorkoutEvent = {
      id: nanoid(),
      template_id: template.id,
      date: new Date().toISOString(),
      is_completed: true,
    };

    addEvent(event);
    onEventAdded(event);
    onOpenChange(false); // закрываем модалку
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      header="Выберите тренировку"
      style={{ maxWidth: "100%", zIndex: 1000}}
      snapPoints={["40%", "70%", "100%"]}
    >
      <List>
        {templates.map((t) => (
          <Cell key={t.id} onClick={() => handleSelect(t)}>
            {t.title}
          </Cell>
        ))}
      </List>
    </Modal>
  );
};
