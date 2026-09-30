import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {ComponentType} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";
import {LuFastForward, LuPlay, LuRewind, LuSquare} from "react-icons/lu";

export interface CassetteTrack {
    title: string;
    artist?: string;
    /** Length in seconds. */
    duration: number;
}

export type CassetteMode = "stop" | "play" | "rewind" | "forward";

export interface CassetteDeckProps {
    /** Written by hand on the cassette label. */
    title: string;
    tracks: CassetteTrack[];
    side?: "A" | "B";
    /** Printed along the bottom of the shell. */
    tapeType?: string;
    /** How many times faster than play the tape winds. Real decks manage 20 to 30. */
    windSpeed?: number;
    onPlay?: () => void;
    onStop?: () => void;
    /** Called whenever a transport key latches or the tape runs out and the keys pop up. */
    onModeChange?: (mode: CassetteMode) => void;
    /** Called when winding stops. Time is in seconds from the start of the side. */
    onSeek?: (time: number) => void;
    className?: string;
}

// Cassette geometry in a 200 x 128 box, close to the real 100 x 64 mm shell.
const LEFT = {x: 57.5, y: 66};
const RIGHT = {x: 142.5, y: 66};
const HUB = 10;
const FULL = 32;
const GUIDE_L = {x: 22, y: 112};
const GUIDE_R = {x: 178, y: 112};
// Degrees per second for one unit of tape speed on a bare hub.
const SPIN = 1800;
// Hub turns counted by the take-up spindle over a whole side.
const COUNTER_SPAN = 640;

// Point where tape leaving `from` touches the reel. `side` picks the outer tangent.
const tangent = (from: {x: number; y: number}, center: {x: number; y: number}, radius: number, side: 1 | -1) => {
    const dx = from.x - center.x;
    const dy = from.y - center.y;
    const distance = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) + side * Math.acos(Math.min(radius / distance, 1));
    return `${(center.x + radius * Math.cos(angle)).toFixed(2)},${(center.y + radius * Math.sin(angle)).toFixed(2)}`;
};

const format = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

interface Reel {
    center: {x: number; y: number};
    pack: (el: SVGCircleElement | null) => void;
    hub: (el: SVGGElement | null) => void;
    blur: (el: SVGCircleElement | null) => void;
}

interface KeyProps {
    label: string;
    caption: string;
    icon: ComponentType<{className?: string}>;
    down: boolean;
    accent?: boolean;
    still: boolean;
    onPress: () => void;
}

// A piano key in a slot. The cap's front face is a hard box shadow; the slot clips it, so when the cap
// sinks the face disappears into the deck the way a real key does.
const TransportKey = ({label, caption, icon: Icon, down, accent, still, onPress}: KeyProps) => (
    <button
        type="button"
        aria-label={label}
        aria-pressed={down}
        onClick={onPress}
        className="group relative h-[62px] flex-1 overflow-hidden rounded-[5px] bg-stone-800 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-200 dark:bg-black dark:focus-visible:ring-offset-zinc-900"
    >
        <motion.span
            className="absolute inset-x-[3px] top-[3px] flex h-[50px] flex-col items-center justify-center gap-1 rounded-[4px] bg-gradient-to-b from-stone-50 to-stone-200 text-stone-700 shadow-[0_7px_0_#a8a29e,0_9px_10px_rgba(0,0,0,0.45)] dark:from-zinc-600 dark:to-zinc-700 dark:text-zinc-100 dark:shadow-[0_7px_0_#27272a,0_9px_10px_rgba(0,0,0,0.6)]"
            initial={false}
            animate={{y: down ? (still ? 5 : [null, 7.5, 5]) : 0}}
            transition={down ? {duration: 0.16, times: [0, 0.55, 1], ease: [0.3, 0, 0.2, 1]} : {type: "spring", stiffness: 900, damping: 24}}
        >
            {accent && <span className="absolute inset-x-2 top-1 h-[2px] rounded-full bg-orange-500"/>}
            <Icon className="h-4 w-4"/>
            <span className="font-mono text-[9px] font-semibold tracking-[0.16em]">{caption}</span>
        </motion.span>
    </button>
);

