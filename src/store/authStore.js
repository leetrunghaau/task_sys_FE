import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      admin: false,
      isLoggedIn: false,
      logIn: ({ user, token, admin }) =>
        set({ user, token, admin, isLoggedIn: true }),
      logOut: () =>
        set({ user: null, token: null, admin: false, isLoggedIn: false }),
    }),
    {
      name: "auth-session",
    }
  )
);

export default useAuthStore;
