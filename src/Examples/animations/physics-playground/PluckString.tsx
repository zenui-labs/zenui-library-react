import {useCallback, useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {useInView, useReducedMotion} from "framer-motion";

export interface PluckStringProps {
    /** Note name printed at the nut, e.g. "E2". Also names the string for screen readers. */
    note: string;
    /** Gauge printed under the note, e.g. ".046". */
    gauge?: string;
    /** Stroke width in px. Thicker strings bend further, vibrate slower and ring longer. */
    thickness?: number;
    /** Wound strings get a fine winding texture, like the bottom three strings of a guitar. */
    wound?: boolean;
    className?: string;
}

const HEIGHT = 44;
const MID = HEIGHT / 2;
const HARMONICS = 7;
const SAMPLES = 72;
// Two extra copies of the string drawn a few milliseconds in the past act as motion blur.
const GHOSTS = [0, 1 / 240, 2 / 240];

interface StringState {
    width: number;
    held: {x: number; dy: number} | null;
    lastY: number | null;
    amplitudes: Float64Array;
    start: number;
    ringing: boolean;
}

/**
 * A section divider that behaves like a guitar string. Sweep the pointer across it and it bends with the pointer,
 * then snaps free into a decaying standing wave built from the first seven harmonics. Focus it and press Enter to pluck.
 */
export const PluckString = ({note, gauge, thickness = 1.5, wound = false, className = ""}: PluckStringProps) => {
    const uid = useId().replace(/:/g, "");
    const wrapRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const glowRef = useRef<SVGUseElement>(null);
    const ledRef = useRef<HTMLSpanElement>(null);
    const frameRef = useRef(0);
    const activeRef = useRef(false);
    const stateRef = useRef<StringState>({width: 0, held: null, lastY: null, amplitudes: new Float64Array(HARMONICS + 1), start: 0, ringing: false});
    const inView = useInView(wrapRef);
    const reduceMotion = useReducedMotion() ?? false;
    const [width, setWidth] = useState(0);
    const active = inView && !reduceMotion;

    const maxBend = 6 + thickness * 3.2;
    // Visual pitch, far below the real one so the eye can follow it. Heavier strings swing slower.
    const fundamental = 11 - thickness * 2;
    const decay = 1 / (0.7 + thickness * 0.5);

    const shape = useCallback((time: number) => {
        const state = stateRef.current;
        const w = state.width;
        if (state.held) {
            const {x, dy} = state.held;
            return `M0 ${MID} L${x.toFixed(2)} ${(MID + dy).toFixed(2)} L${w} ${MID}`;
        }
        if (!state.ringing) return `M0 ${MID} L${w} ${MID}`;
        let d = "";
        for (let s = 0; s <= SAMPLES; s++) {
            const u = s / SAMPLES;
            let y = 0;
            for (let n = 1; n <= HARMONICS; n++) {
                const amplitude = state.amplitudes[n];
                if (!amplitude) continue;
                // Higher harmonics die out faster, which is what turns the kinked pluck shape into a smooth sway.
                y += amplitude * Math.sin(n * Math.PI * u) * Math.cos(2 * Math.PI * fundamental * n * time) * Math.exp(-decay * (1 + 0.7 * (n - 1)) * time);
            }
            d += `${s ? "L" : "M"}${(u * w).toFixed(2)} ${(MID + y).toFixed(2)}`;
        }
        return d;
    }, [fundamental, decay]);

    const paint = useCallback((now: number) => {
        const state = stateRef.current;
        const time = (now - state.start) / 1000;
        GHOSTS.forEach((offset, index) => pathRefs.current[index]?.setAttribute("d", shape(Math.max(0, time - offset))));
        const envelope = state.ringing ? (Math.max(...Array.from(state.amplitudes, Math.abs)) * Math.exp(-decay * time)) / maxBend : 0;
        glowRef.current?.setAttribute("opacity", Math.min(0.9, envelope * 1.4).toFixed(3));
        if (ledRef.current) ledRef.current.style.opacity = (0.15 + Math.min(0.85, envelope * 1.6)).toFixed(3);
        if (state.ringing && envelope * maxBend < 0.08) {
            state.ringing = false;
            GHOSTS.forEach((_, index) => pathRefs.current[index]?.setAttribute("d", shape(0)));
        }
    }, [shape, decay, maxBend]);

    const wake = useCallback(() => {
        if (frameRef.current || !activeRef.current) return;
        const tick = (now: number) => {
            paint(now);
            const state = stateRef.current;
            if (!state.held && !state.ringing) {
                frameRef.current = 0;
                return;
            }
            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
    }, [paint]);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const observer = new ResizeObserver(([entry]) => {
            stateRef.current.width = entry.contentRect.width;
            setWidth(entry.contentRect.width);
            paint(performance.now());
        });
        observer.observe(svg);
        return () => observer.disconnect();
    }, [paint]);

    useEffect(() => {
        activeRef.current = active;
        if (active) wake();
        return () => {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = 0;
        };
    }, [active, wake]);

    // Fourier series of a string pulled into a triangle at `x` and let go.
    const release = useCallback((x: number, dy: number) => {
        const state = stateRef.current;
        const p = Math.min(0.94, Math.max(0.06, x / (state.width || 1)));
        for (let n = 1; n <= HARMONICS; n++) {
            state.amplitudes[n] = (2 * dy * Math.sin(n * Math.PI * p)) / (n * n * Math.PI * Math.PI * p * (1 - p));
        }
        state.held = null;
        state.start = performance.now();
        state.ringing = true;
        wake();
    }, [wake]);

    const localPoint = (event: PointerEvent) => {
        const rect = svgRef.current!.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top - MID};
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const state = stateRef.current;
        const {x, y} = localPoint(event);
        if (x < 0 || x > state.width) return;
        if (state.held) {
            if (Math.abs(y) > maxBend) {
                release(x, Math.sign(y) * maxBend);
            } else {
                state.held = {x, dy: y};
                wake();
            }
        } else if (state.lastY !== null && Math.sign(y) !== Math.sign(state.lastY) && Math.abs(y - state.lastY) < HEIGHT) {
            // The pointer crossed the string between two events: catch it, which also damps any ringing.
            // A swipe fast enough to land past the bend limit plucks straight away, and hardest.
            state.ringing = false;
            if (Math.abs(y) >= maxBend) {
                release(x, Math.sign(y) * maxBend);
            } else {
                state.held = {x, dy: y};
                wake();
            }
        }
        state.lastY = y;
    };

    const handlePointerLeave = () => {
        const state = stateRef.current;
        state.lastY = null;
        if (state.held) release(state.held.x, state.held.dy);
    };

    // Touch cannot sweep across without scrolling, so a tap plucks where it lands.
    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || event.pointerType === "mouse") return;
        const {x, y} = localPoint(event);
        release(x, (y < 0 ? 1 : -1) * maxBend * 0.8);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (reduceMotion) return;
        release(stateRef.current.width * 0.27, maxBend * 0.85);
    };

    const flat = `M0 ${MID} L${width} ${MID}`;

    return (
        <div ref={wrapRef} className={`flex w-full items-center gap-3 ${className}`}>
            <div className="flex w-10 shrink-0 flex-col items-end leading-none" aria-hidden="true">
                <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-stone-700 dark:text-zinc-300">
                    <span ref={ledRef} className="h-1.5 w-1.5 rounded-full bg-amber-500 opacity-15 shadow-[0_0_6px_rgba(245,158,11,0.9)]"/>
                    {note}
                </span>
                {gauge && <span className="mt-1 font-mono text-[9px] tabular-nums text-stone-400 dark:text-zinc-600">{gauge}</span>}
            </div>
            <div
                role="button"
                tabIndex={0}
                aria-label={`Pluck the ${note} string`}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onPointerDown={handlePointerDown}
                onKeyDown={handleKeyDown}
                className="relative min-w-0 flex-1 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70"
            >
                <svg ref={svgRef} aria-hidden="true" height={HEIGHT} className="block w-full overflow-visible">
                    <defs>
                        {GHOSTS.map((_, index) => (
                            <path key={index} id={`${uid}-s${index}`} ref={(node) => { pathRefs.current[index] = node; }} d={flat} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        ))}
                        <filter id={`${uid}-glow`} filterUnits="userSpaceOnUse" x={-12} y={0} width={width + 24} height={HEIGHT}>
                            <feGaussianBlur stdDeviation="2.5"/>
                        </filter>
                    </defs>
                    {/* Nut and saddle. */}
                    <rect x={-2} y={MID - 6} width={3} height={12} rx={1} className="fill-stone-300 dark:fill-zinc-700"/>
                    <rect x={width - 1} y={MID - 6} width={3} height={12} rx={1} className="fill-stone-300 dark:fill-zinc-700"/>
                    <use ref={glowRef} href={`#${uid}-s0`} opacity={0} strokeWidth={thickness + 3} filter={`url(#${uid}-glow)`} className="stroke-amber-400 dark:stroke-amber-300"/>
                    <use href={`#${uid}-s2`} strokeWidth={thickness} opacity={0.12} className={wound ? "stroke-amber-800 dark:stroke-amber-600" : "stroke-zinc-500 dark:stroke-zinc-400"}/>
                    <use href={`#${uid}-s1`} strokeWidth={thickness} opacity={0.3} className={wound ? "stroke-amber-800 dark:stroke-amber-600" : "stroke-zinc-500 dark:stroke-zinc-400"}/>
                    <use href={`#${uid}-s0`} strokeWidth={thickness} className={wound ? "stroke-[#9a7b4f] dark:stroke-[#c9a56f]" : "stroke-zinc-500 dark:stroke-zinc-300"}/>
                    {wound && <use href={`#${uid}-s0`} strokeWidth={thickness} strokeDasharray="0.7 1.3" className="stroke-[#5c4630]/70 dark:stroke-[#6b5236]"/>}
                    {/* A thin specular line along the top edge makes the string read as round. */}
                    <use href={`#${uid}-s0`} strokeWidth={Math.max(0.4, thickness * 0.35)} transform={`translate(0 ${(-thickness * 0.22).toFixed(2)})`} className="stroke-white/70 dark:stroke-white/40"/>
                </svg>
            </div>
        </div>
    );
};
