import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuTarget} from "react-icons/lu";

type Region = "all" | "emea" | "amer" | "apac";

interface Goal {
    achieved: number;
    target: number;
}

const goals: Record<Region, Goal> = {
    all: {achieved: 951_000, target: 1_200_000},
    emea: {achieved: 368_000, target: 400_000},
    amer: {achieved: 462_000, target: 520_000},
    apac: {achieved: 121_000, target: 280_000},
};

const regions: {value: Region; label: string}[] = [
    {value: "all", label: "All"},
    {value: "emea", label: "EMEA"},
    {value: "amer", label: "Americas"},
    {value: "apac", label: "APAC"},
];

// The quarter runs Jul 1 to Sep 30. 79 of 92 days have passed.
const DAYS_TOTAL = 92;
const DAYS_PASSED = 79;
const SIZE = 148;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;

const money = (value: number) =>
    value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M` : `$${Math.round(value / 1000)}k`;

const GoalRing = () => {
    const [region, setRegion] = useState<Region>("all");
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const goal = goals[region];
    const progress = goal.achieved / goal.target;
    const projected = goal.achieved / (DAYS_PASSED / DAYS_TOTAL) / goal.target;
    const onTrack = projected >= 1;

    const value = useMotionValue(0);
    const percent = useTransform(value, (latest) => `${Math.round(latest * 100)}%`);

    useEffect(() => {
        if (reduceMotion) {
            value.set(progress);
            return;
        }
        const controls = animate(value, progress, {duration: 0.9, ease: [0.16, 1, 0.3, 1]});
        return () => controls.stop();
    }, [progress, reduceMotion, value]);

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: regions.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = (keys[event.key] + regions.length) % regions.length;
        setRegion(regions[next].value);
        buttons.current[next]?.focus();
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        <LuTarget className="size-4" aria-hidden/>
                        Q3 sales goal
                    </p>
                    <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{DAYS_TOTAL - DAYS_PASSED} days left in the quarter</p>
                </div>
                <div role="radiogroup" aria-label="Region" className="inline-flex rounded-lg bg-zinc-100 p-0.5 dark:bg-white/[0.05]">
                    {regions.map((option, index) => {
                        const checked = option.value === region;
                        return (
                            <button
                                key={option.value}
                                ref={(node) => {
                                    buttons.current[index] = node;
                                }}
                                type="button"
                                role="radio"
                                aria-checked={checked}
                                tabIndex={checked ? 0 : -1}
                                onClick={() => setRegion(option.value)}
                                onKeyDown={(event) => onKeyDown(event, index)}
                                className={`relative h-7 rounded-md px-2.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                                    checked ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                                }`}
                            >
                                {checked && (
                                    <motion.span
                                        layoutId={`${id}-region`}
                                        className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-700 dark:ring-white/10"
                                        transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 500, damping: 38}}
                                    />
                                )}
                                <span className="relative">{option.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                <div
                    className="relative shrink-0"
                    style={{width: SIZE, height: SIZE}}
                    role="img"
                    aria-label={`${Math.round(progress * 100)}% of the goal reached`}
                >
                    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full -rotate-90">
                        <defs>
                            <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#6366f1"/>
                                <stop offset="100%" stopColor="#22d3ee"/>
                            </linearGradient>
                        </defs>
                        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-zinc-100 dark:stroke-white/[0.06]"/>
                        <motion.circle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            fill="none"
                            stroke={`url(#${id}-gradient)`}
                            strokeWidth={STROKE}
                            strokeLinecap="round"
                            style={{pathLength: value}}
                        />
                        {/* A tick where the goal should be today at a steady pace. */}
                        <circle
                            cx={SIZE / 2 + RADIUS * Math.cos((DAYS_PASSED / DAYS_TOTAL) * Math.PI * 2)}
                            cy={SIZE / 2 + RADIUS * Math.sin((DAYS_PASSED / DAYS_TOTAL) * Math.PI * 2)}
                            r={3}
                            className="fill-white stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-500"
                            strokeWidth={2}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden>
                        <motion.span className="text-3xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white">{percent}</motion.span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">of goal</span>
                    </div>
                </div>

                <dl className="grid w-full grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-1">
                    <div>
                        <dt className="text-xs text-zinc-500 dark:text-zinc-400">Closed won</dt>
                        <dd className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">
                            {money(goal.achieved)} <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">of {money(goal.target)}</span>
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs text-zinc-500 dark:text-zinc-400">Still to close</dt>
                        <dd className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">{money(Math.max(0, goal.target - goal.achieved))}</dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <dt className="sr-only">Forecast</dt>
                        <dd
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                                onTrack
                                    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20"
                                    : "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20"
                            }`}
                        >
                            <span className={`size-1.5 rounded-full ${onTrack ? "bg-emerald-500" : "bg-amber-500"}`} aria-hidden/>
                            {onTrack ? "On track" : "Behind pace"}, forecast {Math.round(projected * 100)}%
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default GoalRing;
