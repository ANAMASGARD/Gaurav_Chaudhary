import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CircleArrowDown from "./components/icons/CircleArrowDown";
import { ScrollTrigger } from "gsap/ScrollTrigger";


function App() {
  let [showContent, setShowContent] = useState(false);
  const [showMobilePrompt, setShowMobilePrompt] = useState(false);
  const MOBILE_PROMPT_KEY = "gc_mobile_prompt_dismissed";
  useGSAP(() => {
    const tl = gsap.timeline();

    // Start centered, slightly small and hidden
    gsap.set(".vi-mask-group", {
      transformOrigin: "50% 50%",
      scale: 0.6,
      opacity: 0,
    });

    // 1) Appear in the center
    tl.to(".vi-mask-group", {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
    })
      // 2) Then enlarge (grow) smoothly
      .to(
        ".vi-mask-group",
        {
          scale: 10,
          opacity: 0,
          duration: 1,
          ease: "expo.inOut",
          onUpdate: function () {
            if (this.progress() >= 0.9) {
              const overlay = document.querySelector(".svg");
              if (overlay) overlay.remove();
              setShowContent(true);
              this.kill();
            }
          },
        },
        "+=0.1"
      );
  });

  useGSAP(() => {
    if (!showContent) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop and mobile tailored entrances + parallax
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.6 } });
      tl.to(".main", { scale: 1, rotate: 0 }, 0)
        .to(".sky", { scale: 1.05, rotate: 0 }, 0)
        .to(".bg", { scale: 1.05, rotate: 0 }, 0)
        .to(".character", { rotate: 0 }, 0.1)
        .to(".character-wrap", { bottom: "0%" }, 0.1)
        .to(".text", { scale: 1, rotate: 0 }, 0.1);

      // Scroll-driven subtle parallax on mobile (no mouse)
      const st = ScrollTrigger.create({
        trigger: ".landing",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const x = self.progress * 30; // px
          gsap.to(".sky", { x, overwrite: "auto" });
          gsap.to(".bg", { x: x * 1.4, overwrite: "auto" });
        },
      });
      return () => st.kill();
    });

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.8 } });
      tl.to(".main", { scale: 1, rotate: 0 }, 0)
        .to(".sky", { scale: 1.1, rotate: 0 }, 0)
        .to(".bg", { scale: 1.08, rotate: 0 }, 0)
        .to(".character", { rotate: 0 }, 0.1)
        .to(".character-wrap", { bottom: "0%" }, 0.1)
        .to(".text", { scale: 1, rotate: 0 }, 0.1);

      // Mouse-driven parallax on desktop
      const onMove = (e) => {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        gsap.to(".main .text", { x: `${xMove * 0.4}%`, overwrite: "auto" });
        gsap.to(".sky", { x: xMove, overwrite: "auto" });
        gsap.to(".bg", { x: xMove * 1.5, overwrite: "auto" });
      };
      const main = document.querySelector(".main");
      main?.addEventListener("mousemove", onMove);
      return () => main?.removeEventListener("mousemove", onMove);
    });

    // Respect reduced motion
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([".main", ".sky", ".bg", ".character", ".text"], { clearProps: "all" });
    });

    return () => mm.revert();
  }, [showContent]);

  // Show a one-time mobile prompt after intro completes
  useEffect(() => {
    if (!showContent) return;
    const dismissed = localStorage.getItem(MOBILE_PROMPT_KEY) === "1";
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile && !dismissed) setShowMobilePrompt(true);

    const onResize = () => {
      const nowMobile = window.matchMedia("(max-width: 767px)").matches;
      const isDismissed = localStorage.getItem(MOBILE_PROMPT_KEY) === "1";
      setShowMobilePrompt(nowMobile && !isDismissed);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showContent]);

  const dismissMobilePrompt = (persist = false) => {
    setShowMobilePrompt(false);
    if (persist) localStorage.setItem(MOBILE_PROMPT_KEY, "1");
  };

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-dvh overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
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
      </div>
      {showContent && (
        <div className="main w-full rotate-[-8deg] md:rotate-[-10deg] scale-[1.3] md:scale-[1.6]">
          <div className="landing overflow-hidden relative w-full h-dvh bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-3xl -mt-[8px] leading-none text-white font-pricedown ">
                  Namaste
                </h3>
              </div>
            </div>

            {/* Wanted badge top-right (aligned with navbar padding) */}
            <div className="absolute right-5 z-[20] pointer-events-none select-none">
              <img
                src="/images/wanted-v2.webp"
                alt="Wanted level"
                className="w-[clamp(90px,16vw,160px)] h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* GTA radar bottom-right */}
            <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 z-[20] pointer-events-none select-none">
              <img
                src="/images/gta-radar.webp"
                alt="GTA radar"
                className="w-[clamp(110px,20vw,220px)] h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-dvh">
             
              <img
                className="absolute scale-[1.7] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover transform-gpu will-change-transform"
                src="/images/gta-bg-v3.webp"
                alt="City backdrop"
              />
              <div className="text text-white font-pricedown flex flex-col gap-2 md:gap-3 absolute top-[8%] md:top-20 left-1/2 -translate-x-1/2 md:scale-[1.2] scale-[1] rotate-[-8deg] md:rotate-[-10deg]">
                <h1 className="text-[clamp(3rem,12vw,12rem)] leading-none -ml-8 md:-ml-40 text-center">gauRav</h1>
                <h1 className="text-[clamp(3rem,12vw,12rem)] leading-none ml-6 md:ml-20 text-center">chaudhary</h1>
                
              </div>
              {/* subtle ground shadow (mobile larger) */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none md:hidden"
                style={{
                  width: "clamp(340px, 92vw, 860px)",
                  height: "clamp(24px, 5vh, 64px)",
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 70%)",
                  filter: "blur(2px)",
                }}
              />
              {/* subtle ground shadow (desktop) */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block"
                style={{
                  width: "clamp(260px, 52vw, 980px)",
                  height: "clamp(20px, 4vh, 60px)",
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)",
                  filter: "blur(2px)",
                }}
              />
              <div className="character-wrap absolute left-0 right-0 bottom-0 flex justify-center items-end">
                <img
                  className="z-20 character rotate-[-8deg] object-contain pointer-events-none transform-gpu will-change-transform drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] h-[82vh] max-h-[92vh] w-auto max-w-[92vw] md:w-[clamp(320px,62vw,1100px)] md:h-auto md:max-h-[85vh]"
                  src="/images/gaurav-gta6-v2.webp"
                  alt="Gaurav GTA6 styled character"
                />
              </div>
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent z-10">
              <div className="flex items-center">
                <h3 className="flex items-center gap-2 text-xl font-pricedown">
                  ScRoLL Down
                  <span className="inline-flex w-6 h-6 md:w-7 md:h-7" aria-hidden="true">
                    <CircleArrowDown />
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {showContent && showMobilePrompt && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => dismissMobilePrompt(false)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-zinc-900 text-white shadow-2xl ring-1 ring-white/10 p-5 md:p-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">💡</span>
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Best viewed on desktop</h3>
                <p className="mt-1 text-sm text-zinc-300">
                  For the full cinematic experience, view this page on a desktop. On mobile, you can also use your browser’s “Request desktop site”.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => dismissMobilePrompt(false)}
                    className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition"
                  >
                    Keep browsing
                  </button>
                  <button
                    onClick={() => dismissMobilePrompt(true)}
                    className="px-4 py-2 rounded-lg bg-zinc-800 border border-white/15 text-sm hover:bg-zinc-700 transition"
                  >
                    Don’t show again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;