import {useEffect, useId, useLayoutEffect, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import type {AnimationPlaybackControls} from "framer-motion";

export type TapeUnit = "cm" | "in";

export interface TapeMeasureProps {
    label?: string;
    /** Lowest value in centimetres. */
    min: number;
    /** Highest value in centimetres. */
    max: number;
    /** Starting value in centimetres. */
    defaultValue?: number;
    /** Called with centimetres whichever unit is shown, so switching units never changes what you store. */
    onChange?: (centimetres: number) => void;
    /** Which side of the blade to read. Inches snap to half an inch and read out as feet and inches. */
    unit?: TapeUnit;
    className?: string;
}

interface Mark {
    length: number;
    label?: string;
    strong?: boolean;
    /** Printed white on a red box, as real blades mark every metre and every foot. */
    plate?: boolean;
}

interface Scale {
    /** Pixels per unit. */
    ppu: number;
    /** Snap and arrow key step. */
    step: number;
    /** Distance between the finest ticks. */
    tick: number;
    mark: (index: number) => Mark;
}

const SCALES: Record<TapeUnit, Scale> = {
    cm: {
        ppu: 14,
        step: 1,
        tick: 0.5,
        mark: (i) => {
            const cm = i / 2;
            if (i % 20 === 0) return {length: 24, label: String(cm), strong: true, plate: cm % 100 === 0};
            if (i % 10 === 0) return {length: 18, label: String(cm)};
            if (i % 2 === 0) return {length: 12};
            return {length: 7};
        },
    },
    in: {
        ppu: 30,
        step: 0.5,
        tick: 0.25,
        mark: (i) => {
            const inches = i / 4;
            if (i % 4 === 0) return {length: 22, label: String(inches), strong: true, plate: inches % 12 === 0};
            if (i % 2 === 0) return {length: 14};
            return {length: 8};
        },
    },
};

const CM_PER_INCH = 2.54;
const TAPE_H = 64;
const CASE_W = 112;

const toUnit = (cm: number, unit: TapeUnit) => (unit === "in" ? cm / CM_PER_INCH : cm);
const toCm = (value: number, unit: TapeUnit) => (unit === "in" ? value * CM_PER_INCH : value);

const feetAndInches = (inches: number) => {
    const feet = Math.floor(inches / 12);
    const rest = inches - feet * 12;
    const whole = Math.floor(rest);
    return `${feet}′ ${whole}${rest - whole >= 0.5 ? "½" : ""}″`;
};

/**
 * A steel tape pulled out of its case. Drag or fling the blade and it coasts to a stop on the nearest tick
 * under the red hairline. The coil inside the case turns and shrinks as more tape comes out.
 */
export const TapeMeasure = ({label = "Measurement", min, max, defaultValue, onChange, unit = "cm", className = ""}: TapeMeasureProps) => {
    const reduceMotion = useReducedMotion();
    const labelId = useId();
    const scale = SCALES[unit];
    const lo = toUnit(min, unit);
    const hi = toUnit(max, unit);
    const snap = (v: number) => Math.min(hi, Math.max(lo, Math.round(v / scale.step) * scale.step));

    const cmRef = useRef(defaultValue ?? (min + max) / 2);
    const [shown, setShown] = useState(() => snap(toUnit(cmRef.current, unit)));
    const position = useMotionValue(shown);
    const running = useRef<AnimationPlaybackControls | null>(null);

    const [width, setWidth] = useState(560);
    const frameRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const node = frameRef.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Switching units keeps the same physical length and turns the blade over to the other scale.
    const shownRef = useRef(shown);
    const previousUnit = useRef(unit);
    useEffect(() => {
        if (previousUnit.current === unit) return;
        previousUnit.current = unit;
        running.current?.stop();
        const next = Math.min(hi, Math.max(lo, Math.round(toUnit(cmRef.current, unit) / scale.step) * scale.step));
        shownRef.current = next;
        position.jump(next);
        setShown(next);
    }, [unit, position, lo, hi, scale.step]);

    // The readout only re-renders when the blade crosses onto a new tick, not on every frame of a fling.
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    useEffect(() => {
        return position.on("change", (v) => {
            const next = Math.min(hi, Math.max(lo, Math.round(v / scale.step) * scale.step));
            if (Math.abs(shownRef.current - next) < 1e-6) return;
            shownRef.current = next;
            cmRef.current = toCm(next, unit);
            setShown(next);
            onChangeRef.current?.(cmRef.current);
        });
    }, [position, lo, hi, scale.step, unit]);

    // Blade geometry. Values grow towards the case, as on a real tape pulled out to the right, so the blade is
    // drawn from its high end on the left. It is padded by a frame's width on both sides so it never runs out.
    const reader = CASE_W + (width - CASE_W) * 0.42;
    const pad = Math.ceil(width / scale.ppu) + 4;
    const start = hi + pad;
    const end = lo - pad;
    const x = useTransform(position, (v) => reader - (start - v) * scale.ppu);
    // The coil turns a full circle for every 170 px of blade and shrinks as the blade pays out.
    const spin = useTransform(position, (v) => (-v * scale.ppu * 360) / 170);
    const coil = useTransform(position, (v) => 1 - ((v - lo) / (hi - lo)) * 0.3);

    const marks = useMemo(() => {
        const first = Math.ceil(end / scale.tick);
        const last = Math.floor(start / scale.tick);
        return Array.from({length: last - first + 1}, (_, k) => {
            const i = first + k;
            return {i, at: (start - i * scale.tick) * scale.ppu, ...scale.mark(i)};
        });
    }, [start, end, scale]);

    const settle = (target: number) => {
        running.current?.stop();
        if (reduceMotion) {
            position.set(target);
            return;
        }
        running.current = animate(position, target, {type: "spring", stiffness: 260, damping: 30});
    };

    const drag = useRef<{x: number; value: number} | null>(null);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        running.current?.stop();
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = {x: event.clientX, value: position.get()};
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const state = drag.current;
        if (!state) return;
        const raw = state.value + (event.clientX - state.x) / scale.ppu;
        // Past either end the blade resists, like pulling against the case's spring.
        const over = raw > hi ? raw - hi : raw < lo ? raw - lo : 0;
        position.set(raw - over + over * 0.3);
    };

    const handlePointerUp = () => {
        if (!drag.current) return;
        drag.current = null;
        if (reduceMotion) {
            position.set(snap(position.get()));
            return;
        }
        // Inertia projects where a fling would coast to and moves that target onto a tick, so it lands exactly.
        running.current = animate(position, position.get(), {
            type: "inertia",
            velocity: position.getVelocity(),
            power: 0.35,
            timeConstant: 300,
            min: lo,
            max: hi,
            bounceStiffness: 320,
            bounceDamping: 32,
            modifyTarget: snap,
        });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const moves: Record<string, number> = {
            ArrowRight: scale.step,
            ArrowUp: scale.step,
            ArrowLeft: -scale.step,
            ArrowDown: -scale.step,
            PageUp: scale.step * 10,
            PageDown: -scale.step * 10,
        };
        if (event.key === "Home") settle(lo);
        else if (event.key === "End") settle(hi);
        else if (event.key in moves) settle(snap(shown + moves[event.key]));
        else return;
        event.preventDefault();
    };

    useEffect(() => () => running.current?.stop(), []);

    const metric = unit === "cm" ? `${Math.round(shown)} cm` : feetAndInches(shown);
    const other = unit === "cm" ? feetAndInches(shown / CM_PER_INCH) : `${Math.round(shown * CM_PER_INCH)} cm`;
    const labelSize = unit === "cm" ? 11 : 12;

    return (
        <div className={`w-full max-w-2xl select-none ${className}`}>
            <div className="mb-4 flex items-end justify-between gap-4 px-1">
                <span id={labelId} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                    {label}
                </span>
                <span className="text-right">
                    <span className="block font-mono text-3xl font-medium tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">{metric}</span>
                    <span className="block font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">{other}</span>
                </span>
            </div>

            <div ref={frameRef} className="relative" style={{height: TAPE_H + 56}}>
                {/* Blade window. It fades out on the right, as if the tape carried on past the table's edge. */}
                <div
                    role="slider"
                    tabIndex={0}
                    aria-labelledby={labelId}
                    aria-valuemin={Math.round(lo * 100) / 100}
                    aria-valuemax={Math.round(hi * 100) / 100}
                    aria-valuenow={shown}
                    aria-valuetext={metric}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onKeyDown={handleKeyDown}
                    className="absolute inset-x-0 cursor-grab touch-pan-y overflow-hidden rounded-r-sm outline-none [mask-image:linear-gradient(to_right,black_80%,transparent)] focus-visible:ring-2 focus-visible:ring-red-500/60 active:cursor-grabbing"
                    style={{top: 36, height: TAPE_H}}
                >
                    <motion.div className="absolute inset-y-0 left-0" style={{x, width: (start - end) * scale.ppu}}>
                        <div className="absolute inset-0 bg-amber-300 dark:bg-amber-400"/>
                        <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
                            {marks.map((mark) => (
                                <g key={mark.i}>
                                    <rect x={mark.at - 0.5} y={0} width={mark.strong ? 1.4 : 1} height={mark.length} className="fill-zinc-900"/>
                                    {!mark.label && <rect x={mark.at - 0.5} y={TAPE_H - mark.length * 0.6} width={1} height={mark.length * 0.6} className="fill-zinc-900"/>}
                                    {mark.label && (
                                        <>
                                            {mark.plate && <rect x={mark.at - 15} y={27} width={30} height={16} rx={1.5} className="fill-red-600"/>}
                                            <text
                                                x={mark.at}
                                                y={39}
                                                textAnchor="middle"
                                                fontSize={mark.strong ? labelSize + 2 : labelSize - 1}
                                                fontWeight={mark.strong ? 700 : 500}
                                                fontFamily="ui-sans-serif, system-ui"
                                                className={mark.plate ? "fill-white" : mark.strong ? "fill-zinc-900" : "fill-zinc-700"}
                                            >
                                                {mark.label}
                                            </text>
                                        </>
                                    )}
                                </g>
                            ))}
                        </svg>
                    </motion.div>
                    {/* The blade is concave: a bright band along the top and a darker lower edge sell the curve. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(255,255,255,0.35) 12%, rgba(255,255,255,0) 40%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2))",
                        }}
                    />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-8 bg-gradient-to-r from-black/45 to-transparent" style={{left: CASE_W - 6}}/>
                </div>

                {/* Hairline reader, fixed in place while the blade moves under it. */}
                <div aria-hidden="true" className="pointer-events-none absolute" style={{left: reader, top: 22, height: TAPE_H + 30}}>
                    <span className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 rounded-[2px] bg-red-600 [clip-path:polygon(0_0,100%_0,50%_100%)]"/>
                    <span className="absolute bottom-0 left-0 top-2 w-px -translate-x-1/2 bg-red-600 shadow-[0_0_0_0.5px_rgba(255,255,255,0.35)]"/>
                </div>

                {/* Case. It sits over the blade's end, so the tape looks like it is being pulled out of the mouth. */}
                <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0" style={{width: CASE_W, height: CASE_W}}>
                    <div className="absolute inset-0 translate-x-1 translate-y-2 rounded-[30px] bg-black/30 blur-md dark:bg-black/60"/>
                    <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.5)] dark:from-zinc-700 dark:via-zinc-800 dark:to-black"/>
                    {/* Rubber overmould, textured with a fine dot grid. */}
                    <div
                        className="absolute inset-[5px] rounded-[26px] opacity-60"
                        style={{backgroundImage: "radial-gradient(rgba(0,0,0,0.55) 0.8px, transparent 1.2px)", backgroundSize: "4px 4px"}}
                    />
                    <div className="absolute left-1/2 top-1/2 h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-600 p-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-950 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]">
                            {/* Coil of blade seen through the window. */}
                            <motion.div className="absolute inset-[3px]" style={{scale: coil}}>
                                <div
                                    className="h-full w-full rounded-full"
                                    style={{background: "repeating-radial-gradient(circle, #fcd34d 0 1.6px, #92400e 1.6px 2.3px)"}}
                                />
                            </motion.div>
                            <motion.div className="absolute inset-[22px] rounded-full bg-zinc-300 shadow-[0_0_0_2px_rgba(0,0,0,0.6)]" style={{rotate: spin}}>
                                <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-zinc-600"/>
                                <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-zinc-600"/>
                            </motion.div>
                            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_45%)]"/>
                        </div>
                    </div>
                    <div className="absolute right-3 top-1.5 h-2 w-7 rounded-full bg-zinc-500 shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]"/>
                </div>
            </div>
            <p className="mt-1 px-1 text-[11px] text-zinc-400 dark:text-zinc-500">Drag or flick the tape. Arrow keys move one {unit === "cm" ? "centimetre" : "half inch"}.</p>
        </div>
    );
};
