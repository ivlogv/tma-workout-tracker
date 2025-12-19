// hooks/useInitDataSignals.ts
import { useMemo } from "react";
import { initData, useSignal } from "@tma.js/sdk-react";

export function useInitDataSignals() {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);

  const user = useMemo(() => initDataState?.user ?? null, [initDataState]);
  const receiver = useMemo(() => initDataState?.receiver ?? null, [initDataState]);
  const chat = useMemo(() => initDataState?.chat ?? null, [initDataState]);

  return {
    initDataRaw,
    initDataState,
    user,
    receiver,
    chat,
  };
}
