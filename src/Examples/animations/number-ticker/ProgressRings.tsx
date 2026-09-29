import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {animate, motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

/** Ring colors at 0%, 60% and 90% full. Use a warning ramp for quotas that should look alarming when full. */
export type RingColors = [string, string, string];

const calm: RingColors = ["#6366f1", "#6366f1", "#8b5cf6"];

export interface ProgressRingProps {
    /** Percentage from 0 to 100. */
    value: number;
    label: string;
    /** Small print under the label, such as "22 of 25 tasks". */
    detail?: string;
    /** Diameter in pixels. */
    size?: number;
    /** Ring thickness in pixels. */
    stroke?: number;
    /** Set to false to hold the ring at zero, for example until it scrolls into view. */
    play?: boolean;
    colors?: RingColors;
    trackClassName?: string;
}

// One motion value drives the arc and the number, so they always agree.
export const ProgressRing = ({
    value,
    label,
    detail,
    size = 104,
    stroke = 9,
    play = true,
    colors = calm,
    trackClassName = "",
}: ProgressRingProps) => {
    const reduceMotion = useReducedMotion();
    const progress = useMotionValue(0);
    const percent = useTransform(progress, (latest) => `${Math.round(latest * 100)}%`);
    const color = useTransform(progress, [0, 0.6, 0.9], colors);
    // A round cap at zero length still draws a dot, so hide the arc until it has started.
    const opacity = useTransform(progress, [0, 0.01], [0, 1]);
    const radius = (size - stroke) / 2;

    useEffect(() => {
        if (!play) return;
        if (reduceMotion) {
            progress.set(value / 100);
            return;
        }
        const controls = animate(progress, value / 100, {type: "spring", stiffness: 60, damping: 18, mass: 1});
        return () => controls.stop();
    }, [play, value, reduceMotion, progress]);

    return (
        <figure className="flex flex-col items-center text-center">
            <div className="relative" style={{width: size, height: size}}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} className={`stroke-gray-100 dark:stroke-slate-800 ${trackClassName}`}/>
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        style={{pathLength: progress, stroke: color, opacity}}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span className="text-2xl font-semibold tabular-nums tracking-tight text-gray-900 dark:text-white" aria-hidden="true">
                        {percent}
                    </motion.span>
                </div>
            </div>
            <figcaption className="mt-3">
                <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                    <span className="sr-only">: {value}%</span>
                </span>
                {detail && <span className="block text-xs text-gray-500 dark:text-slate-400">{detail}</span>}
            </figcaption>
        </figure>
    );
};

export interface RingItem {
    label: string;
    /** Percentage from 0 to 100. */
    value: number;
    detail?: string;
    colors?: RingColors;
}

export interface ProgressRingsProps {
    /** The large ring on the left. */
    primary: RingItem;
    /** The smaller rings in the grid. */
    items: RingItem[];
    title?: string;
    description?: string;
    /** Content under the large ring, such as a slider that sets its value. */
    primaryFooter?: ReactNode;
    replayLabel?: string;
    className?: string;
}

// Rings fill when they scroll into view. Replay remounts them through their keys, so they start from zero.
export const ProgressRings = ({
    primary,
    items,
    title = "Workspace health",
    description,
    primaryFooter,
    replayLabel = "Replay",
    className = "",
}: ProgressRingsProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {once: true, amount: 0.4});
    const [replayKey, setReplayKey] = useState(0);

    return (
        <div
            ref={ref}
            className={`w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/5 sm:p-8 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40 ${className}`}
        >
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                    {description && <p className="text-sm text-gray-500 dark:text-slate-400">{description}</p>}
                </div>
                <button
                    type="button"
                    onClick={() => setReplayKey((value) => value + 1)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                    <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                    {replayLabel}
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-[auto_1fr]">
                <div className="flex flex-col items-center">
                    <ProgressRing
                        key={`primary-${replayKey}`}
                        value={primary.value}
                        size={176}
                        stroke={14}
                        label={primary.label}
                        detail={primary.detail}
                        play={inView}
                        colors={primary.colors}
                    />
                    {primaryFooter}
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                    {items.map((item) => (
                        <ProgressRing
                            key={`${item.label}-${replayKey}`}
                            value={item.value}
                            label={item.label}
                            detail={item.detail}
                            play={inView}
                            colors={item.colors}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
