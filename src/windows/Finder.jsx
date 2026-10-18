import WindowControls from "#components/WindowControls";
import { locations } from "#content/finderLocations";
import WindowWrapper from "#hoc/WindowWrapper";
import useFinderStore from "#store/finder";
import useWindowStore from "#store/windows";
import clsx from "clsx";
import { Search } from "lucide-react";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useFinderStore();

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    const key = `${item.fileType}file`;
    openWindow(key, item);
  };

  const isActive = (item) => {
    if (!activeLocation) return false;
    if (item.kind === "folder" && item.type) return activeLocation.type === item.type;
    return activeLocation.id === item.id;
  };

  const renderList = (items) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        onKeyDown={(e) => e.key === "Enter" && setActiveLocation(item)}
        role="button"
        tabIndex={0}
        className={clsx(isActive(item) ? "active" : "not-active")}
      >
        <img src={item.icon} className="size-4 shrink-0 object-contain" alt="" />
        <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ));

  const favorites = Object.values(locations);
  const workItems = locations.work.children;

  return (
    <>
      <div id="window-header" className="window-drag-handle">
        <WindowControls target="finder" />
        <Search className="icon hidden md:block" aria-hidden />
        <h2 className="md:hidden flex-1 text-center font-semibold mac-window-title">
          {activeLocation?.name ?? "Finder"}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row h-full min-h-0 mac-window-body mac-finder-body">
        <div className="finder-sidebar">
          <div className="hidden md:block">
            <h3>Favorites</h3>
            <ul>{renderList(favorites)}</ul>
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
                onClick={() => setActiveLocation(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="hidden md:block">
            <h3>Work</h3>
            <ul>{renderList(workItems)}</ul>
          </div>
        </div>
        <ul className="finder-content">
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className={clsx("finder-item", item.position)}
              onClick={() => openItem(item)}
              onKeyDown={(e) => e.key === "Enter" && openItem(item)}
              role="button"
              tabIndex={0}
            >
              <img src={item.icon} alt="" />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WindowWrapper(Finder, "finder");
