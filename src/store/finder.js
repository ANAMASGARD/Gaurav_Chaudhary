import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#content/finderLocations";

const DEFAULT_LOCATION = locations.work;

const useFinderStore = create(
  immer((set, get) => ({
    activeLocation: DEFAULT_LOCATION,
    history: [DEFAULT_LOCATION],
    historyIndex: 0,
    viewMode: "grid",
    query: "",
    selectedId: null,

    navigate: (location) =>
      set((state) => {
        if (location === undefined || location === null) return;
        const truncated = state.history.slice(0, state.historyIndex + 1);
        truncated.push(location);
        state.history = truncated;
        state.historyIndex = truncated.length - 1;
        state.activeLocation = location;
        state.query = "";
        state.selectedId = null;
      }),

    setActiveLocation: (location) => {
      get().navigate(location);
    },

    goBack: () =>
      set((state) => {
        if (state.historyIndex <= 0) return;
        state.historyIndex -= 1;
        state.activeLocation = state.history[state.historyIndex];
        state.query = "";
        state.selectedId = null;
      }),

    goForward: () =>
      set((state) => {
        if (state.historyIndex >= state.history.length - 1) return;
        state.historyIndex += 1;
        state.activeLocation = state.history[state.historyIndex];
        state.query = "";
        state.selectedId = null;
      }),

    setViewMode: (viewMode) =>
      set((state) => {
        state.viewMode = viewMode;
      }),

    setQuery: (query) =>
      set((state) => {
        state.query = query;
      }),

    select: (id) =>
      set((state) => {
        state.selectedId = id;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
        state.history = [DEFAULT_LOCATION];
        state.historyIndex = 0;
        state.query = "";
        state.selectedId = null;
      }),
  }))
);

export const finderCanGoBack = (state) => state.historyIndex > 0;
export const finderCanGoForward = (state) => state.historyIndex < state.history.length - 1;

export default useFinderStore;
