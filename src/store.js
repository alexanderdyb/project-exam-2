import { create } from "zustand";

export const store = create((set, get) => ({
  venues: [],
  searchVenues: [],
  isLoading: false,
  isError: false,
  errorMessage: "",

  fetchVenues: async (url) => {
    try {
      set({ isLoading: true });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();

      set({ venues: json });
      set({ searchVenues: json });
    } catch (error) {
      set({ isError: true, errorMessage: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  // User logged in/out
  isLoggedIn: false,
}));
