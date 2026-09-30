import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuMoon, LuSun} from "react-icons/lu";

export interface TimeRange {
    /** Minutes after midnight, 0–1439. */
    start: number;
    /** Minutes after midnight, 0–1439. May be earlier than `start` when the range crosses midnight. */
    end: number;
}

export interface RadialTimeRangeProps {
    defaultValue?: TimeRange;
    onChange?: (range: TimeRange) => void;
    startLabel?: string;
    endLabel?: string;
    /** Target length in minutes. The center reports how far the range is from it. */
    goal?: number;
    /** Minutes after midnight. With `sunset`, draws a thin daylight band inside the ring. */
    sunrise?: number;
    sunset?: number;
    /** Snap interval in minutes. */
    step?: number;
    className?: string;
}

const DAY = 1440;
const RAD = Math.PI / 180;
const CENTER = 120;
const RING = 94;
const wrap = (m: number) => ((m % DAY) + DAY) % DAY;
const span = (from: number, to: number) => wrap(to - from);
const toAngle = (m: number) => (m / DAY) * 360;
const at = (m: number, r: number) => ({x: CENTER + r * Math.sin(toAngle(m) * RAD), y: CENTER - r * Math.cos(toAngle(m) * RAD)});
const clock = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const spoken = (m: number) => {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return [h && `${h} h`, min && `${min} min`].filter(Boolean).join(" ") || "0 min";
};

// A number that rolls vertically when it changes, like a split-flap counter.
const Roll = ({value, still}: {value: string; still: boolean}) => (
    <span className="relative inline-flex overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
                key={value}
                initial={{y: still ? 0 : "-60%", opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: still ? 0 : "60%", opacity: 0}}
                transition={{type: "spring", stiffness: 520, damping: 34}}
                className="inline-block"
            >
                {value}
            </motion.span>
        </AnimatePresence>
    </span>
);

interface Drag {
    kind: "start" | "end" | "arc";
    last: number;
    moved: number;
    origin: TimeRange;
}

/**
 * A 24-hour ring for picking a time range, such as a sleep schedule. Drag either handle, or drag the arc
 * to move both. Values snap to `step` minutes and both handles work with the arrow keys.
 */
