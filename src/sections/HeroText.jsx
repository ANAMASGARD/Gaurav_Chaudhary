import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

const HeroText = () => {
  const slides = useMemo(
    () => [
      {
        bg: "/images/hero-bg.webp",
        href: "https://example.com/project-1",
        title: (
          <>
            creating <br /> the <br /> Future
          </>
        ),
      },
      {
        bg: "/images/gta-bg-v3.webp",
        href: "https://example.com/project-2",
        title: (
          <>
            Coming <br /> May 26th <br /> 2026
          </>
        ),
      },
      {
        bg: "/images/gta-bg-v3.webp",
        href: "https://example.com/project-2",
        title: (
          <>
            Coming <br /> May 26th <br /> 2026
          </>
        ),
      },
      {
        bg: "/images/overlay.webp",
        href: "https://example.com/project-3",
        title: (
          <>
            Built <br /> with <br /> GSAP
          </>
        ),
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const prevIndex = useRef(0);
  const wrapRef = useRef(null);

  // Animate transitions on index change
  useEffect(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      const bgImgs = gsap.utils.toArray(".as-slider-background img");
      const texts = gsap.utils.toArray(".as-changing-widget .as-text");

      const prev = prevIndex.current;
      const curr = index;

      // Backgrounds
      if (bgImgs[prev]) {
        gsap.set(bgImgs[prev], { zIndex: 1 });
        gsap.to(bgImgs[prev], { opacity: 0, scale: 1.08, duration: 0.8, ease: "power2.out" });
      }
      if (bgImgs[curr]) {
        gsap.set(bgImgs[curr], { zIndex: 2 });
        gsap.fromTo(
          bgImgs[curr],
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );
      }

      // Texts
      if (texts[prev]) {
        gsap.to(texts[prev], { yPercent: -20, opacity: 0, duration: 0.5, ease: "power2.inOut" });
      }
      if (texts[curr]) {
        gsap.fromTo(
          texts[curr],
          { yPercent: 20, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, ease: "power2.inOut", delay: 0.1 }
        );
      }
    }, wrapRef);
    prevIndex.current = index;
    return () => ctx.revert();
  }, [index]);

  // Initial intro for first frame
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set([".as-slider-background img"], { opacity: 0, scale: 1.08 });
      gsap.set([".as-changing-widget .as-text"], { opacity: 0, yPercent: 10 });
      gsap.to(".as-slider-background img:nth-child(1)", { opacity: 1, scale: 1, duration: 1, ease: "power2.out" });
      gsap.to(".as-changing-widget .as-text:nth-child(1)", { opacity: 1, yPercent: 0, duration: 0.8, ease: "power2.out", delay: 0.1 });
    }, wrapRef);
    return () => ctx.revert();
  });

  return (
    <section className="hero-section relative overflow-hidden">
      <div ref={wrapRef} className="as-slider relative w-full h-dvh overflow-hidden">
        {/* Backgrounds */}
        <div className="as-slider-background absolute inset-0">
          {slides.map((s, i) => (
            <img key={i} src={s.bg} alt="slide background" className="absolute inset-0 w-full h-full object-cover" />
          ))}
        </div>

        {/* Click-through link for current slide (kept below dots via z-index) */}
        {slides[index]?.href && (
          <a
            href={slides[index].href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Open project ${index + 1}`}
          />
        )}

        {/* Centered changing text (no pointer events so dots stay clickable) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="as-changing-widget text-center px-4">
            {slides.map((s, i) => (
              <div key={i} className="as-text absolute left-1/2 -translate-x-1/2">
                <h3 className="gradient-title whitespace-pre-line">{s.title}</h3>
              </div>
            ))}
            {/* Platform logos under text */}
            <div className="relative mt-10 flex justify-center gap-8">
              <img src="/images/play.svg" alt="Play" className="md:w-32 w-20" />
              <img src="/images/logo18.png" alt="Brand" className="md:w-40 w-28" />
            </div>
          </div>
        </div>

        {/* Dots (manual navigation) */}
        <div className="as-bar absolute left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-6 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-pressed={i === index}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            >
              <span className="dot-number">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroText;