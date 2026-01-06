import { forwardRef } from "react";
import {
  Switch as ChakraSwitch,
  type SwitchRootProps,
} from "@chakra-ui/react";

interface SwitchProps extends Omit<SwitchRootProps, "checked" | "onCheckedChange"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({ checked, onCheckedChange, ...rest }, ref) {
    return (
      <ChakraSwitch.Root
        checked={checked}
        onCheckedChange={(e) => onCheckedChange(e.checked)}
        cursor="pointer"
        {...rest}
      >
        <ChakraSwitch.HiddenInput ref={ref} />

        <ChakraSwitch.Control
          bg={checked ? "button" : "hint"}
        >
          <ChakraSwitch.Thumb
            bg="white"
            boxShadow="md"
          />
        </ChakraSwitch.Control>
      </ChakraSwitch.Root>
    );
  }
);
