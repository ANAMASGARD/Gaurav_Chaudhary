import { useEffect, useRef, useState } from "react";
import { AudioProvider } from "#components/AudioContext";
import Desktop from "#components/Desktop";
import Intro from "#sections/Intro";
import Wallpaper from "#sections/Wallpaper";
import useWindowStore, { WINDOW_IDS } from "#store/windows";

function App() {
  const [showContent, setShowContent] = useState(false);
  const openWindow = useWindowStore((s) => s.openWindow);
  const pendingOpenRef = useRef(null);

  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("open");
    if (target && WINDOW_IDS.includes(target)) pendingOpenRef.current = target;
  }, []);

  useEffect(() => {
    if (!showContent || !pendingOpenRef.current) return;
    const target = pendingOpenRef.current;
    pendingOpenRef.current = null;
    openWindow(target);
    const clean = window.location.pathname + window.location.hash;
    window.history.replaceState({}, "", clean);
  }, [showContent, openWindow]);

  return (
    <AudioProvider>
      <Intro active={!showContent} onComplete={() => setShowContent(true)} />
      <Wallpaper active={showContent} />
      {showContent ? <Desktop /> : null}
    </AudioProvider>
  );
}

export default App;
