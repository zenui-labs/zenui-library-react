import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

interface Series {
    id: string;
    label: string;
    values: number[];
    fill: string;
    stroke: string;
    dot: string;
}

// Weekly sessions in thousands, by traffic source.
const allSeries: Series[] = [
    {id: "organic", label: "Organic search", values: [22, 24, 23, 27, 29, 28, 31, 34, 33, 36, 38, 41], fill: "fill-indigo-500/80", stroke: "stroke-indigo-500", dot: "bg-indigo-500"},
    {id: "direct", label: "Direct", values: [14, 15, 17, 16, 18, 19, 18, 20, 22, 21, 23, 24], fill: "fill-sky-400/80", stroke: "stroke-sky-400", dot: "bg-sky-400"},
    {id: "referral", label: "Referral", values: [6, 7, 9, 8, 11, 10, 12, 11, 13, 15, 14, 16], fill: "fill-emerald-400/80", stroke: "stroke-emerald-400", dot: "bg-emerald-400"},
    {id: "social", label: "Social", values: [4, 5, 5, 9, 7, 6, 8, 12, 9, 10, 13, 11], fill: "fill-amber-400/80", stroke: "stroke-amber-400", dot: "bg-amber-400"},
];

const WEEKS = allSeries[0].values.length;
const HEIGHT = 260;
const margin = {top: 12, right: 12, bottom: 28, left: 36};

interface Point {
    x: number;
    y: number;
}

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

// Monotone cubic curve. Every path has the same commands, so framer-motion can morph between them.
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

const niceMax = (value: number) => Math.max(10, Math.ceil(value / 20) * 20);

