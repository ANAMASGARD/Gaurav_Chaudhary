# gaurav-chad — agent memory

Single-page portfolio: GTA-style hero wallpaper with a macOS-like desktop on top. React 19, Vite, Tailwind 4, GSAP, Zustand. Path aliases: `#apps` `#components` `#content` `#store` `#windows` `#sections` `#hoc`.

## Shell

- `src/App.jsx`: `AudioProvider` → `Intro` (GC mask) → `Wallpaper` (hero) → `Desktop` (sibling layer, not inside the transformed `.main`).
- Hero: “gaurav / chaudhary”, Wanted badge always visible. **Radar** (`public/images/gta-radar.webp`, processed from `public/icons/Enlarged circular minimap overlay.png`, transparent corners) is **bottom left**, display width `clamp(58px, 10.5vw, 116px)` so the circle matches the old radar size. **Weapon wheel** (`public/images/weapon-wheel.webp`, from the transparent unarmed-fist PNG) is **bottom right**, about `clamp(140px, 22vw, 240px)`.
- Desktop is empty. No folders, no Notes shortcut. Projects live in Finder only.
- Dark chrome: `Desktop` wrapper class `mac-dark`. Styles in `src/index.css`.

## Hero wallpaper toggle (`src/store/wallpaper.js`, `src/sections/Wallpaper.jsx`)

- **Default (switch off):** car photo `/images/gaurav-bg-car.webp` (WebP). Full-bleed `object-cover`, class `wallpaper-car` (not `.sky`/`.bg` — no GSAP parallax crop on car).
- **Classic (switch on):** GTA sky `gta-bg-v3.webp` + character `gaurav-gta6-v2.webp`. Crossfade ~500ms. `classic` is **not** persisted (every visit starts on car).
- Menu-bar switch: `useWallpaperStore().toggleClassic` in `MenuBar.jsx`. Does **not** control audio.

## Hero title (`.hero-name` in `src/index.css`)

- **Car wallpaper:** hollow white outline (`color: transparent`, `-webkit-text-stroke`), fill shows through.
- **Classic wallpaper:** solid white (`.hero-name.is-filled`), toggled with `classic`.
- **Car-only layout:** “gaurav” via `translate-x-[-15.5vw] md:translate-x-[-23.5vw]`; “chaudhary” via `translate-x-[8vw] md:translate-x-[12vw]`. Classic keeps `-ml-8 md:-ml-40` / `ml-6 md:ml-20`. Face stays visible; `v` slightly left of `h`.

## Menu bar (`src/components/MenuBar.jsx`)

Three-column grid: left | centered clock | right.

- Left: **pink health HUD** (`public/images/health-hud.png`, cropped from `public/icons/Compact pink heart health HUD icon.png` with ~32px transparent margin so the heart circle is not clipped) then **resume** in Pricedown (`hero-menu-resume-btn`). Class `hero-menu-health`: height `1.35rem` / `1.55rem` desktop, `object-contain`, brand cluster has `overflow-visible` + slight vertical padding. Linux icon removed.
- Center: live clock via `src/hooks/useLocalClock.js` (1s). dayjs `ddd, MMM D h:mm A`.
- Right: Email, GitHub, **YouTube** (`https://www.youtube.com/@ANAMASGARD`), LinkedIn, X, **speaker**, **wallpaper switch**.
  - Social glyphs: `src/content/socials.js` → `menuBarSocials`, `src/components/StatusGlyphs.jsx` (includes `YoutubeGlyph`). **Color:** `#0a0a0a` on `.mac-status-link`.
  - Speaker: play/pause only; see audio section.
  - Switch aria-labels: “Show classic wallpaper” / “Show car wallpaper”.

Menu bar background fully transparent.

## Dock (`src/components/Dock.jsx`, `src/apps/registry.js`)

Four icons: Finder → finder, App Store → safari (Projects), Notes → notes (Blogs), Calendar → contact (Experience). Photos not on dock. Hover label above icon; only hovered icon lifts. Icons `size-10`. `calendar.svg` is custom; exclude from `scripts/sync-mactahoe-icons.mjs`.

## Windows

- `src/hoc/WindowWrapper.jsx`: drag title bar; resize min 280×180; open animation sets `el.style.display = ""` (not `"block"`) so `.mac-window { display: flex }` layout holds (Finder footer/status).
- **Traffic lights** (`WindowControls.jsx`): on the **right** of **every** window header (`#window-controls`: `order: 30`, `margin-left: auto`). Order: yellow minimize, green maximize, red close. Hover shows `−`, `+`, `×`.
- Finder, Safari, Photos, Contact, Terminal, Resume, Notes, Text, Image.

## Finder (`src/windows/Finder.jsx`, `src/store/finder.js`)

- **Look:** solid dark file pane `#161618`. **Toolbar** (`#finder #window-header.finder-toolbar`) solid black — “Work” area not glass. **Left sidebar only** is Tahoe glass (`backdrop-filter` blur + tint) from below toolbar to bottom; on md+ `#finder.mac-window` uses a gradient so only the right pane is opaque and wallpaper shows through the sidebar.
- **Folder icons:** MacTahoe color places under `public/images/folders/` (code, projects, music, etc.). Sync script must not grey these with `--dark`.
- **State:** history `navigate`/`goBack`/`goForward`, `viewMode` grid|list, `query`, `selectedId`.
- **Interaction:** click select; double-click open (touch: single tap). Trash empty; search “No results”. Status “N items” at bottom of file pane (`mt-auto`).
- Data: `src/content/finderLocations.js` (no absolute `position` fields).

## Icons & audio

- MacTahoe sync: `scripts/sync-mactahoe-icons.mjs --dark`; `public/macos-icons/ATTRIBUTION.md`.
- `AudioContext.jsx`: `/music/gta-music.mp3`, loop, volume 0.8. **No autoplay** and no play-on-first-click — off until user clicks menu-bar speaker (toggle play/pause).

## Dev ergonomics

- `.vscode/settings.json`: `css.lint.unknownAtRules: ignore`, CSS files associated with Tailwind — clears false “Unknown @apply/@theme” Problems panel noise.

## Removed from hero

White decorative bars and “Namaste” title removed from `Wallpaper.jsx`.
