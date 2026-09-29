import {useMemo, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuChevronRight, LuFolder} from "react-icons/lu";

type Kind = "video" | "photos" | "apps" | "documents" | "other";

interface Entry {
    name: string;
    /** Size in gigabytes, only on files. Folders add up their children. */
    size?: number;
    kind?: Kind;
    children?: Entry[];
}

const kinds: Record<Kind, {label: string; bar: string; dot: string}> = {
    video: {label: "Video", bar: "bg-violet-500", dot: "bg-violet-500"},
    photos: {label: "Photos", bar: "bg-sky-500", dot: "bg-sky-500"},
    apps: {label: "Apps", bar: "bg-amber-500", dot: "bg-amber-500"},
    documents: {label: "Documents", bar: "bg-emerald-500", dot: "bg-emerald-500"},
    other: {label: "Other", bar: "bg-zinc-400 dark:bg-zinc-500", dot: "bg-zinc-400 dark:bg-zinc-500"},
};

const DISK_GB = 512;

const disk: Entry[] = [
    {
        name: "Movies",
        children: [
            {name: "Wedding edit 4K.mov", size: 86.4, kind: "video"},
            {name: "Drone reels", children: [{name: "Coastline.mp4", size: 18.2, kind: "video"}, {name: "Harbor at dusk.mp4", size: 11.7, kind: "video"}]},
            {name: "Screen recordings", children: [{name: "Onboarding demo.mov", size: 3.1, kind: "video"}, {name: "Bug repro.mov", size: 0.8, kind: "video"}]},
        ],
    },
    {
        name: "Pictures",
        children: [
            {name: "Photos Library.photoslibrary", size: 74.6, kind: "photos"},
            {name: "RAW imports", children: [{name: "Iceland 2025", size: 22.3, kind: "photos"}, {name: "Studio headshots", size: 6.9, kind: "photos"}]},
        ],
    },
    {
        name: "Applications",
        children: [
            {name: "Xcode.app", size: 34.8, kind: "apps"},
            {name: "Final Cut Pro.app", size: 6.2, kind: "apps"},
            {name: "Figma.app", size: 0.6, kind: "apps"},
        ],
    },
    {
        name: "Documents",
        children: [
            {name: "Client archive", children: [{name: "Acme 2024.zip", size: 9.4, kind: "documents"}, {name: "Lumen contracts", size: 1.2, kind: "documents"}]},
            {name: "Tax returns", size: 0.4, kind: "documents"},
        ],
    },
    {name: "Library caches", size: 17.9, kind: "other"},
    {name: "Downloads", children: [{name: "ubuntu-24.04.iso", size: 5.7, kind: "other"}, {name: "Installers", size: 3.3, kind: "apps"}]},
];

const sizeOf = (entry: Entry): number => (entry.children ? entry.children.reduce((sum, child) => sum + sizeOf(child), 0) : entry.size ?? 0);

const kindTotals = (entries: Entry[], totals: Record<Kind, number> = {video: 0, photos: 0, apps: 0, documents: 0, other: 0}) => {
    for (const entry of entries) {
        if (entry.children) kindTotals(entry.children, totals);
        else totals[entry.kind ?? "other"] += entry.size ?? 0;
    }
    return totals;
};

// The kind that takes the most space inside a folder decides the color of its bar.
const mainKind = (entry: Entry): Kind => {
    if (!entry.children) return entry.kind ?? "other";
    const totals = kindTotals(entry.children);
    return (Object.keys(totals) as Kind[]).reduce((best, kind) => (totals[kind] > totals[best] ? kind : best), "other");
};

const formatGb = (gb: number) => (gb >= 1 ? `${gb.toFixed(1)} GB` : `${Math.round(gb * 1000)} MB`);

