import { create } from "zustand";

interface AuthState {
  phone: string | null;
  login: (phone: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phone: typeof window !== "undefined" ? localStorage.getItem("phone") : null,
  login: (phone) => {
    localStorage.setItem("phone", phone);
    set({ phone });
  },
  logout: () => {
    localStorage.removeItem("phone");
    set({ phone: null });
  },
}));
