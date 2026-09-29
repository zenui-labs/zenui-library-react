import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

export interface AreaSeries {
    id: string;
    label: string;
    /** One value per point, in the same order as `labels`. */
    values: number[];
    /** Tailwind fill class for the band, such as "fill-indigo-500/80". */
    fill: string;
    /** Tailwind stroke class for the band's top edge, such as "stroke-indigo-500". */
    stroke: string;
    /** Tailwind background class for the legend and tooltip dots, such as "bg-indigo-500". */
    dot: string;
}

export interface StackedAreaProps {
    /** Name of each point, such as "Week 1". Used in the tooltip and the screen reader table. */
    labels: string[];
    /** Shorter names for the x axis, such as "W1". Defaults to `labels`. */
    axisLabels?: string[];
    /** Bands from the bottom of the stack to the top. */
    series: AreaSeries[];
    /** Ids of the series turned off in the legend (controlled). */
    hiddenIds?: string[];
    /** Ids of the series turned off on first render (uncontrolled). */
    defaultHiddenIds?: string[];
    onHiddenChange?: (ids: string[]) => void;
    title?: string;
    /** Text after the latest total in the header. */
    latestLabel?: string;
    /** Accessible name of the legend. */
    legendLabel?: string;
    /** What one point is, used in the keyboard hint and the table heading. */
    pointHeading?: string;
    totalLabel?: string;
    /** Formats values on the axis, in the header and in the tooltip. */
    formatValue?: (value: number) => string;
    /** Formats values for the screen reader announcement. */
    speakValue?: (value: number) => string;
    /** Added to the screen reader table caption, for example the unit. */
    unitNote?: string;
    /** Chart height in pixels. */
    height?: number;
    className?: string;
}

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

const defaultFormatValue = (value: number) => `${value}k`;
const defaultSpeakValue = (value: number) => `${value} thousand`;

