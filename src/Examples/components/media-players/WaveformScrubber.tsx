import {useEffect, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuPause, LuPlay} from "react-icons/lu";

export interface WaveformChapter {
    /** Start in seconds. */
    time: number;
    title: string;
}

export interface WaveformScrubberProps {
    title: string;
    /** Show name and episode, shown above the title. */
    show?: string;
    /** Short text on the artwork tile, e.g. an episode number. */
    badge?: string;
    /** Length in seconds. */
    duration: number;
    /** The same seed always draws the same waveform. */
    seed?: number;
    bars?: number;
    chapters?: WaveformChapter[];
    speeds?: number[];
    onPlay?: () => void;
    onPause?: () => void;
    onSeek?: (time: number) => void;
    onRateChange?: (rate: number) => void;
    className?: string;
}

const format = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const rest = String(s % 60).padStart(2, "0");
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${rest}` : `${m}:${rest}`;
};

// Small seeded PRNG (mulberry32), so a waveform is stable across renders and servers.
const random = (seed: number) => {
    let a = seed | 0;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

// Speech rather than music: a slowly drifting loudness, syllable bumps on top, and short breaths
// between sentences. Chapter starts always get a pause so the edit points read in the shape.
const buildPeaks = (seed: number, count: number, breaks: Set<number>) => {
    const next = random(seed);
    const peaks: number[] = [];
    let energy = 0.65;
    let pause = 0;
    for (let i = 0; i < count; i++) {
        if (breaks.has(i) || breaks.has(i + 1)) pause = Math.max(pause, 1);
        if (pause > 0) {
            peaks.push(0.07 + next() * 0.05);
            pause--;
            continue;
        }
        if (next() < 0.06) pause = 1 + Math.floor(next() * 2);
        energy = Math.min(0.95, Math.max(0.35, energy + (next() - 0.5) * 0.22));
        const syllable = 0.5 + 0.5 * Math.abs(Math.sin(i * 1.9 + next() * 2.4));
        peaks.push(Math.min(1, Math.max(0.12, energy * syllable + (next() - 0.5) * 0.14)));
    }
    return peaks;
};

const Bars = ({peaks, className}: {peaks: number[]; className: string}) => (
    <div className="absolute inset-0 flex items-center">
        {peaks.map((peak, index) => (
            <span key={index} className="flex h-full flex-1 items-center justify-center">
                <span className={`w-[58%] min-w-px rounded-full ${className}`} style={{height: `${peak * 100}%`}}/>
            </span>
        ))}
    </div>
);

// A voice-note style player. Three copies of the same bars are stacked and clipped with clip-path:
// the base, a preview of the stretch you would skip to, and the played part, so the fill wipes
// smoothly through the middle of a bar instead of stepping bar by bar.
export const WaveformScrubber = ({
    title,
    show,
    badge,
    duration,
    seed = 7,
    bars = 110,
    chapters = [],
    speeds = [1, 1.5, 2],
    onPlay,
    onPause,
    onSeek,
    onRateChange,
    className = "",
}: WaveformScrubberProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const rootRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const inView = useInView(rootRef);

    const [playing, setPlaying] = useState(false);
    const [second, setSecond] = useState(0);
    const [rateIndex, setRateIndex] = useState(0);
    const [hover, setHover] = useState<number | null>(null);
    const [dragging, setDragging] = useState(false);

    const time = useRef(0);
    const progress = useMotionValue(0);
    const hoverValue = useMotionValue(0);
    const played = useTransform(progress, (p) => `inset(0 ${(1 - p) * 100}% 0 0)`);
    const ahead = useTransform([progress, hoverValue], ([p, h]: number[]) => (h > p ? `inset(0 ${(1 - h) * 100}% 0 ${p * 100}%)` : "inset(0 100% 0 0)"));
    const headLeft = useTransform(progress, (p) => `${p * 100}%`);
    const rate = speeds[rateIndex] ?? 1;

    const breaks = useMemo(() => new Set(chapters.slice(1).map((chapter) => Math.round((chapter.time / duration) * bars))), [chapters, duration, bars]);
    const peaks = useMemo(() => buildPeaks(seed, bars, breaks), [seed, bars, breaks]);

    const chapterAt = (t: number) => {
        let index = -1;
        chapters.forEach((chapter, i) => {
            if (t >= chapter.time) index = i;
        });
        return index;
    };

    const seek = (t: number) => {
        time.current = Math.min(Math.max(t, 0), duration);
        progress.set(time.current / duration);
        setSecond(Math.floor(time.current));
    };

    const setPlayback = (next: boolean) => {
        if (next && time.current >= duration) seek(0);
        setPlaying(next);
        if (next) onPlay?.();
        else onPause?.();
    };

    const callbacks = useRef({onPause});
    callbacks.current = {onPause};

    useEffect(() => {
        if (!playing || !inView) return;
        let frame = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            time.current = Math.min(time.current + dt * rate, duration);
            progress.set(time.current / duration);
            const whole = Math.floor(time.current);
            setSecond((previous) => (previous === whole ? previous : whole));
            if (time.current >= duration) {
                setPlaying(false);
                callbacks.current.onPause?.();
                return;
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [playing, inView, rate, duration, progress]);

    const fractionAt = (clientX: number) => {
        const box = trackRef.current?.getBoundingClientRect();
        if (!box) return 0;
        return Math.min(Math.max((clientX - box.left) / box.width, 0), 1);
    };

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const fraction = fractionAt(event.clientX);
        hoverValue.set(fraction);
        setHover(fraction);
        if (dragging) seek(fraction * duration);
    };

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
        seek(fractionAt(event.clientX) * duration);
    };

    const onPointerUp = () => {
        if (!dragging) return;
        setDragging(false);
        onSeek?.(time.current);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 15 : 5;
        const index = chapterAt(time.current);
        const targets: Record<string, number | undefined> = {
            ArrowRight: time.current + step,
            ArrowUp: time.current + step,
            ArrowLeft: time.current - step,
            ArrowDown: time.current - step,
            Home: 0,
            End: duration,
            PageDown: chapters[index + 1]?.time,
            // Like most players: jump to the start of this chapter, or the previous one if already near it.
            PageUp: chapters[time.current - (chapters[index]?.time ?? 0) < 3 ? index - 1 : index]?.time,
        };
        if (event.key === " " || event.key === "k") {
            event.preventDefault();
            setPlayback(!playing);
        } else if (event.key in targets) {
            event.preventDefault();
            const target = targets[event.key];
            if (target === undefined) return;
            seek(target);
            onSeek?.(time.current);
        }
    };

    const cycleRate = () => {
        const next = (rateIndex + 1) % speeds.length;
        setRateIndex(next);
        onRateChange?.(speeds[next]);
    };

    const currentChapter = chapterAt(second);
    const hoverTime = hover === null ? 0 : hover * duration;
    const hoverChapter = hover === null ? -1 : chapterAt(hoverTime);

    return (
        <div ref={rootRef} className={`w-full max-w-[640px] rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_40px_-28px_rgba(28,25,23,0.35)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none sm:p-5 ${className}`}>
            <div className="flex items-center gap-3 sm:gap-4">
                <div aria-hidden="true" className="relative flex h-12 w-12 shrink-0 items-end overflow-hidden rounded-lg bg-emerald-950 p-1.5 sm:h-14 sm:w-14">
                    <svg viewBox="0 0 40 20" className="absolute inset-x-0 top-2 w-full text-emerald-400/60">
                        <path d="M0 10Q5 2 10 10T20 10T30 10T40 10" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M0 13Q5 7 10 13T20 13T30 13T40 13" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
                    </svg>
                    <span className="relative font-mono text-[11px] font-semibold tabular-nums text-emerald-100">{badge}</span>
                </div>
                <div className="min-w-0 flex-1">
                    {show && <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-zinc-400">{show}</p>}
                    <h3 className="truncate text-[15px] font-semibold tracking-tight text-stone-900 dark:text-zinc-50">{title}</h3>
                </div>
                <button
                    type="button"
                    onClick={cycleRate}
                    aria-label={`Playback speed ${rate} times`}
                    className="relative h-7 w-12 shrink-0 overflow-hidden rounded-full border border-stone-200 font-mono text-xs font-medium tabular-nums text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                    <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                            key={rate}
                            className="absolute inset-0 flex items-center justify-center"
                            initial={reduceMotion ? {opacity: 0} : {y: "100%", opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={reduceMotion ? {opacity: 0} : {y: "-100%", opacity: 0}}
                            transition={{type: "spring", stiffness: 520, damping: 34}}
                        >
                            {rate}×
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>

            <div className="mt-5 flex items-center gap-3 sm:gap-4">
                <button
                    type="button"
                    onClick={() => setPlayback(!playing)}
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_14px_-6px_rgba(5,150,105,0.7)] transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-emerald-950 dark:focus-visible:ring-offset-zinc-900"
                >
                    <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                            key={playing ? "pause" : "play"}
                            initial={{scale: 0.4, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.4, opacity: 0}}
                            transition={{duration: 0.14}}
                        >
                            {playing ? <LuPause className="h-4 w-4"/> : <LuPlay className="ml-0.5 h-4 w-4"/>}
                        </motion.span>
                    </AnimatePresence>
                </button>

                <div className="min-w-0 flex-1">
                    <div className="relative h-5 overflow-hidden text-xs text-stone-600 dark:text-zinc-300">
                        <AnimatePresence initial={false} mode="popLayout">
                            <motion.p
                                key={currentChapter}
                                className="absolute inset-0 truncate"
                                initial={reduceMotion ? {opacity: 0} : {y: 12, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={reduceMotion ? {opacity: 0} : {y: -12, opacity: 0}}
                                transition={{duration: 0.28, ease: [0.2, 0.8, 0.2, 1]}}
                            >
                                {currentChapter >= 0 && (
                                    <>
                                        <span className="font-mono text-stone-400 dark:text-zinc-500">{String(currentChapter + 1).padStart(2, "0")}</span>{" "}
                                        {chapters[currentChapter].title}
                                    </>
                                )}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <div
                        ref={trackRef}
                        role="slider"
                        tabIndex={0}
                        aria-label="Seek"
                        aria-valuemin={0}
                        aria-valuemax={Math.floor(duration)}
                        aria-valuenow={second}
                        aria-valuetext={`${format(second)} of ${format(duration)}${currentChapter >= 0 ? `, ${chapters[currentChapter].title}` : ""}`}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        onPointerLeave={() => !dragging && setHover(null)}
                        onKeyDown={onKeyDown}
                        className="group relative mt-1 h-12 cursor-pointer touch-none select-none rounded-md outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-zinc-900"
                    >
                        <Bars peaks={peaks} className="bg-stone-200 dark:bg-zinc-700/80"/>
                        <motion.div className="absolute inset-0" style={{clipPath: ahead}}>
                            <Bars peaks={peaks} className="bg-stone-400/70 dark:bg-zinc-500"/>
                        </motion.div>
                        <motion.div className="absolute inset-0" style={{clipPath: played}}>
                            <Bars peaks={peaks} className="bg-emerald-600 dark:bg-emerald-400"/>
                        </motion.div>
                        {/* Chapter notches cut through the bars. */}
                        {chapters.slice(1).map((chapter) => (
                            <span key={chapter.time} className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white dark:bg-zinc-900" style={{left: `${(chapter.time / duration) * 100}%`}}/>
                        ))}
                        <motion.span aria-hidden="true" className="absolute -inset-y-1 w-[2px] -translate-x-1/2 rounded-full bg-emerald-700 dark:bg-emerald-300" style={{left: headLeft}}/>

                        {hover !== null && (
                            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{left: `${hover * 100}%`}}>
                                <span className="absolute -inset-y-1 w-px -translate-x-1/2 bg-stone-900/50 dark:bg-white/60"/>
                                <span
                                    className="absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-stone-900 px-2 py-1 text-[11px] text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
                                    // Slides from left-aligned to right-aligned across the track, so it never leaves the card.
                                    style={{transform: `translateX(-${hover * 100}%)`}}
                                >
                                    <span className="font-mono tabular-nums">{format(hoverTime)}</span>
                                    {hoverChapter >= 0 && <span className="ml-1.5 text-stone-300 dark:text-zinc-500">{chapters[hoverChapter].title}</span>}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="relative mt-1.5 h-4">
                        {chapters.map((chapter, index) => (
                            <button
                                key={chapter.time}
                                type="button"
                                onClick={() => {
                                    seek(chapter.time);
                                    onSeek?.(chapter.time);
                                }}
                                aria-label={`Chapter ${index + 1}: ${chapter.title}, ${format(chapter.time)}`}
                                className="group/notch absolute top-0 flex h-4 w-4 -translate-x-1/2 items-start justify-center focus-visible:outline-none"
                                style={{left: `${(chapter.time / duration) * 100}%`}}
                            >
                                <span className={`h-2 w-[2px] rounded-full transition-colors group-hover/notch:bg-stone-900 group-focus-visible/notch:bg-emerald-500 dark:group-hover/notch:bg-white ${index === currentChapter ? "bg-emerald-600 dark:bg-emerald-400" : "bg-stone-300 dark:bg-zinc-600"}`}/>
                                <span
                                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 hidden whitespace-nowrap rounded bg-stone-900 px-1.5 py-0.5 text-[10px] text-white group-hover/notch:block group-focus-visible/notch:block dark:bg-zinc-100 dark:text-zinc-900"
                                    style={{transform: `translateX(-${(chapter.time / duration) * 100}%)`}}
                                >
                                    {chapter.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-0.5 flex justify-between font-mono text-[11px] tabular-nums text-stone-500 dark:text-zinc-400">
                        <span>{format(second)}</span>
                        <span>-{format(duration - second)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
