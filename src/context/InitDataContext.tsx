// context/InitDataContext.tsx
import { createContext, useContext } from "react";
import { useInitDataSignals } from "@/hooks/useInitData";

type InitDataCtx = {
  initDataRaw?: string;
  initDataState?: ReturnType<typeof useInitDataSignals>["initDataState"];
  user: ReturnType<typeof useInitDataSignals>["user"];
  receiver: ReturnType<typeof useInitDataSignals>["receiver"];
  chat: ReturnType<typeof useInitDataSignals>["chat"];
};

const InitDataContext = createContext<InitDataCtx>({
  initDataRaw: undefined,
  initDataState: undefined,
  user: null,
  receiver: null,
  chat: null,
});

export const InitDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { initDataRaw, initDataState, user, receiver, chat } = useInitDataSignals();

  return (
    <InitDataContext.Provider value={{ initDataRaw, initDataState, user, receiver, chat }}>
      {children}
    </InitDataContext.Provider>
  );
};

export const useInitDataContext = () => useContext(InitDataContext);
