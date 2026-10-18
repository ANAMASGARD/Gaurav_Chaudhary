import { navMenuLinks } from "#apps/registry";
import { useAudio } from "#components/AudioContext";
import { menuBarSocials } from "#content/socials";
import { SpeakerGlyph, statusGlyphs } from "#components/StatusGlyphs";
import useWallpaperStore from "#store/wallpaper";
import useWindowStore from "#store/windows";
import useLocalClock from "../hooks/useLocalClock.js";
import dayjs from "dayjs";
import { useState } from "react";

const MenuBar = () => {
  const { openWindow } = useWindowStore();
  const { isPlaying, toggle } = useAudio();
  const [menuOpen, setMenuOpen] = useState(false);
  const { classic, toggleClassic } = useWallpaperStore();
  const now = useLocalClock();

  const open = (id) => {
    openWindow(id);
    setMenuOpen(false);
  };

  return (
    <nav className="mac-menu-bar pointer-events-auto">
      <div className="mac-menu-left">
        <div className="hero-menu-brand-cluster">
          <button
            type="button"
            className="mac-menu-logo-btn md:hidden"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <img src="/images/linux.png" alt="Linux" className="hero-menu-linux" />
          </button>
          <img src="/images/linux.png" alt="" className="hero-menu-linux hidden md:block" />
        </div>
        <ul className="mac-menu-app-links">
          {navMenuLinks.map(({ id, name }) => (
            <li key={id}>
              <button type="button" className="hero-menu-resume-btn" onClick={() => open(id)}>
                {name.toLowerCase()}
              </button>
            </li>
          ))}
        </ul>
        {menuOpen ? (
          <div className="mac-mobile-menu md:hidden">
            {navMenuLinks.map(({ id, name }) => (
              <button
                key={id}
                type="button"
                className="hero-menu-resume-btn hero-menu-resume-btn--menu"
                onClick={() => open(id)}
              >
                {name.toLowerCase()}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <time className="mac-menu-clock" dateTime={now.toISOString()}>
        {dayjs(now).format("ddd, MMM D h:mm A")}
      </time>
      <div className="mac-menu-right">
        <ul className="mac-status-icons">
          {menuBarSocials.flatMap(({ id, label, glyph, link }) => {
            const Icon = statusGlyphs[glyph];
            const linkItem = (
              <li key={id}>
                <a
                  className="mac-status-link"
                  href={link}
                  target={link.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                >
                  <Icon />
                </a>
              </li>
            );
            if (id !== "x") return [linkItem];
            return [
              linkItem,
              <li key="speaker">
                <button
                  type="button"
                  className={
                    isPlaying
                      ? "mac-status-link mac-status-link--speaker"
                      : "mac-status-link mac-status-link--speaker is-muted"
                  }
                  aria-pressed={isPlaying}
                  aria-label={isPlaying ? "Stop soundtrack" : "Play soundtrack"}
                  onClick={toggle}
                >
                  <SpeakerGlyph muted={!isPlaying} />
                </button>
              </li>,
            ];
          })}
          <li>
            <button
              type="button"
              className={classic ? "mac-switch is-on" : "mac-switch"}
              aria-pressed={classic}
              aria-label={classic ? "Show car wallpaper" : "Show classic wallpaper"}
              onClick={toggleClassic}
            >
              <span className="mac-switch-knob" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
