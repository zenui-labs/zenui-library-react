import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

export interface BarSeries {
    /** Name shown on the switch button and in the tooltip, such as a year. */
    label: string;
    /** One value per category, in the same order as `categories`. */
    values: number[];
}

export interface RevenueBarsProps {
    /** Category names along the x axis, such as months. */
    categories: string[];
    /** One or more data sets. With more than one, a switch in the header picks which one is shown. */
    series: BarSeries[];
    /** Label of the selected series (controlled). */
    value?: string;
    /** Label of the series selected on first render (uncontrolled). Defaults to the last series. */
    defaultValue?: string;
    onChange?: (label: string) => void;
    title?: string;
    /** Values for the y axis grid lines. The largest one is the top of the chart. Calculated from the data when left out. */
    ticks?: number[];
    /** Formats values in the header, the tooltip and the screen reader table. */
    formatValue?: (value: number) => string;
    /** Formats the y axis labels. */
    formatTick?: (tick: number) => string;
    /** Accessible name of the series switch. */
    seriesGroupLabel?: string;
    /** Column headings of the screen reader table. */
    categoryHeading?: string;
    valueHeading?: string;
    /** Added to the screen reader table caption, for example the unit. */
    unitNote?: string;
    /** Chart height in pixels. */
    height?: number;
    barClassName?: string;
    activeBarClassName?: string;
    className?: string;
}

const margin = {top: 16, right: 8, bottom: 28, left: 40};

// Measures the chart container so the SVG can be drawn at real pixel size and stay crisp.
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

// Picks four even steps that end at a round number just above the largest value.
const niceTicks = (max: number, count = 4) => {
    if (max <= 0) return [0, 1];
    const raw = max / count;
    const magnitude = 10 ** Math.floor(Math.log10(raw));
    const step = ([1, 1.5, 2, 2.5, 3, 5, 10].find((factor) => factor * magnitude >= raw) ?? 10) * magnitude;
    return Array.from({length: count + 1}, (_, index) => index * step);
};

const defaultFormatValue = (value: number) => `$${value.toFixed(1)}k`;
const defaultFormatTick = (tick: number) => (tick === 0 ? "0" : `${tick}k`);

