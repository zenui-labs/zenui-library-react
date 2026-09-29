import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuTarget} from "react-icons/lu";

export interface GoalSegment {
    id: string;
    /** Text on the segment switch, for example a region or a team. */
    label: string;
    achieved: number;
    target: number;
}

export interface GoalRingProps {
    /** One goal per segment. The switch is shown when there is more than one. */
    segments: GoalSegment[];
    /** Length of the goal period in days. */
    daysTotal: number;
    /** Days of the period that have passed. Drives the pace marker and the forecast. */
    daysPassed: number;
    title?: string;
    /** Name of the period in the "days left" line. */
    periodName?: string;
    /** Accessible name of the segment switch. */
    segmentsLabel?: string;
    achievedLabel?: string;
    remainingLabel?: string;
    icon?: ComponentType<{className?: string}>;
    /** Selected segment id. Pass it with `onChange` to control the ring. */
    value?: string;
    defaultValue?: string;
    onChange?: (id: string) => void;
    formatValue?: (value: number) => string;
    /** Start and end colors of the ring gradient. */
    colors?: [string, string];
    className?: string;
}

const SIZE = 148;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;

const money = (value: number) =>
    value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M` : `$${Math.round(value / 1000)}k`;

/** A ring that fills toward a target, with a marker for where steady pace would be today and a forecast badge. */
export const GoalRing = ({
    segments,
    daysTotal,
    daysPassed,
    title = "Q3 sales goal",
    periodName = "quarter",
    segmentsLabel = "Region",
    achievedLabel = "Closed won",
    remainingLabel = "Still to close",
    icon: Icon = LuTarget,
    value: valueProp,
    defaultValue,
    onChange,
    formatValue = money,
    colors = ["#6366f1", "#22d3ee"],
    className = "",
}: GoalRingProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue ?? segments[0]?.id);
    const selected = valueProp ?? innerValue;
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const goal = segments.find((segment) => segment.id === selected) ?? segments[0];
    const progress = goal.achieved / goal.target;
    const projected = goal.achieved / (daysPassed / daysTotal) / goal.target;
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

    const select = (next: string) => {
        if (valueProp === undefined) setInnerValue(next);
        onChange?.(next);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: segments.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = (keys[event.key] + segments.length) % segments.length;
        select(segments[next].id);
        buttons.current[next]?.focus();
    };

    return (
        <div className={`w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        <Icon className="size-4" aria-hidden/>
                        {title}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                        {daysTotal - daysPassed} days left in the {periodName}
                    </p>
                </div>
                {segments.length > 1 && (
                    <div role="radiogroup" aria-label={segmentsLabel} className="inline-flex rounded-lg bg-zinc-100 p-0.5 dark:bg-white/[0.05]">
                        {segments.map((option, index) => {
                            const checked = option.id === goal.id;
                            return (
                                <button
                                    key={option.id}
                                    ref={(node) => {
                                        buttons.current[index] = node;
                                    }}
                                    type="button"
                                    role="radio"
                                    aria-checked={checked}
                                    tabIndex={checked ? 0 : -1}
                                    onClick={() => select(option.id)}
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
                )}
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
                                <stop offset="0%" stopColor={colors[0]}/>
                                <stop offset="100%" stopColor={colors[1]}/>
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
                            cx={SIZE / 2 + RADIUS * Math.cos((daysPassed / daysTotal) * Math.PI * 2)}
                            cy={SIZE / 2 + RADIUS * Math.sin((daysPassed / daysTotal) * Math.PI * 2)}
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
                        <dt className="text-xs text-zinc-500 dark:text-zinc-400">{achievedLabel}</dt>
                        <dd className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">
                            {formatValue(goal.achieved)} <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">of {formatValue(goal.target)}</span>
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs text-zinc-500 dark:text-zinc-400">{remainingLabel}</dt>
                        <dd className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">{formatValue(Math.max(0, goal.target - goal.achieved))}</dd>
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