export const RadialTimeRange = ({
    defaultValue = {start: 23 * 60 + 15, end: 7 * 60},
    onChange,
    startLabel = "Bedtime",
    endLabel = "Wake up",
    goal,
    sunrise,
    sunset,
    step = 5,
    className = "",
}: RadialTimeRangeProps) => {
    const still = useReducedMotion() ?? false;
    const [range, setRange] = useState<TimeRange>(defaultValue);
    const [active, setActive] = useState<Drag["kind"] | null>(null);
    const dialRef = useRef<HTMLDivElement>(null);
    const drag = useRef<Drag | null>(null);
    const {start, end} = range;
    const duration = span(start, end);

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    useEffect(() => {
        onChangeRef.current?.({start, end});
    }, [start, end]);

    const snap = (m: number) => wrap(Math.round(m / step) * step);

    const pointerMinutes = (clientX: number, clientY: number) => {
        const rect = dialRef.current.getBoundingClientRect();
        const dx = clientX - (rect.left + rect.width / 2);
        const dy = clientY - (rect.top + rect.height / 2);
        const deg = wrap((Math.atan2(dx, -dy) / RAD / 360) * DAY);
        return {minutes: deg, radius: (Math.hypot(dx, dy) / (rect.width / 2)) * CENTER};
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        const {minutes, radius} = pointerMinutes(event.clientX, event.clientY);
        const handle = (event.target as HTMLElement).closest<HTMLElement>("[data-handle]")?.dataset.handle as Drag["kind"] | undefined;
        const onArc = radius > RING - 16 && radius < RING + 16 && span(start, minutes) <= duration;
        const kind = handle ?? (onArc ? "arc" : null);
        if (!kind) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = {kind, last: minutes, moved: 0, origin: range};
        setActive(kind);
        if (handle) (event.target as HTMLElement).closest<HTMLElement>("[data-handle]")?.focus({preventScroll: true});
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const current = drag.current;
        if (!current) return;
        const {minutes} = pointerMinutes(event.clientX, event.clientY);
        if (current.kind === "arc") {
            // Accumulate the shortest step each move, so the arc can be spun round more than once.
            current.moved += ((minutes - current.last + DAY * 1.5) % DAY) - DAY / 2;
            current.last = minutes;
            const nextStart = snap(current.origin.start + current.moved);
            setRange({start: nextStart, end: wrap(nextStart + span(current.origin.start, current.origin.end))});
            return;
        }
        const value = snap(minutes);
        setRange((r) => {
            const next = {...r, [current.kind]: value};
            return next.start === next.end ? r : next;
        });
    };

    const endDrag = () => {
        drag.current = null;
        setActive(null);
    };

    const handleKeyDown = (kind: "start" | "end") => (event: KeyboardEvent<HTMLDivElement>) => {
        const big = event.shiftKey ? 60 : step;
        const delta: Record<string, number> = {ArrowRight: big, ArrowUp: big, ArrowLeft: -big, ArrowDown: -big, PageUp: 60, PageDown: -60};
        if (!(event.key in delta)) return;
        event.preventDefault();
        setRange((r) => {
            const next = {...r, [kind]: snap(r[kind] + delta[event.key])};
            return next.start === next.end ? r : next;
        });
    };

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const gap = goal === undefined ? 0 : duration - goal;
    const arcDeg = toAngle(duration);
    const startPoint = at(start, RING);
    const endPoint = at(end, RING);
    const circumference = 2 * Math.PI * 70;

    const handle = (kind: "start" | "end", point: {x: number; y: number}, icon: ReactNode, label: string) => (
        <div
            data-handle={kind}
            role="slider"
            tabIndex={0}
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={DAY - step}
            aria-valuenow={range[kind]}
            aria-valuetext={clock(range[kind])}
            onKeyDown={handleKeyDown(kind)}
            onFocus={() => !drag.current && setActive(kind)}
            onBlur={() => !drag.current && setActive(null)}
            className="absolute z-10 -ml-[15px] -mt-[15px] h-[30px] w-[30px] cursor-grab rounded-full outline-none active:cursor-grabbing"
            style={{left: `${(point.x / 240) * 100}%`, top: `${(point.y / 240) * 100}%`}}
        >
            <motion.span
                animate={{scale: active === kind ? 1.14 : 1}}
                transition={{type: "spring", stiffness: 500, damping: 24}}
                className={`grid h-full w-full place-items-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25),0_4px_12px_-2px_rgba(15,23,42,0.35)] ring-offset-2 dark:bg-stone-50 ${active === kind ? "ring-2 ring-stone-900/20 dark:ring-white/40 dark:ring-offset-stone-950" : ""}`}
            >
                {icon}
            </motion.span>
        </div>
    );

    return (
        <div className={`w-full max-w-sm ${className}`}>
            <div
                ref={dialRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className="relative mx-auto aspect-square w-full max-w-[300px] touch-none select-none"
            >
                <svg viewBox="0 0 240 240" aria-hidden="true" className="absolute inset-0 h-full w-full">
                    <circle cx={CENTER} cy={CENTER} r={RING} fill="none" strokeWidth="28" className="stroke-stone-100 dark:stroke-stone-900"/>
                    <circle cx={CENTER} cy={CENTER} r={RING + 14} fill="none" strokeWidth="0.6" className="stroke-stone-200 dark:stroke-stone-800"/>
                    <circle cx={CENTER} cy={CENTER} r={RING - 14} fill="none" strokeWidth="0.6" className="stroke-stone-200 dark:stroke-stone-800"/>
                    {sunrise !== undefined && sunset !== undefined && (
                        <circle
                            cx={CENTER}
                            cy={CENTER}
                            r="70"
                            fill="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray={`${(span(sunrise, sunset) / DAY) * circumference} ${circumference}`}
                            transform={`rotate(${toAngle(sunrise) - 90} ${CENTER} ${CENTER})`}
                            className="stroke-amber-400/70 dark:stroke-amber-300/50"
                        />
                    )}
                    {Array.from({length: 96}, (_, i) => {
                        const m = i * 15;
                        const major = i % 24 === 0;
                        const hour = i % 4 === 0;
                        const a = at(m, 64);
                        const b = at(m, major ? 57 : hour ? 60 : 62);
                        return (
                            <line
                                key={m}
                                x1={a.x}
                                y1={a.y}
                                x2={b.x}
                                y2={b.y}
                                strokeWidth={major ? 1.2 : hour ? 0.8 : 0.5}
                                className={hour ? "stroke-stone-400 dark:stroke-stone-500" : "stroke-stone-300 dark:stroke-stone-700"}
                            />
                        );
                    })}
                    {[0, 6, 12, 18].map((h) => {
                        const p = at(h * 60, 47);
                        return (
                            <text key={h} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" className="fill-stone-400 font-mono text-[9px] dark:fill-stone-500">
                                {String(h).padStart(2, "0")}
                            </text>
                        );
                    })}
                </svg>

                {/* The arc is a conic gradient cut to a ring by a radial mask, so the colour can run from
                    night to dawn along the curve, which a single SVG stroke can't do. */}
                <div
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full ${active === "arc" ? "cursor-grabbing" : "cursor-grab"}`}
                    style={{
                        background: `conic-gradient(from ${toAngle(start)}deg, #312e81 0deg, #4f46e5 ${arcDeg * 0.62}deg, #f59e0b ${arcDeg}deg, transparent ${arcDeg}deg)`,
                        WebkitMaskImage: "radial-gradient(closest-side, transparent 66.4%, #000 67%, #000 89.8%, transparent 90.4%)",
                        maskImage: "radial-gradient(closest-side, transparent 66.4%, #000 67%, #000 89.8%, transparent 90.4%)",
                    }}
                />

                {/* One dot per full hour inside the range, so the length can be counted at a glance. */}
                <svg viewBox="0 0 240 240" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
                    {Array.from({length: 24}, (_, h) => h * 60)
                        .filter((m) => span(start, m) > 12 && span(start, m) < duration - 12)
                        .map((m) => {
                            const p = at(m, RING);
                            return <circle key={m} cx={p.x} cy={p.y} r="1.3" fill="white" fillOpacity="0.55"/>;
                        })}
                </svg>

                {handle("start", startPoint, <LuMoon className="h-3.5 w-3.5 text-indigo-700" aria-hidden="true"/>, startLabel)}
                {handle("end", endPoint, <LuSun className="h-3.5 w-3.5 text-amber-600" aria-hidden="true"/>, endLabel)}

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="relative h-5 w-5 text-stone-400 dark:text-stone-500">
                        <AnimatePresence initial={false}>
                            <motion.span
                                key={active === "end" ? "sun" : "moon"}
                                initial={{opacity: 0, rotate: still ? 0 : -60, scale: 0.6}}
                                animate={{opacity: 1, rotate: 0, scale: 1}}
                                exit={{opacity: 0, rotate: still ? 0 : 60, scale: 0.6}}
                                transition={{type: "spring", stiffness: 380, damping: 26}}
                                className="absolute inset-0"
                            >
                                {active === "end" ? <LuSun className="h-5 w-5 text-amber-500"/> : <LuMoon className="h-5 w-5 text-indigo-500 dark:text-indigo-400"/>}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <p className="mt-1.5 font-semibold tabular-nums tracking-tight text-stone-900 dark:text-stone-50" aria-live="polite">
                        {hours > 0 && (
                            <>
                                <span className="text-[32px] leading-none"><Roll value={String(hours)} still={still}/></span>
                                <span className="ml-0.5 mr-1.5 text-sm font-medium text-stone-500 dark:text-stone-400">h</span>
                            </>
                        )}
                        <span className="text-[32px] leading-none"><Roll value={hours > 0 ? String(minutes).padStart(2, "0") : String(minutes)} still={still}/></span>
                        <span className="ml-0.5 text-sm font-medium text-stone-500 dark:text-stone-400">min</span>
                    </p>
                    {goal !== undefined && (
                        <p className={`mt-1 text-[11px] font-medium ${gap >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>
                            {gap >= 0 ? `Meets your ${spoken(goal)} goal` : `${spoken(-gap)} under goal`}
                        </p>
                    )}
                </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 divide-x divide-stone-200 rounded-2xl border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
                {([
                    ["start", startLabel, <LuMoon key="m" className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" aria-hidden="true"/>, "Tonight"],
                    ["end", endLabel, <LuSun key="s" className="h-3.5 w-3.5 text-amber-500" aria-hidden="true"/>, end < start ? "Tomorrow" : "Same day"],
                ] as const).map(([kind, label, icon, day]) => (
                    <div key={kind} className="px-4 py-3">
                        <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-stone-500 dark:text-stone-400">
                            {icon}
                            {label}
                        </dt>
                        <dd className="mt-1 flex items-baseline gap-2">
                            <span className="font-mono text-xl font-semibold tabular-nums text-stone-900 dark:text-stone-50">{clock(range[kind])}</span>
                            <span className="text-[11px] text-stone-400 dark:text-stone-500">{day}</span>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