const StorageTree = () => {
    const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["Movies"]));
    const [sortBy, setSortBy] = useState<"size" | "name">("size");
    const reduceMotion = useReducedMotion();

    const totals = useMemo(() => kindTotals(disk), []);
    const used = Object.values(totals).reduce((sum, value) => sum + value, 0);
    const largest = Math.max(...disk.map(sizeOf));

    const sorted = (entries: Entry[]) =>
        [...entries].sort((a, b) => (sortBy === "size" ? sizeOf(b) - sizeOf(a) : a.name.localeCompare(b.name)));

    const toggle = (path: string) =>
        setExpanded((current) => {
            const next = new Set(current);
            if (next.has(path)) next.delete(path);
            else next.add(path);
            return next;
        });

    const renderEntries = (entries: Entry[], level: number, parentPath: string) => (
        <ul>
            {sorted(entries).map((entry) => {
                const path = parentPath ? `${parentPath}/${entry.name}` : entry.name;
                const size = sizeOf(entry);
                const isFolder = Boolean(entry.children);
                const isOpen = expanded.has(path);
                const kind = mainKind(entry);
                const share = size / used;
                const content = (
                    <>
                        <span className="flex min-w-0 flex-1 items-center gap-2" style={{paddingLeft: `${(level - 1) * 18}px`}}>
                            {isFolder ? (
                                <LuChevronRight className={`size-3.5 shrink-0 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} aria-hidden/>
                            ) : (
                                <span className="w-3.5 shrink-0" aria-hidden/>
                            )}
                            {isFolder ? (
                                <LuFolder className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden/>
                            ) : (
                                <span className={`ml-1 mr-0.5 size-2 shrink-0 rounded-full ${kinds[kind].dot}`} aria-hidden/>
                            )}
                            <span className="truncate text-sm text-zinc-800 dark:text-zinc-200">{entry.name}</span>
                        </span>
                        {/* The bar is relative to the largest top level item so small files stay visible. */}
                        <span className="hidden h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-zinc-100 sm:block md:w-32 dark:bg-white/[0.06]" aria-hidden>
                            <motion.span
                                className={`block h-full origin-left rounded-full ${kinds[kind].bar}`}
                                initial={reduceMotion ? false : {scaleX: 0}}
                                animate={{scaleX: Math.max(size / largest, 0.02)}}
                                transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                            />
                        </span>
                        <span className="w-16 shrink-0 text-right text-xs tabular-nums text-zinc-600 dark:text-zinc-300">{formatGb(size)}</span>
                        <span className="hidden w-10 shrink-0 text-right text-xs tabular-nums text-zinc-400 sm:block dark:text-zinc-500">
                            {share < 0.01 ? "<1%" : `${Math.round(share * 100)}%`}
                        </span>
                    </>
                );
                const rowClass = "flex h-9 w-full items-center gap-3 rounded-lg px-2 text-left transition-colors";
                return (
                    <li key={path}>
                        {isFolder ? (
                            <button
                                type="button"
                                onClick={() => toggle(path)}
                                aria-expanded={isOpen}
                                aria-label={`${entry.name}, ${formatGb(size)}`}
                                className={`${rowClass} hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60 dark:hover:bg-white/[0.04]`}
                            >
                                {content}
                            </button>
                        ) : (
                            <div className={rowClass}>{content}</div>
                        )}
                        {isFolder && (
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        className="overflow-hidden"
                                        initial={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                        animate={{height: "auto", opacity: 1}}
                                        exit={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                        transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        {renderEntries(entry.children ?? [], level + 1, path)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="px-5 pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Macintosh HD</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{formatGb(used)}</span> of {DISK_GB} GB used
                    </p>
                </div>
                <div className="mt-3 flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]" role="img" aria-label={`${formatGb(used)} of ${DISK_GB} GB used`}>
                    {(Object.keys(kinds) as Kind[]).map((kind) => (
                        <motion.span
                            key={kind}
                            className={`h-full ${kinds[kind].bar}`}
                            initial={reduceMotion ? false : {width: 0}}
                            animate={{width: `${(totals[kind] / DISK_GB) * 100}%`}}
                            transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                        />
                    ))}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {(Object.keys(kinds) as Kind[]).map((kind) => (
                        <li key={kind} className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                            <span className={`size-2 rounded-full ${kinds[kind].dot}`} aria-hidden/>
                            {kinds[kind].label}
                            <span className="tabular-nums text-zinc-400 dark:text-zinc-500">{formatGb(totals[kind])}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 flex items-center justify-between border-y border-zinc-100 px-5 py-2 dark:border-white/[0.06]">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Folders</p>
                <div className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-white/[0.06]" role="group" aria-label="Sort by">
                    {(["size", "name"] as const).map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setSortBy(option)}
                            aria-pressed={sortBy === option}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${
                                sortBy === option
                                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">{renderEntries(disk, 1, "")}</div>
        </div>
    );
};

export default StorageTree;
