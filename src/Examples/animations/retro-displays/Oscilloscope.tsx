import {useEffect, useLayoutEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";

export interface LissajousSettings {
    /** Horizontal frequency, as a whole-number ratio against `y`. */
    x: number;
    /** Vertical frequency. */
    y: number;
    /** Phase of the horizontal signal, in degrees. */
    phase: number;
}

export interface LissajousPreset extends LissajousSettings {
    label: string;
    /** Short name of the figure, e.g. "circle". */
    shape: string;
}

export interface OscilloscopeProps {
    presets?: LissajousPreset[];
    initial?: LissajousSettings;
    /** Highest frequency either knob can reach. */
    maxRatio?: number;
    /**
     * Degrees per second the phase creeps forward while drift is on, like two oscillators that are a hair out of
     * tune. It makes the figure turn in space.
     */
    driftRate?: number;
    /** Label printed on the front panel. */
    model?: string;
    className?: string;
}

const defaultPresets: LissajousPreset[] = [
    {label: "1:1", shape: "circle", x: 1, y: 1, phase: 90},
    {label: "1:2", shape: "figure eight", x: 1, y: 2, phase: 0},
    {label: "3:2", shape: "knot", x: 3, y: 2, phase: 90},
];

// Screen is 10 x 8 divisions; the trace swings 3.2 divisions either side of centre.
const DIVISIONS_X = 10;
const DIVISIONS_Y = 8;
const SWING = 3.2;
// Radians of beam travel per second. Fast enough that persistence holds the whole figure.
const SWEEP = Math.PI * 2 * 2.6;
// Seconds for the phosphor to fade to 5 percent.
const PERSISTENCE = 0.28;

interface KnobProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    /** Screen-reader text for the current value. */
    valueText: string;
    onChange: (value: number) => void;
    /** Draw a tick at every step, for knobs that click between whole values. */
    detents?: boolean;
}