// Stacked areas rise from the baseline when they come into view. Toggling a source in the legend
// flattens its band and the others restack around it.
export const StackedArea = ({
    labels,
    axisLabels = labels,
    series: allSeries,
    hiddenIds,
    defaultHiddenIds,
    onHiddenChange,
    title = "Weekly sessions by source",
    latestLabel = "last week",
    legendLabel = "Traffic sources",
    pointHeading = "Week",
    totalLabel = "Total",
    formatValue = defaultFormatValue,
    speakValue = defaultSpeakValue,
    unitNote = "in thousands",
    height = 260,
    className = "",
}: StackedAreaProps) => {
    const reduceMotion = useReducedMotion();
    const [containerRef, width] = useWidth();
    const inView = useInView(containerRef, {once: true, amount: 0.4});
    const [internalHidden, setInternalHidden] = useState<string[]>(defaultHiddenIds ?? []);
    const hidden = new Set(hiddenIds ?? internalHidden);
    const [active, setActive] = useState<number | null>(null);
    const titleId = useId();
    const shown = inView || Boolean(reduceMotion);
    const count = allSeries[0]?.values.length ?? 0;
    // Axis labels at every quarter of the range, plus the last point.
    const axisStep = Math.max(1, Math.ceil((count - 1) / 4));
    const axisIndexes = [...Array.from({length: count}, (_, point) => point).filter((point) => point % axisStep === 0 && point < count - 1), count - 1];

    const visible = allSeries.filter((series) => !hidden.has(series.id));
    const totals = Array.from({length: count}, (_, point) => visible.reduce((sum, series) => sum + series.values[point], 0));
    const top = niceMax(Math.max(...totals));
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = height - margin.top - margin.bottom;
    const xFor = (point: number) => margin.left + (point / (count - 1)) * innerWidth;
    const yFor = (value: number) => margin.top + innerHeight - (value / top) * innerHeight;

    // Hidden series keep a band of zero height, so paths always have the same shape to morph between.
    const cumulative = new Array<number>(count).fill(0);
    const bands = allSeries.map((series) => {
        const lower = [...cumulative];
        const factor = shown && !hidden.has(series.id) ? 1 : 0;
        series.values.forEach((value, point) => {
            cumulative[point] += value * factor;
        });
        const upper = [...cumulative];
        const topLine = upper.map((value, point) => ({x: xFor(point), y: yFor(value)}));
        const bottomLine = lower.map((value, point) => ({x: xFor(point), y: yFor(value)})).reverse();
        const topPath = width > 0 ? curve(topLine) : "";
        const area = width > 0 ? `${topPath} L${curve(bottomLine).slice(1)} Z` : "";
        return {series, topPath, area};
    });

    const toggle = (id: string) => {
        const next = new Set(hidden);
        if (next.has(id)) next.delete(id);
        else if (next.size < allSeries.length - 1) next.add(id); // Keep at least one source visible.
        else return;
        const ids = allSeries.map((series) => series.id).filter((seriesId) => next.has(seriesId));
        if (hiddenIds === undefined) setInternalHidden(ids);
        onHiddenChange?.(ids);
    };

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const ratio = (event.clientX - rect.left - margin.left) / innerWidth;
        setActive(Math.min(count - 1, Math.max(0, Math.round(ratio * (count - 1)))));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") setActive((point) => (point === null ? 0 : Math.min(count - 1, point + 1)));
        else if (event.key === "ArrowLeft") setActive((point) => (point === null ? count - 1 : Math.max(0, point - 1)));
        else if (event.key === "Escape") setActive(null);
        else return;
        event.preventDefault();
    };

    const morph = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 90, damping: 18};
    const activeX = active === null ? 0 : xFor(active);
    // Place the tooltip on whichever side of the line has more room, and keep it inside the chart.
    const tooltipX = activeX > width / 2 ? Math.max(0, activeX - 188) : Math.min(activeX + 12, width - 176);

    return (
        <section aria-labelledby={titleId} className={`w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6 ${className}`}>
            <header>
                <h3 id={titleId} className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</h3>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {formatValue(totals[count - 1])} <span className="text-sm font-normal text-gray-500 dark:text-slate-400">{latestLabel}</span>
                </p>
            </header>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label={legendLabel}>
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
                aria-label={`Stacked area chart of ${title.toLowerCase()}. Use the left and right arrow keys to read each ${pointHeading.toLowerCase()}.`}
                onKeyDown={handleKeyDown}
                onBlur={() => setActive(null)}
                className="relative mt-5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900"
                style={{height: height}}
            >
                {width > 0 && (
                    <svg width={width} height={height} aria-hidden="true" onPointerMove={handlePointerMove} onPointerLeave={() => setActive(null)} className="block touch-pan-y">
                        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
                            const y = margin.top + innerHeight - fraction * innerHeight;
                            return (
                                <g key={fraction}>
                                    <line x1={margin.left} x2={width - margin.right} y1={y} y2={y} strokeDasharray={fraction === 0 ? undefined : "3 4"} className="stroke-gray-200 dark:stroke-slate-700"/>
                                    <text x={margin.left - 8} y={y} dy="0.32em" textAnchor="end" className="fill-gray-400 text-[11px] tabular-nums dark:fill-slate-500">
                                        {formatValue(Math.round(fraction * top))}
                                    </text>
                                </g>
                            );
                        })}
                        {axisIndexes.map((point) => (
                            <text key={point} x={xFor(point)} y={height - 8} textAnchor={point === 0 ? "start" : point === count - 1 ? "end" : "middle"} className="fill-gray-400 text-[11px] dark:fill-slate-500">
                                {axisLabels[point]}
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
                            <p className="font-medium">{labels[active]}</p>
                            <ul className="mt-2 space-y-1">
                                {[...visible].reverse().map((series) => (
                                    <li key={series.id} className="flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${series.dot}`}/>
                                        <span className="flex-1 text-gray-300 dark:text-slate-600">{series.label}</span>
                                        <span className="tabular-nums">{formatValue(series.values[active])}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2 flex justify-between border-t border-white/15 pt-2 font-medium dark:border-slate-200">
                                <span>{totalLabel}</span>
                                <span className="tabular-nums">{formatValue(totals[active])}</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <p className="sr-only" aria-live="polite">
                    {active !== null ? `${labels[active]}: ${visible.map((series) => `${series.label} ${speakValue(series.values[active])}`).join(", ")}` : ""}
                </p>
            </div>

            <table className="sr-only">
                <caption>{title}{unitNote ? `, ${unitNote}` : ""}</caption>
                <thead>
                    <tr>
                        <th scope="col">{pointHeading}</th>
                        {allSeries.map((series) => (
                            <th key={series.id} scope="col">{series.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({length: count}, (_, point) => (
                        <tr key={point}>
                            <th scope="row">{labels[point]}</th>
                            {allSeries.map((series) => (
                                <td key={series.id}>{series.values[point]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};
