import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {animate, motion, motionValue, useInView, useReducedMotion, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

/** How a channel's simulated signal behaves before the fader. */
export interface ChannelSignal {
    /** Average level in dBFS, e.g. -12. */
    level: number;
    /** Hits per beat for percussive sources, e.g. 1 for a four-on-the-floor kick, 2 for eighth notes. */
    pulse?: number;
    /** How quickly each hit dies away. Higher is shorter. */
    decay?: number;
    /** Chance from 0 to 1 that an eighth note is silent, for phrases with breaths between them. */
    gaps?: number;
    /** Slow wander of the level in dB. */
    drift?: number;
}

export interface MixerChannel {
    id: string;
    name: string;
    /** Starting fader position in dB. 0 is unity. */
    gain?: number;
    /** -1 is hard left, 1 is hard right. Only affects the master meters. */
    pan?: number;
    signal: ChannelSignal;
}

export interface ChannelStripProps {
    channels: MixerChannel[];
    /** Starting master fader position in dB. */
    masterGain?: number;
    /** Beats per minute that percussive signals follow. */
    tempo?: number;
    className?: string;
}

// Fader law: where each dB mark sits along the travel, bunched up at the bottom like a real 100 mm fader.
const LAW: [number, number][] = [
    [-90, 0],
    [-60, 0.05],
    [-40, 0.15],
    [-30, 0.26],
    [-20, 0.39],
    [-10, 0.55],
    [-5, 0.66],
    [0, 0.77],
    [5, 0.885],
    [10, 1],
];
const SCALE_MARKS = [10, 5, 0, -5, -10, -20, -30, -40, -60];
const UNITY = 0.77;
const TRAVEL = 176;
const CAP_H = 38;
const SEGMENTS = 22;
const SEGMENT = TRAVEL / SEGMENTS;
const METER_FLOOR = -48;
const METER_CEIL = 6;

const dbAt = (t: number) => {
    if (t <= 0.004) return -Infinity;
    for (let i = 1; i < LAW.length; i++) {
        const [db1, t1] = LAW[i];
        const [db0, t0] = LAW[i - 1];
        if (t <= t1) return db0 + ((t - t0) / (t1 - t0)) * (db1 - db0);
    }
    return 10;
};
const tAt = (db: number) => {
    for (let i = 1; i < LAW.length; i++) {
        const [db1, t1] = LAW[i];
        const [db0, t0] = LAW[i - 1];
        if (db <= db1) return t0 + ((Math.max(db, db0) - db0) / (db1 - db0)) * (t1 - t0);
    }
    return 1;
};
const formatDb = (db: number) => (db === -Infinity ? "−∞" : `${db > 0.05 ? "+" : db < -0.05 ? "−" : ""}${Math.abs(db).toFixed(1)}`);
const meterAt = (db: number) => Math.min(1, Math.max(0, (db - METER_FLOOR) / (METER_CEIL - METER_FLOOR)));
const quantize = (share: number) => Math.round(share * SEGMENTS) / SEGMENTS;

interface Meter {
    level: MotionValue<number>;
    peak: MotionValue<number>;
}

interface Strip {
    fader: MotionValue<number>;
    meters: Meter[];
    sim: {drift: number; jitter: number; gate: number; gateTarget: number; display: number[]; peak: number[]; hold: number[]};
}

const makeStrip = (gain: number, meters: number): Strip => ({
    fader: motionValue(tAt(gain)),
    meters: Array.from({length: meters}, () => ({level: motionValue(0), peak: motionValue(0)})),
    sim: {drift: 0, jitter: 0, gate: 1, gateTarget: 1, display: Array(meters).fill(-90), peak: Array(meters).fill(-90), hold: Array(meters).fill(0)},
});

const stripIn = (strips: Map<string, Strip>, id: string, gain: number, meters = 1) => {
    let strip = strips.get(id);
    if (!strip) {
        strip = makeStrip(gain, meters);
        strips.set(id, strip);
    }
    return strip;
};

// Lit segments sit on top of a dim copy of themselves and are revealed with clip-path, so a meter update is a
// single compositor-friendly style change instead of 22 elements switching on and off.
const LED_COLORS = `linear-gradient(to top, #22c55e 0 ${meterAt(-6) * 100}%, #fbbf24 ${meterAt(-6) * 100}% ${meterAt(0) * 100}%, #ef4444 ${meterAt(0) * 100}% 100%)`;
const LED_MASK = `repeating-linear-gradient(to top, #000 0 ${SEGMENT - 1.6}px, transparent ${SEGMENT - 1.6}px ${SEGMENT}px)`;

const MeterBar = ({meter}: {meter: Meter}) => {
    const clip = useTransform(meter.level, (level) => `inset(${(1 - level) * 100}% 0 0 0)`);
    const peakY = useTransform(meter.peak, (peak) => -Math.max(0, peak * TRAVEL - SEGMENT));
    // The held peak takes the colour of the zone it sits in, and hides when there is nothing to hold.
    const peakColor = useTransform(meter.peak, (peak) => (peak > meterAt(0) ? "#ef4444" : peak > meterAt(-6) ? "#fbbf24" : "#22c55e"));
    const peakOpacity = useTransform(meter.peak, (peak) => (peak > 0.02 ? 1 : 0));
    const segmentStyle = {background: LED_COLORS, WebkitMaskImage: LED_MASK, maskImage: LED_MASK};

    return (
        <div className="relative w-[5px] overflow-hidden" style={{height: TRAVEL}}>
            <div className="absolute inset-0 opacity-[0.16]" style={segmentStyle}/>
            <motion.div className="absolute inset-0" style={{...segmentStyle, clipPath: clip}}/>
            <motion.div className="absolute inset-x-0 bottom-0" style={{height: SEGMENT - 1.6, y: peakY, backgroundColor: peakColor, opacity: peakOpacity}}/>
        </div>
    );
};

interface FaderProps {
    name: string;
    value: MotionValue<number>;
    master?: boolean;
}

const Fader = ({name, value, master = false}: FaderProps) => {
    const reduceMotion = useReducedMotion();
    const capRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const capY = useTransform(value, (t) => (1 - t) * TRAVEL - CAP_H / 2);
    const readout = useTransform(value, (t) => formatDb(dbAt(t)));
    const grab = useRef<number | null>(null);

    // aria-valuenow follows the motion value directly, so dragging never re-renders the console.
    useEffect(() => {
        const sync = (t: number) => {
            const db = dbAt(t);
            capRef.current?.setAttribute("aria-valuenow", String(Math.round(t * 1000) / 10));
            capRef.current?.setAttribute("aria-valuetext", db === -Infinity ? "minus infinity" : `${db.toFixed(1)} dB`);
        };
        sync(value.get());
        return value.on("change", sync);
    }, [value]);

    const moveTo = (t: number, smooth: boolean) => {
        const next = Math.min(1, Math.max(0, t));
        if (smooth && !reduceMotion) animate(value, next, {type: "spring", stiffness: 500, damping: 40});
        else value.set(next);
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0 || !trackRef.current) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        capRef.current?.focus();
        const top = trackRef.current.getBoundingClientRect().top;
        const capCentre = top + (1 - value.get()) * TRAVEL;
        const onCap = capRef.current?.contains(event.target as Node);
        // Grabbing the cap keeps its offset under the finger; clicking the slot slides the cap there.
        grab.current = onCap ? event.clientY - capCentre : 0;
        if (!onCap) moveTo(1 - (event.clientY - top) / TRAVEL, true);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (grab.current === null || !trackRef.current) return;
        const top = trackRef.current.getBoundingClientRect().top;
        let t = 1 - (event.clientY - grab.current - top) / TRAVEL;
        // A small notch at unity, like the detent you feel on a console fader at 0 dB.
        if (Math.abs(t - UNITY) < 0.012) t = UNITY;
        moveTo(t, false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const t = value.get();
        const fine = event.shiftKey ? 0.25 : 1;
        const targets: Record<string, number> = {
            ArrowUp: t + 0.01 * fine,
            ArrowDown: t - 0.01 * fine,
            PageUp: t + 0.1,
            PageDown: t - 0.1,
            Home: 0,
            End: 1,
            Enter: UNITY,
        };
        if (!(event.key in targets)) return;
        event.preventDefault();
        moveTo(targets[event.key], event.key.length > 5);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                ref={trackRef}
                className="relative w-9 touch-none"
                style={{height: TRAVEL}}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={() => (grab.current = null)}
                onPointerCancel={() => (grab.current = null)}
                onDoubleClick={() => moveTo(UNITY, true)}
            >
                {/* Slot cut into the panel. */}
                <div className="absolute inset-y-[-4px] left-1/2 w-[5px] -translate-x-1/2 rounded-full bg-zinc-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.7)] dark:bg-black dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.06)]"/>
                <motion.div
                    ref={capRef}
                    role="slider"
                    tabIndex={0}
                    aria-label={`${name} fader`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    onKeyDown={handleKeyDown}
                    style={{y: capY, height: CAP_H}}
                    className={`absolute left-0 top-0 w-full cursor-grab rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 active:cursor-grabbing dark:focus-visible:ring-offset-zinc-900 ${
                        master
                            ? "bg-gradient-to-b from-red-400 via-red-600 to-red-800"
                            : "bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-500 dark:from-zinc-300 dark:via-zinc-400 dark:to-zinc-600"
                    } shadow-[0_6px_8px_-2px_rgba(0,0,0,0.45),0_2px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]`}
                >
                    {/* Grip ridges above and below a white index line. */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-x-1 top-1 h-[11px]"
                        style={{background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0 1px, rgba(255,255,255,0.45) 1px 2px, transparent 2px 3.5px)"}}
                    />
                    <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.4)]"/>
                    <span
                        aria-hidden="true"
                        className="absolute inset-x-1 bottom-1 h-[11px]"
                        style={{background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0 1px, rgba(255,255,255,0.45) 1px 2px, transparent 2px 3.5px)"}}
                    />
                </motion.div>
            </div>
            <motion.span className="w-11 rounded-[2px] bg-zinc-950 py-0.5 text-center font-mono text-[10px] tabular-nums text-amber-300 dark:bg-black">
                {readout}
            </motion.span>
        </div>
    );
};

const Scale = () => (
    <div aria-hidden="true" className="relative w-4" style={{height: TRAVEL}}>
        {SCALE_MARKS.map((db) => (
            <span
                key={db}
                className="absolute right-0 flex -translate-y-1/2 items-center gap-0.5 font-mono text-[8px] leading-none text-zinc-500 dark:text-zinc-500"
                style={{top: (1 - tAt(db)) * TRAVEL}}
            >
                {Math.abs(db)}
                <span className={`h-px ${db === 0 ? "w-1.5 bg-zinc-700 dark:bg-zinc-300" : "w-1 bg-zinc-400 dark:bg-zinc-600"}`}/>
            </span>
        ))}
    </div>
);

const buttonBase =
    "h-[18px] w-[22px] rounded-[3px] font-mono text-[9px] font-bold transition-[background-color,color,box-shadow] duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-[0_1px_0_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.4)]";
const buttonOff = "bg-zinc-300 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]";

/**
 * A compact mixing console. Each channel has a fader with a unity notch, mute and solo, and an LED meter with
 * peak hold driven by a simulated signal that follows the tempo. The master meters sum what you can hear.
 * The meters stop while the console is off screen.
 */
export const ChannelStrip = ({channels, masterGain = 0, tempo = 120, className = ""}: ChannelStripProps) => {
    const reduceMotion = useReducedMotion();
    const rootRef = useRef<HTMLDivElement>(null);
    const inView = useInView(rootRef);
    const [muted, setMuted] = useState<string[]>([]);
    const [soloed, setSoloed] = useState<string[]>([]);

    // Faders and meters are motion values kept per channel id, so they survive re-renders and never cause one.
    const strips = useRef(new Map<string, Strip>());
    const master = stripIn(strips.current, "__master", masterGain, 2);
    const clip = useRef(motionValue(0)).current;

    const live = useRef({channels, muted, soloed, tempo});
    live.current = {channels, muted, soloed, tempo};

    useEffect(() => {
        if (!inView) return;
        let frame = 0;
        let last = performance.now();
        let lastCommit = 0;
        let lastEighth = -1;
        let clipUntil = 0;

        const tick = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            const {channels: list, muted: mutes, soloed: solos, tempo: bpm} = live.current;
            const beat = (now / 1000) * (bpm / 60);
            const eighth = Math.floor(beat * 2);
            const newEighth = eighth !== lastEighth;
            lastEighth = eighth;
            // With reduced motion the meters still read true, but refresh four times a second instead of every frame.
            const commit = !reduceMotion || now - lastCommit > 250;
            if (commit) lastCommit = now;
            let left = 0;
            let right = 0;

            const ballistics = (strip: Strip, index: number, db: number) => {
                const {sim} = strip;
                sim.display[index] = db > sim.display[index] ? db : Math.max(db, sim.display[index] - 26 * dt);
                if (sim.display[index] >= sim.peak[index]) {
                    sim.peak[index] = sim.display[index];
                    sim.hold[index] = now + 1400;
                } else if (now > sim.hold[index]) {
                    sim.peak[index] -= 20 * dt;
                }
                if (!commit) return;
                strip.meters[index].level.set(quantize(meterAt(reduceMotion ? db : sim.display[index])));
                strip.meters[index].peak.set(quantize(meterAt(sim.peak[index])));
            };

            list.forEach((channel) => {
                const strip = stripIn(strips.current, channel.id, channel.gain ?? 0);
                const {sim} = strip;
                const signal = channel.signal;
                // Smoothed noise: a slow random walk pulled back to zero, plus faster jitter eased towards a new target.
                sim.drift = sim.drift * (1 - dt * 0.6) + (Math.random() - 0.5) * dt * 8 * (signal.drift ?? 2);
                sim.jitter += ((Math.random() - 0.5) * 4 - sim.jitter) * Math.min(1, dt * 18);
                // Gaps fade in and out rather than cutting, like breaths between sung phrases.
                if (newEighth) sim.gateTarget = Math.random() < (signal.gaps ?? 0) ? 0 : 1;
                sim.gate += (sim.gateTarget - sim.gate) * Math.min(1, dt * 14);
                let db = signal.level + sim.drift + sim.jitter;
                if (signal.pulse) {
                    const phase = (beat * signal.pulse) % 1;
                    db += (Math.exp(-phase * (signal.decay ?? 8)) - 1) * 20 + 4;
                }
                const audible = !mutes.includes(channel.id) && (solos.length === 0 || solos.includes(channel.id));
                const amplitude = Math.pow(10, db / 20) * sim.gate * (audible ? 1 : 0) * Math.pow(10, dbAt(strip.fader.get()) / 20);
                const post = amplitude > 0 ? 20 * Math.log10(amplitude) : -90;
                ballistics(strip, 0, post);
                const pan = ((channel.pan ?? 0) + 1) * (Math.PI / 4);
                left += (amplitude * Math.cos(pan)) ** 2;
                right += (amplitude * Math.sin(pan)) ** 2;
            });

            // Uncorrelated sources add up in power, not amplitude.
            const masterLinear = Math.pow(10, dbAt(master.fader.get()) / 20) * Math.SQRT2;
            [left, right].forEach((power, index) => {
                const amplitude = Math.sqrt(power) * masterLinear;
                const db = amplitude > 0 ? 20 * Math.log10(amplitude) : -90;
                if (db > 0) clipUntil = now + 1500;
                ballistics(master, index, db);
            });
            if (commit) clip.set(now < clipUntil ? 1 : 0);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduceMotion, clip, master]);

    const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
    const clipOpacity = useTransform(clip, (on) => (on ? 1 : 0.18));

    return (
        <div ref={rootRef} className={`w-full max-w-[34rem] overflow-x-auto ${className}`}>
            <div className="mx-auto flex w-max rounded-lg border border-zinc-300 bg-gradient-to-b from-zinc-100 to-zinc-200 p-3 shadow-[inset_0_1px_0_white,0_10px_30px_-12px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_30px_-12px_rgba(0,0,0,0.8)]">
                {channels.map((channel, index) => {
                    const strip = stripIn(strips.current, channel.id, channel.gain ?? 0);
                    const isMuted = muted.includes(channel.id);
                    const isSoloed = soloed.includes(channel.id);
                    return (
                        <div key={channel.id} className="flex flex-col items-center gap-2.5 border-r border-zinc-300 px-2 dark:border-zinc-800">
                            {/* Scribble strip: a torn bit of masking tape, each stuck on at its own angle. */}
                            <span
                                className="w-full truncate bg-[#f1e9d2] px-1 py-0.5 text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-800 shadow-[0_1px_1px_rgba(0,0,0,0.15)] dark:bg-[#cfc6ad]"
                                style={{transform: `rotate(${[-1.2, 0.8, -0.4, 1.1, -0.9][index % 5]}deg)`}}
                            >
                                {channel.name}
                            </span>
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    aria-pressed={isMuted}
                                    aria-label={`Mute ${channel.name}`}
                                    onClick={() => setMuted((list) => toggle(list, channel.id))}
                                    className={`${buttonBase} ${isMuted ? "bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.55),inset_0_1px_0_rgba(255,255,255,0.4)]" : buttonOff}`}
                                >
                                    M
                                </button>
                                <button
                                    type="button"
                                    aria-pressed={isSoloed}
                                    aria-label={`Solo ${channel.name}`}
                                    onClick={() => setSoloed((list) => toggle(list, channel.id))}
                                    className={`${buttonBase} ${isSoloed ? "bg-amber-400 text-zinc-900 shadow-[0_0_10px_rgba(251,191,36,0.55),inset_0_1px_0_rgba(255,255,255,0.5)]" : buttonOff}`}
                                >
                                    S
                                </button>
                            </div>
                            <div className="flex items-start gap-1">
                                <Scale/>
                                <Fader name={channel.name} value={strip.fader}/>
                                <div className="rounded-[2px] bg-zinc-950 p-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                                    <MeterBar meter={strip.meters[0]}/>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="flex flex-col items-center gap-2.5 pl-3">
                    <span className="w-full bg-zinc-900 px-1 py-0.5 text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
                        Master
                    </span>
                    <div className="flex h-[18px] items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                        <motion.span aria-hidden="true" style={{opacity: clipOpacity}} className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]"/>
                        Clip
                    </div>
                    <div className="flex items-start gap-1">
                        <Scale/>
                        <Fader name="Master" value={master.fader} master/>
                        <div className="flex gap-[2px] rounded-[2px] bg-zinc-950 p-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                            <MeterBar meter={master.meters[0]}/>
                            <MeterBar meter={master.meters[1]}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