// A bakelite knob with a knurled rim. Drag up or right to turn it clockwise; arrow keys step it.
const Knob = ({label, value, min, max, step, valueText, onChange, detents = false}: KnobProps) => {
    const drag = useRef<{start: number; value: number} | null>(null);
    const clamp = (next: number) => Math.min(max, Math.max(min, Math.round(next / step) * step));
    const angle = -135 + (270 * (value - min)) / (max - min);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = {start: event.clientX - event.clientY, value};
    };
    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!drag.current) return;
        // 160px of travel sweeps the whole range, whichever way the hand moves.
        const delta = ((event.clientX - event.clientY - drag.current.start) / 160) * (max - min);
        const next = clamp(drag.current.value + delta);
        if (next !== value) onChange(next);
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const big = Math.max(step, (max - min) / 8);
        const moves: Record<string, number> = {
            ArrowUp: step,
            ArrowRight: step,
            ArrowDown: -step,
            ArrowLeft: -step,
            PageUp: big,
            PageDown: -big,
        };
        if (event.key in moves) {
            event.preventDefault();
            onChange(clamp(value + moves[event.key]));
        } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            onChange(event.key === "Home" ? min : max);
        }
    };

    const ticks = detents ? Math.round((max - min) / step) + 1 : 11;

    return (
        <div className="flex flex-col items-center gap-1.5">
            <div className="relative h-[68px] w-[68px]">
                {/* Scale printed on the panel. */}
                <svg aria-hidden="true" viewBox="0 0 68 68" className="absolute inset-0 text-slate-600 dark:text-zinc-400">
                    {Array.from({length: ticks}, (_, index) => {
                        const tickAngle = ((-135 + (270 * index) / (ticks - 1) - 90) * Math.PI) / 180;
                        const major = detents || index % 5 === 0;
                        const inner = major ? 28 : 29.5;
                        return (
                            <line
                                key={index}
                                x1={34 + Math.cos(tickAngle) * inner}
                                y1={34 + Math.sin(tickAngle) * inner}
                                x2={34 + Math.cos(tickAngle) * 32.5}
                                y2={34 + Math.sin(tickAngle) * 32.5}
                                stroke="currentColor"
                                strokeWidth={major ? 1.2 : 0.7}
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>
                <div
                    role="slider"
                    tabIndex={0}
                    aria-label={label}
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={value}
                    aria-valuetext={valueText}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={() => (drag.current = null)}
                    onPointerCancel={() => (drag.current = null)}
                    onKeyDown={handleKeyDown}
                    className="absolute inset-[9px] cursor-grab touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-200 active:cursor-grabbing dark:focus-visible:ring-offset-zinc-800"
                >
                    {/* The shadow stays put while the cap turns, since the light does not move. */}
                    <div className="absolute inset-0 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.35),0_1px_1px_rgba(0,0,0,0.4)]"/>
                    <motion.div
                        className="absolute inset-0 rounded-full bg-[repeating-conic-gradient(from_0deg,#121212_0deg_5deg,#2a2a2a_5deg_10deg)]"
                        animate={{rotate: angle}}
                        transition={{type: "spring", stiffness: 520, damping: 32, mass: 0.6}}
                    >
                        <div className="absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_50%_50%,#262626,#161616_70%)]"/>
                        <div className="absolute left-1/2 top-[4px] h-[16px] w-[2px] -translate-x-1/2 rounded-full bg-zinc-100"/>
                    </motion.div>
                    {/* Fixed highlight from the upper left, laid over the turning cap. */}
                    <div className="pointer-events-none absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.22),transparent_48%)]"/>
                </div>
            </div>
            <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-zinc-400">{label}</span>
        </div>
    );
};

const makeSprite = (size: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return canvas;
    const middle = size / 2;
    const gradient = context.createRadialGradient(middle, middle, 0, middle, middle, middle);
    gradient.addColorStop(0, "rgba(235,255,240,1)");
    gradient.addColorStop(0.12, "rgba(150,255,180,0.9)");
    gradient.addColorStop(0.35, "rgba(60,255,120,0.22)");
    gradient.addColorStop(1, "rgba(40,255,100,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    return canvas;
};

/**
 * An X-Y oscilloscope drawing Lissajous figures on a phosphor screen. The beam is stamped at even time steps, so
 * it burns brighter where it slows down at the turns, and older frames fade out for the afterglow. It stops
 * while off screen.
 */
export const Oscilloscope = ({
    presets = defaultPresets,
    initial = {x: 3, y: 2, phase: 90},
    maxRatio = 6,
    driftRate = 14,
    model = "XY-7 · Dual channel",
    className = "",
}: OscilloscopeProps) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inView = useInView(screenRef);
    const reduceMotion = useReducedMotion() ?? false;
    const [settings, setSettings] = useState<LissajousSettings>(initial);
    const [drift, setDrift] = useState(true);
    const [size, setSize] = useState({width: 0, height: 0});

    // The loop reads settings through a ref, so turning a knob never restarts it or clears the afterglow.
    const live = useRef({...settings, drift, offset: 0});
    live.current = {...live.current, ...settings, drift};

    useLayoutEffect(() => {
        const node = screenRef.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setSize({width: entry.contentRect.width, height: entry.contentRect.height}));
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const {width, height} = size;
        if (!canvas || !context || width === 0) return;

        const ratio = window.devicePixelRatio || 1;
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.fillStyle = "#03120a";
        context.fillRect(0, 0, width, height);

        const spot = Math.max(10, width / 34);
        const sprite = makeSprite(Math.round(spot * ratio));
        const radiusX = (width / DIVISIONS_X) * SWING;
        const radiusY = (height / DIVISIONS_Y) * SWING;
        const centerX = width / 2;
        const centerY = height / 2;
        let t = 0;

        const stamp = (from: number, to: number, a: number, b: number, phase: number) => {
            // One stamp per pixel of travel at the fastest point, so the slow turns collect more light.
            const fastest = Math.hypot(a * radiusX, b * radiusY);
            const dt = 0.9 / fastest;
            const count = Math.min(2400, Math.ceil((to - from) / dt));
            context.globalCompositeOperation = "lighter";
            context.globalAlpha = 0.16;
            for (let index = 0; index < count; index += 1) {
                const time = from + index * dt;
                const x = centerX + Math.sin(a * time + phase) * radiusX;
                const y = centerY - Math.sin(b * time) * radiusY;
                context.drawImage(sprite, x - spot / 2, y - spot / 2, spot, spot);
            }
            context.globalAlpha = 1;
            context.globalCompositeOperation = "source-over";
        };

        if (!inView) return;

        // With reduced motion, draw the whole figure once, sharp and still, whenever a knob moves.
        if (reduceMotion) {
            let frameId = 0;
            let last = "";
            const still = () => {
                const {x, y, phase} = live.current;
                const key = `${x}:${y}:${phase}`;
                if (key !== last) {
                    last = key;
                    context.fillStyle = "#03120a";
                    context.fillRect(0, 0, width, height);
                    stamp(0, Math.PI * 2, x, y, (phase * Math.PI) / 180);
                }
                frameId = requestAnimationFrame(still);
            };
            frameId = requestAnimationFrame(still);
            return () => cancelAnimationFrame(frameId);
        }

        let frameId = 0;
        let previous = performance.now();
        const tick = (now: number) => {
            const seconds = Math.min(0.05, (now - previous) / 1000);
            previous = now;
            const state = live.current;
            if (state.drift) state.offset = (state.offset + driftRate * seconds) % 360;

            // Fade what is already there instead of clearing it: that is the phosphor persistence.
            context.globalAlpha = 1 - Math.pow(0.05, seconds / PERSISTENCE);
            context.fillStyle = "#03120a";
            context.fillRect(0, 0, width, height);
            context.globalAlpha = 1;

            const next = t + SWEEP * seconds;
            stamp(t, next, state.x, state.y, ((state.phase + state.offset) * Math.PI) / 180);
            // x and y are whole numbers, so every figure closes after one turn and t can wrap without a seam.
            t = next % (Math.PI * 2);
            frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
    }, [size, inView, reduceMotion, driftRate]);

    const applyPreset = (preset: LissajousPreset) => {
        setSettings({x: preset.x, y: preset.y, phase: preset.phase});
        setDrift(false);
        live.current.offset = 0;
    };

    const activePreset = presets.find((preset) => preset.x === settings.x && preset.y === settings.y && preset.phase === settings.phase && !drift);

    return (
        <div
            className={`w-full max-w-3xl rounded-[20px] bg-gradient-to-b from-[#e3e7ea] to-[#c9d0d5] p-3 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_40px_-24px_rgba(30,45,60,0.5)] ring-1 ring-black/5 dark:from-zinc-800 dark:to-zinc-900 dark:shadow-[0_1px_0_rgba(255,255,255,0.07)_inset,0_24px_48px_-24px_rgba(0,0,0,0.95)] dark:ring-white/5 sm:p-4 ${className}`}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                {/* Rubber bezel and the tube face. */}
                <div className="min-w-0 flex-1 rounded-[16px] bg-[#101213] p-2.5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.05)]">
                    <div ref={screenRef} className="relative aspect-[5/4] w-full overflow-hidden rounded-[10px] bg-[#03120a]">
                        <canvas
                            ref={canvasRef}
                            role="img"
                            aria-label={`Lissajous figure, frequency ratio ${settings.x} to ${settings.y}, phase ${settings.phase} degrees${drift ? ", drifting" : ""}`}
                            className="absolute inset-0 h-full w-full"
                        />
                        {/* Graticule etched on the glass, with fine ticks along the centre axes. */}
                        <svg aria-hidden="true" viewBox="0 0 100 80" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
                            <g stroke="rgba(170,210,190,0.22)" strokeWidth={1} vectorEffect="non-scaling-stroke">
                                {Array.from({length: DIVISIONS_X - 1}, (_, index) => (
                                    <line key={`v${index}`} x1={(index + 1) * 10} y1={0} x2={(index + 1) * 10} y2={80} vectorEffect="non-scaling-stroke" strokeDasharray={index === 4 ? undefined : "0.6 1.4"}/>
                                ))}
                                {Array.from({length: DIVISIONS_Y - 1}, (_, index) => (
                                    <line key={`h${index}`} x1={0} y1={(index + 1) * 10} x2={100} y2={(index + 1) * 10} vectorEffect="non-scaling-stroke" strokeDasharray={index === 3 ? undefined : "0.6 1.4"}/>
                                ))}
                                {Array.from({length: 49}, (_, index) => (index + 1) * 2).filter((x) => x % 10 !== 0).map((x) => (
                                    <line key={`tx${x}`} x1={x} y1={39.2} x2={x} y2={40.8} vectorEffect="non-scaling-stroke"/>
                                ))}
                                {Array.from({length: 39}, (_, index) => (index + 1) * 2).filter((y) => y % 10 !== 0).map((y) => (
                                    <line key={`ty${y}`} x1={49} y1={y} x2={51} y2={y} vectorEffect="non-scaling-stroke"/>
                                ))}
                            </g>
                        </svg>
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)]"/>
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),transparent_35%)]"/>
                        <span aria-hidden="true" className="absolute bottom-1.5 left-2 font-mono text-[9px] tabular-nums tracking-wider text-emerald-300/50">
                            CH1 X 1V/div · CH2 Y 1V/div
                        </span>
                    </div>
                </div>

                {/* Front panel controls. */}
                <div className="flex shrink-0 flex-col justify-between gap-4 sm:w-[212px]">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-slate-700 dark:text-zinc-300">{model}</span>

                    <div className="grid grid-cols-3 gap-1">
                        <Knob
                            label="X freq"
                            value={settings.x}
                            min={1}
                            max={maxRatio}
                            step={1}
                            detents
                            valueText={`${settings.x}`}
                            onChange={(x) => setSettings((current) => ({...current, x}))}
                        />
                        <Knob
                            label="Y freq"
                            value={settings.y}
                            min={1}
                            max={maxRatio}
                            step={1}
                            detents
                            valueText={`${settings.y}`}
                            onChange={(y) => setSettings((current) => ({...current, y}))}
                        />
                        <Knob
                            label="Phase"
                            value={settings.phase}
                            min={0}
                            max={180}
                            step={5}
                            valueText={`${settings.phase} degrees`}
                            onChange={(phase) => setSettings((current) => ({...current, phase}))}
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-md bg-black/80 px-2.5 py-1.5 font-mono text-[11px] tabular-nums text-emerald-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                        <span>
                            {settings.x}:{settings.y}
                        </span>
                        <span>φ {String(settings.phase).padStart(3, " ")}°</span>
                        <span className={drift ? "text-emerald-300" : "text-emerald-300/30"}>DRIFT</span>
                    </div>

                    <div className="flex gap-1.5">
                        {presets.map((preset) => {
                            const active = activePreset === preset;
                            return (
                                <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() => applyPreset(preset)}
                                    aria-pressed={active}
                                    aria-label={`${preset.label}, ${preset.shape}`}
                                    className={`flex flex-1 flex-col items-center rounded-md py-1.5 font-mono text-[11px] font-semibold tabular-nums outline-none transition-[transform,box-shadow,background-color] duration-100 focus-visible:ring-2 focus-visible:ring-sky-500 active:translate-y-px ${
                                        active
                                            ? "bg-slate-700 text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] dark:bg-zinc-950 dark:text-emerald-300"
                                            : "bg-white/80 text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.1)] hover:bg-white dark:bg-zinc-700 dark:text-zinc-200 dark:shadow-[0_1px_0_rgba(0,0,0,0.6)] dark:hover:bg-zinc-600"
                                    }`}
                                >
                                    {preset.label}
                                    <span className="font-sans text-[8px] font-medium uppercase tracking-[0.14em] opacity-60">{preset.shape}</span>
                                </button>
                            );
                        })}
                        <button
                            type="button"
                            onClick={() => setDrift((on) => !on)}
                            aria-pressed={drift}
                            disabled={reduceMotion}
                            className={`flex flex-1 flex-col items-center justify-center rounded-md py-1.5 font-mono text-[11px] font-semibold outline-none transition-[transform,box-shadow,background-color] duration-100 focus-visible:ring-2 focus-visible:ring-sky-500 active:translate-y-px disabled:opacity-40 ${
                                drift
                                    ? "bg-slate-700 text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] dark:bg-zinc-950 dark:text-emerald-300"
                                    : "bg-white/80 text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.1)] hover:bg-white dark:bg-zinc-700 dark:text-zinc-200 dark:shadow-[0_1px_0_rgba(0,0,0,0.6)] dark:hover:bg-zinc-600"
                            }`}
                        >
                            Drift
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
