import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

export interface RidgelineSeries {
    id: string;
    label: string;
    /** Small mono text next to the label, e.g. an airport or region code. */
    code?: string;
    /** Raw observations. The ridge is a kernel density estimate of these. */
    samples: number[];
}

export interface RidgelinePlotProps {
    /** Rows from back (top) to front (bottom). Front ridges hide the ones behind them. */
    series: RidgelineSeries[];
    /** Range of the x axis. Defaults to the smallest and largest sample. */
    domain?: [number, number];
    /** Values to label on the x axis. */
    ticks?: number[];
    /** Unit shown after values, e.g. "ms". */
    unit?: string;
    /** How many rows tall the highest peak is. Above 1 the ridges overlap. */
    overlap?: number;
    /** Kernel bandwidth in data units. Defaults to Silverman's rule for each row. */
    bandwidth?: number;
    /** Height of one row in px. */
    rowHeight?: number;
    title?: ReactNode;
    /** Short text under the title. */
    subtitle?: ReactNode;
    /** Plain text read to screen readers before the data table. */
    summary: string;
    formatValue?: (value: number) => string;
    className?: string;
}

interface RidgeStats {
    series: RidgelineSeries;
    median: number;
    p90: number;
    density: number[];
}

const RESOLUTION = 72;
const LIFT = 7;

const quantile = (sorted: number[], q: number) => {
    const position = (sorted.length - 1) * q;
    const low = Math.floor(position);
    const high = Math.ceil(position);
    return sorted[low] + (sorted[high] - sorted[low]) * (position - low);
};

// Catmull-Rom through every point, written as cubic Béziers. The curve passes through the samples
// exactly, so the peak you see is the real peak, not an overshoot.
const catmullRom = (points: [number, number][]) => {
    let d = "";
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] ?? points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] ?? p2;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
    }
    return d;
};

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

/**
 * Overlapping density ridges in the manner of the "Unknown Pleasures" pulsar plot. Every ridge is filled with the
 * background color, so the ones in front hide the ones behind. Hovering a ridge lifts it out of the stack.
 */
