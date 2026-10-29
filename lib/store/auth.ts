import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthUser = {
  name: string;
  email: string;
};

type AuthState = {
  user: AuthUser | null;
  hydrated: boolean;
  loggingOut: boolean;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
  markHydrated: () => void;
};

/**
 * Demo authentication state. This keeps a single browser-local session so the
 * protected storefront routes can behave realistically without a server.
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      loggingOut: false,
      signIn: (user) => set({ user, loggingOut: false }),
      signOut: () => set({ user: null, loggingOut: true }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "aurelle-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
