import { create } from "zustand";

interface UIState {
  showNav: boolean;
  setShowNav: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  showNav: true,
  setShowNav: (value) => set({ showNav: value }),
}));
