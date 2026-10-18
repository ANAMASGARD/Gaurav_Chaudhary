import { create } from "zustand";

const useWallpaperStore = create((set) => ({
  classic: false,
  toggleClassic: () => set((s) => ({ classic: !s.classic })),
}));

export default useWallpaperStore;
