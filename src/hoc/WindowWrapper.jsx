import useWindowStore from "#store/windows";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef } from "react";

const RESIZE_EDGES = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
const MIN_WIDTH = 280;
const MIN_HEIGHT = 180;

const isPhoneLayout = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

const containingBlock = (el) => {
  let node = el.parentElement;
  while (node) {
    const { position } = getComputedStyle(node);
    if (position === "relative" || position === "absolute" || position === "fixed" || position === "sticky") {
      return node;
    }
    node = node.parentElement;
  }
  return document.documentElement;
};

const pinToPixels = (el) => {
  const rect = el.getBoundingClientRect();
  const block = containingBlock(el);
  const blockRect = block.getBoundingClientRect();
  gsap.killTweensOf(el);
  el.dataset.pinned = "1";
  el.style.transform = "none";
  el.style.position = "absolute";
  el.style.margin = "0";
  el.style.right = "auto";
  el.style.bottom = "auto";
  el.style.maxWidth = "none";
  el.style.maxHeight = "none";
  el.style.left = `${rect.left - blockRect.left}px`;
  el.style.top = `${rect.top - blockRect.top}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
  return block;
};

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const win = windows[windowKey];
    const isOpen = win?.isOpen;
    const minimized = win?.minimized;
    const maximized = win?.maximized;
    const zIndex = win?.zIndex ?? 1000;
    const ref = useRef(null);
    const savedBox = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || minimized) return;
      el.style.display = "";
      gsap.fromTo(
        el,
        { scale: 0.92, opacity: 0, y: 24 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
          onComplete: () => {
            if (el.dataset.pinned !== "1") gsap.set(el, { clearProps: "transform" });
          },
        }
      );
    }, [isOpen, minimized]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (!isOpen || minimized) el.style.display = "none";
    }, [isOpen, minimized]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (isPhoneLayout()) {
        el.style.left = "";
        el.style.top = "";
        el.style.width = "";
        el.style.height = "";
        el.style.position = "";
        el.style.transform = "";
        savedBox.current = null;
        return;
      }
      if (maximized) {
        if (!savedBox.current) {
          savedBox.current = {
            left: el.style.left,
            top: el.style.top,
            width: el.style.width,
            height: el.style.height,
            maxWidth: el.style.maxWidth,
            maxHeight: el.style.maxHeight,
            right: el.style.right,
            bottom: el.style.bottom,
            position: el.style.position,
            transform: el.style.transform,
          };
        }
        el.style.left = "";
        el.style.top = "";
        el.style.width = "";
        el.style.height = "";
        el.style.maxWidth = "";
        el.style.maxHeight = "";
        el.style.right = "";
        el.style.bottom = "";
        el.style.position = "";
        el.style.transform = "";
        return;
      }
      if (!savedBox.current) return;
      Object.entries(savedBox.current).forEach(([key, value]) => {
        el.style[key] = value;
      });
      savedBox.current = null;
    }, [maximized]);

    useEffect(() => {
      const el = ref.current;
      if (!el || !isOpen || minimized || maximized || isPhoneLayout()) return undefined;
      const header = el.querySelector(".window-drag-handle");
      if (!header) return undefined;

      let active = null;

      const endGesture = () => {
        active = null;
        header.classList.remove("is-dragging");
        document.body.classList.remove("mac-window-dragging");
        delete document.body.dataset.resizeEdge;
      };

      const onPointerMove = (event) => {
        if (!active || event.pointerId !== active.pointerId) return;
        const dx = event.clientX - active.x;
        const dy = event.clientY - active.y;
        const blockRect = active.block.getBoundingClientRect();

        if (active.kind === "drag") {
          const width = el.offsetWidth;
          const left = Math.min(Math.max(active.left + dx, 24 - width), blockRect.width - 48);
          const top = Math.min(Math.max(active.top + dy, 0), Math.max(0, blockRect.height - 36));
          el.style.left = `${left}px`;
          el.style.top = `${top}px`;
          return;
        }

        let { left, top, width, height } = active;
        const edge = active.edge;
        if (edge.includes("e")) width = Math.max(MIN_WIDTH, active.width + dx);
        if (edge.includes("s")) height = Math.max(MIN_HEIGHT, active.height + dy);
        if (edge.includes("w")) {
          width = Math.max(MIN_WIDTH, active.width - dx);
          left = active.left + (active.width - width);
        }
        if (edge.includes("n")) {
          height = Math.max(MIN_HEIGHT, active.height - dy);
          top = active.top + (active.height - height);
        }
        width = Math.min(width, blockRect.width - 16);
        height = Math.min(height, blockRect.height - 16);
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
      };

      const onPointerUp = (event) => {
        if (!active || event.pointerId !== active.pointerId) return;
        endGesture();
      };

      const begin = (event, kind, edge) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        const block = pinToPixels(el);
        const blockRect = block.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        active = {
          kind,
          edge,
          pointerId: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          left: rect.left - blockRect.left,
          top: rect.top - blockRect.top,
          width: rect.width,
          height: rect.height,
          block,
        };
        if (kind === "drag") {
          header.classList.add("is-dragging");
          document.body.classList.add("mac-window-dragging");
        } else if (edge) {
          document.body.dataset.resizeEdge = edge;
        }
        focusWindow(windowKey);
      };

      const onHeaderDown = (event) => {
        if (event.target.closest("#window-controls, a, button, input, textarea, select, label")) return;
        begin(event, "drag");
      };

      const onResizeDown = (event) => {
        const handle = event.target.closest(".mac-resize-handle");
        if (!handle || !el.contains(handle)) return;
        begin(event, "resize", handle.dataset.edge || "se");
      };

      header.addEventListener("pointerdown", onHeaderDown);
      el.addEventListener("pointerdown", onResizeDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);

      return () => {
        endGesture();
        header.removeEventListener("pointerdown", onHeaderDown);
        el.removeEventListener("pointerdown", onResizeDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
      };
    }, [focusWindow, isOpen, maximized, minimized]);

    if (!isOpen) return null;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={clsx(
          "mac-window pointer-events-auto",
          maximized && "mac-window--maximized",
          minimized && "mac-window--minimized"
        )}
        onPointerDown={() => focusWindow(windowKey)}
      >
        <Component {...props} maximized={maximized} />
        {RESIZE_EDGES.map((edge) => (
          <div key={edge} className={`mac-resize-handle mac-resize-${edge}`} data-edge={edge} />
        ))}
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
