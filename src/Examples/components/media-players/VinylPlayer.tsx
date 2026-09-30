import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {useInView, useReducedMotion} from "framer-motion";
import {LuPause, LuPlay} from "react-icons/lu";

export interface VinylTrack {
    id: string;
    title: string;
    /** Length in seconds. */
    duration: number;
}

export interface VinylAlbum {
    title: string;
    artist: string;
    /** Record label printed around the bottom of the center label. */
    label?: string;
    /** Catalog number, e.g. "HLY-014". */
    catalog?: string;
    year?: number;
}

export interface VinylPlayerProps {
    album: VinylAlbum;
    /** Tracks on the side, in groove order from the outer edge inward. */
    tracks: VinylTrack[];
    /** Paper color of the center label. */
    labelColor?: string;
    rpm?: 33 | 45;
    onPlay?: () => void;
    onPause?: () => void;
    /** Called after a scratch, a key press or a track pick. Time is in seconds from the start of the side. */
    onSeek?: (time: number) => void;
    onTrackChange?: (track: VinylTrack, index: number) => void;
    className?: string;
}

// Plinth geometry in a 100 x 90 box. The HTML record and the SVG tonearm share it.
const CX = 43;
const CY = 45;
const RECORD_R = 39;
const PLATTER_R = 41.5;
const PIVOT_X = 88;
const PIVOT_Y = 14;
const ARM_LENGTH = 62;
// Where the music sits, as a share of the record radius.
const GROOVE_OUT = 0.955;
const GROOVE_IN = 0.46;
const LABEL = 0.34;

// Distance from the record center to the stylus when the arm is turned by `degrees`.
const stylusDistance = (degrees: number) => {
    const t = (degrees * Math.PI) / 180;
    return Math.hypot(PIVOT_X - ARM_LENGTH * Math.sin(t) - CX, PIVOT_Y + ARM_LENGTH * Math.cos(t) - CY);
};

// The arm swings on an arc, so the angle for a groove radius is not linear. Bisection is plenty
// fast for one lookup per frame.
const armAngleFor = (distance: number) => {
    let low = 0;
    let high = 60;
    for (let i = 0; i < 18; i++) {
        const mid = (low + high) / 2;
        if (stylusDistance(mid) > distance) low = mid;
        else high = mid;
    }
    return (low + high) / 2;
};

const format = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const percent = (value: number, of: number) => `${(value / of) * 100}%`;

const ArmShape = ({shadow, metal}: {shadow?: boolean; metal: string}) => (
    <>
        <rect x="84.6" y="1.2" width="6.8" height="8.2" rx="1.7" fill={shadow ? "#000" : "#3f3f46"}/>
        <rect x="85.3" y="2.4" width="5.4" height="0.5" fill={shadow ? "none" : "#71717a"}/>
        <rect x="87.25" y="8" width="1.5" height="61" rx="0.75" fill={shadow ? "#000" : `url(#${metal})`}/>
        <path d="M85.9 68.4h4.2l0.5 8.6h-5.1z" fill={shadow ? "#000" : "#18181b"}/>
        <path d="M90.5 69.6l3.2-1.4" stroke={shadow ? "#000" : "#a1a1aa"} strokeWidth="0.7" strokeLinecap="round"/>
        <circle cx={PIVOT_X} cy={PIVOT_Y} r="3.1" fill={shadow ? "#000" : `url(#${metal})`}/>
        {!shadow && <circle cx="88" cy="76.2" r="0.55" fill="#f97316"/>}
    </>
);

