import { useNavigate } from "react-router-dom";
import { backButton, useLaunchParams } from "@tma.js/sdk-react";
import { PropsWithChildren, useEffect } from "react";
// import { BottomNav } from "./BottomNav";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useUIStore } from "@/hooks/useUIStore";

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

  const setShowNav = useUIStore((s) => s.setShowNav);
  useEffect(() => {
    setShowNav(showNav);
  }, [showNav]);

  const getMarginX = (platform?: string) => {
    if (platform === "android") return "12px";
    if (platform === "ios") return "16px";
    return "auto";
  };

  const navItems = ["#/history", "#/theme-params", "#/settings"];
  useEffect(() => {
    // if (!backButton.isMounted) return;
    const path = location.hash;

    if (back) {
      // backButton.show();
      // return backButton.onClick(() => {
      //   navigate(-1);
      // });

      // if (path === "/") {
      //   backButton.show();
      //   const handler = () => miniApp.close();
      //   backButton.onClick(handler);
      //   return () => backButton.offClick(handler);
      // }
      let handler: () => void;
      if (navItems.includes(path)) {
        backButton.show();
        handler = () => (window.location.hash = "#/");
        
      } else {
        backButton.show();
        handler = () => navigate(-1);
      }
      backButton.onClick(handler);
      return () => backButton.offClick(handler);
    }
    backButton.hide();
  }, [location.pathname, back, navigate]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{
          duration: 0.25,
          ease: [0.22, 0.61, 0.36, 1],
        }}
        style={{ height: "100%", paddingBottom: showNav ? "72px" : "0" }}
      >
        <Box
          pb={showNav ? "72px" : "0"}
          maxW="420px"
          mx={getMarginX(lp?.tgWebAppPlatform)}
        >
          {/* Отступ под системный navbar Telegram на iOS/Android */}
          {["ios", "android"].includes(lp?.tgWebAppPlatform) && (
            <Box h="84px" />
          )}

          {children}
        </Box>
      </motion.div>
      {/* {showNav && <BottomNav />} */}
    </>
  );
}
