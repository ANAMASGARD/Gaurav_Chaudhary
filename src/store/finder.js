import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#content/finderLocations";

const DEFAULT_LOCATION = locations.work;

const useFinderStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined || location === null) return;
        state.activeLocation = location;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useFinderStore;
