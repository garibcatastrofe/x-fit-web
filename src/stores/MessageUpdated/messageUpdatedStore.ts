import { create } from "zustand";

interface MessageUpdated {
  msj: string;
}

interface MessageUpdatedStore {
  mensaje: MessageUpdated | null;
  setMensaje: (data: MessageUpdated) => void;
}

export const useMessageUpdated = create<MessageUpdatedStore>((set) => ({
  mensaje: null,
  setMensaje: (data: MessageUpdated) => set({ mensaje: data }),
}));
