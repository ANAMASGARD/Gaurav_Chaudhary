import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Intro = ({ active, onComplete }) => {
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useGSAP(() => {
    if (!active) return;
    let killed = false;
    const finish = () => {
      if (killed) return;
      onCompleteRef.current?.();
    };

    const startIntro = async () => {
      try {
        await (document.fonts?.ready || Promise.resolve());
      } catch {
        /* fonts API unavailable */
      }
      await new Promise((resolve) => {
        const img = new Image();
        img.src = "/images/hero-bg.webp";
        if (img.decode) img.decode().then(resolve).catch(resolve);
        else img.onload = () => resolve();
      });
      if (killed) return;

      let useFallback = false;
      try {
        const textEl = document.querySelector(".vi-mask-group text");
        if (!textEl) useFallback = true;
        else {
          const bb = textEl.getBBox?.();
          if (!bb || bb.width < 10 || bb.height < 10) useFallback = true;
        }
      } catch {
        useFallback = true;
      }

      gsap.set(".svg", { opacity: 1 });
      if (useFallback) {
        gsap.set(".gc-fallback", { opacity: 0, scale: 0.6, display: "flex" });
        const tl = gsap.timeline();
        tl.to(".gc-fallback", { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }).to(
          ".gc-fallback",
          {
            scale: 10,
            opacity: 0,
            duration: 1,
            ease: "expo.inOut",
            onUpdate: function onUpdate() {
              if (this.progress() >= 0.9) {
                finish();
                this.kill();
              }
            },
          },
          "+=0.1"
        );
      } else {
        gsap.set(".vi-mask-group", { transformOrigin: "50% 50%", scale: 0.6, opacity: 0 });
        const tl = gsap.timeline();
        tl.to(".vi-mask-group", { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }).to(
          ".vi-mask-group",
          {
            scale: 10,
            opacity: 0,
            duration: 1,
            ease: "expo.inOut",
            onUpdate: function onUpdate() {
              if (this.progress() >= 0.9) {
                finish();
                this.kill();
              }
            },
          },
          "+=0.1"
        );
      }
    };

    const safety = setTimeout(finish, 3500);
    startIntro();
    return () => {
      killed = true;
      clearTimeout(safety);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="svg flex items-center justify-center fixed top-0 left-0 z-100 w-full h-dvh overflow-hidden bg-black">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <mask id="viMask" maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="black" />
            <g className="vi-mask-group">
              <text
                x="50%"
                y="50%"
                fontSize="250"
                textAnchor="middle"
                fill="white"
                dominantBaseline="central"
                fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Arial, Helvetica, sans-serif"
                fontWeight="900"
              >
                GC
              </text>
            </g>
          </mask>
        </defs>
        <image
          href="/images/hero-bg.webp"
          xlinkHref="/images/hero-bg.webp"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#viMask)"
        />
      </svg>
      <div className="gc-fallback absolute inset-0 hidden items-center justify-center select-none">
        <span className="text-white font-pricedown" style={{ fontSize: "14rem", lineHeight: 1 }}>
          GC
        </span>
      </div>
    </div>
  );
};

export default Intro;
