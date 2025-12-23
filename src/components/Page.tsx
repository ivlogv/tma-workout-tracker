import { useNavigate } from "react-router-dom";
import { backButton, useLaunchParams } from "@tma.js/sdk-react";
import { PropsWithChildren, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { Box } from "@chakra-ui/react";

export function Page({
  children,
  back = true,
  showNav = true,
}: PropsWithChildren<{
  back?: boolean;
  showNav?: boolean;
}>) {
  const navigate = useNavigate();
  const lp = useLaunchParams();

  const getMarginX = (platform?: string) => {
    if (platform === "android") return "12px";
    if (platform === "ios") return "16px";
    return "auto";
  };

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back, navigate]);

  return (
    <Box
      pb={showNav ? "72px" : "0"}
      maxW="420px"
      mx={getMarginX(lp?.tgWebAppPlatform)}
    >
      {/* Отступ под системный navbar Telegram на iOS/Android */}
      {["ios", "android"].includes(lp?.tgWebAppPlatform) && <Box h="64px" />}

      {children}

      {showNav && <BottomNav />}
    </Box>
  );
}
