# gaurav-chad — agent memory

Single-page portfolio: GTA-style hero wallpaper with a macOS-like desktop on top. React 19, Vite, Tailwind 4, GSAP, Zustand. Path aliases: `#apps` `#components` `#content` `#store` `#windows` `#sections` `#hoc`.

## Shell

- `src/App.jsx`: `AudioProvider` → `Intro` → `Wallpaper` → `Desktop`. Reads `?open=<windowId>` after intro (valid ids in `WINDOW_IDS`), opens that window, then `replaceState` to clean URL. **No** install banner (`InstallPrompt` removed).
- Hero: “gaurav / chaudhary”, Wanted badge. **Desktop:** radar bottom-left, weapon wheel bottom-right (`sm+`, hidden on very narrow phones). **Mobile:** radar top-left under bar; wanted smaller top-right; weapon wheel hidden below `640px`.
- `MobileHome.jsx` (`md:hidden`): one centered row above the dock — YouTube, GitHub, LinkedIn, X. Brand-colored tiles with labels, fixed tile width so they stay aligned on 320–430px. Hidden in landscape when `max-height: 500px`.
- Dark chrome: `Desktop` → `mac-dark`. Styles in `src/index.css`.

## Hero wallpaper toggle (`src/store/wallpaper.js`, `src/sections/Wallpaper.jsx`)

- **Default:** car `/images/gaurav-bg-car.webp`, `object-cover`, class `wallpaper-car` (no parallax crop).
- **Classic:** sky `gta-bg-v3.webp` + character. Crossfade ~500ms. `classic` not persisted.
- Menu switch: `toggleClassic` in `MenuBar.jsx`. Preload in `index.html` is the **car** image.

## Hero title (`.hero-name`)

- Hollow on car; `.is-filled` solid white on classic.
- **Desktop:** car offsets `translate-x-[-15.5vw]` / `translate-x-[8vw]` etc.
- **Mobile (`max-md`):** smaller clamp, no car translate offsets, less main rotation/scale (`scale-105`, `rotate-0`). Title sits at `top: 38%` so it lands on the upper chest and the face stays clear.

## Menu bar (`src/components/MenuBar.jsx`)

**Desktop (`md+`):** health HUD + Resume | clock | Email, GitHub, YouTube, LinkedIn, X, speaker, wallpaper switch. Social color `#0a0a0a`.

**Mobile:** time centered (`h:mm A`). Right side: speaker + white **hamburger** (three bars; opens the glass sheet: Resume, Email, GitHub, YouTube, LinkedIn, X). A tap anywhere outside the sheet, or Escape, closes it. Wallpaper switch is desktop-only. Bottom row above the dock: YouTube (red), GitHub, LinkedIn (blue), X — brand tiles with labels, aligned with the dock.

## Dock

Four apps: Finder, Projects (safari), Blogs (notes), Experience (contact). Mobile: slightly smaller icons, `min-h-11` touch targets, tighter gap.

## Windows

- **Desktop:** drag/resize, maximize, traffic lights on the **right** (yellow, green, red).
- **Mobile (`max-width: 767px`):** full sheet between bar and dock; **no** drag/resize/maximize; larger traffic-light taps; in-flow titles (Safari shows “Live projects” in header); Finder hides view toggle below 420px width.
- `WindowWrapper`: phone layout skips drag effect and clears inline position.

## Finder

Tahoe glass sidebar (desktop), chips on mobile, MacTahoe folder icons, history/search/grid|list — unchanged core behavior.

## PWA (`vite.config.js`, `index.html`)

- `vite-plugin-pwa`: `display: standalone`, `display_override`, manifest `id`, `lang`, **shortcuts** (`/?open=resume`, `/?open=safari`), **screenshots** in `public/screenshots/`.
- Workbox precaches shell + listed hero/dock assets (webp/svg + selected png); `**/*.png` glob-ignored to skip huge `gta-bg-v4.png`; runtime cache for images/audio/video.
- `index.html`: `viewport-fit=cover`, `color-scheme: dark`, apple/mobile meta, theme `#000000`.
- Install via browser “Add to Home Screen” only — no in-app install UI.

## Audio

`/music/gta-music.mp3` — **no autoplay**; menu-bar speaker toggles play/pause.

## Dev ergonomics

`.vscode/settings.json` — Tailwind CSS lint for `@apply` / `@theme`.

## Removed

Install prompt banner; empty `DesktopIcons` usage (replaced by `MobileHome` on phones).
