import { useState } from "react";
import { AudioProvider } from "#components/AudioContext";
import Desktop from "#components/Desktop";
import InstallPrompt from "#components/InstallPrompt";
import Intro from "#sections/Intro";
import Wallpaper from "#sections/Wallpaper";

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <AudioProvider>
      <Intro active={!showContent} onComplete={() => setShowContent(true)} />
      <Wallpaper active={showContent} />
      {showContent ? <Desktop /> : null}
      <InstallPrompt />
    </AudioProvider>
  );
}

export default App;
