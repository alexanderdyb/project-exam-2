import { create } from "zustand";

export const store = create((set) => ({
  venues: [],
  isLoading: false,
  isError: false,
  errorMessage: "",

  fetchVenues: async (url) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    try {
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
