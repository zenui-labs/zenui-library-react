import {useEffect, useId, useRef, useState} from "react";
import type {ChangeEvent} from "react";
import {animate, motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

interface RingProps {
    value: number;
    size: number;
    stroke: number;
    label: string;
    detail: string;
    play: boolean;
    // Colors along the ring from 0% to 100%, for rings that warn as they fill up.
    colors: [string, string, string];
    trackClassName?: string;
}

// One motion value drives the arc and the number, so they always agree.
const Ring = ({value, size, stroke, label, detail, play, colors, trackClassName = ""}: RingProps) => {
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
                <span className="block text-xs text-gray-500 dark:text-slate-400">{detail}</span>
            </figcaption>
        </figure>
    );
};

const calm: [string, string, string] = ["#6366f1", "#6366f1", "#8b5cf6"];
const growth: [string, string, string] = ["#0ea5e9", "#10b981", "#10b981"];
const warning: [string, string, string] = ["#10b981", "#f59e0b", "#ef4444"];

// Rings fill when they scroll into view. Replay remounts them through their keys, so they start from zero.
// The storage ring follows the slider and turns amber, then red, as it fills.
const ProgressRings = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {once: true, amount: 0.4});
    const [storage, setStorage] = useState(72);
    const [replayKey, setReplayKey] = useState(0);
    const sliderId = useId();

    const used = ((storage / 100) * 200).toFixed(0);

    return (
        <div
            ref={ref}
            className="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/5 sm:p-8 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40"
        >
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Workspace health</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Northwind design team, September</p>
                </div>
                <button
                    type="button"
                    onClick={() => setReplayKey((value) => value + 1)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                    <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                    Replay
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-[auto_1fr]">
                <div className="flex flex-col items-center">
                    <Ring
                        key={`storage-${replayKey}`}
                        value={storage}
                        size={176}
                        stroke={14}
                        label="Storage"
                        detail={`${used} GB of 200 GB`}
                        play={inView}
                        colors={warning}
                    />
                    <label htmlFor={sliderId} className="sr-only">Storage used</label>
                    <input
                        id={sliderId}
                        type="range"
                        min={0}
                        max={100}
                        value={storage}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setStorage(Number(event.target.value))}
                        className="mt-4 w-44 accent-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:accent-indigo-400 dark:focus-visible:ring-offset-slate-950"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                    <Ring key={`goal-${replayKey}`} value={88} size={104} stroke={9} label="Weekly goal" detail="22 of 25 tasks" play={inView} colors={growth}/>
                    <Ring key={`reviews-${replayKey}`} value={64} size={104} stroke={9} label="Reviews done" detail="16 of 25 files" play={inView} colors={calm}/>
                    <Ring key={`seats-${replayKey}`} value={45} size={104} stroke={9} label="Seats used" detail="9 of 20 seats" play={inView} colors={calm}/>
                </div>
            </div>
        </div>
    );
};

export default ProgressRings;
