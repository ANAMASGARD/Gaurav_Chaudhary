import { useEffect, useRef, useState } from "react";
import Outro from "./Outro";

const Final = () => {
  // 1. Create a state to track if the video has finished.
  // It starts as 'false'.
  const [videoHasEnded, setVideoHasEnded] = useState(false);
  // Ref to control the video element in code
  const videoRef = useRef(null);

  // This function will be called by the video player when it finishes.
  // It updates the state to 'true'.
  const handleVideoEnd = () => {
    setVideoHasEnded(true);
  };

  // Force the video to play at 0.5x speed purely via code
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Set both default and current playback rate for reliability
    v.defaultPlaybackRate = 0.5;
    v.playbackRate = 0.5;
  }, []);

  return (
    // Make sure this section takes up the full screen height for proper display.
    <section className="final h-screen w-full">
      {/* 2. Use a conditional (ternary) operator to display content.
           - If 'videoHasEnded' is true, show the final message.
           - If 'videoHasEnded' is false, show the video player.
      */}
      {videoHasEnded ? (
        /* --- THIS IS THE OUTRO CONTENT --- */
     <Outro />
      ) : (
        /* --- THIS IS THE VIDEO PLAYER --- */
        <div className="size-full">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            src="/videos/output3.mp4"
            className="size-full object-cover"
            // Play the video automatically
            autoPlay
            // 3. Call the handleVideoEnd function when the video finishes.
            //    The `loop` attribute has been removed.
            onEnded={handleVideoEnd}
            onLoadedMetadata={() => {
              const v = videoRef.current;
              if (v) {
                v.defaultPlaybackRate = 0.25;
                v.playbackRate = 0.25;
              }
            }}
          />
        </div>
      )}
    </section>
  );
};

export default Final;