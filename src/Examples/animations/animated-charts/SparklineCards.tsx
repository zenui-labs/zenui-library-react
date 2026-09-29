import {useEffect, useId, useRef, useState} from "react";
import type {ReactNode} from "react";
import {motion, useInView, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuArrowDownRight, LuArrowUpRight} from "react-icons/lu";

export type SparkTone = "sky" | "violet" | "emerald" | "rose";

export interface SparklineKpi {
    label: string;
    value: number;
    /** Formats the value while it counts up. Defaults to a rounded US number. */
    format?: (value: number) => string;
    /** Change text shown in the badge, such as "12.4%" or "0.4 pts". */
    change: string;
    /** Whether the change is good news. Picks a green or red badge. */
    good: boolean;
    /** Direction of the change. Picks the arrow. */
    up: boolean;
    /** Recent readings, oldest first, drawn as the sparkline. */
    data: number[];
    tone?: SparkTone;
}

const HEIGHT = 48;

const tones: Record<SparkTone, {stroke: string; fill: string}> = {
    sky: {stroke: "stroke-sky-500", fill: "rgb(14 165 233)"},
    violet: {stroke: "stroke-violet-500", fill: "rgb(139 92 246)"},
    emerald: {stroke: "stroke-emerald-500", fill: "rgb(16 185 129)"},
    rose: {stroke: "stroke-rose-500", fill: "rgb(244 63 94)"},
};

const defaultFormat = (value: number) => Math.round(value).toLocaleString("en-US");

const useWidth = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return [ref, width] as const;
};

// Maps values to points that fill the given box, with a little padding top and bottom.
const toPoints = (data: number[], width: number, min: number, max: number, step: number, offset = 0) =>
    data.map((value, index) => ({
        x: offset + index * step,
        y: 4 + (1 - (value - min) / (max - min || 1)) * (HEIGHT - 8),
    }));

const linePath = (points: {x: number; y: number}[]) =>
    points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");

// Counts from zero to the value once `start` is true.
const CountUp = ({value, format, start}: {value: number; format: (value: number) => string; start: boolean}) => {
    const reduceMotion = useReducedMotion();
    const spring = useSpring(0, {stiffness: 50, damping: 18});
    const text = useTransform(spring, format);
    useEffect(() => {
        if (!start) return;
        if (reduceMotion) spring.jump(value);
        else spring.set(value);
    }, [start, value, spring, reduceMotion]);
    return <motion.span>{text}</motion.span>;
};

const Sparkline = ({data, tone, start}: {data: number[]; tone: SparkTone; start: boolean}) => {
    const reduceMotion = useReducedMotion();
    const [ref, width] = useWidth();
    const gradientId = useId();
    const min = Math.min(...data);
    const max = Math.max(...data);
    const points = width ? toPoints(data, width, min, max, width / (data.length - 1)) : [];
    const line = linePath(points);
    const last = points[points.length - 1];
    const shown = start || reduceMotion;

    return (
        <div ref={ref} className="h-12 w-full" aria-hidden="true">
            {width > 0 && (
                <svg width={width} height={HEIGHT} className="block overflow-visible">
                    <defs>
                        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={tones[tone].fill} stopOpacity="0.25"/>
                            <stop offset="100%" stopColor={tones[tone].fill} stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    <motion.path
                        d={`${line} L${width},${HEIGHT} L0,${HEIGHT} Z`}
                        fill={`url(#${gradientId})`}
                        initial={{opacity: 0}}
                        animate={{opacity: shown ? 1 : 0}}
                        transition={{duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.7}}
                    />
                    <motion.path
                        d={line}
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={tones[tone].stroke}
                        initial={{pathLength: 0}}
                        animate={{pathLength: shown ? 1 : 0}}
                        transition={{duration: reduceMotion ? 0 : 1.1, ease: [0.45, 0, 0.2, 1]}}
                    />
                    {last && (
                        <motion.circle
                            cx={last.x}
                            cy={last.y}
                            r="3.5"
                            className={`fill-white dark:fill-slate-900 ${tones[tone].stroke}`}
                            strokeWidth="2"
                            initial={{scale: 0}}
                            animate={{scale: shown ? 1 : 0}}
                            transition={{delay: reduceMotion ? 0 : 1.05, type: "spring", stiffness: 500, damping: 20}}
                        />
                    )}
                </svg>
            )}
        </div>
    );
};

