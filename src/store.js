import { create } from "zustand";
import { persist } from "zustand/middleware";

export const store = create((set, get) => ({
  venues: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,

  fetchVenues: async (url) => {
    try {
      set({ isLoading: true });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();

      set({ venues: json });
    } catch (error) {
      set({ isError: true, errorMessage: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      venueManager: false,
      token: "",
      userName: "",
      login: (token, venueManager, userName) =>
        set({
          isAuthenticated: true,
          token,
          venueManager: venueManager,
          userName: userName,
        }),
      logout: () => {
        set({
          isAuthenticated: false,
          token: "",
          venueManager: false,
          userName: "",
        });
        // localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
