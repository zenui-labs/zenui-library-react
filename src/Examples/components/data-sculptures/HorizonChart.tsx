import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {animate, motion, useInView, useReducedMotion} from "framer-motion";
import {LuFoldVertical, LuUnfoldVertical} from "react-icons/lu";

export interface HorizonSeries {
    id: string;
    label: string;
    /** One value per timestamp, positive above the baseline and negative below. */
    values: number[];
}

export interface HorizonChartProps {
    series: HorizonSeries[];
    /** Label for every sample, e.g. "14:35". */
    times: string[];
    /** Size of one band in data units. Three bands cover values up to three times this. */
    band: number;
    /** Indexes of `times` to label on the axis. */
    ticks?: number[];
    unit?: string;
    /** Folded row height in px. */
    rowHeight?: number;
    /** Words for above and below the baseline in the legend. */
    legendLabels?: [below: string, above: string];
    title?: ReactNode;
    subtitle?: ReactNode;
    /** Plain text summary for screen readers. */
    summary: string;
    formatValue?: (value: number) => string;
    className?: string;
}

const BANDS = 3;
// Light mode darkens with each band; dark mode brightens, so the strongest band is always the one that stands out.
const ABOVE = ["fill-orange-200 dark:fill-orange-950", "fill-orange-400 dark:fill-orange-700", "fill-orange-700 dark:fill-orange-400"];
const BELOW = ["fill-sky-200 dark:fill-sky-950", "fill-sky-400 dark:fill-sky-700", "fill-sky-700 dark:fill-sky-400"];

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
 * A horizon chart: each row is an area chart cut into bands that are folded on top of each other, so a 180 px
 * chart fits in 30 px. Values below the baseline are mirrored up in a second hue. Click a row name to unfold it
 * and watch the bands slide apart into the plain chart they came from.
 */
