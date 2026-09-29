import {useEffect, useRef, useState} from "react";
import {animate, AnimatePresence, motion, MotionConfig, useInView, useMotionValue, useTransform} from "framer-motion";
import {LuArrowDown, LuArrowUp, LuPause, LuPlay} from "react-icons/lu";

export interface LeaderboardEntry {
    id: string;
    name: string;
    /** Second line under the name, such as a region or team. */
    detail: string;
    initials: string;
    /** Tailwind gradient stops for the avatar, for example "from-rose-400 to-pink-500". */
    color: string;
    total: number;
}

interface Gain {
    key: number;
    amount: number;
}

interface Board {
    source: LeaderboardEntry[];
    ranked: LeaderboardEntry[];
    gains: Record<string, Gain>;
    moves: Record<string, number>;
    nextKey: number;
}

const medals = ["bg-amber-400 text-amber-950", "bg-slate-300 text-slate-800", "bg-orange-300 text-orange-950"];
const money = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

// Highest total first. Ties keep their previous order so rows do not swap for no reason.
const rank = (entries: LeaderboardEntry[], previous: LeaderboardEntry[]) => {
    const before = new Map(previous.map((entry, index) => [entry.id, index]));
    return [...entries].sort((a, b) => b.total - a.total || (before.get(a.id) ?? 0) - (before.get(b.id) ?? 0));
};

// Compares the new entries with the last ranking to find who gained and who moved.
const nextBoard = (board: Board, entries: LeaderboardEntry[]): Board => {
    const ranked = rank(entries, board.ranked);
    const previous = new Map(board.ranked.map((entry, index) => [entry.id, {entry, index}]));
    const gains: Record<string, Gain> = {};
    const moves: Record<string, number> = {};
    let nextKey = board.nextKey;
    ranked.forEach((entry, index) => {
        const old = previous.get(entry.id);
        if (!old) return;
        if (entry.total > old.entry.total) gains[entry.id] = {key: ++nextKey, amount: entry.total - old.entry.total};
        if (old.index !== index) moves[entry.id] = old.index - index;
    });
    return {source: entries, ranked, gains, moves, nextKey};
};

interface AnimatedTotalProps {
    value: number;
    format: (value: number) => string;
}

// Counts smoothly from the old total to the new one without re-rendering React on every frame.
const AnimatedTotal = ({value, format}: AnimatedTotalProps) => {
    const motionValue = useMotionValue(value);
    const text = useTransform(motionValue, format);
    useEffect(() => {
        const controls = animate(motionValue, value, {duration: 0.8, ease: [0.16, 1, 0.3, 1]});
        return () => controls.stop();
    }, [motionValue, value]);
    return <motion.span>{text}</motion.span>;
};

export interface LiveLeaderboardProps {
    /** Current totals in any order. The board sorts them and animates changes between updates. */
    entries: LeaderboardEntry[];
    /**
     * Called every `interval` ms while the board is on screen and not paused. Use it to fetch or
     * update totals. When set, a Live and Paused toggle appears in the header.
     */
    onTick?: () => void;
    /** Milliseconds between `onTick` calls. */
    interval?: number;
    title?: string;
    subtitle?: string;
    /** Formats totals and gains. Defaults to whole US dollars. */
    formatValue?: (value: number) => string;
    className?: string;
}

