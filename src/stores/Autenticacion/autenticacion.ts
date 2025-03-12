import { create } from "zustand";
import { PORT } from '../../api/PORT'

interface AuthState {
  user: { id: number } | null;
  fetchUser: () => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  fetchUser: async () => {
    try {
      const response = await fetch(
        PORT + "/api/v1/usuario-verify",
        {
          method: "GET",
          credentials: "include", // Esto permite que el navegador envíe las cookies
        }
      );

      const data = await response.json();
      if (response.ok) {
        set({ user: { id: data.id } });
        return true;
      } else {
        set({ user: null });
        return false;
      }
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      set({ user: null });
      return false;
    }
  },

  logout: () => {
    fetch(PORT + "/api/v1/usuario-logout", {
      method: "POST",
      credentials: "include",
    });
    set({ user: null });
  },
}));