// Stacked areas rise from the baseline when they come into view. Toggling a source in the legend
// flattens its band and the others restack around it.
const StackedArea = () => {
    const reduceMotion = useReducedMotion();
    const [containerRef, width] = useWidth();
    const inView = useInView(containerRef, {once: true, amount: 0.4});
    const [hidden, setHidden] = useState<Set<string>>(() => new Set());
    const [active, setActive] = useState<number | null>(null);
    const titleId = useId();
    const shown = inView || Boolean(reduceMotion);

    const visible = allSeries.filter((series) => !hidden.has(series.id));
    const totals = Array.from({length: WEEKS}, (_, week) => visible.reduce((sum, series) => sum + series.values[week], 0));
    const top = niceMax(Math.max(...totals));
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = HEIGHT - margin.top - margin.bottom;
    const xFor = (week: number) => margin.left + (week / (WEEKS - 1)) * innerWidth;
    const yFor = (value: number) => margin.top + innerHeight - (value / top) * innerHeight;

    // Hidden series keep a band of zero height, so paths always have the same shape to morph between.
    const cumulative = new Array<number>(WEEKS).fill(0);
    const bands = allSeries.map((series) => {
        const lower = [...cumulative];
        const factor = shown && !hidden.has(series.id) ? 1 : 0;
        series.values.forEach((value, week) => {
            cumulative[week] += value * factor;
        });
        const upper = [...cumulative];
        const topLine = upper.map((value, week) => ({x: xFor(week), y: yFor(value)}));
        const bottomLine = lower.map((value, week) => ({x: xFor(week), y: yFor(value)})).reverse();
        const topPath = width > 0 ? curve(topLine) : "";
        const area = width > 0 ? `${topPath} L${curve(bottomLine).slice(1)} Z` : "";
        return {series, topPath, area};
    });

    const toggle = (id: string) => {
        setHidden((current) => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else if (next.size < allSeries.length - 1) next.add(id); // Keep at least one source visible.
            return next;
        });
    };

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const ratio = (event.clientX - rect.left - margin.left) / innerWidth;
        setActive(Math.min(WEEKS - 1, Math.max(0, Math.round(ratio * (WEEKS - 1)))));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") setActive((week) => (week === null ? 0 : Math.min(WEEKS - 1, week + 1)));
        else if (event.key === "ArrowLeft") setActive((week) => (week === null ? WEEKS - 1 : Math.max(0, week - 1)));
        else if (event.key === "Escape") setActive(null);
        else return;
        event.preventDefault();
    };

    const morph = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 90, damping: 18};
    const activeX = active === null ? 0 : xFor(active);
    // Place the tooltip on whichever side of the line has more room, and keep it inside the chart.
    const tooltipX = activeX > width / 2 ? Math.max(0, activeX - 188) : Math.min(activeX + 12, width - 176);

    return (
        <section aria-labelledby={titleId} className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <header>
                <h3 id={titleId} className="text-sm font-medium text-gray-500 dark:text-slate-400">Weekly sessions by source</h3>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {totals[WEEKS - 1]}k <span className="text-sm font-normal text-gray-500 dark:text-slate-400">last week</span>
                </p>
            </header>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Traffic sources">
                {allSeries.map((series) => {
                    const on = !hidden.has(series.id);
                    return (
                        <li key={series.id}>
                            <button
                                type="button"
                                aria-pressed={on}
                                onClick={() => toggle(series.id)}
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                                    on
                                        ? "border-gray-200 bg-white text-gray-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                                        : "border-dashed border-gray-300 bg-transparent text-gray-400 dark:border-slate-600 dark:text-slate-500"
                                }`}
                            >
                                <motion.span className={`h-2 w-2 rounded-full ${series.dot}`} initial={false} animate={{scale: on ? 1 : 0.5, opacity: on ? 1 : 0.4}} aria-hidden="true"/>
                                {series.label}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div
                ref={containerRef}
                tabIndex={0}
                role="group"
                aria-label="Stacked area chart of weekly sessions. Use the left and right arrow keys to read each week."
                onKeyDown={handleKeyDown}
                onBlur={() => setActive(null)}
                className="relative mt-5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900"
                style={{height: HEIGHT}}
            >
                {width > 0 && (
                    <svg width={width} height={HEIGHT} aria-hidden="true" onPointerMove={handlePointerMove} onPointerLeave={() => setActive(null)} className="block touch-pan-y">
                        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
                            const y = margin.top + innerHeight - fraction * innerHeight;
                            return (
                                <g key={fraction}>
                                    <line x1={margin.left} x2={width - margin.right} y1={y} y2={y} strokeDasharray={fraction === 0 ? undefined : "3 4"} className="stroke-gray-200 dark:stroke-slate-700"/>
                                    <text x={margin.left - 8} y={y} dy="0.32em" textAnchor="end" className="fill-gray-400 text-[11px] tabular-nums dark:fill-slate-500">
                                        {Math.round(fraction * top)}k
                                    </text>
                                </g>
                            );
                        })}
                        {[0, 3, 6, 9, 11].map((week) => (
                            <text key={week} x={xFor(week)} y={HEIGHT - 8} textAnchor={week === 0 ? "start" : week === WEEKS - 1 ? "end" : "middle"} className="fill-gray-400 text-[11px] dark:fill-slate-500">
                                W{week + 1}
                            </text>
                        ))}

                        {bands.map(({series, area, topPath}, index) => (
                            <g key={series.id}>
                                <motion.path className={series.fill} initial={false} animate={{d: area}} transition={{...morph, delay: reduceMotion ? 0 : index * 0.07}}/>
                                <motion.path
                                    className={series.stroke}
                                    fill="none"
                                    strokeWidth="1.5"
                                    initial={false}
                                    animate={{d: topPath, opacity: hidden.has(series.id) || !shown ? 0 : 1}}
                                    transition={{...morph, delay: reduceMotion ? 0 : index * 0.07}}
                                />
                            </g>
                        ))}

                        {active !== null && (
                            <line x1={activeX} x2={activeX} y1={margin.top} y2={margin.top + innerHeight} className="stroke-gray-900/40 dark:stroke-white/50" strokeDasharray="2 3"/>
                        )}
                    </svg>
                )}

                <AnimatePresence>
                    {active !== null && (
                        <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute top-2 z-10 w-44 rounded-xl bg-gray-900 p-3 text-xs text-white shadow-xl dark:bg-white dark:text-slate-900"
                            initial={{opacity: 0, x: tooltipX}}
                            animate={{opacity: 1, x: tooltipX}}
                            exit={{opacity: 0}}
                            transition={{type: "spring", stiffness: 500, damping: 40}}
                            style={{left: 0}}
                        >
                            <p className="font-medium">Week {active + 1}</p>
                            <ul className="mt-2 space-y-1">
                                {[...visible].reverse().map((series) => (
                                    <li key={series.id} className="flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${series.dot}`}/>
                                        <span className="flex-1 text-gray-300 dark:text-slate-600">{series.label}</span>
                                        <span className="tabular-nums">{series.values[active]}k</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2 flex justify-between border-t border-white/15 pt-2 font-medium dark:border-slate-200">
                                <span>Total</span>
                                <span className="tabular-nums">{totals[active]}k</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <p className="sr-only" aria-live="polite">
                    {active !== null ? `Week ${active + 1}: ${visible.map((series) => `${series.label} ${series.values[active]} thousand`).join(", ")}` : ""}
                </p>
            </div>

            <table className="sr-only">
                <caption>Weekly sessions by source, in thousands</caption>
                <thead>
                    <tr>
                        <th scope="col">Week</th>
                        {allSeries.map((series) => (
                            <th key={series.id} scope="col">{series.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({length: WEEKS}, (_, week) => (
                        <tr key={week}>
                            <th scope="row">Week {week + 1}</th>
                            {allSeries.map((series) => (
                                <td key={series.id}>{series.values[week]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default StackedArea;
