import WindowControls from "#components/WindowControls";
import { PINNED_NOTES } from "#content/pinnedNotes";
import WindowWrapper from "#hoc/WindowWrapper";
import useNotesStore from "#store/notes";
import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";

const Notes = () => {
  const userNotes = useNotesStore((s) => s.userNotes);
  const activeNoteId = useNotesStore((s) => s.activeNoteId);
  const setActiveNoteId = useNotesStore((s) => s.setActiveNoteId);
  const createNote = useNotesStore((s) => s.createNote);
  const updateNote = useNotesStore((s) => s.updateNote);
  const deleteNote = useNotesStore((s) => s.deleteNote);
  const persist = useNotesStore((s) => s.persist);

  const allNotes = useMemo(() => [...PINNED_NOTES, ...userNotes], [userNotes]);
  const active = allNotes.find((n) => n.id === activeNoteId) ?? allNotes[0];
  const isPinned = active?.pinned === true;

  const persistTimer = useRef(null);
  useEffect(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => persist(), 400);
    return () => clearTimeout(persistTimer.current);
  }, [userNotes, persist]);

  return (
    <>
      <div id="window-header" className="window-drag-handle">
        <WindowControls target="notes" />
        <h2>Notes</h2>
      </div>
      <div className="notes-layout mac-window-body bg-neutral-900 text-white min-h-0">
        <aside className="notes-sidebar">
          <button type="button" className="notes-new-btn" onClick={createNote}>
            New Note
          </button>
          <ul className="notes-list">
            {allNotes.map((note) => (
              <li key={note.id}>
                <button
                  type="button"
                  className={clsx(
                    "notes-list-item",
                    note.id === active?.id && "notes-list-item--active"
                  )}
                  onClick={() => setActiveNoteId(note.id)}
                >
                  <span className="font-medium truncate block">{note.title}</span>
                  {note.pinned ? (
                    <span className="text-xs text-yellow-400/80">Pinned</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="notes-editor">
          {active ? (
            <>
              <input
                type="text"
                className="notes-title-input"
                value={active.title}
                readOnly={isPinned}
                onChange={(e) =>
                  !isPinned && updateNote(active.id, { title: e.target.value })
                }
                aria-label="Note title"
              />
              <textarea
                className="notes-body-input"
                value={active.body}
                readOnly={isPinned}
                onChange={(e) =>
                  !isPinned && updateNote(active.id, { body: e.target.value })
                }
                aria-label="Note body"
              />
              {!isPinned ? (
                <button
                  type="button"
                  className="notes-delete-btn"
                  onClick={() => deleteNote(active.id)}
                >
                  Delete note
                </button>
              ) : null}
            </>
          ) : (
            <p className="text-gray-400 p-4">Select or create a note.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default WindowWrapper(Notes, "notes");
