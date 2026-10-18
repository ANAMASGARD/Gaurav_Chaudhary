import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { NOTES_STORAGE_KEY, PINNED_NOTES } from "#content/pinnedNotes";

const loadUserNotes = () => {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const useNotesStore = create(
  immer((set, get) => ({
    userNotes: loadUserNotes(),
    activeNoteId: PINNED_NOTES[0]?.id ?? null,
    persist: () => {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(get().userNotes));
    },
    setActiveNoteId: (id) =>
      set((state) => {
        state.activeNoteId = id;
      }),
    createNote: () =>
      set((state) => {
        const id = `note-${Date.now()}`;
        const note = {
          id,
          title: "New Note",
          body: "",
          pinned: false,
          updatedAt: Date.now(),
        };
        state.userNotes.unshift(note);
        state.activeNoteId = id;
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(state.userNotes));
      }),
    updateNote: (id, patch) =>
      set((state) => {
        const note = state.userNotes.find((n) => n.id === id);
        if (!note) return;
        Object.assign(note, patch, { updatedAt: Date.now() });
      }),
    deleteNote: (id) =>
      set((state) => {
        state.userNotes = state.userNotes.filter((n) => n.id !== id);
        if (state.activeNoteId === id) {
          state.activeNoteId =
            PINNED_NOTES[0]?.id ?? state.userNotes[0]?.id ?? null;
        }
      }),
    allNotes: () => {
      const { userNotes } = get();
      return [...PINNED_NOTES, ...userNotes];
    },
  }))
);

export default useNotesStore;
