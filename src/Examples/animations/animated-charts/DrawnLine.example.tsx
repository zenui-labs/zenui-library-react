import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {animate, AnimatePresence, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform} from "framer-motion";

type Metric = "visitors" | "signups" | "revenue";

interface Point {
    x: number;
    y: number;
}

// Thirty days of made-up but believable numbers, generated the same way on every render.
const series = (base: number, swing: number, growth: number, seed: number) =>
    Array.from({length: 30}, (_, day) => {
        const weekly = Math.sin((day + seed) * 0.9) * swing;
        const noise = Math.sin(day * 12.9898 + seed * 78.233) * swing * 0.35;
        return Math.round(base + day * growth + weekly + noise);
    });

const metrics: Record<Metric, {label: string; values: number[]; format: (value: number) => string}> = {
    visitors: {label: "Visitors", values: series(4200, 520, 38, 1), format: (value) => value.toLocaleString("en-US")},
    signups: {label: "Sign-ups", values: series(180, 34, 2.4, 4), format: (value) => value.toLocaleString("en-US")},
    revenue: {label: "Revenue", values: series(2600, 460, 21, 7), format: (value) => `$${value.toLocaleString("en-US")}`},
};

const HEIGHT = 240;
const margin = {top: 20, right: 16, bottom: 28, left: 48};

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

