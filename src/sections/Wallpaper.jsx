import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Wallpaper = ({ active }) => {
  useGSAP(() => {
    if (!active) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.8 } });
      gsap.set(".main .text", { x: 0 });
      tl.to(".main", { scale: 1, rotate: 0 }, 0)
        .to(".sky", { scale: 1.1, rotate: 0 }, 0)
        .to(".bg", { scale: 1.08, rotate: 0 }, 0)
        .to(".character", { rotate: 0 }, 0.1)
        .to(".character-wrap", { bottom: "0%" }, 0.1)
        .to(".text", { scale: 1, rotate: 0 }, 0.1);

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

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.6 } });
      gsap.set(".main .text", { x: 0 });
      tl.to(".main", { scale: 1, rotate: 0 }, 0)
        .to(".sky", { scale: 1.05, rotate: 0 }, 0)
        .to(".bg", { scale: 1.05, rotate: 0 }, 0)
        .to(".character", { rotate: 0 }, 0.1)
        .to(".character-wrap", { bottom: "0%" }, 0.1)
        .to(".text", { scale: 1, rotate: 0 }, 0.1);
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([".main", ".sky", ".bg", ".character", ".text"], { clearProps: "all" });
    });

    return () => mm.revert();
  }, [active]);

  if (!active) return null;

  return (
    <div className="main w-full -rotate-8 md:-rotate-10 scale-130 md:scale-160 fixed inset-0 z-0">
      <div className="landing overflow-hidden relative w-full h-dvh bg-black">
        <div className="hero-chrome absolute right-5 z-8 pointer-events-none select-none">
          <img
            src="/images/wanted-v2.webp"
            alt="Wanted level"
            className="w-[clamp(90px,16vw,160px)] h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 z-8 pointer-events-none select-none">
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
            className="sky absolute scale-170 -rotate-3 bg top-0 left-0 w-full h-full object-cover transform-gpu will-change-transform"
            src="/images/gta-bg-v3.webp"
            alt=""
          />
          <div className="text text-white font-pricedown flex flex-col gap-2 md:gap-3 absolute top-[8%] md:top-20 left-1/2 -translate-x-1/2 md:scale-120 scale-100 -rotate-8 md:-rotate-10 pointer-events-none">
            <h1 className="text-[clamp(3rem,12vw,12rem)] leading-none -ml-8 md:-ml-40 text-center">
              gaurav
            </h1>
            <h1 className="text-[clamp(3rem,12vw,12rem)] leading-none ml-6 md:ml-20 text-center">
              chaudhary
            </h1>
          </div>
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
          <div className="character-wrap absolute left-0 right-0 bottom-0 flex justify-center items-end pointer-events-none">
            <img
              className="z-20 character -rotate-8 object-contain transform-gpu will-change-transform drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] h-[82vh] max-h-[92vh] w-auto max-w-[92vw] md:w-[clamp(320px,62vw,1100px)] md:h-auto md:max-h-[85vh]"
              src="/images/gaurav-gta6-v2.webp"
              alt="Gaurav GTA6 styled character"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallpaper;
