import {useCallback, useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion} from "framer-motion";

export interface RotaryKnobProps {
    label: string;
    min: number;
    max: number;
    /** Controlled value. Leave it out and use `defaultValue` for an uncontrolled knob. */
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** Click stops across the full sweep, ends included. Arrow keys and the wheel move one stop. */
    detents?: number;
    /** "log" spreads values geometrically, which suits frequencies. `min` must be above 0. */
    scale?: "linear" | "log";
    /** Formats the readout and the screen reader value, e.g. 2400 to "2.4 kHz". */
    format?: (value: number) => string;
    /** Number of LED segments in the arc around the knob. */
    leds?: number;
    /** Diameter of the knob cap in px. */
    size?: number;
    className?: string;
}

// The knob sweeps 270 degrees, from seven o'clock to five o'clock.
const SWEEP = 270;
const START = -135;

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/**
 * A machined aluminium knob with a lit LED arc. Drag up and down from the middle, or drag around the rim like a
 * real knob. Shift drags finely, the wheel moves one stop, double click returns to the default value.
 */
export const RotaryKnob = ({
    label,
    min,
    max,
    value: controlled,
    defaultValue,
    onChange,
    detents = 61,
    scale = "linear",
    format = (v) => v.toFixed(0),
    leds = 25,
    size = 76,
    className = "",
}: RotaryKnobProps) => {
    const reduceMotion = useReducedMotion();
    const labelId = useId();
    const resetValue = defaultValue ?? min;
    const [inner, setInner] = useState(resetValue);
    const value = controlled ?? inner;

    const toT = useCallback(
        (v: number) => clamp01(scale === "log" ? Math.log(v / min) / Math.log(max / min) : (v - min) / (max - min)),
        [scale, min, max],
    );
    const toValue = useCallback(
        (t: number) => (scale === "log" ? min * Math.pow(max / min, t) : min + (max - min) * t),
        [scale, min, max],
    );
    const t = toT(value);

    const commit = (nextT: number) => {
        const snapped = Math.round(clamp01(nextT) * (detents - 1)) / (detents - 1);
        if (Math.abs(snapped - toT(value)) < 1e-6) return;
        const next = toValue(snapped);
        if (controlled === undefined) setInner(next);
        onChange?.(next);
    };

    // The rotation chases the snapped value with a light spring, so each detent lands with a tiny overshoot.
    // Big jumps (Home, End, double click) use more damping so the knob does not swing past like a pendulum.
    const angle = useMotionValue(START + SWEEP * t);
    useEffect(() => {
        const target = START + SWEEP * t;
        if (reduceMotion) {
            angle.jump(target);
            return;
        }
        const far = Math.abs(target - angle.get()) > 24;
        const controls = animate(angle, target, {type: "spring", stiffness: 900, damping: far ? 42 : 17, mass: 0.5});
        return () => controls.stop();
    }, [t, angle, reduceMotion]);

    // The drag keeps its own unsnapped position so slow drags still add up to the next detent.
    const drag = useRef<{t: number; y: number; angle: number; circular: boolean; cx: number; cy: number} | null>(null);

    const pointerAngle = (x: number, y: number, cx: number, cy: number) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI;

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        event.currentTarget.focus();
        event.currentTarget.setPointerCapture(event.pointerId);
        const rect = event.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Grabbing near the rim turns the knob around its centre; grabbing the middle drags up and down.
        const distance = Math.hypot(event.clientX - cx, event.clientY - cy);
        drag.current = {
            t,
            y: event.clientY,
            angle: pointerAngle(event.clientX, event.clientY, cx, cy),
            circular: distance > size * 0.36,
            cx,
            cy,
        };
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const state = drag.current;
        if (!state) return;
        const fine = event.shiftKey ? 0.25 : 1;
        if (state.circular) {
            const now = pointerAngle(event.clientX, event.clientY, state.cx, state.cy);
            let delta = now - state.angle;
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;
            state.angle = now;
            state.t = clamp01(state.t + (delta / SWEEP) * fine);
        } else {
            state.t = clamp01(state.t + ((state.y - event.clientY) / 220) * fine);
            state.y = event.clientY;
        }
        commit(state.t);
    };

    const handlePointerUp = () => {
        drag.current = null;
    };

    const stepBy = (stops: number) => commit(Math.round(t * (detents - 1) + stops) / (detents - 1));

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const page = Math.max(2, Math.round((detents - 1) / 10));
        const moves: Record<string, () => void> = {
            ArrowUp: () => stepBy(1),
            ArrowRight: () => stepBy(1),
            ArrowDown: () => stepBy(-1),
            ArrowLeft: () => stepBy(-1),
            PageUp: () => stepBy(page),
            PageDown: () => stepBy(-page),
            Home: () => commit(0),
            End: () => commit(1),
        };
        const move = moves[event.key];
        if (!move) return;
        event.preventDefault();
        move();
    };

    // React attaches wheel listeners as passive, so preventDefault has to be wired up by hand.
    const knobRef = useRef<HTMLDivElement>(null);
    const stepRef = useRef(stepBy);
    stepRef.current = stepBy;
    useEffect(() => {
        const node = knobRef.current;
        if (!node) return;
        // Trackpads send a stream of small deltas, a mouse wheel one large one per notch. Both add up to one stop.
        let pending = 0;
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            pending += event.deltaY;
            if (Math.abs(pending) < 30) return;
            stepRef.current(pending < 0 ? 1 : -1);
            pending = 0;
        };
        node.addEventListener("wheel", handleWheel, {passive: false});
        return () => node.removeEventListener("wheel", handleWheel);
    }, []);

    const ring = size * 1.46;
    const readout = format(value);

    return (
        <div className={`flex select-none flex-col items-center ${className}`}>
            <div
                ref={knobRef}
                role="slider"
                tabIndex={0}
                aria-labelledby={labelId}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={Number(value.toFixed(4))}
                aria-valuetext={readout}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onKeyDown={handleKeyDown}
                onDoubleClick={() => commit(toT(resetValue))}
                className="relative cursor-grab touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-100 active:cursor-grabbing dark:focus-visible:ring-offset-zinc-900"
                style={{width: ring, height: ring}}
            >
                {/* LED arc. The lead segment burns brightest, like a real ladder driven by a comparator. */}
                <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    {Array.from({length: leds}, (_, index) => {
                        const share = index / (leds - 1);
                        const deg = START + SWEEP * share - 90;
                        const rad = (deg * Math.PI) / 180;
                        const lit = share <= t + 1e-6;
                        const lead = lit && (index === leds - 1 || (index + 1) / (leds - 1) > t + 1e-6);
                        return (
                            <rect
                                key={index}
                                x={-0.9}
                                y={-2.4}
                                width={1.8}
                                height={4.8}
                                rx={0.9}
                                transform={`translate(${50 + 46 * Math.cos(rad)} ${50 + 46 * Math.sin(rad)}) rotate(${deg + 90})`}
                                className={
                                    lit
                                        ? `fill-amber-500 transition-[fill,opacity] duration-75 dark:fill-amber-400 ${lead ? "opacity-100" : "opacity-80"}`
                                        : "fill-stone-300 transition-[fill] duration-300 dark:fill-zinc-700/80"
                                }
                                style={lit ? {filter: "drop-shadow(0 0 1.4px rgb(245 158 11 / 0.8))"} : undefined}
                            />
                        );
                    })}
                </svg>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{width: size, height: size}}>
                    {/* Cast shadow. Light comes from the upper left, so the shadow falls down and to the right. */}
                    <div aria-hidden="true" className="absolute inset-0 translate-x-[3px] translate-y-[6px] rounded-full bg-black/35 blur-[7px] dark:bg-black/70"/>

                    {/* Knurled skirt. The ridges rotate; the shading on top of them does not, so the light stays put. */}
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full"
                        style={{
                            rotate: angle,
                            background: "repeating-conic-gradient(from 0deg, #3f3f46 0deg 2.2deg, #d4d4d8 2.2deg 3.4deg, #71717a 3.4deg 5deg)",
                        }}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55), transparent 55%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.45), transparent 60%)",
                            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.35)",
                        }}
                    />

                    {/* Cap face. The conic gradient fakes the anisotropic highlights of lathe-turned aluminium and the
                        fine radial rings are the tool marks. It does not rotate: turned metal looks the same at any angle. */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-[11%] rounded-full"
                        style={{
                            background: [
                                "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.07) 0 0.6px, rgba(0,0,0,0.05) 0.6px 1.3px)",
                                "conic-gradient(from 200deg, #a1a1aa, #f4f4f5 8%, #b4b4bb 18%, #e4e4e7 30%, #fafafa 40%, #9ca3af 52%, #d4d4d8 64%, #f5f5f5 76%, #a8a8b0 88%, #a1a1aa)",
                            ].join(", "),
                            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)",
                        }}
                    />
                    <div aria-hidden="true" className="absolute inset-[11%] rounded-full dark:bg-zinc-950/25"/>

                    {/* Engraved indicator. The pale edge below the groove is where it catches the light. */}
                    <motion.div aria-hidden="true" className="absolute inset-0" style={{rotate: angle}}>
                        <span className="absolute left-1/2 top-[15%] h-[24%] w-[3px] -translate-x-1/2 rounded-full bg-zinc-800 shadow-[0.5px_0.5px_0_rgba(255,255,255,0.8)]"/>
                    </motion.div>
                </div>
            </div>

            <span id={labelId} className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-zinc-400">
                {label}
            </span>
            <span className="mt-1 min-w-[5.5rem] rounded-[3px] bg-stone-900 px-2 py-0.5 text-center font-mono text-xs tabular-nums text-amber-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] dark:bg-black">
                {readout}
            </span>
        </div>
    );
};
