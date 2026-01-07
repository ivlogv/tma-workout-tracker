import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import { miniApp, useLaunchParams, useSignal } from "@tma.js/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { routes } from "@/navigation/routes.tsx";
import { InitDataProvider } from "@/context/InitDataContext";
import { Provider } from "@/components/ui/provider";
// import { useEffect } from "react";
// import { loadMockData } from "@/hooks/mock";
import { useUIStore } from "@/hooks/useUIStore";
import { BottomNav } from "./BottomNav";
import { AnimatePresence } from "framer-motion";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const showNav = useUIStore((s) => s.showNav);

  return (
    <InitDataProvider>
      <AppRoot
        appearance={isDark ? "dark" : "light"}
        platform={
          ["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"
        }
      >
        <Provider>
          <HashRouter>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Глобальный навбар */}
            <AnimatePresence mode="wait">
              {showNav && <BottomNav key="bottom-nav" />}
            </AnimatePresence>
          </HashRouter>
        </Provider>
      </AppRoot>
    </InitDataProvider>
  );
}
