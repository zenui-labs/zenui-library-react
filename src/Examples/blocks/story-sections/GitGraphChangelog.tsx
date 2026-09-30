import {useCallback, useId, useLayoutEffect, useMemo, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowUpRight, LuChevronDown, LuTag} from "react-icons/lu";

export type CommitKind = "feature" | "fix" | "breaking" | "chore";

export interface ReleaseNote {
    kind: "added" | "fixed" | "breaking";
    text: string;
}

export interface ChangelogCommit {
    /** Short hash, shown in monospace. */
    id: string;
    /** Commit subject. A conventional prefix such as "feat(cache):" is picked out and colored. */
    message: string;
    kind: CommitKind;
    author: string;
    /** ISO date string. */
    date: string;
    /** Column in the graph. 0 is main. */
    lane: number;
    /** Parent hashes. The first is the parent on the same branch; a second one makes this a merge commit. */
    parents: string[];
    /** A release tag on this commit. Its notes open when the tag is clicked. */
    release?: {version: string; notes: ReleaseNote[]};
}

export type ChangelogFilter = "all" | "feature" | "fix" | "breaking";

export interface GitGraphChangelogProps {
    /** Newest first, like `git log`. */
    commits: ChangelogCommit[];
    /** Name shown in the HEAD decoration on the newest commit. */
    branch?: string;
    /** Relative dates are measured from this moment. Defaults to now. */
    now?: Date;
    /** Shell command shown under open release notes. `{version}` is replaced. */
    installCommand?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    historyHref?: string;
    className?: string;
}

const LANES = [
    {stroke: "stroke-zinc-800 dark:stroke-zinc-300", fill: "fill-zinc-800 dark:fill-zinc-300"},
    {stroke: "stroke-emerald-500 dark:stroke-emerald-400", fill: "fill-emerald-500 dark:fill-emerald-400"},
    {stroke: "stroke-amber-500 dark:stroke-amber-400", fill: "fill-amber-500 dark:fill-amber-400"},
    {stroke: "stroke-sky-500 dark:stroke-sky-400", fill: "fill-sky-500 dark:fill-sky-400"},
];

const AVATARS = [
    "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-200",
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
    "bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-200",
    "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200",
    "bg-zinc-200 text-zinc-800 dark:bg-white/10 dark:text-zinc-200",
];

const PREFIX_TONE: Record<string, string> = {
    feat: "text-emerald-700 dark:text-emerald-400",
    fix: "text-sky-700 dark:text-sky-400",
    chore: "text-zinc-500 dark:text-zinc-400",
};

const FILTERS: {id: ChangelogFilter; label: string}[] = [
    {id: "all", label: "All"},
    {id: "feature", label: "Features"},
    {id: "fix", label: "Fixes"},
    {id: "breaking", label: "Breaking"},
];

const NOTE_LABEL: Record<ReleaseNote["kind"], string> = {added: "Added", fixed: "Fixed", breaking: "Breaking"};

const LANE_GAP = 16;
const LANE_START = 14;
// Where the dot sits in a full row: the middle of the first text line.
const DOT_Y = 23;
const COLLAPSED = 14;
const EASE = [0.22, 1, 0.36, 1] as const;

const laneX = (lane: number) => LANE_START + lane * LANE_GAP;

const relative = (iso: string, now: Date) => {
    const format = new Intl.RelativeTimeFormat("en", {numeric: "auto"});
    const days = Math.round((new Date(iso).getTime() - now.getTime()) / 86_400_000);
    if (Math.abs(days) < 1) return "today";
    if (Math.abs(days) < 14) return format.format(days, "day");
    if (Math.abs(days) < 60) return format.format(Math.round(days / 7), "week");
    return format.format(Math.round(days / 30), "month");
};

interface Edge {
    key: string;
    d: string;
    lane: number;
    /** Row the edge starts at, for staggering the draw-in from the oldest commit up. */
    row: number;
}

/**
 * A changelog drawn as a git history: main plus feature branches that fork and merge, release tags that open their
 * notes, and filter chips that fold unrelated commits down to a hairline while the graph keeps its shape.
 */