// Monotone cubic curve: smooth, and never overshoots above or below the data.
const curve = (points: Point[]) => {
    const n = points.length;
    const slopes: number[] = [];
    for (let i = 0; i < n - 1; i++) slopes.push((points[i + 1].y - points[i].y) / (points[i + 1].x - points[i].x));
    const tangents = points.map((_, i) => {
        if (i === 0) return slopes[0];
        if (i === n - 1) return slopes[n - 2];
        const a = slopes[i - 1];
        const b = slopes[i];
        return a * b <= 0 ? 0 : (2 * a * b) / (a + b);
    });
    let d = `M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;
    for (let i = 0; i < n - 1; i++) {
        const h = (points[i + 1].x - points[i].x) / 3;
        d += ` C${(points[i].x + h).toFixed(2)},${(points[i].y + tangents[i] * h).toFixed(2)} ${(points[i + 1].x - h).toFixed(2)},${(points[i + 1].y - tangents[i + 1] * h).toFixed(2)} ${points[i + 1].x.toFixed(2)},${points[i + 1].y.toFixed(2)}`;
    }
    return d;
};

// Rounds the axis maximum up to a friendly number.
const niceMax = (value: number) => {
    const magnitude = 10 ** Math.floor(Math.log10(value));
    return Math.ceil(value / (magnitude / 2)) * (magnitude / 2);
};

const dateLabel = (day: number) => new Date(2026, 8, day + 1).toLocaleDateString("en-US", {month: "short", day: "numeric"});

// The line draws itself with a dot riding its tip. Switching metrics morphs the line into the new shape.
const DrawnLine = () => {
    const reduceMotion = useReducedMotion();
    const [containerRef, width] = useWidth();
    const inView = useInView(containerRef, {once: true, amount: 0.5});
    const onScreen = useInView(containerRef);
    const [metric, setMetric] = useState<Metric>("visitors");
    const [active, setActive] = useState<number | null>(null);
    const [drawn, setDrawn] = useState(false);
    const pathRef = useRef<SVGPathElement>(null);
    const gradientId = useId();
    const titleId = useId();

    const progress = useMotionValue(0);
    const dotX = useMotionValue(0);
    const dotY = useMotionValue(0);
    const areaOpacity = useTransform(progress, [0.3, 1], [0, 1]);

    const {values, format, label} = metrics[metric];
    const top = niceMax(Math.max(...values) * 1.05);
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = HEIGHT - margin.top - margin.bottom;
    const points = values.map((value, index) => ({
        x: margin.left + (index / (values.length - 1)) * innerWidth,
        y: margin.top + innerHeight - (value / top) * innerHeight,
    }));
    const line = width > 0 ? curve(points) : "";
    const area = width > 0 ? `${line} L${points[points.length - 1].x.toFixed(2)},${margin.top + innerHeight} L${points[0].x.toFixed(2)},${margin.top + innerHeight} Z` : "";
    const lastX = points[points.length - 1].x;
    const lastY = points[points.length - 1].y;

    // Draw the line once, the first time the chart is on screen.
    useEffect(() => {
        if (!inView || width === 0) return;
        const controls = animate(progress, 1, {
            duration: reduceMotion ? 0 : 1.8,
            ease: [0.45, 0, 0.2, 1],
            onComplete: () => setDrawn(true),
        });
        return () => controls.stop();
    }, [inView, width, progress, reduceMotion]);

    // While drawing, the dot follows the tip of the line.
    useMotionValueEvent(progress, "change", (value) => {
        const path = pathRef.current;
        if (!path || drawn) return;
        const point = path.getPointAtLength(value * path.getTotalLength());
        dotX.set(point.x);
        dotY.set(point.y);
    });

    // After drawing, the dot glides to the last point whenever the data or size changes.
    useEffect(() => {
        if (!drawn) return;
        const options = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 120, damping: 20};
        const x = animate(dotX, lastX, options);
        const y = animate(dotY, lastY, options);
        return () => {
            x.stop();
            y.stop();
        };
    }, [drawn, lastX, lastY, dotX, dotY, reduceMotion]);

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const ratio = (event.clientX - rect.left - margin.left) / innerWidth;
        setActive(Math.min(values.length - 1, Math.max(0, Math.round(ratio * (values.length - 1)))));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") setActive((index) => (index === null ? 0 : Math.min(values.length - 1, index + 1)));
        else if (event.key === "ArrowLeft") setActive((index) => (index === null ? values.length - 1 : Math.max(0, index - 1)));
        else if (event.key === "Escape") setActive(null);
        else return;
        event.preventDefault();
    };

    const transition = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 120, damping: 20};
    const activePoint = active === null ? null : points[active];
    const tooltipX = activePoint ? Math.min(Math.max(activePoint.x, 70), width - 70) : 0;
    const totalChange = ((values[values.length - 1] - values[0]) / values[0]) * 100;

    return (
        <section aria-labelledby={titleId} className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <header className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h3 id={titleId} className="text-sm font-medium text-gray-500 dark:text-slate-400">{label}, last 30 days</h3>
                    <p className="mt-1 flex items-baseline gap-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {format(values[values.length - 1])}
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                            {totalChange >= 0 ? "+" : ""}{totalChange.toFixed(1)}%
                        </span>
                    </p>
                </div>
                <div role="group" aria-label="Metric" className="flex rounded-lg bg-gray-100 p-0.5 text-sm dark:bg-slate-800">
                    {(Object.keys(metrics) as Metric[]).map((option) => (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={metric === option}
                            onClick={() => setMetric(option)}
                            className="relative rounded-md px-3 py-1 font-medium text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 aria-pressed:text-gray-900 dark:text-slate-400 dark:hover:text-white dark:aria-pressed:text-white"
                        >
                            {metric === option && (
                                <motion.span layoutId="metric-pill" className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-slate-600" transition={{type: "spring", stiffness: 450, damping: 34}}/>
                            )}
                            <span className="relative">{metrics[option].label}</span>
                        </button>
                    ))}
                </div>
            </header>

            <div
                ref={containerRef}
                tabIndex={0}
                role="group"
                aria-label={`Line chart of daily ${label.toLowerCase()}. Use the left and right arrow keys to read each day.`}
                onKeyDown={handleKeyDown}
                onBlur={() => setActive(null)}
                className="relative mt-6 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900"
                style={{height: HEIGHT}}
            >
                {width > 0 && (
                    <svg width={width} height={HEIGHT} aria-hidden="true" onPointerMove={handlePointerMove} onPointerLeave={() => setActive(null)} className="block touch-pan-y">
                        <defs>
                            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="rgb(14 165 233)" stopOpacity="0.28"/>
                                <stop offset="100%" stopColor="rgb(14 165 233)" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
                            const y = margin.top + innerHeight - fraction * innerHeight;
                            return (
                                <g key={fraction}>
                                    <line x1={margin.left} x2={width - margin.right} y1={y} y2={y} strokeDasharray={fraction === 0 ? undefined : "3 4"} className="stroke-gray-200 dark:stroke-slate-700"/>
                                    <text x={margin.left - 8} y={y} dy="0.32em" textAnchor="end" className="fill-gray-400 text-[11px] tabular-nums dark:fill-slate-500">
                                        {Math.round(fraction * top).toLocaleString("en-US")}
                                    </text>
                                </g>
                            );
                        })}
                        {[0, 10, 20, 29].map((day) => (
                            <text key={day} x={points[day].x} y={HEIGHT - 8} textAnchor={day === 0 ? "start" : day === 29 ? "end" : "middle"} className="fill-gray-400 text-[11px] dark:fill-slate-500">
                                {dateLabel(day)}
                            </text>
                        ))}

                        <motion.path fill={`url(#${gradientId})`} style={{opacity: areaOpacity}} initial={false} animate={{d: area}} transition={transition}/>
                        <motion.path
                            ref={pathRef}
                            fill="none"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            className="stroke-sky-500 dark:stroke-sky-400"
                            style={{pathLength: progress}}
                            initial={false}
                            animate={{d: line}}
                            transition={transition}
                        />

                        {activePoint && (
                            <g>
                                <line x1={activePoint.x} x2={activePoint.x} y1={margin.top} y2={margin.top + innerHeight} className="stroke-gray-300 dark:stroke-slate-600"/>
                                <motion.circle
                                    r="5"
                                    initial={false}
                                    animate={{cx: activePoint.x, cy: activePoint.y}}
                                    transition={{type: "spring", stiffness: 600, damping: 40}}
                                    className="fill-white stroke-sky-500 dark:fill-slate-900 dark:stroke-sky-400"
                                    strokeWidth="2.5"
                                />
                            </g>
                        )}

                        {/* A soft ring pulses around the latest value while the chart is on screen. */}
                        {drawn && onScreen && !reduceMotion && (
                            <motion.circle
                                cx={dotX}
                                cy={dotY}
                                className="fill-sky-500/30"
                                initial={{r: 5, opacity: 0.8}}
                                animate={{r: 14, opacity: 0}}
                                transition={{duration: 1.6, repeat: Infinity, ease: "easeOut"}}
                            />
                        )}
                        <motion.circle cx={dotX} cy={dotY} r="5" style={{opacity: progress}} className="fill-sky-500 stroke-white dark:fill-sky-400 dark:stroke-slate-900" strokeWidth="2"/>
                    </svg>
                )}

                <AnimatePresence>
                    {activePoint && active !== null && (
                        <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-0 top-0 z-10"
                            initial={{opacity: 0, x: tooltipX, y: activePoint.y}}
                            animate={{opacity: 1, x: tooltipX, y: activePoint.y}}
                            exit={{opacity: 0}}
                            transition={{type: "spring", stiffness: 600, damping: 40}}
                        >
                            <div className="-translate-x-1/2 -translate-y-[calc(100%+14px)] whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-xl dark:bg-white dark:text-slate-900">
                                <span className="text-gray-400 dark:text-slate-500">{dateLabel(active)}</span>
                                <span className="ml-2 font-semibold tabular-nums">{format(values[active])}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <p className="sr-only" aria-live="polite">
                    {active !== null ? `${dateLabel(active)}: ${format(values[active])}` : ""}
                </p>
            </div>

            <table className="sr-only">
                <caption>Daily {label.toLowerCase()} for the last 30 days</caption>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">{label}</th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((value, day) => (
                        <tr key={day}>
                            <th scope="row">{dateLabel(day)}</th>
                            <td>{format(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default DrawnLine;
