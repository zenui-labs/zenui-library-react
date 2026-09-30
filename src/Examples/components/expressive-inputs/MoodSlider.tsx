import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity} from "framer-motion";

/** A named range on the scale. */
export interface MoodLevel {
    /** Lowest value (0–100) that shows this label. */
    from: number;
    label: string;
}

export interface MoodSliderProps {
    question: string;
    /** A quiet line under the question, e.g. the order or visit the feedback is about. */
    context?: string;
    /** Controlled value from 0 to 100. */
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** Labels from the lowest range to the highest. */
    levels?: MoodLevel[];
    className?: string;
}

const defaultLevels: MoodLevel[] = [
    {from: 0, label: "Frustrated"},
    {from: 20, label: "Disappointed"},
    {from: 40, label: "Okay"},
    {from: 60, label: "Pleased"},
    {from: 80, label: "Delighted"},
];

type Stop = [number, number];

// Piecewise-linear keyframes. Each facial feature is its own little timeline over the 0–1 mood value,
// so the face passes through anger, sadness and calm on its way to joy instead of cross-fading two faces.
const track = (t: number, stops: Stop[]) => {
    if (t <= stops[0][0]) return stops[0][1];
    for (let i = 1; i < stops.length; i++) {
        const [x1, y1] = stops[i];
        if (t <= x1) {
            const [x0, y0] = stops[i - 1];
            return y0 + ((y1 - y0) * (t - x0)) / (x1 - x0);
        }
    }
    return stops[stops.length - 1][1];
};

const EYE_TOP: Stop[] = [[0, 2.2], [0.3, 4.6], [0.55, 5], [0.8, 5], [1, 5.2]];
const EYE_BOTTOM: Stop[] = [[0, 1.6], [0.3, 4.4], [0.55, 4.6], [0.75, 2], [1, -2.6]];
// Positive lowers the inner end of the brow (anger), negative raises it (worry).
const BROW_INNER: Stop[] = [[0, 7], [0.28, -4], [0.5, 0], [1, 0]];
const BROW_LIFT: Stop[] = [[0, 0], [0.5, 0], [1, 4]];
const BROW_ARCH: Stop[] = [[0, 0], [0.3, 1], [1, 3]];
const MOUTH_WIDTH: Stop[] = [[0, 11], [0.5, 12], [1, 17]];
const MOUTH_CORNER: Stop[] = [[0, 3], [0.5, 0], [1, -3]];
const MOUTH_SMILE: Stop[] = [[0, -7], [0.3, -4], [0.5, 1], [0.75, 6], [1, 9]];
const MOUTH_OPEN: Stop[] = [[0, 0], [0.7, 0], [1, 9]];
const CHEEK_ALPHA: Stop[] = [[0, 0.42], [0.35, 0.06], [0.5, 0], [0.7, 0.18], [1, 0.5]];

type RGB = [number, number, number];
const rgb = (hex: string): RGB => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB;
const mix = (t: number, stops: [number, RGB][]) => {
    let i = 1;
    while (i < stops.length - 1 && t > stops[i][0]) i++;
    const [x0, c0] = stops[i - 1];
    const [x1, c1] = stops[i];
    const k = Math.min(1, Math.max(0, (t - x0) / (x1 - x0)));
    const [r, g, b] = c0.map((c, j) => Math.round(c + (c1[j] - c) * k));
    return `rgb(${r} ${g} ${b})`;
};

const TRACK_COLORS: [number, RGB][] = [[0, rgb("#e5484d")], [0.5, rgb("#e8a33d")], [1, rgb("#2f9e6e")]];
const SKIN_COLORS: [number, RGB][] = [[0, rgb("#f4c9bd")], [0.5, rgb("#f3dfb8")], [1, rgb("#f9d27a")]];
const CHEEK_COLORS: [number, RGB][] = [[0, rgb("#e0453a")], [0.5, rgb("#f07a7a")], [1, rgb("#f26b8a")]];

const eyePath = (cx: number, t: number) => {
    const top = track(t, EYE_TOP);
    const bottom = track(t, EYE_BOTTOM);
    const cy = 52;
    // A quadratic's apex sits halfway to its control point, hence the doubling.
    return `M ${cx - 7} ${cy} Q ${cx} ${cy - 2 * top} ${cx + 7} ${cy} Q ${cx} ${cy + 2 * bottom} ${cx - 7} ${cy} Z`;
};

const browPath = (outerX: number, innerX: number, t: number) => {
    const base = 37 - track(t, BROW_LIFT);
    const innerY = base + track(t, BROW_INNER);
    const arch = track(t, BROW_ARCH);
    return `M ${outerX} ${base + 1} Q ${(outerX + innerX) / 2} ${(base + innerY) / 2 - arch * 2} ${innerX} ${innerY}`;
};

