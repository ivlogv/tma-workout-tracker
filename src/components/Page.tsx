import { useNavigate } from "react-router-dom";
import { backButton, useLaunchParams } from "@tma.js/sdk-react";
import { PropsWithChildren, useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1],}}
      style={{ height: "100%" }}
    >
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
    </motion.div>
  );
}