export const GitGraphChangelog = ({
    commits,
    branch = "main",
    now,
    installCommand = "npm i kiln@{version}",
    eyebrow = "Changelog",
    title = "Every release, exactly as it shipped",
    description = "Read it like git log. Click a tag for its release notes, or filter down to what you care about.",
    historyHref = "#",
    className = "",
}: GitGraphChangelogProps) => {
    const uid = useId();
    const listRef = useRef<HTMLOListElement>(null);
    const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const inView = useInView(listRef, {once: true, amount: 0.2});
    const [filter, setFilter] = useState<ChangelogFilter>("all");
    const [open, setOpen] = useState<string | null>(commits.find((commit) => commit.release)?.id ?? null);
    const [hoverLane, setHoverLane] = useState<number | null>(null);
    const [layout, setLayout] = useState<{ys: number[]; height: number} | null>(null);
    const reference = useMemo(() => now ?? new Date(), [now]);

    const index = useMemo(() => new Map(commits.map((commit, row) => [commit.id, row])), [commits]);
    const lanes = Math.max(...commits.map((commit) => commit.lane)) + 1;
    const gutter = LANE_START * 2 + (lanes - 1) * LANE_GAP;

    const matches = useCallback((commit: ChangelogCommit) => filter === "all" || Boolean(commit.release) || commit.kind === filter, [filter]);

    // Rows change height when they fold or open their notes. Each change re-reads where every dot sits, so the
    // graph follows the rows frame by frame while their height animates.
    const measure = useCallback(() => {
        const list = listRef.current;
        if (!list) return;
        const ys = rowRefs.current.slice(0, commits.length).map((row) => (row ? row.offsetTop + Math.min(DOT_Y, row.offsetHeight / 2) : 0));
        const height = list.offsetHeight;
        setLayout((current) => {
            if (current && current.height === height && current.ys.every((y, i) => y === ys[i])) return current;
            return {ys, height};
        });
    }, [commits.length]);

    useLayoutEffect(() => {
        measure();
        const observer = new ResizeObserver(measure);
        rowRefs.current.forEach((row) => row && observer.observe(row));
        if (listRef.current) observer.observe(listRef.current);
        return () => observer.disconnect();
    }, [measure]);

    const edges = useMemo<Edge[]>(() => {
        if (!layout) return [];
        const result: Edge[] = [];
        commits.forEach((commit, row) => {
            const xc = laneX(commit.lane);
            const yc = layout.ys[row];
            commit.parents.forEach((parentId, order) => {
                const parentRow = index.get(parentId);
                if (parentRow === undefined) {
                    // History continues below the list.
                    result.push({key: `${commit.id}-${parentId}`, d: `M ${xc} ${yc} L ${xc} ${layout.height}`, lane: commit.lane, row});
                    return;
                }
                const parent = commits[parentRow];
                const xp = laneX(parent.lane);
                const yp = layout.ys[parentRow];
                const bend = Math.min(18, Math.max(0, yp - yc));
                let d: string;
                let lane = commit.lane;
                if (parent.lane === commit.lane) {
                    d = `M ${xc} ${yc} L ${xc} ${yp}`;
                } else if (order > 0) {
                    // Merge: leave the merge commit sideways, then run down the branch to its tip.
                    d = `M ${xc} ${yc} C ${xc} ${yc + bend * 0.6} ${xp} ${yc + bend * 0.4} ${xp} ${yc + bend} L ${xp} ${yp}`;
                    lane = parent.lane;
                } else {
                    // Fork: run down the branch, then bend into the commit it started from.
                    d = `M ${xc} ${yc} L ${xc} ${yp - bend} C ${xc} ${yp - bend * 0.4} ${xp} ${yp - bend * 0.6} ${xp} ${yp}`;
                }
                result.push({key: `${commit.id}-${parentId}`, d, lane, row});
            });
        });
        return result;
    }, [commits, index, layout]);

    const counts = useMemo(() => ({
        all: commits.length,
        feature: commits.filter((commit) => commit.kind === "feature").length,
        fix: commits.filter((commit) => commit.kind === "fix").length,
        breaking: commits.filter((commit) => commit.kind === "breaking").length,
    }), [commits]);

    const animateIn = !reduceMotion;
    const dim = (lane: number) => (hoverLane === null || hoverLane === lane ? 1 : 0.22);

    return (
        <section className={`relative w-full overflow-hidden bg-white px-4 py-16 text-zinc-900 sm:px-8 sm:py-24 dark:bg-zinc-950 dark:text-white ${className}`}>
            <div className="relative mx-auto max-w-5xl">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-xl">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{eyebrow}</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
                        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
                    </div>
                    <div role="group" aria-label="Filter commits" className="flex flex-wrap gap-1.5">
                        {FILTERS.map((item) => {
                            const selected = filter === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => setFilter(item.id)}
                                    className={`relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 ${selected ? "border-transparent text-white dark:text-zinc-900" : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"}`}
                                >
                                    {selected && (
                                        <motion.span
                                            layoutId={`${uid}-chip`}
                                            className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white"
                                            transition={{type: "spring", stiffness: 500, damping: 38}}
                                        />
                                    )}
                                    {item.id === "breaking" && <span aria-hidden="true" className="relative h-1.5 w-1.5 rounded-full bg-red-500"/>}
                                    <span className="relative">{item.label}</span>
                                    <span className={`relative font-mono text-xs tabular-nums ${selected ? "opacity-60" : "text-zinc-400 dark:text-zinc-500"}`}>{counts[item.id]}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_24px_48px_-32px_rgba(24,24,27,0.25)] sm:mt-12 dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
                    <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-2.5 font-mono text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                        <span className="truncate">git log --graph --decorate <span className="text-zinc-400 dark:text-zinc-600">{branch}</span></span>
                        <span className="shrink-0 tabular-nums">{commits.length} commits</span>
                    </div>

                    <div className="relative">
                        <ol ref={listRef} className="relative" onMouseLeave={() => setHoverLane(null)}>
                            {commits.map((commit, row) => {
                                const shown = matches(commit);
                                const isOpen = open === commit.id && Boolean(commit.release);
                                const prefix = /^(\w+)(\([^)]*\))?(!)?:\s*/.exec(commit.message);
                                const subject = prefix ? commit.message.slice(prefix[0].length) : commit.message;
                                const initials = commit.author.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
                                const avatar = AVATARS[[...commit.author].reduce((sum, char) => sum + char.charCodeAt(0), 0) % AVATARS.length];
                                const notesId = `${uid}-notes-${commit.id}`;
                                return (
                                    <li
                                        key={commit.id}
                                        ref={(node) => {
                                            rowRefs.current[row] = node;
                                        }}
                                        onMouseEnter={() => setHoverLane(commit.lane)}
                                        aria-hidden={shown ? undefined : true}
                                        className={`relative border-zinc-100 transition-colors dark:border-white/[0.04] ${row > 0 ? "border-t" : ""} ${hoverLane === commit.lane && shown ? "bg-zinc-50/80 dark:bg-white/[0.02]" : ""}`}
                                    >
                                        <motion.div
                                            initial={false}
                                            animate={{height: shown ? "auto" : COLLAPSED, opacity: shown ? 1 : 0}}
                                            transition={{duration: reduceMotion ? 0 : 0.45, ease: EASE}}
                                            className="overflow-hidden"
                                        >
                                            <div className="py-3 pr-4" style={{paddingLeft: gutter + 4}}>
                                                <div className="flex flex-col gap-x-6 gap-y-1.5 sm:flex-row sm:items-center">
                                                    <p className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-5">
                                                        {row === 0 && (
                                                            <span className="rounded-md border border-emerald-600/30 px-1.5 font-mono text-[11px] leading-5 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400">
                                                                HEAD → {branch}
                                                            </span>
                                                        )}
                                                        {commit.release && (
                                                            <button
                                                                type="button"
                                                                aria-expanded={isOpen}
                                                                aria-controls={notesId}
                                                                tabIndex={shown ? 0 : -1}
                                                                onClick={() => setOpen(isOpen ? null : commit.id)}
                                                                className="inline-flex items-center gap-1 rounded-md bg-zinc-900 py-px pl-1.5 pr-1 font-mono text-[11px] font-medium leading-5 text-white outline-none transition-colors hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                                                            >
                                                                <LuTag className="h-3 w-3" aria-hidden="true"/>
                                                                {commit.release.version}
                                                                <LuChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true"/>
                                                            </button>
                                                        )}
                                                        <span className="min-w-0 truncate">
                                                            {prefix && (
                                                                <span className={`font-mono text-[13px] ${prefix[3] ? "text-red-600 dark:text-red-400" : PREFIX_TONE[prefix[1]] ?? "text-zinc-500"}`}>
                                                                    {prefix[0].trim()}{" "}
                                                                </span>
                                                            )}
                                                            <span className="text-zinc-800 dark:text-zinc-200">{subject}</span>
                                                        </span>
                                                    </p>
                                                    <div className="flex shrink-0 items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                                                        <span title={commit.author} className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold ${avatar}`}>
                                                            <span className="sr-only">{commit.author}</span>
                                                            <span aria-hidden="true">{initials}</span>
                                                        </span>
                                                        <span className="font-mono text-zinc-400 dark:text-zinc-500">{commit.id}</span>
                                                        <time dateTime={commit.date} title={new Date(commit.date).toDateString()} className="w-24 text-right tabular-nums max-sm:w-auto max-sm:text-left">
                                                            {relative(commit.date, reference)}
                                                        </time>
                                                    </div>
                                                </div>

                                                <AnimatePresence initial={false}>
                                                    {isOpen && commit.release && (
                                                        <motion.div
                                                            id={notesId}
                                                            initial={{height: 0, opacity: 0}}
                                                            animate={{height: "auto", opacity: 1}}
                                                            exit={{height: 0, opacity: 0}}
                                                            transition={{duration: reduceMotion ? 0 : 0.4, ease: EASE}}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                                                                {(["breaking", "added", "fixed"] as const).map((kind) => {
                                                                    const notes = commit.release?.notes.filter((note) => note.kind === kind) ?? [];
                                                                    if (!notes.length) return null;
                                                                    return (
                                                                        <div key={kind} className="mb-3 last:mb-0">
                                                                            <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${kind === "breaking" ? "text-red-600 dark:text-red-400" : "text-zinc-500 dark:text-zinc-400"}`}>
                                                                                {NOTE_LABEL[kind]}
                                                                            </p>
                                                                            <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                                                                {notes.map((note) => (
                                                                                    <li key={note.text} className="flex gap-2">
                                                                                        <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"/>
                                                                                        {note.text}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    );
                                                                })}
                                                                {installCommand && (
                                                                    <p className="mt-4 overflow-x-auto whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300 dark:bg-black/50">
                                                                        <span className="select-none text-zinc-500">$ </span>
                                                                        {installCommand.replace("{version}", commit.release.version.replace(/^v/, ""))}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    </li>
                                );
                            })}
                        </ol>
                        {layout && (
                            <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0" width={gutter} height={layout.height}>
                                {edges.map((edge) => (
                                    <motion.path
                                        key={edge.key}
                                        d={edge.d}
                                        fill="none"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        className={LANES[edge.lane % LANES.length].stroke}
                                        initial={animateIn ? {pathLength: 0} : false}
                                        animate={{pathLength: inView || !animateIn ? 1 : 0, opacity: dim(edge.lane)}}
                                        transition={{
                                            pathLength: {duration: 0.5, ease: EASE, delay: (commits.length - edge.row) * 0.06},
                                            opacity: {duration: 0.2},
                                        }}
                                    />
                                ))}
                                {commits.map((commit, row) => {
                                    const shown = matches(commit);
                                    const merge = commit.parents.length > 1;
                                    const lane = LANES[commit.lane % LANES.length];
                                    const radius = commit.release ? 6 : shown ? 4.5 : 2.5;
                                    return (
                                        <g key={commit.id} style={{opacity: dim(commit.lane), transition: "opacity 200ms"}}>
                                            <motion.circle
                                                cx={laneX(commit.lane)}
                                                cy={layout.ys[row]}
                                                initial={animateIn ? {scale: 0} : false}
                                                animate={{scale: inView || !animateIn ? 1 : 0, r: radius}}
                                                transition={{
                                                    scale: {type: "spring", stiffness: 500, damping: 22, delay: (commits.length - row) * 0.06 + 0.1},
                                                    r: {duration: 0.35, ease: EASE},
                                                }}
                                                strokeWidth={merge || commit.release ? 2 : 3}
                                                className={merge ? `fill-white dark:fill-[#111113] ${lane.stroke}` : commit.release ? `${lane.fill} stroke-white dark:stroke-[#111113]` : `${lane.fill} stroke-white dark:stroke-[#111113]`}
                                                style={{transformBox: "fill-box", transformOrigin: "center"}}
                                            />
                                            {commit.release && (
                                                <circle cx={laneX(commit.lane)} cy={layout.ys[row]} r={9} fill="none" strokeWidth={1.5} className={lane.stroke} opacity={0.35}/>
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>
                        )}

                        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-8 bg-gradient-to-t from-white to-transparent dark:from-[#111113]" style={{width: gutter}}/>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-zinc-200 px-4 py-3 text-sm dark:border-white/10">
                        <span className="text-zinc-500 dark:text-zinc-400">
                            {filter === "all" ? "Showing everything" : `Folded ${commits.filter((commit) => !matches(commit)).length} unrelated commits`}
                        </span>
                        <a href={historyHref} className="inline-flex items-center gap-1 rounded font-medium text-zinc-900 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-white">
                            Full history
                            <LuArrowUpRight className="h-4 w-4" aria-hidden="true"/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
