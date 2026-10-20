import { navMenuLinks } from "#apps/registry";
import { useAudio } from "#components/AudioContext";
import { menuBarSocials } from "#content/socials";
import { SpeakerGlyph, statusGlyphs } from "#components/StatusGlyphs";
import useWallpaperStore from "#store/wallpaper";
import useWindowStore from "#store/windows";
import useLocalClock from "../hooks/useLocalClock.js";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

const MenuBar = () => {
  const { openWindow } = useWindowStore();
  const { isPlaying, toggle } = useAudio();
  const [menuOpen, setMenuOpen] = useState(false);
  const { classic, toggleClassic } = useWallpaperStore();
  const now = useLocalClock();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const open = (id) => {
    openWindow(id);
    closeMenu();
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    const onPointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".mac-mobile-menu-sheet, .mobile-menu-toggle")) return;
      closeMenu();
      const swallow = (clickEvent) => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        document.removeEventListener("click", swallow, true);
      };
      document.addEventListener("click", swallow, true);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [menuOpen, closeMenu]);

  const speakerControl = (
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
  );

  const wallpaperSwitch = (
    <button
      type="button"
      className={classic ? "mac-switch is-on" : "mac-switch"}
      aria-pressed={classic}
      aria-label={classic ? "Show car wallpaper" : "Show classic wallpaper"}
      onClick={toggleClassic}
    >
      <span className="mac-switch-knob" />
    </button>
  );

  return (
    <>
      {menuOpen ? (
        <button
          type="button"
          className="mac-mobile-menu-backdrop md:hidden"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}

      <nav className="mac-menu-bar pointer-events-auto">
        <div className="mac-menu-left">
          <div className="hero-menu-brand-cluster hidden md:flex">
            <img src="/images/health-hud.png" alt="" className="hero-menu-health" />
          </div>
          <ul className="mac-menu-app-links hidden md:flex">
            {navMenuLinks.map(({ id, name }) => (
              <li key={id}>
                <button type="button" className="hero-menu-resume-btn" onClick={() => open(id)}>
                  {name.toLowerCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <time className="mac-menu-clock" dateTime={now.toISOString()}>
          <span className="md:hidden">{dayjs(now).format("h:mm A")}</span>
          <span className="hidden md:inline">{dayjs(now).format("ddd, MMM D h:mm A")}</span>
        </time>

        <div className="mac-menu-right">
          <ul className="mac-status-icons mac-status-icons--desktop hidden md:flex">
            {menuBarSocials.map(({ id, label, glyph, link }) => {
              const Icon = statusGlyphs[glyph];
              return (
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
            })}
            <li>{speakerControl}</li>
            <li>{wallpaperSwitch}</li>
          </ul>

          <ul className="mac-status-icons mac-status-icons--mobile flex md:hidden">
            <li>{speakerControl}</li>
            <li>
              <button
                type="button"
                className={menuOpen ? "mobile-menu-toggle is-open" : "mobile-menu-toggle"}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {menuOpen ? (
        <div className="mac-mobile-menu-sheet md:hidden" role="dialog" aria-label="Menu">
          {navMenuLinks.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              className="mac-mobile-menu-row"
              onClick={() => open(id)}
            >
              <span className="mac-mobile-menu-row-icon mac-mobile-menu-row-icon--resume" aria-hidden>
                R
              </span>
              <span>{name}</span>
            </button>
          ))}
          {menuBarSocials.map(({ id, label, glyph, link }) => {
            const Icon = statusGlyphs[glyph];
            return (
              <a
                key={id}
                className="mac-mobile-menu-row"
                href={link}
                target={link.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                onClick={closeMenu}
              >
                <span className="mac-mobile-menu-row-icon" aria-hidden>
                  <Icon />
                </span>
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default MenuBar;
