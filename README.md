# Gaurav Chaudhary — Portfolio

GTA-style hero with a macOS desktop shell (dock, Finder, windows).

## macOS icons

UI icons are from [MacTahoe Icon Theme](https://github.com/vinceliuice/MacTahoe-icon-theme) (GPL-3.0). See [public/macos-icons/ATTRIBUTION.md](public/macos-icons/ATTRIBUTION.md). Refresh icons:

```bash
node scripts/sync-mactahoe-icons.mjs --dark
```

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