const mouthGeometry = (t: number) => {
    const cy = 82;
    const half = track(t, MOUTH_WIDTH);
    const corner = cy + track(t, MOUTH_CORNER);
    const upper = cy + track(t, MOUTH_SMILE);
    const lower = upper + track(t, MOUTH_OPEN);
    return {half, corner, upper, lower};
};

const mouthPath = (t: number) => {
    const {half, corner, upper, lower} = mouthGeometry(t);
    return `M ${60 - half} ${corner} Q 60 ${2 * upper - corner} ${60 + half} ${corner} Q 60 ${2 * lower - corner} ${60 - half} ${corner} Z`;
};

const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(v)));

/**
 * A 0–100 feedback slider with an illustrated face. Mouth, brows, eyelids and cheeks each follow their own
 * keyframes, so the face morphs continuously. It trails the thumb on a spring and leans with drag speed.
 */
export const MoodSlider = ({question, context, value, defaultValue = 50, onChange, levels = defaultLevels, className = ""}: MoodSliderProps) => {
    const uid = useId().replace(/:/g, "");
    const reduceMotion = useReducedMotion() ?? false;
    const [inner, setInner] = useState(defaultValue);
    const current = clamp(value ?? inner);
    const [dragging, setDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    const levelIndex = levels.reduce((found, level, index) => (current >= level.from ? index : found), 0);
    const label = levels[levelIndex]?.label ?? "";
    const lastIndex = useRef(levelIndex);
    const direction = levelIndex >= lastIndex.current ? 1 : -1;
    useEffect(() => {
        lastIndex.current = levelIndex;
    }, [levelIndex]);

    const raw = useMotionValue(current);
    useEffect(() => raw.set(current), [raw, current]);
    const spring = useSpring(raw, {stiffness: 240, damping: 22, mass: 0.7});
    const source = reduceMotion ? raw : spring;
    const t = useTransform(source, (v) => v / 100);

    const leftEye = useTransform(t, (v) => eyePath(42, v));
    const rightEye = useTransform(t, (v) => eyePath(78, v));
    const leftBrow = useTransform(t, (v) => browPath(31, 50, v));
    const rightBrow = useTransform(t, (v) => browPath(89, 70, v));
    const mouth = useTransform(t, mouthPath);
    const tongueY = useTransform(t, (v) => mouthGeometry(v).lower + 4);
    const cheekFill = useTransform(t, (v) => mix(v, CHEEK_COLORS));
    const cheekOpacity = useTransform(t, (v) => track(v, CHEEK_ALPHA));
    const skin = useTransform(t, (v) => mix(v, SKIN_COLORS));
    // The features drift toward the thumb, as if the face glances at it.
    const gaze = useTransform(t, (v) => (v - 0.5) * 5);
    // Head lean comes from how fast the value is changing, then settles on its own spring.
    const velocity = useVelocity(spring);
    const leanTarget = useTransform(velocity, [-260, 260], [-9, 9], {clamp: true});
    const lean = useSpring(leanTarget, {stiffness: 180, damping: 14});

    const color = mix(current / 100, TRACK_COLORS);

    const commit = (next: number) => {
        const v = clamp(next);
        if (v === current) return;
        if (value === undefined) setInner(v);
        onChange?.(v);
    };

    const fromPointer = (clientX: number) => {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return;
        commit(((clientX - rect.left) / rect.width) * 100);
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        thumbRef.current?.focus({preventScroll: true});
        setDragging(true);
        fromPointer(event.clientX);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 10 : 1;
        const keys: Record<string, number> = {
            ArrowRight: current + step,
            ArrowUp: current + step,
            ArrowLeft: current - step,
            ArrowDown: current - step,
            PageUp: current + 10,
            PageDown: current - 10,
            Home: 0,
            End: 100,
        };
        if (!(event.key in keys)) return;
        event.preventDefault();
        commit(keys[event.key]);
    };

    return (
        <div className={`w-full max-w-sm rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(28,25,23,0.18)] dark:border-stone-800 dark:bg-stone-900 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)] sm:p-7 ${className}`}>
            <p id={`${uid}-q`} className="text-[15px] font-medium tracking-tight text-stone-900 dark:text-stone-100">{question}</p>
            {context && <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{context}</p>}

            <div className="mt-6 flex flex-col items-center">
                <motion.svg
                    viewBox="0 0 120 134"
                    aria-hidden="true"
                    className="h-32 w-32 overflow-visible"
                    style={{rotate: reduceMotion ? 0 : lean, originY: "90%"}}
                >
                    <defs>
                        <radialGradient id={`${uid}-shade`} cx="36%" cy="30%" r="78%">
                            <stop offset="0" stopColor="#fff" stopOpacity="0.6"/>
                            <stop offset="0.45" stopColor="#fff" stopOpacity="0"/>
                            <stop offset="1" stopColor="#3b2412" stopOpacity="0.22"/>
                        </radialGradient>
                        <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2.6"/>
                        </filter>
                        <clipPath id={`${uid}-mouth`}>
                            <motion.path d={mouth}/>
                        </clipPath>
                    </defs>

                    <ellipse cx="60" cy="126" rx="34" ry="4" className="fill-stone-900/15 dark:fill-black/50" filter={`url(#${uid}-soft)`}/>
                    <motion.circle cx="60" cy="60" r="52" style={{fill: skin}}/>
                    <circle cx="60" cy="60" r="52" fill={`url(#${uid}-shade)`}/>
                    <circle cx="60" cy="60" r="51.6" fill="none" stroke="#3b2412" strokeOpacity="0.12" strokeWidth="0.8"/>

                    <motion.g style={{x: gaze}}>
                        <motion.circle cx="31" cy="72" r="9" filter={`url(#${uid}-soft)`} style={{fill: cheekFill, opacity: cheekOpacity}}/>
                        <motion.circle cx="89" cy="72" r="9" filter={`url(#${uid}-soft)`} style={{fill: cheekFill, opacity: cheekOpacity}}/>
                        <g fill="none" stroke="#2a1d16" strokeWidth="3.4" strokeLinecap="round">
                            <motion.path d={leftBrow}/>
                            <motion.path d={rightBrow}/>
                        </g>
                        <g fill="#2a1d16">
                            <motion.path d={leftEye}/>
                            <motion.path d={rightEye}/>
                        </g>
                        <g clipPath={`url(#${uid}-mouth)`}>
                            <rect x="30" y="60" width="60" height="50" fill="#5b1f1a"/>
                            <motion.ellipse cx="60" cy={tongueY} rx="9" ry="6" fill="#e0707a"/>
                        </g>
                        <motion.path d={mouth} fill="none" stroke="#2a1d16" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round"/>
                    </motion.g>
                </motion.svg>

                <div className="relative mt-3 h-7 w-full overflow-hidden text-center" aria-hidden="true">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.span
                            key={label}
                            custom={direction}
                            variants={{
                                enter: (d: number) => ({y: reduceMotion ? 0 : d * 14, opacity: 0}),
                                center: {y: 0, opacity: 1},
                                exit: (d: number) => ({y: reduceMotion ? 0 : d * -14, opacity: 0}),
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{type: "spring", stiffness: 420, damping: 32}}
                            className="absolute inset-x-0 text-lg font-semibold tracking-tight"
                            style={{color}}
                        >
                            {label}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            <div
                ref={trackRef}
                onPointerDown={handlePointerDown}
                onPointerMove={(event) => dragging && fromPointer(event.clientX)}
                onPointerUp={() => setDragging(false)}
                onPointerCancel={() => setDragging(false)}
                className="relative mt-5 h-8 cursor-pointer touch-none select-none"
            >
                <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                    <div className="h-full rounded-full transition-colors duration-150" style={{width: `${current}%`, backgroundColor: color}}/>
                </div>
                {/* Hairline notches where the label changes. */}
                {levels.slice(1).map((level) => (
                    <span
                        key={level.from}
                        aria-hidden="true"
                        className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-white/80 dark:bg-stone-900/80"
                        style={{left: `${level.from}%`}}
                    />
                ))}
                <div
                    ref={thumbRef}
                    role="slider"
                    tabIndex={0}
                    aria-labelledby={`${uid}-q`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={current}
                    aria-valuetext={`${label}, ${current} out of 100`}
                    onKeyDown={handleKeyDown}
                    className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-4 focus-visible:ring-stone-900/15 dark:focus-visible:ring-white/20"
                    style={{left: `${current}%`}}
                >
                    <motion.span
                        className="block h-full w-full rounded-full border-[5px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2),0_4px_10px_-2px_rgba(0,0,0,0.18)] dark:bg-stone-100"
                        style={{borderColor: color}}
                        animate={{scale: dragging ? 1.18 : 1}}
                        transition={{type: "spring", stiffness: 500, damping: 26}}
                    />
                </div>
            </div>

            <div className="mt-1 flex justify-between text-[11px] font-medium uppercase tracking-[0.08em] text-stone-400 dark:text-stone-500">
                <span>{levels[0]?.label}</span>
                <span className="font-mono tabular-nums normal-case tracking-normal text-stone-500 dark:text-stone-400">{current}/100</span>
                <span>{levels[levels.length - 1]?.label}</span>
            </div>
        </div>
    );
};
