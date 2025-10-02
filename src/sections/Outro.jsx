import React from 'react'

const Outro = () => {
  return (
    <section className="outro relative w-dvw h-dvh overflow-hidden">
      {/* Background image */}
      <img
        src="/images/gta-epic.webp"
        alt="GTA Epic Backdrop"
        className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        loading="eager"
        decoding="async"
      />
      {/* Optional subtle scrim for readability */}
      <div className="absolute inset-0 bg-black/20 z-0" aria-hidden="true" />

      {/* Foreground content overlay - moved toward the top */}
      <div className="absolute inset-x-0 top-12 z-10 flex flex-col items-center gap-6 text-center px-4 sm:top-16 md:top-20 lg:top-24">
        <div>
          <h3 className="gradient-title">
            You <br />Are That
          </h3>
        </div>
      </div>

      {/* Social/profile links at the bottom */}
      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="mx-auto flex items-center justify-center gap-6 md:gap-10">
          {/* GitHub */}
          <a
            href="https://github.com/ANAMASGARD" // TODO: replace with your GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <img
              src="/images/icons8-github-logo-188.png"
              alt="GitHub"
              className="w-10 h-10 md:w-12 md:h-12 object-contain select-none"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mrnobody-flex-680baa215/" // TODO: replace with your LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <img
              src="/images/icons8-linkedin-64.png"
              alt="LinkedIn"
              className="w-10 h-10 md:w-12 md:h-12 object-contain select-none"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/your-username" // TODO: replace with your X (Twitter) URL
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X profile"
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <img
              src="/images/icons8-x.svg"
              alt="X"
              className="w-10 h-10 md:w-12 md:h-12 object-contain select-none"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* Email */}
          <a
            href="mailto:github.chasing449@aleeas.com" // TODO: replace with your email
            aria-label="Send email"
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <img
              src="/images/icons8-mail-100.png"
              alt="Email"
              className="w-10 h-10 md:w-12 md:h-12 object-contain select-none"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Outro