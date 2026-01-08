import { FC } from "react";
import { Button, Dialog } from "@chakra-ui/react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      size="xs"
      placement="center"
    >
      <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

      <Dialog.Positioner>
        <Dialog.Content
          bg="secondaryBg"
          borderRadius="2xl"
          _dark={{ bg: "sectionBg" }}
        >
          <Dialog.CloseTrigger />

          <Dialog.Header>
            <Dialog.Title fontSize="xl">{title}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <span style={{ color: "hint" }}>{message}</span>
          </Dialog.Body>

          <Dialog.Footer display="flex" flexDirection="column" gap={2}>
            <Button
              onClick={onConfirm}
              width="100%"
              padding="16px"
              borderRadius="12px"
              backgroundColor="destructiveText"
              color="#fff"
              transition="opacity 0.2s"
            >
              Reset
            </Button>

            <Button
              onClick={onClose}
              width="100%"
              padding="16px"
              borderRadius="12px"
              backgroundColor="button"
              color="buttonText"
              transition="opacity 0.2s"
            >
              Cancel
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
