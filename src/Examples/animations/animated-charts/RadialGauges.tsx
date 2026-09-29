import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, ReactNode} from "react";
import {motion, useInView, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuRefreshCw} from "react-icons/lu";

export type GaugeIcon = ComponentType<{className?: string}>;

/** Words shown under a ring gauge for each color band. */
export interface GaugeStatusLabels {
    ok: string;
    warning: string;
    danger: string;
}

export interface GaugeItem {
    label: string;
    /** Percentage from 0 to 100. */
    value: number;
    icon: GaugeIcon;
    /** The ring turns amber at this value. Defaults to 65. */
    warningAt?: number;
    /** The ring turns red at this value. Defaults to 85. */
    dangerAt?: number;
}

export interface DialReading {
    label: string;
    value: number;
    /** Value at the right end of the dial. */
    max: number;
    /** Short unit shown after the number, such as "Mbps". */
    unit: string;
    /** Unit spelled out for screen readers, such as "megabits per second". Defaults to `unit`. */
    unitLabel?: string;
}

const polar = (cx: number, cy: number, r: number, degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    return {x: cx + r * Math.cos(radians), y: cy + r * Math.sin(radians)};
};

// Clockwise arc between two angles, measured from 3 o'clock.
const arc = (cx: number, cy: number, r: number, from: number, to: number) => {
    const start = polar(cx, cy, r, from);
    const end = polar(cx, cy, r, to);
    const large = to - from > 180 ? 1 : 0;
    return `M${start.x.toFixed(2)} ${start.y.toFixed(2)} A${r} ${r} 0 ${large} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
};

type Level = "ok" | "warning" | "danger";

const levelStyles: Record<Level, {stroke: string; text: string}> = {
    ok: {stroke: "stroke-emerald-500", text: "text-emerald-600 dark:text-emerald-400"},
    warning: {stroke: "stroke-amber-500", text: "text-amber-600 dark:text-amber-400"},
    danger: {stroke: "stroke-rose-500", text: "text-rose-600 dark:text-rose-400"},
};

const defaultStatusLabels: GaugeStatusLabels = {ok: "Healthy", warning: "Busy", danger: "Critical"};

const SpringNumber = ({value, suffix = ""}: {value: number; suffix?: string}) => {
    const reduceMotion = useReducedMotion();
    const spring = useSpring(0, {stiffness: 80, damping: 18});
    const text = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);
    useEffect(() => {
        if (reduceMotion) spring.jump(value);
        else spring.set(value);
    }, [value, spring, reduceMotion]);
    return <motion.span>{text}</motion.span>;
};

export interface GaugeProps extends GaugeItem {
    /** Set to false to hold the gauge at zero, for example until it scrolls into view. */
    play?: boolean;
    statusLabels?: GaugeStatusLabels;
    className?: string;
}

// A 270 degree ring that fills to the value and changes color past each threshold.
export const Gauge = ({label, value, icon: Icon, warningAt = 65, dangerAt = 85, play = true, statusLabels = defaultStatusLabels, className = ""}: GaugeProps) => {
    const reduceMotion = useReducedMotion();
    const statusLevel: Level = value >= dangerAt ? "danger" : value >= warningAt ? "warning" : "ok";
    const status = levelStyles[statusLevel];
    const statusLabel = statusLabels[statusLevel];
    const track = arc(60, 60, 48, 135, 405);
    const shown = play ? value : 0;
    return (
        <div role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} aria-valuetext={`${value}%, ${statusLabel}`} className={`flex flex-col items-center ${className}`}>
            <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
                    <path d={track} fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-gray-100 dark:stroke-slate-800"/>
                    <motion.path
                        d={track}
                        fill="none"
                        strokeWidth="10"
                        strokeLinecap="round"
                        className={`${status.stroke} transition-colors duration-500`}
                        initial={{pathLength: 0, opacity: 0}}
                        animate={{pathLength: shown / 100, opacity: shown > 0 ? 1 : 0}}
                        transition={reduceMotion ? {duration: 0} : {pathLength: {type: "spring", stiffness: 60, damping: 16}, opacity: {duration: 0.2}}}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className="h-4 w-4 text-gray-400 dark:text-slate-500"/>
                    <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums text-gray-900 dark:text-white sm:text-2xl">
                        <SpringNumber value={shown} suffix="%"/>
                    </p>
                </div>
            </div>
            <p className="-mt-1 text-sm font-medium sm:-mt-2 text-gray-900 dark:text-white">{label}</p>
            <p className={`text-xs font-medium transition-colors ${status.text}`}>{statusLabel}</p>
        </div>
    );
};

export interface NeedleGaugeProps extends DialReading {
    /** Set to false to hold the needle at zero, for example until it scrolls into view. */
    play?: boolean;
    className?: string;
}

// A half dial whose needle swings on a loose spring, so it overshoots a little like a real one.
export const NeedleGauge = ({label, value, max, unit, unitLabel = unit, play = true, className = ""}: NeedleGaugeProps) => {
    const reduceMotion = useReducedMotion();
    const shown = play ? value : 0;
    const angle = -90 + (shown / max) * 180;
    const bands = [
        {from: 180, to: 270, className: "stroke-emerald-400/70"},
        {from: 272, to: 324, className: "stroke-amber-400/70"},
        {from: 326, to: 360, className: "stroke-rose-400/70"},
    ];

    return (
        <div role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={`${value} ${unitLabel}`} className={`col-span-3 flex flex-col items-center md:col-span-1 ${className}`}>
            <svg viewBox="0 0 200 116" className="w-full max-w-[16rem]" aria-hidden="true">
                {bands.map((band) => (
                    <path key={band.from} d={arc(100, 100, 80, band.from, band.to)} fill="none" strokeWidth="12" className={band.className}/>
                ))}
                {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
                    const inner = polar(100, 100, 62, 180 + tick * 180);
                    const outer = polar(100, 100, 68, 180 + tick * 180);
                    return <line key={tick} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} strokeWidth="2" strokeLinecap="round" className="stroke-gray-300 dark:stroke-slate-600"/>;
                })}
                <motion.g
                    initial={{rotate: -90}}
                    animate={{rotate: angle}}
                    transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 70, damping: 7, mass: 0.8}}
                    style={{originX: "100px", originY: "100px"}}
                >
                    <path d="M97 100 L100 34 L103 100 Z" className="fill-gray-900 dark:fill-white"/>
                </motion.g>
                <circle cx="100" cy="100" r="7" className="fill-gray-900 dark:fill-white"/>
                <circle cx="100" cy="100" r="2.5" className="fill-white dark:fill-slate-900"/>
            </svg>
            <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums text-gray-900 dark:text-white">
                <SpringNumber value={shown}/> <span className="text-sm font-medium text-gray-400 dark:text-slate-500">{unit}</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
        </div>
    );
};

export interface RadialGaugesProps {
    title: string;
    /** Line under the title, such as which reading is shown. */
    subtitle?: ReactNode;
    /** Ring gauges, shown three to a row. */
    gauges: GaugeItem[];
    /** Optional half dial shown after the rings. */
    dial?: DialReading;
    /** Shows a refresh button when set. Load the next reading here and pass the new values. */
    onRefresh?: () => void;
    refreshLabel?: string;
    statusLabels?: GaugeStatusLabels;
    className?: string;
}

// Health gauges that fill in when they come into view and animate to each new reading.
export const RadialGauges = ({title, subtitle, gauges, dial, onRefresh, refreshLabel = "Refresh", statusLabels, className = ""}: RadialGaugesProps) => {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, {once: true, amount: 0.4});
    const [spins, setSpins] = useState(0);
    const titleId = useId();

    const refresh = () => {
        setSpins((current) => current + 1);
        onRefresh?.();
    };

    return (
        <section ref={ref} aria-labelledby={titleId} className={`w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 ${className}`}>
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h3 id={titleId} className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500 dark:text-slate-400">{subtitle}</p>}
                </div>
                {onRefresh && (
                    <button
                        type="button"
                        onClick={refresh}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <motion.span animate={{rotate: reduceMotion ? 0 : spins * 360}} transition={{type: "spring", stiffness: 120, damping: 16}}>
                            <LuRefreshCw className="h-4 w-4" aria-hidden="true"/>
                        </motion.span>
                        {refreshLabel}
                    </button>
                )}
            </header>
            <div className="mt-6 grid grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 md:grid-cols-[1fr_1fr_1fr_1.4fr] md:items-center">
                {gauges.map((gauge) => (
                    <Gauge key={gauge.label} {...gauge} play={inView} statusLabels={statusLabels}/>
                ))}
                {dial && <NeedleGauge {...dial} play={inView}/>}
            </div>
        </section>
    );
};
