import { create } from "zustand";

export const store = create((set, get) => ({
  venues: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  isInitialLoad: true,

  fetchVenues: async (url, callback) => {
    if (get().isInitialLoad) {
      set({ isLoading: true });
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const json = await response.json();

      const currentVenues = get().venues;

      set({ venues: [...currentVenues, ...json] });

      if (callback) {
        callback(json.length);
      }
      set({ isInitialLoad: false });
    } catch (error) {
      set({ isError: true, errorMessage: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  // User logged in/out
  isLoggedIn: false,
}));
