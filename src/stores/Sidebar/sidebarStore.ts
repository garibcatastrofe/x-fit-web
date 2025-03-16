import { create } from "zustand";

interface SideStore {
  expanded: boolean;
  setExpanded: (data: boolean) => void;
}

export const useSide = create<SideStore>((set) => ({
  expanded: true,
  setExpanded: (data: boolean) => set({ expanded: data }),
}));
