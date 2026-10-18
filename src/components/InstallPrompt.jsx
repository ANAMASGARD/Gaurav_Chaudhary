import { useCallback, useEffect, useState } from "react";

const DISMISS_KEY = "gc_install_dismissed";

// Detects whether the app is already running as an installed PWA.
const isStandalone = () =>
  window.matchMedia?.("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

const isIos = () =>
  /iphone|ipad|ipod/i.test(window.navigator.userAgent) &&
  !window.MSStream;

/**
 * A2HS (Add to Home Screen) prompt.
 * - Android/Chromium: uses the native `beforeinstallprompt` event.
 * - iOS Safari: shows manual "Share → Add to Home Screen" instructions
 *   (iOS has no install event).
 */
const InstallPrompt = () => {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    const onInstalled = () => {
      setVisible(false);
      setDeferred(null);
      localStorage.setItem(DISMISS_KEY, "1");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    // iOS never fires beforeinstallprompt — offer manual instructions after a beat.
    let iosTimer;
    if (isIos()) {
      iosTimer = window.setTimeout(() => {
        setIosHint(true);
        setVisible(true);
      }, 2500);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, "1");
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    deferred.prompt();
    try {
      await deferred.userChoice;
    } finally {
      setDeferred(null);
      setVisible(false);
    }
  }, [deferred]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-240 flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
      role="dialog"
      aria-label="Install app"
    >
      <div className="w-full max-w-sm rounded-2xl bg-zinc-900/95 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur p-4">
        <div className="flex items-center gap-3">
          <img
            src="/icons/pwa-192x192.png"
            alt=""
            className="h-11 w-11 shrink-0 rounded-xl"
          />
          <div className="grow">
            <h3 className="text-sm font-semibold leading-tight">
              Install this portfolio
            </h3>
            <p className="mt-0.5 text-xs text-zinc-400">
              {iosHint
                ? "Tap the Share icon, then “Add to Home Screen”."
                : "Add it to your home screen for a full-screen, app-like experience."}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            onClick={dismiss}
            className="rounded-lg px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-white/5 transition"
          >
            Not now
          </button>
          {!iosHint && (
            <button
              onClick={install}
              className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 transition"
            >
              Install
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
