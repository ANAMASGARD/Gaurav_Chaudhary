

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ResumeAction = () => {
  return (
    <section className="hero-section">
      <div className="size-full  ">
        <img src="/images/resume.png" 
        alt="Hero Background" 
        className="scale-out" />
      </div>
      <div className="text text-white font-pricedown flex flex-col gap-2 md:gap-3 absolute top-[8%] md:top-20 left-1/2 -translate-x-1/2 md:scale-[1.2] scale-[1] rotate-[-8deg] md:rotate-[-10deg]">
                <h1 className="text-[clamp(3rem,12vw,12rem)] leading-none -ml-8 md:-ml-40 text-center">resume</h1>
                
              </div>

      {/* Bottom-centered redirect button */}
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 z-50">
        <a href="/images/resume.webp" target="_blank" rel="noopener noreferrer">
          {/* Track click so we can flip the style briefly when user activates the link */}
          <Button
            size="lg"
            className={`download-btn font-pricedown`}
            onClick={(e) => {
              // toggle a temporary clicked state for visual feedback
              const el = e.currentTarget;
              el.classList.add("download-btn--clicked");
              window.setTimeout(() => el.classList.remove("download-btn--clicked"), 900);
            }}
          >
            Download
          </Button>
        </a>
      </div>

              
    </section>
  )
}

export default ResumeAction