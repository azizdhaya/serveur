import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user.types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (p: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => void;
  setAccessToken: (t: string) => void;
  setUser: (u: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setAuth: ({ accessToken, refreshToken, user }) =>
        set({ accessToken, refreshToken, user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      logout: () =>
        set({ accessToken: null, refreshToken: null, user: null }),
    }),
    { name: "pv-auth" }
  )
);