// A leaderboard that re-sorts when totals change.
// Rows slide to their new rank, totals count up and a badge shows who moved.
export const LiveLeaderboard = ({
    entries,
    onTick,
    interval = 2200,
    title = "September sales",
    subtitle = "Closed revenue, updated as deals land",
    formatValue = money,
    className = "",
}: LiveLeaderboardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [paused, setPaused] = useState(false);
    const [board, setBoard] = useState<Board>(() => ({source: entries, ranked: rank(entries, entries), gains: {}, moves: {}, nextKey: 0}));
    if (board.source !== entries) setBoard(nextBoard(board, entries));
    const {ranked, gains, moves} = board;

    const onTickRef = useRef(onTick);
    onTickRef.current = onTick;
    const live = Boolean(onTick);

    useEffect(() => {
        if (!live || !inView || paused) return;
        const timer = window.setInterval(() => onTickRef.current?.(), interval);
        return () => window.clearInterval(timer);
    }, [live, inView, paused, interval]);

    return (
        <MotionConfig reducedMotion="user">
            <div ref={ref} className={`w-full max-w-md rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 ${className}`}>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                        {subtitle && <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">{subtitle}</p>}
                    </div>
                    {live && (
                        <button
                            type="button"
                            onClick={() => setPaused((value) => !value)}
                            aria-pressed={paused}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            {paused ? <LuPlay className="h-3 w-3" aria-hidden="true"/> : <LuPause className="h-3 w-3" aria-hidden="true"/>}
                            {paused ? "Paused" : "Live"}
                        </button>
                    )}
                </div>

                <ol className="mt-4 flex flex-col gap-1.5" aria-label="Leaderboard">
                    {ranked.map((entry, position) => {
                        const move = moves[entry.id] ?? 0;
                        const gain = gains[entry.id];
                        return (
                            <motion.li
                                key={entry.id}
                                layout
                                transition={{type: "spring", stiffness: 300, damping: 30}}
                                className={`relative flex items-center gap-3 rounded-2xl px-2.5 py-2 ${position === 0 ? "bg-amber-50 ring-1 ring-inset ring-amber-200/70 dark:bg-amber-400/10 dark:ring-amber-400/20" : ""}`}
                            >
                                <span
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums ${medals[position] ?? "text-gray-500 dark:text-slate-400"}`}
                                >
                                    {position + 1}
                                </span>
                                <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ${entry.color}`}>
                                    {entry.initials}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="flex items-center gap-1.5 truncate text-sm font-medium text-gray-900 dark:text-white">
                                        {entry.name}
                                        <AnimatePresence>
                                            {move !== 0 && (
                                                <motion.span
                                                    key={`${entry.id}-${gain?.key ?? 0}-${move}`}
                                                    initial={{opacity: 0, scale: 0.5}}
                                                    animate={{opacity: 1, scale: 1}}
                                                    exit={{opacity: 0, scale: 0.5}}
                                                    className={`inline-flex items-center rounded-full px-1 text-[10px] font-semibold tabular-nums ${
                                                        move > 0
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                                                            : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                                                    }`}
                                                >
                                                    {move > 0 ? <LuArrowUp className="h-2.5 w-2.5" aria-hidden="true"/> : <LuArrowDown className="h-2.5 w-2.5" aria-hidden="true"/>}
                                                    {Math.abs(move)}
                                                    <span className="sr-only">{move > 0 ? "places up" : "places down"}</span>
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </p>
                                    <p className="truncate text-xs text-gray-500 dark:text-slate-400">{entry.detail}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-sm font-semibold tabular-nums text-gray-900 dark:text-white">
                                        <AnimatedTotal value={entry.total} format={formatValue}/>
                                    </p>
                                    <span className="relative h-4 w-full">
                                        <AnimatePresence>
                                            {gain && (
                                                <motion.span
                                                    key={gain.key}
                                                    aria-hidden="true"
                                                    initial={{opacity: 0, y: 4}}
                                                    animate={{opacity: [0, 1, 1, 0], y: [4, 0, 0, -4]}}
                                                    transition={{duration: 1.8, times: [0, 0.15, 0.7, 1]}}
                                                    className="absolute right-0 top-0 whitespace-nowrap text-[11px] font-medium tabular-nums text-emerald-600 dark:text-emerald-400"
                                                >
                                                    +{formatValue(gain.amount)}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </span>
                                </div>
                            </motion.li>
                        );
                    })}
                </ol>
            </div>
        </MotionConfig>
    );
};
