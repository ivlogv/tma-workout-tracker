"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { system } from "@/components/theme";
import { miniApp, useSignal, themeParams } from "@tma.js/sdk-react";
// import { RegisterProvider } from "./RegisterProvider";
// import { WorkoutProvider } from "./WorkoutProvider";

export function Provider(props: ColorModeProviderProps) {
  const tp = themeParams.state();
  console.log(tp.children);
  const isDark = useSignal(miniApp.isDark);
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} forcedTheme={isDark ? "dark" : "light"}>
        {/* <RegisterProvider> */}
        {/* <WorkoutProvider> */}
        {/* {props.children} */}
        {/* </WorkoutProvider> */}
        {/* </RegisterProvider> */}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
