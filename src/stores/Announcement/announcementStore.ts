import { create } from "zustand";
import { ReactNode } from "react";

export interface InfoAnnouncement {
  isActivated: boolean | null;
  color: string | null;
  announcementBody: ReactNode | null;
}

// Tipado del estado global
interface Announcement {
  isActivated: boolean | null;
  color: string | null;
  announcementBody: ReactNode | null;
  setAnnouncement: (
    isActivated: boolean,
    color: string,
    announcementBody?: ReactNode
  ) => void;
}

// Crear el store
export const useAnnouncement = create<Announcement>((set) => ({
  isActivated: null,
  color: null,
  announcementBody: null,
  setAnnouncement: (isActivated, color, announcementBody = null) =>
    set({
      isActivated,
      color,
      announcementBody,
    }),
}));
