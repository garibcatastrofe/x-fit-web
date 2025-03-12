import { create } from "zustand";
import { ReactNode } from "react";

export interface InfoModal {
  isActivated: boolean | null;
  modalTitle: string | null;
  modalBody: ReactNode | null;
}

// Tipado del estado global
interface Modal {
  isActivated: boolean | null;
  modalTitle: string | null;
  modalBody: ReactNode | null;
  setModal: (
    isActivated: boolean,
    modalTitle?: string,
    modalBody?: ReactNode
  ) => void;
}

// Crear el store
export const useModal = create<Modal>((set) => ({
  isActivated: null,
  modalTitle: null,
  modalBody: null,
  setModal: (isActivated, modalTitle, modalBody = null) =>
    set({
      isActivated,
      modalTitle,
      modalBody,
    }),
}));
