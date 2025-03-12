import { create } from "zustand";

// Tipado del usuario
interface Usuario {
  matricula: string;
  password: string;
  usuarioId: string;
  nombre: string;
  genero: string;
}

// Tipado del estado global
interface UserStore {
  user: Usuario | null;
  token: string | null;
  setUser: (user: Usuario) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

// Crear el store
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  setUser: (user: Usuario) => set({ user }),
  setToken: (token: string) => set({ token }),
  logout: () => set({ user: null, token: null }), // Limpiar estado al hacer logout
}));
