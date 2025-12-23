"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { system } from "@/components/theme";
// import { RegisterProvider } from "./RegisterProvider";
// import { WorkoutProvider } from "./WorkoutProvider";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props}>
        {/* <RegisterProvider> */}
          {/* <WorkoutProvider> */}
            {/* {props.children} */}
            {/* </WorkoutProvider> */}
        {/* </RegisterProvider> */}
      </ColorModeProvider>
    </ChakraProvider>
  );
}