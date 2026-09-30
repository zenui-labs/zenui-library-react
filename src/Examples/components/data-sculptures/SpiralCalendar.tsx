import {useEffect, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";

export interface SpiralDay {
    /** ISO date, e.g. "2025-03-14". */
    date: string;
    value: number;
}

export interface SpiralAnnotation {
    /** ISO date of the day to point at. */
    date: string;
    label: string;
}

export interface SpiralCalendarProps {
    /** One entry per day of a single year, in order. */
    data: SpiralDay[];
    /** Unit after values, e.g. "km". */
    unit?: string;
    /** Value at which a dot reaches full size and ink. Defaults to the largest value. */
    max?: number;
    /** Days called out with a leader line outside the spiral. Keep it to two or three. */
    annotations?: SpiralAnnotation[];
    /** Legend steps for the dot size. */
    legend?: number[];
    title?: ReactNode;
    subtitle?: ReactNode;
    /** Plain text summary for screen readers. */
    summary: string;
    formatValue?: (value: number) => string;
    className?: string;
}

interface PlacedDay extends SpiralDay {
    index: number;
    month: number;
    day: number;
    weekday: number;
    /** Position along the spiral in turns, 0 to 12. */
    turn: number;
    x: number;
    y: number;
    angle: number;
    r: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// A small wedge at twelve o'clock is left free for the month labels.
const GAP = (9 * Math.PI) / 180;

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

// Position along the spiral. `turn` counts months from the center, so the radius grows by one ring per month and
// the fraction of the month sets the angle, skipping the label wedge.
const spiralPoint = (turn: number, center: number, inner: number, outer: number) => {
    const angle = -Math.PI / 2 + GAP + (2 * Math.PI - 2 * GAP) * (turn % 1);
    const r = inner + (outer - inner) * (turn / 12);
    return {angle, r, x: center + r * Math.cos(angle), y: center + r * Math.sin(angle)};
};

const parse = (iso: string) => {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
};

const longDate = (iso: string) => parse(iso).toLocaleDateString("en-GB", {weekday: "short", day: "numeric", month: "short", timeZone: "UTC"});

/**
 * A year laid along an Archimedean spiral, one turn per month. Day 1 of every month sits on the twelve o'clock
 * spoke, so the same point in each month lines up radially and the seasons read as bands from the center out.
 */
export const SpiralCalendar = ({
    data,
    unit = "",
    max,
    annotations = [],
    legend,
    title,
    subtitle,
    summary,
    formatValue = (value) => value.toFixed(1),
    className = "",
}: SpiralCalendarProps) => {
    const [measureRef, width] = useWidth();
    const viewRef = useRef<HTMLDivElement>(null);
    const inView = useInView(viewRef, {once: true, amount: 0.35});
    const reduceMotion = useReducedMotion() ?? false;
    const [active, setActive] = useState<number | null>(null);

    const size = Math.min(width, 520);
    const center = size / 2;
    const inner = size * 0.13;
    const outer = size / 2 - (size < 420 ? 30 : 46);
    const top = Math.max(...data.map((item) => item.value));
    const ceiling = max ?? top;
    const turnGap = (outer - inner) / 12;
    const dotMax = Math.max(1.6, Math.min(6, turnGap * 0.46));

    const radiusAt = (turn: number) => inner + (outer - inner) * (turn / 12);

    const days = useMemo<PlacedDay[]>(() => data.map((item, index) => {
        const date = parse(item.date);
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        const length = new Date(Date.UTC(date.getUTCFullYear(), month + 1, 0)).getUTCDate();
        const turn = month + (day - 1) / length;
        return {...item, index, month, day, weekday: date.getUTCDay(), turn, ...spiralPoint(turn, center, inner, outer)};
    }), [data, center, inner, outer]);

    // The guide is sampled finely enough that straight segments read as a curve.
    const guide = useMemo(() => {
        let d = "";
        for (let step = 0; step < 12 * 64; step++) {
            const {x, y} = spiralPoint(step / 64, center, inner, outer);
            d += `${step === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
        }
        return d;
    }, [center, inner, outer]);

    const dotRadius = (value: number) => (value <= 0 ? 1.4 : 1.6 + (dotMax - 1.6) * Math.sqrt(Math.min(1, value / ceiling)));
    const ink = (value: number) => 0.28 + 0.72 * Math.min(1, value / ceiling);

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let best = -1;
        let bestDistance = Math.max(12, turnGap * 0.8) ** 2;
        for (const day of days) {
            const distance = (day.x - x) ** 2 + (day.y - y) ** 2;
            if (distance < bestDistance) {
                bestDistance = distance;
                best = day.index;
            }
        }
        setActive(best === -1 ? null : best);
    };

    // Left and right walk the spiral a day at a time. Up and down jump a whole turn, which is the same date in the
    // next or previous month, so you move straight out or in along the spoke.
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const last = days.length - 1;
        const from = active ?? 0;
        // The same date in another month, or its last day when that month is shorter.
        const sameDay = (month: number) => {
            const match = days.filter((day) => day.month === month);
            return match[Math.min(match.length - 1, days[from].day - 1)]?.index ?? from;
        };
        const moves: Record<string, () => number> = {
            ArrowRight: () => Math.min(last, from + (active === null ? 0 : 1)),
            ArrowLeft: () => Math.max(0, from - 1),
            ArrowUp: () => (days[from].month < 11 ? sameDay(days[from].month + 1) : from),
            ArrowDown: () => (days[from].month > 0 ? sameDay(days[from].month - 1) : from),
            Home: () => 0,
            End: () => last,
        };
        if (moves[event.key]) {
            event.preventDefault();
            setActive(moves[event.key]());
        } else if (event.key === "Escape") {
            setActive(null);
        }
    };

    const current = active !== null ? days[active] : null;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const activeDays = data.filter((item) => item.value > 0).length;
    const year = data.length ? parse(data[0].date).getUTCFullYear() : "";
    const legendSteps = legend ?? [0, ceiling / 3, (2 * ceiling) / 3, ceiling].map((value) => Math.round(value));
    const animateIn = !reduceMotion;
    const sweepSeconds = 1.8;

    const monthTotals = MONTHS.map((_, month) => days.reduce((sum, day) => (day.month === month ? sum + day.value : sum), 0));

    return (
        <figure className={`w-full max-w-2xl rounded-2xl border border-zinc-200 bg-[#fbfaf7] p-4 text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100 sm:p-6 ${className}`}>
            <style>{`
                @keyframes zsSpiralPop { from { opacity: 0; transform: scale(0); } 60% { opacity: 1; transform: scale(1.35); } to { opacity: 1; transform: scale(1); } }
                .zs-spiral-dot { transform-box: fill-box; transform-origin: center; }
            `}</style>
            {(title || subtitle) && (
                <figcaption className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    {title && <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{title}</span>}
                    {subtitle && <span className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</span>}
                </figcaption>
            )}

            <div
                ref={viewRef}
                tabIndex={0}
                role="group"
                aria-label={`${summary} Use the arrow keys to move by day, or up and down to move by month.`}
                onKeyDown={handleKeyDown}
                onBlur={() => setActive(null)}
                className="rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-teal-600/60 dark:focus-visible:ring-teal-300/60"
            >
                <div ref={measureRef} className="relative mx-auto w-full max-w-[520px]">
                    {size > 0 && (
                        <svg
                            width={size}
                            height={size}
                            aria-hidden="true"
                            className="mx-auto block touch-none select-none text-teal-700 dark:text-teal-300"
                            onPointerMove={handlePointerMove}
                            onPointerDown={handlePointerMove}
                            onPointerLeave={() => setActive(null)}
                        >
                            {/* The month spoke. Every turn crosses it on the first of the month. */}
                            <line x1={center} y1={center - inner + 6} x2={center} y2={center - outer - 8} strokeWidth={1} strokeDasharray="1 3" className="stroke-zinc-300 dark:stroke-zinc-700"/>
                            <motion.path
                                d={guide}
                                fill="none"
                                strokeWidth={0.75}
                                className="stroke-zinc-300 dark:stroke-zinc-800"
                                initial={animateIn ? {pathLength: 0} : false}
                                animate={{pathLength: inView || !animateIn ? 1 : 0}}
                                transition={{duration: sweepSeconds, ease: [0.45, 0, 0.2, 1]}}
                            />

                            {current && (
                                <line
                                    x1={center}
                                    y1={center}
                                    x2={center + (outer + 10) * Math.cos(current.angle)}
                                    y2={center + (outer + 10) * Math.sin(current.angle)}
                                    strokeWidth={1}
                                    className="stroke-zinc-400/70 dark:stroke-zinc-600"
                                />
                            )}

                            {days.map((day) => {
                                const sameWeekday = current !== null && day.weekday === current.weekday && day.index !== current.index;
                                const delay = (day.turn / 12) * sweepSeconds * 1000;
                                return (
                                    <circle
                                        key={day.date}
                                        cx={day.x}
                                        cy={day.y}
                                        r={dotRadius(day.value)}
                                        fill={day.value > 0 ? "currentColor" : "none"}
                                        stroke={day.value > 0 ? "none" : "currentColor"}
                                        strokeWidth={0.75}
                                        className="zs-spiral-dot transition-opacity duration-200"
                                        style={{
                                            fillOpacity: ink(day.value) * (current && !sameWeekday && day.index !== current.index ? 0.55 : 1),
                                            strokeOpacity: 0.45,
                                            opacity: animateIn && !inView ? 0 : undefined,
                                            animation: animateIn && inView ? `zsSpiralPop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms both` : undefined,
                                        }}
                                    />
                                );
                            })}

                            {/* Rings on the same weekday all year: hover a Sunday and every long run answers. */}
                            {current && days.filter((day) => day.weekday === current.weekday && day.value > 0 && day.index !== current.index).map((day) => (
                                <circle key={`ring-${day.date}`} cx={day.x} cy={day.y} r={dotRadius(day.value) + 1.75} fill="none" strokeWidth={0.75} className="pointer-events-none stroke-zinc-900/50 dark:stroke-white/50"/>
                            ))}
                            {current && (
                                <circle cx={current.x} cy={current.y} r={dotRadius(current.value) + 3} fill="none" strokeWidth={1.5} className="pointer-events-none stroke-zinc-900 dark:stroke-white"/>
                            )}

                            {MONTHS.map((month, index) => (
                                <text
                                    key={month}
                                    x={center}
                                    y={center - radiusAt(index) + 3}
                                    textAnchor="middle"
                                    className="fill-zinc-500 stroke-[#fbfaf7] text-[8.5px] font-medium uppercase tracking-[0.12em] [paint-order:stroke] dark:fill-zinc-400 dark:stroke-zinc-950"
                                    strokeWidth={3}
                                >
                                    {month}
                                </text>
                            ))}

                            {annotations.map((note) => {
                                const day = days.find((item) => item.date === note.date);
                                if (!day) return null;
                                const cos = Math.cos(day.angle);
                                const sin = Math.sin(day.angle);
                                const reach = outer + (size < 420 ? 14 : 22);
                                const end = {x: center + reach * cos, y: center + reach * sin};
                                // Keep long labels inside the chart: 10px text runs about 5.6px per character.
                                const labelWidth = note.label.length * 5.6;
                                const labelX = cos >= 0 ? Math.min(end.x + 3, size - labelWidth) : Math.max(end.x - 3, labelWidth);
                                return (
                                    <g key={note.date} className="pointer-events-none">
                                        <line x1={day.x + (dotRadius(day.value) + 2) * cos} y1={day.y + (dotRadius(day.value) + 2) * sin} x2={end.x} y2={end.y} strokeWidth={0.75} className="stroke-zinc-500 dark:stroke-zinc-500"/>
                                        <text
                                            x={labelX}
                                            y={end.y + (sin > 0.3 ? 9 : sin < -0.3 ? -3 : 3)}
                                            textAnchor={cos >= 0 ? "start" : "end"}
                                            className="fill-zinc-600 text-[10px] dark:fill-zinc-300"
                                        >
                                            {note.label}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    )}

                    {/* The hub reads like a watch face: the year at rest, the day under the pointer while you look. */}
                    {size > 0 && (
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                            style={{top: center, width: inner * 1.7}}
                        >
                            {current ? (
                                <>
                                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{longDate(current.date)}</span>
                                    <span className="font-mono text-lg font-semibold tabular-nums leading-tight sm:text-xl">{current.value > 0 ? formatValue(current.value) : "Rest"}</span>
                                    {current.value > 0 && <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{unit}</span>}
                                </>
                            ) : (
                                <>
                                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{year}</span>
                                    <span className="font-mono text-lg font-semibold tabular-nums leading-tight sm:text-xl">{Math.round(total).toLocaleString()}</span>
                                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{unit} · {activeDays} runs</span>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-zinc-500 dark:text-zinc-400" aria-hidden="true">
                    {legendSteps.map((step) => (
                        <span key={step} className="flex items-center gap-1.5">
                            <svg width={14} height={14} className="text-teal-700 dark:text-teal-300">
                                <circle cx={7} cy={7} r={dotRadius(step)} fill={step > 0 ? "currentColor" : "none"} stroke={step > 0 ? "none" : "currentColor"} strokeOpacity={0.45} strokeWidth={0.75} style={{fillOpacity: ink(step)}}/>
                            </svg>
                            <span className="font-mono tabular-nums">{step > 0 ? `${step} ${unit}` : "Rest day"}</span>
                        </span>
                    ))}
                </div>
                <p aria-live="polite" className="sr-only">{current ? `${longDate(current.date)}: ${current.value > 0 ? `${formatValue(current.value)} ${unit}` : "rest day"}` : ""}</p>
            </div>

            <table className="sr-only">
                <caption>{summary}</caption>
                <thead><tr><th scope="col">Month</th><th scope="col">Total {unit}</th></tr></thead>
                <tbody>
                    {MONTHS.map((month, index) => (
                        <tr key={month}><th scope="row">{month}</th><td>{formatValue(monthTotals[index])}</td></tr>
                    ))}
                </tbody>
            </table>
        </figure>
    );
};