// Bars grow from the baseline when the chart scrolls into view. Hover, or focus the chart and use the
// arrow keys, to read each category.
export const RevenueBars = ({
    categories,
    series,
    value,
    defaultValue,
    onChange,
    title = "Monthly revenue",
    ticks: ticksProp,
    formatValue = defaultFormatValue,
    formatTick = defaultFormatTick,
    seriesGroupLabel = "Year",
    categoryHeading = "Month",
    valueHeading = "Revenue",
    unitNote = "in thousands of dollars",
    height = 260,
    barClassName = "fill-indigo-500 dark:fill-indigo-500",
    activeBarClassName = "fill-indigo-600 dark:fill-indigo-400",
    className = "",
}: RevenueBarsProps) => {
    const reduceMotion = useReducedMotion();
    const [containerRef, width] = useWidth();
    const inView = useInView(containerRef, {once: true, amount: 0.4});
    const [internal, setInternal] = useState(defaultValue ?? series[series.length - 1]?.label ?? "");
    const [active, setActive] = useState<number | null>(null);
    const titleId = useId();

    const selectedLabel = value ?? internal;
    const selected = series.find((item) => item.label === selectedLabel) ?? series[0];
    const data = selected?.values ?? [];
    const ticks = ticksProp ?? niceTicks(Math.max(0, ...series.flatMap((item) => item.values)));
    const maxValue = Math.max(...ticks) || 1;

    const select = (label: string) => {
        if (value === undefined) setInternal(label);
        onChange?.(label);
    };

    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = height - margin.top - margin.bottom;
    const step = data.length ? innerWidth / data.length : 0;
    const barWidth = Math.max(6, Math.min(32, step * 0.62));
    const yFor = (amount: number) => margin.top + innerHeight - (amount / maxValue) * innerHeight;
    const baseline = yFor(0);
    const total = data.reduce((sum, amount) => sum + amount, 0);

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const index = Math.floor((event.clientX - rect.left - margin.left) / step);
        setActive(index >= 0 && index < data.length ? index : null);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") setActive((index) => (index === null ? 0 : Math.min(data.length - 1, index + 1)));
        else if (event.key === "ArrowLeft") setActive((index) => (index === null ? data.length - 1 : Math.max(0, index - 1)));
        else if (event.key === "Escape") setActive(null);
        else return;
        event.preventDefault();
    };

    // Keep the tooltip inside the chart near the left and right edges.
    const tooltipX = active === null ? 0 : Math.min(Math.max(margin.left + step * active + step / 2, 84), width - 84);
    const tooltipY = active === null ? 0 : yFor(data[active]);
    const change = active !== null && active > 0 ? ((data[active] - data[active - 1]) / data[active - 1]) * 100 : null;
    const periodLabel = selected?.label ?? "";

    return (
        <section aria-labelledby={titleId} className={`w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6 ${className}`}>
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h3 id={titleId} className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</h3>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {formatValue(total)} <span className="text-sm font-normal text-gray-500 dark:text-slate-400">in {periodLabel}</span>
                    </p>
                </div>
                {series.length > 1 && (
                    <div role="group" aria-label={seriesGroupLabel} className="flex rounded-lg bg-gray-100 p-0.5 text-sm dark:bg-slate-800">
                        {series.map((option) => (
                            <button
                                key={option.label}
                                type="button"
                                aria-pressed={periodLabel === option.label}
                                onClick={() => select(option.label)}
                                className={`rounded-md px-3 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                                    periodLabel === option.label ? "bg-white text-gray-900 shadow-sm dark:bg-slate-600 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            <div
                ref={containerRef}
                tabIndex={0}
                role="group"
                aria-label={`Bar chart of ${title.toLowerCase()} in ${periodLabel}. Use the left and right arrow keys to read each ${categoryHeading.toLowerCase()}.`}
                onKeyDown={handleKeyDown}
                onBlur={() => setActive(null)}
                className="relative mt-6 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900"
                style={{height}}
            >
                {width > 0 && (
                    <svg width={width} height={height} aria-hidden="true" onPointerMove={handlePointerMove} onPointerLeave={() => setActive(null)} className="block touch-pan-y">
                        {ticks.map((tick) => (
                            <g key={tick}>
                                <line x1={margin.left} x2={width - margin.right} y1={yFor(tick)} y2={yFor(tick)} strokeDasharray={tick === 0 ? undefined : "3 4"} className="stroke-gray-200 dark:stroke-slate-700"/>
                                <text x={margin.left - 8} y={yFor(tick)} dy="0.32em" textAnchor="end" className="fill-gray-400 text-[11px] dark:fill-slate-500">
                                    {formatTick(tick)}
                                </text>
                            </g>
                        ))}

                        {data.map((amount, index) => {
                            const x = margin.left + step * index + (step - barWidth) / 2;
                            const y = yFor(amount);
                            const dimmed = active !== null && active !== index;
                            const shown = inView || reduceMotion;
                            const category = categories[index] ?? "";
                            return (
                                <g key={`${category}-${index}`}>
                                    <motion.rect
                                        x={x}
                                        width={barWidth}
                                        rx={Math.min(6, barWidth / 3)}
                                        initial={{y: baseline, height: 0}}
                                        animate={shown ? {y, height: baseline - y, opacity: dimmed ? 0.35 : 1} : {y: baseline, height: 0}}
                                        transition={
                                            reduceMotion
                                                ? {duration: 0}
                                                : {
                                                    y: {type: "spring", stiffness: 120, damping: 18, delay: index * 0.04},
                                                    height: {type: "spring", stiffness: 120, damping: 18, delay: index * 0.04},
                                                    opacity: {duration: 0.15},
                                                }
                                        }
                                        className={active === index ? activeBarClassName : barClassName}
                                    />
                                    <text
                                        x={margin.left + step * index + step / 2}
                                        y={height - 8}
                                        textAnchor="middle"
                                        className={`text-[11px] ${active === index ? "fill-gray-900 font-medium dark:fill-white" : "fill-gray-400 dark:fill-slate-500"}`}
                                    >
                                        {width < 480 ? category.charAt(0) : category}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                )}

                <AnimatePresence>
                    {active !== null && (
                        <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-0 top-0 z-10"
                            initial={{opacity: 0, scale: 0.9, x: tooltipX, y: tooltipY}}
                            animate={{opacity: 1, scale: 1, x: tooltipX, y: tooltipY}}
                            exit={{opacity: 0, scale: 0.9}}
                            transition={{type: "spring", stiffness: 500, damping: 36}}
                        >
                            <div className="-translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-xl dark:bg-white dark:text-slate-900">
                                <p className="font-medium">{categories[active]} {periodLabel}</p>
                                <p className="mt-0.5 text-sm font-semibold tabular-nums">{formatValue(data[active])}</p>
                                {change !== null && (
                                    <p className={change >= 0 ? "text-emerald-400 dark:text-emerald-600" : "text-rose-400 dark:text-rose-600"}>
                                        {change >= 0 ? "Up" : "Down"} {Math.abs(change).toFixed(1)}% from {categories[active - 1]}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <p className="sr-only" aria-live="polite">
                    {active !== null ? `${categories[active]}: ${formatValue(data[active])}` : ""}
                </p>
            </div>

            <table className="sr-only">
                <caption>{title} in {periodLabel}{unitNote ? `, ${unitNote}` : ""}</caption>
                <thead>
                    <tr>
                        <th scope="col">{categoryHeading}</th>
                        <th scope="col">{valueHeading}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((amount, index) => (
                        <tr key={`${categories[index]}-${index}`}>
                            <th scope="row">{categories[index]}</th>
                            <td>{formatValue(amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};