// A turntable. The record keeps its angle and speed between frames, so it spins up and coasts down
// instead of jumping, and a grabbed record turns with the pointer. Playback time is derived from the
// rotation itself: one turn is 60 / rpm seconds, which is why scratching scrubs the music.
export const VinylPlayer = ({
    album,
    tracks,
    labelColor = "#e4572e",
    rpm = 33,
    onPlay,
    onPause,
    onSeek,
    onTrackChange,
    className = "",
}: VinylPlayerProps) => {
    const uid = useId().replace(/:/g, "");
    const reduceMotion = useReducedMotion() ?? false;
    const rootRef = useRef<HTMLDivElement>(null);
    const inView = useInView(rootRef);
    const recordRef = useRef<HTMLDivElement>(null);
    const platterRef = useRef<HTMLDivElement>(null);
    const armRef = useRef<SVGGElement>(null);
    const shadowRef = useRef<SVGGElement>(null);

    const [playing, setPlaying] = useState(false);
    const [clock, setClock] = useState(0);
    const [trackIndex, setTrackIndex] = useState(0);
    const [scratching, setScratching] = useState(false);

    const starts = useMemo(() => {
        let sum = 0;
        return tracks.map((track) => {
            const start = sum;
            sum += track.duration;
            return start;
        });
    }, [tracks]);
    const total = tracks.reduce((sum, track) => sum + track.duration, 0);
    // Degrees per second at full speed: 33 1/3 rpm is 200 deg/s.
    const nominal = rpm === 33 ? 200 : 270;

    const physics = useRef({angle: 0, velocity: 0, time: 0, arm: 0, armVelocity: 0, scratching: false, pointerAngle: 0, pointerTime: 0});
    const playingRef = useRef(false);
    const trackRef = useRef(0);
    const callbacks = useRef({onPause, onTrackChange, tracks});
    callbacks.current = {onPause, onTrackChange, tracks};

    const setPlayback = (next: boolean) => {
        playingRef.current = next;
        setPlaying(next);
        if (next) onPlay?.();
        else onPause?.();
    };

    const toggle = () => {
        if (!playingRef.current && physics.current.time >= total - 0.05) physics.current.time = 0;
        setPlayback(!playingRef.current);
    };

    const seek = (time: number) => {
        physics.current.time = Math.min(Math.max(time, 0), total - 0.01);
        setClock(Math.floor(physics.current.time));
        onSeek?.(physics.current.time);
    };

    const pickTrack = (index: number) => {
        seek(starts[index]);
        if (!playingRef.current) setPlayback(true);
    };

    useEffect(() => {
        if (!inView) return;
        let frame = 0;
        let last = performance.now();
        let lastSecond = -1;

        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            const s = physics.current;
            const target = playingRef.current ? nominal : 0;

            if (s.scratching) {
                // A still hand holds the record still, so the release starts from the hand's speed.
                s.velocity *= Math.exp(-dt * 10);
            } else {
                if (reduceMotion) s.velocity = target;
                else {
                    // The motor pulls the platter up faster than friction lets it coast down.
                    const rate = Math.abs(target) > Math.abs(s.velocity) ? 2.8 : 1.3;
                    s.velocity += (target - s.velocity) * (1 - Math.exp(-dt * rate));
                    if (target === 0 && Math.abs(s.velocity) < 0.4) s.velocity = 0;
                }
                const turned = s.velocity * dt;
                s.angle += turned;
                s.time += turned / nominal;
            }

            if (s.time < 0) s.time = 0;
            if (s.time >= total) {
                s.time = total;
                if (playingRef.current) {
                    playingRef.current = false;
                    setPlaying(false);
                    callbacks.current.onPause?.();
                }
            }

            // The arm sits on the record while it plays or is being scratched and follows the groove inward.
            const onRecord = playingRef.current || s.scratching;
            const radius = (GROOVE_OUT - (GROOVE_OUT - GROOVE_IN) * (s.time / total)) * RECORD_R;
            const armTarget = onRecord ? armAngleFor(radius) : 0;
            if (reduceMotion) {
                s.arm = armTarget;
                s.armVelocity = 0;
            } else {
                const accel = 70 * (armTarget - s.arm) - 15 * s.armVelocity;
                s.armVelocity += accel * dt;
                s.arm += s.armVelocity * dt;
            }

            const spin = reduceMotion ? 0 : s.angle % 360;
            if (recordRef.current) recordRef.current.style.transform = `rotate(${spin}deg)`;
            if (platterRef.current) platterRef.current.style.transform = `rotate(${spin}deg)`;
            armRef.current?.setAttribute("transform", `rotate(${s.arm} ${PIVOT_X} ${PIVOT_Y})`);
            // Lifted off the record the arm is higher, so its shadow falls further away from it.
            const lift = onRecord && Math.abs(s.armVelocity) < 4 ? 0.9 : 2.2;
            shadowRef.current?.setAttribute("transform", `translate(${lift} ${lift * 1.4}) rotate(${s.arm} ${PIVOT_X} ${PIVOT_Y})`);

            const second = Math.floor(s.time);
            if (second !== lastSecond) {
                lastSecond = second;
                setClock(second);
                let index = 0;
                starts.forEach((start, i) => {
                    if (s.time >= start) index = i;
                });
                if (index !== trackRef.current) {
                    trackRef.current = index;
                    setTrackIndex(index);
                    callbacks.current.onTrackChange?.(callbacks.current.tracks[index], index);
                }
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduceMotion, nominal, total, starts]);

    const pointerAngle = (event: PointerEvent<HTMLDivElement>) => {
        const box = event.currentTarget.getBoundingClientRect();
        return (Math.atan2(event.clientY - (box.top + box.height / 2), event.clientX - (box.left + box.width / 2)) * 180) / Math.PI;
    };

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        const s = physics.current;
        s.scratching = true;
        s.pointerAngle = pointerAngle(event);
        s.pointerTime = event.timeStamp;
        setScratching(true);
    };

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const s = physics.current;
        if (!s.scratching) return;
        const angle = pointerAngle(event);
        // Wrap to -180..180 so crossing the left edge of atan2 does not count as a full turn.
        const delta = ((angle - s.pointerAngle + 540) % 360) - 180;
        const dt = Math.max((event.timeStamp - s.pointerTime) / 1000, 0.008);
        s.pointerAngle = angle;
        s.pointerTime = event.timeStamp;
        s.angle += delta;
        s.time = Math.min(Math.max(s.time + delta / nominal, 0), total);
        s.velocity = s.velocity * 0.5 + (delta / dt) * 0.5;
    };

    const onPointerUp = () => {
        const s = physics.current;
        if (!s.scratching) return;
        s.scratching = false;
        setScratching(false);
        onSeek?.(s.time);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const t = physics.current.time;
        const moves: Record<string, number> = {ArrowRight: t + 5, ArrowUp: t + 5, ArrowLeft: t - 5, ArrowDown: t - 5, Home: 0, End: total - 1};
        if (event.key in moves) {
            event.preventDefault();
            seek(moves[event.key]);
        } else if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            toggle();
        }
    };

    const current = tracks[trackIndex];
    const sideArc = [album.label, album.catalog, rpm === 33 ? "33⅓ RPM" : "45 RPM"].filter(Boolean).join("  ·  ");
    // Smooth bands between tracks, where the cutting lathe widened the groove pitch.
    const gaps = starts.slice(1).map((start) => GROOVE_OUT - (GROOVE_OUT - GROOVE_IN) * (start / total));

    return (
        <div ref={rootRef} className={`grid w-full max-w-[780px] items-center gap-8 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] ${className}`}>
            <div className="relative aspect-[10/9] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(0,0,0,0.06),0_30px_50px_-28px_rgba(28,25,23,0.55)] dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_50px_-24px_rgba(0,0,0,0.9)]">
                {/* Brushed metal: hairline stripes at a slight angle. */}
                <div aria-hidden="true" className="absolute inset-0 opacity-50 mix-blend-overlay [background:repeating-linear-gradient(97deg,rgba(255,255,255,0.35)_0_1px,transparent_1px_3px)] dark:opacity-20"/>

                <div
                    aria-hidden="true"
                    className="absolute rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 shadow-[8px_12px_22px_-8px_rgba(0,0,0,0.55)] dark:from-zinc-600 dark:to-zinc-800"
                    style={{left: percent(CX - PLATTER_R, 100), top: percent(CY - PLATTER_R, 90), width: percent(PLATTER_R * 2, 100), height: percent(PLATTER_R * 2, 90)}}
                >
                    {/* Strobe dots: 108 of them, one every 3.33 deg. At 33 1/3 rpm the platter turns exactly that far
                        per 60 Hz frame, so on most screens the dots appear to stand still once it is up to speed. */}
                    <div
                        ref={platterRef}
                        className="absolute inset-0 rounded-full [background:repeating-conic-gradient(rgba(24,24,27,0.7)_0_1.1deg,transparent_1.1deg_3.3333deg)] [mask-image:radial-gradient(circle_closest-side,transparent_95%,#000_95.5%,#000_99%,transparent_99.5%)] will-change-transform"
                    />
                </div>

                <div
                    role="slider"
                    tabIndex={0}
                    aria-label={`${album.title}, drag to scratch`}
                    aria-valuemin={0}
                    aria-valuemax={Math.floor(total)}
                    aria-valuenow={clock}
                    aria-valuetext={`${current?.title ?? ""}, ${format(clock - (starts[trackIndex] ?? 0))}`}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    onKeyDown={onKeyDown}
                    className={`absolute touch-none select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-200 dark:focus-visible:ring-offset-zinc-800 ${scratching ? "cursor-grabbing" : "cursor-grab"}`}
                    style={{left: percent(CX - RECORD_R, 100), top: percent(CY - RECORD_R, 90), width: percent(RECORD_R * 2, 100), height: percent(RECORD_R * 2, 90)}}
                >
                    <div
                        ref={recordRef}
                        className="absolute inset-0 rounded-full will-change-transform"
                        style={{
                            background: [
                                // Lead-in rim, run-out area and a faint warp so the spin reads on the vinyl itself.
                                `radial-gradient(circle closest-side, #151518 0 ${GROOVE_IN * 100}%, transparent ${GROOVE_IN * 100 + 0.4}% ${GROOVE_OUT * 100}%, #17171a ${GROOVE_OUT * 100 + 0.3}% 99%, #3a3a3f 99.6%, transparent 100%)`,
                                "conic-gradient(from 10deg, rgba(255,255,255,0.035), transparent 12%, rgba(255,255,255,0.02) 31%, transparent 47%, rgba(255,255,255,0.03) 70%, transparent 86%)",
                                "repeating-radial-gradient(circle closest-side, #0b0b0d 0 1px, #1c1c20 1.5px, #0b0b0d 2.1px)",
                            ].join(", "),
                        }}
                    >
                        {gaps.map((radius) => (
                            <div
                                key={radius}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/[0.07]"
                                style={{width: `${radius * 100}%`, height: `${radius * 100}%`}}
                            />
                        ))}
                        <svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{width: `${LABEL * 100}%`, height: `${LABEL * 100}%`}} aria-hidden="true">
                            <defs>
                                <path id={`${uid}-top`} d="M13 50A37 37 0 1 1 87 50"/>
                                <path id={`${uid}-bottom`} d="M9.5 50A40.5 40.5 0 0 0 90.5 50"/>
                                <clipPath id={`${uid}-clip`}>
                                    <circle cx="50" cy="50" r="50"/>
                                </clipPath>
                            </defs>
                            <g clipPath={`url(#${uid}-clip)`}>
                                <circle cx="50" cy="50" r="50" fill={labelColor}/>
                                {/* Artwork: a low sun over banded water. */}
                                <circle cx="50" cy="47" r="15" fill="#fbf3e4"/>
                                {[0, 1, 2, 3, 4, 5].map((row) => (
                                    <rect key={row} x="0" y={50 + row * 4.2} width="100" height={2.4 - row * 0.2} fill="#1c1917" opacity={0.78 - row * 0.08}/>
                                ))}
                                <circle cx="50" cy="50" r="47" fill="none" stroke="#1c1917" strokeOpacity="0.25" strokeWidth="0.5"/>
                            </g>
                            <text fontSize="6.4" fontWeight="700" letterSpacing="1.4" fill="#1c1917" style={{textTransform: "uppercase"}}>
                                <textPath href={`#${uid}-top`} startOffset="50%" textAnchor="middle">{album.artist}</textPath>
                            </text>
                            <text fontSize="4.6" letterSpacing="1.1" fill="#1c1917" fillOpacity="0.75" style={{textTransform: "uppercase"}}>
                                <textPath href={`#${uid}-bottom`} startOffset="50%" textAnchor="middle">{sideArc}</textPath>
                            </text>
                            <text x="30" y="47" fontSize="5" fontWeight="700" fill="#1c1917">A</text>
                        </svg>
                    </div>
                    {/* Fixed sheen. It stays put while the grooves turn under it, like a room light on a real record. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen [mask-image:radial-gradient(circle_closest-side,transparent_34%,#000_36%,#000_97%,transparent_99%)]"
                        style={{background: "conic-gradient(from 292deg, transparent 0deg, rgba(255,255,255,0.16) 20deg, transparent 44deg, transparent 180deg, rgba(255,255,255,0.1) 200deg, transparent 224deg)"}}
                    />
                    <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[3.2%] w-[3.2%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white to-zinc-400 shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"/>
                </div>

                <svg viewBox="0 0 100 90" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                    <defs>
                        <linearGradient id={`${uid}-metal`} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0" stopColor="#71717a"/>
                            <stop offset="0.45" stopColor="#f4f4f5"/>
                            <stop offset="1" stopColor="#a1a1aa"/>
                        </linearGradient>
                        <radialGradient id={`${uid}-base`} cx="0.35" cy="0.3" r="0.8">
                            <stop offset="0" stopColor="#fafafa"/>
                            <stop offset="1" stopColor="#71717a"/>
                        </radialGradient>
                        <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="0.8"/>
                        </filter>
                    </defs>
                    <rect x="85.4" y="54.5" width="5.2" height="3.4" rx="1.1" fill="#27272a" opacity="0.85"/>
                    <circle cx={PIVOT_X} cy={PIVOT_Y} r="8" fill={`url(#${uid}-base)`} stroke="#000" strokeOpacity="0.15" strokeWidth="0.3"/>
                    <circle cx={PIVOT_X} cy={PIVOT_Y} r="5.2" fill="#27272a" opacity="0.9"/>
                    <g ref={shadowRef} filter={`url(#${uid}-blur)`} opacity="0.32">
                        <ArmShape shadow metal={`${uid}-metal`}/>
                    </g>
                    <g ref={armRef}>
                        <ArmShape metal={`${uid}-metal`}/>
                    </g>
                    {/* Motor lamp. */}
                    <circle cx="91" cy="81" r="1.1" className={playing ? "fill-orange-500" : "fill-stone-400 dark:fill-zinc-600"}/>
                    <text x="88.4" y="81.9" textAnchor="end" fontSize="2.6" letterSpacing="0.4" className="fill-stone-500 font-mono dark:fill-zinc-400">
                        {rpm === 33 ? "33⅓" : "45"}
                    </text>
                </svg>
            </div>

            <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500 dark:text-zinc-400">
                    {[album.label, album.catalog, album.year].filter(Boolean).join(" · ")}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50">{album.title}</h3>
                <p className="text-sm text-stone-600 dark:text-zinc-400">{album.artist}</p>

                <div className="mt-5 flex items-center gap-4">
                    <button
                        type="button"
                        onClick={toggle}
                        aria-label={playing ? "Pause" : "Play"}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.6)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.3,1.6,0.5,1)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:focus-visible:ring-offset-zinc-900"
                    >
                        {playing ? <LuPause className="h-4 w-4"/> : <LuPlay className="ml-0.5 h-4 w-4"/>}
                    </button>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-stone-900 dark:text-zinc-100">{current?.title}</p>
                        <p className="font-mono text-xs tabular-nums text-stone-500 dark:text-zinc-400">
                            {format(clock - (starts[trackIndex] ?? 0))} / {format(current?.duration ?? 0)}
                        </p>
                    </div>
                </div>

                <p className="mt-6 border-b border-stone-200 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400 dark:border-zinc-800 dark:text-zinc-500">
                    Side A
                </p>
                <ol className="mt-1">
                    {tracks.map((track, index) => {
                        const active = index === trackIndex;
                        return (
                            <li key={track.id}>
                                <button
                                    type="button"
                                    onClick={() => pickTrack(index)}
                                    aria-current={active ? "true" : undefined}
                                    className={`relative flex w-full items-baseline gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:hover:bg-zinc-800/60 ${active ? "text-stone-900 dark:text-white" : "text-stone-500 dark:text-zinc-400"}`}
                                >
                                    <span className={`absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full bg-orange-500 transition-opacity ${active ? "opacity-100" : "opacity-0"}`}/>
                                    <span className="w-5 font-mono text-[11px] tabular-nums text-stone-400 dark:text-zinc-500">A{index + 1}</span>
                                    <span className={`min-w-0 flex-1 truncate text-sm ${active ? "font-medium" : ""}`}>{track.title}</span>
                                    <span className="font-mono text-xs tabular-nums">{format(track.duration)}</span>
                                </button>
                            </li>
                        );
                    })}
                </ol>
                <p className="mt-4 text-xs text-stone-400 dark:text-zinc-500">Grab the record to scratch. Arrow keys skip 5 seconds.</p>
            </div>
        </div>
    );
};
