import { create } from "zustand";

interface ModalFilterData {
  perPage: number;
  page: number;
  order?: string;
  orderBy?: string;
  eqAtribute?: string;
  atribute?: string;
}

interface FilterModalStore {
  modalFilter: ModalFilterData | null;
  setModalFilter: (data: ModalFilterData) => void;
}

export const useFilterModal = create<FilterModalStore>((set) => ({
  modalFilter: { perPage: 10, page: 0, order: "desc", orderBy: "id", eqAtribute: "", atribute: "" },
  setModalFilter: (data: ModalFilterData) => set({ modalFilter: data }),
}));