// Tracks whether the tab is visible, so the live card stops updating in background tabs.
const usePageVisible = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const update = () => setVisible(document.visibilityState === "visible");
        update();
        document.addEventListener("visibilitychange", update);
        return () => document.removeEventListener("visibilitychange", update);
    }, []);
    return visible;
};

export interface SparklineCardProps {
    kpi: SparklineKpi;
    /** Set to false to hold the card hidden and the number at zero, for example until it scrolls into view. */
    play?: boolean;
    /** Delay before the card fades in, in seconds. */
    delay?: number;
    /** Screen reader text read before the sparkline values. */
    trendLabel?: string;
    className?: string;
}

// A KPI card whose number counts up and whose sparkline draws in once `play` is true.
export const SparklineCard = ({kpi, play = true, delay = 0, trendLabel = "Trend over the last 12 weeks", className = ""}: SparklineCardProps) => {
    const Arrow = kpi.up ? LuArrowUpRight : LuArrowDownRight;
    const format = kpi.format ?? defaultFormat;
    return (
        <motion.div
            className={`rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 ${className}`}
            initial={{opacity: 0, y: 12}}
            animate={play ? {opacity: 1, y: 0} : undefined}
            transition={{delay, type: "spring", stiffness: 220, damping: 24}}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-slate-400">{kpi.label}</p>
                <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                        kpi.good ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    }`}
                >
                    <Arrow className="h-3.5 w-3.5" aria-hidden="true"/>
                    <span className="sr-only">{kpi.up ? "Up" : "Down"}</span>
                    {kpi.change}
                </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-gray-900 dark:text-white">
                <span className="sr-only">{format(kpi.value)}</span>
                <span aria-hidden="true">
                    <CountUp value={kpi.value} format={format} start={play}/>
                </span>
            </p>
            <p className="sr-only">{trendLabel}: {kpi.data.join(", ")}</p>
            <div className="mt-3">
                <Sparkline data={kpi.data} tone={kpi.tone ?? "sky"} start={play}/>
            </div>
        </motion.div>
    );
};

export interface LiveSparklineCardProps {
    /** Returns the next reading from the previous one. Called once per interval while the card is on screen. */
    nextValue: (previous: number) => number;
    /** Reading the first history is generated from. */
    initialValue: number;
    /** Lowest and highest reading the chart can show. */
    min: number;
    max: number;
    label?: string;
    liveLabel?: string;
    /** Number of readings visible at once. */
    points?: number;
    /** Time between readings, in milliseconds. */
    intervalMs?: number;
    tone?: SparkTone;
    format?: (value: number) => string;
    className?: string;
}

// A live chart that scrolls left by one step each time a new reading arrives.
export const LiveSparklineCard = ({
    nextValue,
    initialValue,
    min,
    max,
    label = "Visitors right now",
    liveLabel = "Live",
    points: visiblePoints = 24,
    intervalMs = 2000,
    tone = "rose",
    format = defaultFormat,
    className = "",
}: LiveSparklineCardProps) => {
    const reduceMotion = useReducedMotion();
    const [ref, width] = useWidth();
    const onScreen = useInView(ref);
    const pageVisible = usePageVisible();
    const gradientId = useId();
    // One extra reading sits just off the left edge, so the line has no gap while it slides.
    const [history, setHistory] = useState<number[]>(() => {
        const start: number[] = [];
        let value = initialValue;
        for (let i = 0; i <= visiblePoints; i++) {
            value = nextValue(value);
            start.push(value);
        }
        return start;
    });
    const [tick, setTick] = useState(0);
    const current = history[history.length - 1];
    const count = useSpring(current, {stiffness: 80, damping: 20});
    const countText = useTransform(count, format);
    // Keeps the latest callback without restarting the timer when the parent passes a new function.
    const nextValueRef = useRef(nextValue);
    useEffect(() => {
        nextValueRef.current = nextValue;
    }, [nextValue]);

    useEffect(() => {
        if (!onScreen || !pageVisible) return;
        const timer = window.setInterval(() => {
            setHistory((previous) => [...previous.slice(1), nextValueRef.current(previous[previous.length - 1])]);
            setTick((value) => value + 1);
        }, intervalMs);
        return () => window.clearInterval(timer);
    }, [onScreen, pageVisible, intervalMs]);

    useEffect(() => {
        if (reduceMotion) count.jump(current);
        else count.set(current);
    }, [current, count, reduceMotion]);

    // Leave room on the right so the end dot is not clipped.
    const step = (width - 5) / (visiblePoints - 1);
    const points = width ? toPoints(history, width, min, max, step, -step) : [];
    const line = linePath(points);
    const last = points[points.length - 1];

    return (
        <div className={`rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 ${className}`}>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                    <span className="relative flex h-1.5 w-1.5">
                        {!reduceMotion && onScreen && (
                            <motion.span
                                className="absolute inset-0 rounded-full bg-rose-500"
                                animate={{scale: [1, 2.6], opacity: [0.7, 0]}}
                                transition={{duration: 1.4, repeat: Infinity, ease: "easeOut"}}
                            />
                        )}
                        <span className="relative h-1.5 w-1.5 rounded-full bg-rose-500"/>
                    </span>
                    {liveLabel}
                </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-gray-900 dark:text-white">
                <motion.span>{countText}</motion.span>
            </p>
            <div ref={ref} className="mt-3 h-12 w-full" aria-hidden="true">
                {width > 0 && (
                    <svg width={width} height={HEIGHT} className="block">
                        <defs>
                            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor={tones[tone].fill} stopOpacity="0.22"/>
                                <stop offset="100%" stopColor={tones[tone].fill} stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                        <motion.g
                            key={tick}
                            initial={{x: tick === 0 || reduceMotion ? 0 : step}}
                            animate={{x: 0}}
                            transition={{duration: 0.9, ease: [0.4, 0, 0.2, 1]}}
                        >
                            <path d={`${line} L${last ? last.x : 0},${HEIGHT} L${-step},${HEIGHT} Z`} fill={`url(#${gradientId})`}/>
                            <path d={line} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={tones[tone].stroke}/>
                        </motion.g>
                        {last && (
                            <motion.circle
                                cx={last.x}
                                r="3.5"
                                initial={false}
                                animate={{cy: last.y}}
                                transition={{duration: reduceMotion ? 0 : 0.9, ease: [0.4, 0, 0.2, 1]}}
                                className={`fill-white dark:fill-slate-900 ${tones[tone].stroke}`}
                                strokeWidth="2"
                            />
                        )}
                    </svg>
                )}
            </div>
        </div>
    );
};

export interface SparklineCardsProps {
    items: SparklineKpi[];
    trendLabel?: string;
    /** Extra cards after the KPI cards, such as a LiveSparklineCard. */
    children?: ReactNode;
    className?: string;
}

// KPI cards whose numbers count up and whose sparklines draw in when they scroll into view.
export const SparklineCards = ({items, trendLabel, children, className = ""}: SparklineCardsProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {once: true, amount: 0.3});

    return (
        <div ref={ref} className={`grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 ${className}`}>
            {items.map((kpi, index) => (
                <SparklineCard key={kpi.label} kpi={kpi} play={inView} delay={index * 0.08} trendLabel={trendLabel}/>
            ))}
            {children}
        </div>
    );
};
