import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      admin: false,
      isLoggedIn: false,
      fId: null,
      logIn: ({ user, token, admin, fId }) =>
        set({ user, token, admin, fId, isLoggedIn: true }), 
      logOut: () =>
        set({ user: null, token: null, admin: false, fId: null, isLoggedIn: false }), 
    }),
    {
      name: "auth-session", 
    }
  )
);

export default useAuthStore;
