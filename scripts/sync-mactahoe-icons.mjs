#!/usr/bin/env node
/**
 * Download MacTahoe icons from GitHub.
 * Usage: node scripts/sync-mactahoe-icons.mjs [--dark]
 * Replaces local assets only if ALL required downloads succeed.
 */
import { mkdir, rename, unlink, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE =
  "https://raw.githubusercontent.com/vinceliuice/MacTahoe-icon-theme/main";

/** @type {{ dest: string; remotePath: string; required?: boolean }[]} */
const ICON_MAP = [
  { dest: "public/images/finder.svg", remotePath: "src/apps/scalable/file-manager.svg" },
  {
    dest: "public/images/appstore.svg",
    remotePath: "src/apps/scalable/softwarecenter.svg",
  },
  { dest: "public/images/safari.svg", remotePath: "src/apps/scalable/safari.svg" },
  { dest: "public/images/photos.svg", remotePath: "src/apps/scalable/shotwell.svg" },
  { dest: "public/images/contact.svg", remotePath: "src/apps/scalable/addressbook.svg" },
  { dest: "public/images/terminal.svg", remotePath: "src/apps/scalable/terminal.svg" },
  { dest: "public/images/trash.svg", remotePath: "src/places/scalable/user-trash.svg" },
  { dest: "public/images/notes.svg", remotePath: "src/apps/scalable/tomboy.svg" },
  { dest: "public/images/folder.svg", remotePath: "src/places/scalable/folder.svg" },
  { dest: "public/images/txt.svg", remotePath: "src/mimes/scalable/text-x-generic.svg" },
  { dest: "public/images/pdf.svg", remotePath: "src/mimes/scalable/application-pdf.svg" },
  { dest: "public/images/image.svg", remotePath: "src/mimes/scalable/image-x-generic.svg" },
  { dest: "public/images/plain.svg", remotePath: "src/apps/scalable/figma.svg" },
  { dest: "public/icons/wifi.svg", remotePath: "src/devices/scalable/network-wireless.svg" },
  {
    dest: "public/icons/search.svg",
    remotePath: "src/apps/scalable/preferences-system-search.svg",
  },
  {
    dest: "public/images/logo.svg",
    remotePath: "src/status/32/start-here.svg",
    required: false,
  },
  { dest: "public/icons/github.svg", remotePath: "src/apps/scalable/github-desktop.svg" },
  { dest: "public/icons/twitter.svg", remotePath: "src/apps/scalable/twitter.svg" },
  { dest: "public/icons/linkedin.svg", remotePath: "src/apps/scalable/linkedin.svg" },
  { dest: "public/icons/user.svg", remotePath: "src/apps/scalable/emblem-mail.svg" },
  {
    dest: "public/icons/work.svg",
    remotePath: "src/places/scalable/folder-documents.svg",
  },
  { dest: "public/icons/info.svg", remotePath: "src/actions/22/help-about.svg" },
  {
    dest: "public/icons/file.svg",
    remotePath: "src/places/scalable/folder-documents.svg",
  },
  { dest: "public/icons/trash.svg", remotePath: "src/places/scalable/user-trash.svg" },
];

/** Grey / dark place icons (MacTahoe color-grey set) */
const DARK_ICON_OVERRIDES = {
  "public/images/folder.svg": "src/places/scalable/grey-folder-documents.svg",
  "public/images/trash.svg": "src/places/scalable/user-trash-dark.svg",
  "public/icons/trash.svg": "src/places/scalable/user-trash-dark.svg",
  "public/icons/work.svg": "src/places/scalable/grey-folder-documents.svg",
  "public/icons/file.svg": "src/places/scalable/grey-folder-documents.svg",
};

const useDark = process.argv.includes("--dark");

const LEGACY_PNGS = [
  "public/images/finder.png",
  "public/images/safari.png",
  "public/images/photos.png",
  "public/images/contact.png",
  "public/images/terminal.png",
  "public/images/trash.png",
  "public/images/folder.png",
  "public/images/txt.png",
  "public/images/pdf.png",
  "public/images/image.png",
  "public/images/plain.png",
];

function isValidSvg(text) {
  const t = text.trim();
  return t.length > 32 && (t.startsWith("<svg") || t.startsWith("<?xml"));
}

async function downloadEntry({ dest, remotePath, required = true }) {
  const absDest = join(ROOT, dest);
  const tmpPath = `${absDest}.tmp`;
  const url = `${BASE}/${remotePath}`;

  const res = await fetch(url);
  if (!res.ok) {
    return { dest, ok: false, error: `HTTP ${res.status} for ${url}`, required };
  }
  const body = await res.text();
  if (!isValidSvg(body)) {
    return { dest, ok: false, error: "Not valid SVG content", required };
  }

  await mkdir(dirname(absDest), { recursive: true });
  await writeFile(tmpPath, body, "utf8");
  return { dest, ok: true, tmpPath, absDest, required };
}

async function cleanupTemps(results) {
  for (const r of results) {
    if (r.tmpPath) {
      try {
        await unlink(r.tmpPath);
      } catch {
        /* ignore */
      }
    }
  }
}

function buildIconMap() {
  if (!useDark) return ICON_MAP;
  return ICON_MAP.map((entry) => ({
    ...entry,
    remotePath: DARK_ICON_OVERRIDES[entry.dest] ?? entry.remotePath,
  }));
}

async function main() {
  console.log("Fetching MacTahoe icons from", BASE, useDark ? "(dark place icons)" : "");
  const results = [];

  for (const entry of buildIconMap()) {
    try {
      const r = await downloadEntry(entry);
      results.push(r);
      console.log(r.ok ? `  OK  ${entry.dest}` : `  FAIL ${entry.dest}: ${r.error}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({
        dest: entry.dest,
        ok: false,
        error: msg,
        required: entry.required !== false,
      });
      console.log(`  FAIL ${entry.dest}: ${msg}`);
    }
  }

  const failedRequired = results.filter((r) => !r.ok && r.required !== false);
  const failedOptional = results.filter((r) => !r.ok && r.required === false);

  if (failedOptional.length) {
    console.log("\nOptional icons skipped (keeping existing files):");
    for (const f of failedOptional) {
      console.log(`  - ${f.dest}: ${f.error}`);
    }
  }

  if (failedRequired.length) {
    console.error("\nRequired downloads failed. Existing icons were NOT modified.");
    for (const f of failedRequired) {
      console.error(`  - ${f.dest}: ${f.error}`);
    }
    await cleanupTemps(results);
    process.exit(1);
  }

  const okResults = results.filter((r) => r.ok);
  for (const r of okResults) {
    await rename(r.tmpPath, r.absDest);
  }

  console.log("\nRemoving legacy PNG dock/finder icons...");
  for (const rel of LEGACY_PNGS) {
    try {
      await unlink(join(ROOT, rel));
      console.log(`  removed ${rel}`);
    } catch {
      /* already gone */
    }
  }

  console.log(`\nDone. ${okResults.length} SVG(s) installed.`);
}

main();
