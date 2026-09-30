import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import type {CSSProperties} from "react";
import {motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuPause, LuPlay} from "react-icons/lu";

export interface KaraokeLine {
    /** Seconds from the start when the first word is sung. */
    start: number;
    text: string;
    /**
     * Start time of each word, one per word. Leave it out and the words are spread over the line by
     * length, which is close enough for speech and most songs.
     */
    words?: number[];
}

export interface KaraokeLyricsProps {
    title: string;
    artist: string;
    lines: KaraokeLine[];
    /** Length in seconds. */
    duration: number;
    onPlay?: () => void;
    onPause?: () => void;
    onSeek?: (time: number) => void;
    className?: string;
}

interface TimedWord {
    text: string;
    start: number;
    end: number;
}

type Item =
    | {kind: "line"; start: number; end: number; lineIndex: number; words: TimedWord[]}
    | {kind: "gap"; start: number; end: number};

// A pause this long between lines shows the three-dot countdown instead of holding the last line.
const GAP = 4;

const format = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const buildItems = (lines: KaraokeLine[], duration: number) => {
    const items: Item[] = [];
    if (lines.length && lines[0].start >= GAP - 1) items.push({kind: "gap", start: 0, end: lines[0].start});
    lines.forEach((line, lineIndex) => {
        const texts = line.text.split(/\s+/).filter(Boolean);
        const next = lines[lineIndex + 1]?.start ?? duration;
        // Rough singing pace, cut short if the next line comes in first.
        const natural = line.start + texts.join("").length * 0.085 + texts.length * 0.12;
        const end = Math.min(natural, next - 0.3);
        const weights = texts.map((text) => text.length + 2);
        const sum = weights.reduce((a, b) => a + b, 0);
        let cursor = line.start;
        const words = texts.map((text, i) => {
            const start = line.words?.[i] ?? cursor;
            const stop = line.words?.[i + 1] ?? (line.words ? end : cursor + ((end - line.start) * weights[i]) / sum);
            cursor = stop;
            return {text, start, end: stop};
        });
        items.push({kind: "line", start: line.start, end, lineIndex, words});
        if (next - end > GAP && lineIndex < lines.length - 1) items.push({kind: "gap", start: end, end: next});
    });
    return items;
};