export const HorizonChart = ({
    series,
    times,
    band,
    ticks,
    unit = "",
    rowHeight = 30,
    legendLabels = ["Below", "Above"],
    title,
    subtitle,
    summary,
    formatValue = (value) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toFixed(1)}`,
    className = "",
}: HorizonChartProps) => {
    const [measureRef, width] = useWidth();
    const viewRef = useRef<HTMLDivElement>(null);
    const inView = useInView(viewRef, {once: true, amount: 0.3});
    const reduceMotion = useReducedMotion() ?? false;
    const [cursor, setCursor] = useState<number | null>(null);
    const [open, setOpen] = useState<string | null>(null);
    const [unfold, setUnfold] = useState<Record<string, number>>({});
    // Read by the effect below as the starting point of each animation, without restarting it on every frame.
    const unfoldRef = useRef(unfold);
    unfoldRef.current = unfold;
    const uid = useId().replace(/:/g, "");

    const count = times.length;
    const compact = width < 520;
    const left = compact ? 92 : 128;
    const right = compact ? 58 : 76;
    const plotWidth = Math.max(40, width - left - right);
    const h = rowHeight;
    const gap = 2;
    const axisTop = 22;
    const toX = (index: number) => left + (plotWidth * index) / Math.max(1, count - 1);

    // Animate each row's fold progress. Only one row is open at a time, so opening one closes the other.
    useEffect(() => {
        const controls = series.map((item) => {
            const target = item.id === open ? 1 : 0;
            if (reduceMotion) {
                setUnfold((state) => (state[item.id] === target ? state : {...state, [item.id]: target}));
                return null;
            }
            return animate(unfoldRef.current[item.id] ?? 0, target, {
                type: "spring",
                stiffness: 170,
                damping: 24,
                restDelta: 0.001,
                onUpdate: (value) => setUnfold((state) => ({...state, [item.id]: value})),
            });
        });
        return () => controls.forEach((control) => control?.stop());
    }, [open, reduceMotion, series]);

    // Band shapes are built once per width in row-local coordinates, with the baseline at the bottom (y = h).
    const shapes = useMemo(() => series.map((item) => {
        const x = (index: number) => (left + (plotWidth * index) / Math.max(1, count - 1)).toFixed(1);
        const build = (sign: 1 | -1, level: number) => {
            let d = `M${x(0)},${h}`;
            item.values.forEach((value, i) => {
                const part = Math.min(band, Math.max(0, sign * value - level * band)) / band;
                d += `L${x(i)},${(h - part * h).toFixed(1)}`;
            });
            return `${d}L${x(count - 1)},${h}Z`;
        };
        return {
            above: Array.from({length: BANDS}, (_, level) => build(1, level)),
            below: Array.from({length: BANDS}, (_, level) => build(-1, level)),
        };
    }), [series, band, h, left, plotWidth, count]);

    let offset = axisTop;
    const rows = series.map((item, index) => {
        const t = unfold[item.id] ?? 0;
        const height = h + t * (2 * BANDS - 1) * h;
        const row = {item, index, t, top: offset, height};
        offset += height + gap;
        return row;
    });
    const plotBottom = offset - gap;
    const svgHeight = plotBottom + 26;

    const setFromPointer = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        if (x < left - 8 || x > left + plotWidth + 8) {
            setCursor(null);
            return;
        }
        setCursor(Math.round(Math.min(1, Math.max(0, (x - left) / plotWidth)) * (count - 1)));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 12 : 1;
        const from = cursor ?? count - 1;
        const moves: Record<string, number> = {
            ArrowLeft: Math.max(0, from - (cursor === null ? 0 : step)),
            ArrowRight: Math.min(count - 1, from + (cursor === null ? 0 : step)),
            Home: 0,
            End: count - 1,
        };
        if (event.key in moves) {
            event.preventDefault();
            setCursor(moves[event.key]);
        } else if (event.key === "Escape") {
            setCursor(null);
        }
    };

    const shown = cursor ?? count - 1;
    const axisTicks = ticks ?? [0, Math.round((count - 1) / 2), count - 1];
    const bandIndex = (value: number) => Math.min(BANDS - 1, Math.floor(Math.abs(value) / band));

    return (
        <figure className={`w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100 sm:p-6 ${className}`}>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                {(title || subtitle) && (
                    <figcaption>
                        {title && <div className="text-[11px] font-semibold uppercase tracking-[0.22em]">{title}</div>}
                        {subtitle && <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</div>}
                    </figcaption>
                )}
                {/* Legend: the six band colors in order, from far below the baseline to far above it. */}
                <div aria-hidden="true" className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                    <span>{legendLabels[0]}</span>
                    <span className="flex overflow-hidden rounded-sm">
                        {[...BELOW].reverse().concat(ABOVE).map((fill, i) => (
                            <svg key={i} width={16} height={8} className="block"><rect width={16} height={8} className={fill}/></svg>
                        ))}
                    </span>
                    <span>{legendLabels[1]}</span>
                    <span className="font-mono tabular-nums text-zinc-400 dark:text-zinc-500">±{band * BANDS} {unit}</span>
                </div>
            </div>

            <div
                ref={viewRef}
                tabIndex={0}
                role="group"
                aria-label={`${summary} Use the left and right arrow keys to move the crosshair, with Shift to move by an hour.`}
                onKeyDown={handleKeyDown}
                onBlur={() => setCursor(null)}
                className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-zinc-950"
            >
                <div ref={measureRef} className="relative w-full">
                    {width > 0 && (
                        <svg
                            width={width}
                            height={svgHeight}
                            aria-hidden="true"
                            className="block touch-none select-none"
                            onPointerMove={setFromPointer}
                            onPointerDown={setFromPointer}
                            onPointerLeave={() => setCursor(null)}
                        >
                            <defs>
                                {rows.map((row) => (
                                    <clipPath key={row.item.id} id={`${uid}-clip-${row.index}`}>
                                        <motion.rect
                                            x={left}
                                            y={0}
                                            height={row.height}
                                            initial={reduceMotion ? false : {width: 0}}
                                            animate={{width: inView || reduceMotion ? plotWidth : 0}}
                                            transition={{duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.1 + row.index * 0.07}}
                                        />
                                    </clipPath>
                                ))}
                            </defs>

                            {rows.map((row) => {
                                const shape = shapes[row.index];
                                const {t} = row;
                                const baseline = BANDS * h;
                                return (
                                    <g key={row.item.id} transform={`translate(0 ${row.top})`}>
                                        <rect x={left} width={plotWidth} height={row.height} className="fill-zinc-50 dark:fill-zinc-900/60"/>
                                        <g clipPath={`url(#${uid}-clip-${row.index})`}>
                                            {/* Above the baseline: band n slides up n rows as the row unfolds. */}
                                            {shape.above.map((d, level) => (
                                                <path key={`a${level}`} d={d} className={ABOVE[level]} transform={`translate(0 ${t * (BANDS - 1 - level) * h})`}/>
                                            ))}
                                            {/* Below: mirrored up while folded, flipped back under the baseline as it unfolds. */}
                                            {shape.below.map((d, level) => (
                                                <path key={`b${level}`} d={d} className={BELOW[level]} transform={`translate(0 ${t * (BANDS + level + 1) * h}) scale(1 ${1 - 2 * t})`}/>
                                            ))}
                                        </g>
                                        {t > 0.01 && (
                                            <g style={{opacity: t}}>
                                                {Array.from({length: 2 * BANDS - 1}, (_, i) => i + 1).map((line) => (
                                                    <line
                                                        key={line}
                                                        x1={left}
                                                        x2={left + plotWidth}
                                                        y1={line * h}
                                                        y2={line * h}
                                                        strokeWidth={line === BANDS ? 1 : 0.5}
                                                        strokeDasharray={line === BANDS ? undefined : "2 3"}
                                                        className={line === BANDS ? "stroke-zinc-500 dark:stroke-zinc-400" : "stroke-zinc-300 dark:stroke-zinc-700"}
                                                    />
                                                ))}
                                                {[BANDS, 1, -1, -BANDS].map((level) => (
                                                    <text key={level} x={left + 4} y={baseline - level * h + (level > 0 ? 10 : -3)} className="fill-zinc-500 font-mono text-[9px] tabular-nums dark:fill-zinc-400">
                                                        {level > 0 ? "+" : "−"}{Math.abs(level) * band}
                                                    </text>
                                                ))}
                                            </g>
                                        )}
                                    </g>
                                );
                            })}

                            {axisTicks.map((tick) => (
                                <text key={tick} x={toX(tick)} y={svgHeight - 8} textAnchor={tick === 0 ? "start" : tick === count - 1 ? "end" : "middle"} className="fill-zinc-400 font-mono text-[10px] tabular-nums dark:fill-zinc-500">
                                    {times[tick]}
                                </text>
                            ))}

                            {cursor !== null && (
                                <g className="pointer-events-none">
                                    <line x1={toX(cursor)} x2={toX(cursor)} y1={axisTop - 4} y2={plotBottom + 4} strokeWidth={1} className="stroke-zinc-900 dark:stroke-white"/>
                                    <rect x={Math.min(left + plotWidth - 40, Math.max(left, toX(cursor) - 20))} y={1} width={40} height={16} rx={4} className="fill-zinc-900 dark:fill-white"/>
                                    <text x={Math.min(left + plotWidth - 20, Math.max(left + 20, toX(cursor)))} y={12.5} textAnchor="middle" className="fill-white font-mono text-[10px] tabular-nums dark:fill-zinc-900">
                                        {times[cursor]}
                                    </text>
                                </g>
                            )}
                        </svg>
                    )}

                    {width > 0 && rows.map((row) => {
                        const value = row.item.values[shown];
                        const expanded = open === row.item.id;
                        const Icon = expanded ? LuFoldVertical : LuUnfoldVertical;
                        return (
                            <div key={row.item.id}>
                                <button
                                    type="button"
                                    aria-expanded={expanded}
                                    aria-label={`${expanded ? "Fold" : "Unfold"} ${row.item.label}`}
                                    onClick={() => setOpen(expanded ? null : row.item.id)}
                                    className="group absolute left-0 flex items-center gap-1.5 rounded-md pr-2 text-left font-mono text-[11px] text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 dark:text-zinc-400 dark:hover:text-white dark:focus-visible:ring-white/30"
                                    style={{top: row.top, height: h, width: left - 6}}
                                >
                                    <Icon className="h-3 w-3 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-300" aria-hidden="true"/>
                                    <span className="truncate">{row.item.label}</span>
                                </button>
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute flex items-center justify-end gap-1.5 font-mono text-[11px] tabular-nums"
                                    style={{top: row.top, height: h, right: 0, width: right - 6}}
                                >
                                    <svg width={6} height={6} className="shrink-0"><rect width={6} height={6} rx={1} className={(value >= 0 ? ABOVE : BELOW)[bandIndex(value)]}/></svg>
                                    <span className={cursor === null ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-900 dark:text-white"}>{formatValue(value)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <p aria-live="polite" className="sr-only">
                    {cursor !== null ? `${times[cursor]}: ${series.map((item) => `${item.label} ${formatValue(item.values[cursor])} ${unit}`).join(", ")}.` : ""}
                </p>
            </div>

            <table className="sr-only">
                <caption>{summary}</caption>
                <thead><tr><th scope="col">Series</th><th scope="col">Peak above</th><th scope="col">Lowest</th><th scope="col">Latest</th></tr></thead>
                <tbody>
                    {series.map((item) => {
                        const top = Math.max(...item.values);
                        const low = Math.min(...item.values);
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.label}</th>
                                <td>{formatValue(top)} {unit} at {times[item.values.indexOf(top)]}</td>
                                <td>{formatValue(low)} {unit} at {times[item.values.indexOf(low)]}</td>
                                <td>{formatValue(item.values[count - 1])} {unit}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </figure>
    );
};
