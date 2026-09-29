import {useEffect, useRef, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuDownload, LuPause, LuPlay} from "react-icons/lu";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface OdometerRegion {
    name: string;
    count: number;
    /** Tailwind background class for the share bar and legend dot, for example "bg-sky-500". */
    color: string;
}

interface DigitProps {
    digit: number;
    instant: boolean;
}

// A column of 0 to 9 inside a one-digit window. Moving the column by 10% per step shows the next digit.
const Digit = ({digit, instant}: DigitProps) => (
    <span className="relative inline-block h-[1.15em] w-[0.64em] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
        <motion.span
            className="absolute inset-x-0 top-0 flex flex-col"
            initial={false}
            animate={{y: `${-digit * 10}%`}}
            transition={instant ? {duration: 0} : {type: "spring", stiffness: 120, damping: 18, mass: 0.9}}
        >
            {DIGITS.map((value) => (
                <span key={value} className="flex h-[1.15em] items-center justify-center">
                    {value}
                </span>
            ))}
        </motion.span>
    </span>
);

export interface OdometerProps {
    value: number;
    className?: string;
}

/** A number whose digits roll on their own columns. Size it with a text class such as "text-5xl". */
export const Odometer = ({value, className = ""}: OdometerProps) => {
    const instant = useReducedMotion() ?? false;
    const chars = value.toLocaleString("en-US").split("");
    return (
        <span className={`inline-flex items-center leading-none tabular-nums ${className}`}>
            <span className="sr-only">{value.toLocaleString("en-US")}</span>
            <span aria-hidden="true" className="inline-flex">
                {chars.map((char, index) => {
                    // Key from the right, so the ones column keeps its identity when a new digit appears on the left.
                    const key = chars.length - index;
                    return /\d/.test(char) ? (
                        <Digit key={key} digit={Number(char)} instant={instant}/>
                    ) : (
                        <span key={key} className="inline-flex h-[1.15em] w-[0.3em] items-end justify-center pb-[0.12em]">
                            {char}
                        </span>
                    );
                })}
            </span>
        </span>
    );
};

export interface OdometerCounterLabels {
    live: string;
    paused: string;
    pause: string;
    resume: string;
}

const defaultLabels: OdometerCounterLabels = {live: "Live", paused: "Paused", pause: "Pause", resume: "Resume"};

export interface OdometerCounterProps {
    /** Counts per region. The big number is their sum, and a badge shows how much it grew on each update. */
    regions: OdometerRegion[];
    title?: string;
    icon?: ComponentType<{className?: string}>;
    /** Whether updates are running. Pass it with `onLiveChange` to control the pause button. */
    live?: boolean;
    defaultLive?: boolean;
    onLiveChange?: (live: boolean) => void;
    /** Called every `pollInterval` ms while live, on screen and in a visible tab. Fetch new counts here. */
    onPoll?: () => void;
    pollInterval?: number;
    labels?: Partial<OdometerCounterLabels>;
    className?: string;
}

// A live total. Each digit rolls on its own column, and the share bar regrows as counts change.
export const OdometerCounter = ({
    regions,
    title = "Installs this month",
    icon: Icon = LuDownload,
    live,
    defaultLive = true,
    onLiveChange,
    onPoll,
    pollInterval = 2000,
    labels,
    className = "",
}: OdometerCounterProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion() ?? false;
    const [innerLive, setInnerLive] = useState(defaultLive);
    const running = live ?? innerLive;
    const onPollRef = useRef(onPoll);
    onPollRef.current = onPoll;
    const text = {...defaultLabels, ...labels};

    const total = regions.reduce((sum, region) => sum + region.count, 0);

    // Remember the last total in state, so each rise gets its own badge.
    const [batch, setBatch] = useState({total, id: 0, amount: 0});
    if (batch.total !== total) setBatch({total, id: batch.id + 1, amount: total - batch.total});

    useEffect(() => {
        if (!running || !inView) return;
        const id = window.setInterval(() => {
            if (document.hidden) return;
            onPollRef.current?.();
        }, pollInterval);
        return () => window.clearInterval(id);
    }, [running, inView, pollInterval]);

    const toggle = () => {
        const next = !running;
        if (live === undefined) setInnerLive(next);
        onLiveChange?.(next);
    };

    return (
        <div
            ref={ref}
            className={`w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/5 sm:p-8 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40 ${className}`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white dark:bg-white dark:text-slate-900">
                        <Icon className="h-5 w-5" aria-hidden="true"/>
                    </span>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
                        <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
                            <span className={`h-1.5 w-1.5 rounded-full ${running ? "bg-emerald-500" : "bg-gray-400 dark:bg-slate-600"}`}/>
                            {running ? text.live : text.paused}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={toggle}
                    aria-pressed={!running}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                    {running ? <LuPause className="h-3.5 w-3.5" aria-hidden="true"/> : <LuPlay className="h-3.5 w-3.5" aria-hidden="true"/>}
                    {running ? text.pause : text.resume}
                </button>
            </div>

            <div className="relative mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
                <Odometer value={total} className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl dark:text-white"/>
                <AnimatePresence mode="popLayout">
                    {batch.amount > 0 && (
                        <motion.span
                            key={batch.id}
                            initial={{opacity: 0, y: 10, scale: 0.9}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, y: -10}}
                            transition={{type: "spring", stiffness: 300, damping: 24}}
                            className="mb-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        >
                            +{batch.amount.toLocaleString("en-US")}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Share of total per region. The bars grow with a spring as counts change. */}
            <div className="mt-6 flex h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                {regions.map((region) => (
                    <motion.span
                        key={region.name}
                        className={`h-full ${region.color}`}
                        initial={false}
                        animate={{width: `${total > 0 ? (region.count / total) * 100 : 0}%`}}
                        transition={{duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1]}}
                    />
                ))}
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {regions.map((region) => (
                    <div key={region.name}>
                        <dt className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                            <span className={`h-2 w-2 rounded-sm ${region.color}`} aria-hidden="true"/>
                            {region.name}
                        </dt>
                        <dd className="mt-1">
                            <Odometer value={region.count} className="text-xl font-semibold text-gray-900 dark:text-white"/>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
