# gaurav-chad — agent memory

Single-page portfolio: GTA-style hero wallpaper with a macOS-like desktop on top. React 19, Vite, Tailwind 4, GSAP, Zustand. Path aliases: `#apps` `#components` `#content` `#store` `#windows` `#sections` `#hoc`.

## Shell

- `src/App.jsx`: `AudioProvider` → `Intro` (GC mask) → `Wallpaper` (hero) → `Desktop` (sibling layer, not inside the transformed `.main`).
- Hero stays: sky, character, “gaurav / chaudhary”, Wanted badge, radar. Below-hero sections were removed.
- Desktop is empty. No folders, no Notes shortcut. Projects live in Finder only.
- Dark chrome: `Desktop` wrapper class `mac-dark`. Styles in `src/index.css`.

## Menu bar (`src/components/MenuBar.jsx`)

Three-column grid: left | centered clock | right.

- Left: Linux Tux (`public/images/linux.png`, copied from `public/icons/linux.png`) then **resume** in Pricedown (`hero-menu-resume-btn`). “Namaste” and “Gaurav’s Portfolio” are gone. Menu items Projects, Contact, and Notes were removed. Only Resume opens a window. Hover: text turns yellow with a short dash. No button chrome.
- Center: live clock via `src/hooks/useLocalClock.js` (1s tick). Formatted with dayjs as `ddd, MMM D h:mm A` in the **viewer’s local timezone** (browser/OS; no IP or dayjs timezone plugin). `dateTime` is UTC ISO on the `<time>` element.
- Right, in order: Email, GitHub, LinkedIn, X, **speaker**, then an on/off **switch**.
  - Socials: `src/content/socials.js` → `menuBarSocials`. White glyphs in `src/components/StatusGlyphs.jsx`. Links: GitHub `ANAMASGARD`, LinkedIn `mrnobody-flex-680baa215`, X `GauravC18959107`, mailto `github.chasing449@aleeas.com`.
  - Speaker (right of X) is the only soundtrack control. Waves while playing, slash when stopped. Uses `useAudio().toggle`.
  - The switch is local state only (`switchOn`). It does **not** control audio. Purpose is not assigned yet.

Menu bar background is fully transparent (no blur, no border).

## Dock (`src/components/Dock.jsx`, labels in `src/apps/registry.js`)

Four icons. Icon stays; only the hover label changed.

| Icon file | Opens window | Hover label |
|---|---|---|
| `finder.svg` | `finder` | Finder |
| `appstore.svg` | `safari` | Projects |
| `notes.svg` (MacTahoe `tomboy.svg`, yellow notepad) | `notes` | Blogs |
| `calendar.svg` | `contact` | Experience |

Photos was removed from the dock. The Photos window still exists and can be opened in code, but there is no dock or menu entry.

- Labels are our own bubbles (`.dock-label`), always centered above the icon. `react-tooltip` was uninstalled. Do not put the label to the side.
- Hover lifts **only** the icon under the cursor (`scale` 1.3, `y` -10, `transform-origin` bottom). Neighbors do not move.
- Dock must stay `overflow: visible`. A scrolling dock clips the lift. Icons are `size-10` (40px). Do not enlarge the dock.
- `calendar.svg` is a **hand-drawn** dotted calendar (red band, dark dots, one red dot). It is **not** in `scripts/sync-mactahoe-icons.mjs`. Re-running that script must not overwrite it. MacTahoe and WhiteSur only have “Tue 1” / date calendars, not this dotted one.

## Windows

- Wrapper: `src/hoc/WindowWrapper.jsx`. Close / minimize / maximize are on the **right** (`#window-controls` `order: 21`).
- Title bar (`.window-drag-handle`) is `cursor: grab`. Drag moves the window. Edges and corners resize it (min 280×180). Maximized windows do not drag or resize.
- Windows: Finder, Safari (live projects), Photos, Contact, Terminal, Resume, Notes, Text, Image.

## Icons

- `scripts/sync-mactahoe-icons.mjs` pulls SVGs from [vinceliuice/MacTahoe-icon-theme](https://github.com/vinceliuice/MacTahoe-icon-theme). `--dark` swaps grey folders and dark trash. Attribution: `public/macos-icons/ATTRIBUTION.md`.
- Notes dock icon source is `src/apps/scalable/tomboy.svg`, not `ms-onenote.svg` (that one is purple).
- Linux logo PNG has a solid black background.

## Audio

- `src/components/AudioContext.jsx`, track `/music/gta-music.mp3`, loops, tries to autoplay muted then unmute.
- Speaker button toggles play/pause. The menu switch does not.

## Hero leftovers removed

White decorative bars and the big “Namaste” title were removed from `src/sections/Wallpaper.jsx`.
