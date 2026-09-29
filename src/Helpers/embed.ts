// "Embed mode" renders a single example preview as a full page, for the responsive preview iframe.
//   /components/normal-button?embed=2&theme=dark&bg=dots
// shows the third preview frame on that page (0-based), in dark mode, and nothing else.
// The example runs in its own window, so media queries, window/document listeners and
// position: fixed elements behave exactly as they would in a real app.

import type {PreviewPattern, Theme} from "@/Store/Index.ts";

const params = typeof window === "undefined" ? new URLSearchParams() : new URLSearchParams(window.location.search);
const rawIndex = params.get("embed");

/** Index of the preview frame to show, or null when this is a normal page view. */
export const embedIndex: number | null = rawIndex !== null && /^\d+$/.test(rawIndex) ? Number(rawIndex) : null;
export const isEmbed = embedIndex !== null;

export const embedTheme: Theme | null = isEmbed && (params.get("theme") === "light" || params.get("theme") === "dark")
    ? (params.get("theme") as Theme)
    : null;

export const embedPattern: PreviewPattern | null = isEmbed && ["dots", "grid", "plain"].includes(params.get("bg") ?? "")
    ? (params.get("bg") as PreviewPattern)
    : null;

/** URL that shows one preview frame of the current page on its own. */
export const embedUrl = (index: number, theme: Theme, pattern: PreviewPattern) => {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = new URLSearchParams({embed: String(index), theme, bg: pattern}).toString();
    return url.toString();
};

if (isEmbed && typeof document !== "undefined") document.documentElement.dataset.embed = String(embedIndex);
