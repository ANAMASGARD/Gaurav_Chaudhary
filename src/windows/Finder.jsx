import WindowControls from "#components/WindowControls";
import { locations } from "#content/finderLocations";
import WindowWrapper from "#hoc/WindowWrapper";
import useFinderStore, { finderCanGoBack, finderCanGoForward } from "#store/finder";
import useWindowStore from "#store/windows";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const itemKey = (item) => `${item.kind}-${item.name}-${item.id}`;

const kindLabel = (item) => {
  if (item.kind === "folder") return "Folder";
  if (item.fileType === "txt") return "Text Document";
  if (item.fileType === "img") return "Image";
  if (item.fileType === "pdf") return "PDF Document";
  if (item.fileType === "url" || item.fileType === "fig") return "Web Link";
  return "Document";
};

const Finder = () => {
  const { openWindow } = useWindowStore();
  const activeLocation = useFinderStore((s) => s.activeLocation);
  const viewMode = useFinderStore((s) => s.viewMode);
  const query = useFinderStore((s) => s.query);
  const selectedId = useFinderStore((s) => s.selectedId);
  const navigate = useFinderStore((s) => s.navigate);
  const goBack = useFinderStore((s) => s.goBack);
  const goForward = useFinderStore((s) => s.goForward);
  const setViewMode = useFinderStore((s) => s.setViewMode);
  const setQuery = useFinderStore((s) => s.setQuery);
  const select = useFinderStore((s) => s.select);
  const canGoBack = useFinderStore(finderCanGoBack);
  const canGoForward = useFinderStore(finderCanGoForward);

  const [searchOpen, setSearchOpen] = useState(false);

  const favorites = Object.values(locations);
  const projectItems = locations.work.children;

  const items = useMemo(() => {
    const children = activeLocation?.children ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return children;
    return children.filter((item) => item.name.toLowerCase().includes(q));
  }, [activeLocation, query]);

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return navigate(item);
    if (["fig", "url"].includes(item.fileType) && item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    const key = `${item.fileType}file`;
    openWindow(key, item);
  };

  const isSidebarActive = (item) => {
    if (!activeLocation) return false;
    if (item.kind === "folder" && item.type) return activeLocation.type === item.type;
    if (item.kind === "folder" && !item.type) {
      return activeLocation.id === item.id && activeLocation.name === item.name;
    }
    return activeLocation.id === item.id;
  };

  const handleItemClick = (item, event) => {
    select(itemKey(item));
    if (event.pointerType === "touch") openItem(item);
  };

  const handleItemKeyDown = (item, event) => {
    if (event.key === "Enter") openItem(item);
  };

  const renderSidebarRow = (item) => (
    <li key={itemKey(item)}>
      <button
        type="button"
        className={clsx("finder-sidebar-row", isSidebarActive(item) && "is-active")}
        onClick={() => navigate(item)}
      >
        <img src={item.icon} className="finder-sidebar-icon" alt="" />
        <span className="truncate">{item.name}</span>
      </button>
    </li>
  );

  const isSelected = (item) => selectedId === itemKey(item);

  const gridView = (
    <ul className="finder-grid" key={activeLocation?.name}>
      {items.map((item) => (
        <li key={itemKey(item)}>
          <button
            type="button"
            className={clsx("finder-grid-item", isSelected(item) && "is-selected")}
            onClick={(e) => handleItemClick(item, e)}
            onDoubleClick={() => openItem(item)}
            onKeyDown={(e) => handleItemKeyDown(item, e)}
          >
            <img src={item.icon} alt="" className="finder-grid-icon" />
            <span className={clsx("finder-grid-label", isSelected(item) && "is-selected")}>
              {item.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  const listView = (
    <div className="finder-list-wrap" key={activeLocation?.name}>
      <div className="finder-list-head">
        <span>Name</span>
        <span>Kind</span>
        <span>Size</span>
      </div>
      <ul className="finder-list">
        {items.map((item) => (
          <li key={itemKey(item)}>
            <button
              type="button"
              className={clsx("finder-list-row", isSelected(item) && "is-selected")}
              onClick={(e) => handleItemClick(item, e)}
              onDoubleClick={() => openItem(item)}
              onKeyDown={(e) => handleItemKeyDown(item, e)}
            >
              <span className="finder-list-name">
                <img src={item.icon} alt="" />
                {item.name}
              </span>
              <span className="finder-list-kind">{kindLabel(item)}</span>
              <span className="finder-list-size">—</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const emptyState =
    activeLocation?.type === "trash" && items.length === 0 ? (
      <p className="finder-empty">Trash is empty</p>
    ) : query && items.length === 0 ? (
      <p className="finder-empty">No results</p>
    ) : null;

  const itemCount = items.length;

  return (
    <>
      <div id="window-header" className="window-drag-handle finder-toolbar">
        <div className="finder-toolbar-nav">
          <button
            type="button"
            className="finder-toolbar-btn"
            aria-label="Back"
            disabled={!canGoBack}
            onClick={goBack}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            className="finder-toolbar-btn"
            aria-label="Forward"
            disabled={!canGoForward}
            onClick={goForward}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
        <h2 className="finder-toolbar-title">{activeLocation?.name ?? "Finder"}</h2>
        <div className="finder-toolbar-actions">
          <div className="finder-view-toggle hidden min-[420px]:flex">
            <button
              type="button"
              className={clsx("finder-view-btn", viewMode === "grid" && "is-active")}
              aria-label="Icon view"
              aria-pressed={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              className={clsx("finder-view-btn", viewMode === "list" && "is-active")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              onClick={() => setViewMode("list")}
            >
              <List className="size-4" aria-hidden />
            </button>
          </div>
          <div className={clsx("finder-search", searchOpen && "finder-search--open")}>
            <button
              type="button"
              className="finder-search-toggle md:hidden"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
            </button>
            <label className="finder-search-field">
              <Search className="size-3.5 shrink-0 opacity-60 hidden md:block" aria-hidden />
              <input
                type="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={clsx(!searchOpen && "max-md:hidden")}
              />
            </label>
          </div>
          <WindowControls target="finder" />
        </div>
      </div>
      <div className="finder-glass mac-window-body mac-finder-body">
        <aside className="finder-sidebar">
          <div className="hidden md:block finder-sidebar-section">
            <h3>Favorites</h3>
            <ul>{favorites.map((item) => renderSidebarRow(item))}</ul>
          </div>
          <div className="md:hidden finder-chips">
            {favorites.map((item) => (
              <button
                key={item.type}
                type="button"
                className={clsx(
                  "finder-chip",
                  activeLocation?.type === item.type && "finder-chip--active"
                )}
                onClick={() => navigate(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="hidden md:block finder-sidebar-section">
            <h3>Projects</h3>
            <ul>{projectItems.map((item) => renderSidebarRow(item))}</ul>
          </div>
        </aside>
        <div className="finder-main">
          <div className="finder-content-area">
            {emptyState ?? (viewMode === "list" ? listView : gridView)}
          </div>
          <footer className="finder-status">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </footer>
        </div>
      </div>
    </>
  );
};

export default WindowWrapper(Finder, "finder");
