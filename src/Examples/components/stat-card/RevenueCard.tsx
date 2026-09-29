import {useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowDownRight, LuArrowUpRight} from "react-icons/lu";

export interface DailyValue {
    date: Date;
    value: number;
}

export interface RevenueCardProps {
    /** One entry per day, oldest first. Pass twice the longest range so the change has a previous period to compare with. */
    data: DailyValue[];
    label?: string;
    /** Accessible name of the chart slider. */
    chartLabel?: string;
    /** Range options in days. */
    ranges?: number[];
    /** Selected range in days. Pass it with `onRangeChange` to control the card. */
    range?: number;
    defaultRange?: number;
    onRangeChange?: (range: number) => void;
    /** Formats the total, the axis ticks and the tooltip value. */
    formatValue?: (value: number) => string;
    /** Axis ticks are rounded to a multiple of this number. */
    tickStep?: number;
    className?: string;
}

const WIDTH = 600;
const HEIGHT = 160;

const currency = (value: number) => value.toLocaleString("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 0});
const shortDate = (date: Date) => date.toLocaleDateString("en-US", {month: "short", day: "numeric"});
const longDate = (date: Date) => date.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"});

/** A metric card with a range switch and an area chart you can scrub with the pointer or the arrow keys. */
export const RevenueCard = ({
    data,
    label = "Net revenue",
    chartLabel = "Daily revenue",
    ranges = [7, 30, 90],
    range: rangeProp,
    defaultRange = 30,
    onRangeChange,
    formatValue = currency,
    tickStep = 100,
    className = "",
}: RevenueCardProps) => {
    const [innerRange, setInnerRange] = useState(defaultRange);
    const range = rangeProp ?? innerRange;
    const [hover, setHover] = useState<number | null>(null);
    const plotRef = useRef<HTMLDivElement>(null);
    const gradientId = `revenue-${useId().replace(/:/g, "")}`;
    const reduceMotion = useReducedMotion();

    const {days, total, change, points, line, area, ticks} = useMemo(() => {
        const days = data.slice(-range);
        const previous = data.slice(-range * 2, -range);
        const total = days.reduce((sum, day) => sum + day.value, 0);
        const previousTotal = previous.reduce((sum, day) => sum + day.value, 0);
        const change = previousTotal ? ((total - previousTotal) / previousTotal) * 100 : 0;

        const values = days.map((day) => day.value);
        const min = Math.min(...values) * 0.9;
        const max = Math.max(...values) * 1.05;
        const points = days.map((day, index) => ({
            x: (index / (days.length - 1)) * WIDTH,
            y: HEIGHT - ((day.value - min) / (max - min)) * HEIGHT,
        }));
        const line = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
        const area = `${line} L${WIDTH} ${HEIGHT} L0 ${HEIGHT} Z`;
        const ticks = [max, (max + min) / 2, min].map((value) => Math.round(value / tickStep) * tickStep);
        return {days, total, change, points, line, area, ticks};
    }, [data, range, tickStep]);

    const index = hover ?? days.length - 1;
    const day = days[index];
    const point = points[index];
    const left = (point.x / WIDTH) * 100;
    const top = (point.y / HEIGHT) * 100;
    const up = change >= 0;

    const selectRange = (option: number) => {
        if (rangeProp === undefined) setInnerRange(option);
        onRangeChange?.(option);
        setHover(null);
    };

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = plotRef.current?.getBoundingClientRect();
        if (!rect) return;
        const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
        setHover(Math.round(ratio * (days.length - 1)));
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const last = days.length - 1;
        const moves: Record<string, number> = {
            ArrowLeft: Math.max(index - 1, 0),
            ArrowRight: Math.min(index + 1, last),
            Home: 0,
            End: last,
        };
        if (!(event.key in moves)) return;
        event.preventDefault();
        setHover(moves[event.key]);
    };

    return (
        <div className={`w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums dark:text-white">{formatValue(total)}</p>
                    <p className="mt-1.5 flex items-center gap-2 text-xs">
                        <span
                            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium tabular-nums ${
                                up
                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                                    : "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300"
                            }`}
                        >
                            {up ? <LuArrowUpRight className="size-3.5" aria-hidden/> : <LuArrowDownRight className="size-3.5" aria-hidden/>}
                            {up ? "+" : "-"}{Math.abs(change).toFixed(1)}%
                        </span>
                        <span className="text-zinc-500 dark:text-zinc-400">vs. previous {range} days</span>
                    </p>
                </div>
                <div className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-white/5" role="group" aria-label="Date range">
                    {ranges.map((option) => (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={option === range}
                            onClick={() => selectRange(option)}
                            className={`h-7 rounded-md px-2.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${
                                option === range
                                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                            }`}
                        >
                            {option}D
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <div className="flex h-40 flex-col justify-between text-right text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500" aria-hidden>
                    {ticks.map((tick, tickIndex) => (
                        <span key={tickIndex} className="-my-1.5">{formatValue(tick)}</span>
                    ))}
                </div>
                <div className="min-w-0 flex-1">
                    <div
                        ref={plotRef}
                        role="slider"
                        tabIndex={0}
                        aria-label={chartLabel}
                        aria-valuemin={0}
                        aria-valuemax={days.length - 1}
                        aria-valuenow={index}
                        aria-valuetext={`${longDate(day.date)}: ${formatValue(day.value)}`}
                        onPointerMove={onPointerMove}
                        onPointerDown={onPointerMove}
                        onPointerLeave={() => setHover(null)}
                        onKeyDown={onKeyDown}
                        onFocus={() => setHover((current) => current ?? days.length - 1)}
                        onBlur={() => setHover(null)}
                        className="relative h-40 cursor-crosshair touch-none rounded-md outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
                    >
                        {[0, 50, 100].map((position) => (
                            <span
                                key={position}
                                className="absolute inset-x-0 border-t border-dashed border-zinc-200 dark:border-white/[0.07]"
                                style={{top: `${position}%`}}
                                aria-hidden
                            />
                        ))}
                        <motion.svg
                            key={range}
                            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                            preserveAspectRatio="none"
                            className="absolute inset-0 size-full overflow-visible text-indigo-500 dark:text-indigo-400"
                            initial={reduceMotion ? false : {opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.3}}
                            aria-hidden
                        >
                            <defs>
                                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.25"/>
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
                                </linearGradient>
                            </defs>
                            <path d={area} fill={`url(#${gradientId})`}/>
                            <path d={line} fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
                        </motion.svg>

                        {hover !== null && (
                            <>
                                <span className="absolute inset-y-0 w-px bg-zinc-300 dark:bg-zinc-600" style={{left: `${left}%`}} aria-hidden/>
                                <span
                                    className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-indigo-500 shadow dark:border-zinc-900 dark:bg-indigo-400"
                                    style={{left: `${left}%`, top: `${top}%`}}
                                    aria-hidden
                                />
                                <div
                                    className={`pointer-events-none absolute z-10 -mt-3 -translate-y-full whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 shadow-lg shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-800 dark:shadow-black/40 ${
                                        left < 15 ? "" : left > 85 ? "-translate-x-full" : "-translate-x-1/2"
                                    }`}
                                    style={{left: `${left}%`, top: `${top}%`}}
                                    aria-hidden
                                >
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{shortDate(day.date)}</p>
                                    <p className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-white">{formatValue(day.value)}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-2 flex justify-between text-[11px] text-zinc-400 dark:text-zinc-500" aria-hidden>
                        <span>{shortDate(days[0].date)}</span>
                        <span>{shortDate(days[days.length - 1].date)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
