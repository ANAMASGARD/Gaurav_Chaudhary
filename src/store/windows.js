import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const INITIAL_Z_INDEX = 1000;

export const WINDOW_IDS = [
  "finder",
  "contact",
  "resume",
  "safari",
  "photos",
  "terminal",
  "notes",
  "txtfile",
  "imgfile",
];

const emptyWindow = () => ({
  isOpen: false,
  zIndex: INITIAL_Z_INDEX,
  minimized: false,
  maximized: false,
  data: null,
});

const useWindowStore = create(
  immer((set) => ({
    windows: Object.fromEntries(WINDOW_IDS.map((id) => [id, emptyWindow()])),
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.minimized = false;
        win.zIndex = state.nextZIndex;
        if (data !== null) win.data = data;
        state.nextZIndex += 1;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.minimized = false;
        win.maximized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen) return;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }),
    toggleWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        if (win.isOpen && !win.minimized) {
          win.isOpen = false;
          win.minimized = false;
          win.maximized = false;
          win.zIndex = INITIAL_Z_INDEX;
          win.data = windowKey === "txtfile" || windowKey === "imgfile" ? null : win.data;
        } else if (win.isOpen && win.minimized) {
          win.minimized = false;
          win.zIndex = state.nextZIndex;
          state.nextZIndex += 1;
        } else {
          win.isOpen = true;
          win.minimized = false;
          win.zIndex = state.nextZIndex;
          state.nextZIndex += 1;
        }
      }),
    minimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win?.isOpen) return;
        win.minimized = true;
      }),
    maximizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win?.isOpen) return;
        win.maximized = !win.maximized;
        win.minimized = false;
      }),
  }))
);

export default useWindowStore;
