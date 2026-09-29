import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

type Year = "2025" | "2026";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenue: Record<Year, number[]> = {
    "2025": [18.2, 21.4, 24.9, 22.1, 27.6, 30.2, 28.4, 31.9, 35.5, 33.8, 38.1, 44.6],
    "2026": [26.4, 29.8, 34.1, 31.7, 38.9, 42.3, 40.2, 45.6, 49.8, 47.1, 52.4, 58.7],
};

const HEIGHT = 260;
const margin = {top: 16, right: 8, bottom: 28, left: 40};
const ticks = [0, 15, 30, 45, 60];
const maxValue = 60;

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

const formatMoney = (value: number) => `$${value.toFixed(1)}k`;

// Bars grow from the baseline when the chart scrolls into view. Hover, or focus the chart and use the
// arrow keys, to read each month.
const RevenueBars = () => {
    const reduceMotion = useReducedMotion();
    const [containerRef, width] = useWidth();
    const inView = useInView(containerRef, {once: true, amount: 0.4});
    const [year, setYear] = useState<Year>("2026");
    const [active, setActive] = useState<number | null>(null);
    const titleId = useId();

    const data = revenue[year];
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = HEIGHT - margin.top - margin.bottom;
    const step = innerWidth / data.length;
    const barWidth = Math.max(6, Math.min(32, step * 0.62));
    const yFor = (value: number) => margin.top + innerHeight - (value / maxValue) * innerHeight;
    const baseline = yFor(0);
    const total = data.reduce((sum, value) => sum + value, 0);

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

    return (
        <section aria-labelledby={titleId} className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h3 id={titleId} className="text-sm font-medium text-gray-500 dark:text-slate-400">Monthly revenue</h3>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        ${total.toFixed(1)}k <span className="text-sm font-normal text-gray-500 dark:text-slate-400">in {year}</span>
                    </p>
                </div>
                <div role="group" aria-label="Year" className="flex rounded-lg bg-gray-100 p-0.5 text-sm dark:bg-slate-800">
                    {(["2025", "2026"] as const).map((option) => (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={year === option}
                            onClick={() => setYear(option)}
                            className={`rounded-md px-3 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                                year === option ? "bg-white text-gray-900 shadow-sm dark:bg-slate-600 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </header>

            <div
                ref={containerRef}
                tabIndex={0}
                role="group"
                aria-label={`Bar chart of monthly revenue in ${year}. Use the left and right arrow keys to read each month.`}
                onKeyDown={handleKeyDown}
                onBlur={() => setActive(null)}
                className="relative mt-6 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900"
                style={{height: HEIGHT}}
            >
                {width > 0 && (
                    <svg width={width} height={HEIGHT} aria-hidden="true" onPointerMove={handlePointerMove} onPointerLeave={() => setActive(null)} className="block touch-pan-y">
                        {ticks.map((tick) => (
                            <g key={tick}>
                                <line x1={margin.left} x2={width - margin.right} y1={yFor(tick)} y2={yFor(tick)} strokeDasharray={tick === 0 ? undefined : "3 4"} className="stroke-gray-200 dark:stroke-slate-700"/>
                                <text x={margin.left - 8} y={yFor(tick)} dy="0.32em" textAnchor="end" className="fill-gray-400 text-[11px] dark:fill-slate-500">
                                    {tick === 0 ? "0" : `${tick}k`}
                                </text>
                            </g>
                        ))}

                        {data.map((value, index) => {
                            const x = margin.left + step * index + (step - barWidth) / 2;
                            const y = yFor(value);
                            const dimmed = active !== null && active !== index;
                            const shown = inView || reduceMotion;
                            return (
                                <g key={months[index]}>
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
                                        className={active === index ? "fill-indigo-600 dark:fill-indigo-400" : "fill-indigo-500 dark:fill-indigo-500"}
                                    />
                                    <text
                                        x={margin.left + step * index + step / 2}
                                        y={HEIGHT - 8}
                                        textAnchor="middle"
                                        className={`text-[11px] ${active === index ? "fill-gray-900 font-medium dark:fill-white" : "fill-gray-400 dark:fill-slate-500"}`}
                                    >
                                        {width < 480 ? months[index].charAt(0) : months[index]}
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
                                <p className="font-medium">{months[active]} {year}</p>
                                <p className="mt-0.5 text-sm font-semibold tabular-nums">{formatMoney(data[active])}</p>
                                {change !== null && (
                                    <p className={change >= 0 ? "text-emerald-400 dark:text-emerald-600" : "text-rose-400 dark:text-rose-600"}>
                                        {change >= 0 ? "Up" : "Down"} {Math.abs(change).toFixed(1)}% from {months[active - 1]}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <p className="sr-only" aria-live="polite">
                    {active !== null ? `${months[active]}: ${formatMoney(data[active])}` : ""}
                </p>
            </div>

            <table className="sr-only">
                <caption>Monthly revenue in {year}, in thousands of dollars</caption>
                <thead>
                    <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, index) => (
                        <tr key={months[index]}>
                            <th scope="row">{months[index]}</th>
                            <td>{formatMoney(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default RevenueBars;
