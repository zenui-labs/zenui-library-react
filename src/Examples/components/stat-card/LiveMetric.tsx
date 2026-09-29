import {useEffect, useId, useRef, useState} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";
import {LuPause, LuPlay} from "react-icons/lu";

export interface LiveStat {
    label: string;
    /** Already formatted, for example "118 ms". */
    value: string;
    /** "warning" turns the value amber and "critical" turns it red. */
    tone?: "default" | "warning" | "critical";
}

export interface LiveSample {
    /** The headline number, also drawn on the chart. */
    value: number;
    /** Secondary stats shown in the footer for the latest sample. */
    stats?: LiveStat[];
}

export interface LiveMetricProps {
    /** Starting history, oldest first. The chart keeps this many points as it scrolls. Pass at least 3. */
    initialSamples: LiveSample[];
    /** Called once per tick with the latest sample. Return the next one. */
    getNextSample: (last: LiveSample) => LiveSample;
    title?: string;
    /** Read after the headline number by screen readers. */
    unitLabel?: string;
    /** Milliseconds between samples. */
    interval?: number;
    formatValue?: (value: number) => string;
    /** Pauses updates. Pass it with `onPausedChange` to control the card. */
    paused?: boolean;
    defaultPaused?: boolean;
    onPausedChange?: (paused: boolean) => void;
    className?: string;
}

const WIDTH = 320;
const HEIGHT = 72;
// Room on the right for the end dot. The oldest point sits just past the left edge.
const RIGHT = WIDTH - 10;

const toneClass: Record<NonNullable<LiveStat["tone"]>, string> = {
    default: "text-zinc-900 dark:text-white",
    warning: "text-amber-600 dark:text-amber-400",
    critical: "text-rose-600 dark:text-rose-400",
};

const number = (value: number) => value.toLocaleString("en-US");

export interface RollingNumberProps {
    /** Formatted text. Digits roll into place and other characters stay still. */
    value: string;
    animate?: boolean;
}

// Each digit is a column of 0 to 9 that slides to the right number.
export const RollingNumber = ({value, animate = true}: RollingNumberProps) => (
    <span className="inline-flex leading-none" aria-hidden>
        {[...value].map((char, index) => {
            const key = value.length - index;
            if (!/\d/.test(char)) {
                return (
                    <span key={`s${key}`} className="inline-block">
                        {char}
                    </span>
                );
            }
            const digit = Number(char);
            return (
                <span key={`d${key}`} className="relative inline-block h-[1em] overflow-hidden">
                    <motion.span
                        className="flex flex-col"
                        initial={false}
                        animate={{y: `${-digit * 10}%`}}
                        transition={animate ? {type: "spring", stiffness: 180, damping: 22} : {duration: 0}}
                    >
                        {Array.from({length: 10}, (_, n) => (
                            <span key={n} className="h-[1em]">
                                {n}
                            </span>
                        ))}
                    </motion.span>
                </span>
            );
        })}
    </span>
);