// A cassette deck. Tape speed is the one real quantity: each reel's radius follows from how much tape
// it holds (area is conserved), and its spin is tape speed divided by radius, so the nearly empty reel
// always turns fastest. The counter is driven by the take-up spindle like a real one, which is why it
// runs faster at the start of a side than at the end.
export const CassetteDeck = ({
    title,
    tracks,
    side = "A",
    tapeType = "C60 · Type II · High bias",
    windSpeed = 24,
    onPlay,
    onStop,
    onModeChange,
    onSeek,
    className = "",
}: CassetteDeckProps) => {
    const uid = useId().replace(/:/g, "");
    const reduceMotion = useReducedMotion() ?? false;
    const rootRef = useRef<HTMLDivElement>(null);
    const inView = useInView(rootRef);

    const [mode, setModeState] = useState<CassetteMode>("stop");
    const [stopDown, setStopDown] = useState(false);
    const [second, setSecond] = useState(0);
    const modeRef = useRef<CassetteMode>("stop");

    const total = tracks.reduce((sum, track) => sum + track.duration, 0);
    const starts = useMemo(() => {
        let sum = 0;
        return tracks.map((track) => {
            const start = sum;
            sum += track.duration;
            return start;
        });
    }, [tracks]);

    const tape = useRef({time: 0, speed: 0, angleL: 0, angleR: 0, counterOffset: 0, counter: 0});
    const els = useRef<{
        packL?: SVGCircleElement | null;
        packR?: SVGCircleElement | null;
        hubL?: SVGGElement | null;
        hubR?: SVGGElement | null;
        blurL?: SVGCircleElement | null;
        blurR?: SVGCircleElement | null;
        path?: SVGPolylineElement | null;
        wheels: (HTMLSpanElement | null)[];
    }>({wheels: []});
    const callbacks = useRef({onModeChange, onSeek, onStop});
    callbacks.current = {onModeChange, onSeek, onStop};

    const setMode = (next: CassetteMode) => {
        const previous = modeRef.current;
        if (previous === next) return;
        modeRef.current = next;
        setModeState(next);
        callbacks.current.onModeChange?.(next);
        if (next === "play") onPlay?.();
        if (previous === "play") callbacks.current.onStop?.();
        if (previous === "rewind" || previous === "forward") callbacks.current.onSeek?.(tape.current.time);
    };

    const press = (next: CassetteMode) => {
        const t = tape.current.time;
        // A latched key refuses to go down when the tape is already at that end.
        if ((next === "play" || next === "forward") && t >= total - 0.05) return;
        if (next === "rewind" && t <= 0.05) return;
        setMode(modeRef.current === next ? "stop" : next);
    };

    const stop = () => {
        setStopDown(true);
        window.setTimeout(() => setStopDown(false), 170);
        setMode("stop");
    };

    useEffect(() => {
        if (!inView) return;
        let frame = 0;
        let last = performance.now();
        let lastSecond = -1;

        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            const s = tape.current;
            const current = modeRef.current;
            const target = current === "play" ? 1 : current === "forward" ? windSpeed : current === "rewind" ? -windSpeed : 0;
            // The capstan grabs the tape almost at once; winding has to spin the heavy reels up and down.
            const rate = Math.abs(target) <= 1 && Math.abs(s.speed) <= 1.5 ? 12 : 2.4;
            s.speed = reduceMotion ? target : s.speed + (target - s.speed) * (1 - Math.exp(-dt * rate));
            if (target === 0 && Math.abs(s.speed) < 0.02) s.speed = 0;
            s.time += s.speed * dt;

            if (s.time >= total || s.time <= 0) {
                s.time = Math.min(Math.max(s.time, 0), total);
                s.speed = 0;
                // End of tape: the mechanism trips and every key pops back up.
                if (current !== "stop") {
                    modeRef.current = "stop";
                    setModeState("stop");
                    callbacks.current.onModeChange?.("stop");
                    if (current === "play") callbacks.current.onStop?.();
                    else callbacks.current.onSeek?.(s.time);
                }
            }

            const p = total > 0 ? s.time / total : 0;
            const rL = Math.sqrt(HUB * HUB + (1 - p) * (FULL * FULL - HUB * HUB));
            const rR = Math.sqrt(HUB * HUB + p * (FULL * FULL - HUB * HUB));
            const omegaL = (s.speed * SPIN * HUB) / rL;
            const omegaR = (s.speed * SPIN * HUB) / rR;
            // Past roughly 25 deg per frame a six-spoke hub strobes backwards, so the drawn step is capped
            // and a motion-blurred disc fades in instead.
            if (!reduceMotion) {
                s.angleL += Math.max(-22, Math.min(22, omegaL * dt));
                s.angleR += Math.max(-22, Math.min(22, omegaR * dt));
            }

            const e = els.current;
            e.packL?.setAttribute("r", rL.toFixed(2));
            e.packR?.setAttribute("r", rR.toFixed(2));
            e.hubL?.setAttribute("transform", `rotate(${s.angleL % 360} ${LEFT.x} ${LEFT.y})`);
            e.hubR?.setAttribute("transform", `rotate(${s.angleR % 360} ${RIGHT.x} ${RIGHT.y})`);
            const blurL = Math.min(Math.max((Math.abs(omegaL) - 500) / 900, 0), 1);
            const blurR = Math.min(Math.max((Math.abs(omegaR) - 500) / 900, 0), 1);
            e.blurL?.setAttribute("opacity", String(blurL));
            e.blurR?.setAttribute("opacity", String(blurR));
            e.hubL?.setAttribute("opacity", String(1 - blurL * 0.75));
            e.hubR?.setAttribute("opacity", String(1 - blurR * 0.75));
            e.path?.setAttribute(
                "points",
                `${tangent(GUIDE_L, LEFT, rL, -1)} ${GUIDE_L.x - 3},${GUIDE_L.y + 1} ${GUIDE_L.x},${GUIDE_L.y + 4} ${GUIDE_R.x},${GUIDE_R.y + 4} ${GUIDE_R.x + 3},${GUIDE_R.y + 1} ${tangent(GUIDE_R, RIGHT, rR, 1)}`,
            );

            // Mechanical counter: turns of the take-up spindle equal the layers of tape wound onto it.
            const raw = (COUNTER_SPAN * (rR - HUB)) / (FULL - HUB);
            s.counter = raw;
            const count = (((raw - s.counterOffset) % 1000) + 1000) % 1000;
            const ones = count % 10;
            const carry = Math.max(0, ones - 9);
            const tens = (Math.floor(count / 10) % 10) + carry;
            const hundreds = (Math.floor(count / 100) % 10) + (Math.floor(count / 10) % 10 === 9 ? carry : 0);
            [hundreds, tens, ones].forEach((value, index) => {
                const wheel = e.wheels[index];
                if (wheel) wheel.style.transform = `translateY(${(-value / 11) * 100}%)`;
            });

            const whole = Math.floor(s.time);
            if (whole !== lastSecond) {
                lastSecond = whole;
                setSecond(whole);
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduceMotion, total, windSpeed]);

    let trackIndex = 0;
    starts.forEach((start, index) => {
        if (second >= start) trackIndex = index;
    });
    const track = tracks[trackIndex];
    const winding = mode === "forward" || mode === "rewind";

    const reels: Reel[] = [
        {center: LEFT, pack: (el) => (els.current.packL = el), hub: (el) => (els.current.hubL = el), blur: (el) => (els.current.blurL = el)},
        {center: RIGHT, pack: (el) => (els.current.packR = el), hub: (el) => (els.current.hubR = el), blur: (el) => (els.current.blurR = el)},
    ];

    return (
        <div
            ref={rootRef}
            className={`w-full max-w-[520px] rounded-[20px] bg-gradient-to-b from-stone-200 to-stone-300 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_50px_-26px_rgba(28,25,23,0.6)] dark:from-zinc-800 dark:to-zinc-900 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_50px_-24px_rgba(0,0,0,0.9)] sm:p-4 ${className}`}
        >
            <div className="relative overflow-hidden rounded-xl bg-[#1a1918] p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] sm:p-4">
                <svg viewBox="0 0 200 128" className="block w-full" role="img" aria-label={`Cassette, side ${side}: ${title}`}>
                    <defs>
                        <radialGradient id={`${uid}-tape`}>
                            <stop offset="0.3" stopColor="#3b2417"/>
                            <stop offset="0.85" stopColor="#5a3826"/>
                            <stop offset="1" stopColor="#2b1a10"/>
                        </radialGradient>
                        <radialGradient id={`${uid}-blur`}>
                            <stop offset="0.35" stopColor="#e7e5e4" stopOpacity="0"/>
                            <stop offset="0.45" stopColor="#e7e5e4" stopOpacity="0.55"/>
                            <stop offset="0.95" stopColor="#d6d3d1" stopOpacity="0.8"/>
                            <stop offset="1" stopColor="#d6d3d1" stopOpacity="0"/>
                        </radialGradient>
                        <linearGradient id={`${uid}-shell`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#57534e" stopOpacity="0.55"/>
                            <stop offset="1" stopColor="#292524" stopOpacity="0.75"/>
                        </linearGradient>
                    </defs>

                    {/* Tape packs sit behind the smoked shell. */}
                    {reels.map((reel) => (
                        <g key={reel.center.x}>
                            <circle ref={reel.pack} cx={reel.center.x} cy={reel.center.y} r={reel.center === LEFT ? FULL : HUB} fill={`url(#${uid}-tape)`}/>
                            <circle cx={reel.center.x} cy={reel.center.y} r={HUB + 0.8} fill="#1c1917"/>
                        </g>
                    ))}
                    <polyline ref={(el) => (els.current.path = el)} fill="none" stroke="#4a2e1e" strokeWidth="1.3" strokeLinejoin="round"/>

                    <rect x="2" y="2" width="196" height="124" rx="7" fill={`url(#${uid}-shell)`} stroke="#78716c" strokeOpacity="0.5" strokeWidth="0.6"/>
                    <path d="M40 126L47 103H153L160 126" fill="#1c1917" fillOpacity="0.7" stroke="#78716c" strokeOpacity="0.4" strokeWidth="0.5"/>
                    <rect x="78" y="52" width="44" height="28" rx="2.5" fill="#0c0a09" fillOpacity="0.35" stroke="#a8a29e" strokeOpacity="0.35" strokeWidth="0.5"/>
                    {[88, 94, 100, 106, 112].map((x) => (
                        <line key={x} x1={x} y1="76" x2={x} y2="79" stroke="#d6d3d1" strokeOpacity="0.5" strokeWidth="0.4"/>
                    ))}

                    {/* Hubs above the shell so the teeth read clearly. */}
                    {reels.map((reel) => (
                        <g key={`hub-${reel.center.x}`}>
                            <g ref={reel.hub}>
                                <circle cx={reel.center.x} cy={reel.center.y} r={HUB} fill="#e7e5e4"/>
                                <circle cx={reel.center.x} cy={reel.center.y} r="5.2" fill="#1c1917"/>
                                {[0, 60, 120, 180, 240, 300].map((angle) => (
                                    <rect
                                        key={angle}
                                        x={reel.center.x - 0.9}
                                        y={reel.center.y - 5.4}
                                        width="1.8"
                                        height="2.2"
                                        fill="#e7e5e4"
                                        transform={`rotate(${angle} ${reel.center.x} ${reel.center.y})`}
                                    />
                                ))}
                                <circle cx={reel.center.x + 7.2} cy={reel.center.y} r="0.9" fill="#a8a29e"/>
                            </g>
                            <circle ref={reel.blur} cx={reel.center.x} cy={reel.center.y} r={HUB} fill={`url(#${uid}-blur)`} opacity="0"/>
                        </g>
                    ))}

                    {[GUIDE_L, GUIDE_R].map((guide) => (
                        <circle key={guide.x} cx={guide.x} cy={guide.y} r="2.6" fill="#d6d3d1" stroke="#57534e" strokeWidth="0.5"/>
                    ))}
                    {[
                        [9, 9],
                        [191, 9],
                        [9, 119],
                        [191, 119],
                        [100, 96],
                    ].map(([x, y]) => (
                        <g key={`${x}-${y}`}>
                            <circle cx={x} cy={y} r="2.3" fill="#a8a29e"/>
                            <path d={`M${x - 1.4} ${y}H${x + 1.4}M${x} ${y - 1.4}V${y + 1.4}`} stroke="#44403c" strokeWidth="0.6"/>
                        </g>
                    ))}

                    {/* Label */}
                    <rect x="14" y="7" width="172" height="27" rx="2.5" fill="#f4eee1"/>
                    <rect x="14" y="7" width="172" height="5" rx="2.5" fill="#e4572e"/>
                    <rect x="14" y="10" width="172" height="2" fill="#e4572e"/>
                    <line x1="22" y1="29.5" x2="164" y2="29.5" stroke="#a8a29e" strokeWidth="0.35"/>
                    <text
                        x="24"
                        y="27"
                        fontSize="11"
                        fill="#1e3a8a"
                        transform="rotate(-1.5 24 27)"
                        style={{fontFamily: "\"Marker Felt\", \"Bradley Hand\", \"Segoe Print\", \"Chalkboard SE\", cursive"}}
                    >
                        {title}
                    </text>
                    <rect x="168" y="15" width="13" height="15" rx="1.5" fill="#1c1917"/>
                    <text x="174.5" y="26.4" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f4eee1" fontFamily="ui-sans-serif, system-ui">
                        {side}
                    </text>
                    <text x="100" y="116" textAnchor="middle" fontSize="4.2" letterSpacing="1" fill="#d6d3d1" fillOpacity="0.75" fontFamily="ui-monospace, monospace" style={{textTransform: "uppercase"}}>
                        {tapeType}
                    </text>

                    {/* Deck parts that rise into the shell when play latches: erase and play heads, pinch roller. */}
                    <motion.g initial={false} animate={{y: mode === "play" ? -4 : 0}} transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 500, damping: 30}}>
                        <rect x="92" y="124" width="16" height="6" rx="1" fill="#d4d4d8" stroke="#52525b" strokeWidth="0.4"/>
                        <rect x="66" y="125" width="8" height="5" rx="1" fill="#a1a1aa"/>
                        <circle cx="130" cy="128.5" r="4" fill="#18181b" stroke="#3f3f46" strokeWidth="0.5"/>
                    </motion.g>
                </svg>
                {/* Door glass */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(112deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_34%,transparent_35%,transparent_70%,rgba(255,255,255,0.04)_71%,transparent_78%)]"/>
            </div>

            <div className="mt-3 flex items-center gap-3 px-1">
                <div className="flex items-center gap-1.5">
                    <div className="flex rounded-[4px] bg-stone-900 p-[3px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] dark:bg-black" role="img" aria-label="Tape counter">
                        {[0, 1, 2].map((index) => (
                            <span key={index} className="relative mx-[1px] h-[22px] w-[15px] overflow-hidden rounded-[2px] bg-gradient-to-b from-zinc-700 via-zinc-900 to-zinc-700">
                                <span ref={(el) => (els.current.wheels[index] = el)} className="absolute inset-x-0 top-0 flex flex-col font-mono text-[15px] font-semibold leading-[22px] text-stone-100 will-change-transform">
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit, i) => (
                                        <span key={i} className="h-[22px] text-center tabular-nums">{digit}</span>
                                    ))}
                                </span>
                                {/* Drum curvature */}
                                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.65),transparent_35%,transparent_65%,rgba(0,0,0,0.65))]"/>
                            </span>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => (tape.current.counterOffset = tape.current.counter)}
                        aria-label="Reset tape counter"
                        className="h-5 w-5 rounded-full bg-gradient-to-b from-stone-100 to-stone-300 shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_-1px_0_rgba(0,0,0,0.15)] transition-transform active:translate-y-px active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:from-zinc-500 dark:to-zinc-700"
                    />
                </div>
                <div className="min-w-0 flex-1 rounded-md bg-stone-100/70 px-2.5 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] dark:bg-black/30" aria-live="polite">
                    <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-stone-500 dark:text-zinc-400">
                        <span className={`h-1.5 w-1.5 rounded-full ${mode === "play" ? "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.8)]" : winding ? "bg-amber-400" : "bg-stone-400 dark:bg-zinc-600"}`}/>
                        {mode === "play" ? "Play" : winding ? (mode === "forward" ? "Wind ▸▸" : "◂◂ Rewind") : "Stop"}
                        <span className="ml-auto tabular-nums">{format(second)}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs text-stone-800 dark:text-zinc-200">
                        <span className="font-mono text-stone-400 dark:text-zinc-500">{String(trackIndex + 1).padStart(2, "0")}</span> {track?.title}
                        {track?.artist && <span className="text-stone-500 dark:text-zinc-400"> · {track.artist}</span>}
                    </p>
                </div>
            </div>

            <div role="group" aria-label="Transport" className="mt-3 flex gap-1.5 rounded-lg bg-stone-400/40 p-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)] dark:bg-black/40">
                <TransportKey label="Rewind" caption="REW" icon={LuRewind} down={mode === "rewind"} still={reduceMotion} onPress={() => press("rewind")}/>
                <TransportKey label="Play" caption="PLAY" icon={LuPlay} down={mode === "play"} accent still={reduceMotion} onPress={() => press("play")}/>
                <TransportKey label="Stop" caption="STOP" icon={LuSquare} down={stopDown} still={reduceMotion} onPress={stop}/>
                <TransportKey label="Fast forward" caption="F.FWD" icon={LuFastForward} down={mode === "forward"} still={reduceMotion} onPress={() => press("forward")}/>
            </div>
        </div>
    );
};
