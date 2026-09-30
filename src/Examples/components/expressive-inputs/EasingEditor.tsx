import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {animate, motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import type {AnimationPlaybackControls} from "framer-motion";
import {LuCheck, LuCopy} from "react-icons/lu";

/** The four numbers of a CSS `cubic-bezier(x1, y1, x2, y2)`. */
export type Bezier = [number, number, number, number];

export interface EasingPreset {
    name: string;
    value: Bezier;
}

export interface EasingEditorProps {
    defaultValue?: Bezier;
    presets?: EasingPreset[];
    /** Length of one preview run in milliseconds. */
    duration?: number;
    onChange?: (value: Bezier) => void;
    className?: string;
}

const defaultPresets: EasingPreset[] = [
    {name: "ease", value: [0.25, 0.1, 0.25, 1]},
    {name: "ease-in-out", value: [0.42, 0, 0.58, 1]},
    {name: "back-out", value: [0.34, 1.56, 0.64, 1]},
    {name: "snappy", value: [0.16, 1, 0.3, 1]},
];

// Plot space: 0–1 on both axes inside a 160 unit box, with room above and below for overshoot.
const W = 200;
const H = 304;
const BOX = 160;
const TOP = 1.35;
const BOTTOM = -0.35;
const X = (v: number) => 20 + v * BOX;
const Y = (v: number) => 16 + (TOP - v) * BOX;
const STROBES = 12;

const coord = (a: number, b: number, t: number) => 3 * a * (1 - t) * (1 - t) * t + 3 * b * (1 - t) * t * t + t * t * t;

// CSS easing maps time (x) to progress (y). x(t) always rises because x1 and x2 stay in 0–1,
// so bisection finds the curve parameter for a given time reliably.
const ease = ([x1, y1, x2, y2]: Bezier, time: number) => {
    if (time <= 0) return 0;
    if (time >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = time;
    for (let i = 0; i < 28; i++) {
        const x = coord(x1, x2, t);
        if (Math.abs(x - time) < 1e-5) break;
        if (x < time) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
    }
    return coord(y1, y2, t);
};

const fmt = (v: number) => String(Number(v.toFixed(2)));
const round = (v: number) => Math.round(v * 100) / 100;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const lane = (y: number) => `${8 + clamp(y, -0.1, 1.1) * 84}%`;

/**
 * A cubic-bezier editor. Drag the two handles (they may leave the box to overshoot), pick a preset, or
 * nudge a focused handle with the arrow keys. A ball runs the easing on a loop while a playhead rides the curve.
 */
export const EasingEditor = ({defaultValue = [0.34, 1.56, 0.64, 1], presets = defaultPresets, duration = 900, onChange, className = ""}: EasingEditorProps) => {
    const [value, setValue] = useState<Bezier>(defaultValue);
    const [dragging, setDragging] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);
    const plotRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const inView = useInView(rootRef);
    const still = useReducedMotion() ?? false;
    const tween = useRef<AnimationPlaybackControls | null>(null);
    const valueRef = useRef(value);
    valueRef.current = value;

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    const [x1, y1, x2, y2] = value;
    useEffect(() => {
        onChangeRef.current?.([x1, y1, x2, y2]);
    }, [x1, y1, x2, y2]);

    useEffect(() => {
        if (!copied) return;
        const id = window.setTimeout(() => setCopied(false), 1400);
        return () => window.clearTimeout(id);
    }, [copied]);
    useEffect(() => () => tween.current?.stop(), []);

    // Per-frame values live in motion values, so the loop never re-renders React.
    const time = useMotionValue(1);
    const progress = useMotionValue(1);
    const headX = useTransform(time, X);
    const headY = useTransform(progress, Y);
    const ballLeft = useTransform(progress, lane);
    const scale = useTransform(progress, (p) => 0.35 + 0.65 * p);

    useEffect(() => {
        if (!inView || still) {
            time.set(1);
            progress.set(ease(valueRef.current, 1));
            return;
        }
        let frame = 0;
        const began = performance.now();
        const cycle = duration + 700;
        const tick = (now: number) => {
            const phase = (now - began) % cycle;
            const t = clamp((phase - 250) / duration, 0, 1);
            time.set(t);
            progress.set(ease(valueRef.current, t));
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, still, duration, time, progress]);

    const commit = (next: Bezier) => {
        tween.current?.stop();
        setValue(next.map(round) as Bezier);
    };

    const choose = (target: Bezier) => {
        tween.current?.stop();
        if (still) return setValue(target);
        const from = valueRef.current;
        tween.current = animate(0, 1, {
            type: "spring",
            stiffness: 260,
            damping: 26,
            onUpdate: (k) => setValue(from.map((v, i) => v + (target[i] - v) * k) as Bezier),
        });
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        const handle = (event.target as HTMLElement).closest<HTMLElement>("[data-handle]");
        if (!handle || event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        handle.focus({preventScroll: true});
        setDragging(Number(handle.dataset.handle));
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (dragging === null) return;
        const rect = plotRef.current.getBoundingClientRect();
        const vx = clamp(((((event.clientX - rect.left) / rect.width) * W - 20) / BOX), 0, 1);
        const vy = clamp(TOP - (((event.clientY - rect.top) / rect.height) * H - 16) / BOX, BOTTOM, TOP);
        const next = [...valueRef.current] as Bezier;
        next[dragging * 2] = vx;
        next[dragging * 2 + 1] = vy;
        commit(next);
    };

    const handleKey = (index: number) => (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 0.1 : 0.01;
        const moves: Record<string, [number, number]> = {ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step]};
        if (!(event.key in moves)) return;
        event.preventDefault();
        const [dx, dy] = moves[event.key];
        const next = [...value] as Bezier;
        next[index * 2] = clamp(next[index * 2] + dx, 0, 1);
        next[index * 2 + 1] = clamp(next[index * 2 + 1] + dy, BOTTOM, TOP);
        commit(next);
    };

    const css = `cubic-bezier(${value.map(fmt).join(", ")})`;
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(css);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    const handles = [
        {x: x1, y: y1, from: {x: 0, y: 0}},
        {x: x2, y: y2, from: {x: 1, y: 1}},
    ];
    const curve = `M ${X(0)} ${Y(0)} C ${X(x1)} ${Y(y1)} ${X(x2)} ${Y(y2)} ${X(1)} ${Y(1)}`;
    const grid = [0.25, 0.5, 0.75];
    const active = presets.find((preset) => preset.value.every((v, i) => Math.abs(v - value[i]) < 0.005));

    return (
        <div
            ref={rootRef}
            className={`grid w-full max-w-2xl gap-6 rounded-[28px] border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-[minmax(0,220px)_1fr] sm:p-6 ${className}`}
        >
            <div
                ref={plotRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={() => setDragging(null)}
                onPointerCancel={() => setDragging(null)}
                className="relative mx-auto w-full max-w-[220px] touch-none select-none"
                style={{aspectRatio: `${W} / ${H}`}}
            >
                <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
                    {/* Overshoot zones above and below the unit box. */}
                    <rect x={X(0)} y={Y(TOP)} width={BOX} height={Y(1) - Y(TOP)} className="fill-stone-100/70 dark:fill-stone-900/60"/>
                    <rect x={X(0)} y={Y(0)} width={BOX} height={Y(BOTTOM) - Y(0)} className="fill-stone-100/70 dark:fill-stone-900/60"/>
                    <g strokeWidth="0.5" className="stroke-stone-200 dark:stroke-stone-800">
                        {grid.map((g) => (
                            <g key={g}>
                                <line x1={X(g)} y1={Y(0)} x2={X(g)} y2={Y(1)}/>
                                <line x1={X(0)} y1={Y(g)} x2={X(1)} y2={Y(g)}/>
                            </g>
                        ))}
                    </g>
                    <rect x={X(0)} y={Y(1)} width={BOX} height={BOX} fill="none" strokeWidth="0.75" className="stroke-stone-300 dark:stroke-stone-700"/>
                    <line x1={X(0)} y1={Y(0)} x2={X(1)} y2={Y(1)} strokeWidth="0.75" strokeDasharray="2 3" className="stroke-stone-300 dark:stroke-stone-700"/>
                    <g className="fill-stone-400 font-mono text-[8px] dark:fill-stone-500">
                        <text x={X(0) - 5} y={Y(0)} textAnchor="end" dominantBaseline="central">0</text>
                        <text x={X(0) - 5} y={Y(1)} textAnchor="end" dominantBaseline="central">1</text>
                        <text x={X(1)} y={Y(BOTTOM) + 10} textAnchor="end">time</text>
                    </g>

                    {/* Playhead: where the preview is right now, projected onto both axes. */}
                    {!still && (
                        <g className="stroke-orange-500/50">
                            <motion.line x1={headX} x2={headX} y1={Y(0)} y2={headY} strokeWidth="0.75" strokeDasharray="1.5 2"/>
                            <motion.line x1={X(0)} x2={headX} y1={headY} y2={headY} strokeWidth="0.75" strokeDasharray="1.5 2"/>
                        </g>
                    )}

                    <g strokeWidth="1" className="stroke-orange-500">
                        {handles.map((h, i) => (
                            <line key={i} x1={X(h.from.x)} y1={Y(h.from.y)} x2={X(h.x)} y2={Y(h.y)}/>
                        ))}
                    </g>
                    <path d={curve} fill="none" strokeWidth="2.5" strokeLinecap="round" className="stroke-stone-900 dark:stroke-stone-100"/>
                    <circle cx={X(0)} cy={Y(0)} r="3" className="fill-stone-900 dark:fill-stone-100"/>
                    <circle cx={X(1)} cy={Y(1)} r="3" className="fill-stone-900 dark:fill-stone-100"/>
                    {!still && <motion.circle cx={headX} cy={headY} r="4" className="fill-orange-500 stroke-white dark:stroke-stone-950" strokeWidth="1.5"/>}
                </svg>

                {handles.map((h, i) => (
                    <div
                        key={i}
                        data-handle={i}
                        role="slider"
                        tabIndex={0}
                        aria-label={`Control point ${i + 1}`}
                        aria-valuemin={BOTTOM}
                        aria-valuemax={TOP}
                        aria-valuenow={round(h.y)}
                        aria-valuetext={`x ${fmt(h.x)}, y ${fmt(h.y)}`}
                        onKeyDown={handleKey(i)}
                        className="group absolute -ml-3.5 -mt-3.5 grid h-7 w-7 cursor-grab place-items-center rounded-full outline-none active:cursor-grabbing"
                        style={{left: `${(X(h.x) / W) * 100}%`, top: `${(Y(h.y) / H) * 100}%`}}
                    >
                        <span
                            className={`h-3.5 w-3.5 rounded-full border-2 border-orange-500 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform group-focus-visible:ring-4 group-focus-visible:ring-orange-500/25 dark:bg-stone-950 ${dragging === i ? "scale-125" : "group-hover:scale-110"}`}
                        />
                    </div>
                ))}
            </div>

            <div className="flex min-w-0 flex-col">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-stone-500 dark:text-stone-400">
                    Preview <span className="ml-1 font-mono normal-case tracking-normal text-stone-400 dark:text-stone-500">{duration} ms</span>
                </p>
                <div className="mt-3 flex items-center gap-4">
                    <div className="relative h-14 min-w-0 flex-1 rounded-2xl bg-stone-100 dark:bg-stone-900">
                        <span className="absolute inset-x-[8%] top-1/2 h-px bg-stone-300 dark:bg-stone-700"/>
                        {/* Ghost frames at equal time steps: bunched dots are slow, spread dots are fast. */}
                        {Array.from({length: STROBES + 1}, (_, i) => (
                            <span
                                key={i}
                                aria-hidden="true"
                                className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-400 dark:bg-stone-500"
                                style={{left: lane(ease(value, i / STROBES)), opacity: 0.25 + (0.55 * i) / STROBES}}
                            />
                        ))}
                        <motion.span
                            aria-hidden="true"
                            className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_2px_6px_rgba(234,88,12,0.45)]"
                            style={{left: ballLeft}}
                        />
                    </div>
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-stone-100 dark:bg-stone-900">
                        <motion.span aria-hidden="true" className="h-8 w-8 rounded-lg bg-stone-900 dark:bg-stone-100" style={{scale}}/>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5" role="group" aria-label="Presets">
                    {presets.map((preset) => {
                        const on = preset === active;
                        return (
                            <button
                                key={preset.name}
                                type="button"
                                aria-pressed={on}
                                onClick={() => choose(preset.value)}
                                className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 ${on ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900" : "border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900 dark:border-stone-800 dark:text-stone-400 dark:hover:border-stone-600 dark:hover:text-stone-100"}`}
                            >
                                {preset.name}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 py-1.5 pl-3 pr-1.5 dark:border-stone-800 dark:bg-stone-900 max-sm:mt-5 sm:mt-6">
                    <code className="min-w-0 flex-1 truncate font-mono text-[13px] tabular-nums text-stone-800 dark:text-stone-200">{css}</code>
                    <button
                        type="button"
                        onClick={copy}
                        aria-label={copied ? "Copied" : "Copy cubic-bezier"}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-stone-500 transition-colors hover:bg-white hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
                    >
                        {copied ? <LuCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400"/> : <LuCopy className="h-4 w-4"/>}
                    </button>
                </div>
            </div>
        </div>
    );
};
