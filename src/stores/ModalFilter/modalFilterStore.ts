import { create } from "zustand";

export interface ModalFilterData {
  perPage: number;
  page: number;
  order?: string;
  orderBy?: string;
  eqAtribute?: string;
  atribute?: string;
  checkFilters?: boolean;
  filters?: {
    campo: string;
    operador: "=" | "!=" | "<" | "<=" | ">" | ">=";
    valor: string | number;
  }[];
}

interface FilterModalStore {
  modalFilter: ModalFilterData | null;
  setModalFilter: (data: ModalFilterData) => void;
}

export const useFilterModal = create<FilterModalStore>((set) => ({
  modalFilter: {
    perPage: 10,
    page: 1,
    order: "desc",
    orderBy: "id",
    eqAtribute: "",
    atribute: "",
    checkFilters: false,
    filters: [],
  },
  setModalFilter: (data: ModalFilterData) => set({ modalFilter: data }),
}));
