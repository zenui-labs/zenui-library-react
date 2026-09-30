import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform} from "framer-motion";

export interface RadioStation {
    /** In MHz, between 88 and 108. */
    frequency: number;
    name: string;
    genre: string;
    /** Shorter name printed on the dial. Defaults to `name`. */
    dialLabel?: string;
}

export interface RadioTunerProps {
    stations: RadioStation[];
    defaultFrequency?: number;
    /** Called when tuning settles: after a drag, a key press or automatic fine tuning. */
    onTune?: (frequency: number) => void;
    /** Called when the radio locks onto a station, and with null when it drifts off. */
    onLock?: (station: RadioStation | null) => void;
    className?: string;
}

const MIN = 88;
const MAX = 108;
// Width of a station's signal in MHz. Narrow enough that 0.1 MHz off already sounds rough.
const BANDWIDTH = 0.09;
// Degrees of knob per MHz; the whole band is five turns, like a string-drive dial.
const KNOB_TURN = 90;

const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));
const fraction = (frequency: number) => (frequency - MIN) / (MAX - MIN);

// An analog FM radio. The needle hangs on a spring behind the knob like a dial string, and reception
// is worked out from where the needle actually is, so the static clears as the needle settles.
// Letting go close to a station pulls it in, the way automatic frequency control did.
export const RadioTuner = ({stations, defaultFrequency = 95.2, onTune, onLock, className = ""}: RadioTunerProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const rootRef = useRef<HTMLDivElement>(null);
    const scaleRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const inView = useInView(rootRef);

    const [power, setPower] = useState(true);
    const [view, setView] = useState({nearest: 0, locked: false, tenth: Math.round(defaultFrequency * 10)});
    const [dragging, setDragging] = useState(false);

    const frequency = useMotionValue(defaultFrequency);
    const sprung = useSpring(frequency, {stiffness: 140, damping: 22, mass: 0.8});
    const needle = reduceMotion ? frequency : sprung;
    const needleLeft = useTransform(needle, (f) => `${fraction(f) * 100}%`);
    const knobRotate = useTransform(frequency, (f) => (f - MIN) * KNOB_TURN);
    const signal = useMotionValue(0);
    // Lightly damped, so the meter overshoots and settles like a moving-coil movement.
    const meter = useSpring(useTransform(signal, (s) => -48 + 96 * s), {stiffness: 110, damping: 11});

    // The station text surfaces out of the static: it sharpens and brightens with the signal.
    const readoutOpacity = useTransform(signal, (s) => 0.12 + 0.88 * s);
    const readoutBlur = useTransform(signal, (s) => `blur(${((1 - s) * 2.5).toFixed(2)}px)`);

    const signalRef = useRef(0);
    const lockedRef = useRef<number | null>(null);
    const knobDrag = useRef({angle: 0});
    const callbacks = useRef({onLock, onTune});
    callbacks.current = {onLock, onTune};

    const receive = (f: number) => {
        let best = -1;
        let strength = 0;
        let nearest = 0;
        stations.forEach((station, index) => {
            const s = Math.exp(-(((f - station.frequency) / BANDWIDTH) ** 2));
            if (s > strength) {
                strength = s;
                best = index;
            }
            if (Math.abs(f - station.frequency) < Math.abs(f - stations[nearest].frequency)) nearest = index;
            // Printed names light up across a wider window than the signal, so you can see where you are heading.
            const glow = power ? Math.exp(-(((f - station.frequency) / 0.7) ** 2)) : 0;
            const label = labelRefs.current[index];
            if (label) {
                label.style.color = power ? `rgba(254, 243, 199, ${0.32 + glow * 0.68})` : "rgba(168, 162, 158, 0.35)";
                label.style.textShadow = glow > 0.05 ? `0 0 ${2 + glow * 8}px rgba(251, 191, 36, ${glow * 0.85})` : "none";
            }
        });
        const level = power ? strength : 0;
        signalRef.current = level;
        signal.set(level);
        const locked = level > 0.9;
        const lockedIndex = locked ? best : null;
        if (lockedIndex !== lockedRef.current) {
            lockedRef.current = lockedIndex;
            callbacks.current.onLock?.(lockedIndex === null ? null : stations[lockedIndex]);
        }
        const tenth = Math.round(f * 10);
        setView((previous) =>
            previous.nearest === nearest && previous.locked === locked && previous.tenth === tenth ? previous : {nearest, locked, tenth},
        );
    };

    useMotionValueEvent(needle, "change", receive);
    // Re-run reception when the power or the station list changes; the needle may not move.
    useEffect(() => {
        receive(needle.get());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [power, stations, needle]);

    // Static: fresh random grain every frame, faded by how weak the signal is, with slow rolling bands.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !inView || !power) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        const box = canvas.getBoundingClientRect();
        const width = Math.max(32, Math.round(box.width / 2));
        const height = Math.max(16, Math.round(box.height / 2));
        canvas.width = width;
        canvas.height = height;
        const image = context.createImageData(width, height);
        let frame = 0;
        const draw = (now: number) => {
            const noise = Math.pow(1 - signalRef.current, 1.4) * 0.85 + 0.03;
            const data = image.data;
            for (let y = 0; y < height; y++) {
                const band = 0.75 + 0.25 * Math.sin(y * 0.45 + now * 0.012);
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;
                    const v = Math.random() * 255;
                    data[i] = v;
                    data[i + 1] = v * 0.96;
                    data[i + 2] = v * 0.88;
                    data[i + 3] = noise * band * (120 + Math.random() * 135);
                }
            }
            context.putImageData(image, 0, 0);
            frame = requestAnimationFrame(draw);
        };
        if (reduceMotion) draw(0);
        else frame = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(frame);
    }, [inView, power, reduceMotion]);

    const settle = () => {
        const f = frequency.get();
        const station = stations.reduce((a, b) => (Math.abs(b.frequency - f) < Math.abs(a.frequency - f) ? b : a), stations[0]);
        const target = station && Math.abs(station.frequency - f) < 0.3 ? station.frequency : Math.round(f * 10) / 10;
        frequency.set(target);
        callbacks.current.onTune?.(target);
    };

    const fromPointer = (clientX: number) => {
        const box = scaleRef.current?.getBoundingClientRect();
        if (!box) return;
        frequency.set(clamp(MIN + ((clientX - box.left) / box.width) * (MAX - MIN)));
    };

    const knobAngle = (event: PointerEvent<HTMLDivElement>) => {
        const box = event.currentTarget.getBoundingClientRect();
        return (Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180) / Math.PI;
    };

    const onKnobKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const f = frequency.get();
        const step = event.shiftKey ? 1 : 0.1;
        const up = [...stations].sort((a, b) => a.frequency - b.frequency).find((s) => s.frequency > f + 0.05);
        const down = [...stations].sort((a, b) => b.frequency - a.frequency).find((s) => s.frequency < f - 0.05);
        const targets: Record<string, number | undefined> = {
            ArrowUp: f + step,
            ArrowRight: f + step,
            ArrowDown: f - step,
            ArrowLeft: f - step,
            PageUp: up?.frequency,
            PageDown: down?.frequency,
            Home: MIN,
            End: MAX,
        };
        if (!(event.key in targets)) return;
        event.preventDefault();
        const target = targets[event.key];
        if (target === undefined) return;
        const rounded = clamp(Math.round(target * 10) / 10);
        frequency.set(rounded);
        onTune?.(rounded);
    };

    const nearest = stations[view.nearest];
    const shown = view.tenth / 10;
    const ticks = Array.from({length: (MAX - MIN) * 5 + 1}, (_, i) => MIN + i * 0.2);

    return (
        <div
            ref={rootRef}
            className={`w-full max-w-[680px] rounded-[22px] bg-gradient-to-b from-[#f1ebdd] to-[#e4dccb] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_50px_-28px_rgba(68,54,32,0.55)] dark:from-zinc-800 dark:to-zinc-900 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_50px_-24px_rgba(0,0,0,0.9)] sm:p-5 ${className}`}
        >
            {/* Dial window */}
            <div
                onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    setDragging(true);
                    fromPointer(event.clientX);
                }}
                onPointerMove={(event) => dragging && fromPointer(event.clientX)}
                onPointerUp={() => {
                    if (!dragging) return;
                    setDragging(false);
                    settle();
                }}
                onPointerCancel={() => setDragging(false)}
                className={`relative h-[104px] touch-none select-none overflow-hidden rounded-xl bg-[#17130e] px-5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.85),0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.05)] ${dragging ? "cursor-grabbing" : "cursor-ew-resize"}`}
            >
                {/* Backlight: an incandescent bulb takes a moment to warm up and to fade. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_120%_at_50%_110%,rgba(251,191,36,0.34),rgba(180,83,9,0.12)_55%,transparent_80%)] transition-opacity ease-[cubic-bezier(0.2,0.7,0.1,1)]"
                    style={{opacity: power ? 1 : 0, transitionDuration: power ? "1100ms" : "500ms"}}
                />
                <div ref={scaleRef} className="relative h-full">
                    {stations.map((station, index) => (
                        <span
                            key={station.frequency}
                            ref={(el) => (labelRefs.current[index] = el)}
                            className="absolute -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px]"
                            style={{left: `${fraction(station.frequency) * 100}%`, top: index % 2 === 0 ? 10 : 26}}
                        >
                            {station.dialLabel ?? station.name}
                        </span>
                    ))}
                    <svg aria-hidden="true" viewBox="0 0 1000 30" preserveAspectRatio="none" className="absolute inset-x-0 top-[46px] h-[30px] w-full">
                        {ticks.map((f) => {
                            const whole = Math.abs(f - Math.round(f)) < 0.01;
                            const even = whole && Math.round(f) % 2 === 0;
                            const x = fraction(f) * 1000;
                            return (
                                <line
                                    key={f.toFixed(1)}
                                    x1={x}
                                    x2={x}
                                    y1={0}
                                    y2={even ? 16 : whole ? 11 : 6}
                                    stroke="#fef3c7"
                                    strokeOpacity={power ? (even ? 0.8 : 0.45) : 0.25}
                                    strokeWidth={even ? 1.4 : 1}
                                    vectorEffect="non-scaling-stroke"
                                />
                            );
                        })}
                        <line x1="0" x2="1000" y1="0.5" y2="0.5" stroke="#fef3c7" strokeOpacity={power ? 0.35 : 0.15} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    {Array.from({length: 11}, (_, i) => MIN + i * 2).map((f) => (
                        <span
                            key={f}
                            className={`absolute top-[66px] -translate-x-1/2 font-mono text-[10px] tabular-nums transition-colors duration-700 ${power ? "text-amber-100/80" : "text-stone-500/50"}`}
                            style={{left: `${fraction(f) * 100}%`}}
                        >
                            {f}
                        </span>
                    ))}
                    <span className={`absolute bottom-2 right-0 font-mono text-[9px] tracking-[0.2em] ${power ? "text-amber-100/50" : "text-stone-500/40"}`}>MHz</span>
                    <motion.span aria-hidden="true" className="absolute inset-y-1.5 w-[2px] -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]" style={{left: needleLeft}}/>
                </div>
                {/* Glass reflection */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(172deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_40%,transparent_41%)]"/>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4 sm:grid-cols-[1fr_auto_auto]">
                {/* Station readout, drawn under a canvas of static that clears as the signal locks. */}
                <div className="relative col-span-2 h-[76px] overflow-hidden rounded-lg bg-stone-900 px-3 py-2.5 shadow-[inset_0_1px_6px_rgba(0,0,0,0.7)] sm:col-span-1" aria-live="polite">
                    <motion.div className="relative" style={{opacity: readoutOpacity, filter: readoutBlur}}>
                        <p className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-200/70">
                            <span className="tabular-nums">{shown.toFixed(1)} MHz</span>
                            <span className={`rounded-sm px-1 text-[8px] ${view.locked ? "bg-amber-400/90 text-stone-900" : "text-amber-200/30"}`}>Stereo</span>
                        </p>
                        <p className="mt-1 truncate text-lg font-semibold leading-tight tracking-tight text-amber-50">{nearest?.name}</p>
                        <p className="truncate text-xs text-amber-100/60">{nearest?.genre}</p>
                    </motion.div>
                    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-500" style={{opacity: power ? 1 : 0}}/>
                    <span className="sr-only">{power ? (view.locked ? `Tuned to ${nearest?.name}, ${nearest?.genre}` : `Static at ${shown.toFixed(1)} MHz`) : "Radio off"}</span>
                </div>

                {/* Signal meter */}
                <div aria-hidden="true" className="relative h-[76px] w-[112px] overflow-hidden rounded-lg bg-[#f7f1e1] shadow-[inset_0_1px_4px_rgba(0,0,0,0.35)] dark:bg-[#e9e1cc]">
                    <svg viewBox="0 0 112 76" className="absolute inset-0 h-full w-full">
                        <path d="M18 50A46 46 0 0 1 94 50" fill="none" stroke="#44403c" strokeWidth="0.8"/>
                        <path d="M80 36.5A46 46 0 0 1 94 50" fill="none" stroke="#dc2626" strokeWidth="2.4"/>
                        {Array.from({length: 9}, (_, i) => -48 + i * 12).map((angle) => {
                            const t = (angle * Math.PI) / 180;
                            return <line key={angle} x1={56 + 46 * Math.sin(t)} y1={80 - 46 * Math.cos(t) - 4} x2={56 + 51 * Math.sin(t)} y2={80 - 51 * Math.cos(t) - 4} stroke="#44403c" strokeWidth="0.8"/>;
                        })}
                        <text x="56" y="66" textAnchor="middle" fontSize="7" letterSpacing="1.5" fill="#57534e" fontFamily="ui-monospace, monospace">SIGNAL</text>
                    </svg>
                    <motion.span className="absolute bottom-[0px] left-1/2 h-[50px] w-px origin-bottom bg-stone-900" style={{rotate: meter, x: "-50%"}}/>
                    <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-stone-800"/>
                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.5),transparent_45%)]"/>
                </div>

                {/* Tuning knob and power */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setPower((on) => !on)}
                        aria-pressed={power}
                        aria-label="Power"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-stone-100 to-stone-300 shadow-[0_2px_3px_rgba(0,0,0,0.3),inset_0_-1px_0_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:from-zinc-500 dark:to-zinc-700"
                    >
                        <span className={`h-1.5 w-1.5 rounded-full transition-colors ${power ? "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)]" : "bg-stone-500"}`}/>
                    </button>
                    <div
                        role="slider"
                        tabIndex={0}
                        aria-label="Tuning"
                        aria-valuemin={MIN}
                        aria-valuemax={MAX}
                        aria-valuenow={shown}
                        aria-valuetext={`${shown.toFixed(1)} MHz${view.locked ? `, ${nearest?.name}` : ""}`}
                        onKeyDown={onKnobKey}
                        onPointerDown={(event) => {
                            event.currentTarget.setPointerCapture(event.pointerId);
                            knobDrag.current.angle = knobAngle(event);
                            setDragging(true);
                        }}
                        onPointerMove={(event) => {
                            if (!dragging) return;
                            const angle = knobAngle(event);
                            const delta = ((angle - knobDrag.current.angle + 540) % 360) - 180;
                            knobDrag.current.angle = angle;
                            frequency.set(clamp(frequency.get() + delta / KNOB_TURN));
                        }}
                        onPointerUp={() => {
                            if (!dragging) return;
                            setDragging(false);
                            settle();
                        }}
                        onPointerCancel={() => setDragging(false)}
                        className="relative h-[72px] w-[72px] shrink-0 cursor-grab touch-none rounded-full shadow-[0_6px_12px_-4px_rgba(0,0,0,0.5),0_2px_3px_rgba(0,0,0,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#ebe4d4] active:cursor-grabbing dark:focus-visible:ring-offset-zinc-900"
                    >
                        <motion.div className="absolute inset-0 rounded-full [background:repeating-conic-gradient(#57534e_0_3deg,#a8a29e_3deg_6deg)]" style={{rotate: knobRotate}}>
                            <div className="absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafaf9,#a8a29e_70%,#78716c)]"/>
                            <div className="absolute left-1/2 top-[9px] h-4 w-[3px] -translate-x-1/2 rounded-full bg-stone-800"/>
                        </motion.div>
                        {/* Highlight stays fixed while the knob turns: the light doesn't rotate. */}
                        <div className="pointer-events-none absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.7),transparent_45%)]"/>
                    </div>
                </div>
            </div>
            <p className="mt-3 text-[11px] text-stone-500 dark:text-zinc-400">Drag the dial or turn the knob. Arrow keys step 0.1 MHz, Page Up and Page Down jump between stations.</p>
        </div>
    );
};
