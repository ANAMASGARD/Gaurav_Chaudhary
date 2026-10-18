import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext(null);

export function AudioProvider({ src = "/music/gta-music.mp3", children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.8;
    audio.muted = false;
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        audio.muted = false;
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggle }}>
      <audio ref={audioRef} src={src} preload="auto" />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
