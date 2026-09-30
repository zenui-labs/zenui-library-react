import {useEffect, useMemo, useRef, useState} from "react";
import type {CSSProperties, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

export interface BumpSeries {
    id: string;
    label: string;
    /** One value per period. Ranks are worked out from these, highest first. */
    values: number[];
    /** Line color for light and dark mode. Defaults to the next color of the built-in palette. */
    color?: {light: string; dark: string};
}

export interface BumpChartProps {
    /** Column labels, e.g. quarters. */
    periods: string[];
    series: BumpSeries[];
    /** Rank the smallest value first, e.g. for lap times. */
    lowerIsBetter?: boolean;
    title?: ReactNode;
    subtitle?: ReactNode;
    /** Plain text summary for screen readers. */
    summary: string;
    formatValue?: (value: number) => string;
    className?: string;
}

// Six categorical steps, each chosen twice: once for the light surface and once for the dark one.
const PALETTE = [
    {light: "#2a78d6", dark: "#3987e5"},
    {light: "#eb6834", dark: "#d95926"},
    {light: "#1baf7a", dark: "#199e70"},
    {light: "#eda100", dark: "#c98500"},
    {light: "#e87ba4", dark: "#d55181"},
    {light: "#008300", dark: "#2f9e2f"},
];

const useWidth = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return [ref, width] as const;
};

interface Point {
    seriesId: string;
    period: number;
}

/**
 * Rankings over time. Lines leave and enter each column flat, so every swap reads as a clean S-curve, and a halo
 * in the surface color under every line makes crossings look like one line passing under another.
 */