/** A live counter with rolling digits and a scrolling chart. Updates pause while the card is off screen or the tab is hidden. */
export const LiveMetric = ({
    initialSamples,
    getNextSample,
    title = "API requests per second",
    unitLabel = "requests per second",
    interval = 1000,
    formatValue = number,
    paused: pausedProp,
    defaultPaused = false,
    onPausedChange,
    className = "",
}: LiveMetricProps) => {
    const [history, setHistory] = useState<LiveSample[]>(initialSamples);
    const [tick, setTick] = useState(0);
    const [innerPaused, setInnerPaused] = useState(defaultPaused);
    const paused = pausedProp ?? innerPaused;
    const [pageVisible, setPageVisible] = useState(true);
    const rootRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef(history);
    const getNextRef = useRef(getNextSample);
    const inView = useInView(rootRef);
    const reduceMotion = useReducedMotion();
    const gradientId = `live-${useId().replace(/:/g, "")}`;
    const running = !paused && inView && pageVisible;
    const step = RIGHT / (history.length - 2);

    // Keeps the latest callback without restarting the timer.
    useEffect(() => {
        getNextRef.current = getNextSample;
    }, [getNextSample]);

    useEffect(() => {
        const onVisibility = () => setPageVisible(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    // Only ticks while visible and not paused, so an idle tab does no work.
    useEffect(() => {
        if (!running) return;
        const timer = window.setInterval(() => {
            const list = historyRef.current;
            const next = [...list.slice(1), getNextRef.current(list[list.length - 1])];
            historyRef.current = next;
            setHistory(next);
            setTick((value) => value + 1);
        }, interval);
        return () => window.clearInterval(timer);
    }, [running, interval]);

    const togglePaused = () => {
        if (pausedProp === undefined) setInnerPaused(!paused);
        onPausedChange?.(!paused);
    };

    const latest = history[history.length - 1];
    const previous = history[history.length - 2];
    const values = history.map((sample) => sample.value);
    const min = Math.min(...values) * 0.95;
    const max = Math.max(...values) * 1.05;
    const points = values.map((value, index) => ({x: RIGHT - (values.length - 1 - index) * step, y: HEIGHT - ((value - min) / (max - min)) * HEIGHT}));
    const line = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
    const area = `${line} L${points[points.length - 1].x} ${HEIGHT} L${points[0].x} ${HEIGHT} Z`;
    const last = points[points.length - 1];
    const smooth = running && !reduceMotion;
    const stats = latest.stats ?? [];

    return (
        <div ref={rootRef} className={`w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="p-5 pb-0">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
                    <div className="flex items-center gap-2">
                        <span
                            className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                running ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300" : "bg-zinc-100 text-zinc-500 dark:bg-white/5 dark:text-zinc-400"
                            }`}
                        >
                            <span className="relative flex size-1.5" aria-hidden>
                                {smooth && (
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-emerald-500"
                                        animate={{scale: [1, 2.6], opacity: [0.7, 0]}}
                                        transition={{duration: 1.4, repeat: Infinity, ease: "easeOut"}}
                                    />
                                )}
                                <span className={`relative size-1.5 rounded-full ${running ? "bg-emerald-500" : "bg-zinc-400"}`}/>
                            </span>
                            {running ? "Live" : "Paused"}
                        </span>
                        <button
                            type="button"
                            onClick={togglePaused}
                            aria-label={paused ? "Resume live updates" : "Pause live updates"}
                            className="flex size-7 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                            {paused ? <LuPlay className="size-3.5" aria-hidden/> : <LuPause className="size-3.5" aria-hidden/>}
                        </button>
                    </div>
                </div>

                <p className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white">
                        <RollingNumber value={formatValue(latest.value)} animate={!reduceMotion}/>
                        <span className="sr-only">
                            {formatValue(latest.value)} {unitLabel}
                        </span>
                    </span>
                    <span className={`text-sm font-medium tabular-nums ${latest.value >= previous.value ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"}`} aria-hidden>
                        {latest.value >= previous.value ? "+" : "-"}
                        {formatValue(Math.abs(latest.value - previous.value))}
                    </span>
                </p>
            </div>

            <div className="relative mt-3 h-[72px] overflow-hidden text-indigo-500 dark:text-indigo-400" aria-hidden>
                <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
                    <defs>
                        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    {/* Each tick adds a point off the right edge, then the line slides one step left to reveal it. */}
                    <motion.g
                        key={tick}
                        initial={smooth ? {x: step} : false}
                        animate={{x: 0}}
                        transition={{duration: interval / 1000, ease: "linear"}}
                    >
                        <path d={area} fill={`url(#${gradientId})`}/>
                        <path d={line} fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
                    </motion.g>
                </svg>
                <span
                    className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current ring-4 ring-indigo-500/20 transition-[top] duration-700 ease-out motion-reduce:transition-none"
                    style={{left: `${(last.x / WIDTH) * 100}%`, top: `${(last.y / HEIGHT) * 100}%`}}
                />
            </div>

            {stats.length > 0 && (
                <dl
                    className="grid divide-x divide-zinc-100 border-t border-zinc-100 dark:divide-white/[0.06] dark:border-white/[0.06]"
                    style={{gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`}}
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="px-5 py-3">
                            <dt className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</dt>
                            <dd className={`mt-0.5 text-sm font-semibold tabular-nums ${toneClass[stat.tone ?? "default"]}`}>{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    );
};