export const RidgelinePlot = ({
    series,
    domain,
    ticks,
    unit = "",
    overlap = 2.4,
    bandwidth,
    rowHeight = 26,
    title,
    subtitle,
    summary,
    formatValue = (value) => Math.round(value).toLocaleString(),
    className = "",
}: RidgelinePlotProps) => {
    const [measureRef, width] = useWidth();
    const viewRef = useRef<HTMLDivElement>(null);
    const inView = useInView(viewRef, {once: true, amount: 0.3});
    const reduceMotion = useReducedMotion() ?? false;
    const [active, setActive] = useState<number | null>(null);
    const noiseId = `ridge-noise-${useId().replace(/:/g, "")}`;

    const [min, max] = useMemo<[number, number]>(() => {
        if (domain) return domain;
        const all = series.flatMap((item) => item.samples);
        return [Math.min(...all), Math.max(...all)];
    }, [series, domain]);

    // Densities are estimated once in data space. Only the pixel layout depends on the width.
    const stats = useMemo<RidgeStats[]>(() => series.map((item) => {
        const sorted = [...item.samples].sort((a, b) => a - b);
        const n = sorted.length;
        const mean = sorted.reduce((sum, value) => sum + value, 0) / n;
        const sd = Math.sqrt(sorted.reduce((sum, value) => sum + (value - mean) ** 2, 0) / n);
        const iqr = quantile(sorted, 0.75) - quantile(sorted, 0.25);
        const h = bandwidth ?? Math.max(1e-6, 0.9 * Math.min(sd, iqr / 1.34) * n ** -0.2);
        const density = Array.from({length: RESOLUTION}, (_, i) => {
            const x = min + ((max - min) * i) / (RESOLUTION - 1);
            let total = 0;
            for (const value of sorted) {
                const z = (x - value) / h;
                total += Math.exp(-0.5 * z * z);
            }
            return total / (n * h * Math.sqrt(2 * Math.PI));
        });
        return {series: item, median: quantile(sorted, 0.5), p90: quantile(sorted, 0.9), density};
    }), [series, bandwidth, min, max]);

    const compact = width < 480;
    const left = compact ? 70 : 112;
    const right = compact ? 44 : 64;
    const top = Math.ceil(overlap * rowHeight) - rowHeight + 18;
    const axis = 30;
    const height = top + series.length * rowHeight + axis;
    const plotWidth = Math.max(40, width - left - right);
    const peak = Math.max(...stats.flatMap((item) => item.density));
    const scaleY = (overlap * rowHeight) / (peak || 1);
    const toX = (value: number) => left + ((value - min) / (max - min)) * plotWidth;

    const ridges = useMemo(() => stats.map((item, index) => {
        const baseline = top + (index + 1) * rowHeight;
        const points = item.density.map((value, i): [number, number] => [
            left + (plotWidth * i) / (RESOLUTION - 1),
            baseline - value * scaleY,
        ]);
        const curve = catmullRom(points);
        const first = points[0];
        const last = points[points.length - 1];
        const fill = `M${first[0]},${baseline}L${first[0].toFixed(2)},${first[1].toFixed(2)}${curve}L${last[0]},${baseline}Z`;
        const line = `M${first[0].toFixed(2)},${first[1].toFixed(2)}${curve}`;
        return {...item, baseline, points, fill, line};
    }), [stats, top, rowHeight, left, plotWidth, scaleY]);

    const curveYAt = (index: number, x: number) => {
        const {points, baseline} = ridges[index];
        const t = ((x - left) / plotWidth) * (RESOLUTION - 1);
        if (t < 0 || t > RESOLUTION - 1) return baseline;
        const i = Math.min(RESOLUTION - 2, Math.floor(t));
        return points[i][1] + (points[i + 1][1] - points[i][1]) * (t - i);
    };

    const medianY = (index: number) => curveYAt(index, toX(ridges[index].median));

    // Hit test in the same order the eye does: the lifted ridge first, then front to back. A ridge owns a point
    // when the point is between its curve and its baseline and nothing in front has claimed it.
    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (active !== null && y >= curveYAt(active, x) - LIFT && y <= ridges[active].baseline - LIFT) return;
        for (let i = ridges.length - 1; i >= 0; i--) {
            if (y >= curveYAt(i, x) - 1 && y <= ridges[i].baseline) {
                if (i !== active) setActive(i);
                return;
            }
        }
        const row = Math.ceil((y - top) / rowHeight) - 1;
        setActive(row >= 0 && row < ridges.length ? row : null);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const last = series.length - 1;
        const next: Record<string, number> = {
            ArrowDown: active === null ? 0 : Math.min(last, active + 1),
            ArrowUp: active === null ? last : Math.max(0, active - 1),
            Home: 0,
            End: last,
        };
        if (event.key in next) {
            event.preventDefault();
            setActive(next[event.key]);
        } else if (event.key === "Escape") {
            setActive(null);
        }
    };

    const current = active !== null && ridges[active] ? ridges[active] : null;
    const describe = (item: RidgeStats) => `${item.series.label}: median ${formatValue(item.median)} ${unit}, 90th percentile ${formatValue(item.p90)} ${unit}, ${item.series.samples.length} samples.`;
    const axisTicks = ticks ?? [min, (min + max) / 2, max];
    const easing = [0.22, 1, 0.36, 1] as const;

    return (
        <figure className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 text-stone-900 dark:border-white/10 dark:bg-[#0b0b0c] dark:text-stone-100 ${className}`}>
            {(title || subtitle) && (
                <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 pt-5 sm:px-6">
                    {title && <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{title}</span>}
                    {subtitle && <span className="text-xs text-stone-500 dark:text-stone-400">{subtitle}</span>}
                </figcaption>
            )}
            <div
                ref={viewRef}
                tabIndex={0}
                role="group"
                aria-label={`${summary} Use the up and down arrow keys to read each row.`}
                onKeyDown={handleKeyDown}
                onBlur={() => setActive(null)}
                className="relative mx-2 mb-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 sm:mx-3"
            >
                <div ref={measureRef} className="relative w-full">
                    {width > 0 && (
                        <svg
                            width={width}
                            height={height}
                            aria-hidden="true"
                            className="block touch-none select-none"
                            onPointerMove={handlePointerMove}
                            onPointerDown={handlePointerMove}
                            onPointerLeave={() => setActive(null)}
                        >
                            <defs>
                                {/* Paper grain. It is so faint that it only registers as a lack of flatness. */}
                                <filter id={noiseId} x="0" y="0" width="100%" height="100%">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
                                    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0"/>
                                </filter>
                            </defs>
                            <rect width={width} height={height} filter={`url(#${noiseId})`} className="opacity-100 dark:opacity-0"/>

                            {ridges.map((ridge, index) => {
                                const dim = current !== null && index !== active;
                                return (
                                    <g key={ridge.series.id}>
                                        <text
                                            x={12}
                                            y={ridge.baseline - 5}
                                            className={`text-[11px] transition-colors duration-200 ${index === active ? "fill-orange-600 dark:fill-orange-400" : "fill-stone-500 dark:fill-stone-400"}`}
                                        >
                                            {ridge.series.label}
                                            {ridge.series.code && !compact && (
                                                <tspan dx={6} className="fill-stone-400 font-mono text-[9px] dark:fill-stone-600">{ridge.series.code}</tspan>
                                            )}
                                        </text>
                                        <text
                                            x={width - 12}
                                            y={ridge.baseline - 5}
                                            textAnchor="end"
                                            className={`font-mono text-[10px] tabular-nums transition-colors duration-200 ${index === active ? "fill-orange-600 dark:fill-orange-400" : "fill-stone-400 dark:fill-stone-500"}`}
                                        >
                                            {formatValue(ridge.median)}
                                        </text>
                                        <motion.g
                                            initial={reduceMotion ? false : {scaleY: 0, opacity: 0}}
                                            animate={inView || reduceMotion ? {scaleY: 1, opacity: 1} : {scaleY: 0, opacity: 0}}
                                            transition={{duration: 1.1, ease: easing, delay: 0.15 + (ridges.length - 1 - index) * 0.07}}
                                            style={{originY: 1}}
                                        >
                                            <path d={ridge.fill} className="fill-stone-50 dark:fill-[#0b0b0c]"/>
                                            <path
                                                d={ridge.line}
                                                fill="none"
                                                strokeWidth={1.25}
                                                strokeLinejoin="round"
                                                className="stroke-stone-800 transition-[stroke-opacity] duration-300 dark:stroke-stone-100"
                                                style={{strokeOpacity: dim ? 0.28 : 1}}
                                            />
                                            {/* A short tick at each median. Front ridges cover them, like everything else. */}
                                            <line
                                                x1={toX(ridge.median)}
                                                x2={toX(ridge.median)}
                                                y1={ridge.baseline}
                                                y2={ridge.baseline - 4}
                                                strokeWidth={1}
                                                className="stroke-stone-400 dark:stroke-stone-600"
                                            />
                                        </motion.g>
                                    </g>
                                );
                            })}

                            {/* The lifted copy is drawn last, so it rises above the ridges that were in front of it. */}
                            <AnimatePresence>
                                {current && active !== null && (
                                    <motion.g
                                        key={current.series.id}
                                        initial={{y: 0, opacity: 0}}
                                        animate={{y: -LIFT, opacity: 1}}
                                        exit={{y: 0, opacity: 0}}
                                        transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 420, damping: 32}}
                                        className="pointer-events-none"
                                    >
                                        <path
                                            d={current.fill}
                                            className="fill-stone-50 [filter:drop-shadow(0_6px_5px_rgb(41_37_36/0.16))] dark:fill-[#0b0b0c] dark:[filter:drop-shadow(0_6px_8px_rgb(0_0_0/0.9))]"
                                        />
                                        <path d={current.line} fill="none" strokeWidth={1.75} strokeLinejoin="round" className="stroke-orange-600 dark:stroke-orange-400"/>
                                        <line
                                            x1={toX(current.median)}
                                            x2={toX(current.median)}
                                            y1={current.baseline}
                                            y2={medianY(active)}
                                            strokeWidth={1}
                                            strokeDasharray="2 3"
                                            className="stroke-orange-600 dark:stroke-orange-400"
                                        />
                                        <circle cx={toX(current.median)} cy={medianY(active)} r={3} strokeWidth={1.5} className="fill-stone-50 stroke-orange-600 dark:fill-[#0b0b0c] dark:stroke-orange-400"/>
                                    </motion.g>
                                )}
                            </AnimatePresence>

                            <g>
                                <line x1={left} x2={left + plotWidth} y1={height - axis + 6} y2={height - axis + 6} strokeWidth={1} className="stroke-stone-300 dark:stroke-stone-700"/>
                                {axisTicks.map((tick) => (
                                    <g key={tick}>
                                        <line x1={toX(tick)} x2={toX(tick)} y1={height - axis + 6} y2={height - axis + 10} className="stroke-stone-300 dark:stroke-stone-700"/>
                                        <text x={toX(tick)} y={height - 8} textAnchor="middle" className="fill-stone-400 font-mono text-[10px] tabular-nums dark:fill-stone-500">
                                            {formatValue(tick)}
                                        </text>
                                    </g>
                                ))}
                                {!compact && (
                                    <text x={width - 12} y={height - 8} textAnchor="end" className="fill-stone-400 text-[10px] uppercase tracking-[0.18em] dark:fill-stone-500">
                                        p50 {unit}
                                    </text>
                                )}
                            </g>
                        </svg>
                    )}

                    <AnimatePresence>
                        {current && active !== null && (
                            <motion.div
                                key="tooltip"
                                aria-hidden="true"
                                initial={{opacity: 0, y: 4}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 4}}
                                transition={{duration: 0.18, ease: easing}}
                                className="pointer-events-none absolute z-10 w-40 rounded-lg border border-stone-200 bg-white/95 px-3 py-2 text-xs shadow-[0_8px_24px_-12px_rgb(41_37_36/0.35)] backdrop-blur transition-[left,top] duration-200 ease-out dark:border-white/10 dark:bg-stone-900/95 dark:shadow-black"
                                style={{
                                    left: Math.min(width - 168, Math.max(8, toX(current.median) - 80)),
                                    top: Math.max(4, medianY(active) - LIFT - 78),
                                }}
                            >
                                <div className="font-medium">{current.series.label}</div>
                                <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 font-mono tabular-nums text-stone-500 dark:text-stone-400">
                                    <dt>p50</dt>
                                    <dd className="text-right text-stone-900 dark:text-stone-100">{formatValue(current.median)} {unit}</dd>
                                    <dt>p90</dt>
                                    <dd className="text-right">{formatValue(current.p90)} {unit}</dd>
                                </dl>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <p aria-live="polite" className="sr-only">{current ? describe(current) : ""}</p>
            </div>

            <table className="sr-only">
                <caption>{summary}</caption>
                <thead>
                    <tr><th scope="col">Row</th><th scope="col">Median</th><th scope="col">90th percentile</th><th scope="col">Samples</th></tr>
                </thead>
                <tbody>
                    {stats.map((item) => (
                        <tr key={item.series.id}>
                            <th scope="row">{item.series.label}</th>
                            <td>{formatValue(item.median)} {unit}</td>
                            <td>{formatValue(item.p90)} {unit}</td>
                            <td>{item.series.samples.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </figure>
    );
};
