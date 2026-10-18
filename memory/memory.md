# gaurav-chad — agent memory

Single-page portfolio: GTA-style hero wallpaper with a macOS-like desktop on top. React 19, Vite, Tailwind 4, GSAP, Zustand. Path aliases: `#apps` `#components` `#content` `#store` `#windows` `#sections` `#hoc`.

## Shell

- `src/App.jsx`: `AudioProvider` → `Intro` (GC mask) → `Wallpaper` (hero) → `Desktop` (sibling layer, not inside the transformed `.main`).
- Hero: “gaurav / chaudhary”, Wanted badge, radar always visible. Below-hero scroll sections were removed.
- Desktop is empty. No folders, no Notes shortcut. Projects live in Finder only.
- Dark chrome: `Desktop` wrapper class `mac-dark`. Styles in `src/index.css`.

## Hero wallpaper toggle (`src/store/wallpaper.js`, `src/sections/Wallpaper.jsx`)

- **Default (switch off):** car photo `/images/gaurav-bg-car.webp` (WebP; PNG removed). Full-bleed `object-cover`, class `wallpaper-car`. No character cutout or ground shadows.
- **Classic (switch on):** GTA sky `gta-bg-v3.webp` + character `gaurav-gta6-v2.webp`. Crossfade ~500ms. `classic` is **not** persisted (every visit starts on car).
- Menu-bar switch: `useWallpaperStore().toggleClassic` in `MenuBar.jsx`. Does **not** control audio.

## Hero title (`.hero-name` in `src/index.css`)

- **Car wallpaper:** hollow white outline (`color: transparent`, `-webkit-text-stroke`), fill shows through.
- **Classic wallpaper:** solid white (`.hero-name.is-filled`), toggled with `classic`.
- **Car-only layout:** “gaurav” shifted left via `-translate-x-[15.5vw] md:-translate-x-[23.5vw]`; “chaudhary” shifted right via `translate-x-[8vw] md:translate-x-[12vw]`. Classic keeps original `-ml-8 md:-ml-40` / `ml-6 md:ml-20`. Tuned so face stays visible; `v` sits slightly left of `h` over “chaudhary”.

## Menu bar (`src/components/MenuBar.jsx`)

Three-column grid: left | centered clock | right.

- Left: Linux Tux (`public/images/linux.png`) then **resume** in Pricedown (`hero-menu-resume-btn`). Only Resume opens a window. Hover: yellow text + short dash.
- Center: live clock via `src/hooks/useLocalClock.js` (1s). dayjs `ddd, MMM D h:mm A` in viewer local timezone.
- Right: Email, GitHub, LinkedIn, X, **speaker**, **wallpaper switch**.
  - Social glyphs: `src/content/socials.js` → `menuBarSocials`, `src/components/StatusGlyphs.jsx`. **Color:** dark black `#0a0a0a` on `.mac-status-link` (not white).
  - Speaker: `useAudio().toggle`. Class `mac-status-link--speaker` — slightly larger SVG (`1.125rem`), thicker wave/slash strokes (`2.25`), muted opacity `0.62`.
  - Switch aria-labels: “Show classic wallpaper” / “Show car wallpaper”.

Menu bar background fully transparent.

## Dock (`src/components/Dock.jsx`, `src/apps/registry.js`)

Four icons: Finder → finder, App Store → safari (Projects), Notes → notes (Blogs), Calendar → contact (Experience). Photos not on dock. Hover label above icon; only hovered icon lifts. Icons `size-10`. `calendar.svg` is custom; exclude from `scripts/sync-mactahoe-icons.mjs`.

## Windows

- `src/hoc/WindowWrapper.jsx`: controls on right; drag title bar; resize min 280×180.
- Finder, Safari, Photos, Contact, Terminal, Resume, Notes, Text, Image.

## Icons & audio

- MacTahoe sync: `scripts/sync-mactahoe-icons.mjs --dark`; `public/macos-icons/ATTRIBUTION.md`.
- `AudioContext.jsx`: `/music/gta-music.mp3`. Speaker toggles play/pause only.

## Removed from hero

White decorative bars and “Namaste” title removed from `Wallpaper.jsx`.
