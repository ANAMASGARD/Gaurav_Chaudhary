import { dockApps } from "#apps/registry";
import useWindowStore from "#store/windows";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import clsx from "clsx";

const HOVER_SCALE = 1.3;
const HOVER_LIFT = 10;

const Dock = () => {
  const { toggleWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return () => {};

    const icons = dock.querySelectorAll(".dock-icon");
    gsap.set(icons, { transformOrigin: "50% 100%" });

    const setupHover = () => {
      const listeners = [...icons].map((icon) => {
        const enter = () =>
          gsap.to(icon, {
            scale: HOVER_SCALE,
            y: -HOVER_LIFT,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        const leave = () =>
          gsap.to(icon, { scale: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
        icon.addEventListener("mouseenter", enter);
        icon.addEventListener("mouseleave", leave);
        return () => {
          icon.removeEventListener("mouseenter", enter);
          icon.removeEventListener("mouseleave", leave);
        };
      });
      return () => listeners.forEach((off) => off());
    };

    const mm = gsap.matchMedia();
    let cleanup = () => {};
    mm.add("(hover: hover) and (min-width: 768px)", () => {
      cleanup = setupHover();
    });
    return () => {
      cleanup();
      mm.revert();
    };
  }, []);

  return (
    <section id="dock" className="pointer-events-auto">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const open = windows[id]?.isOpen && !windows[id]?.minimized;
          return (
            <div key={id} className="dock-item">
              <span className="dock-label" role="tooltip">
                {name}
              </span>
              <button
                type="button"
                className={clsx("dock-icon", open && "dock-icon--open")}
                aria-label={name}
                disabled={!canOpen}
                onClick={() => canOpen && toggleWindow(id)}
              >
                <img src={icon} alt="" className={canOpen ? "" : "opacity-60"} />
              </button>
              {open ? <span className="dock-dot" aria-hidden /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Dock;