export const BumpChart = ({periods, series, lowerIsBetter = false, title, subtitle, summary, formatValue = (value) => `${value.toFixed(1)}%`, className = ""}: BumpChartProps) => {
    const [measureRef, width] = useWidth();
    const viewRef = useRef<HTMLDivElement>(null);
    const inView = useInView(viewRef, {once: true, amount: 0.35});
    const reduceMotion = useReducedMotion() ?? false;
    const [hovered, setHovered] = useState<string | null>(null);
    const [pinned, setPinned] = useState<string | null>(null);
    const [point, setPoint] = useState<Point | null>(null);

    // ranks[seriesIndex][period], 1 is the top.
    const ranks = useMemo(() => {
        const result = series.map(() => periods.map(() => 0));
        periods.forEach((_, period) => {
            const order = series.map((item, index) => ({index, value: item.values[period]}))
                .sort((a, b) => (lowerIsBetter ? a.value - b.value : b.value - a.value));
            order.forEach(({index}, rank) => {
                result[index][period] = rank + 1;
            });
        });
        return result;
    }, [series, periods, lowerIsBetter]);

    const compact = width < 520;
    const side = compact ? 78 : 118;
    const top = 30;
    const rowGap = compact ? 36 : 42;
    const height = top + (series.length - 1) * rowGap + 24;
    const plotWidth = Math.max(60, width - side * 2);
    const radius = compact ? 8.5 : 10;
    const colX = (period: number) => side + (plotWidth * period) / Math.max(1, periods.length - 1);
    const rowY = (rank: number) => top + (rank - 1) * rowGap;
    const last = periods.length - 1;

    const lines = series.map((item, index) => {
        const points = ranks[index].map((rank, period) => ({x: colX(period), y: rowY(rank)}));
        let d = `M${points[0].x},${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const a = points[i - 1];
            const b = points[i];
            const half = (b.x - a.x) / 2;
            d += `C${a.x + half},${a.y} ${b.x - half},${b.y} ${b.x},${b.y}`;
        }
        const color = item.color ?? PALETTE[index % PALETTE.length];
        return {item, index, points, d, style: {"--bump-light": color.light, "--bump-dark": color.dark} as CSSProperties};
    });

    const focus = hovered ?? pinned;
    // The focused series is drawn last so it is never crossed by another line.
    const ordered = focus ? [...lines.filter((line) => line.item.id !== focus), ...lines.filter((line) => line.item.id === focus)] : lines;

    const tooltip = point ? (() => {
        const line = lines.find((entry) => entry.item.id === point.seriesId);
        if (!line) return null;
        const rank = ranks[line.index][point.period];
        const previous = point.period > 0 ? ranks[line.index][point.period - 1] : null;
        return {line, rank, change: previous === null ? null : previous - rank, value: line.item.values[point.period]};
    })() : null;

    // Arrow keys read the chart point by point: up and down pick a line in rank order, left and right pick a column.
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const period = point?.period ?? last;
        const byRank = [...lines].sort((a, b) => ranks[a.index][period] - ranks[b.index][period]);
        const currentRank = point ? byRank.findIndex((line) => line.item.id === point.seriesId) : -1;
        let next: Point | null = null;
        if (event.key === "ArrowDown") next = {seriesId: byRank[Math.min(byRank.length - 1, currentRank + 1)].item.id, period};
        if (event.key === "ArrowUp") next = {seriesId: byRank[Math.max(0, currentRank - 1)].item.id, period};
        if (event.key === "ArrowLeft" && point) next = {...point, period: Math.max(0, point.period - 1)};
        if (event.key === "ArrowRight" && point) next = {...point, period: Math.min(last, point.period + 1)};
        if (next) {
            event.preventDefault();
            setPoint(next);
            setHovered(next.seriesId);
        } else if ((event.key === "Enter" || event.key === " ") && point) {
            event.preventDefault();
            setPinned((value) => (value === point.seriesId ? null : point.seriesId));
        } else if (event.key === "Escape") {
            setPoint(null);
            setHovered(null);
            setPinned(null);
        }
    };

    const togglePin = (id: string) => setPinned((value) => (value === id ? null : id));
    const drawDuration = 1.3;
    const ease = [0.65, 0, 0.35, 1] as const;

    return (
        <figure className={`w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100 sm:p-6 ${className}`}>
            {(title || subtitle) && (
                <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    {title && <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{title}</span>}
                    {subtitle && <span className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</span>}
                </figcaption>
            )}

            <div
                ref={viewRef}
                tabIndex={0}
                role="group"
                aria-label={`${summary} Use the arrow keys to read ranks, Enter to pin a line.`}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                    setPoint(null);
                    setHovered(null);
                }}
                className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 dark:focus-visible:ring-white/30"
            >
                <div ref={measureRef} className="relative w-full" onPointerLeave={() => {
                    setHovered(null);
                    setPoint(null);
                }}>
                    {width > 0 && (
                        <svg width={width} height={height} aria-hidden="true" className="block select-none">
                            {periods.map((period, index) => (
                                <g key={period}>
                                    <line x1={colX(index)} x2={colX(index)} y1={top - 12} y2={height - 12} strokeWidth={1} className="stroke-zinc-100 dark:stroke-zinc-900"/>
                                    <text
                                        x={colX(index)}
                                        y={10}
                                        textAnchor="middle"
                                        className={`font-mono text-[10px] tabular-nums transition-colors ${point?.period === index ? "fill-zinc-900 dark:fill-white" : "fill-zinc-400 dark:fill-zinc-500"}`}
                                    >
                                        {compact && index % 2 === 1 && index !== last ? "·" : period}
                                    </text>
                                </g>
                            ))}

                            {ordered.map((line, order) => {
                                const isFocus = focus === line.item.id;
                                const faded = focus !== null && !isFocus;
                                return (
                                    <g
                                        key={line.item.id}
                                        style={line.style}
                                        className="cursor-pointer [--bump:var(--bump-light)] dark:[--bump:var(--bump-dark)]"
                                        onPointerEnter={() => setHovered(line.item.id)}
                                        onClick={() => togglePin(line.item.id)}
                                    >
                                        <g className="transition-opacity duration-300" style={{opacity: faded ? 0.14 : 1}}>
                                            <motion.path
                                                d={line.d}
                                                fill="none"
                                                strokeWidth={isFocus ? 9 : 6}
                                                className="stroke-white dark:stroke-zinc-950"
                                                initial={reduceMotion ? false : {pathLength: 0}}
                                                animate={{pathLength: inView || reduceMotion ? 1 : 0}}
                                                transition={{duration: drawDuration, ease, delay: order * 0.04}}
                                            />
                                            <motion.path
                                                d={line.d}
                                                fill="none"
                                                strokeLinecap="round"
                                                style={{stroke: "var(--bump)", strokeWidth: isFocus ? 3.5 : 2, transition: "stroke-width 200ms"}}
                                                initial={reduceMotion ? false : {pathLength: 0}}
                                                animate={{pathLength: inView || reduceMotion ? 1 : 0}}
                                                transition={{duration: drawDuration, ease, delay: order * 0.04}}
                                            />
                                            {/* A wide invisible stroke makes the thin line easy to hover. */}
                                            <path d={line.d} fill="none" stroke="transparent" strokeWidth={16}/>

                                            {line.points.map((position, period) => {
                                                const rank = ranks[line.index][period];
                                                const delay = reduceMotion ? 0 : (period / Math.max(1, last)) * drawDuration * 0.9 + order * 0.04;
                                                return (
                                                    <motion.g
                                                        key={periods[period]}
                                                        initial={reduceMotion ? false : {scale: 0, opacity: 0}}
                                                        animate={inView || reduceMotion ? {scale: 1, opacity: 1} : {scale: 0, opacity: 0}}
                                                        transition={{type: "spring", stiffness: 520, damping: 22, delay}}
                                                        style={{originX: 0.5, originY: 0.5}}
                                                        onPointerEnter={() => setPoint({seriesId: line.item.id, period})}
                                                        onPointerLeave={() => setPoint(null)}
                                                    >
                                                        <circle cx={position.x} cy={position.y} r={radius} strokeWidth={2} className="fill-white dark:fill-zinc-950" style={{stroke: "var(--bump)"}}/>
                                                        {isFocus && <circle cx={position.x} cy={position.y} r={radius - 1} style={{fill: "var(--bump)", fillOpacity: 0.2}}/>}
                                                        <text
                                                            x={position.x}
                                                            y={position.y + 3.5}
                                                            textAnchor="middle"
                                                            className="pointer-events-none fill-zinc-700 font-mono text-[10px] font-semibold tabular-nums dark:fill-zinc-200"
                                                        >
                                                            {rank}
                                                        </text>
                                                    </motion.g>
                                                );
                                            })}

                                            {/* Rank moves appear on the focused line only, halfway through each swap. */}
                                            {isFocus && !compact && line.points.slice(1).map((position, i) => {
                                                const change = ranks[line.index][i] - ranks[line.index][i + 1];
                                                if (change === 0) return null;
                                                const from = line.points[i];
                                                return (
                                                    <motion.text
                                                        key={`move-${periods[i + 1]}`}
                                                        x={(from.x + position.x) / 2}
                                                        y={(from.y + position.y) / 2 - 8}
                                                        textAnchor="middle"
                                                        initial={{opacity: 0, y: (from.y + position.y) / 2 - 4}}
                                                        animate={{opacity: 1, y: (from.y + position.y) / 2 - 8}}
                                                        transition={{delay: 0.04 * i, duration: 0.25}}
                                                        className="pointer-events-none fill-zinc-500 stroke-white font-mono text-[9px] tabular-nums [paint-order:stroke] dark:fill-zinc-400 dark:stroke-zinc-950"
                                                        strokeWidth={3}
                                                    >
                                                        {change > 0 ? `▲${change}` : `▼${-change}`}
                                                    </motion.text>
                                                );
                                            })}

                                            <text x={side - radius - 10} y={line.points[0].y + 4} textAnchor="end" className="fill-zinc-800 text-xs dark:fill-zinc-200">
                                                {line.item.label}
                                            </text>
                                            <text x={colX(last) + radius + 10} y={line.points[last].y + 4} className="fill-zinc-800 text-xs dark:fill-zinc-200">
                                                {line.item.label}
                                                {pinned === line.item.id && <tspan dx={5} className="fill-zinc-400 text-[10px] dark:fill-zinc-500">pinned</tspan>}
                                            </text>
                                        </g>
                                    </g>
                                );
                            })}
                        </svg>
                    )}

                    <AnimatePresence>
                        {tooltip && point && (
                            <motion.div
                                key="tooltip"
                                aria-hidden="true"
                                initial={{opacity: 0, scale: 0.96}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.96}}
                                transition={{duration: 0.14}}
                                className="pointer-events-none absolute z-10 w-44 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-lg shadow-zinc-900/10 transition-[left,top] duration-150 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/60"
                                style={{
                                    left: Math.min(width - 184, Math.max(4, colX(point.period) - 88)),
                                    top: rowY(tooltip.rank) + (tooltip.rank > series.length / 2 ? -radius - 72 : radius + 10),
                                }}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium">{tooltip.line.item.label}</span>
                                    <span className="font-mono text-zinc-400 dark:text-zinc-500">{periods[point.period]}</span>
                                </div>
                                <div className="mt-1 flex items-baseline justify-between font-mono tabular-nums">
                                    <span className="text-base font-semibold">#{tooltip.rank}</span>
                                    <span className="text-zinc-500 dark:text-zinc-400">{formatValue(tooltip.value)}</span>
                                </div>
                                <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                                    {tooltip.change === null ? "First period" : tooltip.change === 0 ? "No change" : `${tooltip.change > 0 ? "Up" : "Down"} ${Math.abs(tooltip.change)} from ${periods[point.period - 1]}`}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <p aria-live="polite" className="sr-only">
                    {tooltip && point ? `${tooltip.line.item.label}, ${periods[point.period]}: rank ${tooltip.rank}, ${formatValue(tooltip.value)}.${pinned === point.seriesId ? " Pinned." : ""}` : ""}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Pin a series">
                {lines.map((line) => (
                    <button
                        key={line.item.id}
                        type="button"
                        aria-pressed={pinned === line.item.id}
                        onClick={() => togglePin(line.item.id)}
                        onPointerEnter={() => setHovered(line.item.id)}
                        onPointerLeave={() => setHovered(null)}
                        style={line.style}
                        className="flex items-center gap-2 rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 transition-colors [--bump:var(--bump-light)] hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 aria-pressed:border-zinc-900 aria-pressed:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:[--bump:var(--bump-dark)] dark:hover:border-zinc-700 dark:focus-visible:ring-white/30 dark:aria-pressed:border-zinc-200 dark:aria-pressed:text-white"
                    >
                        <span className="h-0.5 w-3 rounded-full" style={{background: "var(--bump)"}}/>
                        {line.item.label}
                    </button>
                ))}
            </div>

            <table className="sr-only">
                <caption>{summary}</caption>
                <thead>
                    <tr><th scope="col">Series</th>{periods.map((period) => <th key={period} scope="col">{period}</th>)}</tr>
                </thead>
                <tbody>
                    {lines.map((line) => (
                        <tr key={line.item.id}>
                            <th scope="row">{line.item.label}</th>
                            {periods.map((period, index) => (
                                <td key={period}>#{ranks[line.index][index]} ({formatValue(line.item.values[index])})</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </figure>
    );
};