// Synced lyrics. Each word is painted with a text-clipped gradient whose edge is a CSS variable, so a
// single custom property per word drives a soft left-to-right wipe without re-rendering React.
export const KaraokeLyrics = ({title, artist, lines, duration, onPlay, onPause, onSeek, className = ""}: KaraokeLyricsProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const rootRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);
    const wordRefs = useRef<(HTMLSpanElement | null)[][]>([]);
    const dotRefs = useRef<(HTMLSpanElement | null)[][]>([]);
    const inView = useInView(rootRef);

    const items = useMemo(() => buildItems(lines, duration), [lines, duration]);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [second, setSecond] = useState(0);
    const [offset, setOffset] = useState(0);

    const time = useRef(0);
    const indexRef = useRef(0);
    const progress = useMotionValue(0);
    const barWidth = useTransform(progress, (p) => `${p * 100}%`);

    const itemAt = useCallback(
        (t: number) => {
            let found = 0;
            items.forEach((item, i) => {
                if (t >= item.start) found = i;
            });
            return found;
        },
        [items],
    );

    const paint = useCallback(
        (t: number) => {
            const next = itemAt(t);
            if (next !== indexRef.current) {
                wordRefs.current[indexRef.current]?.forEach((el) => el && (el.style.transform = ""));
                indexRef.current = next;
                setIndex(next);
            }
            const item = items[next];
            if (item.kind === "line") {
                item.words.forEach((word, k) => {
                    const el = wordRefs.current[next]?.[k];
                    if (!el) return;
                    const p = Math.min(Math.max((t - word.start) / Math.max(word.end - word.start, 0.01), 0), 1);
                    el.style.setProperty("--p", p.toFixed(3));
                    // The word being sung lifts a touch and settles as the wipe passes.
                    el.style.transform = reduceMotion ? "" : `translateY(${(-2.5 * Math.sin(Math.PI * p)).toFixed(2)}px)`;
                });
            } else {
                const g = (t - item.start) / (item.end - item.start);
                dotRefs.current[next]?.forEach((el, k) => {
                    if (!el) return;
                    const fill = Math.min(Math.max(g * 3 - k, 0), 1);
                    el.style.opacity = String(0.2 + fill * 0.8);
                    el.style.transform = reduceMotion ? "" : `scale(${0.7 + fill * 0.3})`;
                });
            }
            progress.set(t / duration);
            const whole = Math.floor(t);
            setSecond((previous) => (previous === whole ? previous : whole));
        },
        [itemAt, items, duration, progress, reduceMotion],
    );

    const seek = (t: number) => {
        time.current = Math.min(Math.max(t, 0), duration);
        paint(time.current);
        onSeek?.(time.current);
    };

    const setPlayback = (next: boolean) => {
        if (next && time.current >= duration - 0.05) seek(0);
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
            time.current = Math.min(time.current + Math.min((now - last) / 1000, 0.1), duration);
            last = now;
            paint(time.current);
            if (time.current >= duration) {
                setPlaying(false);
                callbacks.current.onPause?.();
                return;
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [playing, inView, duration, paint]);

    // After React re-renders the lines for a new current item, paint it again so a seek while paused
    // does not leave the new line showing its static state. Then center it in the viewport.
    useLayoutEffect(() => {
        paint(time.current);
        const measure = () => {
            const el = itemRefs.current[index];
            const viewport = viewportRef.current;
            if (!el || !viewport) return;
            setOffset(viewport.clientHeight * 0.4 - (el.offsetTop + el.offsetHeight / 2));
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [index, paint]);

    return (
        <div
            ref={rootRef}
            className={`w-full max-w-[600px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 [--p:0] [--k-dim:#d6d3d1] [--k-fill:#1c1917] dark:border-zinc-800 dark:bg-zinc-950 dark:[--k-dim:#3f3f46] dark:[--k-fill:#fafafa] ${className}`}
        >
            <div className="flex items-baseline justify-between gap-3 px-5 pt-4 sm:px-7 sm:pt-5">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-stone-900 dark:text-zinc-100">{title}</h3>
                    <p className="truncate text-xs text-stone-500 dark:text-zinc-400">{artist}</p>
                </div>
                <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-zinc-500">Synced lyrics</p>
            </div>

            <div
                ref={viewportRef}
                className="relative h-[300px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_78%,transparent)] sm:h-[320px]"
            >
                <motion.ol
                    className="px-3 sm:px-5"
                    initial={false}
                    animate={{y: offset}}
                    transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 110, damping: 22, mass: 0.9}}
                >
                    {items.map((item, i) => {
                        const relation = i < index ? "past" : i === index ? "current" : "future";
                        const look = {
                            past: {opacity: 0.42, scale: 0.84, filter: reduceMotion ? "blur(0px)" : "blur(1.2px)"},
                            current: {opacity: 1, scale: 1, filter: "blur(0px)"},
                            future: {opacity: 0.9, scale: 0.84, filter: "blur(0px)"},
                        }[relation];
                        const transition = reduceMotion ? {duration: 0} : {duration: 0.5, ease: [0.2, 0.7, 0.1, 1]};

                        if (item.kind === "gap") {
                            return (
                                <motion.li
                                    key={`gap-${item.start}`}
                                    ref={(el) => (itemRefs.current[i] = el)}
                                    aria-hidden="true"
                                    className="flex origin-left gap-2 px-2 py-4"
                                    initial={false}
                                    animate={look}
                                    transition={transition}
                                >
                                    {[0, 1, 2].map((k) => {
                                        const fill = relation === "past" ? 1 : 0.2;
                                        return (
                                            <span
                                                key={k}
                                                ref={(el) => {
                                                    dotRefs.current[i] = dotRefs.current[i] ?? [];
                                                    dotRefs.current[i][k] = el;
                                                }}
                                                className="h-2.5 w-2.5 rounded-full bg-[var(--k-fill)]"
                                                style={relation === "current" ? undefined : {opacity: fill}}
                                            />
                                        );
                                    })}
                                </motion.li>
                            );
                        }

                        return (
                            <motion.li
                                key={`line-${item.start}`}
                                ref={(el) => (itemRefs.current[i] = el)}
                                className="origin-left"
                                initial={false}
                                animate={look}
                                transition={transition}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        seek(item.start);
                                        if (!playing) setPlayback(true);
                                    }}
                                    aria-current={relation === "current" ? "true" : undefined}
                                    aria-label={`Play from ${format(item.start)}: ${lines[item.lineIndex].text}`}
                                    className="w-full rounded-lg px-2 py-1.5 text-left text-[22px] font-semibold leading-[1.2] tracking-tight transition-colors hover:bg-stone-900/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:hover:bg-white/[0.04] sm:text-[28px]"
                                >
                                    {item.words.map((word, k) => {
                                        const style = {
                                            backgroundImage: "linear-gradient(90deg, var(--k-fill) calc(var(--p) * 115% - 15%), var(--k-dim) calc(var(--p) * 115%))",
                                            ...(relation === "current" ? {} : {"--p": relation === "past" ? 1 : 0}),
                                        } as CSSProperties;
                                        return (
                                            <span key={k}>
                                                <span
                                                    ref={(el) => {
                                                        wordRefs.current[i] = wordRefs.current[i] ?? [];
                                                        wordRefs.current[i][k] = el;
                                                    }}
                                                    className="inline-block bg-clip-text text-transparent"
                                                    style={style}
                                                >
                                                    {word.text}
                                                </span>
                                                {k < item.words.length - 1 && " "}
                                            </span>
                                        );
                                    })}
                                </button>
                            </motion.li>
                        );
                    })}
                </motion.ol>
            </div>

            <div className="flex items-center gap-4 border-t border-stone-200 px-5 py-3.5 dark:border-zinc-800 sm:px-7">
                <button
                    type="button"
                    onClick={() => setPlayback(!playing)}
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:focus-visible:ring-offset-zinc-950"
                >
                    {playing ? <LuPause className="h-4 w-4"/> : <LuPlay className="ml-0.5 h-4 w-4"/>}
                </button>
                <span className="w-9 font-mono text-[11px] tabular-nums text-stone-500 dark:text-zinc-400">{format(second)}</span>
                <div className="group relative h-4 flex-1">
                    <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-stone-200 dark:bg-zinc-800">
                        <motion.div className="h-full rounded-full bg-teal-600 dark:bg-teal-400" style={{width: barWidth}}/>
                    </div>
                    {/* A native range on top keeps dragging, touch and arrow keys for free. */}
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        step={0.1}
                        value={second}
                        aria-label="Seek"
                        aria-valuetext={`${format(second)} of ${format(duration)}`}
                        onChange={(event) => seek(Number(event.target.value))}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-teal-500 ring-offset-2 group-has-[:focus-visible]:ring-2 dark:ring-offset-zinc-950"/>
                </div>
                <span className="w-9 text-right font-mono text-[11px] tabular-nums text-stone-500 dark:text-zinc-400">{format(duration)}</span>
            </div>
        </div>
    );
};
