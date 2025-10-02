import React, { useEffect, useRef, useState } from "react";

const AudioPlayer = ({ src = "/music/gta-music.mp3" }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    // Start muted to increase the chance autoplay is allowed by the browser.
    audio.muted = true;
    audio.volume = 0.8;

    // Attempt muted autoplay, then unmute if successful.
    audio
      .play()
      .then(() => {
        // Unmute after playback started — many browsers permit this sequence.
        try {
          audio.muted = false;
        } catch (e) {
          // ignore
        }
        setIsPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked — remain paused until user toggles or interacts.
        setIsPlaying(false);
        // One-time user gesture to try again (unmuted)
        const onFirstInteraction = () => {
          try {
            audio.muted = false;
          } catch (e) {}
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
          window.removeEventListener("pointerdown", onFirstInteraction);
        };
        window.addEventListener("pointerdown", onFirstInteraction, { once: true });
      });
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (e) {
        // If play fails, keep the state false — user can interact to allow playback.
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />

      {/* Persistent audio control (bottom-right) */}
      <div className="fixed right-6 bottom-6 z-[255]">
        <button
          onClick={toggle}
          className="flex items-center gap-3 rounded-full bg-black/60 text-white px-3 py-2 border border-white/10 shadow-lg hover:scale-105 transform transition focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
          >
            {isPlaying ? (
              <>
                <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" fill="currentColor" />
              </>
            ) : (
              <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
            )}
          </svg>
        </button>
      </div>
    </>
  );
};

export default AudioPlayer;
